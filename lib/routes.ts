import { WORKS, workSlug, type PageKey } from "./content";

/** Default project route targets the first work (matches the prototype nav). */
export const DEFAULT_WORK_SLUG = workSlug(WORKS[0]);

export const ROUTES: Record<PageKey, string> = {
  home: "/",
  issue: "/works",
  project: `/work/${DEFAULT_WORK_SLUG}`,
  letter: "/letter",
  masthead: "/masthead",
};

/** Which nav key is active for a given pathname. */
export function activeKey(pathname: string): PageKey {
  // "/works" must be checked before "/work" (project) since one is a prefix of the other.
  if (pathname.startsWith("/works")) return "issue";
  if (pathname.startsWith("/work")) return "project";
  if (pathname.startsWith("/letter")) return "letter";
  if (pathname.startsWith("/masthead")) return "masthead";
  return "home";
}
