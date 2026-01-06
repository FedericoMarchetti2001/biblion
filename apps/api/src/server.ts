import Fastify from "fastify";
import { mockBooks, mockLookupResponse, LookupRequestSchema } from "@biblion/shared";
import type { LookupRequest } from "@biblion/shared";

const server = Fastify({ logger: true });

server.get("/health", async () => ({ ok: true }));

server.get("/books", async () => ({ items: mockBooks }));

server.post("/ai/lookup", async (request, reply) => {
  const parsed = LookupRequestSchema.safeParse(request.body);
  if (!parsed.success) {
    return reply.status(400).send(parsed.error.flatten());
  }
  const payload = parsed.data as LookupRequest;
  return mockLookupResponse(payload);
});

const port = Number(process.env.PORT ?? 4000);
server.listen({ port, host: "0.0.0.0" }).catch((err) => {
  server.log.error(err);
  process.exit(1);
});
