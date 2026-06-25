import type { CSSProperties } from "react";

/**
 * Inline brand glyphs for the social links. The platform is taken from the CMS
 * social `label` ("Telegram" / "Instagram" / "TikTok"), case-insensitive.
 * Unknown platforms render nothing so a stray label can't break the layout.
 */
export function SocialIcon({
  platform,
  size = 22,
  style,
}: {
  platform: string;
  size?: number;
  style?: CSSProperties;
}) {
  const key = platform.trim().toLowerCase();
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    role: "img" as const,
    "aria-label": platform,
    style,
  };

  switch (key) {
    case "telegram":
      return (
        <svg {...common}>
          <path d="M21.94 4.6 18.6 19.36c-.25 1.1-.9 1.38-1.83.86l-5.05-3.72-2.43 2.34c-.27.27-.5.5-1 .5l.36-5.13L18.1 6.66c.4-.36-.09-.56-.62-.2L6.93 13.4l-4.98-1.56c-1.08-.34-1.1-1.08.23-1.6L20.54 3.1c.9-.33 1.69.21 1.4 1.5Z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
          <circle cx="12" cy="12" r="4.2" />
          <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      );
    case "tiktok":
      return (
        <svg {...common}>
          <path d="M16.5 2c.32 2.34 1.64 3.74 3.9 3.9v2.7c-1.3.13-2.45-.3-3.78-1.1v4.86c0 4.94-5.39 6.48-7.56 2.94-1.39-2.27-.54-6.26 3.9-6.42v2.85c-.34.06-.7.15-1.04.27-1.01.34-1.58 1-1.42 2.12.3 2.15 4.26 2.79 3.93-1.43V2h2.07Z" />
        </svg>
      );
    default:
      return null;
  }
}
