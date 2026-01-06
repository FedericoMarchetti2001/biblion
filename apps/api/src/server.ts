import Fastify from "fastify";
import { z } from "zod";
import { mockBooks, mockLookupResponse } from "@biblion/shared";
import type { LookupRequest } from "@biblion/shared";

const server = Fastify({ logger: true });

const lookupRequestSchema = z.object({
  motherTongue: z.string().min(2),
  targetLanguage: z.string().min(2),
  selectedText: z.string().min(1),
  context: z.object({
    sentence: z.string().min(1),
    paragraph: z.string().optional(),
    chapter: z.string().optional()
  }),
  bookMeta: z
    .object({
      title: z.string().optional(),
      author: z.string().optional(),
      language: z.string().optional()
    })
    .optional(),
  mode: z.enum(["quick", "detailed"])
});

server.get("/health", async () => ({ ok: true }));

server.get("/books", async () => ({ items: mockBooks }));

server.post("/ai/lookup", async (request, reply) => {
  const parsed = lookupRequestSchema.safeParse(request.body);
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
