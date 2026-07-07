"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { DxTool } from "@/data/tools";
import { getCategoryLabel } from "@/data/tools";
import { cn } from "@/lib/utils";
import { ToolIcon } from "./tool-icons";
import { BorderBeam } from "./ui/border-beam";

interface ToolCardProps {
  tool: DxTool;
  index: number;
}

export function ToolCard({ tool, index }: ToolCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <HoverCard>
        <HoverCardTrigger
          delay={250}
          className="block h-full group no-underline text-inherit"
          render={
            <Link href={`/tools/${tool.slug}`} className="block h-full" />
          }
        >
          <Card className="relative h-full min-h-[220px] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-md">
            <BorderBeam
              size={80}
              duration={10}
              colorFrom={tool.color}
              colorTo="transparent"
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />

            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <Avatar
                  className="size-11 rounded-lg after:rounded-lg"
                  style={{
                    background: `linear-gradient(135deg, ${tool.color}18, transparent)`,
                  }}
                >
                  <AvatarFallback
                    className="rounded-lg bg-transparent"
                    style={{ color: tool.color }}
                  >
                    <ToolIcon tool={tool} className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 -translate-x-1 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
              </div>
              <CardTitle className="text-lg group-hover:underline underline-offset-4 decoration-muted-foreground/50">
                {tool.name}
              </CardTitle>
              <CardDescription className="line-clamp-2 leading-relaxed">
                {tool.tagline}
              </CardDescription>
            </CardHeader>

            <CardFooter className="mt-auto flex items-center justify-between gap-2 border-t bg-muted/30">
              <Badge variant="secondary" className="font-sans text-[10px]">
                {getCategoryLabel(tool.category)}
              </Badge>
              {tool.headlineMetric && (
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <span
                        className={cn(
                          "font-sans text-xs tabular-nums px-2 py-0.5 rounded-full cursor-default",
                          "bg-primary/5 text-foreground ring-1 ring-foreground/10",
                        )}
                      />
                    }
                  >
                    {tool.headlineMetric}
                  </TooltipTrigger>
                  <TooltipContent>Headline benchmark win</TooltipContent>
                </Tooltip>
              )}
            </CardFooter>
          </Card>
        </HoverCardTrigger>

        <HoverCardContent className="w-80">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Avatar className="size-7 rounded-md after:rounded-md">
                <AvatarFallback
                  className="rounded-md text-xs"
                  style={{ color: tool.color }}
                >
                  <ToolIcon tool={tool} className="h-3.5 w-3.5" />
                </AvatarFallback>
              </Avatar>
              <p className="font-medium">{tool.name}</p>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {tool.description}
            </p>
            {tool.command && (
              <p className="text-xs font-mono text-muted-foreground">
                Run: <span className="text-foreground">{tool.command}</span>
              </p>
            )}
          </div>
        </HoverCardContent>
      </HoverCard>
    </motion.div>
  );
}
