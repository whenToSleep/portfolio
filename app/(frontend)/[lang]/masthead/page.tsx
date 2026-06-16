import { notFound } from "next/navigation";
import { MastheadPage } from "@/components/pages/MastheadPage";
import { getMasthead } from "@/lib/payload";
import { isLocale } from "@/lib/routes";

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const masthead = await getMasthead(lang);
  return <MastheadPage masthead={masthead} />;
}
