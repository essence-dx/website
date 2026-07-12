"use client";

import { useEffect, useState } from "react";

export function useScrollContainer() {
  const [container, setContainer] = useState<HTMLElement | Window>(window);

  useEffect(() => {
    const el = document.querySelector(
      "[data-radix-scroll-area-viewport]",
    ) as HTMLElement | null;
    if (el) setContainer(el);
  }, []);

  return container;
}
