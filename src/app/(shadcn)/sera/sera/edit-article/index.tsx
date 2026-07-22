import { Separator } from "@/styles/v4/base-sera/ui/separator"

import { EditorWorkspace } from "./components/editor-workspace"
import { PreviewHeader } from "./components/preview-header"

export function EditArticle() {
  return (
    <div className="preview theme-taupe @container/preview w-full flex-1 bg-muted pt-4 font-sans ring-1 ring-foreground/5 [--gap:1rem] sm:pt-0 md:[--gap:1.5rem] xl:[--gap:2rem] 2xl:py-8 **:[.container]:px-(--gap)">
      <PreviewHeader />
      <Separator className="hidden sm:block" />
      <div className="container py-(--gap)">
        <EditorWorkspace />
      </div>
    </div>
  )
}
