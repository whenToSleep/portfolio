import { createElement, type CSSProperties } from "react";

/**
 * Renders trusted HTML-bearing strings (the content's inline `<em>` / `<br/>`).
 * Ported 1:1 from the prototype. The strings are authored content from
 * lib/content.ts, not user input. NOTE: when content moves to Payload (Phase
 * 3/4) these become Lexical rich-text fields and this helper goes away.
 */
export function Html({
  tag = "span",
  html,
  className,
  style,
}: {
  tag?: keyof HTMLElementTagNameMap;
  html: string;
  className?: string;
  style?: CSSProperties;
}) {
  return createElement(tag, {
    dangerouslySetInnerHTML: { __html: html },
    className,
    style,
  });
}
