"use client";

import Image from "next/image";
import { STR, paragraphs } from "@/lib/content";
import { ROUTES } from "@/lib/routes";
import type { WorkCard } from "@/lib/payload";
import { useReveal } from "@/hooks/useReveal";
import { useLang, useNavigate } from "../Providers";
import { Plate } from "../Plate";
import { Html } from "../Html";

export function ProjectPage({ work }: { work: WorkCard }) {
  const lang = useLang();
  const navigate = useNavigate();
  useReveal(lang);
  const t = STR[lang];
  const w = work;
  const isDigital = w.tags.some((tg) => tg.value === "Digital");
  const medium = isDigital ? t.medium_digi : t.medium_trad;
  const section = w.tags[0]?.label ?? "";
  const body = paragraphs(w.body);
  const fig2 = w.gallery[0] ?? null;

  const tomb: [string, string, boolean][] = [
    [t.tomb.client, w.context, true],
    [t.tomb.year, String(w.year), false],
    [t.tomb.medium, medium, false],
    [t.tomb.section, section, false],
  ];

  return (
    <div className="view">
      <div className="page" style={{ paddingTop: 36, paddingBottom: 120 }}>
        <div className="grid-12" style={{ alignItems: "baseline", paddingBottom: 14, borderBottom: "1px solid var(--ink)" }}>
          <div className="mono" style={{ gridColumn: "1 / span 6" }}>
            {t.proj_section} · {w.num} / 12
          </div>
          <div className="mono" style={{ gridColumn: "7 / span 6", textAlign: "right" }}>
            {w.context} · {w.year}
          </div>
        </div>

        <div className="sub reveal" style={{ fontSize: 13, margin: "40px 0 14px", color: "var(--accent)" }}>
          — {section} —
        </div>

        <h2
          className="display reveal"
          style={{ fontSize: "clamp(2.5rem, 1.39rem + 4.57vw, 5.5rem)", margin: 0, letterSpacing: "-0.022em", lineHeight: 0.98, maxWidth: "15ch" }}
        >
          {w.title}
        </h2>

        <p
          className="sub reveal from-right"
          style={{
            fontSize: 22,
            textTransform: "none",
            letterSpacing: "-0.005em",
            margin: "28px 0 56px",
            maxWidth: 720,
            opacity: 0.85,
            lineHeight: 1.35,
            fontStretch: "85%",
          }}
        >
          {w.subtitle}
        </p>

        <div className="grid-12">
          <aside style={{ gridColumn: "1 / span 3", paddingRight: 24, borderRight: "1px solid var(--rule)" }} className="reveal">
            <div className="mono" style={{ marginBottom: 16, opacity: 0.7 }}>
              {t.tomb_title}
            </div>
            <dl style={{ margin: 0 }}>
              {tomb.map(([k, v]) => (
                <div key={k} style={{ marginBottom: 16 }}>
                  <dt className="mono" style={{ opacity: 0.6, marginBottom: 4 }}>
                    {k}
                  </dt>
                  <dd style={{ margin: 0, fontFamily: "var(--body)", fontSize: 15, fontStyle: "normal" }}>
                    {v}
                  </dd>
                </div>
              ))}
            </dl>

            {t.setin_body && (
              <div style={{ marginTop: 36 }}>
                <div className="mono" style={{ marginBottom: 8, opacity: 0.6 }}>
                  {t.setin_label}
                </div>
                <Html tag="p" html={t.setin_body} style={{ margin: 0, fontFamily: "var(--body)", fontSize: 14, lineHeight: 1.5 }} />
              </div>
            )}
          </aside>

          <div style={{ gridColumn: "5 / span 8", position: "relative" }} className="article-body reveal from-right">
            <figure style={{ float: "right", width: "58%", margin: "8px 0 18px 28px", shapeOutside: "margin-box" }}>
              {w.coverImage ? (
                <div style={{ position: "relative", width: "100%", aspectRatio: "5 / 4" }}>
                  <Image
                    src={w.coverImage.url}
                    alt={w.coverImage.alt ?? w.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ) : (
                <Plate variant={w.plate} style={{ width: "100%", aspectRatio: "5 / 4" }} />
              )}
              <figcaption
                style={{ marginTop: 10, fontFamily: "var(--body)", fontStyle: "normal", fontSize: 12, opacity: 0.75, lineHeight: 1.5 }}
              >
                <span className="mono" style={{ fontStyle: "normal", marginRight: 8 }}>
                  {lang === "uk" ? "Іл. 1" : "Fig. 1"}
                </span>
                {t.fig1_cap}
              </figcaption>
            </figure>

            <p className="dropcap">{body[0]}</p>

            {w.pull && (
            <blockquote
              style={{
                margin: "36px 0 36px",
                padding: "24px 0",
                borderTop: "2px solid var(--ink)",
                borderBottom: "2px solid var(--ink)",
                clear: "left",
              }}
            >
              <p
                className="display"
                style={{
                  fontSize: "clamp(1.625rem, 1.35rem + 1.14vw, 2.375rem)",
                  margin: 0,
                  textIndent: 0,
                  lineHeight: 1.15,
                  letterSpacing: "-0.012em",
                  fontStyle: "normal",
                  fontVariationSettings: '"opsz" 144, "SOFT" 40, "wght" 380',
                }}
              >
                «{w.pull}»
              </p>
            </blockquote>
            )}

            <figure style={{ float: "left", width: "44%", margin: "4px 28px 14px 0", shapeOutside: "margin-box" }}>
              {fig2 ? (
                <div style={{ position: "relative", width: "100%", aspectRatio: "4 / 5" }}>
                  <Image
                    src={fig2.url}
                    alt={fig2.alt ?? w.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 35vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ) : (
                <Plate variant={(w.plate % 4) + 1} style={{ width: "100%", aspectRatio: "4 / 5" }} />
              )}
              <figcaption
                style={{ marginTop: 10, fontFamily: "var(--body)", fontStyle: "normal", fontSize: 12, opacity: 0.75, lineHeight: 1.5 }}
              >
                <span className="mono" style={{ fontStyle: "normal", marginRight: 8 }}>
                  {lang === "uk" ? "Іл. 2" : "Fig. 2"}
                </span>
                {t.fig4_cap}
              </figcaption>
            </figure>

            <p>{body[1]}</p>

            <div
              style={{
                marginTop: 56,
                paddingTop: 24,
                borderTop: "1px solid var(--rule)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                clear: "both",
              }}
            >
              <span className="mono" style={{ opacity: 0.7 }}>
                ✦ ✦ ✦
              </span>
              <span style={{ fontFamily: "var(--body)", fontStyle: "normal", fontSize: 14, opacity: 0.85 }}>
                {t.byline}, {w.year}
              </span>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 80, display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, flexWrap: "wrap" }}>
          <a className="e-link sub" data-cursor="Open" style={{ fontSize: 11 }} onClick={() => navigate(ROUTES.issue)}>
            {t.back_index}
          </a>
          <div style={{ display: "flex", gap: 14, alignItems: "baseline" }}>
            <span className="mono" style={{ opacity: 0.6 }}>
              {t.continue}
            </span>
            <a
              className="e-link"
              data-cursor="Read"
              style={{ fontFamily: "var(--display)", fontSize: 22, fontStyle: "normal" }}
              onClick={() => navigate(ROUTES.letter)}
            >
              {t.cont_letter}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
