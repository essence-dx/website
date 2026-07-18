"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { groups } from "@/data/comparison";
import { GroupTable } from "./group-table";

export default function ComparisonSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  const displayedGroups = isExpanded ? groups : groups.slice(0, 5);

  return (
    <section className="w-full py-20 md:py-28 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="mb-14 text-center space-y-3">
          <span className="inline-block text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.2em] bg-muted/50 px-3 py-1 rounded-full">
            Ecosystem Comparison
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-foreground">
            DX vs. Industry
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto leading-relaxed">
            27 DX tools compared head-to-head against top alternatives. Every
            row shows where DX wins or ties.
          </p>
        </div>

        <div className="flex flex-col">
          <AnimatePresence initial={false} mode="sync">
            {displayedGroups.map((group, i) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{
                  opacity: 1,
                  height: "auto",
                  marginTop: i === 0 ? 0 : 24,
                }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <GroupTable group={group} variant={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {groups.length > 5 && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-muted/30 hover:bg-muted/60 text-foreground text-sm font-medium transition-colors border border-border"
            >
              {isExpanded ? (
                <>
                  Show Less <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  Show All {groups.length} Comparisons{" "}
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
