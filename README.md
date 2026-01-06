# biblion

Monorepo scaffold for LexiReader (Expo + Node/TS + shared types).

## Structure

- apps/mobile: Expo React Native app
- apps/api: Fastify API (mock-first)
- packages/shared: shared types + mock fixtures

## Quick start

- Install deps: `npm install`
- Run mobile: `npm run dev:mobile`
- Run API: `npm run dev:api`

## AI context docs

Living context files live in `docs/ai-context`. Keep them updated whenever related changes are made.

## Mock-first

Mobile defaults to mock data. Set env vars to switch:

- `EXPO_PUBLIC_USE_MOCKS=false`
- `EXPO_PUBLIC_API_URL=http://localhost:4000`

