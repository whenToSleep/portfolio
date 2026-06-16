import type { Metadata } from "next";
import {
  Playfair_Display,
  Bricolage_Grotesque,
  Source_Serif_4,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

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

export const metadata: Metadata = {
  title: "Anya Volkov — An Illustrator's Journal",
  description:
    "The journal of illustrator and printmaker Anya Volkov — commissioned and personal work, slowly made.",
};

// Set theme + lang before paint to avoid a flash (state is hydrated in Providers).
const noFlash = `(function(){try{var t=localStorage.getItem('av_theme');document.documentElement.setAttribute('data-theme',t==='dark'?'dark':'light');var l=localStorage.getItem('av_lang');document.documentElement.setAttribute('lang',l==='uk'?'uk':'en');}catch(e){}})();`;

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
      className={`${playfair.variable} ${bricolage.variable} ${sourceSerif.variable} ${jetbrains.variable}`}
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: noFlash }} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
