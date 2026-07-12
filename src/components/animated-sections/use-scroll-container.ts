"use client";

import { useEffect, useState } from "react";

export function useScrollContainer() {
  const [container, setContainer] = useState<HTMLElement | Window | null>(null);

  useEffect(() => {
    const el = document.querySelector(
      "[data-radix-scroll-area-viewport]",
    ) as HTMLElement | null;
    setContainer(el || window);
  }, []);

  return container;
}
