import { ToolDetail } from "@/components/tools/tool-detail";
import { requireTool } from "@/data/tools";
import { toolPageMetadata } from "@/lib/tool-page-metadata";

export const metadata = toolPageMetadata("i18n");

export default function I18nToolPage() {
  return <ToolDetail tool={requireTool("i18n")} />;
}
