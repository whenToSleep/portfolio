import { notFound } from "next/navigation";
import { LangProvider } from "@/components/Providers";
import { LOCALES, isLocale } from "@/lib/routes";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

// Only the known locales are valid; anything else 404s.
export const dynamicParams = false;

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <LangProvider lang={lang}>{children}</LangProvider>;
}
