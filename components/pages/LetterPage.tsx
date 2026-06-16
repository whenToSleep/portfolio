"use client";

import { STR, paragraphs } from "@/lib/content";
import { ROUTES } from "@/lib/routes";
import type { LetterContent } from "@/lib/payload";
import { useReveal } from "@/hooks/useReveal";
import { useLang, useNavigate } from "../Providers";
import { Html } from "../Html";

export function LetterPage({ letter }: { letter: LetterContent }) {
  const lang = useLang();
  const navigate = useNavigate();
  useReveal(lang);
  const t = STR[lang];
  const paras = paragraphs(letter.paragraphs);

  return (
    <div className="view">
      <div className="page" style={{ paddingTop: 36, paddingBottom: 120 }}>
        <div className="grid-12" style={{ alignItems: "baseline", paddingBottom: 14, borderBottom: "1px solid var(--ink)" }}>
          <div className="mono" style={{ gridColumn: "1 / span 6" }}>
            {t.letter_section}
          </div>
          <div className="mono" style={{ gridColumn: "7 / span 6", textAlign: "right" }}>
            {t.letter_place}
          </div>
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "120px 1fr", columnGap: 32, alignItems: "baseline", margin: "56px 0 28px" }}
          className="reveal"
        >
          <div className="display" style={{ fontSize: 92, color: "var(--accent)", lineHeight: 0.9, letterSpacing: "-0.02em" }}>
            — 04
          </div>
          <Html
            tag="h2"
            html={t.letter_title}
            className="display"
            style={{ fontSize: 132, margin: 0, letterSpacing: "-0.025em", lineHeight: 0.9 }}
          />
        </div>

        <p
          className="sub reveal from-right"
          style={{
            fontSize: 22,
            textTransform: "none",
            letterSpacing: "-0.005em",
            margin: "0 0 64px 152px",
            maxWidth: 640,
            opacity: 0.85,
            lineHeight: 1.35,
            fontStretch: "85%",
          }}
        >
          {letter.dek}
        </p>

        <article className="article-body reveal" style={{ maxWidth: 580, marginLeft: 152 }}>
          <p className="dropcap">{paras[0]}</p>
          {paras.slice(1).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <p
            style={{
              marginTop: 56,
              fontStyle: "italic",
              fontFamily: "var(--display)",
              fontSize: 22,
              textIndent: 0,
              fontVariationSettings: '"opsz" 144, "SOFT" 50, "wght" 380',
            }}
          >
            {letter.signature}
          </p>
        </article>

        <div
          style={{
            marginTop: 100,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            borderTop: "1px solid var(--rule)",
            paddingTop: 22,
          }}
        >
          <a className="e-link sub" data-cursor="Read" style={{ fontSize: 11 }} onClick={() => navigate(ROUTES.project)}>
            {t.pag_project_back}
          </a>
          <span className="mono" style={{ color: "var(--accent)" }}>
            · 04 ·
          </span>
          <a className="e-link sub" data-cursor="Open" style={{ fontSize: 11 }} onClick={() => navigate(ROUTES.masthead)}>
            {t.pag_masthead}
          </a>
        </div>
      </div>
    </div>
  );
}
