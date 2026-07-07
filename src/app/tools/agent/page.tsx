import { ToolDetail } from "@/components/tools/tool-detail";
import { requireTool } from "@/data/tools";
import { toolPageMetadata } from "@/lib/tool-page-metadata";

export const metadata = toolPageMetadata("agent");

export default function AgentToolPage() {
  return <ToolDetail tool={requireTool("agent")} />;
}
