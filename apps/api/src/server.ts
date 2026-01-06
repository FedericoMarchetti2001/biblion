// Summary: Fastify API server wiring mock endpoints, env-driven entitlements, and the AI provider router.
import Fastify from "fastify";
import { mockBooks, LookupRequestSchema } from "@biblion/shared";
import type { LookupRequest } from "@biblion/shared";
import { ProviderRouter, MockProvider, OpenAiProvider } from "./ai/index.js";

const server = Fastify({ logger: true });

server.get("/health", async () => ({ ok: true }));

server.get("/books", async () => ({ items: mockBooks }));

const providerRouter = new ProviderRouter([new MockProvider(), new OpenAiProvider()]);
const useOpenAi = Boolean(process.env.OPENAI_API_KEY);
const envPlan = (process.env.MOCK_PLAN ?? "free") === "premium" ? "premium" : "free";
const envAllowlist = (process.env.MOCK_PROVIDER_ALLOWLIST ?? "mock")
  .split(",")
  .map((entry) => entry.trim())
  .filter(Boolean);

server.post("/ai/lookup", async (request, reply) => {
  const parsed = LookupRequestSchema.safeParse(request.body);
  if (!parsed.success) {
    return reply.status(400).send(parsed.error.flatten());
  }
  const payload = parsed.data as LookupRequest;
  // TODO: Replace env-based entitlements with real user plan once auth is wired.
  // Prefer OpenAI if configured so the dev flow can exercise real calls.
  return providerRouter.lookup(payload, {
    plan: useOpenAi ? "premium" : envPlan,
    providerAllowlist: useOpenAi ? ["openai", "mock"] : envAllowlist
  });
});

const port = Number(process.env.PORT ?? 4000);
server.listen({ port, host: "0.0.0.0" }).catch((err) => {
  server.log.error(err);
  process.exit(1);
});
