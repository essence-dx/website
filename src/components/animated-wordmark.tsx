"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const WORDS = ["I", "Use", "Dx", "BTW"];

const HOLD_MS = 2600;
const DISTANCE = 100;

const SIDES = [
  { x: -DISTANCE, y: 0 },
  { x: DISTANCE, y: 0 },
  { x: 0, y: -DISTANCE },
  { x: 0, y: DISTANCE },
];

const [FALLBACK_SIDE] = SIDES;

function randomSide() {
  return Math.floor(Math.random() * SIDES.length);
}

export function AnimatedWordmark() {
  const [index, setIndex] = useState(0);
  const [side, setSide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % WORDS.length);
      setSide(randomSide());
    }, HOLD_MS);
    return () => clearInterval(id);
  }, []);

  const from = SIDES[side] ?? FALLBACK_SIDE;
  const to = { x: -from.x, y: -from.y };

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={WORDS[index]}
        initial={{ x: from.x, y: from.y, opacity: 1 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 160, damping: 13 }}
        className="inline-block"
      >
        {WORDS[index]}
      </motion.span>
    </AnimatePresence>
  );
}
