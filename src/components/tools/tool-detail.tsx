"use client";

import { TextShimmer } from "@dx/ui/text-shimmer";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Download,
  Gauge,
  Sparkles,
  Terminal,
  Trophy,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Kbd } from "@/components/ui/kbd";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { DxTool } from "@/data/tools";
import { dxTools, getCategoryLabel } from "@/data/tools";
import { PerformanceBar } from "./performance-bar";
import { ToolIcon } from "./tool-icons";
import { ToolPerformanceChart } from "./tool-performance-chart";
import { ToolsProviders } from "./tools-providers";
import { AnimatedGrid } from "./ui/animated-grid";
import { BorderBeam } from "./ui/border-beam";
import { SectionHeader } from "./ui/section-header";

interface ToolDetailProps {
  tool: DxTool;
}

export function ToolDetail({ tool }: ToolDetailProps) {
  const relatedTools = dxTools
    .filter((t) => t.category === tool.category && t.slug !== tool.slug)
    .slice(0, 3);

  const maxMetricValue = Math.max(
    ...tool.performance
      .filter((m) => m.highlight)
      .map((m) => {
        const num = Number.parseFloat(m.value.replace(/,/g, ""));
        return Number.isNaN(num) ? 0 : num;
      }),
    100,
  );

  const highlightedMetrics = tool.performance.filter((m) => m.highlight);

  return (
    <ToolsProviders>
      <div className="min-h-screen">
        <section className="relative pt-28 pb-20 overflow-hidden">
          <AnimatedGrid />
          <motion.div
            className="pointer-events-none absolute -top-24 right-0 h-[420px] w-[420px] rounded-full blur-3xl animate-pulse-glow"
            style={{ backgroundColor: `${tool.color}12` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          />

          <div className="relative z-10 max-w-[1400px] mx-auto px-4">
            <Breadcrumb className="mb-8">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink render={<Link href="/tools" />} href="/tools">
                    Tools
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{tool.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              <motion.div
                className="lg:col-span-7 xl:col-span-8"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <Badge variant="secondary" className="cursor-default" />
                      }
                    >
                      {getCategoryLabel(tool.category)}
                    </TooltipTrigger>
                    <TooltipContent>
                      Tool category in the DX ecosystem
                    </TooltipContent>
                  </Tooltip>
                  <Badge variant="outline">{tool.language}</Badge>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <Avatar
                    className="size-14 rounded-xl after:rounded-xl"
                    style={{
                      background: `linear-gradient(135deg, ${tool.color}20, hsl(var(--card)))`,
                    }}
                  >
                    <AvatarFallback
                      className="rounded-xl bg-transparent"
                      style={{ color: tool.color }}
                    >
                      <ToolIcon tool={tool} className="h-7 w-7" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight">
                      {tool.name}
                    </h1>
                  </div>
                </div>

                <p className="font-sans text-xl text-foreground mb-4 leading-snug">
                  <TextShimmer as="span" duration={4} spread={2}>
                    {tool.tagline}
                  </TextShimmer>
                </p>
                <p className="font-sans text-base text-muted-foreground leading-relaxed mb-6 max-w-2xl">
                  {tool.description}
                </p>

                <Alert className="mb-8 max-w-2xl">
                  <Gauge className="size-4" />
                  <AlertTitle>Measured benchmarks</AlertTitle>
                  <AlertDescription>
                    Every metric on this page comes from real DX benchmark runs
                    — not estimates or marketing claims.
                  </AlertDescription>
                </Alert>

                <div className="flex flex-wrap items-center gap-3">
                  {tool.command && (
                    <div className="inline-flex items-center gap-2 rounded-lg border bg-muted px-4 py-2.5 font-mono text-sm text-foreground">
                      <Terminal className="h-4 w-4 text-muted-foreground" />
                      <Kbd className="bg-background text-foreground">
                        {tool.command}
                      </Kbd>
                    </div>
                  )}
                  {tool.docSlug && (
                    <Button
                      variant="outline"
                      size="lg"
                      className="gap-2"
                      nativeButton={false}
                      render={<Link href={`/docs/${tool.docSlug}`} />}
                    >
                      <BookOpen className="h-4 w-4" />
                      Documentation
                    </Button>
                  )}
                  <Button
                    size="lg"
                    className="gap-2"
                    nativeButton={false}
                    render={<Link href="/download" />}
                  >
                    <Download className="h-4 w-4" />
                    Download DX
                  </Button>
                </div>
              </motion.div>

              {tool.headlineMetric && (
                <motion.div
                  className="lg:col-span-5 xl:col-span-4"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                >
                  <Card className="h-full flex flex-col overflow-hidden border-border/50 bg-background/50 backdrop-blur-sm">
                    <CardHeader className="text-center pb-6 flex-1 justify-center">
                      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Sparkles className="h-6 w-6 text-primary" />
                      </div>
                      <CardDescription className="uppercase tracking-widest text-xs font-semibold text-muted-foreground mb-2">
                        Key performance win
                      </CardDescription>
                      <CardTitle className="font-serif text-4xl sm:text-5xl lg:text-6xl tabular-nums text-foreground tracking-tight">
                        {tool.headlineMetric}
                      </CardTitle>
                    </CardHeader>
                    {highlightedMetrics.length > 0 && (
                      <CardFooter className="grid grid-cols-2 gap-4 border-t bg-muted/30 pt-4 pb-4">
                        {highlightedMetrics.slice(0, 2).map((m) => (
                          <div key={m.label} className="text-center">
                            <p className="font-serif text-xl font-medium text-foreground tabular-nums">
                              {m.value}
                              {m.unit && (
                                <span className="text-sm text-muted-foreground ml-1">
                                  {m.unit}
                                </span>
                              )}
                            </p>
                            <p className="font-sans text-[11px] font-medium text-muted-foreground uppercase tracking-wider mt-1">
                              {m.label}
                            </p>
                          </div>
                        ))}
                      </CardFooter>
                    )}
                  </Card>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        <Separator />

        <section className="py-20 bg-muted/30">
          <div className="max-w-[1400px] mx-auto px-4">
            <SectionHeader
              label="Benchmarks"
              title="Performance & speed wins"
              description="Measured results from DX tool benchmarks — real wins, not marketing claims."
              shimmer
            />

            <Tabs defaultValue="chart" className="w-full">
              <TabsList variant="line" className="mb-8">
                <TabsTrigger value="chart">Chart</TabsTrigger>
                <TabsTrigger value="metrics">Metrics</TabsTrigger>
                <TabsTrigger value="table">Summary</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
              </TabsList>

              <TabsContent value="chart" className="max-w-5xl mx-auto">
                <ToolPerformanceChart tool={tool} />
              </TabsContent>

              <TabsContent value="metrics">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tool.performance.map((metric, i) => (
                    <PerformanceBar
                      key={metric.label}
                      metric={metric}
                      index={i}
                      maxWidth={maxMetricValue}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="table">
                <Card>
                  <CardHeader>
                    <CardTitle>Benchmark summary</CardTitle>
                    <CardDescription>
                      All measured metrics for {tool.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-0 pb-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Metric</TableHead>
                          <TableHead>Value</TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Comparison
                          </TableHead>
                          <TableHead className="text-right">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {tool.performance.map((metric) => (
                          <TableRow key={metric.label}>
                            <TableCell className="font-medium">
                              {metric.label}
                            </TableCell>
                            <TableCell className="tabular-nums">
                              {metric.value}
                              {metric.unit ? ` ${metric.unit}` : ""}
                            </TableCell>
                            <TableCell className="hidden sm:table-cell text-muted-foreground">
                              {metric.comparison ?? "—"}
                            </TableCell>
                            <TableCell className="text-right">
                              {metric.highlight ? (
                                <Badge variant="default">Highlight</Badge>
                              ) : (
                                <Badge variant="secondary">Measured</Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="achievements">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tool.achievements.map((achievement, i) => (
                    <motion.div
                      key={achievement}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <Card className="h-full transition-shadow hover:shadow-md">
                        <CardContent className="flex gap-4 pt-6">
                          <div
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full ring-1 ring-foreground/10"
                            style={{ backgroundColor: `${tool.color}15` }}
                          >
                            <Trophy
                              className="h-4 w-4"
                              style={{ color: tool.color }}
                            />
                          </div>
                          <p className="font-sans text-sm text-foreground leading-relaxed">
                            {achievement}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <Separator />

        <section className="py-20">
          <div className="max-w-[1400px] mx-auto px-4">
            <SectionHeader
              label="Capabilities"
              title="Key features"
              description={`What makes ${tool.name} essential in the DX ecosystem.`}
            />

            <Card>
              <CardContent className="pt-6">
                <Accordion type="single" className="w-full">
                  {tool.features.map((feature, i) => (
                    <AccordionItem
                      key={feature}
                      value={`feature-${i}`}
                      className="px-4 sm:px-6"
                    >
                      <AccordionTrigger className="text-base hover:no-underline">
                        <span className="flex items-center gap-4 text-left">
                          <span
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-semibold text-muted-foreground"
                            style={{ backgroundColor: `${tool.color}15` }}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {feature.split("—")[0]?.trim() ?? feature}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pl-12 text-base leading-relaxed pb-4">
                        {feature}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </section>

        {relatedTools.length > 0 && (
          <>
            <Separator />
            <section className="py-20 bg-muted/20">
              <div className="max-w-[1400px] mx-auto px-4">
                <SectionHeader
                  label="Ecosystem"
                  title="Related tools"
                  description="Other DX tools in the same category."
                />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedTools.map((related, i) => (
                    <motion.div
                      key={related.slug}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <HoverCard>
                        <HoverCardTrigger
                          delay={200}
                          className="block group no-underline text-inherit"
                          render={
                            <Link
                              href={`/tools/${related.slug}`}
                              className="block"
                            />
                          }
                        >
                          <Card className="transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-md">
                            <CardContent className="flex items-center justify-between gap-4 pt-6">
                              <div className="flex items-center gap-3 min-w-0">
                                <Avatar className="size-9 rounded-lg after:rounded-lg">
                                  <AvatarFallback
                                    className="rounded-lg"
                                    style={{
                                      background: `linear-gradient(135deg, ${related.color}18, transparent)`,
                                      color: related.color,
                                    }}
                                  >
                                    <ToolIcon
                                      tool={related}
                                      className="h-4 w-4"
                                    />
                                  </AvatarFallback>
                                </Avatar>
                                <div className="min-w-0">
                                  <p className="font-sans text-sm font-medium text-foreground truncate group-hover:underline underline-offset-4">
                                    {related.name}
                                  </p>
                                  <p className="font-sans text-xs text-muted-foreground truncate">
                                    {related.headlineMetric ?? related.tagline}
                                  </p>
                                </div>
                              </div>
                              <ArrowUpRight className="h-4 w-4 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </CardContent>
                          </Card>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-72">
                          <div className="flex items-start gap-3">
                            <Avatar className="size-8 rounded-lg after:rounded-lg">
                              <AvatarFallback
                                className="rounded-lg text-xs"
                                style={{ color: related.color }}
                              >
                                <ToolIcon
                                  tool={related}
                                  className="h-3.5 w-3.5"
                                />
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{related.name}</p>
                              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                {related.description}
                              </p>
                            </div>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        <section className="py-20 border-t border-border bg-muted/10">
          <div className="max-w-[1400px] mx-auto px-4">
            <Card className="relative overflow-hidden text-center max-w-4xl mx-auto border-border/50 bg-background/50 backdrop-blur-sm">
              <div className="absolute inset-0 bg-[repeating-linear-gradient(-60deg,hsla(var(--border),0.25),hsla(var(--border),0.25)_1px,transparent_1px,transparent_6px)] pointer-events-none" />
              <CardHeader className="relative z-10 pb-6 pt-12 sm:pt-16">
                <CardTitle className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4">
                  Ready to use {tool.name}?
                </CardTitle>
                <CardDescription className="max-w-xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed">
                  Install DX and get {tool.name} alongside every other tool in
                  the ecosystem — one CLI, one workflow.
                </CardDescription>
              </CardHeader>
              <CardFooter className="relative z-10 justify-center gap-4 border-0 bg-transparent pb-12 sm:pb-16 flex-col sm:flex-row">
                <Button
                  size="lg"
                  nativeButton={false}
                  render={<Link href="/download" />}
                >
                  Get DX
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2"
                  nativeButton={false}
                  render={<Link href="/tools" />}
                >
                  <ArrowLeft className="h-4 w-4" />
                  All tools
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
      </div>
    </ToolsProviders>
  );
}
