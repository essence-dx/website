import { Separator } from "@/styles/v4/base-sera/ui/separator"

import { Demographics } from "./components/demographics"
import { MetricsGrid } from "./components/metrics-grid"
import { PreviewHeader } from "./components/preview-header"
import { TopEditorial } from "./components/top-editorial"
import { TrafficOverviewDeferred } from "./components/traffic-overview-deferred"

export function AudienceAnalytics() {
  return (
    <div className="preview theme-taupe @container/preview w-full flex-1 bg-muted pt-4 font-sans ring-1 ring-foreground/5 [--gap:1rem] sm:pt-0 md:[--gap:1.5rem] xl:[--gap:2rem] 2xl:py-8 **:[.container]:px-(--gap)">
      <PreviewHeader />
      <Separator className="hidden sm:block" />
      <div className="container grid grid-cols-12 gap-(--gap) py-(--gap)">
        <MetricsGrid />
        <TrafficOverviewDeferred className="col-span-full md:col-span-6 lg:col-span-8" />
        <Demographics className="col-span-full md:col-span-6 lg:col-span-4" />
        <TopEditorial className="col-span-full" />
      </div>
    </div>
  )
}
