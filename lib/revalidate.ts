import { revalidateTag } from "next/cache";

/**
 * Cache tags used to invalidate the public pages when content is published in
 * the admin. The data layer (lib/payload.ts) tags its reads with these; Payload
 * collection/global `afterChange`/`afterDelete` hooks invalidate them.
 */
export const CACHE_TAGS = {
  works: "works",
  tags: "tags",
  work: (slug: string) => `work:${slug}`,
  global: (slug: string) => `global:${slug}`,
} as const;

/**
 * `revalidateTag` only works inside a Next.js request/render scope. Payload
 * hooks fire both there (admin save → /api route) and outside it (the seed
 * script runs the Local API in a plain tsx process), where it throws. Swallow
 * those so seeding/CLI use never crashes.
 */
export function safeRevalidateTag(tag: string): void {
  try {
    // Next 16: the "max" profile purges immediately (on-demand invalidation).
    revalidateTag(tag, "max");
  } catch {
    // Not in a Next.js scope (e.g. seed script) — nothing to revalidate.
  }
}
