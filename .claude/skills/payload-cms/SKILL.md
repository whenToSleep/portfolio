---
name: payload-cms
description: Guidance for building with Payload CMS 3 inside this Next.js App Router project — collections, globals, localization (en/uk), Postgres + Drizzle, media storage, Local API usage from Server Components, and the admin UX simplifications this project needs. Use when adding/editing Payload config, collections, globals, access control, seed scripts, or wiring the frontend to Payload data. Applies from Phase 3 of PLAN.md onward.
---

# Payload CMS 3 — project guide

Reference for the CMS phases (3–8) of `PLAN.md`. Payload 3 installs **directly into this Next.js app** (one repo, one deploy). Verify exact APIs against the installed version before relying on details — `pnpm why payload` / `node_modules/payload/package.json`.

## Install / scaffold
- Add to an existing Next.js app: `npx create-payload-app@latest` (choose **Postgres**, TypeScript). It generates `src/payload.config.ts`, the `(payload)/admin` route group, and `app/(payload)/api`.
- DB adapter: `@payloadcms/db-postgres` (Drizzle under the hood; migrations via `payload migrate`). Neon for stage, self-hosted Postgres for VPS prod.
- Editor: `@payloadcms/richtext-lexical` for rich-text fields (replaces the prototype's `dangerouslySetInnerHTML` `<em>` strings).
- Storage: `@payloadcms/storage-vercel-blob` on stage → S3-compatible (`@payloadcms/storage-s3` for R2/MinIO) on VPS. Adapter swaps in one config block.

## Localization (core requirement: edit all texts in EN/UK in one place)
```ts
localization: {
  locales: ['en', 'uk'],
  defaultLocale: 'en',
  fallback: true,
}
```
- Mark translatable fields `localized: true`. Admin shows a locale switcher; each locale stores its own value.
- Local API: pass `locale` (and `fallbackLocale`) to `payload.find/findGlobal`. Map the site's active language to the Payload locale.
- Only EN/UK are supported — RU was removed. Add a locale by extending this array (and `LOCALES` in `lib/routes.ts`).

## Content model (maps the prototype's hardcoded objects → CMS)
From `lib/content.ts` and PLAN.md §3:
- **Collection `works`**: `num`, `title`🌐, `client`, `year`, `tags[]` (relation/select), `coverImage`→media, `gallery[]`→media, `body`🌐 (lexical), `subtitle`🌐, `pull`🌐, `slug`.
- **Collection `tags`**: `label`🌐, `order` (or a localized select).
- **Collection `media`** (upload): with `imageSizes` for responsive `next/image`; alt🌐.
- **Collection `users`**: auth, admin access.
- **Globals**: `siteSettings` (ARTIST: name🌐, city🌐, email, commissions, press, socials[]), `home`, `letter` (dek🌐, paragraphs🌐, signature🌐), `masthead` — all the `STR` UI strings as localized fields grouped by screen.

🌐 = `localized: true`.

## Access control
- Public read for content collections/globals: `access: { read: () => true }`.
- Write only for authenticated users.

## Frontend wiring (Phase 4)
- Use the **Local API** in Server Components: `const payload = await getPayload({ config })` then `payload.find({ collection: 'works', locale })`. No HTTP hop.
- Replace `lib/content.ts` imports with these queries. Keep the same visual components.
- Images: `next/image` from media; **graceful fallback to the `.plate` placeholder** when no image is set (images "come later" — empty works must not break layout).

## Admin UX simplifications (Phase 5 — "simple for a non-technical user")
- Group fields with `tabs`/`group`; add `admin.description` hints (clear Ukrainian labels).
- Friendly collection labels ("Работы", "Главная", "Лист", "Контакты"); set sidebar `group` and field `admin.position`.
- Hide technical fields (`admin.hidden` / `admin.disableListColumn`).
- Enable **Draft + Publish** (`versions: { drafts: true }`) and **Live Preview** so the user sees changes before publishing.

## Deploy
- Stage: Vercel (serverless) — env: `DATABASE_URI`, `PAYLOAD_SECRET`, blob token. Add ISR/on-demand revalidation so publishing updates pages.
- Prod: VPS + Docker (Next.js+Payload, Postgres, Caddy/Nginx TLS), S3-compatible storage, DB+media backups, CI on push.

## Gotchas
- Run `payload generate:types` after schema changes; commit `payload-types.ts`.
- Postgres migrations: `payload migrate:create` / `payload migrate` — don't rely on auto-push in prod.
- Next.js 16 is fully compatible with Payload 3 (confirmed 2026) — keep both current together.
