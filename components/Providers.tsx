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
import { withLocale } from "@/lib/routes";
import { CustomCursor } from "./CustomCursor";
import { Topbar } from "./Topbar";

type Theme = "light" | "dark";

const ThemeContext = createContext<{ theme: Theme; setTheme: (t: Theme) => void } | null>(null);
const LangContext = createContext<Lang | null>(null);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

/** Active locale, derived from the [lang] route segment (read-only). */
export function useLang(): Lang {
  const lang = useContext(LangContext);
  if (!lang) throw new Error("useLang must be used within LangProvider");
  return lang;
}

/**
 * Navigate within the current locale while preserving the prototype's fade.
 * Accepts a locale-less path ("/works"); the active locale is prepended.
 * Uses the View Transitions API when available.
 */
export function useNavigate() {
  const router = useRouter();
  const lang = useLang();
  return useCallback(
    (path: string) => {
      const href = withLocale(lang, path);
      const go = () => router.push(href);
      const doc = document as Document & { startViewTransition?: (cb: () => void) => void };
      if (typeof doc.startViewTransition === "function") doc.startViewTransition(go);
      else go();
    },
    [router, lang],
  );
}

/** Root provider: theme (client, persisted) + the custom cursor. Locale-agnostic. */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");

  // Hydrate from localStorage after mount (the no-flash script in layout.tsx
  // already set the visual theme before paint to avoid a flash).
  useEffect(() => {
    const t = localStorage.getItem("av_theme");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional localStorage hydration
    if (t === "dark" || t === "light") setThemeState(t);
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

  return (
    <ThemeContext value={{ theme, setTheme }}>
      <CustomCursor />
      {children}
    </ThemeContext>
  );
}

/** Per-locale provider (under app/[lang]): supplies the active locale + chrome. */
export function LangProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <LangContext value={lang}>
      <Topbar />
      <main key={lang}>{children}</main>
    </LangContext>
  );
}
