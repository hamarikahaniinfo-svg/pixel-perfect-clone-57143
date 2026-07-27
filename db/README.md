# Custom Deployment — SQL Database

Portable Postgres schema + seed for self-hosting NFS Tech outside Lovable Cloud.

## Files
- `schema.sql` — tables (`services`, `plans`, `faqs`, `site_content`, `user_roles`), `app_role` enum, `has_role()`, updated_at triggers. Compatible with vanilla Postgres 14+.
- `seed.sql` — current production content (13 services, 39 plans, 5 FAQs, 3 site-content keys).

## Apply
```bash
psql "$DATABASE_URL" -f db/schema.sql
psql "$DATABASE_URL" -f db/seed.sql
```

## Notes
- No RLS policies included — add them for your auth model, or wrap access via a server layer that uses `has_role(uid, 'admin')`.
- `user_roles.user_id` is a bare `uuid` (no FK to `auth.users`) so it works with any auth provider. Populate it with the id from your auth system.
- Frontend expects the same column names/types — swap `src/integrations/supabase/client.ts` for a Postgres-backed API layer to reuse the current UI as-is.
