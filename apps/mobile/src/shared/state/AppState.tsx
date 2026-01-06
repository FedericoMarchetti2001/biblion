import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { appConfig } from "../../app/config";
import { setRuntimeConfig } from "../api/runtimeConfig";

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
    setRuntimeConfig({
      useMocks: state.settings.useMocks,
      apiUrl: appConfig.apiUrl
    });
  }, [state.settings.useMocks]);

  const stateValue = useMemo(() => state, [state]);

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
