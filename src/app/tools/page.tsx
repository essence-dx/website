import { ToolsLanding } from "@/components/tools/tools-landing";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "DX Tools — The Complete Ecosystem",
  description:
    "Explore all DX tools: CLI, Code, Web, Build, Agent, Style, Serializer, Icon, Media, and more. Performance-first Rust tools unified in one platform.",
  path: "/tools",
  og: {
    title: "DX Tools",
    description: "20+ performance-first tools. One platform.",
  },
  keywords: [
    "DX tools",
    "developer tools",
    "Rust tools",
    "DX ecosystem",
    "DX CLI",
    "performance",
  ],
});

export default function ToolsPage() {
  return <ToolsLanding />;
}
