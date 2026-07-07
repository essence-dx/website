import baseConfig from "@dx/ui/tailwind.config";
import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}", "./packages/ui/src/**/*.{ts,tsx}"],
  presets: [baseConfig],
  theme: {
    container: {
      center: true,
    },
    extend: {
      keyframes: {
        "dropdown-fade": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "dropdown-slide": {
          "0%": { opacity: "0", transform: "translateX(-10px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "mobile-slide": {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "marquee-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-right": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        "fade-blur-in": {
          "0%": { opacity: "0", filter: "blur(8px)" },
          "100%": { opacity: "1", filter: "blur(0px)" },
        },
        "border-beam": {
          "100%": { offsetDistance: "100%" },
        },
        shimmer: {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "-200% 0" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
      },
      animation: {
        "dropdown-fade": "dropdown-fade 0.15s ease-out forwards",
        "dropdown-slide": "dropdown-slide 0.2s ease-out forwards",
        "mobile-slide": "mobile-slide 0.2s ease-out forwards",
        "marquee-left": "marquee-left 30s linear infinite",
        "marquee-left-slow": "marquee-left 35s linear infinite",
        "marquee-right": "marquee-right 28s linear infinite",
        "fade-blur-in": "fade-blur-in 0.7s ease-out forwards",
        "border-beam": "border-beam 8s linear infinite",
        shimmer: "shimmer 2s linear infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
      },
    },
  },
} satisfies Config;
