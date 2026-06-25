"use client";

import { STR } from "@/lib/content";
import { ROUTES } from "@/lib/routes";
import type { MastheadContent } from "@/lib/payload";
import { useReveal } from "@/hooks/useReveal";
import { useLang, useNavigate } from "../Providers";
import { Html } from "../Html";
import { SocialIcon } from "../SocialIcon";

export function MastheadPage({ masthead }: { masthead: MastheadContent }) {
  const lang = useLang();
  const navigate = useNavigate();
  useReveal(lang);
  const t = STR[lang];
  const m = masthead;
  const hasDist = m.distribution.length > 0;
  const hasType = !!(m.typeBody && m.typeBody.trim());
  const hasRight = hasDist || hasType;

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
          className="display display-title reveal"
          style={{ fontSize: "clamp(3.25rem, 0.6rem + 10vw, 9.5rem)", margin: "32px 0 10px", letterSpacing: "-0.025em", lineHeight: 0.9 }}
        />
        <p
          className="sub reveal from-right"
          style={{ fontSize: 14, margin: "0 0 80px", paddingBottom: 22, borderBottom: "2px solid var(--ink)" }}
        >
          {m.dek}
        </p>

        <div className="grid-12 reveal">
          <div style={{ gridColumn: hasRight ? "1 / span 6" : "1 / -1", paddingRight: hasRight ? 32 : 0 }}>
            <div className="mono" style={{ opacity: 0.6, marginBottom: 24 }}>
              {m.studioLabel}
            </div>
            {m.roles.map((row, i) => (
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
                <div style={{ gridColumn: "1 / span 6", fontFamily: "var(--body)", fontSize: 15, fontStyle: "normal" }}>
                  {row.role}
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
                    {row.name}
                  </div>
                  {row.contact && row.contact !== "—" ? (
                    <a
                      className="e-link mono"
                      data-cursor="Mail"
                      href={`mailto:${row.contact}`}
                      style={{ display: "inline-block", marginTop: 4 }}
                    >
                      {row.contact}
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

          {hasRight && (
          <div style={{ gridColumn: "7 / span 6", paddingLeft: 32, borderLeft: "1px solid var(--rule)" }}>
            {hasDist && (
            <>
            <div className="mono" style={{ opacity: 0.6, marginBottom: 24 }}>
              {m.distLabel}
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {m.distribution.map((row, i) => (
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
                    {row.label}
                  </span>
                  <a
                    className="social-link"
                    data-cursor="Visit"
                    href={row.url}
                    target="_blank"
                    rel="noopener"
                    aria-label={`${row.label}${row.handle ? ` — ${row.handle}` : ""}`}
                  >
                    <SocialIcon platform={row.label} size={26} />
                  </a>
                </li>
              ))}
            </ul>
            </>
            )}

            {hasType && (
            <div style={{ marginTop: hasDist ? 56 : 0 }}>
              <div className="mono" style={{ opacity: 0.6, marginBottom: 16 }}>
                {m.typeLabel}
              </div>
              <Html tag="p" html={m.typeBody} style={{ fontFamily: "var(--body)", fontSize: 15, lineHeight: 1.62, margin: 0 }} />
            </div>
            )}
          </div>
          )}
        </div>

        <div className="footer-imprint">
          <hr className="hrule ink" />
          <div style={{ marginTop: 22, display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 24, flexWrap: "wrap" }}>
            <div className="mono" style={{ opacity: 0.75 }}>
              {m.colophonLeft}
            </div>
            <div className="mono" style={{ opacity: 0.75 }}>
              {m.colophonRight}
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
