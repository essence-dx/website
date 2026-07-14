"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const WORDS = ["I", "Use", "Dx", "BTW"];

const HOLD_MS = 2600;

export function AnimatedWordmark() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % WORDS.length);
    }, HOLD_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={WORDS[index]}
        initial={{ x: 100 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 160, damping: 13 }}
        className="inline-block"
      >
        {WORDS[index]}
      </motion.span>
    </AnimatePresence>
  );
}
