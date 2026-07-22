import { type Metadata } from "next"
import Link from "next/link"

import { Announcement } from "@/components/v4/announcement"
import { ChartsNav } from "@/components/v4/charts-nav"
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/v4/page-header"
import { PageNav } from "@/components/v4/page-nav"
import { ThemeSelector } from "@/components/v4/theme-selector"
import { Button } from "@/registry/new-york-v4/ui/button"
import { siteConfig } from "@/lib/v4/config"

const title = "Beautiful Charts & Graphs"
const description =
  "A collection of ready-to-use chart components built with Recharts. From basic charts to rich data displays, copy and paste into your apps."

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    images: [
      {
        url: siteConfig.ogImage,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: siteConfig.ogImage,
      },
    ],
  },
}

export default function ChartsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <PageHeader>
        <Announcement />
        <PageHeaderHeading>{title}</PageHeaderHeading>
        <PageHeaderDescription>{description}</PageHeaderDescription>
        <PageActions>
          <Button asChild size="sm">
            <a href="#charts">Browse Charts</a>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link href="/docs/components/chart">Documentation</Link>
          </Button>
        </PageActions>
      </PageHeader>
      <PageNav id="charts">
        <ChartsNav />
      </PageNav>
      <div className="container-wrapper flex-1">
        <div className="container pb-6">
          <section className="theme-container">{children}</section>
        </div>
      </div>
    </>
  )
}
