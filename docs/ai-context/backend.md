Always update this context file whenever related changes are made.

# Backend Context

- Fastify server in apps/api/src/server.ts.
- Mock endpoints for /books and /ai/lookup via the ProviderRouter.
- OpenAI is used when OPENAI_API_KEY is set; otherwise mock provider is used.
- Validation uses shared Zod schemas from packages/shared/src/schemas.ts.
- No auth, rate limits, or persistence yet.
