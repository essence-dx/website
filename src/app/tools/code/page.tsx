import { ToolDetail } from "@/components/tools/tool-detail";
import { requireTool } from "@/data/tools";
import { toolPageMetadata } from "@/lib/tool-page-metadata";

export const metadata = toolPageMetadata("code");

export default function CodeToolPage() {
  return <ToolDetail tool={requireTool("code")} />;
}
