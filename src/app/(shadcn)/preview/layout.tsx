import { PreviewFontVariables } from "./font-variables"
import { previewFontVariables } from "./fonts"

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={previewFontVariables}>
      <PreviewFontVariables className={previewFontVariables} />
      {children}
    </div>
  )
}
