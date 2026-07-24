"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { AutoTheme } from "@/components/auto-theme";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { LandingSections } from "@/components/animated-sections/landing-sections";
import { ScrollArea } from "@dx/ui/scroll-area";
import { SunsetBanner } from "@/components/sunset-banner";

export function LayoutContent({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isShadcn =
    pathname === "/shadcn" ||
    pathname.startsWith("/shadcn/") ||
    pathname === "/docs" ||
    pathname.startsWith("/docs/") ||
    pathname === "/blocks" ||
    pathname.startsWith("/blocks/") ||
    pathname === "/charts" ||
    pathname.startsWith("/charts/") ||
    pathname === "/colors" ||
    pathname.startsWith("/colors/") ||
    pathname === "/create" ||
    pathname.startsWith("/create/") ||
    pathname === "/typeset" ||
    pathname.startsWith("/typeset/") ||
    pathname === "/sera" ||
    pathname.startsWith("/sera/") ||
    pathname === "/examples" ||
    pathname.startsWith("/examples/") ||
    pathname === "/preview" ||
    pathname.startsWith("/preview/") ||
    pathname === "/view" ||
    pathname.startsWith("/view/") ||
    pathname === "/init" ||
    pathname.startsWith("/init/") ||
    pathname === "/api/search" ||
    pathname === "/og" ||
    pathname.startsWith("/og/") ||
    pathname === "/r/registries.json" ||
    pathname === "/rss.xml" ||
    pathname === "/llm" ||
    pathname.startsWith("/llm/") ||
    pathname === "/typeset.css";

  if (isShadcn) {
    return <>{children}</>;
  }

  if (isHome) {
    return (
      <>
        <Header />
        <ScrollArea className="h-dvh">
          <AutoTheme />
          <SunsetBanner />
          <main className="container mx-auto px-4 pt-16">{children}</main>
          <LandingSections />
          <Footer />
        </ScrollArea>
      </>
    );
  }

  return (
    <ScrollArea className="h-dvh">
      <AutoTheme />
      <SunsetBanner />
      <main className="container mx-auto px-4 pt-16">{children}</main>
      <Footer />
    </ScrollArea>
  );
}
