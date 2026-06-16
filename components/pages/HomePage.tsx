"use client";

import { ARTIST, STR } from "@/lib/content";
import { ROUTES } from "@/lib/routes";
import { useReveal } from "@/hooks/useReveal";
import { useLang, useNavigate } from "../Providers";
import { Plate } from "../Plate";
import { Html } from "../Html";

export function HomePage() {
  const lang = useLang();
  const navigate = useNavigate();
  useReveal(lang);
  const t = STR[lang];

  return (
    <div className="view">
      <div className="page" style={{ paddingTop: 36, paddingBottom: 100 }}>
        <div
          className="grid-12 reveal"
          style={{ alignItems: "baseline", paddingBottom: 18, borderBottom: "1px solid var(--ink)" }}
        >
          <div style={{ gridColumn: "1 / span 6" }} className="mono">
            {t.home_meta_l}
          </div>
          <div style={{ gridColumn: "7 / span 6", textAlign: "right" }} className="mono">
            {t.home_meta_r}
          </div>
        </div>

        <h1
          className="display reveal"
          style={{ fontSize: 168, margin: "28px 0 48px", letterSpacing: "-0.025em", lineHeight: 1.0 }}
        >
          {lang === "uk" ? (
            <span>
              Аня <span style={{ fontStyle: "italic" }}>Волкова</span>
            </span>
          ) : (
            <span>
              Anya <span style={{ fontStyle: "italic" }}>Volkov</span>
            </span>
          )}
        </h1>

        <hr className="hrule thick reveal from-right" style={{ marginBottom: 8 }} />

        <div className="grid-12" style={{ marginTop: 56 }}>
          <div className="reveal" style={{ gridColumn: "1 / span 5" }}>
            <div className="mono" style={{ marginBottom: 24, opacity: 0.7 }}>
              {t.home_statement_label}
            </div>
            <Html
              tag="p"
              html={t.home_statement}
              className="display"
              style={{
                fontSize: 40,
                lineHeight: 1.18,
                letterSpacing: "-0.012em",
                margin: 0,
                fontVariationSettings: '"opsz" 144, "SOFT" 30, "wght" 380',
              }}
            />
          </div>

          <div className="reveal from-right" style={{ gridColumn: "7 / span 6" }}>
            <Plate variant={1} label={t.home_fig} style={{ width: "100%", aspectRatio: "4 / 5.2" }} />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 14,
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                opacity: 0.75,
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <span>
                <em
                  style={{
                    fontStyle: "italic",
                    fontFamily: "var(--body)",
                    textTransform: "none",
                    letterSpacing: 0,
                    fontSize: 13,
                  }}
                >
                  {t.fig_lead}
                </em>
                {t.home_cover_note}
              </span>
              <a className="e-link" data-cursor="Read" onClick={() => navigate(ROUTES.project)}>
                {t.read_project}
              </a>
            </div>
          </div>
        </div>

        <footer className="reveal" style={{ marginTop: 110 }}>
          <hr className="hrule thick" />
          <div className="grid-12" style={{ paddingTop: 30, paddingBottom: 40 }}>
            <div style={{ gridColumn: "1 / span 5", paddingRight: 24, borderRight: "1px solid var(--rule)" }}>
              <div className="mono" style={{ opacity: 0.6, marginBottom: 12 }}>
                {t.home_avail_label}
              </div>
              <p
                className="display"
                style={{
                  fontSize: 26,
                  lineHeight: 1.22,
                  margin: 0,
                  fontVariationSettings: '"opsz" 144, "SOFT" 30, "wght" 380',
                }}
              >
                {t.home_avail}
              </p>
            </div>
            <div style={{ gridColumn: "7 / span 3" }}>
              <div className="mono" style={{ opacity: 0.6, marginBottom: 14 }}>
                {t.home_reach_label}
              </div>
              <a
                className="e-link"
                data-cursor="Mail"
                href={`mailto:${ARTIST.email}`}
                style={{ fontFamily: "var(--body)", fontSize: 17, fontStyle: "italic" }}
              >
                {ARTIST.email}
              </a>
            </div>
            <div style={{ gridColumn: "10 / span 3" }}>
              <div className="mono" style={{ opacity: 0.6, marginBottom: 14 }}>
                {t.home_follow_label}
              </div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {t.home_social.map(([name, handle, url], i) => (
                  <li key={i} style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
                    <span className="sub" style={{ fontSize: 11 }}>
                      {name}
                    </span>
                    <a
                      className="e-link"
                      data-cursor="Visit"
                      href={url}
                      target="_blank"
                      rel="noopener"
                      style={{ fontFamily: "var(--body)", fontSize: 15, fontStyle: "italic" }}
                    >
                      {handle}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <hr className="hrule" />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              paddingTop: 16,
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <span className="mono" style={{ opacity: 0.7 }}>
              {t.home_copyright}
            </span>
            <span className="mono" style={{ opacity: 0.7 }}>
              {t.home_place}
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
