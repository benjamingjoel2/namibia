import type { Metadata, Viewport } from "next";
import { Archivo, Newsreader } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ThemeScript } from "@/components/layout/ThemeScript";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { site } from "@/config/site";
import { locale } from "@/lib/locale";
import { OG_LOCALES } from "@/lib/i18n-paths";
import { CurrencyProvider } from "@/lib/currency";
import "../globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

// Body serif: one upright cut, not preloaded, so the heading font (the
// largest text on every hero) downloads first.
const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal"],
  variable: "--font-newsreader",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}: private journeys across Namibia`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: OG_LOCALES[locale],
    images: [{ url: "/photos/og-default.jpg", width: 1200, height: 630, alt: "Namib Light: dunes at first light" }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f0e8" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1829" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={locale === "en" ? "en-GB" : locale} className={`${archivo.variable} ${newsreader.variable}`} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-screen antialiased">
        <a
          href="#main"
          className="sr-only z-[60] bg-bg px-4 py-3 text-fg focus:not-sr-only focus:fixed focus:left-3 focus:top-3"
        >
          Skip to content
        </a>
        <CurrencyProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </CurrencyProvider>
        <RevealObserver />
      </body>
    </html>
  );
}
