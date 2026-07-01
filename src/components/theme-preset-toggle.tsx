"use client";

import { cn } from "@dx/ui/cn";
import { Check, Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { themePresets } from "@/data/theme-presets";
import { useThemePreset } from "@/hooks/use-theme-preset";

export function ThemePresetToggle() {
  const { presetName, isDefault, applyPreset, theme, setTheme } =
    useThemePreset();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  if (!mounted) return null;

  const presets = Object.entries(themePresets);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="text-sm transition-colors text-muted-foreground hover:text-foreground flex items-center gap-1.5 px-2 py-2"
      >
        {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 z-50 w-72 bg-background border border-border shadow-lg max-h-[75vh] flex flex-col">
          <div className="px-3 py-2 text-xs text-muted-foreground border-b border-border shrink-0">
            Themes ({presets.length}) · auto-rotates every 5s
          </div>
          <div className="overflow-y-auto flex-1">
            <button
              type="button"
              onClick={() => {
                applyPreset(null);
                setOpen(false);
              }}
              className={cn(
                "w-full text-left px-3 py-2 text-sm transition-colors flex items-center gap-2",
                "text-muted-foreground hover:text-foreground hover:bg-secondary",
                isDefault && "text-foreground bg-secondary",
              )}
            >
              {isDefault && <Check size={14} className="shrink-0" />}
              <span className={cn(!isDefault && "pl-[22px]")}>Default</span>
            </button>
            <div className="border-t border-border" />
            {presets.map(([key, preset]) => {
              const active = presetName === key;
              const fontSans = preset.styles.light["font-sans"];
              const fontShort = fontSans?.split(",")[0]?.replace(/["']/g, "") ?? "";
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    applyPreset(key);
                    setOpen(false);
                  }}
                  className={cn(
                    "w-full text-left px-3 py-2 text-sm transition-colors flex items-start gap-2",
                    "text-muted-foreground hover:text-foreground hover:bg-secondary",
                    active && "text-foreground bg-secondary",
                  )}
                >
                  {active && <Check size={14} className="shrink-0 mt-0.5" />}
                  <div className={cn("flex flex-col min-w-0", !active && "pl-[22px]")}>
                    <span className="truncate">{preset.label ?? key}</span>
                    {fontShort && (
                      <span className="text-[10px] text-muted-foreground/60 truncate">
                        {fontShort}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
          <div className="border-t border-border shrink-0">
            <button
              type="button"
              onClick={() => {
                setTheme(theme === "dark" ? "light" : "dark");
              }}
              className="w-full text-left px-3 py-2 text-sm transition-colors text-muted-foreground hover:text-foreground hover:bg-secondary flex items-center gap-2"
            >
              {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
