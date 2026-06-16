import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomePage } from "@/components/pages/HomePage";
import { getHome, getSiteSettings } from "@/lib/payload";
import { isLocale } from "@/lib/routes";
import { STR } from "@/lib/content";
import { pageMeta, stripHtml } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const [site, home] = await Promise.all([getSiteSettings(lang), getHome(lang)]);
  return pageMeta(lang, "/", `${site.name} — ${STR[lang].journal}`, stripHtml(home.statement));
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const [home, site] = await Promise.all([getHome(lang), getSiteSettings(lang)]);
  return <HomePage home={home} site={site} />;
}
