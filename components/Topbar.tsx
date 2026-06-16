"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { STR, type Lang, type PageKey } from "@/lib/content";
import { ROUTES, activeKey, stripLocale, withLocale } from "@/lib/routes";
import { useLang, useTheme, useNavigate } from "./Providers";

const NAV_KEYS: PageKey[] = ["home", "issue", "project", "letter", "masthead"];

export function Topbar() {
  const lang = useLang();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const router = useRouter();
  const pathname = usePathname();
  const active = activeKey(stripLocale(pathname));

  const [hideBar, setHideBar] = useState(false);
  const lastY = useRef(0);

  // Hide bar on scroll down, show on scroll up (ported 1:1). Skipped entirely
  // under prefers-reduced-motion — the bar then stays put (no motion).
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    function onScroll() {
      const y = window.scrollY;
      const dy = y - lastY.current;
      if (Math.abs(dy) < 6) return;
      if (dy > 0 && y > 120) setHideBar(true);
      else setHideBar(false);
      lastY.current = y;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // These nav/control elements are <a> without href (SPA navigation via onClick);
  // make them operable by keyboard (Enter / Space).
  const onActivate = (fn: () => void) => (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      fn();
    }
  };

  // Switch language = navigate to the same page under the other locale and
  // remember the choice in a cookie the middleware reads for bare URLs.
  const switchLang = useCallback(
    (next: Lang) => {
      if (next === lang) return;
      try {
        document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=31536000; samesite=lax`;
      } catch {}
      const href = withLocale(next, stripLocale(pathname));
      const doc = document as Document & { startViewTransition?: (cb: () => void) => void };
      const go = () => router.push(href);
      if (typeof doc.startViewTransition === "function") doc.startViewTransition(go);
      else go();
    },
    [lang, pathname, router],
  );

  const t = STR[lang];

  return (
    <header className={`topbar ${hideBar ? "hidden" : ""}`}>
      <div className="topbar-inner">
        <a
          className="brand"
          data-cursor="Home"
          role="button"
          tabIndex={0}
          aria-label={t.nav.home}
          onClick={() => navigate(ROUTES.home)}
          onKeyDown={onActivate(() => navigate(ROUTES.home))}
        >
          {lang === "uk" ? (
            <span>
              Аня <span className="em">Волкова</span>
            </span>
          ) : (
            <span>
              Anya <span className="em">Volkov</span>
            </span>
          )}
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 10,
              letterSpacing: "0.12em",
              marginLeft: 14,
              opacity: 0.6,
              textTransform: "uppercase",
            }}
          >
            {t.journal}
          </span>
        </a>

        <nav aria-label={t.nav.issue}>
          {NAV_KEYS.map((k) => (
            <a
              key={k}
              className={`e-link ${active === k ? "is-active" : ""}`}
              data-cursor="Open"
              role="button"
              tabIndex={0}
              aria-current={active === k ? "page" : undefined}
              onClick={() => navigate(ROUTES[k])}
              onKeyDown={onActivate(() => navigate(ROUTES[k]))}
            >
              {t.nav[k]}
            </a>
          ))}
        </nav>

        <div className="meta-controls">
          <span className="ctrl-group" role="group" aria-label={lang === "uk" ? "Мова" : "Language"}>
            <a
              className={lang === "en" ? "on" : ""}
              role="button"
              tabIndex={0}
              aria-pressed={lang === "en"}
              aria-label="English"
              onClick={() => switchLang("en")}
              onKeyDown={onActivate(() => switchLang("en"))}
            >
              EN
            </a>
            <span className="sep">·</span>
            <a
              className={lang === "uk" ? "on" : ""}
              role="button"
              tabIndex={0}
              aria-pressed={lang === "uk"}
              aria-label="Українська"
              onClick={() => switchLang("uk")}
              onKeyDown={onActivate(() => switchLang("uk"))}
            >
              UA
            </a>
          </span>
          <span className="divider">/</span>
          <span className="ctrl-group" role="group" aria-label={lang === "uk" ? "Тема" : "Theme"}>
            <a
              className={theme === "light" ? "on" : ""}
              role="button"
              tabIndex={0}
              aria-pressed={theme === "light"}
              aria-label={t.dayNight.day}
              onClick={() => setTheme("light")}
              onKeyDown={onActivate(() => setTheme("light"))}
            >
              {t.dayNight.day}
            </a>
            <span className="sep">·</span>
            <a
              className={theme === "dark" ? "on" : ""}
              role="button"
              tabIndex={0}
              aria-pressed={theme === "dark"}
              aria-label={t.dayNight.night}
              onClick={() => setTheme("dark")}
              onKeyDown={onActivate(() => setTheme("dark"))}
            >
              {t.dayNight.night}
            </a>
          </span>
        </div>
      </div>
    </header>
  );
}
