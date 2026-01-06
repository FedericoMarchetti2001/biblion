import type { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  name: "Biblion",
  slug: "biblion",
  version: "1.0.0",
  orientation: "portrait",
  userInterfaceStyle: "automatic",
  extra: {
    useMocks: process.env.EXPO_PUBLIC_USE_MOCKS ?? "true",
    apiUrl: process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:4000"
  }
};

export default config;
