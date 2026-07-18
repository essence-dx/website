"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/theme-provider";
import { themePresets } from "@/data/theme-presets";
import { hexToHsl, isHexColor, isOklch, oklchToHsl } from "@/lib/color";

const THEME_STYLE_ID = "theme-preset-vars";
const FONT_LINK_ID = "theme-preset-fonts";

const FONT_MAP: Record<string, string> = {
  "font-sans": "--font-hedvig-sans",
  "font-serif": "--font-hedvig-serif",
  "font-mono": "--font-hedvig-sans",
};

const COLOR_KEYS = new Set([
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "destructive-foreground",
  "border",
  "input",
  "ring",
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
  "sidebar",
  "sidebar-foreground",
  "sidebar-primary",
  "sidebar-primary-foreground",
  "sidebar-accent",
  "sidebar-accent-foreground",
  "sidebar-border",
  "sidebar-ring",
]);

const HUE_SHIFT_KEYS = new Set([
  "primary",
  "primary-foreground",
  "accent",
  "accent-foreground",
  "ring",
]);

function parseHsl(hsl: string): { h: number; s: number; l: number } | null {
  const m = /(\d+),\s*(\d+)%,\s*(\d+)%/.exec(hsl);
  if (!m) return null;
  return {
    h: parseInt(m[1], 10),
    s: parseInt(m[2], 10),
    l: parseInt(m[3], 10),
  };
}

function shiftHue(hsl: string, shift: number): string {
  const p = parseHsl(hsl);
  if (!p) return hsl;
  const h = (((p.h + shift) % 360) + 360) % 360;
  return `${h}, ${p.s}%, ${p.l}%`;
}

function toHsl(value: string): string {
  if (isHexColor(value)) return hexToHsl(value);
  if (isOklch(value)) return oklchToHsl(value);
  return "";
}

function getPrimaryFont(raw: string): string | null {
  const name = raw
    .split(",")[0]
    ?.trim()
    .replace(/^["']|["']$/g, "");
  if (
    !name ||
    name === "serif" ||
    name === "sans-serif" ||
    name === "monospace" ||
    name === "ui-serif" ||
    name === "ui-sans-serif" ||
    name === "ui-monospace" ||
    name === "system-ui"
  )
    return null;
  return name;
}

function buildFontsUrl(families: string[]): string {
  const params = families.map((name) => {
    const encoded = name.replace(/ /g, "+");
    return `family=${encoded}:wght@300;400;500;600;700;800`;
  });
  return `https://fonts.googleapis.com/css2?${params.join("&")}&display=swap`;
}

function loadThemeFonts(presetName: string) {
  const preset = themePresets[presetName];
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

function buildPresetCss(
  presetName: string | null,
  hueShift: number = 0,
): string {
  if (!presetName) return "";
  const preset = themePresets[presetName];
  if (!preset) return "";

  let lightVars = "";
  let darkVars = "";

  for (const [key, value] of Object.entries(preset.styles.light)) {
    if (COLOR_KEYS.has(key) && value) {
      let hsl = toHsl(value);
      if (hsl && HUE_SHIFT_KEYS.has(key) && hueShift) {
        hsl = shiftHue(hsl, hueShift);
      }
      if (hsl) lightVars += `--${key}: ${hsl};`;
    }
  }

  for (const [key, value] of Object.entries(preset.styles.dark)) {
    if (COLOR_KEYS.has(key) && value) {
      let hsl = toHsl(value);
      if (hsl && HUE_SHIFT_KEYS.has(key) && hueShift) {
        hsl = shiftHue(hsl, hueShift);
      }
      if (hsl) darkVars += `--${key}: ${hsl};`;
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

  if (!lightVars && !darkVars && !fontBlock) return "";
  return `:root{${lightVars}}.dark{${darkVars}}body{${fontBlock}}`;
}

function applyStyleTag(css: string) {
  const old = document.getElementById(THEME_STYLE_ID);
  old?.remove();
  if (!css) return;
  const tag = document.createElement("style");
  tag.id = THEME_STYLE_ID;
  tag.textContent = css;
  document.head.appendChild(tag);
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function randomHueShift(): number {
  const shifts = [0, 15, 30, 45, 60, 90, 120, -15, -30, -45, -60, -90];
  return shifts[Math.floor(Math.random() * shifts.length)];
}

export function useThemePreset() {
  const { theme, setTheme } = useTheme();
  const [presetName, setPresetName] = useState<string | null>(null);

  const queueRef = useRef<string[]>([]);
  const indexRef = useRef(0);

  const nextPreset = useCallback((): string => {
    if (indexRef.current >= queueRef.current.length) {
      queueRef.current = shuffle(Object.keys(themePresets));
      indexRef.current = 0;
    }
    const name = queueRef.current[indexRef.current];
    indexRef.current++;
    return name;
  }, []);

  const applyPreset = useCallback((name: string | null) => {
    const shift = name ? randomHueShift() : 0;
    applyStyleTag(buildPresetCss(name, shift));
    if (name) {
      loadThemeFonts(name);
    } else {
      document.getElementById(FONT_LINK_ID)?.remove();
    }
    setPresetName(name);
  }, []);

  const resetToDefault = useCallback(() => {
    applyPreset(null);
  }, [applyPreset]);

  useEffect(() => {
    queueRef.current = shuffle(Object.keys(themePresets));
    indexRef.current = 0;
    applyPreset(nextPreset());
  }, [applyPreset, nextPreset]);

  useEffect(() => {
    const interval = setInterval(() => {
      applyPreset(nextPreset());
    }, 2000);
    return () => clearInterval(interval);
  }, [applyPreset, nextPreset]);

  return {
    presetName,
    isDefault: presetName === null,
    currentPreset: presetName ? themePresets[presetName] : null,
    applyPreset,
    resetToDefault,
    theme,
    setTheme,
  };
}
