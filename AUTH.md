# Summary: Authentication architecture, Supabase setup checklist, and OAuth flow details.

# AUTH

## Overview

- Supabase handles OAuth (Google + Apple) and issues JWTs.
- Mobile stores the Supabase session securely and refreshes tokens automatically.
- Backend validates Supabase JWTs and enforces entitlements and limits.
- The backend never talks to Google or Apple directly.

## Supabase setup checklist

- Enable Google and Apple providers in Supabase Auth.
- Configure redirect URLs:
  - biblion://auth/callback
  - exp://127.0.0.1:19000/--/auth/callback
  - https://<project>.supabase.co/auth/v1/callback
- Set iOS bundle identifier and Android package to match app config.

## Environment variables

API (apps/api/.env)
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY
- OPENAI_API_KEY (optional for AI calls)
- OPENAI_MODEL (optional)

Mobile (apps/mobile/.env)
- EXPO_PUBLIC_SUPABASE_URL
- EXPO_PUBLIC_SUPABASE_ANON_KEY
- EXPO_PUBLIC_API_URL
- EXPO_PUBLIC_USE_MOCKS

## Mobile OAuth flow

- Use Supabase OAuth for Google and Apple.
- Redirect URI must match `biblion://auth/callback`.
- Tokens are stored in SecureStore and auto-refreshed by Supabase.

## Backend authorization

- Validate every request with Authorization: Bearer <token>.
- Use Supabase admin client to verify the token and load user profile.
- Derive entitlements server-side; do not trust the client.

## Apple notes

- If Google sign-in is offered on iOS, Apple sign-in must also be offered.
- Apple may only provide the email once; rely on stable user ID.
