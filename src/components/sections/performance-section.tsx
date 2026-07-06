"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";

type MetricChart = {
  title: string;
  subtitle: string;
  data: any[];
  config: Record<string, { label: string; color: string }>;
  keys: string[];
  footer: string;
};

const charts: MetricChart[] = [
  {
    title: "DX Flow: Supported AI Runtimes",
    subtitle: "Higher is better (Supported Runtimes)",
    data: [{ name: "Runtimes", ollama: 1, lmstudio: 1, localai: 1, llamacpp: 1, dx: 6 }],
    keys: ["ollama", "lmstudio", "localai", "llamacpp", "dx"],
    config: {
      ollama: { label: "Ollama", color: "hsl(var(--chart-1))" },
      lmstudio: { label: "LM Studio", color: "hsl(var(--chart-2))" },
      localai: { label: "LocalAI", color: "hsl(var(--chart-3))" },
      llamacpp: { label: "llama.cpp", color: "hsl(var(--chart-4))" },
      dx: { label: "DX Flow", color: "hsl(var(--chart-5))" }
    },
    footer: "DX Flow supports llama-cpp-2, mistral.rs, candle, ONNX, and more natively."
  },
  {
    title: "DX Forge: Push Backends",
    subtitle: "Higher is better (Simultaneous mirrors)",
    data: [{ name: "Backends", npm: 1, pypi: 1, dockerhub: 1, cratesio: 1, dx: 11 }],
    keys: ["npm", "pypi", "dockerhub", "cratesio", "dx"],
    config: {
      npm: { label: "npm", color: "hsl(var(--chart-1))" },
      pypi: { label: "PyPI", color: "hsl(var(--chart-2))" },
      dockerhub: { label: "Docker Hub", color: "hsl(var(--chart-3))" },
      cratesio: { label: "crates.io", color: "hsl(var(--chart-4))" },
      dx: { label: "DX Forge", color: "hsl(var(--chart-5))" }
    },
    footer: "Push to 11 package registries simultaneously over QUIC."
  },
  {
    title: "DX Icon: Icon Catalog Size",
    subtitle: "Higher is better (Available Icons)",
    data: [{ name: "Icons", phosphor: 7000, nucleo: 150000, iconify: 200000, icones: 200000, dx: 305612 }],
    keys: ["phosphor", "nucleo", "iconify", "icones", "dx"],
    config: {
      phosphor: { label: "Phosphor", color: "hsl(var(--chart-1))" },
      nucleo: { label: "Nucleo", color: "hsl(var(--chart-2))" },
      iconify: { label: "Iconify", color: "hsl(var(--chart-3))" },
      icones: { label: "Icones", color: "hsl(var(--chart-4))" },
      dx: { label: "DX Icon", color: "hsl(var(--chart-5))" }
    },
    footer: "Over 300,000 icons instantly searchable offline in <2ms."
  },
  {
    title: "DX Native: Application Binary Size",
    subtitle: "Lower is better (Megabytes)",
    data: [{ name: "Size", electron: 150, dotnet: 50, reactnative: 40, flutter: 20, dx: 3 }],
    keys: ["electron", "dotnet", "reactnative", "flutter", "dx"],
    config: {
      electron: { label: "Electron", color: "hsl(var(--chart-1))" },
      dotnet: { label: ".NET MAUI", color: "hsl(var(--chart-2))" },
      reactnative: { label: "React Native", color: "hsl(var(--chart-3))" },
      flutter: { label: "Flutter", color: "hsl(var(--chart-4))" },
      dx: { label: "DX Native", color: "hsl(var(--chart-5))" }
    },
    footer: "DX Native ships 3MB binaries leveraging the system webview."
  }
];

export function PerformanceSection() {
  return (
    <section className="bg-background py-12 sm:py-16 lg:py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="text-center space-y-4 mb-14">
          <h2 className="font-serif text-3xl sm:text-4xl text-foreground">
            Measured against the best.
          </h2>
          <p className="font-sans text-base text-muted-foreground leading-normal max-w-2xl mx-auto">
            DX tools are built from scratch in Rust, rigorously benchmarked against the top 4 market leaders in every category.
            Here is the exact breakdown.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {charts.map((chart, index) => (
            <div key={index} className="border border-border p-6 rounded-xl bg-card/30 flex flex-col hover:border-muted-foreground/30 transition-colors">
              <div className="mb-6">
                <h3 className="text-lg font-medium text-foreground">{chart.title}</h3>
                <p className="text-sm text-muted-foreground">{chart.subtitle}</p>
              </div>
              <div className="flex-1 min-h-[300px]">
                <ChartContainer config={chart.config} className="h-[300px] w-full">
                  <BarChart data={chart.data} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={10} hide />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    {chart.keys.map((key) => (
                      <Bar key={key} dataKey={key} fill={`var(--color-${key})`} radius={4} />
                    ))}
                  </BarChart>
                </ChartContainer>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm font-medium">{chart.footer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
