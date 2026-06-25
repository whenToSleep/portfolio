"use client";

import { STR, WORKS } from "@/lib/content";
import { ROUTES } from "@/lib/routes";
import type { HomeContent, SiteSettings } from "@/lib/payload";
import { useReveal } from "@/hooks/useReveal";
import { useLang, useNavigate } from "../Providers";
import { Plate } from "../Plate";
import { Html } from "../Html";
import { SocialIcon } from "../SocialIcon";

export function HomePage({ home, site }: { home: HomeContent; site: SiteSettings }) {
  const lang = useLang();
  const navigate = useNavigate();
  useReveal(lang);
  const t = STR[lang];

  // Render the artist name with the last word in italic (as in the prototype).
  const nameParts = site.name.trim().split(/\s+/);
  const firstNames = nameParts.slice(0, -1).join(" ");
  const lastName = nameParts[nameParts.length - 1] ?? "";

  return (
    <div className="view">
      <div className="page" style={{ paddingTop: 36, paddingBottom: 100 }}>
        <div
          className="grid-12 reveal"
          style={{ alignItems: "baseline", paddingBottom: 18, borderBottom: "1px solid var(--ink)" }}
        >
          <div style={{ gridColumn: "1 / span 6" }} className="mono">
            {home.metaLeft}
          </div>
          <div style={{ gridColumn: "7 / span 6", textAlign: "right" }} className="mono">
            {home.metaRight}
          </div>
        </div>

        <h1
          className="display display-title reveal"
          style={{ fontSize: "clamp(3.5rem, 0.9rem + 10.67vw, 10.5rem)", margin: "28px 0 48px", letterSpacing: "-0.025em", lineHeight: 1.0 }}
        >
          <span>
            {firstNames} <span>{lastName}</span>
          </span>
        </h1>

        <hr className="hrule thick reveal from-right" style={{ marginBottom: 8 }} />

        <div className="grid-12" style={{ marginTop: 56 }}>
          <div className="reveal" style={{ gridColumn: "1 / span 5" }}>
            <div className="mono" style={{ marginBottom: 24, opacity: 0.7 }}>
              {home.statementLabel}
            </div>
            <Html
              tag="p"
              html={home.statement}
              className="display"
              style={{
                fontSize: "clamp(1.75rem, 1.4rem + 1.3vw, 2.5rem)",
                lineHeight: 1.18,
                letterSpacing: "-0.012em",
                margin: 0,
                fontVariationSettings: '"opsz" 144, "SOFT" 30, "wght" 380',
              }}
            />
          </div>

          <div className="reveal from-right" style={{ gridColumn: "7 / span 6" }}>
            <Plate variant={1} label={home.figCaption} style={{ width: "100%", aspectRatio: "4 / 5.2" }} />
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
                    fontStyle: "normal",
                    fontFamily: "var(--body)",
                    textTransform: "none",
                    letterSpacing: 0,
                    fontSize: 13,
                  }}
                >
                  {t.fig_lead}
                </em>
                {home.coverNote}
              </span>
              {WORKS.length > 0 && (
                <a className="e-link" data-cursor="Read" onClick={() => navigate(ROUTES.project)}>
                  {home.readProject}
                </a>
              )}
            </div>
          </div>
        </div>

        <footer className="reveal" style={{ marginTop: 110 }}>
          <hr className="hrule thick" />
          <div className="grid-12" style={{ paddingTop: 30, paddingBottom: 40 }}>
            <div style={{ gridColumn: "1 / span 5", paddingRight: 24, borderRight: "1px solid var(--rule)" }}>
              <div className="mono" style={{ opacity: 0.6, marginBottom: 12 }}>
                {home.availLabel}
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
                {home.avail}
              </p>
            </div>
            {site.socials.length > 0 && (
              <div style={{ gridColumn: "7 / span 6" }}>
                <div className="mono" style={{ opacity: 0.6, marginBottom: 14 }}>
                  {t.home_reach_label}
                </div>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", alignItems: "center", gap: 22 }}>
                  {site.socials.map((s, i) => (
                    <li key={i} style={{ display: "flex" }}>
                      <a
                        className="social-link"
                        data-cursor="Visit"
                        href={s.url}
                        target="_blank"
                        rel="noopener"
                        aria-label={s.label}
                      >
                        <SocialIcon platform={s.label} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
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
              {home.copyright}
            </span>
            <span className="mono" style={{ opacity: 0.7 }}>
              {home.place}
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
