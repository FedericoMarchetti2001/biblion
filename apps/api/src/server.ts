import Fastify from "fastify";
import { mockBooks, LookupRequestSchema } from "@biblion/shared";
import type { LookupRequest } from "@biblion/shared";
import { ProviderRouter, MockProvider, OpenAiProvider } from "./ai";

const server = Fastify({ logger: true });

server.get("/health", async () => ({ ok: true }));

server.get("/books", async () => ({ items: mockBooks }));

const providerRouter = new ProviderRouter([new MockProvider(), new OpenAiProvider()]);

server.post("/ai/lookup", async (request, reply) => {
  const parsed = LookupRequestSchema.safeParse(request.body);
  if (!parsed.success) {
    return reply.status(400).send(parsed.error.flatten());
  }
  const payload = parsed.data as LookupRequest;
  return providerRouter.lookup(payload, {
    plan: "free",
    providerAllowlist: ["mock"]
  });
});

const port = Number(process.env.PORT ?? 4000);
server.listen({ port, host: "0.0.0.0" }).catch((err) => {
  server.log.error(err);
  process.exit(1);
});
