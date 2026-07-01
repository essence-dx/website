import Link from "next/link";
import { DocsHomeHero } from "@/components/docs/docs-home-hero";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Documentation",
  description:
    "Learn how to use DX tools. Get answers about code, build, web, agents, CLI, media, and more.",
  path: "/docs",
  og: {
    title: "Documentation",
    description: "Everything you need to know about DX",
  },
});

const popularGuides = [
  {
    title: "Introduction",
    href: "/docs/introduction",
    description: "What is the DX ecosystem?",
  },
  {
    title: "Quick Start",
    href: "/docs/quick-start",
    description: "Set up DX in 5 minutes",
  },
  {
    title: "DX Code",
    href: "/docs/dx-code",
    description: "GPU-accelerated code editor",
  },
  {
    title: "DX CLI",
    href: "/docs/dx-cli",
    description: "Central command-line tool",
  },
  {
    title: "DX Agent",
    href: "/docs/dx-agent",
    description: "AI agent runtime",
  },
  {
    title: "DX Web",
    href: "/docs/dx-web",
    description: "Rust web framework with TSX",
  },
];

const sections = [
  {
    title: "Getting Started",
    links: [
      { title: "Introduction", href: "/docs/introduction" },
      { title: "Quick Start", href: "/docs/quick-start" },
      { title: "Installation", href: "/docs/installation" },
      { title: "Troubleshooting", href: "/docs/troubleshooting" },
    ],
  },
  {
    title: "DX Code",
    links: [
      { title: "Overview", href: "/docs/dx-code" },
      { title: "Configuration", href: "/docs/dx-code-configuration" },
      { title: "Extensions", href: "/docs/dx-code-extensions" },
    ],
  },
  {
    title: "DX CLI",
    links: [
      { title: "Overview", href: "/docs/dx-cli" },
      { title: "Commands", href: "/docs/dx-cli-commands" },
    ],
  },
  {
    title: "DX Web",
    links: [
      { title: "Framework Overview", href: "/docs/dx-web" },
      { title: "Routing", href: "/docs/dx-web-routing" },
    ],
  },
  {
    title: "DX Agent",
    links: [
      { title: "Overview", href: "/docs/dx-agent" },
      { title: "LLM Providers", href: "/docs/dx-agent-providers" },
      { title: "Channels", href: "/docs/dx-agent-channels" },
    ],
  },
  {
    title: "DX Flow",
    links: [
      { title: "Workflow Automation", href: "/docs/dx-flow" },
    ],
  },
  {
    title: "DX Forge",
    links: [
      { title: "Version Control", href: "/docs/dx-forge" },
    ],
  },
  {
    title: "DX Style",
    links: [
      { title: "CSS Engine", href: "/docs/dx-style" },
    ],
  },
  {
    title: "DX Media",
    links: [
      { title: "Asset Engine", href: "/docs/dx-media" },
    ],
  },
  {
    title: "DX Tools",
    links: [
      { title: "Metasearch", href: "/docs/dx-metasearch" },
      { title: "Icon Search", href: "/docs/dx-icon" },
      { title: "DX Check", href: "/docs/dx-check" },
      { title: "Serializer", href: "/docs/dx-serializer" },
      { title: "DCP", href: "/docs/dx-dcp" },
      { title: "Driven", href: "/docs/dx-driven" },
      { title: "i18n", href: "/docs/dx-i18n" },
    ],
  },
  {
    title: "Providers",
    links: [
      { title: "AI Provider Catalog", href: "/docs/providers" },
    ],
  },
  {
    title: "Extensions",
    links: [
      { title: "Host Adapters", href: "/docs/extensions" },
    ],
  },
  {
    title: "Build & Runtime",
    links: [
      { title: "DX Build", href: "/docs/dx-build" },
      { title: "DX Native", href: "/docs/dx-native" },
      { title: "DX Python", href: "/docs/dx-python" },
    ],
  },
];

export default function DocsPage() {
  return (
    <div className="min-h-[calc(100vh-200px)] pb-32 md:pb-24">
      {/* Hero with centered chat */}
      <DocsHomeHero />

      {/* Popular guides */}
      <div className="max-w-4xl mx-auto px-4 mb-16">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6">
          Popular guides
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
          {popularGuides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="group bg-background p-5 hover:bg-secondary/30 transition-colors"
            >
              <span className="block text-sm font-medium text-foreground mb-1">
                {guide.title}
              </span>
              <span className="block text-sm text-muted-foreground">
                {guide.description}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* All sections */}
      <div className="max-w-4xl mx-auto px-4">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6">
          Browse by topic
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-medium text-foreground mb-3">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
