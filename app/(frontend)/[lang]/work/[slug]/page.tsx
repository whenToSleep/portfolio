import { notFound } from "next/navigation";
import { getWorkBySlug, getWorks } from "@/lib/payload";
import { isLocale } from "@/lib/routes";
import { ProjectPage } from "@/components/pages/ProjectPage";

// Slugs aren't localized, so one locale's list covers all work pages. Prebuild
// the works that exist at build time; allow works added later in the admin to
// render on first request (then cached until their tag is invalidated — Phase 6).
export async function generateStaticParams() {
  const works = await getWorks("en");
  return works.map((w) => ({ slug: w.slug }));
}

export const dynamicParams = true;

export default async function Page({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const work = await getWorkBySlug(lang, slug);
  if (!work) notFound();
  return <ProjectPage work={work} />;
}
