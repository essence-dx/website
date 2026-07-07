import { requireTool } from "@/data/tools";
import { createPageMetadata } from "@/lib/metadata";

export function toolPageMetadata(slug: string) {
  const tool = requireTool(slug);

  return createPageMetadata({
    title: `${tool.name} — ${tool.tagline}`,
    description: tool.description,
    path: `/tools/${slug}`,
    og: {
      title: tool.name,
      description: tool.headlineMetric ?? tool.tagline,
    },
    keywords: [tool.name, "DX", tool.language, "developer tools"],
  });
}
