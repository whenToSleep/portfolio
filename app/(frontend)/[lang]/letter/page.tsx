import { notFound } from "next/navigation";
import { LetterPage } from "@/components/pages/LetterPage";
import { getLetter } from "@/lib/payload";
import { isLocale } from "@/lib/routes";

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const letter = await getLetter(lang);
  return <LetterPage letter={letter} />;
}
