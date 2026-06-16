/**
 * Visual-regression screenshots for the portfolio.
 *
 * Captures the 5 screens x {en,uk} x {day,night} = 20 frames.
 * Used to (a) freeze the prototype baseline (Phase 0) and (b) compare each
 * migration phase against that baseline.
 *
 * Usage:
 *   URL=http://localhost:8099/portfolio.html node scripts/screenshots.mjs baseline
 *   URL=http://localhost:3000               node scripts/screenshots.mjs screenshots
 *
 * The Next.js app reads language/theme from localStorage keys av_lang / av_theme,
 * exactly like the prototype, so the same script drives both.
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = process.env.URL || 'http://localhost:3000';
const OUT = process.argv[2] || 'screenshots';
mkdirSync(OUT, { recursive: true });

// nav order is fixed: [home, issue, project, letter, masthead]
const pages = ['home', 'index', 'project', 'letter', 'masthead'];
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
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.waitForSelector('header.topbar nav a', { timeout: 20000 });
    await page.waitForFunction(() => document.querySelectorAll('header.topbar nav a').length >= 5);

    for (let i = 0; i < pages.length; i++) {
      await page.locator('header.topbar nav a').nth(i).click();
      await page.waitForTimeout(800);
      const file = `${OUT}/${pages[i]}-${lang}-${themeFile}.png`;
      await page.screenshot({ path: file, fullPage: true });
      count++;
      console.log('saved', file);
    }
    await ctx.close();
  }
}
await browser.close();
console.log(`done: ${count} screenshots -> ${OUT}`);
