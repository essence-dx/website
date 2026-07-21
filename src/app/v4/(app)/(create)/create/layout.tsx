import { Suspense } from "react"

import { CreateSkeleton } from "@/app/v4/(app)/(create)/components/create-skeleton"
import { HistoryProvider } from "@/app/v4/(app)/(create)/hooks/use-history"
import { LocksProvider } from "@/app/v4/(app)/(create)/hooks/use-locks"

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LocksProvider>
      {/* HistoryProvider reads useSearchParams(), which opts this subtree out
          of prerendering up to this boundary. The fallback is what paints on
          first load, so it must be the page placeholder, not empty. */}
      <Suspense fallback={<CreateSkeleton />}>
        <HistoryProvider>{children}</HistoryProvider>
      </Suspense>
    </LocksProvider>
  )
}
