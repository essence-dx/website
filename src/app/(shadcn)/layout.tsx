import Script from "next/script"
import { META_THEME_COLORS } from "@/lib/v4/config"
import { DOCS_SIDEBAR_SCROLL_RESTORE_SCRIPT } from "@/lib/v4/docs-sidebar-scroll"
import { fontVariables } from "@/lib/v4/fonts"
import { cn } from "@/lib/v4/utils"
import { ActiveThemeProvider } from "@/components/v4/active-theme"
import { Analytics } from "@/components/v4/analytics"
import { TailwindIndicator } from "@/components/v4/tailwind-indicator"
import { TooltipProvider as BaseTooltipProvider } from "@/registry/bases/base/ui/tooltip"
import { Toaster } from "@/registry/bases/radix/ui/sonner"
import { TooltipProvider as RadixTooltipProvider } from "@/registry/bases/radix/ui/tooltip"
import { SiteFooter } from "@/components/v4/site-footer"
import { SiteHeader } from "@/components/v4/site-header"

import "@/app/v4/globals.css"
import "@/app/v4/legacy-themes.css"
import "@/app/v4/style-registry.css"

export default function ShadcnLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div
      className={cn(
        fontVariables,
        "group/body overscroll-none antialiased [--header-height:calc(var(--spacing)*14)] lg:[--header-height:calc(var(--spacing)*16)] [--footer-height:calc(var(--spacing)*14)] xl:[--footer-height:calc(var(--spacing)*24)]",
        "group/layout relative z-10 flex min-h-svh flex-col bg-background has-data-[slot=designer]:h-svh has-data-[slot=designer]:overflow-hidden",
      )}
      data-v4-root
      data-slot="layout"
    >
      <Script
        id="sidebar-scroll-restore"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: DOCS_SIDEBAR_SCROLL_RESTORE_SCRIPT,
        }}
      />
      <Script
        id="theme-color"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            try {
              if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
              }
            } catch (_) {}
          `,
        }}
      />
      <meta name="theme-color" content={META_THEME_COLORS.light} />
      <ActiveThemeProvider>
        <BaseTooltipProvider delay={0}>
          <RadixTooltipProvider delayDuration={0}>
            <SiteHeader />
            <main className="flex min-h-0 flex-1 flex-col">{children}</main>
            <SiteFooter />
            <Toaster position="top-center" />
          </RadixTooltipProvider>
        </BaseTooltipProvider>
        <TailwindIndicator />
        <Analytics />
      </ActiveThemeProvider>
    </div>
  )
}
