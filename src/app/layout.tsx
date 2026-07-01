import "@/styles/globals.css";
import { cn } from "@dx/ui/cn";
import "@dx/ui/globals.css";
import { Provider as Analytics } from "@dx/events/client";
import type { Metadata } from "next";
import { JetBrains_Mono, Hedvig_Letters_Serif } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type { ReactElement } from "react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { SunsetBanner } from "@/components/sunset-banner";
import { ScrollArea } from "@dx/ui/scroll-area";
import { ThemeProvider } from "@/components/theme-provider";
import { AutoTheme } from "@/components/auto-theme";
import { baseUrl } from "./sitemap";

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "optional",
  variable: "--font-hedvig-sans",
  preload: true,
  adjustFontFallback: true,
  fallback: ["monospace", "system-ui", "arial"],
});

const hedvigSerif = Hedvig_Letters_Serif({
  weight: "400",
  subsets: ["latin"],
  display: "optional",
  variable: "--font-hedvig-serif",
  preload: true,
  adjustFontFallback: true,
  fallback: ["Georgia", "Times New Roman", "serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "DX — Enhanced Development Experience",
    template: "%s | DX",
  },
  description:
    "Enhanced Development Experience with repository-managed tools for code, web, agents, media, search, serialization, and more. DX is the super software ecosystem for modern developers.",
  openGraph: {
    title: "DX — Enhanced Development Experience",
    description:
      "Enhanced Development Experience with repository-managed tools for code, web, agents, media, search, serialization, and more.",
    url: baseUrl,
    siteName: "DX",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${baseUrl}/dx/dx-logo.svg`,
        width: 800,
        height: 600,
      },
      {
        url: `${baseUrl}/dx/dx-logo.svg`,
        width: 1800,
        height: 1600,
      },
    ],
  },
  twitter: {
    title: "DX — Enhanced Development Experience",
    description:
      "Enhanced Development Experience with repository-managed tools for code, web, agents, media, search, serialization, and more.",
    images: [
      {
        url: `${baseUrl}/dx/dx-logo.svg`,
        width: 800,
        height: 600,
      },
      {
        url: `${baseUrl}/dx/dx-logo.svg`,
        width: 1800,
        height: 1600,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)" },
    { media: "(prefers-color-scheme: dark)" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DX",
  url: "https://dx.tips",
  logo: "/dx/dx-logo.svg",
  sameAs: [
    "https://github.com/essence-dx",
    "https://github.com/anomalyco/opencode",
  ],
  description:
    "Enhanced Development Experience with repository-managed tools for code, web, agents, media, search, serialization, and more.",
};

export default function Layout({ children }: { children: ReactElement }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/dx/dx-icon.svg" />
        <link rel="alternate icon" href="/dx/favicon.svg" />
        <link rel="preconnect" href="https://cdn.midday.ai" />
        <link rel="dns-prefetch" href="https://cdn.midday.ai" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body
        className={cn(
          `${jetbrainsMono.variable} ${hedvigSerif.variable} font-sans`,
          "bg-background overflow-hidden font-sans antialiased",
        )}
      >
        <NuqsAdapter>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ScrollArea className="h-dvh">
              <AutoTheme />
              <SunsetBanner />
              <Header />
              <main className="container mx-auto px-4 pt-16">
                {children}
              </main>
              <Footer />
            </ScrollArea>
            <Analytics />
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
