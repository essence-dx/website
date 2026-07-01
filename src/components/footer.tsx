"use client";

import { cn } from "@dx/ui/cn";
import { Icons } from "@dx/ui/icons";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Footer() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <footer className="bg-background relative overflow-hidden">
      {/* Top Divider - Full Bleed */}
      <div className="h-px w-full border-t border-border" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-16 sm:pb-80">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-16">
          {/* Left Column - Links */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3 md:grid-cols-5 sm:gap-x-8 sm:gap-y-12 lg:col-span-1">
            {/* Features Column */}
            <div className="space-y-3">
              <h3 className="font-sans text-sm text-foreground mb-4">
                Features
              </h3>
              <div className="space-y-2.5">
                {[
                  { href: "/code", label: "Code" },
                  { href: "/build", label: "Build" },
                  { href: "/agent", label: "Agent" },
                  { href: "/cli", label: "CLI" },
                  { href: "/www", label: "Web" },
                  { href: "/flow", label: "Flow" },
                  { href: "/forge", label: "Forge" },
                  { href: "/media", label: "Media" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors block"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Product Column */}
            <div className="space-y-3">
              <h3 className="font-sans text-sm text-foreground mb-4">
                Product
              </h3>
              <div className="space-y-2.5">
                {[
                  { href: "/download", label: "Download" },
                  { href: "/integrations", label: "Integrations" },
                  { href: "/docs", label: "Documentation" },
                  { href: "/testimonials", label: "Testimonials" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors block"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Company Column */}
            <div className="space-y-3">
              <h3 className="font-sans text-sm text-foreground mb-4">
                Company
              </h3>
              <div className="space-y-2.5">
                {[
                  { href: "/story", label: "Story", external: false },
                  { href: "/updates", label: "Updates", external: false },
                  {
                    href: "https://github.com/anomalyco",
                    label: "GitHub",
                    external: true,
                  },
                  {
                    href: "https://github.com/anomalyco/opencode",
                    label: "OpenCode",
                    external: true,
                  },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors block"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Resources Column */}
            <div className="space-y-3">
              <h3 className="font-sans text-sm text-foreground mb-4">
                Resources
              </h3>
              <div className="space-y-2.5">
                {[
                  { href: "/mcp", label: "MCP", external: false },
                  { href: "/docs", label: "Documentation", external: false },
                  { href: "/agents", label: "CLI", external: false },
                  { href: "/computer", label: "Computer", external: false },
                  {
                    href: "https://github.com/essence-dx",
                    label: "GitHub",
                    external: true,
                  },
                  { href: "/sdks", label: "SDKs", external: false },
                  { href: "/support", label: "Support", external: false },
                  {
                    href: "/policy",
                    label: "Privacy Policy",
                    external: false,
                  },
                  {
                    href: "/terms",
                    label: "Terms of Service",
                    external: false,
                  },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors block"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Tagline & Compliance */}
          <div className="flex flex-col items-start lg:items-end gap-6 lg:gap-10">
            <p className="font-sans text-base sm:text-xl text-foreground text-left lg:text-right">
              Build great software. Not the toolchain.
            </p>

            {/* Compliance Section */}
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center gap-2">
                <div className="w-9 h-9">
                  <Image
                    src="/images/gdpr.png"
                    alt="GDPR Compliant"
                    width={36}
                    height={36}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-center">
                  <p className="font-sans text-xs text-foreground">GDPR</p>
                  <p className="font-sans text-xs text-muted-foreground">
                    Compliant
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-9 h-9">
                  <Image
                    src="/images/soc2.png"
                    alt="SOC2 In Progress"
                    width={36}
                    height={36}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-center">
                  <p className="font-sans text-xs text-foreground">Soc2</p>
                  <p className="font-sans text-xs text-muted-foreground">
                    In progress
                  </p>
                </div>
              </div>
            </div>


          </div>
        </div>

        {/* Divider */}
        <div className="my-16">
          <div className="h-px w-full border-t border-border" />
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <Link
            href="https://opencode.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <span className="font-sans text-sm text-muted-foreground">
              System status:
            </span>
            <span className="font-sans text-sm text-foreground">
              Operational
            </span>
            <div className="relative flex items-center justify-center">
              <div className="w-2 h-2 bg-green-500 rounded-full relative z-10" />
              <div
                className="absolute w-2 h-2 bg-green-500 rounded-full"
                style={{
                  animation:
                    "pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                  willChange: "transform, opacity, box-shadow",
                }}
              />
            </div>
          </Link>
          <p className="font-sans text-sm text-muted-foreground">
            © {new Date().getFullYear()} DX Labs AB. All rights reserved.
          </p>
        </div>
      </div>

      {/* Large Wordmark */}
      <div className="absolute bottom-0 left-0 sm:left-1/2 sm:transform sm:-translate-x-1/2 translate-y-[25%] sm:translate-y-[40%] bg-background overflow-hidden">
        <h1
          className={cn(
            "font-sans text-[200px] sm:text-[508px] leading-none select-none",
            "text-secondary",
            "[WebkitTextStroke:1px_hsl(var(--muted-foreground))]",
            "[textStroke:1px_hsl(var(--muted-foreground))]",
          )}
          style={{
            WebkitTextStroke: "1px hsl(var(--muted-foreground))",
            color: "hsl(var(--secondary))",
          }}
        >
          dx
        </h1>
      </div>
    </footer>
  );
}
