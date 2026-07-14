import "@/styles/globals.css";
import { cn } from "@dx/ui/cn";
import "@dx/ui/globals.css";
import { Provider as Analytics } from "@dx/events/client";
import { ScrollArea } from "@dx/ui/scroll-area";
import type { Metadata } from "next";
import { Geist, Hedvig_Letters_Serif, JetBrains_Mono } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type { ReactElement } from "react";
import { AutoTheme } from "@/components/auto-theme";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { LandingSections } from "@/components/animated-sections/landing-sections";

import { SunsetBanner } from "@/components/sunset-banner";
import { ThemeProvider } from "@/components/theme-provider";
import { baseUrl } from "./sitemap";
import Link from "next/link";
import { Button } from "@dx/ui/button";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

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
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("font-sans", geist.variable)}
    >
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
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(){try{var e=localStorage.getItem("theme");"system"===e||!e?window.matchMedia("(prefers-color-scheme: dark)").matches?document.documentElement.classList.add("dark"):document.documentElement.classList.add("light"):document.documentElement.classList.add(e),"dark"===e?document.documentElement.style.colorScheme="dark":"light"===e&&(document.documentElement.style.colorScheme="light")}catch(e){}}();`,
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
            <Header />
            <ScrollArea className="h-dvh">
              <AutoTheme />
              <SunsetBanner />
              <main className="container mx-auto px-4 pt-16">{children}</main>
              <LandingSections />

              <div className="my-32 w[50%] lg:w-[50%] mx-auto bg-background border border-border p-8 lg:p-12 text-center relative before:absolute before:inset-0 before:bg-[repeating-linear-gradient(-60deg,rgba(219,219,219,0.4),rgba(219,219,219,0.4)_1px,transparent_1px,transparent_6px)] dark:before:bg-[repeating-linear-gradient(-60deg,rgba(44,44,44,0.4),rgba(44,44,44,0.4)_1px,transparent_1px,transparent_6px)] before:pointer-events-none">
                <div className="relative z-10">
                  <h2 className="font-serif text-2xl text-foreground mb-4">
                    Ready to try DX?
                  </h2>
                  <p className="font-sans text-base text-muted-foreground mb-6 max-w-xl mx-auto">
                    Try DX and experience a unified development toolchain.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild className="btn-inverse h-11 px-6">
                      <a href="https://github.com/essence-dx">Explore DX on GitHub</a>
                    </Button>
                    <Button asChild variant="outline" className="h-11 px-6">
                      <Link href="/pricing">View pricing</Link>
                    </Button>
                  </div>
                </div>
              </div>
              <Footer />
            </ScrollArea>
            <Analytics />
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
