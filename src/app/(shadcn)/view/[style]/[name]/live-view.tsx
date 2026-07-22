"use client"

import * as React from "react"
import { LivePreview } from "@/components/v4/live-preview"

export function LiveView({
  name,
  styleName,
}: {
  name: string
  styleName: string
}) {
  return (
    <div className="flex min-h-dvh items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <LivePreview name={name} styleName={styleName} />
      </div>
    </div>
  )
}
