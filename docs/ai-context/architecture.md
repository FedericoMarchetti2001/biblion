Always update this context file whenever related changes are made.

# Architecture Context

- Monorepo with workspaces: apps/mobile (Expo), apps/api (Fastify), packages/shared (types/mocks).
- Shared contracts live in packages/shared and are imported by both app and API.
- Mock-first: mobile can run without backend; API serves mock data for now.
- Expo Metro configured for workspace packages.
- Mobile state is managed via a context provider in apps/mobile/src/shared/state.
- Auth uses Supabase OAuth on mobile and JWT validation on the API.
