import { notFound } from "next/navigation";
import { IssuePage } from "@/components/pages/IssuePage";
import { getWorks, getTags } from "@/lib/payload";
import { isLocale } from "@/lib/routes";

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const [works, tags] = await Promise.all([getWorks(lang), getTags(lang)]);
  return <IssuePage works={works} tags={tags} />;
}
