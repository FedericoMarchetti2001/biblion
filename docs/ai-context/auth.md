Always update this context file whenever related changes are made.

# Auth Context

- Supabase is the IdP for Google and Apple OAuth.
- Mobile uses Supabase OAuth with deep links (biblion://auth/callback).
- App listens for auth deep links and exchanges code for session via Supabase.
- API validates Supabase JWTs via service role key; /me uses this validation.
