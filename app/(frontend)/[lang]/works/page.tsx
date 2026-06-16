import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IssuePage } from "@/components/pages/IssuePage";
import { getWorks, getTags, getSiteSettings } from "@/lib/payload";
import { isLocale } from "@/lib/routes";
import { STR } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const site = await getSiteSettings(lang);
  const t = STR[lang];
  return pageMeta(lang, "/works", `${t.nav.issue} — ${site.name}`, t.issue_dek);
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const [works, tags] = await Promise.all([getWorks(lang), getTags(lang)]);
  return <IssuePage works={works} tags={tags} />;
}
