import type { CSSProperties } from "react";

/**
 * Placeholder for an illustration (the prototype's `.plate`). In Phase 4 this
 * becomes the graceful fallback shown when a CMS work has no image yet.
 */
export function Plate({
  variant = 1,
  label = "",
  style,
  className = "",
}: {
  variant?: number;
  label?: string;
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <div className={`plate v-${variant} ${className}`} style={style}>
      {label ? <span className="label">{label}</span> : null}
    </div>
  );
}
