import type { Metadata } from "next";
import type { Lang } from "./content";
import { withLocale } from "./routes";

/**
 * Absolute site origin for metadataBase / sitemap / robots. Prefers an explicit
 * NEXT_PUBLIC_SITE_URL, then the Vercel-provided production URL, else localhost.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

/** OpenGraph locale codes for our two UI locales. */
export const OG_LOCALE: Record<Lang, string> = { en: "en_US", uk: "uk_UA" };

/** Site-level SEO title/description (home page + root default). */
export const SEO: Record<Lang, { title: string; description: string }> = {
  en: {
    title: "Anna Starostina — Book Illustrator, Lviv",
    description:
      "Anna Starostina — book illustrator from Lviv. Playbills, posters and book covers, drawn in graphic techniques: ink, pen and digital.",
  },
  uk: {
    title: "Анна Старостіна — книжкова ілюстраторка, Львів",
    description:
      "Анна Старостіна — книжкова ілюстраторка зі Львова. Афіші, плакати та обкладинки книг у техніці графіки: туш, перо та digital.",
  },
};

/** Strip authored inline HTML (e.g. <em>) so a string is safe as a meta description. */
export function stripHtml(s: string): string {
  return s.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

/**
 * canonical + hreflang alternates for a locale-less path ("/works", "/").
 * Relative URLs resolve against metadataBase (set in the root layout).
 */
export function alternates(lang: Lang, path: string): Metadata["alternates"] {
  return {
    canonical: withLocale(lang, path),
    languages: {
      en: withLocale("en", path),
      uk: withLocale("uk", path),
      "x-default": withLocale("en", path),
    },
  };
}

/**
 * Full per-page Metadata: title + description + canonical/hreflang + OpenGraph.
 * `path` is locale-less ("/", "/works", "/work/<slug>").
 */
export function pageMeta(lang: Lang, path: string, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: alternates(lang, path),
    openGraph: {
      title,
      description,
      url: withLocale(lang, path),
      locale: OG_LOCALE[lang],
      alternateLocale: OG_LOCALE[lang === "en" ? "uk" : "en"],
    },
  };
}
