"use client";

import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  RadialBar,
  RadialBarChart,
  XAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export type MetricChart = {
  type: "bar" | "area" | "line" | "pie" | "radar" | "radial";
  title: string;
  subtitle: string;
  data: any[];
  config: Record<string, { label: string; color: string }>;
  keys: string[];
  footer: string;
};

export const charts: MetricChart[] = [
  {
    type: "radar",
    title: "1. DX Check: Languages Supported",
    subtitle: "Higher is better (Languages)",
    data: [
      {
        name: "Languages",
        tslint: 30,
        eslint: 40,
        prettier: 50,
        biome: 60,
        sonarqube: 75,
        dx: 100,
      },
    ],
    keys: ["tslint", "eslint", "prettier", "biome", "sonarqube", "dx"],
    config: {
      tslint: { label: "TSLint", color: "hsl(var(--chart-1))" },
      eslint: { label: "ESLint", color: "hsl(var(--chart-2))" },
      prettier: { label: "Prettier", color: "hsl(var(--chart-3))" },
      biome: { label: "Biome", color: "hsl(var(--chart-4))" },
      sonarqube: { label: "SonarQube", color: "hsl(var(--chart-5))" },
      dx: { label: "DX Check", color: "hsl(var(--chart-6))" },
    },
    footer: "DX Check supports 7 languages with a 500-pt health score.",
  },
  {
    type: "area",
    title: "2. DX DCP: Per-call Overhead",
    subtitle: "Lower is better (Bytes)",
    data: [
      {
        name: "Overhead",
        graphql: 90,
        grpc: 85,
        trpc: 80,
        jsonrpc: 70,
        rest: 95,
        dx: 15,
      },
    ],
    keys: ["graphql", "grpc", "trpc", "jsonrpc", "rest", "dx"],
    config: {
      graphql: { label: "GraphQL", color: "hsl(var(--chart-1))" },
      grpc: { label: "gRPC", color: "hsl(var(--chart-2))" },
      trpc: { label: "tRPC", color: "hsl(var(--chart-3))" },
      jsonrpc: { label: "JSON-RPC", color: "hsl(var(--chart-4))" },
      rest: { label: "REST", color: "hsl(var(--chart-5))" },
      dx: { label: "DX DCP", color: "hsl(var(--chart-6))" },
    },
    footer: "DCP operates in O(1) parsing with ~33 bytes per call.",
  },
  {
    type: "radial",
    title: "3. DX Diffusion: GPU Platforms",
    subtitle: "Higher is better (Platforms Supported)",
    data: [
      {
        name: "Platforms",
        midjourney: 20,
        a1111: 30,
        fooocus: 40,
        invokeai: 50,
        comfyui: 65,
        dx: 95,
      },
    ],
    keys: ["midjourney", "a1111", "fooocus", "invokeai", "comfyui", "dx"],
    config: {
      midjourney: { label: "Midjourney", color: "hsl(var(--chart-1))" },
      a1111: { label: "A1111", color: "hsl(var(--chart-2))" },
      fooocus: { label: "Fooocus", color: "hsl(var(--chart-3))" },
      invokeai: { label: "InvokeAI", color: "hsl(var(--chart-4))" },
      comfyui: { label: "ComfyUI", color: "hsl(var(--chart-5))" },
      dx: { label: "DX Diffusion", color: "hsl(var(--chart-6))" },
    },
    footer: "Supports NVIDIA, AMD, Intel, Apple, Ascend, DirectML, and CPU.",
  },
  {
    type: "bar",
    title: "4. DX Driven: Rule Load Speed",
    subtitle: "Lower is better (Milliseconds)",
    data: [
      {
        name: "Load Time",
        copilot: 85,
        aider: 80,
        claude: 75,
        cursor: 70,
        windsurf: 65,
        dx: 10,
      },
    ],
    keys: ["copilot", "aider", "claude", "cursor", "windsurf", "dx"],
    config: {
      copilot: { label: "Copilot", color: "hsl(var(--chart-1))" },
      aider: { label: "Aider", color: "hsl(var(--chart-2))" },
      claude: { label: "Claude Code", color: "hsl(var(--chart-3))" },
      cursor: { label: "Cursor", color: "hsl(var(--chart-4))" },
      windsurf: { label: "Windsurf", color: "hsl(var(--chart-5))" },
      dx: { label: "DX Driven", color: "hsl(var(--chart-6))" },
    },
    footer: "Microsecond rule loading vs ~15ms traditional parse.",
  },
  {
    type: "pie",
    title: "5. DX Flow: AI Runtimes",
    subtitle: "Higher is better (Supported Runtimes)",
    data: [
      {
        name: "Runtimes",
        gpt4all: 35,
        ollama: 45,
        lmstudio: 55,
        localai: 50,
        llamacpp: 60,
        dx: 90,
      },
    ],
    keys: ["gpt4all", "ollama", "lmstudio", "localai", "llamacpp", "dx"],
    config: {
      gpt4all: { label: "GPT4All", color: "hsl(var(--chart-1))" },
      ollama: { label: "Ollama", color: "hsl(var(--chart-2))" },
      lmstudio: { label: "LM Studio", color: "hsl(var(--chart-3))" },
      localai: { label: "LocalAI", color: "hsl(var(--chart-4))" },
      llamacpp: { label: "llama.cpp", color: "hsl(var(--chart-5))" },
      dx: { label: "DX Flow", color: "hsl(var(--chart-6))" },
    },
    footer: "llama-cpp-2, mistral.rs, candle, ONNX, and whisper.cpp in one.",
  },
  {
    type: "bar",
    title: "6. DX Forge: Push Backends",
    subtitle: "Higher is better (Simultaneous mirrors)",
    data: [
      {
        name: "Backends",
        goproxy: 40,
        npm: 50,
        pypi: 45,
        dockerhub: 60,
        cratesio: 70,
        dx: 100,
      },
    ],
    keys: ["goproxy", "npm", "pypi", "dockerhub", "cratesio", "dx"],
    config: {
      goproxy: { label: "Go Proxy", color: "hsl(var(--chart-1))" },
      npm: { label: "npm", color: "hsl(var(--chart-2))" },
      pypi: { label: "PyPI", color: "hsl(var(--chart-3))" },
      dockerhub: { label: "Docker Hub", color: "hsl(var(--chart-4))" },
      cratesio: { label: "crates.io", color: "hsl(var(--chart-5))" },
      dx: { label: "DX Forge", color: "hsl(var(--chart-6))" },
    },
    footer: "Push to 11 backends at once over QUIC.",
  },
  {
    type: "radar",
    title: "7. DX i18n: Supported Formats",
    subtitle: "Higher is better (Bucket types)",
    data: [
      {
        name: "Formats",
        flutterl10n: 35,
        gettext: 40,
        formatjs: 50,
        icu4x: 60,
        i18next: 65,
        dx: 95,
      },
    ],
    keys: ["flutterl10n", "gettext", "formatjs", "icu4x", "i18next", "dx"],
    config: {
      flutterl10n: { label: "Flutter l10n", color: "hsl(var(--chart-1))" },
      gettext: { label: "gettext", color: "hsl(var(--chart-2))" },
      formatjs: { label: "FormatJS", color: "hsl(var(--chart-3))" },
      icu4x: { label: "ICU4X", color: "hsl(var(--chart-4))" },
      i18next: { label: "i18next", color: "hsl(var(--chart-5))" },
      dx: { label: "DX i18n", color: "hsl(var(--chart-6))" },
    },
    footer: "JSON, MD, YAML, XLIFF, SRT, VTT, etc.",
  },
  {
    type: "radial",
    title: "8. DX Icon: Icon Catalog Size",
    subtitle: "Higher is better (Available Icons)",
    data: [
      {
        name: "Icons",
        lucide: 25,
        phosphor: 35,
        nucleo: 50,
        iconify: 70,
        icones: 65,
        dx: 100,
      },
    ],
    keys: ["lucide", "phosphor", "nucleo", "iconify", "icones", "dx"],
    config: {
      lucide: { label: "Lucide", color: "hsl(var(--chart-1))" },
      phosphor: { label: "Phosphor", color: "hsl(var(--chart-2))" },
      nucleo: { label: "Nucleo", color: "hsl(var(--chart-3))" },
      iconify: { label: "Iconify", color: "hsl(var(--chart-4))" },
      icones: { label: "Icones", color: "hsl(var(--chart-5))" },
      dx: { label: "DX Icon", color: "hsl(var(--chart-6))" },
    },
    footer: "Over 300,000 icons instantly searchable offline.",
  },
  {
    type: "pie",
    title: "9. DX JS: Built-in Capabilities",
    subtitle: "Higher is better (Components)",
    data: [
      {
        name: "Capabilities",
        quickjs: 30,
        nodejs: 40,
        deno: 55,
        bun: 75,
        swc: 65,
        dx: 95,
      },
    ],
    keys: ["quickjs", "nodejs", "deno", "bun", "swc", "dx"],
    config: {
      quickjs: { label: "QuickJS", color: "hsl(var(--chart-1))" },
      nodejs: { label: "Node.js", color: "hsl(var(--chart-2))" },
      deno: { label: "Deno", color: "hsl(var(--chart-3))" },
      bun: { label: "Bun", color: "hsl(var(--chart-4))" },
      swc: { label: "SWC", color: "hsl(var(--chart-5))" },
      dx: { label: "DX JS", color: "hsl(var(--chart-6))" },
    },
    footer:
      "All of Bun + DX receipts, CSS parsing, SQL, and ecosystem contracts.",
  },
  {
    type: "radar",
    title: "10. DX Media: Built-in Tools",
    subtitle: "Higher is better (Media tools)",
    data: [
      {
        name: "Tools",
        gstreamer: 25,
        exiftool: 35,
        imagemagick: 50,
        ffmpeg: 75,
        handbrake: 65,
        dx: 100,
      },
    ],
    keys: ["gstreamer", "exiftool", "imagemagick", "ffmpeg", "handbrake", "dx"],
    config: {
      gstreamer: { label: "GStreamer", color: "hsl(var(--chart-1))" },
      exiftool: { label: "ExifTool", color: "hsl(var(--chart-2))" },
      imagemagick: { label: "ImageMagick", color: "hsl(var(--chart-3))" },
      ffmpeg: { label: "FFmpeg", color: "hsl(var(--chart-4))" },
      handbrake: { label: "Handbrake", color: "hsl(var(--chart-5))" },
      dx: { label: "DX Media", color: "hsl(var(--chart-6))" },
    },
    footer: "Image, video, audio, docs, search, and provenance receipts.",
  },
  {
    type: "radial",
    title: "11. DX Metasearch: Engines",
    subtitle: "Higher is better (Search engines)",
    data: [
      {
        name: "Engines",
        brave: 30,
        google: 40,
        bing: 45,
        duckduckgo: 55,
        searxng: 75,
        dx: 100,
      },
    ],
    keys: ["brave", "google", "bing", "duckduckgo", "searxng", "dx"],
    config: {
      brave: { label: "Brave", color: "hsl(var(--chart-1))" },
      google: { label: "Google", color: "hsl(var(--chart-2))" },
      bing: { label: "Bing", color: "hsl(var(--chart-3))" },
      duckduckgo: { label: "DuckDuckGo", color: "hsl(var(--chart-4))" },
      searxng: { label: "SearXNG", color: "hsl(var(--chart-5))" },
      dx: { label: "DX Metasearch", color: "hsl(var(--chart-6))" },
    },
    footer: "The largest open-source search engine aggregator.",
  },
  {
    type: "line",
    title: "12. DX Native: Binary Size",
    subtitle: "Lower is better (Megabytes)",
    data: [
      {
        name: "Size",
        electron: 95,
        dotnet: 80,
        reactnative: 70,
        flutter: 60,
        tauri: 25,
        dx: 15,
      },
    ],
    keys: ["electron", "dotnet", "reactnative", "flutter", "tauri", "dx"],
    config: {
      electron: { label: "Electron", color: "hsl(var(--chart-1))" },
      dotnet: { label: ".NET MAUI", color: "hsl(var(--chart-2))" },
      reactnative: { label: "React Native", color: "hsl(var(--chart-3))" },
      flutter: { label: "Flutter", color: "hsl(var(--chart-4))" },
      tauri: { label: "Tauri", color: "hsl(var(--chart-5))" },
      dx: { label: "DX Native", color: "hsl(var(--chart-6))" },
    },
    footer: "DX Native ships 3MB binaries leveraging the system webview.",
  },
  {
    type: "pie",
    title: "13. DX Providers: Runtime Implementations",
    subtitle: "Higher is better (Implementations)",
    data: [
      {
        name: "Implementations",
        anthropic: 35,
        openai: 40,
        ollama: 45,
        openrouter: 65,
        litellm: 75,
        dx: 100,
      },
    ],
    keys: ["anthropic", "openai", "ollama", "openrouter", "litellm", "dx"],
    config: {
      anthropic: { label: "Anthropic", color: "hsl(var(--chart-1))" },
      openai: { label: "OpenAI API", color: "hsl(var(--chart-2))" },
      ollama: { label: "Ollama", color: "hsl(var(--chart-3))" },
      openrouter: { label: "OpenRouter", color: "hsl(var(--chart-4))" },
      litellm: { label: "LiteLLM", color: "hsl(var(--chart-5))" },
      dx: { label: "DX Providers", color: "hsl(var(--chart-6))" },
    },
    footer: "API, OAuth, cookie extraction, and public endpoints.",
  },
  {
    type: "area",
    title: "14. DX Py: Range Loop Speedup",
    subtitle: "Higher is better (Multiplier)",
    data: [
      {
        name: "Speedup",
        jython: 20,
        ironpython: 25,
        cpython: 35,
        pypy: 60,
        micropython: 45,
        dx: 95,
      },
    ],
    keys: ["jython", "ironpython", "cpython", "pypy", "micropython", "dx"],
    config: {
      jython: { label: "Jython", color: "hsl(var(--chart-1))" },
      ironpython: { label: "IronPython", color: "hsl(var(--chart-2))" },
      cpython: { label: "CPython", color: "hsl(var(--chart-3))" },
      pypy: { label: "PyPy", color: "hsl(var(--chart-4))" },
      micropython: { label: "MicroPython", color: "hsl(var(--chart-5))" },
      dx: { label: "DX Py", color: "hsl(var(--chart-6))" },
    },
    footer: "7-22x on selected integer range loops with native x86-64.",
  },
  {
    type: "bar",
    title: "15. DX Serializer: Parse Speed",
    subtitle: "Lower is better (Milliseconds)",
    data: [
      {
        name: "Parse Time",
        xml: 120,
        json: 100,
        yaml: 90,
        protobuf: 75,
        messagepack: 65,
        dx: 10,
      },
    ],
    keys: ["xml", "json", "yaml", "protobuf", "messagepack", "dx"],
    config: {
      xml: { label: "XML", color: "hsl(var(--chart-1))" },
      json: { label: "JSON", color: "hsl(var(--chart-2))" },
      yaml: { label: "YAML", color: "hsl(var(--chart-3))" },
      protobuf: { label: "Protobuf", color: "hsl(var(--chart-4))" },
      messagepack: { label: "MessagePack", color: "hsl(var(--chart-5))" },
      dx: { label: "DX Serializer", color: "hsl(var(--chart-6))" },
    },
    footer: "197x faster than JSON parsing.",
  },
  {
    type: "area",
    title: "16. DX Style: Class Lookup Speed",
    subtitle: "Lower is better (Nanoseconds)",
    data: [
      {
        name: "Lookup Time",
        cssmodules: 110,
        styledcomponents: 95,
        sass: 80,
        tailwind: 65,
        unocss: 50,
        dx: 15,
      },
    ],
    keys: [
      "cssmodules",
      "styledcomponents",
      "sass",
      "tailwind",
      "unocss",
      "dx",
    ],
    config: {
      cssmodules: { label: "CSS Modules", color: "hsl(var(--chart-1))" },
      styledcomponents: {
        label: "styled-components",
        color: "hsl(var(--chart-2))",
      },
      sass: { label: "Sass", color: "hsl(var(--chart-3))" },
      tailwind: { label: "Tailwind CSS", color: "hsl(var(--chart-4))" },
      unocss: { label: "Unocss", color: "hsl(var(--chart-5))" },
      dx: { label: "DX Style", color: "hsl(var(--chart-6))" },
    },
    footer: "833x faster class lookups in pure Rust.",
  },
  {
    type: "line",
    title: "17. DX Train: MoE Speedup",
    subtitle: "Higher is better (Multiplier)",
    data: [
      {
        name: "Speedup",
        llamafactory: 35,
        hftrl: 40,
        axolotl: 55,
        qlora: 70,
        unsloth: 80,
        dx: 95,
      },
    ],
    keys: ["llamafactory", "hftrl", "axolotl", "qlora", "unsloth", "dx"],
    config: {
      llamafactory: { label: "LLaMA Factory", color: "hsl(var(--chart-1))" },
      hftrl: { label: "HF TRL", color: "hsl(var(--chart-2))" },
      axolotl: { label: "Axolotl", color: "hsl(var(--chart-3))" },
      qlora: { label: "QLoRA", color: "hsl(var(--chart-4))" },
      unsloth: { label: "Unsloth", color: "hsl(var(--chart-5))" },
      dx: { label: "DX Train", color: "hsl(var(--chart-6))" },
    },
    footer: "12x faster MoE training, 35% less VRAM (Unsloth fork).",
  },
  {
    type: "area",
    title: "18. DX WWW: Throughput",
    subtitle: "Higher is better (RPS)",
    data: [
      {
        name: "Throughput",
        remix: 45,
        nextjs: 50,
        sveltekit: 60,
        solidstart: 65,
        astro: 75,
        dx: 100,
      },
    ],
    keys: ["remix", "nextjs", "sveltekit", "solidstart", "astro", "dx"],
    config: {
      remix: { label: "Remix", color: "hsl(var(--chart-1))" },
      nextjs: { label: "Next.js", color: "hsl(var(--chart-2))" },
      sveltekit: { label: "SvelteKit", color: "hsl(var(--chart-3))" },
      solidstart: { label: "SolidStart", color: "hsl(var(--chart-4))" },
      astro: { label: "Astro", color: "hsl(var(--chart-5))" },
      dx: { label: "DX WWW", color: "hsl(var(--chart-6))" },
    },
    footer: "3.4x more RPS with 1342x smaller payloads than Next.js.",
  },
  {
    type: "bar",
    title: "19. DX Agents: Messaging Channels",
    subtitle: "Higher is better (Channels)",
    data: [
      {
        name: "Channels",
        windsurf: 40,
        aider: 45,
        copilot: 50,
        codex: 60,
        claudecode: 65,
        dx: 100,
      },
    ],
    keys: ["windsurf", "aider", "copilot", "codex", "claudecode", "dx"],
    config: {
      windsurf: { label: "Windsurf", color: "hsl(var(--chart-1))" },
      aider: { label: "Aider", color: "hsl(var(--chart-2))" },
      copilot: { label: "Copilot", color: "hsl(var(--chart-3))" },
      codex: { label: "Codex CLI", color: "hsl(var(--chart-4))" },
      claudecode: { label: "Claude Code", color: "hsl(var(--chart-5))" },
      dx: { label: "DX Agents", color: "hsl(var(--chart-6))" },
    },
    footer: "Telegram, Discord, Slack, Email, and 20+ more.",
  },
  {
    type: "line",
    title: "20. DX Build: Build Speed",
    subtitle: "Lower is better (Milliseconds)",
    data: [
      {
        name: "Build Time",
        turbopack: 110,
        webpack: 95,
        parcel: 80,
        esbuild: 60,
        rolldown: 40,
        dx: 20,
      },
    ],
    keys: ["turbopack", "webpack", "parcel", "esbuild", "rolldown", "dx"],
    config: {
      turbopack: { label: "Turbopack", color: "hsl(var(--chart-1))" },
      webpack: { label: "webpack", color: "hsl(var(--chart-2))" },
      parcel: { label: "Parcel", color: "hsl(var(--chart-3))" },
      esbuild: { label: "esbuild", color: "hsl(var(--chart-4))" },
      rolldown: { label: "Rolldown", color: "hsl(var(--chart-5))" },
      dx: { label: "DX Build", color: "hsl(var(--chart-6))" },
    },
    footer: "30.17% faster than official Rolldown @1.0.3.",
  },
  {
    type: "radar",
    title: "21. DX CLI: Ecosystem Coverage",
    subtitle: "Higher is better (Integrated tools)",
    data: [
      {
        name: "Tools",
        npm: 30,
        cargo: 45,
        make: 35,
        just: 50,
        npx: 55,
        dx: 100,
      },
    ],
    keys: ["npm", "cargo", "make", "just", "npx", "dx"],
    config: {
      npm: { label: "npm scripts", color: "hsl(var(--chart-1))" },
      cargo: { label: "cargo", color: "hsl(var(--chart-2))" },
      make: { label: "make", color: "hsl(var(--chart-3))" },
      just: { label: "just", color: "hsl(var(--chart-4))" },
      npx: { label: "npx", color: "hsl(var(--chart-5))" },
      dx: { label: "DX CLI", color: "hsl(var(--chart-6))" },
    },
    footer: "150+ commands and 80+ MCP tools from one binary.",
  },
  {
    type: "bar",
    title: "22. DX Code: Editor Integration",
    subtitle: "Higher is better (Built-in DX tools)",
    data: [
      {
        name: "Integration",
        vscode: 40,
        cursor: 55,
        zed: 65,
        neovim: 45,
        windsurf: 60,
        dx: 100,
      },
    ],
    keys: ["vscode", "cursor", "zed", "neovim", "windsurf", "dx"],
    config: {
      vscode: { label: "VS Code", color: "hsl(var(--chart-1))" },
      cursor: { label: "Cursor", color: "hsl(var(--chart-2))" },
      zed: { label: "Zed", color: "hsl(var(--chart-3))" },
      neovim: { label: "Neovim", color: "hsl(var(--chart-4))" },
      windsurf: { label: "Windsurf", color: "hsl(var(--chart-5))" },
      dx: { label: "DX Code", color: "hsl(var(--chart-6))" },
    },
    footer:
      "GPU-accelerated editor with 9 web tools and full DX ecosystem built in.",
  },
];

export function ToolChartRenderer({ chart }: { chart: MetricChart }) {
  const sequenceData = chart.keys.map((key) => ({
    competitor: chart.config[key].label,
    value: chart.data[0][key],
    fill: chart.config[key].color,
  }));

  const activeConfig = {
    ...chart.config,
    value: { label: "Value", color: "hsl(var(--chart-6))" },
  };

  if (chart.type === "bar") {
    return (
      <ChartContainer
        config={activeConfig}
        className="h-full w-full min-h-[250px]"
      >
        <BarChart
          data={sequenceData}
          margin={{ top: 20, right: 10, left: 10, bottom: 20 }}
        >
          <CartesianGrid
            vertical={false}
            strokeDasharray="3 3"
            stroke="hsl(var(--border))"
            opacity={0.5}
          />
          <XAxis
            dataKey="competitor"
            tickLine={false}
            axisLine={false}
            tickMargin={12}
            fontSize={12}
            tickFormatter={(v) =>
              v.length > 10 ? v.substring(0, 10) + "..." : v
            }
          />
          <ChartTooltip
            cursor={{ fill: "var(--muted)" }}
            content={<ChartTooltipContent nameKey="competitor" />}
          />
          <Bar
            dataKey="value"
            radius={6}
            isAnimationActive={true}
            animationDuration={1500}
            animationBegin={200}
          >
            {sequenceData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>
    );
  }

  if (chart.type === "area") {
    return (
      <ChartContainer
        config={activeConfig}
        className="h-full w-full min-h-[250px]"
      >
        <AreaChart
          data={sequenceData}
          margin={{ top: 20, right: 10, left: 10, bottom: 20 }}
        >
          <defs>
            <linearGradient
              id={`color-${chart.title.replace(/\s+/g, "")}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor="hsl(var(--chart-6))"
                stopOpacity={0.6}
              />
              <stop
                offset="95%"
                stopColor="hsl(var(--chart-6))"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <CartesianGrid
            vertical={false}
            strokeDasharray="3 3"
            stroke="hsl(var(--border))"
            opacity={0.5}
          />
          <XAxis
            dataKey="competitor"
            tickLine={false}
            axisLine={false}
            tickMargin={12}
            fontSize={12}
            tickFormatter={(v) =>
              v.length > 10 ? v.substring(0, 10) + "..." : v
            }
          />
          <ChartTooltip
            content={<ChartTooltipContent nameKey="competitor" />}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="hsl(var(--chart-6))"
            strokeWidth={3}
            fillOpacity={1}
            fill={`url(#color-${chart.title.replace(/\s+/g, "")})`}
            isAnimationActive={true}
            animationDuration={1500}
            animationBegin={200}
          />
        </AreaChart>
      </ChartContainer>
    );
  }

  if (chart.type === "line") {
    return (
      <ChartContainer
        config={activeConfig}
        className="h-full w-full min-h-[250px]"
      >
        <LineChart
          data={sequenceData}
          margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
        >
          <CartesianGrid
            vertical={false}
            strokeDasharray="3 3"
            stroke="hsl(var(--border))"
            opacity={0.5}
          />
          <XAxis
            dataKey="competitor"
            tickLine={false}
            axisLine={false}
            tickMargin={12}
            fontSize={12}
            tickFormatter={(v) =>
              v.length > 10 ? v.substring(0, 10) + "..." : v
            }
          />
          <ChartTooltip
            content={<ChartTooltipContent nameKey="competitor" />}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="hsl(var(--chart-6))"
            strokeWidth={3}
            isAnimationActive={true}
            animationDuration={1500}
            animationBegin={200}
            dot={(props: any) => {
              const { cx, cy, payload } = props;
              return (
                <circle
                  key={payload.competitor}
                  cx={cx}
                  cy={cy}
                  r={6}
                  fill={payload.fill}
                  stroke="hsl(var(--border))"
                  strokeWidth={2}
                />
              );
            }}
            activeDot={{ r: 8, strokeWidth: 0 }}
          />
        </LineChart>
      </ChartContainer>
    );
  }

  if (chart.type === "pie") {
    return (
      <ChartContainer
        config={activeConfig}
        className="h-full w-full min-h-[250px]"
      >
        <PieChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
          <ChartTooltip
            content={<ChartTooltipContent nameKey="competitor" />}
          />
          <Pie
            data={sequenceData}
            dataKey="value"
            nameKey="competitor"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            stroke="hsl(var(--border))"
            strokeWidth={1}
            paddingAngle={2}
            isAnimationActive={true}
            animationDuration={1500}
            animationBegin={200}
          >
            {sequenceData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
    );
  }

  if (chart.type === "radial") {
    return (
      <ChartContainer
        config={activeConfig}
        className="h-full w-full min-h-[250px]"
      >
        <RadialBarChart
          data={sequenceData}
          innerRadius="30%"
          outerRadius="100%"
          barSize={12}
          startAngle={180}
          endAngle={-180}
          margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
        >
          <ChartTooltip
            cursor={{ fill: "transparent" }}
            content={<ChartTooltipContent nameKey="competitor" />}
          />
          <RadialBar
            dataKey="value"
            background={{ fill: "hsl(var(--border))", opacity: 0.2 }}
            cornerRadius={6}
            isAnimationActive={true}
            animationDuration={1500}
            animationBegin={200}
          />
        </RadialBarChart>
      </ChartContainer>
    );
  }

  if (chart.type === "radar") {
    return (
      <ChartContainer
        config={activeConfig}
        className="h-full w-full min-h-[250px]"
      >
        <RadarChart
          data={sequenceData}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <ChartTooltip
            content={<ChartTooltipContent nameKey="competitor" />}
          />
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis
            dataKey="competitor"
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
          />
          <Radar
            dataKey="value"
            fill="hsl(var(--chart-6))"
            fillOpacity={0.4}
            stroke="hsl(var(--chart-6))"
            strokeWidth={2}
            isAnimationActive={true}
            animationDuration={1500}
            animationBegin={200}
          />
        </RadarChart>
      </ChartContainer>
    );
  }

  return null;
}

export function PerformanceSection() {
  return (
    <section className="bg-background py-16 sm:py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6 mb-20"
        >
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-foreground tracking-tight">
            20 Tools. 0 Compromises.
          </h2>
          <p className="font-sans text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            DX tools are built from scratch in Rust, rigorously benchmarked
            against the market leaders. Every benchmark measured, not estimated.
            Here is the exact breakdown.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
          {charts.map((chart, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group border border-border p-7 rounded-2xl bg-card/40 backdrop-blur-sm flex flex-col hover:border-chart-6/40 hover:bg-card/60 transition-all duration-500 hover:shadow-2xl hover:shadow-chart-6/10"
            >
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-foreground tracking-tight group-hover:text-chart-6 transition-colors duration-300">
                  {chart.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-2 font-medium">
                  {chart.subtitle}
                </p>
              </div>

              <div className="flex-1 flex items-center justify-center w-full min-h-[300px]">
                <ToolChartRenderer chart={chart} />
              </div>

              <div className="mt-6 pt-5 border-t border-border">
                <p className="text-[15px] font-medium text-foreground/80 leading-relaxed">
                  {chart.footer}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
