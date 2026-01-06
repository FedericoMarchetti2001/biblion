import Constants from "expo-constants";

const extra = Constants.expoConfig?.extra ?? {};

export const appConfig = {
  useMocks: String(extra.useMocks).toLowerCase() === "true",
  apiUrl: String(extra.apiUrl ?? "")
};
