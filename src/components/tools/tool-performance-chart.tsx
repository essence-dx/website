"use client";

import { motion } from "motion/react";
import {
  charts,
  ToolChartRenderer,
} from "@/components/sections/performance-section";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getChartIndexForTool } from "@/data/tool-charts";
import type { DxTool } from "@/data/tools";

interface ToolPerformanceChartProps {
  tool: DxTool;
}

function MetricsFallbackChart({ tool }: { tool: DxTool }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Ecosystem metrics</CardTitle>
        <CardDescription>
          Key measured capabilities for {tool.name}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {tool.headlineMetric && (
          <div className="flex h-[200px] items-center justify-center rounded-xl bg-muted/40 ring-1 ring-foreground/10">
            <div className="text-center px-6">
              <p
                className="font-serif text-4xl tabular-nums mb-2"
                style={{ color: tool.color }}
              >
                {tool.headlineMetric}
              </p>
              <p className="font-sans text-sm text-muted-foreground">
                {tool.performance[0]?.comparison ?? tool.tagline}
              </p>
            </div>
          </div>
        )}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Metric</TableHead>
              <TableHead>Value</TableHead>
              <TableHead className="hidden sm:table-cell">Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tool.performance.map((metric) => (
              <TableRow key={metric.label}>
                <TableCell className="font-medium">{metric.label}</TableCell>
                <TableCell className="tabular-nums">
                  {metric.value}
                  {metric.unit ? ` ${metric.unit}` : ""}
                </TableCell>
                <TableCell className="hidden sm:table-cell text-muted-foreground">
                  {metric.comparison ?? (metric.highlight ? "Highlight" : "—")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="border-t bg-muted/30">
        <div className="flex flex-wrap gap-2">
          {tool.performance
            .filter((m) => m.highlight)
            .map((m) => (
              <Badge key={m.label} variant="secondary">
                {m.label}: {m.value}
                {m.unit ? ` ${m.unit}` : ""}
              </Badge>
            ))}
        </div>
      </CardFooter>
    </Card>
  );
}

export function ToolPerformanceChart({ tool }: ToolPerformanceChartProps) {
  const chartIndex = getChartIndexForTool(tool.slug);
  const chart = chartIndex !== undefined ? charts[chartIndex] : undefined;

  if (!chart) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <MetricsFallbackChart tool={tool} />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden hover:ring-foreground/20 transition-all duration-500">
        <CardHeader>
          <CardTitle className="text-lg">{chart.title}</CardTitle>
          <CardDescription>{chart.subtitle}</CardDescription>
        </CardHeader>
        <CardContent className="min-h-[300px] flex items-center">
          <ToolChartRenderer chart={chart} />
        </CardContent>
        <CardFooter className="border-t bg-muted/30">
          <p className="font-sans text-sm text-muted-foreground leading-relaxed">
            {chart.footer}
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
