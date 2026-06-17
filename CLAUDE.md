# CLAUDE.md — portfolio
Вывод информации делай на русском в консоли.
Bilingual (EN/UK) editorial portfolio site. Migrating a single-file React-in-browser
prototype into a production **Next.js (App Router) + Payload CMS** application, per
`PLAN.md`. This file is the working context for that migration.

## Status

> **Convention:** keep this section current — update **Current state / Next up** (and the phase log) at the **start of every phase**, before doing the work.

**Current state (readiness):** Phases 0–7 + Adaptive + **the content pass are on `main`** (pushed). The site now shows **Anna Starostina's real content** (Lviv; EN/UK) — the CMS (Neon) was re-seeded (`pnpm seed`): the 12 demo works were **pruned**, the tag set replaced (6), and globals updated; the **Works list is intentionally empty** (renders an empty state) until real illustrations are added. Mobile layout (burger + fluid type) is live. **Phase 6 Vercel-dashboard hand-off still pending** (Blob token + live verify — checklist below). Next.js 16 + Payload 3 (Neon), Draft+Publish + on-demand revalidation. GitHub `whenToSleep/portfolio`, `main` = `dev`; Vercel deploys `main`.

**Next up:** run the Phase 6 **Vercel hand-off** + **Lighthouse** on the preview; add the **real works + illustrations** in `/admin` (the `.plate` fallback + empty state retire as works land); replace the default **OG image + favicon**. Then **Phase 8** (VPS prod). Note: a fresh deploy must read the re-seeded CMS — if Vercel restores a stale Data Cache the Works page could still show demo works, so redeploy **without build cache** if needed.

**Phase log:**
- **Phase 0 — done.** Visual baseline frozen in `baseline/` (20 screenshots), git repo, screenshot tooling.
- **Phase 1 — done.** Next.js 16 scaffold; prototype ported 1:1 (pixel-faithful vs baseline). Content still hardcoded in `lib/content.ts`.
- **Phase 2 — done.** Route-based i18n: every page under `/[lang]` (`/en`, `/uk`); `proxy.ts` redirects bare paths to the preferred locale; language switcher navigates and sets a `NEXT_LOCALE` cookie. SSR serves the correct language; visual regression intact (20/20).
- **Phase 3 — done.** Payload CMS 3 installed into the app. Admin at `/admin`, Postgres (Neon), localization `en`/`uk`. Collections `works`/`tags`/`media`/`users` + globals `siteSettings`/`home`/`letter`/`masthead`. Verified end-to-end: schema pushed to Neon, first admin created, work-with-image created, field localization works (en/uk). Frontend (phases 0–2) untouched. **Content is NOT yet read from Payload** — that's Phase 4.
- **Phase 4 — done.** All five pages are CMS-driven (server pages → `lib/payload.ts` Local API → client components via props). `scripts/seed.mts` (`pnpm seed`) idempotently seeds Tags(5) + Works(12) + globals (siteSettings/home/letter/masthead) EN+UK from `lib/content.ts`. Paragraph/body fields are **`textarea`** (not richText) — split on blank lines; `<em>` strings render via `Html`. UI **chrome** (nav, filter, pagination, tombstone labels, section lines, page titles) stays in `lib/content.ts` `STR`. Images fall back to `.plate` when absent. Verified: 20/20 vs baseline, admin edits reflect on the site.
- **Phase 5 — done.** Admin UX: Works fields grouped into tabs (Основне / Зображення / Текст), `slug`+`plate` in sidebar; **Draft + Publish** (`versions.drafts`) on Works + all globals; **Preview** buttons (`admin.preview`) open the live page per locale. Seed now publishes (`_status: published`) so the public site shows content despite drafts. Public rendering unchanged (admin-only).
- **Phase 6 — code done (Vercel hand-off pending).** On-demand revalidation without a webhook (admin + site co-deployed): every read in `lib/payload.ts` is wrapped in `unstable_cache` with tags (`works`, `tags`, `work:<slug>`, `global:<slug>`); Payload `afterChange`/`afterDelete` hooks on Works/Tags + `afterChange` on the four globals call `safeRevalidateTag` (`lib/revalidate.ts`, which uses Next 16 `revalidateTag(tag, "max")` and swallows out-of-scope calls so `pnpm seed` over REST stays safe). `work/[slug]` now derives `generateStaticParams` from the CMS (`getWorks`) with `dynamicParams = true`, so admin-added works render on first request. `next.config.ts` adds `images.remotePatterns` for `*.public.blob.vercel-storage.com`. Verified: `pnpm lint`/`pnpm build` clean (37 routes, work pages SSG from CMS); visual diff vs baseline shows only sub-1% Cyrillic font-AA + custom-cursor-dot capture noise, no layout drift. **Vercel hand-off (user):** (1) attach a Blob store and expose `BLOB_READ_WRITE_TOKEN` to Production+Preview (config enables `vercelBlobStorage` only when present); (2) confirm `DATABASE_URL_UNPOOLED`/`PAYLOAD_SECRET` are set; (3) redeploy, upload a test image + publish an edit in `/admin`, confirm it appears on the live URL without a rebuild.
- **Pre-phase «Adaptive» — code done (branch `adaptive-mobile`).** First real mobile layout (none existed). Breakpoint **768px**; desktop (≥769) untouched → desktop `baseline/` stays 20/20 (verified, worst 0.837% = unchanged font-AA noise). **Type:** the large inline headings (168/152/132/92/88/40/38) became fluid `clamp()` (rem+vw form for zoom a11y), each anchored so its value at **1440px = the old px** (the clamp max) — so desktop renders identically; two clamps (Home statement, Masthead h2) had to be nudged because their preferred term landed a hair below max at 1440. **Layout (`globals.css` mobile layer):** collapses the inline 12-col grid (`.grid-12 > * { grid-column: 1 / -1 !important }` — the key line; plain `1fr` alone didn't work because inline `grid-column` spans made implicit columns), unfloats `.article-body figure` to full width, restructures IssuePage list rows (`.issue-row` → flex column, full-width plate, `!important` to beat the row's inline `alignItems:center`), neutralizes hover-only list effects under `(hover:none)`. **Topbar:** burger **drawer** (`Topbar.tsx`) — slides from right, holds nav + EN/UA + Day/Night; a11y: `aria-expanded`/`aria-controls`, `role="dialog"`/`aria-modal`, Esc + backdrop close, body scroll-lock, focus into panel + restore to toggle, `tabIndex` gated so the off-screen panel isn't tabbable; closes on navigate/lang-switch (handlers, not a pathname effect — avoids the `set-state-in-effect` lint). Verified via Playwright at 320/390px on all 5 pages EN+UK: no horizontal overflow, headings clamp to floor, drawer open/close/navigate all correct. New **mobile regression**: `MOBILE=1 URL=… pnpm shots baseline-mobile` (390×844) → tracked `baseline-mobile/` reference.
- **Content pass — done.** Replaced all demo content (Anya Volkov/Tbilisi/named clients) with **Anna Starostina, Lviv** (final UK+EN copy from `CONTENT-IMPLEMENTATION.md`). `lib/content.ts`: new `ARTIST`, tag set (`Traditional/Digital/Book/Poster/Playbill/Cover`), `WORKS = []`, neutral `PROJECT`, new `LETTER`, full `STR` (nav → Головна/Роботи/Про мене/Контакти). New `lib/seo.ts` `SEO` title/description; root + Home metadata use it. Empty/placeholder states wired: IssuePage **empty state** + hidden filter/counter/project-pagination when no works; Home hides the *read-project* link (no works) and *Follow* column (no socials); ProjectPage hides empty *pull* + the *set-in* block; Masthead hides *Follow* + *type* blocks and **widens contacts to full width** when the right column is empty (no layout hole); Topbar nav drops *project*; brand → Anna Starostina. Field `client` kept in the DB (admin **label** → «Контекст», mapped to view-model `context`) — avoided a column rename so dev/Neon needs no migration. `scripts/seed.mts` hardened (timeout+retry) and now **prunes** CMS works/tags no longer in code. **Ran `pnpm seed` against Neon** (demo works pruned, globals updated). Verified: `pnpm lint`/clean `pnpm build` (0 work pages prebuilt) + Playwright at 1440/390 on all pages EN+UK — real content, empty state, full-width contacts, burger, no demo leftovers, no horizontal overflow. **Still placeholders:** real works/illustrations, OG image, favicon (see Next up).
- **Phase 7 — code done.** Images/SEO/a11y. **Images:** `WorkCard.gallery` now mapped (`lib/payload.ts`); `ProjectPage` Fig.1/Fig.2 render `next/image` (`fill`+`sizes`) from `coverImage`/`gallery[0]` with the **`.plate` fallback unchanged** (so placeholder works are pixel-identical); `IssuePage` thumbnail `sizes` bumped to 300px (hover scale). **SEO:** `lib/seo.ts` (`SITE_URL`, `alternates`, `pageMeta`, `stripHtml`, `OG_LOCALE`); root layout sets `metadataBase` + default OG; every page has locale-aware `generateMetadata` (title, description, canonical, hreflang `en`/`uk`/`x-default`, OpenGraph). `app/robots.ts` + `app/sitemap.ts` (must live at **app root**, not in the `(frontend)` group — robots is silently skipped inside a route group; sitemap lists static routes + CMS slugs with hreflang). `SITE_URL` reads `NEXT_PUBLIC_SITE_URL` → `VERCEL_PROJECT_PRODUCTION_URL` → localhost (set `NEXT_PUBLIC_SITE_URL` on Vercel for correct absolute URLs). **A11y/motion:** global `:focus-visible` accent ring (keyboard-only, no static drift); `CustomCursor` + `Topbar` auto-hide now bail under `prefers-reduced-motion`; Topbar nav/brand/controls got `role="button"`/`tabIndex`/`onKeyDown` (Enter/Space) + `aria-pressed`/`aria-current`/`aria-label` (they're href-less SPA links). Verified: `pnpm lint`/`pnpm build` clean (38 routes incl. robots.txt/sitemap.xml); robots/sitemap/hreflang/OG output checked over curl; visual diff vs baseline **byte-identical to Phase 6** (sub-1% font-AA noise, 0 drift). **Deferred (need real assets):** generated blur placeholders, a Home cover image (Home global has no image field — needs a content-model decision: featured work or new field), real OG image + favicon. **Lighthouse ≥ 90** to be run on the Vercel preview.

## Commands
```bash
pnpm dev      # dev server (http://localhost:3000)
pnpm build    # production build (Turbopack) + TypeScript check
pnpm start    # serve the production build
pnpm lint     # eslint (must stay clean)
pnpm shots <outDir>   # capture 20 regression screenshots (see below)
```
Package manager is **pnpm**. Node 22.

## Visual regression (how we verify every phase)
The look must not drift from the prototype. `baseline/` is the frozen reference.
```bash
# 1. build + serve
pnpm build && pnpm start
# 2. capture the current app and diff against baseline/
URL=http://localhost:3000 pnpm shots screenshots
node -e "..."   # compare screenshots/*.png to baseline/*.png (dimensions + visual)
```
- `scripts/screenshots.mjs` captures 5 screens × {en,uk} × {day,night}. Language/theme are driven by `localStorage` keys `av_lang` / `av_theme`.
- **Mobile:** `MOBILE=1 URL=… pnpm shots <dir>` captures the same 20 frames at a 390×844 phone viewport (burger layout); the reference lives in `baseline-mobile/`. Desktop (1440×900) remains the default and the pixel-faithful invariant.
- For the **prototype** it clicks the nav (`PROTO=1 URL=http://localhost:8099/portfolio.html`); for **Next** it navigates by real URL (deterministic — avoids View Transition snapshot artifacts).
- Baseline filenames keep the slug `index` for the works page even though its route is `/works`.

## Project map
```
proxy.ts            # locale routing: redirects bare paths -> /{locale} (cookie/Accept-Language/default); excludes /admin + /api
payload.config.ts   # Payload config: postgres (Neon), localization en/uk, collections + globals
payload/            # content model: collections/{Users,Media,Tags,Works}, globals/{SiteSettings,Home,Letter,Masthead}
app/
  # TWO route groups = two root layouts (Payload admin renders its own <html>):
  (frontend)/       # the public site
    layout.tsx      # ROOT: <html>/<body>, next/font, metadata, no-flash script (theme + <html lang> from URL), <ThemeProvider>
    globals.css     # the prototype's entire stylesheet, verbatim
    [lang]/         # /en, /uk  (generateStaticParams + dynamicParams=false)
      layout.tsx    # validates locale -> <LangProvider> (Topbar + <main key={lang}>)
      template.tsx  # re-mounts per navigation so each page's .view fade runs
      page.tsx      # Home (Cover) -> components/pages/HomePage
      works/page.tsx  # The Index (route /works — NOT /index, which collides with root)
      work/[slug]/page.tsx  # Project article (generic content, per-work tombstone)
      letter/page.tsx
      masthead/page.tsx
  (payload)/        # Payload admin (/admin) + REST/GraphQL API (/api/*) — generated boilerplate, do not hand-edit
components/
  Providers.tsx     # ThemeProvider (theme+cursor) + LangProvider (locale from route);
                    # useTheme / useLang (read-only, from /[lang]) / useNavigate (prepends locale)
  Topbar.tsx        # nav, EN·UA (navigates locales) / Day·Night toggles, auto-hide on scroll
  CustomCursor.tsx  # cinematic cursor (desktop only)
  Plate.tsx, Html.tsx
  pages/*.tsx       # the 5 screens (client components)
hooks/useReveal.ts  # scroll-reveal
lib/content.ts      # content + UI-chrome strings + L(). Works/Tags now come from CMS; the
                    # remaining pages (Home/Project/Letter/Masthead) + chrome labels still read here.
lib/payload.ts      # server-only Local API data layer: getWorks/getTags/getWorkBySlug (+ view-model types)
lib/routes.ts       # ROUTES map + activeKey()
scripts/seed.mts    # idempotent REST seed (run `pnpm seed` against a running dev server)
```

## Invariants (don't break these)
- **Pixel-faithful.** Port/change layout 1:1; verify against `baseline/` after every phase. Do not "improve" the design unasked.
- **Content lives in `lib/content.ts`** until Phase 4. Keep EN+UK in sync. Locales are EN/UK only (RU was removed).
- **Language is the `/[lang]` route segment** (read-only via `useLang()`); the switcher navigates between locales. Add a locale by extending `LOCALES` in `lib/routes.ts` + the `STR`/content dictionaries.
- **`useNavigate(path)` takes a locale-less path** ("/works") and prepends the active locale.
- **`<html lang>` is `en` in the raw SSR HTML** (the `<html>` lives in the root layout, above `/[lang]`); the no-flash script corrects it from the URL before paint. Page *content* is locale-correct server-side. Real hreflang/SEO signals land in Phase 7.
- **Theme** = `data-theme` on `<html>` (light/dark) + `av_theme`; the no-flash script in `layout.tsx` must keep setting it pre-paint.
- **`/works`, not `/index`** — the `index` segment collides with the root route and silently serves Home.
- **`activeKey()`**: check `/works` before `/work` (prefix).
- Trusted inline HTML (`<em>`/`<br/>`) is rendered via `Html`/`dangerouslySetInnerHTML`. Content is authored, not user input — this becomes Lexical rich text in Payload (Phase 3/4).
- Only 4 of the 6 prototype fonts are loaded (the two used only by the dropped Tweaks font-switcher are CSS fallbacks). The Tweaks panel is intentionally **not** ported.
- **Two root layouts** via route groups: `app/(frontend)` (the site) and `app/(payload)` (admin). There is **no** `app/layout.tsx`. Don't hand-edit `app/(payload)/*` — it's generated boilerplate.

## Payload / CMS (Phase 3+)
- **Admin:** `/admin`. **API:** `/api/*` (REST) and `/api/graphql`. Both excluded from the locale proxy.
- **DB:** Postgres (Neon). Payload reads `DATABASE_URL_UNPOOLED || POSTGRES_URL_NON_POOLING || DATABASE_URL` (direct/non-pooled — safe for DDL). In dev it auto-pushes schema; production needs migrations (wire before relying on prod admin — Phase 6/8).
- **Local env (`.env.local`, gitignored):** needs `DATABASE_URL_UNPOOLED` (Neon direct string) and `PAYLOAD_SECRET`. These are **Sensitive** in Vercel and do NOT come down via `vercel env pull` — set them locally by hand. On Vercel the platform injects them at runtime.
- **Media:** local disk (`/media`, gitignored) in dev. On Vercel a storage adapter is required — the config enables `vercelBlobStorage` **only when `BLOB_READ_WRITE_TOKEN` is set** (currently absent: the Blob store exists but the token isn't exposed — resolve before deploying media).
- **Content model:** `payload.config.ts` + `payload/collections/*` + `payload/globals/*`. Labels/descriptions are Ukrainian (admin UX). Localized fields use `localized: true`. Work `slug` auto-generates from the English title via a `beforeValidate` hook.
- **Caveat — type generation:** `pnpm generate:types` / `generate:importmap` currently fail with `ERR_REQUIRE_ASYNC_MODULE` (tsx + Node 22). The build does not need them yet. Resolve in Phase 4 (commit the generated `payload-types.ts` for typed Local API queries). `app/(payload)/admin/importMap.js` is the template's and works as-is.

## Roadmap (remaining phases — see PLAN.md for detail)
- **Phase 2 — Route i18n. ✓ done.** `/[lang]` segments, `proxy.ts` default-locale redirect, switcher (EN/UK).
- **Phase 3 — Payload install + content model. ✓ done.** Manual integration (not create-payload-app): packages + `app/(payload)` boilerplate (from the v3.85.1 blank template) + `withPayload` + `@payload-config`. Postgres via Neon, `localization` en/uk, public read / auth write. See `.claude/skills/payload-cms` and the CMS section above.
- **Phase 4 — Seed + wire frontend to CMS. ✓ done.** All pages read Payload (Local API); `pnpm seed` seeds Works/Tags/globals EN+UK; `.plate` fallback when no image; `textarea` (not richText) for paragraphs.
- **Phase 5 — Admin UX. ✓ done.** Tabs, clear UA labels + `admin.description`, sidebar `slug`/`plate`, Draft+Publish, Preview buttons. (Real-time iframe **Live Preview** of unsaved edits not yet wired — optional, would need draft-mode routes + `useLivePreview`.)
- **Phase 6 — Vercel stage.** ISR / on-demand revalidation so publish updates prod without a rebuild; resolve `BLOB_READ_WRITE_TOKEN` (media on Vercel); optionally generate `payload-types.ts`; optionally real-time Live Preview.
- **Phase 7 — Images/SEO/a11y/perf.** `imageSizes` + `next/image` + blur, metadata/OG/sitemap/robots/hreflang, contrast/focus/reduced-motion/alt, Lighthouse ≥ 90. (favicon/OG currently the Next default — replace here.)
- **Content — text pass (before Phase 8).** Review/correct all real copy in `/admin` (globals + works). Decide whether the remaining UI-chrome strings (`STR` in `lib/content.ts`: nav, filter, pagination, tombstone, section/page titles) need to become a `ui` global so the client can edit them too. Do this as content work in the admin, not a code migration, unless chrome must be editable.
- **Content — portfolio works (before Phase 8).** Replace the 12 **placeholder** works with the real portfolio: real titles/clients/years/tags (EN+UK) + upload real illustrations (`coverImage`/`gallery`). The `.plate` fallback retires per work as images land. This is data entry in `/admin` (or an updated `seed`), separate from the text pass above.
- **Phase 8 — VPS prod.** Docker compose (Next+Payload, Postgres, Caddy/Nginx TLS), S3-compatible storage (R2/MinIO), backups, CI. Start only after both content passes are done.

Work one phase per branch off `dev`; build + visual-diff + commit at the end of each. **At the start of each phase, update the Status section's Current state / Next up.**
