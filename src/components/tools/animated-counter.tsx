"use client";

import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { usePlayOnceOnVisible } from "@/hooks/use-play-once-on-visible";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 1.2,
  className,
}: AnimatedCounterProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => {
    if (decimals > 0) return v.toFixed(decimals);
    return Math.round(v).toLocaleString();
  });
  const [ref, shouldPlay] = usePlayOnceOnVisible<HTMLSpanElement>(
    () => {
      animate(count, value, { duration, ease: "easeOut" });
    },
    { threshold: 0.3 },
  );
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (shouldPlay && !hasAnimated.current) {
      hasAnimated.current = true;
    }
  }, [shouldPlay]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
