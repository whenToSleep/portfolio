import type { Metadata } from "next";
import {
  Playfair_Display,
  Bricolage_Grotesque,
  Source_Serif_4,
  JetBrains_Mono,
} from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/Providers";
import { SITE_URL, SEO } from "@/lib/seo";

// The four typefaces actually rendered by the design, exposed as CSS variables
// consumed by globals.css (--display / --condensed / --body / --mono).
// Cyrillic subsets are included where the UK content needs them; Bricolage has
// no Cyrillic, so UK subheads fall back exactly as in the prototype.
const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-bricolage",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin", "cyrillic"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-source-serif",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-jetbrains",
  display: "swap",
});

// Local display face used only for the four large page-title headings
// (.display-title in globals.css). Latin + Ukrainian Cyrillic; single bold style.
const holos = localFont({
  src: "./fonts/Holos-Bold.otf",
  variable: "--font-holos",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SEO.en.title,
  description: SEO.en.description,
  openGraph: {
    type: "website",
    siteName: "Anna Starostina",
  },
};

// Before paint: set theme from localStorage and <html lang> from the URL's
// locale segment (the page content is already locale-correct via SSR).
const noFlash = `(function(){try{var t=localStorage.getItem('av_theme');document.documentElement.setAttribute('data-theme',t==='dark'?'dark':'light');var s=location.pathname.split('/')[1];document.documentElement.setAttribute('lang',s==='uk'?'uk':'en');}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${playfair.variable} ${bricolage.variable} ${sourceSerif.variable} ${jetbrains.variable} ${holos.variable}`}
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: noFlash }} />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
