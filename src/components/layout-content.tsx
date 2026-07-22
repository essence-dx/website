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
      {children}
    </ScrollArea>
  );
}
