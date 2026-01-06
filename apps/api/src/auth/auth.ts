// Summary: Auth helpers for validating Supabase JWTs in API requests.
import type { FastifyRequest } from "fastify";
import { supabaseAdmin } from "./supabaseAdmin.js";

export type AuthUser = {
  id: string;
  email?: string;
  provider?: string;
};

export const extractBearerToken = (request: FastifyRequest): string | null => {
  const header = request.headers.authorization ?? "";
  const [scheme, token] = header.split(" ");
  if (scheme?.toLowerCase() !== "bearer" || !token) {
    return null;
  }
  return token;
};

export const verifySupabaseToken = async (token: string): Promise<AuthUser> => {
  // Validate the token with Supabase to avoid trusting client-provided claims.
  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !data?.user) {
    throw new Error("Invalid Supabase token");
  }
  return {
    id: data.user.id,
    email: data.user.email ?? undefined,
    provider: data.user.app_metadata?.provider ?? undefined
  };
};
