import { ToolDetail } from "@/components/tools/tool-detail";
import { requireTool } from "@/data/tools";
import { toolPageMetadata } from "@/lib/tool-page-metadata";

export const metadata = toolPageMetadata("providers");

export default function ProvidersToolPage() {
  return <ToolDetail tool={requireTool("providers")} />;
}
