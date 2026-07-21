"use client"

import * as React from "react"

const CDN_BASE =
  process.env.NEXT_PUBLIC_CDN_BASE ??
  "https://cdn.jsdelivr.net/gh/shadcn-ui/ui@latest/apps/v4/public/r"

function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center rounded-lg border bg-muted/30 text-sm text-muted-foreground ${className}`}
    >
      Loading component...
    </div>
  )
}

export function LivePreview({
  name,
  styleName = "base-nova",
}: {
  name: string
  styleName?: string
}) {
  const [Comp, setComp] = React.useState<React.ComponentType<unknown> | null>(
    null
  )
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    let cancelled = false
    setComp(null)
    setError(null)

    const cdnUrl = `${CDN_BASE}/styles/${styleName}/esm/${name}.js`

    fetch(cdnUrl)
      .then((res) => res.text())
      .then((text) => {
        if (cancelled) return
        const mod = { default: text }
        setComp(() => mod.default)
      })
      .catch((err) => {
        if (cancelled) return
        setError(`Failed to load: ${err.message}`)
      })

    return () => {
      cancelled = true
    }
  }, [name, styleName])

  if (error) {
    return (
      <div className="flex items-center justify-center rounded-lg border border-destructive/30 bg-destructive/5 p-8 text-sm text-destructive">
        {error}
      </div>
    )
  }

  if (!Comp) {
    return <Skeleton className="h-32 w-full" />
  }

  return (
    <div className="flex min-h-32 items-center justify-center p-4">
      <Comp />
    </div>
  )
}
