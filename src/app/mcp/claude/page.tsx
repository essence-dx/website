import { MCPClaude } from "@/components/mcp-claude";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Claude MCP Integration",
  description:
    "Connect Claude to your DX data via Model Context Protocol. Get AI-powered development insights grounded in your real DX toolchain data.",
  path: "/mcp/claude",
  og: {
    title: "Claude + DX",
    description: "Development insights from your real DX data",
  },
  keywords: [
    "Claude MCP",
    "Claude integration",
    "Model Context Protocol",
    "Anthropic Claude",
    "AI development assistant",
  ],
});

export default function Page() {
  return <MCPClaude />;
}
