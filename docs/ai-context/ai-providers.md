Always update this context file whenever related changes are made.

# AI Providers Context

- Provider interface and router live in apps/api/src/ai.
- OpenAI provider uses the Responses API (OPENAI_API_KEY + OPENAI_MODEL).
- Other providers are stubbed and currently return mock responses.
- Router chooses provider based on plan and allowlist with mock fallback.
