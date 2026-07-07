"use client";

import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  colorFrom?: string;
  colorTo?: string;
}

export function BorderBeam({
  className,
  size = 120,
  duration = 8,
  colorFrom = "hsl(var(--foreground))",
  colorTo = "transparent",
}: BorderBeamProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden",
        className,
      )}
    >
      <div
        className="absolute -inset-full animate-spin opacity-60"
        style={{
          animationDuration: `${duration}s`,
          background: `conic-gradient(from 0deg, transparent, ${colorFrom}, ${colorTo}, transparent)`,
          width: size * 3,
          height: size * 3,
          top: "50%",
          left: "50%",
          marginTop: -(size * 1.5),
          marginLeft: -(size * 1.5),
        }}
      />
    </div>
  );
}
