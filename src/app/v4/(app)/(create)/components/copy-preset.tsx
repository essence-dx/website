"use client"

import * as React from "react"

import { cn } from "@/lib/v4/utils"
import { copyToClipboardWithMeta } from "@/components/v4/copy-button"
import { Button } from "@/styles/v4/base-nova/ui/button"
import { usePresetCode } from "@/app/v4/(app)/(create)/hooks/use-design-system"

export function CopyPreset({ className }: React.ComponentProps<typeof Button>) {
  const presetCode = usePresetCode()
  const [hasCopied, setHasCopied] = React.useState(false)
  const label = hasCopied ? "Copied" : `--preset ${presetCode}`

  React.useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => setHasCopied(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [hasCopied])

  const handleCopy = React.useCallback(() => {
    copyToClipboardWithMeta(`--preset ${presetCode}`, {
      name: "copy_preset_command",
      properties: {
        preset: presetCode,
      },
    })
    setHasCopied(true)
  }, [presetCode])

  return (
    <Button
      variant="outline"
      onClick={handleCopy}
      title={label}
      className={cn(
        "touch-manipulation bg-transparent! px-2! py-0! text-sm! transition-none select-none hover:bg-muted! pointer-coarse:h-10!",
        className
      )}
    >
      <span className="block min-w-0 truncate">{label}</span>
    </Button>
  )
}
