import Link from "next/link"
import { PlusSignIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { getColors } from "@/lib/v4/colors"
import { siteConfig } from "@/lib/v4/config"
import { source } from "@/lib/v4/source"
import { CommandMenu } from "@/components/v4/command-menu"
import { DesignerActions } from "@/components/v4/designer-actions"
import { GitHubLink } from "@/components/v4/github-link"
import { MainNav } from "@/components/v4/main-nav"
import { MobileNav } from "@/components/v4/mobile-nav"
import { ModeSwitcher } from "@/components/v4/mode-switcher"
import { Separator } from "@/registry/new-york-v4/ui/separator"
import { Button } from "@/styles/v4/radix-nova/ui/button"

export function SiteHeader() {
  const colors = getColors()
  const pageTree = source.pageTree

  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <div className="container-wrapper px-6 group-has-data-[slot=designer]/layout:max-w-none 3xl:fixed:px-0">
        <div className="flex h-(--header-height) items-center **:data-[slot=separator]:h-4! group-has-data-[slot=designer]/layout:fixed:max-w-none 3xl:fixed:container">
          <MobileNav
            tree={pageTree}
            items={siteConfig.navItems}
            className="flex lg:hidden"
          />
          <MainNav items={siteConfig.navItems} className="hidden lg:flex" />
          <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
            <div className="hidden w-full flex-1 md:flex md:w-auto md:flex-none">
              <CommandMenu
                tree={pageTree}
                colors={colors}
                navItems={siteConfig.navItems}
              />
            </div>
            <Separator
              orientation="vertical"
              className="ml-2 hidden lg:block"
            />
            <GitHubLink />
            <Separator orientation="vertical" />
            <ModeSwitcher />
            <DesignerActions />
            <div className="flex items-center gap-2 group-has-data-[slot=designer]/layout:hidden">
              <Separator orientation="vertical" />
              <Button asChild size="sm" className="h-[31px] rounded-lg">
                <Link href="/create">
                  <HugeiconsIcon icon={PlusSignIcon} />
                  New
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
