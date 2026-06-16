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
  subtitle: string;
  pull: string;
  body: string;
};

export type SiteSettings = {
  name: string;
  city: string;
  email: string;
  commissions: string;
  press: string;
  socials: { label: string; handle: string; url: string }[];
};

export type HomeContent = {
  metaLeft: string;
  metaRight: string;
  statementLabel: string;
  statement: string;
  figCaption: string;
  coverNote: string;
  readProject: string;
  availLabel: string;
  avail: string;
  copyright: string;
  place: string;
};

export type LetterContent = { dek: string; paragraphs: string; signature: string };

export type MastheadContent = {
  dek: string;
  studioLabel: string;
  roles: { role: string; name: string; contact: string }[];
  distLabel: string;
  distribution: { label: string; handle: string; url: string }[];
  typeLabel: string;
  typeBody: string;
  colophonLeft: string;
  colophonRight: string;
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
    subtitle: (w.subtitle as string) ?? "",
    pull: (w.pull as string) ?? "",
    body: (w.body as string) ?? "",
  };
}

const str = (o: Record<string, unknown>, k: string) => (o[k] as string) ?? "";
const arr = (o: Record<string, unknown>, k: string) =>
  Array.isArray(o[k]) ? (o[k] as Record<string, unknown>[]) : [];

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

export async function getSiteSettings(locale: Lang): Promise<SiteSettings> {
  const p = await client();
  const g = (await p.findGlobal({ slug: "siteSettings", locale, depth: 0 })) as Record<string, unknown>;
  return {
    name: str(g, "name"),
    city: str(g, "city"),
    email: str(g, "email"),
    commissions: str(g, "commissions"),
    press: str(g, "press"),
    socials: arr(g, "socials").map((s) => ({ label: str(s, "label"), handle: str(s, "handle"), url: str(s, "url") })),
  };
}

export async function getHome(locale: Lang): Promise<HomeContent> {
  const p = await client();
  const g = (await p.findGlobal({ slug: "home", locale, depth: 0 })) as Record<string, unknown>;
  return {
    metaLeft: str(g, "metaLeft"),
    metaRight: str(g, "metaRight"),
    statementLabel: str(g, "statementLabel"),
    statement: str(g, "statement"),
    figCaption: str(g, "figCaption"),
    coverNote: str(g, "coverNote"),
    readProject: str(g, "readProject"),
    availLabel: str(g, "availLabel"),
    avail: str(g, "avail"),
    copyright: str(g, "copyright"),
    place: str(g, "place"),
  };
}

export async function getLetter(locale: Lang): Promise<LetterContent> {
  const p = await client();
  const g = (await p.findGlobal({ slug: "letter", locale, depth: 0 })) as Record<string, unknown>;
  return { dek: str(g, "dek"), paragraphs: str(g, "paragraphs"), signature: str(g, "signature") };
}

export async function getMasthead(locale: Lang): Promise<MastheadContent> {
  const p = await client();
  const g = (await p.findGlobal({ slug: "masthead", locale, depth: 0 })) as Record<string, unknown>;
  return {
    dek: str(g, "dek"),
    studioLabel: str(g, "studioLabel"),
    roles: arr(g, "roles").map((r) => ({ role: str(r, "role"), name: str(r, "name"), contact: str(r, "contact") })),
    distLabel: str(g, "distLabel"),
    distribution: arr(g, "distribution").map((d) => ({ label: str(d, "label"), handle: str(d, "handle"), url: str(d, "url") })),
    typeLabel: str(g, "typeLabel"),
    typeBody: str(g, "typeBody"),
    colophonLeft: str(g, "colophonLeft"),
    colophonRight: str(g, "colophonRight"),
  };
}
