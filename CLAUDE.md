# CLAUDE.md — portfolio

Bilingual (EN/UK) editorial portfolio site. Migrating a single-file React-in-browser
prototype into a production **Next.js (App Router) + Payload CMS** application, per
`PLAN.md`. This file is the working context for that migration.

## Status
- **Phase 0 — done.** Visual baseline frozen in `baseline/` (20 screenshots), git repo, screenshot tooling.
- **Phase 1 — done.** Next.js 16 scaffold; prototype ported 1:1 (pixel-faithful vs baseline). Content still hardcoded in `lib/content.ts`.
- **Phase 2 — done.** Route-based i18n: every page under `/[lang]` (`/en`, `/uk`); `proxy.ts` redirects bare paths to the preferred locale; language switcher navigates and sets a `NEXT_LOCALE` cookie. SSR serves the correct language; visual regression intact (20/20).
- **Next: Phase 3** (install Payload + content model — add `ru` as the third locale here). See roadmap below.

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
- For the **prototype** it clicks the nav (`PROTO=1 URL=http://localhost:8099/portfolio.html`); for **Next** it navigates by real URL (deterministic — avoids View Transition snapshot artifacts).
- Baseline filenames keep the slug `index` for the works page even though its route is `/works`.

## Project map
```
proxy.ts            # locale routing: redirects bare paths -> /{locale} (cookie/Accept-Language/default)
app/
  layout.tsx        # ROOT: <html>/<body>, next/font (Playfair / Bricolage / Source Serif 4 /
                    # JetBrains Mono), metadata, no-flash script (theme + <html lang> from URL),
                    # <ThemeProvider> (theme + cursor; locale-agnostic)
  globals.css       # the prototype's entire stylesheet, verbatim
  [lang]/           # /en, /uk  (generateStaticParams + dynamicParams=false)
    layout.tsx      # validates locale -> <LangProvider> (Topbar + <main key={lang}>)
    template.tsx    # re-mounts per navigation so each page's .view fade runs
    page.tsx        # Home (Cover) -> components/pages/HomePage
    works/page.tsx  # The Index (route /works — NOT /index, which collides with root)
    work/[slug]/page.tsx  # Project article (generic content, per-work tombstone)
    letter/page.tsx
    masthead/page.tsx
components/
  Providers.tsx     # ThemeProvider (theme+cursor) + LangProvider (locale from route);
                    # useTheme / useLang (read-only, from /[lang]) / useNavigate (prepends locale)
  Topbar.tsx        # nav, EN·UA (navigates locales) / Day·Night toggles, auto-hide on scroll
  CustomCursor.tsx  # cinematic cursor (desktop only)
  Plate.tsx, Html.tsx
  pages/*.tsx       # the 5 screens (client components)
hooks/useReveal.ts  # scroll-reveal
lib/content.ts      # ALL content + L() — temporary; replaced by Payload in Phase 4
lib/routes.ts       # ROUTES map + activeKey()
```

## Invariants (don't break these)
- **Pixel-faithful.** Port/change layout 1:1; verify against `baseline/` after every phase. Do not "improve" the design unasked.
- **Content lives in `lib/content.ts`** until Phase 4. Keep EN+UK in sync; RU is added with Payload.
- **Language is the `/[lang]` route segment** (read-only via `useLang()`); the switcher navigates between locales. Add a locale by extending `LOCALES` in `lib/routes.ts` + the `STR`/content dictionaries.
- **`useNavigate(path)` takes a locale-less path** ("/works") and prepends the active locale.
- **`<html lang>` is `en` in the raw SSR HTML** (the `<html>` lives in the root layout, above `/[lang]`); the no-flash script corrects it from the URL before paint. Page *content* is locale-correct server-side. Real hreflang/SEO signals land in Phase 7.
- **Theme** = `data-theme` on `<html>` (light/dark) + `av_theme`; the no-flash script in `layout.tsx` must keep setting it pre-paint.
- **`/works`, not `/index`** — the `index` segment collides with the root route and silently serves Home.
- **`activeKey()`**: check `/works` before `/work` (prefix).
- Trusted inline HTML (`<em>`/`<br/>`) is rendered via `Html`/`dangerouslySetInnerHTML`. Content is authored, not user input — this becomes Lexical rich text in Payload (Phase 3/4).
- Only 4 of the 6 prototype fonts are loaded (the two used only by the dropped Tweaks font-switcher are CSS fallbacks). The Tweaks panel is intentionally **not** ported.

## Roadmap (remaining phases — see PLAN.md for detail)
- **Phase 2 — Route i18n. ✓ done.** `/[lang]` segments, `proxy.ts` default-locale redirect, switcher. RU still pending (Phase 3).
- **Phase 3 — Payload install + content model.** `npx create-payload-app` into this app; Neon Postgres (stage) + Vercel Blob; collections `works`/`tags`/`media`/`users`, globals `siteSettings`/`home`/`letter`/`masthead`; `localization` en/uk/ru; public read, auth write. See `.claude/skills/payload-cms`.
- **Phase 4 — Seed + wire frontend to CMS.** Seed all 12 works + STR/ARTIST/LETTER (EN+UK). Replace `lib/content.ts` imports with Payload Local API in server components. `.plate` becomes the graceful fallback when a Media image is absent.
- **Phase 5 — Admin UX.** Tabs/groups, RU/clear labels + `admin.description`, hide technical fields, Draft+Publish, Live Preview — so a non-technical user can edit any text/image and publish.
- **Phase 6 — Vercel stage.** Connect repo, env (DB/Blob/PAYLOAD_SECRET), ISR/on-demand revalidation on publish.
- **Phase 7 — Images/SEO/a11y/perf.** `imageSizes` + `next/image` + blur, metadata/OG/sitemap/robots/hreflang, contrast/focus/reduced-motion/alt, Lighthouse ≥ 90. (favicon/OG currently the Next default — replace here.)
- **Phase 8 — VPS prod.** Docker compose (Next+Payload, Postgres, Caddy/Nginx TLS), S3-compatible storage (R2/MinIO), backups, CI.

Work one phase per branch off `dev`; build + visual-diff + commit at the end of each.
