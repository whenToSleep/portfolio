"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { STR, type PageKey } from "@/lib/content";
import { ROUTES, activeKey } from "@/lib/routes";
import { useLang, useTheme, useNavigate } from "./Providers";

const NAV_KEYS: PageKey[] = ["home", "issue", "project", "letter", "masthead"];

export function Topbar() {
  const { lang, setLang } = useLang();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const pathname = usePathname();
  const active = activeKey(pathname);

  const [hideBar, setHideBar] = useState(false);
  const lastY = useRef(0);

  // Hide bar on scroll down, show on scroll up (ported 1:1).
  useEffect(() => {
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

  const t = STR[lang];

  return (
    <header className={`topbar ${hideBar ? "hidden" : ""}`}>
      <div className="topbar-inner">
        <a className="brand" data-cursor="Home" onClick={() => navigate(ROUTES.home)}>
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

        <nav>
          {NAV_KEYS.map((k) => (
            <a
              key={k}
              className={`e-link ${active === k ? "is-active" : ""}`}
              data-cursor="Open"
              onClick={() => navigate(ROUTES[k])}
            >
              {t.nav[k]}
            </a>
          ))}
        </nav>

        <div className="meta-controls">
          <span className="ctrl-group">
            <a className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>
              EN
            </a>
            <span className="sep">·</span>
            <a className={lang === "uk" ? "on" : ""} onClick={() => setLang("uk")}>
              UA
            </a>
          </span>
          <span className="divider">/</span>
          <span className="ctrl-group">
            <a className={theme === "light" ? "on" : ""} onClick={() => setTheme("light")}>
              {t.dayNight.day}
            </a>
            <span className="sep">·</span>
            <a className={theme === "dark" ? "on" : ""} onClick={() => setTheme("dark")}>
              {t.dayNight.night}
            </a>
          </span>
        </div>
      </div>
    </header>
  );
}
