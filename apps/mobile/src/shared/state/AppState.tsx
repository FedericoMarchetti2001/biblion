// Summary: Global app state for session, entitlements, and settings with runtime config sync.
import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import * as Linking from "expo-linking";
import { appConfig } from "../../app/config";
import { setRuntimeConfig } from "../api/runtimeConfig";
import { supabase } from "../auth/supabaseClient";

export type ThemeMode = "system" | "light" | "dark";

export type SessionState = {
  isAuthenticated: boolean;
  userId?: string;
};

export type EntitlementsState = {
  isPremium: boolean;
  providerAllowlist: string[];
};

export type SettingsState = {
  themeMode: ThemeMode;
  useMocks: boolean;
};

export type AppState = {
  session: SessionState;
  entitlements: EntitlementsState;
  settings: SettingsState;
};

type Action =
  | { type: "SET_THEME_MODE"; payload: ThemeMode }
  | { type: "SET_USE_MOCKS"; payload: boolean }
  | { type: "SET_SESSION"; payload: SessionState }
  | { type: "SET_ENTITLEMENTS"; payload: EntitlementsState };

const initialState: AppState = {
  session: { isAuthenticated: false },
  entitlements: { isPremium: false, providerAllowlist: ["mock"] },
  settings: { themeMode: "system", useMocks: appConfig.useMocks }
};

const AppStateContext = createContext<AppState | null>(null);
const AppDispatchContext = createContext<React.Dispatch<Action> | null>(null);

const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "SET_THEME_MODE":
      return { ...state, settings: { ...state.settings, themeMode: action.payload } };
    case "SET_USE_MOCKS":
      return { ...state, settings: { ...state.settings, useMocks: action.payload } };
    case "SET_SESSION":
      return { ...state, session: action.payload };
    case "SET_ENTITLEMENTS":
      return { ...state, entitlements: action.payload };
    default:
      return state;
  }
};

export const AppStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Keep API runtime config aligned with in-app mock toggle.
    setRuntimeConfig({
      useMocks: state.settings.useMocks,
      apiUrl: appConfig.apiUrl
    });
  }, [state.settings.useMocks]);

  const stateValue = useMemo(() => state, [state]);

  useEffect(() => {
    // Sync Supabase auth session into app state.
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        dispatch({
          type: "SET_SESSION",
          payload: { isAuthenticated: true, userId: session.user.id }
        });
      } else {
        dispatch({ type: "SET_SESSION", payload: { isAuthenticated: false } });
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    // Complete OAuth flow by exchanging the auth code from deep links.
    const handleUrl = async (url: string) => {
      try {
        await supabase.auth.exchangeCodeForSession(url);
      } catch (error) {
        console.warn("OAuth exchange failed", error);
      }
    };

    const subscription = Linking.addEventListener("url", ({ url }) => {
      void handleUrl(url);
    });

    Linking.getInitialURL().then((url) => {
      if (url) {
        void handleUrl(url);
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <AppStateContext.Provider value={stateValue}>
      <AppDispatchContext.Provider value={dispatch}>{children}</AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error("useAppState must be used within AppStateProvider");
  }
  return ctx;
};

export const useAppDispatch = () => {
  const ctx = useContext(AppDispatchContext);
  if (!ctx) {
    throw new Error("useAppDispatch must be used within AppStateProvider");
  }
  return ctx;
};
