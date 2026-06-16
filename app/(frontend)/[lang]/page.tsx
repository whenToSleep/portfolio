import { notFound } from "next/navigation";
import { HomePage } from "@/components/pages/HomePage";
import { getHome, getSiteSettings } from "@/lib/payload";
import { isLocale } from "@/lib/routes";

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const [home, site] = await Promise.all([getHome(lang), getSiteSettings(lang)]);
  return <HomePage home={home} site={site} />;
}
