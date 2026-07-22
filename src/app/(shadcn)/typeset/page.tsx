import { type Metadata } from "next"

import { cn } from "@/lib/v4/utils"
import { TypesetCustomizer } from "@/app/v4/(app)/(typeset)/components/customizer"
import { TypesetDocsPanel } from "@/app/v4/(app)/(typeset)/components/docs-panel"
import { TypesetPreview } from "@/app/v4/(app)/(typeset)/components/preview"
import { previewFontVariables } from "../preview/fonts"

export const metadata: Metadata = {
  title: "Typeset",
  description: "Typography for markdown you don't control.",
}

export default function TypesetPage() {
  return (
    <div
      className={cn(
        "relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden section-soft [--customizer-width:12rem] [--gap:1rem] md:[--gap:1.5rem] 2xl:[--customizer-width:14rem]",
        previewFontVariables
      )}
    >
      <div
        data-slot="designer"
        className="flex min-h-0 flex-1 flex-col items-start gap-(--gap) p-(--gap) pt-[calc(var(--gap)*0.25)] md:flex-row-reverse"
      >
        <TypesetDocsPanel />
        <TypesetPreview />
        <TypesetCustomizer />
      </div>
    </div>
  )
}
