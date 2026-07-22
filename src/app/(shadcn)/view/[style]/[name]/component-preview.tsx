import { cn } from "@/lib/v4/utils"

export function ComponentPreview({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "bg-background *:data-[slot=card]:has-[[data-slot=chart]]:shadow-none"
      )}
    >
      {children}
    </div>
  )
}
