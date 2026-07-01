import { MCPCursor } from "@/components/mcp-cursor";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Cursor MCP Integration",
  description:
    "Connect Cursor to your DX data via MCP. Track builds, query agents, and access project data directly from your AI-powered code editor.",
  path: "/mcp/cursor",
  og: {
    title: "Cursor + DX",
    description: "Track time and query finances from your editor",
  },
  keywords: [
    "Cursor MCP",
    "Cursor integration",
    "Model Context Protocol",
    "AI coding assistant",
    "time tracking Cursor",
  ],
});

export default function Page() {
  return <MCPCursor />;
}
