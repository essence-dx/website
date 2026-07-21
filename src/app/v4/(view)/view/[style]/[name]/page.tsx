/* eslint-disable react-hooks/static-components */
import * as React from "react"
import { type Metadata } from "next"
import { notFound } from "next/navigation"

import { siteConfig } from "@/lib/v4/config"
import {
  getDemoItem,
  getRegistryComponent,
  getRegistryItem,
} from "@/lib/v4/registry"
import { absoluteUrl } from "@/lib/v4/utils"
import { getStyle, legacyStyles, type Style } from "@/registry/_legacy-styles"

import "@/app/v4/legacy-themes.css"

const isCDNMode = !!process.env.NEXT_PUBLIC_CDN_BASE

export const revalidate = false
export const dynamic = "force-static"
export const dynamicParams = false

const getCachedRegistryItem = React.cache(
  async (name: string, styleName: Style["name"]) => {
    const item = await getRegistryItem(name, styleName)
    if (item) {
      return item
    }
    return await getDemoItem(name, styleName)
  }
)

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    style: string
    name: string
  }>
}): Promise<Metadata> {
  const { style: styleName, name } = await params
  const style = getStyle(styleName)

  if (!style) {
    return {}
  }

  const item = await getCachedRegistryItem(name, style.name)

  if (!item) {
    return {}
  }

  const title = item.name
  const description = item.description

  return {
    title: item.name,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: absoluteUrl(`/view/${style.name}/${item.name}`),
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.ogImage],
      creator: "@shadcn",
    },
  }
}

export async function generateStaticParams() {
  const { Index } = await import("@/registry/__index__")
  const { ExamplesIndex } = await import("@/examples/__index__")
  const params: Array<{ style: string; name: string }> = []

  for (const style of legacyStyles) {
    const baseMatch = style.name.match(/^(base|radix)-/)
    if (baseMatch) {
      const baseName = baseMatch[1]

      const examples = ExamplesIndex[baseName]
      if (examples) {
        for (const exampleName of Object.keys(examples)) {
          if (exampleName.startsWith("sidebar-")) {
            params.push({
              style: style.name,
              name: exampleName,
            })
          }
        }
      }

      continue
    }

    if (!Index[style.name]) {
      continue
    }

    const styleIndex = Index[style.name]
    for (const itemName in styleIndex) {
      const item = styleIndex[itemName]
      if (
        [
          "registry:block",
          "registry:component",
          "registry:example",
          "registry:internal",
        ].includes(item.type)
      ) {
        params.push({
          style: style.name,
          name: item.name,
        })
      }
    }
  }

  return params
}

export default async function BlockPage({
  params,
}: {
  params: Promise<{
    style: string
    name: string
  }>
}) {
  const { style: styleName, name } = await params
  const style = getStyle(styleName)

  if (!style) {
    return notFound()
  }

  const item = await getCachedRegistryItem(name, style.name)

  if (!item) {
    return notFound()
  }

  if (isCDNMode) {
    const { LiveView } = await import("./live-view")
    return <LiveView name={name} styleName={style.name} />
  }

  const Component = getRegistryComponent(name, style.name)

  if (!Component) {
    return notFound()
  }

  const { ComponentPreview } = await import("./component-preview")
  return (
    <ComponentPreview>
      <Component />
    </ComponentPreview>
  )
}
