// Summary: OAuth helpers for signing in with Google or Apple via Supabase.
import * as Linking from "expo-linking";
import { supabase } from "./supabaseClient";

export const getRedirectUrl = () => {
  return Linking.createURL("auth/callback");
};

export const signInWithGoogle = async () => {
  // Google OAuth via Supabase (Android + iOS).
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: getRedirectUrl()
    }
  });
  if (error) {
    throw error;
  }
  if (data?.url) {
    await Linking.openURL(data.url);
  }
  return { data };
};

export const signInWithApple = async () => {
  // Apple OAuth via Supabase (iOS only, required if Google is offered on iOS).
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "apple",
    options: {
      redirectTo: getRedirectUrl()
    }
  });
  if (error) {
    throw error;
  }
  if (data?.url) {
    await Linking.openURL(data.url);
  }
  return { data };
};

export const signOut = async () => {
  return supabase.auth.signOut();
};
