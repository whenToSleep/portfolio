import { notFound } from "next/navigation";
import { WORKS, getWorkBySlug, workSlug } from "@/lib/content";
import { ProjectPage } from "@/components/pages/ProjectPage";

export function generateStaticParams() {
  return WORKS.map((w) => ({ slug: workSlug(w) }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) notFound();
  return <ProjectPage work={work} />;
}
