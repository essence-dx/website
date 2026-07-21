import { PreviewFontVariables } from "@/app/v4/(view)/preview/font-variables"
import { previewFontVariables } from "@/app/v4/(view)/preview/fonts"

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
