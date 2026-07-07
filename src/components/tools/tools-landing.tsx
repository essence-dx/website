"use client";

import { TextShimmer } from "@dx/ui/text-shimmer";
import { ArrowRight, Info, Zap } from "lucide-react";
import { motion } from "motion/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  dxTools,
  getToolsByCategory,
  type ToolCategory,
  toolCategories,
} from "@/data/tools";
import { ToolCard } from "./tool-card";
import { ToolsProviders } from "./tools-providers";
import { AnimatedGrid } from "./ui/animated-grid";
import { BorderBeam } from "./ui/border-beam";
import { SectionHeader } from "./ui/section-header";

const PerformanceSection = dynamic(() =>
  import("@/components/sections/performance-section").then(
    (m) => m.PerformanceSection,
  ),
);

const categoryOrder: ToolCategory[] = [
  "core",
  "runtime",
  "data",
  "ai",
  "infrastructure",
];

const ecosystemStats = [
  { label: "DX Tools", value: dxTools.length, suffix: "" },
  { label: "CLI Commands", value: 150, suffix: "+" },
  { label: "AI Providers", value: 184, suffix: "+" },
  { label: "Icons Indexed", value: "305K", suffix: "" },
];

const performanceHighlights = [
  {
    slug: "style",
    tool: "DX Style",
    metric: "178×",
    desc: "faster than Tailwind",
    color: "hsl(300, 60%, 50%)",
  },
  {
    slug: "serializer",
    tool: "DX Serializer",
    metric: "229×",
    desc: "faster JSON reads",
    color: "hsl(180, 50%, 40%)",
  },
  {
    slug: "providers",
    tool: "DX Providers",
    metric: "38μs",
    desc: "catalog load time",
    color: "hsl(250, 55%, 50%)",
  },
  {
    slug: "www",
    tool: "DX Web",
    metric: "3.4×",
    desc: "higher RPS than Next.js",
    color: "hsl(200, 70%, 45%)",
  },
];

export function ToolsLanding() {
  return (
    <ToolsProviders>
      <div className="min-h-screen">
        <section className="relative pt-32 pb-24 overflow-hidden">
          <AnimatedGrid />
          <motion.div
            className="pointer-events-none absolute top-1/4 left-1/4 h-72 w-72 rounded-full blur-3xl animate-pulse-glow"
            style={{ backgroundColor: "hsla(var(--foreground), 0.04)" }}
          />
          <motion.div
            className="pointer-events-none absolute bottom-0 right-1/4 h-96 w-96 rounded-full blur-3xl animate-pulse-glow"
            style={{ backgroundColor: "hsla(var(--muted-foreground), 0.06)" }}
          />

          <div className="relative z-10 max-w-[1400px] mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl"
            >
              <Badge
                variant="secondary"
                className="mb-6 font-sans uppercase tracking-widest text-[10px]"
              >
                DX Ecosystem
              </Badge>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground leading-[1.1] mb-6">
                Every tool.
                <br />
                <TextShimmer
                  as="span"
                  duration={5}
                  spread={3}
                  className="text-foreground"
                >
                  One platform.
                </TextShimmer>
              </h1>
              <p className="font-sans text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 max-w-2xl">
                {dxTools.length} performance-first Rust tools spanning code
                editing, builds, web frameworks, AI agents, media, search, and
                serialization — unified through the DX CLI.
              </p>

              <Alert className="mb-8 max-w-2xl">
                <Info className="size-4" />
                <AlertTitle>
                  Built in Rust, benchmarked in production
                </AlertTitle>
                <AlertDescription>
                  Each tool is measured against industry leaders. Explore
                  individual pages for charts, metrics, and competitor
                  comparisons.
                </AlertDescription>
              </Alert>

              <div className="flex flex-wrap gap-3">
                <Button
                  size="lg"
                  className="gap-2"
                  nativeButton={false}
                  render={<Link href="/download" />}
                >
                  Get DX
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  nativeButton={false}
                  render={<Link href="/docs" />}
                >
                  Documentation
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-16"
            >
              {ecosystemStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                >
                  <Card className="text-center transition-shadow hover:shadow-md">
                    <CardContent className="pt-6">
                      <p className="font-serif text-2xl sm:text-3xl text-foreground tabular-nums">
                        {typeof stat.value === "number"
                          ? stat.value.toLocaleString()
                          : stat.value}
                        {stat.suffix}
                      </p>
                      <CardDescription className="mt-1 uppercase tracking-wide text-[10px]">
                        {stat.label}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <Separator />

        <section className="py-16 bg-muted/30 overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-4">
            <SectionHeader
              label="Speed"
              title="Performance wins across the stack"
              description="Real benchmark results from the DX ecosystem."
              align="center"
              shimmer
            />

            <div className="relative px-12">
              <Carousel
                opts={{ align: "start", loop: true }}
                className="w-full"
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {performanceHighlights.map((item) => (
                    <CarouselItem
                      key={item.tool}
                      className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/4"
                    >
                      <Link
                        href={`/tools/${item.slug}`}
                        className="block group"
                      >
                        <Card className="relative overflow-hidden transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-md">
                          <BorderBeam
                            size={60}
                            duration={8}
                            colorFrom={item.color}
                            colorTo="transparent"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          />
                          <CardHeader className="text-center pb-4">
                            <Zap
                              className="h-4 w-4 mx-auto mb-2"
                              style={{ color: item.color }}
                            />
                            <CardTitle
                              className="font-serif text-3xl tabular-nums"
                              style={{ color: item.color }}
                            >
                              {item.metric}
                            </CardTitle>
                            <CardDescription className="font-medium text-foreground">
                              {item.tool}
                            </CardDescription>
                            <p className="text-xs text-muted-foreground">
                              {item.desc}
                            </p>
                          </CardHeader>
                        </Card>
                      </Link>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="-left-2" />
                <CarouselNext className="-right-2" />
              </Carousel>
            </div>
          </div>
        </section>

        <Separator />

        <section className="py-20">
          <div className="max-w-[1400px] mx-auto px-4">
            <SectionHeader
              label="Explore"
              title="All DX tools"
              description="Browse by category or view the complete ecosystem."
            />

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-10 flex flex-wrap h-auto gap-1 bg-transparent p-0">
                <TabsTrigger
                  value="all"
                  className="rounded-full px-4 py-2 data-[state=active]:bg-foreground data-[state=active]:text-background"
                >
                  All ({dxTools.length})
                </TabsTrigger>
                {categoryOrder.map((cat) => (
                  <TabsTrigger
                    key={cat}
                    value={cat}
                    className="rounded-full px-4 py-2 data-[state=active]:bg-foreground data-[state=active]:text-background"
                  >
                    {toolCategories[cat].label} (
                    {getToolsByCategory(cat).length})
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="all">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {dxTools.map((tool, index) => (
                    <ToolCard key={tool.slug} tool={tool} index={index} />
                  ))}
                </div>
              </TabsContent>

              {categoryOrder.map((cat) => (
                <TabsContent key={cat} value={cat}>
                  <Card className="mb-6 border-dashed">
                    <CardContent className="pt-6">
                      <p className="font-sans text-sm text-muted-foreground">
                        {toolCategories[cat].description}
                      </p>
                    </CardContent>
                  </Card>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {getToolsByCategory(cat).map((tool, index) => (
                      <ToolCard key={tool.slug} tool={tool} index={index} />
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        <PerformanceSection />

        <section className="py-20 border-t border-border">
          <div className="max-w-[1400px] mx-auto px-4">
            <Card className="relative overflow-hidden text-center">
              <BorderBeam size={250} duration={12} />
              <div
                className="absolute inset-0 opacity-40 pointer-events-none"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(-60deg, hsla(var(--border), 0.35), hsla(var(--border), 0.35) 1px, transparent 1px, transparent 6px)",
                }}
              />
              <CardHeader className="relative z-10">
                <CardTitle className="font-serif text-3xl sm:text-4xl">
                  One CLI. Every tool.
                </CardTitle>
                <CardDescription className="max-w-lg mx-auto text-base">
                  Install DX and get access to the entire ecosystem. Your agent
                  can manage code, builds, deploys, and more via MCP.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10 flex flex-wrap gap-3 justify-center pb-8">
                <Button
                  size="lg"
                  className="gap-2"
                  nativeButton={false}
                  render={<Link href="/download" />}
                >
                  Download DX
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  nativeButton={false}
                  render={<Link href="/agents" />}
                >
                  Explore Agents
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </ToolsProviders>
  );
}
