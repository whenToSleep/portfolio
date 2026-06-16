import { notFound } from "next/navigation";
import { WORKS, workSlug } from "@/lib/content";
import { getWorkBySlug } from "@/lib/payload";
import { isLocale } from "@/lib/routes";
import { ProjectPage } from "@/components/pages/ProjectPage";

export function generateStaticParams() {
  return WORKS.map((w) => ({ slug: workSlug(w) }));
}

export default async function Page({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const work = await getWorkBySlug(lang, slug);
  if (!work) notFound();
  return <ProjectPage work={work} />;
}
