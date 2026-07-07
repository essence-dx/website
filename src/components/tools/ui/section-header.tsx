"use client";

import { TextShimmer } from "@dx/ui/text-shimmer";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  shimmer?: boolean;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  label,
  title,
  description,
  shimmer = false,
  className,
  align = "left",
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "mb-10",
        align === "center" && "text-center mx-auto max-w-2xl",
        className,
      )}
    >
      {label && (
        <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground mb-3">
          {label}
        </p>
      )}
      <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-3">
        {shimmer ? (
          <TextShimmer as="span" duration={3} spread={3}>
            {title}
          </TextShimmer>
        ) : (
          title
        )}
      </h2>
      {description && (
        <p className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
