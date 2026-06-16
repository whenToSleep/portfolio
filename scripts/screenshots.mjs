/**
 * Visual-regression screenshots for the portfolio.
 *
 * Captures the 5 screens x {en,uk} x {day,night} = 20 frames.
 * Used to (a) freeze the prototype baseline (Phase 0) and (b) compare each
 * migration phase against that baseline.
 *
 * Usage:
 *   # Next.js app — navigates by real URL (deterministic, no view-transition artifacts):
 *   URL=http://localhost:3000 node scripts/screenshots.mjs screenshots
 *
 *   # Prototype (single-file SPA) — navigates by clicking the nav:
 *   PROTO=1 URL=http://localhost:8099/portfolio.html node scripts/screenshots.mjs baseline
 *
 * Language/theme are driven by localStorage keys av_lang / av_theme in both,
 * so the same script drives the prototype and the Next.js app.
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = process.env.URL || 'http://localhost:3000';
const PROTO = process.env.PROTO === '1';
const OUT = process.argv[2] || 'screenshots';
mkdirSync(OUT, { recursive: true });

// file slug + Next.js route. nav order is fixed: [home, issue, project, letter, masthead]
const PAGES = [
  { file: 'home', path: '/' },
  { file: 'index', path: '/works' },
  { file: 'project', path: '/work/a-letter-to-the-garden' },
  { file: 'letter', path: '/letter' },
  { file: 'masthead', path: '/masthead' },
];
const langs = ['en', 'uk'];
const themes = [['light', 'day'], ['dark', 'night']];

const browser = await chromium.launch();
let count = 0;
for (const lang of langs) {
  for (const [theme, themeFile] of themes) {
    const ctx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
      reducedMotion: 'reduce',
    });
    await ctx.addInitScript(([l, t]) => {
      localStorage.setItem('av_lang', l);
      localStorage.setItem('av_theme', t);
    }, [lang, theme]);
    const page = await ctx.newPage();

    if (PROTO) {
      // Prototype: one document, navigate by clicking the nav links.
      await page.goto(BASE, { waitUntil: 'networkidle' });
      await page.waitForSelector('header.topbar nav a', { timeout: 20000 });
      await page.waitForFunction(() => document.querySelectorAll('header.topbar nav a').length >= 5);
      for (let i = 0; i < PAGES.length; i++) {
        await page.locator('header.topbar nav a').nth(i).click();
        await page.waitForTimeout(800);
        const f = `${OUT}/${PAGES[i].file}-${lang}-${themeFile}.png`;
        await page.screenshot({ path: f, fullPage: true });
        count++;
        console.log('saved', f);
      }
    } else {
      // Next.js: navigate by real URL — locale lives in the path (/en, /uk).
      for (const p of PAGES) {
        const path = p.path === '/' ? `/${lang}` : `/${lang}${p.path}`;
        await page.goto(BASE + path, { waitUntil: 'networkidle' });
        await page.waitForSelector('header.topbar nav a', { timeout: 20000 });
        await page.waitForTimeout(800);
        const f = `${OUT}/${p.file}-${lang}-${themeFile}.png`;
        await page.screenshot({ path: f, fullPage: true });
        count++;
        console.log('saved', f);
      }
    }
    await ctx.close();
  }
}
await browser.close();
console.log(`done: ${count} screenshots -> ${OUT}`);
