import "@/styles/globals.css";
import "@dx/ui/globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Hedvig_Letters_Serif, JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { cn } from "@dx/ui/cn";
import { Provider as Analytics } from "@dx/events/client";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { LayoutContent } from "@/components/layout-content";
import { ThemeProvider } from "@/components/theme-provider";
import { baseUrl } from "./sitemap";

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

export default function Layout({ children }: { children: ReactNode }) {
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
        <Script
          id="json-ld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `!function(){try{var e=localStorage.getItem("theme");"system"===e||!e?window.matchMedia("(prefers-color-scheme: dark)").matches?document.documentElement.classList.add("dark"):document.documentElement.classList.add("light"):document.documentElement.classList.add(e),"dark"===e?document.documentElement.style.colorScheme="dark":"light"===e&&(document.documentElement.style.colorScheme="light")}catch(e){}}();`,
          }}
        />
      </head>
      <body
        className={cn(
          `${jetbrainsMono.variable} ${hedvigSerif.variable}`,
          "bg-background overflow-hidden antialiased",
        )}
      >
        <NuqsAdapter>
          <ThemeProvider
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <LayoutContent>{children}</LayoutContent>
            <Analytics />
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
