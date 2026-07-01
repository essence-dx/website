import { Insights } from "@/components/insights";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "DX Insights — Toolchain Analytics",
  description:
    "Understand your development workflow at a glance. Get weekly summaries, build analytics, and clear overview of your toolchain operations.",
  path: "/insights",
  og: {
    title: "Insights",
    description: "Understand your toolchain at a glance",
  },
  keywords: [
    "development insights",
    "build analytics",
    "toolchain metrics",
    "workflow analysis",
    "DX metrics",
  ],
});

export default function Page() {
  return <Insights />;
}
