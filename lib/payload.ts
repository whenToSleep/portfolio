import "server-only";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Lang } from "./content";

// Narrow view-model types for the frontend (hand-written; payload-types.ts
// generation is pending — see CLAUDE.md CMS caveat).
export type MediaImage = {
  url: string;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
};

export type TagItem = { value: string; label: string; order: number };

export type WorkCard = {
  id: number | string;
  num: string;
  title: string;
  client: string;
  year: number;
  plate: number;
  slug: string;
  tags: { value: string; label: string }[];
  coverImage: MediaImage | null;
};

async function client() {
  return getPayload({ config });
}

function toImage(v: unknown): MediaImage | null {
  if (v && typeof v === "object" && "url" in v && (v as { url?: string }).url) {
    const m = v as { url: string; alt?: string; width?: number; height?: number };
    return { url: m.url, alt: m.alt ?? null, width: m.width ?? null, height: m.height ?? null };
  }
  return null;
}

function mapTagRef(t: unknown): { value: string; label: string } {
  if (t && typeof t === "object") {
    const o = t as { value?: string; label?: string };
    return { value: o.value ?? "", label: o.label ?? o.value ?? "" };
  }
  return { value: String(t), label: String(t) };
}

function mapWork(w: Record<string, unknown>): WorkCard {
  return {
    id: w.id as number | string,
    num: (w.num as string) ?? "",
    title: (w.title as string) ?? "",
    client: (w.client as string) ?? "",
    year: (w.year as number) ?? 0,
    plate: (w.plate as number) ?? 1,
    slug: (w.slug as string) ?? "",
    tags: Array.isArray(w.tags) ? w.tags.map(mapTagRef) : [],
    coverImage: toImage(w.coverImage),
  };
}

export async function getTags(locale: Lang): Promise<TagItem[]> {
  const p = await client();
  const res = await p.find({ collection: "tags", locale, limit: 100, sort: "order", depth: 0 });
  return res.docs.map((t: Record<string, unknown>) => ({
    value: (t.value as string) ?? "",
    label: (t.label as string) ?? "",
    order: (t.order as number) ?? 0,
  }));
}

export async function getWorks(locale: Lang): Promise<WorkCard[]> {
  const p = await client();
  const res = await p.find({ collection: "works", locale, limit: 100, sort: "num", depth: 1 });
  return res.docs.map(mapWork);
}

export async function getWorkBySlug(locale: Lang, slug: string): Promise<WorkCard | null> {
  const p = await client();
  const res = await p.find({
    collection: "works",
    locale,
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  });
  const doc = res.docs[0];
  return doc ? mapWork(doc as Record<string, unknown>) : null;
}
