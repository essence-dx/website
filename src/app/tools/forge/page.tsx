import { ToolDetail } from "@/components/tools/tool-detail";
import { requireTool } from "@/data/tools";
import { toolPageMetadata } from "@/lib/tool-page-metadata";

export const metadata = toolPageMetadata("forge");

export default function ForgeToolPage() {
  return <ToolDetail tool={requireTool("forge")} />;
}
