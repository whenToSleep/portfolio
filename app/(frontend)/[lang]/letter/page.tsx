import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LetterPage } from "@/components/pages/LetterPage";
import { getLetter, getSiteSettings } from "@/lib/payload";
import { isLocale } from "@/lib/routes";
import { STR } from "@/lib/content";
import { pageMeta, stripHtml } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const [site, letter] = await Promise.all([getSiteSettings(lang), getLetter(lang)]);
  return pageMeta(lang, "/letter", `${STR[lang].nav.letter} — ${site.name}`, stripHtml(letter.dek));
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const letter = await getLetter(lang);
  return <LetterPage letter={letter} />;
}
