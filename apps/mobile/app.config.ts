// Summary: Expo app configuration with public runtime config for mocks and auth.
import type { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  name: "Biblion",
  slug: "biblion",
  version: "1.0.0",
  orientation: "portrait",
  userInterfaceStyle: "automatic",
  scheme: "biblion",
  ios: {
    bundleIdentifier: "com.biblion.app"
  },
  android: {
    package: "com.biblion.app"
  },
  extra: {
    useMocks: process.env.EXPO_PUBLIC_USE_MOCKS ?? "true",
    apiUrl: process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:4000",
    supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL ?? "",
    supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? ""
  }
};

export default config;
