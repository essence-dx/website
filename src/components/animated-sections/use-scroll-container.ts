"use client";

import { useEffect, useState } from "react";

let cachedContainer: HTMLElement | Window | null = null;

export function useScrollContainer() {
  const [container, setContainer] = useState<HTMLElement | Window | null>(
    () => cachedContainer,
  );

  useEffect(() => {
    if (cachedContainer) {
      setContainer(cachedContainer);
      return;
    }
    const el = document.querySelector(
      "[data-radix-scroll-area-viewport]",
    ) as HTMLElement | null;
    cachedContainer = el || window;
    setContainer(cachedContainer);
  }, []);

  return container;
}
