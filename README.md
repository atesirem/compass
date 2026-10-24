# Hedefly (Germany Guide)

Multilingual (TR/DE/EN) life and integration guide for people moving to Germany.
Planning documents live in [`plan/`](plan/).

## Stack
Next.js 16 (App Router), TypeScript, Tailwind CSS, next-intl, Prisma, PostgreSQL.

## Local setup
```bash
npm install
npm run db:up        # starts Postgres on localhost:5440 (docker compose)
npm run db:migrate   # applies migrations
npm run db:seed      # inserts modules and a sample guide
ADMIN_EMAIL=you@example.com ADMIN_PASSWORD='at-least-12-characters' npm run admin:create
npm run dev          # http://localhost:3000 -> redirects to /tr; admin at /admin
```
Set `SITE_URL` to the public address of the site (used for sitemap, canonical links and share images).
Copy `.env.example` to `.env` first if `.env` does not exist, and set a long random `AUTH_SECRET` (`openssl rand -hex 32`).

## Content model
- Modules contain guides; every text has a translation row per locale (`tr`, `de`, `en`).
- Missing translations fall back to Turkish and show a notice.
- Volatile facts (salaries, prices) go into the `Setting` table and are referenced in markdown as `{{setting:key}}`.
- Each guide shows a "last verified" date; unverified content is flagged.

## Next steps
See `plan/03-roadmap-and-deploy.md`.

## Tests and checks
```bash
npm test               # unit tests (Vitest)
npm run test:e2e       # browser tests incl. accessibility (Playwright); needs the database and seed data
npm run check:legal    # Impressum data complete?
npm run check:launch   # everything that must be fixed before going live
npm run db:backup      # database dump to backups/
```
See `plan/14-quality-and-security.md`.
# compass
