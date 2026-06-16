import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MastheadPage } from "@/components/pages/MastheadPage";
import { getMasthead, getSiteSettings } from "@/lib/payload";
import { isLocale } from "@/lib/routes";
import { STR } from "@/lib/content";
import { pageMeta, stripHtml } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const [site, masthead] = await Promise.all([getSiteSettings(lang), getMasthead(lang)]);
  return pageMeta(lang, "/masthead", `${STR[lang].nav.masthead} — ${site.name}`, stripHtml(masthead.dek));
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const masthead = await getMasthead(lang);
  return <MastheadPage masthead={masthead} />;
}
