// Summary: Supabase client configured for Expo with secure session storage.
import { createClient } from "@supabase/supabase-js";
import * as SecureStore from "expo-secure-store";
import { appConfig } from "../../app/config";

const storageKey = "supabase.auth.token";

const secureStorage = {
  getItem: async (key: string) => {
    return SecureStore.getItemAsync(`${storageKey}:${key}`);
  },
  setItem: async (key: string, value: string) => {
    await SecureStore.setItemAsync(`${storageKey}:${key}`, value);
  },
  removeItem: async (key: string) => {
    await SecureStore.deleteItemAsync(`${storageKey}:${key}`);
  }
};

export const supabase = createClient(appConfig.supabaseUrl, appConfig.supabaseAnonKey, {
  auth: {
    storage: secureStorage,
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false
  }
});
