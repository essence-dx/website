"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type Theme = "dark" | "light" | "system";

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}

interface UseThemeProps {
  themes: string[];
  forcedTheme?: string;
  setTheme: (theme: string) => void;
  theme?: string;
  resolvedTheme?: string;
  systemTheme?: "dark" | "light";
}

const ThemeContext = createContext<UseThemeProps | undefined>(undefined);

function getSystemTheme(): "dark" | "light" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getTheme(storageKey: string, defaultTheme: Theme): string {
  if (typeof window === "undefined") return defaultTheme;
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored) return stored;
  } catch {}
  return defaultTheme;
}

function applyTheme(theme: string, disableTransition: boolean) {
  const d = document.documentElement;
  if (disableTransition) {
    const style = document.createElement("style");
    style.appendChild(
      document.createTextNode(
        "*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}",
      ),
    );
    document.head.appendChild(style);
    d.classList.add(theme);
    d.style.colorScheme = theme;
    window.getComputedStyle(d);
    requestAnimationFrame(() =>
      setTimeout(() => document.head.removeChild(style), 1),
    );
  } else {
    d.classList.remove("dark", "light");
    d.classList.add(theme);
    d.style.colorScheme = theme;
  }
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme",
  enableSystem = true,
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<string>(() =>
    getTheme(storageKey, defaultTheme),
  );
  const [systemTheme, setSystemTheme] = useState<"dark" | "light">("light");

  const resolvedTheme = theme === "system" ? systemTheme : theme;

  const applyAndStore = useCallback(
    (newTheme: string) => {
      setThemeState(newTheme);
      try {
        localStorage.setItem(storageKey, newTheme);
      } catch {}
      const resolved = newTheme === "system" ? getSystemTheme() : newTheme;
      applyTheme(resolved, disableTransitionOnChange);
    },
    [storageKey, disableTransitionOnChange],
  );

  const setTheme = useCallback(
    (newTheme: string) => {
      applyAndStore(newTheme);
    },
    [applyAndStore],
  );

  useEffect(() => {
    applyTheme(resolvedTheme, false);
  }, []);

  useEffect(() => {
    if (!enableSystem) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      setSystemTheme(mq.matches ? "dark" : "light");
      if (theme === "system") {
        applyTheme(mq.matches ? "dark" : "light", disableTransitionOnChange);
      }
    };
    mq.addEventListener("change", handler);
    setSystemTheme(mq.matches ? "dark" : "light");
    return () => mq.removeEventListener("change", handler);
  }, [enableSystem, theme, disableTransitionOnChange]);

  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === storageKey && e.newValue) {
        setThemeState(e.newValue);
        const resolved =
          e.newValue === "system" ? getSystemTheme() : e.newValue;
        applyTheme(resolved, disableTransitionOnChange);
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [storageKey, disableTransitionOnChange]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      resolvedTheme,
      themes: enableSystem ? ["light", "dark", "system"] : ["light", "dark"],
      systemTheme: enableSystem ? systemTheme : undefined,
    }),
    [theme, setTheme, resolvedTheme, enableSystem, systemTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): UseThemeProps {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    return {
      themes: [],
      setTheme: () => {},
      theme: undefined,
      resolvedTheme: undefined,
      forcedTheme: undefined,
      systemTheme: undefined,
    };
  }
  return ctx;
}
