# NFS Tech — Complete Project Guide

A full replica of **nfstech.com.pk** built as a modern, database-driven web app with a
public marketing site and a protected admin panel (CRUD for every piece of content).

---

## 1. Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | TanStack Start v1 (React 19, SSR + file-based routing) |
| Build tool | Vite 7 |
| Styling | Tailwind CSS v4 (CSS-first config in `src/styles.css`) |
| UI primitives | shadcn/ui (Radix) + custom glassmorphism utilities |
| Data layer | TanStack Query v5 |
| Database / Auth | Postgres (Supabase-compatible) with Row Level Security |
| Auth methods | Email + password, Google OAuth |
| Notifications | sonner |
| Runtime target | Edge / Node (Cloudflare Workers compatible) |

---

## 2. Directory Structure

```
.
├── db/                              # Portable SQL for self-hosting
│   ├── schema.sql                   # Tables, enum, has_role(), triggers
│   ├── seed.sql                     # All production content (services, plans, faqs, content)
│   └── README.md                    # Apply instructions
├── public/                          # Static assets (robots.txt, favicon, etc.)
├── src/
│   ├── assets/                      # Generated/imported images
│   ├── components/
│   │   ├── site/
│   │   │   ├── Header.tsx           # Sticky glass nav + portalled mobile drawer
│   │   │   ├── Footer.tsx           # Sitemap-style footer + contact info
│   │   │   ├── PageHero.tsx         # Reusable subpage hero with breadcrumbs
│   │   │   ├── PricingSection.tsx   # Reusable pricing grid + CTASection
│   │   │   └── ScrollToTop.tsx      # Glass scroll-to-top w/ progress ring (rAF-throttled)
│   │   └── ui/                      # shadcn/ui components
│   ├── data/
│   │   └── services.ts              # Static fallback service catalogue (nav menus)
│   ├── hooks/                       # use-mobile, etc.
│   ├── integrations/
│   │   ├── lovable/                 # OAuth broker helper
│   │   └── supabase/                # client.ts, client.server.ts, auth-middleware, types
│   ├── lib/
│   │   ├── api.ts                   # Typed TanStack Query options for all DB reads
│   │   └── utils.ts
│   ├── routes/
│   │   ├── __root.tsx               # Layout: Header, Outlet, Footer, ScrollToTop, Toaster
│   │   ├── index.tsx                # Home page (hero, stats, services, portfolio, pricing…)
│   │   ├── about.tsx
│   │   ├── contact.tsx
│   │   ├── faqs.tsx                 # DB-driven
│   │   ├── services.index.tsx       # DB-driven services list
│   │   ├── services.$slug.tsx       # DB-driven service detail + pricing plans
│   │   ├── website-projects.tsx
│   │   ├── graphics-design.tsx
│   │   ├── seo-portfolio.tsx
│   │   ├── auth.tsx                 # Sign in / sign up (email+password, Google)
│   │   └── _authenticated/
│   │       ├── route.tsx            # Auth gate (redirects to /auth)
│   │       └── admin.tsx            # Admin dashboard (Services/Plans/FAQs/Content)
│   ├── routeTree.gen.ts             # AUTO-GENERATED — never edit
│   ├── router.tsx                   # Router + QueryClient wiring
│   ├── start.ts                     # Server/function middleware
│   ├── server.ts
│   └── styles.css                   # Theme tokens, glass utilities, animations
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## 3. Pages & Routes

| Route | Description | Data source |
| --- | --- | --- |
| `/` | Home: hero, stats, services grid, skills, portfolio, testimonials, pricing, contact, marquee | Static + DB |
| `/about` | Company story, stats, global presence | Static |
| `/services` | All services listing | `services` table |
| `/services/$slug` | Service detail + tiered pricing plans | `services` + `plans` |
| `/faqs` | Accordion FAQ | `faqs` table |
| `/contact` | Contact details + lead form | Static |
| `/website-projects` | Portfolio by business category | Static |
| `/graphics-design` | Branding / logo portfolio | Static |
| `/seo-portfolio` | SEO case studies with growth metrics | Static |
| `/auth` | Sign in / sign up (email+password, Google) | Auth |
| `/admin` | Admin dashboard (protected) | All tables |

---

## 4. Features

### Public site
- Pixel-faithful replica of the original dark theme with neon-lime (`oklch(0.92 0.22 128)`) accent.
- **Glassmorphism**: `glass`, `glass-strong`, `card-dark` utilities with backdrop blur, saturation and primary-tinted borders.
- **Animations**: `fade-up`, `fade-in`, `scale-in`, `slide-in-left/right`, `blur-in`, `letter-drop`, `reveal-mask`, `text-shimmer`, `glow-pulse`, `gradient-shift`, `marquee`, `float`, plus `hover-lift` and `story-link` micro-interactions.
- **Aurora backgrounds** (`bg-aurora`) and decorative blurred neon blobs.
- **Mobile drawer navigation**: animated hamburger → X, 86%-width slide-in panel, backdrop, collapsible Services/Portfolio accordions, body-scroll lock, auto-close on route change. Rendered through a **React portal into `document.body`** so the header's `backdrop-filter` cannot trap `position: fixed`.
- **Scroll-to-top** button with circular scroll-progress ring, rAF-throttled listener.
- Fully responsive (360px → 4K); heavy blurs/animations are downgraded under 900px for smooth scrolling; `prefers-reduced-motion` respected.

### Admin panel (`/admin`)
- Protected by the `_authenticated` route gate + `user_roles` admin check.
- First signed-in user can **Claim Admin Role** (`claim_admin()` SQL function).
- Tabs:
  - **Services** — create / edit / delete (slug, title, heading, intro, meta title, meta description, pricing label, price suffix, sort order).
  - **Pricing Plans** — create / edit / delete per service (name, note, price, feature list, featured flag, order).
  - **FAQs** — create / edit / delete (question, answer, order).
  - **Site Content** — key/JSON editor for global sections (hero, about, contact).
- Every mutation invalidates the matching TanStack Query cache, so the public site reflects changes immediately.

### SEO
- Per-route `head()` with unique title, meta description, keywords, canonical, Open Graph and Twitter card tags.
- JSON-LD `Organization` structured data on the home page.
- Semantic HTML, single H1 per page, alt text on images, lazy-loaded imagery.
- `/admin` and `/auth` are `noindex, nofollow`.
- `public/robots.txt` and sitemap-ready structure.

---

## 5. Database Schema

Tables (all in `public`):

| Table | Key columns |
| --- | --- |
| `services` | `slug` (unique), `title`, `heading`, `intro`, `meta_title`, `meta_desc`, `pricing_label`, `price_suffix`, `sort_order` |
| `plans` | `service_slug` → `services.slug`, `name`, `note`, `price`, `features text[]`, `featured`, `sort_order` |
| `faqs` | `question`, `answer`, `sort_order` |
| `site_content` | `key` (unique), `value jsonb` |
| `user_roles` | `user_id`, `role app_role('admin','user')` |

Helpers: `has_role(uuid, app_role)` (security definer), `claim_admin()`, `touch_updated_at()` trigger on every table.

**Security model**
- RLS enabled everywhere.
- Public read (`SELECT`) on `services`, `plans`, `faqs`, `site_content`.
- Insert/update/delete restricted to `has_role(auth.uid(), 'admin')`.
- Roles are stored in a **separate table** — never on a profile — to prevent privilege escalation.

---

## 6. Local Development

```bash
# 1. Install dependencies (bun recommended, npm/pnpm also work)
bun install

# 2. Create .env
cat > .env <<'ENV'
VITE_SUPABASE_URL="https://<project>.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="<publishable-key>"
VITE_SUPABASE_PROJECT_ID="<project-id>"
SUPABASE_URL="https://<project>.supabase.co"
SUPABASE_PUBLISHABLE_KEY="<publishable-key>"
SUPABASE_PROJECT_ID="<project-id>"
ENV

# 3. Run
bun run dev          # http://localhost:8080

# 4. Quality gates
bun run lint
bun run build        # production build → .output / dist
```

---

## 7. Database Setup (self-hosting)

Any Postgres 14+ instance works (Supabase, Neon, RDS, local Docker).

```bash
export DATABASE_URL="postgres://user:pass@host:5432/nfstech"

psql "$DATABASE_URL" -f db/schema.sql   # tables, enum, functions, triggers
psql "$DATABASE_URL" -f db/seed.sql     # 13 services, 39 plans, FAQs, site content
```

Then either:
- **Supabase route (recommended, zero code change):** create a Supabase project, run the two SQL files in the SQL editor, enable RLS policies from `schema.sql`, add Google OAuth credentials under Authentication → Providers, and paste the project URL + publishable key into `.env`.
- **Vanilla Postgres route:** add your own RLS/auth layer, then replace `src/integrations/supabase/client.ts` with an API client that exposes the same `from(...).select/insert/update/delete` surface consumed by `src/lib/api.ts` and `src/routes/_authenticated/admin.tsx`.

### Bootstrapping the admin user
1. Deploy / run the app.
2. Visit `/auth`, sign up with email + password (or Google).
3. Visit `/admin` → click **Claim Admin Role**. Only the first user can claim it.
4. Additional admins: `INSERT INTO user_roles (user_id, role) VALUES ('<uuid>', 'admin');`

---

## 8. Hosting / Deployment Guide

The app is a TanStack Start SSR application. Build output is a Node/Edge server plus static assets.

```bash
bun run build
```

### Option A — Cloudflare Workers / Pages
1. `bun run build`
2. Set environment variables in the dashboard (`SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `VITE_*` equivalents).
3. Deploy the generated worker bundle (`wrangler deploy`).
4. Point your domain's DNS at the Worker route.

### Option B — Vercel / Netlify
1. Connect the repository.
2. Build command `bun run build` (or `npm run build`), output directory as reported by the build log.
3. Add the same environment variables in the project settings.
4. Deploy; both platforms handle SSR functions automatically.

### Option C — Your own VPS (Node + Nginx)
```bash
bun install --production
bun run build
# start the SSR server (pm2 keeps it alive)
pm2 start "node .output/server/index.mjs" --name nfstech
```
Nginx reverse proxy:
```nginx
server {
  listen 80;
  server_name nfstech.com.pk www.nfstech.com.pk;
  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}
```
Then `certbot --nginx -d nfstech.com.pk -d www.nfstech.com.pk` for HTTPS.

### Option D — Docker
```dockerfile
FROM oven/bun:1 AS build
WORKDIR /app
COPY . .
RUN bun install && bun run build

FROM oven/bun:1
WORKDIR /app
COPY --from=build /app/.output ./.output
ENV PORT=3000
EXPOSE 3000
CMD ["bun", ".output/server/index.mjs"]
```

### Post-deploy checklist
- [ ] Environment variables set on the host (server **and** `VITE_` client vars).
- [ ] `db/schema.sql` + `db/seed.sql` applied.
- [ ] Google OAuth redirect URL includes your production origin.
- [ ] Admin claimed at `/admin`.
- [ ] `robots.txt` and sitemap reachable.
- [ ] Public pages reflect an admin edit (end-to-end wiring test).

---

## 9. Content Editing Workflow

1. Sign in at `/auth` with the admin account.
2. Go to `/admin`.
3. Pick a tab → add, edit or delete a record → **Save**.
4. The change writes to Postgres, the query cache invalidates, and the public
   pages (`/services`, `/services/:slug`, `/faqs`, home sections) render the new
   content on next view — no redeploy required.

---

## 10. Design Tokens

```css
--background: oklch(0.14 0.01 260);   /* near-black navy */
--foreground: oklch(0.98 0 0);
--card:       oklch(0.18 0.01 260);
--muted:      oklch(0.22 0.01 260);
--border:     oklch(0.28 0.01 260);
--primary:    oklch(0.92 0.22 128);   /* neon lime */
--font-display: "Space Grotesk";
--font-sans:    "Inter";
```

Never hardcode colours in components — always use the semantic tokens or the
`glass` / `card-dark` / `btn-primary` utilities so theming stays consistent.

---

## 11. Conventions & Gotchas

- `src/routeTree.gen.ts` is generated — never edit it by hand.
- `src/integrations/supabase/*.ts` are generated — do not modify.
- Tailwind v4 has **no** `tailwind.config.js`; all theme config lives in `src/styles.css` under `@theme` / `@theme inline`.
- Custom utilities use `@utility`, not `@layer utilities`.
- Anything `position: fixed` that must escape the sticky header (drawers, modals) **must be portalled to `document.body`**, because `backdrop-filter` creates a containing block.
- Protected pages live under `src/routes/_authenticated/`; public routes must never contain an auth gate.
