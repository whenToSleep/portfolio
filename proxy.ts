import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_LOCALE, LOCALES } from "@/lib/routes";

/**
 * Locale routing: every page lives under /{locale}. Requests without a locale
 * prefix are redirected to the visitor's preferred locale — the NEXT_LOCALE
 * cookie (set by the language switcher), else the Accept-Language header, else
 * the default. Assets and /api are excluded via the matcher below.
 */
function preferredLocale(req: NextRequest): string {
  const cookie = req.cookies.get("NEXT_LOCALE")?.value;
  if (cookie && LOCALES.includes(cookie as (typeof LOCALES)[number])) return cookie;

  const header = req.headers.get("accept-language") ?? "";
  for (const part of header.split(",")) {
    const code = part.trim().split(";")[0].toLowerCase();
    const base = code.split("-")[0];
    const hit = LOCALES.find((l) => l === base);
    if (hit) return hit;
  }
  return DEFAULT_LOCALE;
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hasLocale = LOCALES.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return NextResponse.next();

  const locale = preferredLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, Payload admin + API routes, and any path with a file extension.
  matcher: ["/((?!_next/|api/|admin|.*\\..*).*)"],
};
