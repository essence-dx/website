import { ToolDetail } from "@/components/tools/tool-detail";
import { requireTool } from "@/data/tools";
import { toolPageMetadata } from "@/lib/tool-page-metadata";

export const metadata = toolPageMetadata("serializer");

export default function SerializerToolPage() {
  return <ToolDetail tool={requireTool("serializer")} />;
}
