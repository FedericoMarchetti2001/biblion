// Summary: Runtime app configuration derived from Expo config extras.
import Constants from "expo-constants";

const extra = Constants.expoConfig?.extra ?? {};

export const appConfig = {
  useMocks: String(extra.useMocks).toLowerCase() === "true",
  apiUrl: String(extra.apiUrl ?? ""),
  supabaseUrl: String(extra.supabaseUrl ?? ""),
  supabaseAnonKey: String(extra.supabaseAnonKey ?? "")
};
