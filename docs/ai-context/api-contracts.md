Always update this context file whenever related changes are made.

# API Contracts Context

- GET /books returns { items: Book[] } (mocked for now).
- POST /ai/lookup accepts LookupRequest and returns LookupResponse (mocked for now).
- Validation uses shared Zod schemas from packages/shared/src/schemas.ts.
