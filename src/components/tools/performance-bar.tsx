"use client";

import { motion } from "motion/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Progress,
  ProgressIndicator,
  ProgressTrack,
} from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { PerformanceMetric } from "@/data/tools";
import { usePlayOnceOnVisible } from "@/hooks/use-play-once-on-visible";
import { cn } from "@/lib/utils";

interface PerformanceBarProps {
  metric: PerformanceMetric;
  index: number;
  maxWidth?: number;
}

function parseNumericValue(value: string): number {
  const cleaned = value.replace(/,/g, "").replace(/[^\d.]/g, "");
  const num = Number.parseFloat(cleaned);
  return Number.isNaN(num) ? 0 : num;
}

export function PerformanceBar({
  metric,
  index,
  maxWidth = 100,
}: PerformanceBarProps) {
  const numericValue = parseNumericValue(metric.value);
  const progressValue = metric.highlight
    ? Math.min(Math.round((numericValue / maxWidth) * 100), 100)
    : Math.min(40 + index * 12, 88);

  const [ref, shouldPlay] = usePlayOnceOnVisible<HTMLDivElement>(() => {}, {
    threshold: 0.2,
  });

  const displayValue = `${metric.value}${metric.unit ? ` ${metric.unit}` : ""}`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <Card
        className={cn(
          "transition-shadow duration-300 hover:shadow-md",
          metric.highlight && "ring-foreground/15",
        )}
      >
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <CardTitle className="text-sm font-medium">
                {metric.label}
              </CardTitle>
              {metric.comparison && (
                <CardDescription className="mt-0.5">
                  {metric.comparison}
                </CardDescription>
              )}
            </div>
            <Tooltip>
              <TooltipTrigger
                render={
                  <span className="font-serif text-xl tabular-nums shrink-0 cursor-default" />
                }
              >
                {displayValue}
              </TooltipTrigger>
              <TooltipContent>
                {metric.highlight ? "Highlighted benchmark" : "Measured metric"}
              </TooltipContent>
            </Tooltip>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={shouldPlay ? progressValue : 0}>
            <ProgressTrack className="h-2">
              <ProgressIndicator
                className={cn(
                  "transition-all duration-1000 ease-out",
                  metric.highlight ? "bg-foreground" : "bg-primary",
                )}
              />
            </ProgressTrack>
          </Progress>
        </CardContent>
      </Card>
    </motion.div>
  );
}
