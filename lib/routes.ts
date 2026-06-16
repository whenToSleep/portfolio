import { WORKS, workSlug, type Lang, type PageKey } from "./content";

/** Active UI locales. RU is added in Phase 3 alongside Payload. */
export const LOCALES: Lang[] = ["en", "uk"];
export const DEFAULT_LOCALE: Lang = "en";

export function isLocale(v: string | undefined): v is Lang {
  return v === "en" || v === "uk";
}

/** Default project route targets the first work (matches the prototype nav). */
export const DEFAULT_WORK_SLUG = workSlug(WORKS[0]);

/** Logical (locale-less) paths. useNavigate() prepends the active locale. */
export const ROUTES: Record<PageKey, string> = {
  home: "/",
  issue: "/works",
  project: `/work/${DEFAULT_WORK_SLUG}`,
  letter: "/letter",
  masthead: "/masthead",
};

/** Prefix a logical path with a locale: ("uk","/works") -> "/uk/works", ("en","/") -> "/en". */
export function withLocale(lang: Lang, path: string): string {
  return path === "/" ? `/${lang}` : `/${lang}${path}`;
}

/** Strip a leading locale segment: "/uk/works" -> "/works", "/en" -> "/". */
export function stripLocale(pathname: string): string {
  const seg = pathname.split("/")[1];
  if (isLocale(seg)) {
    const rest = pathname.slice(seg.length + 1);
    return rest === "" ? "/" : rest;
  }
  return pathname || "/";
}

/** Which nav key is active for a given (locale-less) pathname. */
export function activeKey(pathname: string): PageKey {
  // "/works" must be checked before "/work" (project) since one is a prefix of the other.
  if (pathname.startsWith("/works")) return "issue";
  if (pathname.startsWith("/work")) return "project";
  if (pathname.startsWith("/letter")) return "letter";
  if (pathname.startsWith("/masthead")) return "masthead";
  return "home";
}
