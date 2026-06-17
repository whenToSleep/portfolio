import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomePage } from "@/components/pages/HomePage";
import { getHome, getSiteSettings } from "@/lib/payload";
import { isLocale } from "@/lib/routes";
import { pageMeta, SEO } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return pageMeta(lang, "/", SEO[lang].title, SEO[lang].description);
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const [home, site] = await Promise.all([getHome(lang), getSiteSettings(lang)]);
  return <HomePage home={home} site={site} />;
}
