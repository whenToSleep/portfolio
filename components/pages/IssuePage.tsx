"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { STR } from "@/lib/content";
import { ROUTES } from "@/lib/routes";
import type { WorkCard, TagItem } from "@/lib/payload";
import { useReveal } from "@/hooks/useReveal";
import { useLang, useNavigate } from "../Providers";
import { Plate } from "../Plate";

export function IssuePage({ works, tags }: { works: WorkCard[]; tags: TagItem[] }) {
  const lang = useLang();
  const navigate = useNavigate();
  const t = STR[lang];
  const [hovered, setHovered] = useState<WorkCard["id"] | null>(null);
  const [filter, setFilter] = useState<string>("All");
  useReveal(lang + filter);

  const list = useMemo(
    () => (filter === "All" ? works : works.filter((w) => w.tags.some((tg) => tg.value === filter))),
    [filter, works],
  );

  return (
    <div className="view">
      <div className="page" style={{ paddingTop: 36, paddingBottom: 120 }}>
        <div className="grid-12" style={{ alignItems: "baseline", paddingBottom: 16, borderBottom: "1px solid var(--ink)" }}>
          <div className="mono" style={{ gridColumn: "1 / span 6" }}>
            {t.issue_meta_l}
          </div>
          <div className="mono" style={{ gridColumn: "7 / span 6", textAlign: "right" }}>
            {t.issue_meta_r}
          </div>
        </div>

        <h2
          className="display reveal"
          style={{ fontSize: 132, margin: "32px 0 10px", letterSpacing: "-0.022em", lineHeight: 0.92 }}
          dangerouslySetInnerHTML={{ __html: t.issue_title }}
        />
        <p className="reveal from-right sub" style={{ fontSize: 14, margin: "0 0 32px" }}>
          {t.issue_dek}
        </p>

        {/* Tag filter — text links, accent for active */}
        <div
          className="reveal"
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 22,
            flexWrap: "wrap",
            paddingBottom: 22,
            borderBottom: "2px solid var(--ink)",
          }}
        >
          <span className="mono" style={{ opacity: 0.6 }}>
            {t.filter_label}
          </span>
          <a
            className={`e-link sub ${filter === "All" ? "is-active" : ""}`}
            style={{ fontSize: 13 }}
            onClick={() => setFilter("All")}
          >
            {t.filter_all}
          </a>
          {tags.map((tag) => (
            <a
              key={tag.value}
              className={`e-link sub ${filter === tag.value ? "is-active" : ""}`}
              style={{ fontSize: 13 }}
              onClick={() => setFilter(tag.value)}
            >
              {tag.label}
            </a>
          ))}
          <span className="mono" style={{ opacity: 0.5, marginLeft: "auto" }}>
            {t.showing} {list.length} {t.of} {works.length} {t.works_word}
          </span>
        </div>

        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {list.map((w, i) => {
            const isHover = hovered === w.id;
            const dimmed = hovered !== null && !isHover;
            return (
              <li
                key={w.id}
                className="reveal"
                onMouseEnter={() => setHovered(w.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => navigate(`/work/${w.slug}`)}
                data-cursor="View"
                style={{
                  borderBottom: "1px solid var(--rule)",
                  borderTop: i === 0 ? "1px solid var(--rule)" : "none",
                  cursor: "pointer",
                  transition: "transform 250ms ease, filter 280ms ease, opacity 280ms ease",
                  transform: isHover ? "translateX(-8px)" : "translateX(0)",
                  filter: dimmed ? "blur(2.5px)" : "blur(0)",
                  opacity: dimmed ? 0.45 : 1,
                }}
              >
                <div className="grid-12" style={{ alignItems: "center", padding: "22px 0" }}>
                  <div
                    style={{
                      gridColumn: "1 / span 1",
                      fontFamily: "var(--display)",
                      fontSize: 36,
                      fontVariationSettings: '"opsz" 144, "SOFT" 30, "wght" 400',
                      color: isHover ? "var(--accent)" : "var(--ink)",
                      transition: "color 250ms ease",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {w.num}
                    <span style={{ opacity: 0.5 }}>—</span>
                  </div>
                  <div style={{ gridColumn: "2 / span 2" }} className="sub">
                    {w.tags[0]?.label ?? ""}
                  </div>
                  <div
                    style={{
                      gridColumn: "4 / span 5",
                      fontFamily: "var(--display)",
                      fontSize: 28,
                      fontVariationSettings: '"opsz" 144, "SOFT" 30, "wght" 400',
                      letterSpacing: "-0.01em",
                      lineHeight: 1.15,
                    }}
                  >
                    {w.title}
                    <span style={{ fontStyle: "italic", opacity: 0.55, fontSize: 18, marginLeft: 10 }}>
                      — {w.client}
                    </span>
                  </div>
                  <div style={{ gridColumn: "9 / span 1", textAlign: "right" }} className="mono">
                    {w.year}
                  </div>
                  <div style={{ gridColumn: "10 / span 3", display: "flex", justifyContent: "flex-end" }}>
                    <div
                      style={{
                        width: 200,
                        height: 130,
                        transition: "transform 280ms ease",
                        transform: isHover ? "scale(1.5) translateX(-30px)" : "scale(1)",
                        transformOrigin: "right center",
                        zIndex: isHover ? 5 : 1,
                        position: "relative",
                      }}
                    >
                      {w.coverImage ? (
                        <Image
                          src={w.coverImage.url}
                          alt={w.coverImage.alt ?? w.title}
                          fill
                          sizes="200px"
                          style={{ objectFit: "cover" }}
                        />
                      ) : (
                        <Plate variant={w.plate} style={{ width: "100%", height: "100%" }} />
                      )}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div style={{ marginTop: 48, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <div className="mono" style={{ opacity: 0.7 }}>
            {t.page_of}
          </div>
          <div style={{ display: "flex", gap: 18, alignItems: "baseline" }}>
            <a className="e-link sub" data-cursor="Open" style={{ fontSize: 11 }} onClick={() => navigate(ROUTES.home)}>
              {t.pag_cover}
            </a>
            <span className="mono" style={{ color: "var(--accent)" }}>
              · 02 ·
            </span>
            <a
              className="e-link sub"
              data-cursor="Read"
              style={{ fontSize: 11 }}
              onClick={() => navigate(`/work/${(list[0] || works[0])?.slug ?? ""}`)}
            >
              {t.pag_project}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
