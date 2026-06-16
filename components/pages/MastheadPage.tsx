"use client";

import { STR } from "@/lib/content";
import { ROUTES } from "@/lib/routes";
import { useReveal } from "@/hooks/useReveal";
import { useLang, useNavigate } from "../Providers";
import { Html } from "../Html";

export function MastheadPage() {
  const { lang } = useLang();
  const navigate = useNavigate();
  useReveal(lang);
  const t = STR[lang];

  return (
    <div className="view">
      <div className="page" style={{ paddingTop: 36, paddingBottom: 120 }}>
        <div className="grid-12" style={{ alignItems: "baseline", paddingBottom: 14, borderBottom: "1px solid var(--ink)" }}>
          <div className="mono" style={{ gridColumn: "1 / span 6" }}>
            {t.mast_section}
          </div>
          <div className="mono" style={{ gridColumn: "7 / span 6", textAlign: "right" }}>
            {t.page5}
          </div>
        </div>

        <Html
          tag="h2"
          html={t.mast_title}
          className="display reveal"
          style={{ fontSize: 152, margin: "32px 0 10px", letterSpacing: "-0.025em", lineHeight: 0.9 }}
        />
        <p
          className="sub reveal from-right"
          style={{ fontSize: 14, margin: "0 0 80px", paddingBottom: 22, borderBottom: "2px solid var(--ink)" }}
        >
          {t.mast_dek}
        </p>

        <div className="grid-12 reveal">
          <div style={{ gridColumn: "1 / span 6", paddingRight: 32 }}>
            <div className="mono" style={{ opacity: 0.6, marginBottom: 24 }}>
              {t.studio_label}
            </div>
            {t.roles.map((row, i) => (
              <div
                key={i}
                className="grid-12"
                style={{
                  alignItems: "baseline",
                  padding: "18px 0",
                  borderBottom: "1px solid var(--rule)",
                  borderTop: i === 0 ? "1px solid var(--rule)" : "none",
                  gap: 0,
                }}
              >
                <div style={{ gridColumn: "1 / span 6", fontFamily: "var(--body)", fontSize: 15, fontStyle: "italic" }}>
                  {row[0]}
                </div>
                <div style={{ gridColumn: "7 / span 6", textAlign: "right" }}>
                  <div
                    style={{
                      fontFamily: "var(--display)",
                      fontSize: 22,
                      fontVariationSettings: '"opsz" 144, "SOFT" 30, "wght" 400',
                      letterSpacing: "-0.01em",
                      lineHeight: 1.2,
                    }}
                  >
                    {row[1]}
                  </div>
                  {row[2] !== "—" ? (
                    <a
                      className="e-link mono"
                      data-cursor="Mail"
                      href={`mailto:${row[2]}`}
                      style={{ display: "inline-block", marginTop: 4 }}
                    >
                      {row[2]}
                    </a>
                  ) : (
                    <div className="mono" style={{ opacity: 0.5, marginTop: 4 }}>
                      —
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div style={{ gridColumn: "7 / span 6", paddingLeft: 32, borderLeft: "1px solid var(--rule)" }}>
            <div className="mono" style={{ opacity: 0.6, marginBottom: 24 }}>
              {t.dist_label}
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {t.dist.map((row, i) => (
                <li
                  key={i}
                  style={{
                    padding: "18px 0",
                    borderBottom: "1px solid var(--rule)",
                    borderTop: i === 0 ? "1px solid var(--rule)" : "none",
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    gap: 16,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--display)",
                      fontSize: 22,
                      fontVariationSettings: '"opsz" 144, "SOFT" 30, "wght" 400',
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {row[0]}
                  </span>
                  <a
                    className="e-link"
                    data-cursor="Visit"
                    href={row[2]}
                    target="_blank"
                    style={{ fontFamily: "var(--body)", fontStyle: "italic", fontSize: 15, textAlign: "right" }}
                  >
                    {row[1]}
                  </a>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: 56 }}>
              <div className="mono" style={{ opacity: 0.6, marginBottom: 16 }}>
                {t.type_label}
              </div>
              <Html tag="p" html={t.type_body} style={{ fontFamily: "var(--body)", fontSize: 15, lineHeight: 1.62, margin: 0 }} />
            </div>
          </div>
        </div>

        <div className="footer-imprint">
          <hr className="hrule ink" />
          <div style={{ marginTop: 22, display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 24, flexWrap: "wrap" }}>
            <div className="mono" style={{ opacity: 0.75 }}>
              {t.colophon_l}
            </div>
            <div className="mono" style={{ opacity: 0.75 }}>
              {t.colophon_r}
            </div>
          </div>
          <div style={{ marginTop: 28, display: "flex", gap: 18, alignItems: "baseline" }}>
            <a className="e-link sub" data-cursor="Home" style={{ fontSize: 11 }} onClick={() => navigate(ROUTES.home)}>
              {t.return_cover}
            </a>
            <span className="mono" style={{ color: "var(--accent)" }}>
              · 05 ·
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
