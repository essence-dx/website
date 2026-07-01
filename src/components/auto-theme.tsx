"use client";

import { useEffect, useRef } from "react";
import { themePresets } from "@/data/theme-presets";
import { hexToHsl, isHexColor, isOklch, oklchToHsl } from "@/lib/color";

const STYLE_ID = "auto-theme-vars";
const FONT_LINK_ID = "auto-theme-fonts";

const COLOR_KEYS = new Set([
  "background", "foreground", "card", "card-foreground",
  "popover", "popover-foreground", "primary", "primary-foreground",
  "secondary", "secondary-foreground", "muted", "muted-foreground",
  "accent", "accent-foreground", "destructive", "destructive-foreground",
  "border", "input", "ring",
  "chart-1", "chart-2", "chart-3", "chart-4", "chart-5",
  "sidebar", "sidebar-foreground", "sidebar-primary", "sidebar-primary-foreground",
  "sidebar-accent", "sidebar-accent-foreground", "sidebar-border", "sidebar-ring",
]);

const HUE_KEYS = new Set(["primary", "primary-foreground", "accent", "accent-foreground", "ring"]);

const FONT_MAP: Record<string, string> = {
  "font-sans": "--font-hedvig-sans",
  "font-serif": "--font-hedvig-serif",
  "font-mono": "--font-hedvig-sans",
};

function toHsl(value: string): string {
  if (isHexColor(value)) return hexToHsl(value);
  if (isOklch(value)) return oklchToHsl(value);
  return "";
}

function buildCss(name: string, hueShift: number): string {
  const preset = themePresets[name];
  if (!preset) return "";

  let lv = "", dv = "";

  for (const [key, value] of Object.entries(preset.styles.light)) {
    if (COLOR_KEYS.has(key) && value) {
      let hsl = toHsl(value);
      if (hsl && HUE_KEYS.has(key) && hueShift) {
        const m = /(\d+),\s*(\d+)%,\s*(\d+)%/.exec(hsl);
        if (m) hsl = `${((parseInt(m[1]) + hueShift) % 360 + 360) % 360}, ${m[2]}%, ${m[3]}%`;
      }
      if (hsl) lv += `--${key}: ${hsl};`;
    }
  }

  for (const [key, value] of Object.entries(preset.styles.dark)) {
    if (COLOR_KEYS.has(key) && value) {
      let hsl = toHsl(value);
      if (hsl && HUE_KEYS.has(key) && hueShift) {
        const m = /(\d+),\s*(\d+)%,\s*(\d+)%/.exec(hsl);
        if (m) hsl = `${((parseInt(m[1]) + hueShift) % 360 + 360) % 360}, ${m[2]}%, ${m[3]}%`;
      }
      if (hsl) dv += `--${key}: ${hsl};`;
    }
  }

  let fontBlock = "";
  const fontVars = new Set<string>();
  for (const [key, value] of Object.entries(preset.styles.light)) {
    if (FONT_MAP[key] && value && !fontVars.has(key)) {
      fontVars.add(key);
      fontBlock += `${FONT_MAP[key]}: ${value} !important;`;
    }
  }

  if (!lv && !dv && !fontBlock) return "";
  return `:root{${lv}}.dark{${dv}}body{${fontBlock}}`;
}

function getPrimaryFont(raw: string): string | null {
  const name = raw.split(",")[0]?.trim().replace(/^["']|["']$/g, "");
  if (!name || name === "serif" || name === "sans-serif" || name === "monospace" || name === "ui-serif" || name === "ui-sans-serif" || name === "ui-monospace" || name === "system-ui") return null;
  return name;
}

function buildFontsUrl(families: string[]): string {
  const params = families.map((name) => {
    const encoded = name.replace(/ /g, "+");
    return `family=${encoded}:wght@300;400;500;600;700;800`;
  });
  return `https://fonts.googleapis.com/css2?${params.join("&")}&display=swap`;
}

function loadFonts(name: string) {
  const preset = themePresets[name];
  if (!preset) return;

  const families = new Set<string>();
  for (const key of ["font-sans", "font-serif", "font-mono"]) {
    const value = preset.styles.light[key] || preset.styles.dark[key];
    if (value) {
      const primary = getPrimaryFont(value);
      if (primary) families.add(primary);
    }
  }

  if (families.size === 0) return;

  const old = document.getElementById(FONT_LINK_ID);
  old?.remove();

  const link = document.createElement("link");
  link.id = FONT_LINK_ID;
  link.rel = "stylesheet";
  link.href = buildFontsUrl(Array.from(families));
  document.head.appendChild(link);
}

function shuffle<T>(a: T[]): T[] {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

function randomShift(): number {
  const opts = [0, 15, 30, 45, 60, 90, -15, -30, -45, -60, -90];
  return opts[Math.floor(Math.random() * opts.length)];
}

export function AutoTheme() {
  const queueRef = useRef<string[]>([]);
  const idxRef = useRef(0);

  useEffect(() => {
    queueRef.current = shuffle(Object.keys(themePresets));
    idxRef.current = 0;

    const apply = () => {
      if (idxRef.current >= queueRef.current.length) {
        queueRef.current = shuffle(Object.keys(themePresets));
        idxRef.current = 0;
      }
      const presetName = queueRef.current[idxRef.current];
      idxRef.current++;

      loadFonts(presetName);

      const css = buildCss(presetName, randomShift());
      let el = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
      el?.remove();
      if (css) {
        const tag = document.createElement("style");
        tag.id = STYLE_ID;
        tag.textContent = css;
        document.head.appendChild(tag);
      }
    };

    apply();
    const interval = setInterval(apply, 1000);
    return () => clearInterval(interval);
  }, []);

  return null;
}
