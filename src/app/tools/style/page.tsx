import { ToolDetail } from "@/components/tools/tool-detail";
import { requireTool } from "@/data/tools";
import { toolPageMetadata } from "@/lib/tool-page-metadata";

export const metadata = toolPageMetadata("style");

export default function StyleToolPage() {
  return <ToolDetail tool={requireTool("style")} />;
}
