# Operations Guide

This is the living guide for dashboard/deploy work. Update it whenever a new
production step becomes real.

## Current Hosting Shape

- Domain: `turanarican.com`
- App runtime: Next.js App Router built with OpenNext for Cloudflare
- Database: Turso SQLite through Drizzle
- Planned asset storage: Cloudflare R2/bucket for crawled source assets
- Public crawler/admin endpoints: none

## Local Checks Before Any Deploy

Run these from the repo root:

```bash
npm run typecheck
npm run lint
npm run build
npm run cf:build
npm audit --omit=dev
```

If schema changed, also run:

```bash
npm run db:generate
npm run db:migrate
```

Commit only after the relevant checks pass.

## Environment Variables

Keep real secrets out of git. `.env.example` should contain only names and safe
placeholders.

Required public/runtime variables:

- `NEXT_PUBLIC_SITE_URL`
- `TURSO_DATABASE_URL`
- `TURSO_AUTH_TOKEN`

Cloudflare/Wrangler auth is normally handled outside the app env through
Wrangler login or an API token in the deployment environment.

## Turso Dashboard Checklist

When the project reaches the real Turso setup step:

1. Create the production database.
2. Create a scoped auth token.
3. Add `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` to the deployment
   environment.
4. Run Drizzle migrations against production deliberately, not from a public app
   request path.
5. Verify migration state and table list in the dashboard.

Never paste production tokens into docs, commits, screenshots, or chat unless
the user explicitly asks for secret rotation help.

## Cloudflare Dashboard Checklist

When connecting production hosting:

1. Confirm `turanarican.com` DNS is managed or pointed correctly.
2. Configure the Worker/Pages project produced by OpenNext.
3. Add runtime variables from `.env.example`.
4. Set cache rules for static assets.
5. Enable observability/logs.
6. Add WAF/rate limiting/bot protection rules.
7. Keep Turnstile for future forms/auth only; do not gate normal lesson reading.

## R2 Asset Bucket Checklist

When source assets are ready to upload:

1. Create a bucket for lesson assets.
2. Decide the public asset URL shape.
3. Bind the bucket in `wrangler.jsonc`.
4. Upload objects using stable crawler keys like `assets/{book}/{lesson}/{id}`.
5. Store final object keys/status in `source_assets`.
6. For recreated Turkish diagrams/tables, mark the asset as `redrawn`; if the
   recreation is ambiguous or visually broken, mark it as `fallback_original`.

## Deploy Command

The configured deploy command is:

```bash
npm run cf:deploy
```

Use it only after local checks pass and required dashboard/env setup is known to
be complete.

## Post-Deploy Checks

- Home page loads at `https://turanarican.com`.
- Lesson route loads without double scrollbars.
- Turkish characters render correctly.
- KaTeX renders math.
- Exercise answers start hidden and reveal on demand.
- `/robots.txt`, `/sitemap.xml`, and `/og` respond.
- OpenGraph preview uses the expected red/black design language.
- Attribution/license text remains visible.
- Cloudflare logs show no repeated runtime errors.
