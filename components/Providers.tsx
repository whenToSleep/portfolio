"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import type { Lang } from "@/lib/content";
import { CustomCursor } from "./CustomCursor";
import { Topbar } from "./Topbar";

type Theme = "light" | "dark";

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void } | null>(null);
const ThemeContext = createContext<{ theme: Theme; setTheme: (t: Theme) => void } | null>(null);

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within Providers");
  return ctx;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within Providers");
  return ctx;
}

/**
 * Navigate while preserving the prototype's fade. Uses the View Transitions
 * API when available; the per-route `.view` fade-in (globals.css) covers
 * browsers without it. Page content re-mounts per route, so the fade runs.
 */
export function useNavigate() {
  const router = useRouter();
  return useCallback(
    (href: string) => {
      const go = () => router.push(href);
      const doc = document as Document & {
        startViewTransition?: (cb: () => void) => void;
      };
      if (typeof doc.startViewTransition === "function") doc.startViewTransition(go);
      else go();
    },
    [router],
  );
}

export function Providers({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [theme, setThemeState] = useState<Theme>("light");

  // Hydrate from localStorage after mount. Server and first client render must
  // agree on the default ("en"/"light") to avoid a hydration mismatch, so the
  // stored values are applied in an effect (one extra render is intentional;
  // the no-flash script in layout.tsx already set the visual theme pre-paint).
  useEffect(() => {
    const l = localStorage.getItem("av_lang");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional localStorage hydration
    if (l === "uk" || l === "en") setLangState(l);
    const t = localStorage.getItem("av_theme");
    if (t === "dark" || t === "light") setThemeState(t);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("av_lang", l);
    } catch {}
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    try {
      localStorage.setItem("av_theme", t);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang === "uk" ? "uk" : "en");
  }, [lang]);

  return (
    <LangContext value={{ lang, setLang }}>
      <ThemeContext value={{ theme, setTheme }}>
        <CustomCursor />
        <Topbar />
        <main key={lang}>{children}</main>
      </ThemeContext>
    </LangContext>
  );
}
