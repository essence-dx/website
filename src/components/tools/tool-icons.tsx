import {
  Bot,
  Box,
  Braces,
  CheckCircle2,
  Code2,
  Cpu,
  FileCode2,
  GitBranch,
  Globe,
  Image,
  Languages,
  Layers,
  type LucideIcon,
  Package,
  Plug,
  Search,
  Sparkles,
  Terminal,
  Workflow,
  Zap,
} from "lucide-react";
import type { DxTool } from "@/data/tools";

const iconMap: Record<string, LucideIcon> = {
  cli: Terminal,
  code: Code2,
  www: Globe,
  build: Box,
  js: FileCode2,
  py: Braces,
  agent: Bot,
  flow: Workflow,
  native: Cpu,
  forge: GitBranch,
  check: CheckCircle2,
  style: Layers,
  serializer: Package,
  icon: Sparkles,
  media: Image,
  metasearch: Search,
  i18n: Languages,
  providers: Plug,
  dcp: Zap,
  driven: Workflow,
};

export function ToolIcon({
  tool,
  className,
}: {
  tool: DxTool;
  className?: string;
}) {
  const Icon = iconMap[tool.slug] ?? Terminal;
  return <Icon className={className} style={{ color: tool.color }} />;
}
