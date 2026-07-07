import { ToolDetail } from "@/components/tools/tool-detail";
import { requireTool } from "@/data/tools";
import { toolPageMetadata } from "@/lib/tool-page-metadata";

export const metadata = toolPageMetadata("check");

export default function CheckToolPage() {
  return <ToolDetail tool={requireTool("check")} />;
}
