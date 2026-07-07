export type ToolCategory =
  | "core"
  | "runtime"
  | "data"
  | "ai"
  | "infrastructure";

export type PerformanceMetric = {
  label: string;
  value: string;
  unit?: string;
  comparison?: string;
  highlight?: boolean;
};

export type DxTool = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: ToolCategory;
  language: string;
  command?: string;
  docSlug?: string;
  github?: string;
  features: string[];
  achievements: string[];
  performance: PerformanceMetric[];
  headlineMetric?: string;
  color: string;
};

export const toolCategories: Record<
  ToolCategory,
  { label: string; description: string }
> = {
  core: {
    label: "Core Platform",
    description: "Editor, CLI, web framework, and build toolchain",
  },
  runtime: {
    label: "Runtime & Agents",
    description: "AI agents, workflows, and native app tooling",
  },
  data: {
    label: "Data & Media",
    description: "Search, icons, media, serialization, and i18n",
  },
  ai: {
    label: "AI Infrastructure",
    description: "Providers, protocols, and AI rule orchestration",
  },
  infrastructure: {
    label: "Infrastructure",
    description: "Validation, version control, and language runtimes",
  },
};

export const dxTools: DxTool[] = [
  {
    slug: "cli",
    name: "DX CLI",
    tagline: "One command. Every tool.",
    description:
      "The central command-line interface that unifies the entire DX ecosystem. 150+ commands across code, build, web, agents, media, search, and more — all from a single binary.",
    category: "core",
    language: "Rust",
    command: "dx",
    docSlug: "dx-cli",
    features: [
      "150+ unified commands across the ecosystem",
      "MCP server with 80+ tool surfaces",
      "OAuth via browser — zero config setup",
      "Cross-platform Windows, macOS, Linux",
    ],
    achievements: [
      "Single binary orchestrates 19+ DX projects",
      "Works with Cursor, Claude, Windsurf, Raycast via MCP",
      "One npx command to get operational",
    ],
    performance: [
      { label: "Commands", value: "150+", highlight: true },
      { label: "MCP Tools", value: "80+", highlight: true },
      { label: "Platforms", value: "3", unit: "OS" },
    ],
    headlineMetric: "150+ commands",
    color: "hsl(225, 70%, 45%)",
  },
  {
    slug: "code",
    name: "DX Code",
    tagline: "GPU-accelerated editor",
    description:
      "A high-performance code editor forked from Zed with integrated AI, web tools, media panels, forge, skills, and the full DX toolchain built in.",
    category: "core",
    language: "Rust",
    docSlug: "dx-code",
    features: [
      "GPU-accelerated rendering via GPUI",
      "Integrated AI screen with multi-provider support",
      "9 web tools with live webpreview",
      "Forge, media, icon, and skills panels",
    ],
    achievements: [
      "Zed fork with full DX ecosystem integration",
      "ACP support for Codex, Claude, OpenCode, GLM",
      "Connect tab with QR pairing for mobile/CLI",
    ],
    performance: [
      { label: "Rendering", value: "GPU", comparison: "GPUI-accelerated" },
      { label: "Web Tools", value: "9", unit: "built-in" },
      { label: "AI Providers", value: "180+", comparison: "via catalog" },
    ],
    headlineMetric: "GPU-accelerated",
    color: "hsl(260, 60%, 50%)",
  },
  {
    slug: "www",
    name: "DX Web",
    tagline: "Rust-owned web framework",
    description:
      "A Rust-owned web framework and server runtime for React/Next-familiar .tsx apps. Ships static HTML, no-JS routes, and explicit client islands from one toolchain.",
    category: "core",
    language: "Rust",
    command: "dx www",
    docSlug: "dx-web",
    features: [
      "App Router-shaped .tsx authoring",
      "Tiny/no-JS output for static routes",
      "DX-native state, effects, and motion",
      "Forge-reviewed package governance",
    ],
    achievements: [
      "#1 median throughput in controlled benchmark",
      "474-byte captured benchmark route payload",
      "Receipt-backed release readiness gates",
    ],
    performance: [
      {
        label: "Median RPS",
        value: "2,399",
        comparison: "vs 697 Next.js",
        highlight: true,
      },
      {
        label: "Route Size",
        value: "474",
        unit: "bytes",
        comparison: "vs 636KB Next.js",
        highlight: true,
      },
      {
        label: "Speedup vs Next",
        value: "3.4",
        unit: "× RPS",
        highlight: true,
      },
    ],
    headlineMetric: "3.4× faster than Next.js",
    color: "hsl(200, 70%, 45%)",
  },
  {
    slug: "build",
    name: "DX Build",
    tagline: "Lightning-fast bundler",
    description:
      "A Rolldown fork with DX serializer cache integration. Blazing-fast JavaScript/TypeScript bundling with proof-backed performance wins on JSON-heavy workloads.",
    category: "core",
    language: "Rust",
    command: "dx build",
    docSlug: "dx-build",
    features: [
      "Rolldown-powered bundling",
      "DX .machine cache for package metadata",
      "esbuild-compatible plugin API",
      "Watch mode with hot reload",
    ],
    achievements: [
      "30.17% p95 improvement vs official Rolldown",
      "Matching output hashes across all benchmark arms",
      "DX cache-enabled builds beat official on median and p95",
    ],
    performance: [
      {
        label: "P95 Speedup",
        value: "30",
        unit: "% faster",
        comparison: "vs rolldown@1.0.3",
        highlight: true,
      },
      {
        label: "Median",
        value: "209",
        unit: "ms",
        comparison: "vs 220ms official",
      },
      {
        label: "P95",
        value: "359",
        unit: "ms",
        comparison: "vs 467ms official",
        highlight: true,
      },
    ],
    headlineMetric: "30% faster p95",
    color: "hsl(35, 80%, 50%)",
  },
  {
    slug: "js",
    name: "DX JS",
    tagline: "All-in-one JavaScript runtime",
    description:
      "A Bun fork with DX .machine serializer integration. Runtime, bundler, test runner, and package manager in a single fast tool.",
    category: "core",
    language: "Zig / C++",
    command: "dx js",
    features: [
      "JavaScript/TypeScript runtime",
      "Built-in test runner and bundler",
      "Node.js-compatible package manager",
      "DX .machine cache for package metadata",
    ],
    achievements: [
      "2.5× faster package metadata reads with .machine",
      "60.5% faster on large fixtures",
      "Single tool replaces node + npm + jest + esbuild",
    ],
    performance: [
      {
        label: "Large Fixture",
        value: "2.53",
        unit: "× faster",
        comparison: "local-json vs local-machine",
        highlight: true,
      },
      {
        label: "Medium",
        value: "2.16",
        unit: "× faster",
      },
      {
        label: "Small",
        value: "1.92",
        unit: "× faster",
      },
    ],
    headlineMetric: "2.5× faster metadata",
    color: "hsl(50, 90%, 45%)",
  },
  {
    slug: "py",
    name: "DX Python",
    tagline: "Fast Python package manager",
    description:
      "Python tooling with C extensions for maximum performance. Package management and build tooling integrated into the DX ecosystem.",
    category: "core",
    language: "Rust / Python / C",
    command: "dx py",
    docSlug: "dx-python",
    features: [
      "Fast package resolution",
      "C extension support",
      "Integrated with DX CLI",
      "Cross-platform builds",
    ],
    achievements: [
      "Native C extensions for hot paths",
      "CircleCI multi-platform release pipeline",
      "Integrated into DX CLI orchestration",
    ],
    performance: [
      { label: "Load", value: "Native", comparison: "C extensions" },
      { label: "Platforms", value: "3", unit: "OS" },
    ],
    headlineMetric: "Native C speed",
    color: "hsl(210, 60%, 45%)",
  },
  {
    slug: "agent",
    name: "DX Agent",
    tagline: "Multi-channel AI runtime",
    description:
      "A Rust-first agent runtime with provider routing, gateway pairing, cron, skills, memory, and multi-channel delivery across Slack, Telegram, WhatsApp, and more.",
    category: "runtime",
    language: "Rust",
    command: "dx agent",
    docSlug: "dx-agent",
    features: [
      "Multi-channel runtime (Slack, Telegram, WhatsApp)",
      "Provider-agnostic model routing",
      "Gateway pairing with QR codes",
      "Cron, skills, memory, and SOP foundations",
    ],
    achievements: [
      "180+ providers via DX catalog",
      "Self-updating release pipeline",
      "OpenClaw channels integration path",
    ],
    performance: [
      { label: "Providers", value: "180+", highlight: true },
      { label: "Channels", value: "10+", unit: "adapters" },
      { label: "MCP Tools", value: "80+", comparison: "exposed" },
    ],
    headlineMetric: "180+ providers",
    color: "hsl(280, 60%, 50%)",
  },
  {
    slug: "flow",
    name: "DX Flow",
    tagline: "Local-first workflow automation",
    description:
      "Local-first workflow automation with on-device LLM inference, voice, vision, and multimodal module orchestration for desktop and mobile hosts.",
    category: "runtime",
    language: "Rust",
    command: "dx flow",
    docSlug: "dx-flow",
    features: [
      "On-device LLM inference (WebGPU + CPU)",
      "Voice capture and TTS playback",
      "Module onboarding and permissions",
      "Benchmark-driven device promotion",
    ],
    achievements: [
      "WebGPU and WebLLM paths for GPU/CPU hosts",
      "Android and iOS app integration",
      "Persistent module and approval state",
    ],
    performance: [
      { label: "Inference", value: "Local", comparison: "on-device" },
      { label: "Backends", value: "2", unit: "WebGPU + CPU" },
      { label: "Platforms", value: "5+", unit: "desktop + mobile" },
    ],
    headlineMetric: "Local-first inference",
    color: "hsl(170, 60%, 40%)",
  },
  {
    slug: "native",
    name: "DX Native",
    tagline: "Cross-platform app framework",
    description:
      "A Tauri fork with DX serializer cache integration. Build desktop and mobile apps with Rust backends and web frontends.",
    category: "runtime",
    language: "Rust",
    command: "dx native",
    docSlug: "dx-native",
    features: [
      "Desktop and mobile app builds",
      "DX serializer cache for CLI paths",
      "WebView-based UI with Rust backend",
      "Cross-platform installers",
    ],
    achievements: [
      "17.47× faster package manifest reads",
      "13.71× faster watch-folder discovery",
      "3.06× faster wix-upgrade-code inspection",
    ],
    performance: [
      {
        label: "Manifest Cache",
        value: "17.5",
        unit: "× faster",
        highlight: true,
      },
      {
        label: "Watch Discovery",
        value: "13.7",
        unit: "× faster",
        highlight: true,
      },
      {
        label: "Wix Inspect",
        value: "3.06",
        unit: "× faster",
      },
    ],
    headlineMetric: "17.5× manifest cache",
    color: "hsl(150, 50%, 40%)",
  },
  {
    slug: "forge",
    name: "DX Forge",
    tagline: "Content-addressed version control",
    description:
      "Content-addressed storage with Git-like CLI. Package management, multi-remote sync, and QUIC transport for the DX ecosystem.",
    category: "infrastructure",
    language: "Rust",
    command: "dx forge",
    docSlug: "dx-forge",
    features: [
      "Content-addressed blob storage",
      "Git-like CLI workflow",
      "Multi-remote sync",
      "QUIC transport for fast transfers",
    ],
    achievements: [
      "Forge-reviewed package governance for DX Web",
      "15+ package registry integrations",
      "Receipt-backed source snapshots",
    ],
    performance: [
      { label: "Registries", value: "15+", unit: "supported" },
      { label: "Transport", value: "QUIC", comparison: "bidirectional" },
    ],
    headlineMetric: "15+ registries",
    color: "hsl(20, 70%, 45%)",
  },
  {
    slug: "check",
    name: "DX Check",
    tagline: "Automated validation & scoring",
    description:
      "Automated validation across correctness, performance, security, style, and testing. 500-point scoring system with receipt-backed results.",
    category: "infrastructure",
    language: "Rust",
    command: "dx check",
    docSlug: "dx-check",
    features: [
      "500-point scoring across 5 categories",
      "Lighthouse integration for web audits",
      "Receipt-backed validation results",
      "CI/CD pipeline integration",
    ],
    achievements: [
      "5 validation categories with weighted scoring",
      "Template health score gates for DX Web",
      "Traffic-light readiness states",
    ],
    performance: [
      { label: "Score", value: "500", unit: "points", highlight: true },
      { label: "Categories", value: "5", unit: "validated" },
      { label: "Receipts", value: "JSON", comparison: "machine-readable" },
    ],
    headlineMetric: "500-point scoring",
    color: "hsl(0, 60%, 50%)",
  },
  {
    slug: "style",
    name: "DX Style",
    tagline: "Rust-native CSS engine",
    description:
      "A Rust-native CSS scanner and generator replacing PostCSS and Tailwind. 80+ utility families with Tailwind v4.3 compatibility.",
    category: "data",
    language: "Rust",
    command: "dx style",
    docSlug: "dx-style",
    features: [
      "80+ utility families",
      "Tailwind v4.3 compatibility matrix",
      "No PostCSS or Node dependency chain",
      "Binary Dawn format for zero-copy CSS",
    ],
    achievements: [
      "178× faster incremental rebuilds vs Tailwind",
      "114× faster layer cache generation",
      "Sub-microsecond atomic style lookups",
    ],
    performance: [
      {
        label: "Incremental",
        value: "178",
        unit: "× faster",
        comparison: "vs Tailwind v4",
        highlight: true,
      },
      {
        label: "Layer Cache",
        value: "114",
        unit: "× faster",
        highlight: true,
      },
      {
        label: "Atomic Lookup",
        value: "<1",
        unit: "µs",
      },
    ],
    headlineMetric: "178× vs Tailwind",
    color: "hsl(300, 60%, 50%)",
  },
  {
    slug: "serializer",
    name: "DX Serializer",
    tagline: "Token-optimized serialization",
    description:
      "Three-format serialization system: human-readable .sr files, token-optimized .llm format, and zero-copy .machine binary via RKYV.",
    category: "data",
    language: "Rust",
    command: "dx serializer",
    docSlug: "dx-serializer",
    features: [
      "49% token savings vs compact JSON",
      "Zero-copy .machine format via RKYV",
      "Three-format auto-generation pipeline",
      "Beats TOON, Tauq, and TONL on tokens",
    ],
    achievements: [
      "229× faster hot mmap reads vs JSON parse",
      "312× faster vs JSON read+parse on small fixtures",
      "48-51ns single serialize time",
    ],
    performance: [
      {
        label: "Token Savings",
        value: "49",
        unit: "%",
        comparison: "vs JSON",
        highlight: true,
      },
      {
        label: "Hot Mmap",
        value: "229",
        unit: "× faster",
        comparison: "vs JSON parse",
        highlight: true,
      },
      {
        label: "Serialize",
        value: "48",
        unit: "ns",
      },
    ],
    headlineMetric: "229× faster reads",
    color: "hsl(180, 50%, 40%)",
  },
  {
    slug: "icon",
    name: "DX Icon",
    tagline: "Fastest icon search engine",
    description:
      "Search across 305,612 icons with sub-millisecond cold cache performance. WASM support for browser deployment.",
    category: "data",
    language: "Rust",
    command: "dx icon",
    docSlug: "dx-icon",
    features: [
      "305,612 icons indexed",
      "LobeChat and SVGL icon packs",
      "WASM support for browsers",
      "Axum 0.8 web server",
    ],
    achievements: [
      "98,783 searches/sec throughput",
      "10-25× faster than Icones.js",
      "25-50× faster than Iconify API",
    ],
    performance: [
      {
        label: "Cold Cache",
        value: "1.89",
        unit: "ms",
        highlight: true,
      },
      {
        label: "Throughput",
        value: "98,783",
        unit: "searches/s",
        highlight: true,
      },
      {
        label: "vs Iconify",
        value: "25-50",
        unit: "× faster",
        highlight: true,
      },
    ],
    headlineMetric: "98K searches/sec",
    color: "hsl(45, 80%, 45%)",
  },
  {
    slug: "media",
    name: "DX Media",
    tagline: "Universal media acquisition",
    description:
      "Search, download, and process images, video, audio, and documents from 34+ providers with native Rust processing.",
    category: "data",
    language: "Rust",
    command: "dx media",
    docSlug: "dx-media",
    features: [
      "34+ media providers",
      "Native SVG rendering via resvg",
      "Parallel processing with Rayon",
      "Receipt-oriented provenance tracking",
    ],
    achievements: [
      "Millions of media assets indexed",
      "Type-safe provider URLs",
      "Native Rust image processing",
    ],
    performance: [
      { label: "Providers", value: "34+", highlight: true },
      { label: "SVG", value: "Native", comparison: "resvg" },
      { label: "Parallel", value: "Rayon", comparison: "multi-file" },
    ],
    headlineMetric: "34+ providers",
    color: "hsl(330, 60%, 50%)",
  },
  {
    slug: "metasearch",
    name: "DX Metasearch",
    tagline: "Privacy-respecting search",
    description:
      "Aggregates results from 180+ upstream search engines across 15 categories. Privacy-first with no tracking.",
    category: "data",
    language: "Rust",
    command: "dx search",
    docSlug: "dx-metasearch",
    features: [
      "180+ upstream engines",
      "15 search categories",
      "Privacy-respecting aggregation",
      "Self-hostable metasearch instance",
    ],
    achievements: [
      "Web, images, news, videos, academic, code, social",
      "No user tracking or profiling",
      "Integrated into DX CLI search command",
    ],
    performance: [
      { label: "Engines", value: "180+", highlight: true },
      { label: "Categories", value: "15", unit: "types" },
      { label: "Privacy", value: "Zero", unit: "tracking" },
    ],
    headlineMetric: "180+ engines",
    color: "hsl(220, 55%, 45%)",
  },
  {
    slug: "i18n",
    name: "DX i18n",
    tagline: "Translation & localization",
    description:
      "High-performance internationalization with translation, text-to-speech, and speech-to-text. Embedded STT model with no download required.",
    category: "data",
    language: "Rust",
    command: "dx i18n",
    docSlug: "dx-i18n",
    features: [
      "Multi-provider translation pipeline",
      "Embedded tiny.en STT model (76MB)",
      "Text-to-speech generation",
      "Lockfile-based delta tracking",
    ],
    achievements: [
      "0.8s per 13-second audio on CPU",
      "No model download — embedded in binary",
      "Multi-provider translation failover",
    ],
    performance: [
      {
        label: "STT Speed",
        value: "0.8",
        unit: "s / 13s audio",
        highlight: true,
      },
      {
        label: "Model Size",
        value: "76",
        unit: "MB embedded",
      },
      { label: "Providers", value: "Multi", comparison: "failover" },
    ],
    headlineMetric: "0.8s STT on CPU",
    color: "hsl(100, 50%, 40%)",
  },
  {
    slug: "providers",
    name: "DX Providers",
    tagline: "AI provider catalog",
    description:
      "Ultra-fast provider catalog with 184 providers and 6,245 models. Zero-copy deserialization via rkyv + memmap2.",
    category: "ai",
    language: "Rust",
    docSlug: "providers",
    features: [
      "184 providers, 6,245 models",
      "Zero-copy rkyv + memmap2 loading",
      "25 runtime providers with API implementations",
      "LiteLLM + Models.dev merged snapshot",
    ],
    achievements: [
      "38μs load time — essentially instant",
      "200× faster than Node.js",
      "297× faster than Python",
    ],
    performance: [
      {
        label: "Load Time",
        value: "38",
        unit: "μs",
        highlight: true,
      },
      {
        label: "vs Node.js",
        value: "200",
        unit: "× faster",
        highlight: true,
      },
      {
        label: "vs Python",
        value: "297",
        unit: "× faster",
        highlight: true,
      },
    ],
    headlineMetric: "38μs load time",
    color: "hsl(250, 55%, 50%)",
  },
  {
    slug: "dcp",
    name: "DCP",
    tagline: "Development Context Protocol",
    description:
      "High-performance binary protocol replacing MCP JSON-RPC with 6-12× smaller messages, O(1) parsing, and full backward compatibility.",
    category: "ai",
    language: "Rust",
    command: "dx dcp",
    docSlug: "dx-dcp",
    features: [
      "Drop-in MCP adapter",
      "Binary protocol with O(1) dispatch",
      "Ed25519 signatures and capability manifests",
      "Hybrid mode for gradual migration",
    ],
    achievements: [
      "6-12× smaller messages than JSON-RPC",
      "O(1) pointer cast vs O(n) JSON parsing",
      "535+ tests passing",
    ],
    performance: [
      {
        label: "Message Size",
        value: "6-12",
        unit: "× smaller",
        highlight: true,
      },
      { label: "Parsing", value: "O(1)", comparison: "vs O(n) JSON" },
      { label: "Memory", value: "Zero", unit: "allocations" },
    ],
    headlineMetric: "6-12× smaller payloads",
    color: "hsl(190, 60%, 40%)",
  },
  {
    slug: "driven",
    name: "DX Driven",
    tagline: "AI rule orchestrator",
    description:
      "Single source of truth for AI coding rules across Cursor, Copilot, Windsurf, Claude, Aider, and Cline. Binary-first with 73% smaller rule files.",
    category: "ai",
    language: "Rust",
    command: "dx driven",
    docSlug: "dx-driven",
    features: [
      "Universal parser for all AI rule formats",
      "Multi-target emitter to any editor",
      "Binary Dawn format (73% smaller)",
      "Template system with hot cache",
    ],
    achievements: [
      "71× faster template hot cache",
      "95% bandwidth savings with XOR patcher",
      "Single source replaces 6+ editor configs",
    ],
    performance: [
      {
        label: "Binary Size",
        value: "73",
        unit: "% smaller",
        highlight: true,
      },
      {
        label: "Hot Cache",
        value: "71",
        unit: "× faster",
        highlight: true,
      },
      {
        label: "Bandwidth",
        value: "95",
        unit: "% saved",
        comparison: "XOR patcher",
      },
    ],
    headlineMetric: "71× hot cache",
    color: "hsl(60, 60%, 45%)",
  },
];

export function getToolBySlug(slug: string): DxTool | undefined {
  return dxTools.find((t) => t.slug === slug);
}

export function requireTool(slug: string): DxTool {
  const tool = getToolBySlug(slug);
  if (!tool) {
    throw new Error(`Unknown DX tool: ${slug}`);
  }
  return tool;
}

export function getAllToolSlugs(): string[] {
  return dxTools.map((t) => t.slug);
}

export function getToolsByCategory(category: ToolCategory): DxTool[] {
  return dxTools.filter((t) => t.category === category);
}

export function getCategoryLabel(category: ToolCategory): string {
  return toolCategories[category].label;
}
