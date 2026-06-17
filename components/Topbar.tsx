"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { STR, type Lang, type PageKey } from "@/lib/content";
import { ROUTES, activeKey, stripLocale, withLocale } from "@/lib/routes";
import { useLang, useTheme, useNavigate } from "./Providers";

// "project" opens from a work, not the nav — keep the route key, hide it here.
const NAV_KEYS: PageKey[] = ["home", "issue", "letter", "masthead"];

export function Topbar() {
  const lang = useLang();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const router = useRouter();
  const pathname = usePathname();
  const active = activeKey(stripLocale(pathname));

  const [hideBar, setHideBar] = useState(false);
  const lastY = useRef(0);

  // Mobile burger drawer state.
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // While open: Esc closes, body scroll locks, focus enters the panel and
  // returns to the toggle on close. (Navigation/lang handlers close it
  // explicitly — see `closeMenu` — so no pathname effect is needed.)
  useEffect(() => {
    if (!menuOpen) return;
    const toggleEl = toggleRef.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      toggleEl?.focus();
    };
  }, [menuOpen]);

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

  // Drawer actions also close the drawer.
  const goMobile = (path: string) => {
    setMenuOpen(false);
    navigate(path);
  };
  const switchLangMobile = (next: Lang) => {
    setMenuOpen(false);
    switchLang(next);
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
              Анна <span className="em">Старостіна</span>
            </span>
          ) : (
            <span>
              Anna <span className="em">Starostina</span>
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

        <button
          ref={toggleRef}
          type="button"
          className="nav-toggle"
          aria-label={menuOpen ? (lang === "uk" ? "Закрити меню" : "Close menu") : lang === "uk" ? "Меню" : "Menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            {menuOpen ? (
              <>
                <line x1="4" y1="4" x2="18" y2="18" />
                <line x1="18" y1="4" x2="4" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="19" y2="6" />
                <line x1="3" y1="11" x2="19" y2="11" />
                <line x1="3" y1="16" x2="19" y2="16" />
              </>
            )}
          </svg>
        </button>
      </div>

      <div
        className={`mobile-menu-backdrop ${menuOpen ? "show" : ""}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`mobile-menu ${menuOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={lang === "uk" ? "Навігація" : "Navigation"}
      >
        <nav aria-label={t.nav.issue}>
          {NAV_KEYS.map((k) => (
            <a
              key={k}
              className={`e-link ${active === k ? "is-active" : ""}`}
              role="button"
              tabIndex={menuOpen ? 0 : -1}
              aria-current={active === k ? "page" : undefined}
              onClick={() => goMobile(ROUTES[k])}
              onKeyDown={onActivate(() => goMobile(ROUTES[k]))}
            >
              {t.nav[k]}
            </a>
          ))}
        </nav>
        <div className="menu-controls">
          <span className="ctrl-group" role="group" aria-label={lang === "uk" ? "Мова" : "Language"}>
            <a
              className={lang === "en" ? "on" : ""}
              role="button"
              tabIndex={menuOpen ? 0 : -1}
              aria-pressed={lang === "en"}
              aria-label="English"
              onClick={() => switchLangMobile("en")}
              onKeyDown={onActivate(() => switchLangMobile("en"))}
            >
              EN
            </a>
            <span className="sep">·</span>
            <a
              className={lang === "uk" ? "on" : ""}
              role="button"
              tabIndex={menuOpen ? 0 : -1}
              aria-pressed={lang === "uk"}
              aria-label="Українська"
              onClick={() => switchLangMobile("uk")}
              onKeyDown={onActivate(() => switchLangMobile("uk"))}
            >
              UA
            </a>
          </span>
          <span className="ctrl-group" role="group" aria-label={lang === "uk" ? "Тема" : "Theme"}>
            <a
              className={theme === "light" ? "on" : ""}
              role="button"
              tabIndex={menuOpen ? 0 : -1}
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
              tabIndex={menuOpen ? 0 : -1}
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
