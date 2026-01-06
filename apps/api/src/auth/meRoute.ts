// Summary: Auth handler that exposes user + entitlements for the current session.
import type { FastifyInstance } from "fastify";
import { extractBearerToken, verifySupabaseToken } from "./auth.js";

export const registerMeRoute = (server: FastifyInstance) => {
  server.get("/me", async (request, reply) => {
    // Require a valid Supabase bearer token to return profile and entitlements.
    const token = extractBearerToken(request);
    if (!token) {
      return reply.status(401).send({ error: "Missing bearer token" });
    }

    try {
      const user = await verifySupabaseToken(token);
      const plan = (process.env.MOCK_PLAN ?? "free") === "premium" ? "premium" : "free";
      const allowlist = (process.env.MOCK_PROVIDER_ALLOWLIST ?? "mock")
        .split(",")
        .map((entry) => entry.trim())
        .filter(Boolean);

      return {
        user,
        entitlements: {
          plan,
          providerAllowlist: allowlist
        }
      };
    } catch (error) {
      return reply.status(401).send({ error: "Invalid token" });
    }
  });
};
