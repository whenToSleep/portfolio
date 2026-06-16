import type { MetadataRoute } from "next";
import { getWorks } from "@/lib/payload";
import { SITE_URL } from "@/lib/seo";

// Static page paths (locale-less); work slugs are appended from the CMS.
const STATIC_PATHS = ["/", "/works", "/letter", "/masthead"];

const abs = (lang: string, path: string) =>
  `${SITE_URL}${path === "/" ? `/${lang}` : `/${lang}${path}`}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const works = await getWorks("en");
  const paths = [...STATIC_PATHS, ...works.map((w) => `/work/${w.slug}`)];

  // One entry per path (canonical = EN), with hreflang alternates for both locales.
  return paths.map((path) => ({
    url: abs("en", path),
    alternates: { languages: { en: abs("en", path), uk: abs("uk", path) } },
  }));
}
