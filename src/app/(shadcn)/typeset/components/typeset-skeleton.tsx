import { Skeleton } from "@/styles/v4/base-nova/ui/skeleton"

export function TypesetSkeleton() {
  return (
    <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden section-soft [--customizer-width:12rem] [--gap:1rem] md:[--gap:1.5rem] 2xl:[--customizer-width:14rem]">
      <div
        data-slot="designer"
        className="flex min-h-0 flex-1 flex-col items-start gap-(--gap) p-(--gap) pt-[calc(var(--gap)*0.25)] md:flex-row-reverse"
      >
        <Skeleton className="isolate hidden w-80 shrink-0 self-stretch rounded-2xl xl:block 2xl:w-96" />
        <Skeleton className="min-h-0 w-full flex-1 self-stretch rounded-2xl" />
        <Skeleton className="min-h-[151px] w-full self-start rounded-2xl md:h-full md:max-h-full md:min-h-0 md:w-(--customizer-width)" />
      </div>
    </div>
  )
}
