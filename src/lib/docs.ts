import fs from "node:fs";
import path from "node:path";

type DocMetadata = {
  title: string;
  description: string;
  section?: string;
  order?: number;
};

type DocSection = {
  title: string;
  slug: string;
  docs: Array<{
    slug: string;
    title: string;
    description: string;
    order: number;
  }>;
};

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  const frontMatterBlock = match?.[1];
  const content = fileContent.replace(frontmatterRegex, "").trim();
  const frontMatterLines = frontMatterBlock?.trim().split("\n") || [];
  const metadata: Partial<DocMetadata> = {};

  for (const line of frontMatterLines) {
    const [key, ...valueArr] = line.split(": ");
    if (key) {
      let value = valueArr.join(": ").trim();
      value = value.replace(/^['"](.*)['"]$/, "$1");
      const trimmedKey = key.trim();
      if (trimmedKey === "order") {
        metadata.order = Number.parseInt(value, 10);
      } else if (
        trimmedKey === "title" ||
        trimmedKey === "description" ||
        trimmedKey === "section"
      ) {
        metadata[trimmedKey] = value;
      }
    }
  }

  return { metadata: metadata as DocMetadata, content };
}

function getMDXFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
}

export function getDocsData() {
  const docsDir = path.join(process.cwd(), "src", "app", "docs", "content");

  if (!fs.existsSync(docsDir)) {
    return [];
  }

  const mdxFiles = getMDXFiles(docsDir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(docsDir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getDocBySlug(slug: string) {
  const docsDir = path.join(process.cwd(), "src", "app", "docs", "content");
  const filePath = path.join(docsDir, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const { metadata, content } = readMDXFile(filePath);
  return {
    metadata,
    slug,
    content,
  };
}

export function getAllDocSlugs(): string[] {
  const docsDir = path.join(process.cwd(), "src", "app", "docs", "content");

  if (!fs.existsSync(docsDir)) {
    return [];
  }

  const mdxFiles = getMDXFiles(docsDir);
  return mdxFiles.map((file) => path.basename(file, path.extname(file)));
}

// Navigation structure for the sidebar
export const docsNavigation: DocSection[] = [
  {
    title: "Getting Started",
    slug: "getting-started",
    docs: [
      {
        slug: "introduction",
        title: "Introduction",
        description: "What is the DX ecosystem?",
        order: 1,
      },
      {
        slug: "quick-start",
        title: "Quick Start",
        description: "Set up DX in 5 minutes",
        order: 2,
      },
      {
        slug: "installation",
        title: "Installation",
        description: "Download & install DX",
        order: 3,
      },
      {
        slug: "troubleshooting",
        title: "Troubleshooting",
        description: "Common issues & FAQ",
        order: 4,
      },
    ],
  },
  {
    title: "DX Code",
    slug: "dx-code",
    docs: [
      {
        slug: "dx-code",
        title: "Overview",
        description: "GPU-accelerated code editor",
        order: 1,
      },
      {
        slug: "dx-code-configuration",
        title: "Configuration",
        description: "Customize your editor",
        order: 2,
      },
      {
        slug: "dx-code-extensions",
        title: "Extensions",
        description: "Extend DX Code",
        order: 3,
      },
    ],
  },
  {
    title: "DX CLI",
    slug: "dx-cli",
    docs: [
      {
        slug: "dx-cli",
        title: "Overview",
        description: "Central command-line tool",
        order: 1,
      },
      {
        slug: "dx-cli-commands",
        title: "Commands",
        description: "Complete reference",
        order: 2,
      },
    ],
  },
  {
    title: "DX Web",
    slug: "dx-web",
    docs: [
      {
        slug: "dx-web",
        title: "Framework Overview",
        description: "Rust web framework with TSX",
        order: 1,
      },
      {
        slug: "dx-web-routing",
        title: "Routing",
        description: "File-based routing system",
        order: 2,
      },
    ],
  },
  {
    title: "DX Agent",
    slug: "dx-agent",
    docs: [
      {
        slug: "dx-agent",
        title: "Overview",
        description: "AI agent runtime",
        order: 1,
      },
      {
        slug: "dx-agent-providers",
        title: "LLM Providers",
        description: "Connect AI models",
        order: 2,
      },
      {
        slug: "dx-agent-channels",
        title: "Channels",
        description: "Messaging integrations",
        order: 3,
      },
    ],
  },
  {
    title: "DX Flow",
    slug: "dx-flow",
    docs: [
      {
        slug: "dx-flow",
        title: "Workflow Automation",
        description: "Local-first AI workflows",
        order: 1,
      },
    ],
  },
  {
    title: "DX Forge",
    slug: "dx-forge",
    docs: [
      {
        slug: "dx-forge",
        title: "Version Control",
        description: "CAS build system & VCS",
        order: 1,
      },
    ],
  },
  {
    title: "DX Style",
    slug: "dx-style",
    docs: [
      {
        slug: "dx-style",
        title: "CSS Engine",
        description: "Rust-native CSS framework",
        order: 1,
      },
    ],
  },
  {
    title: "DX Media",
    slug: "dx-media",
    docs: [
      {
        slug: "dx-media",
        title: "Asset Engine",
        description: "Universal media acquisition",
        order: 1,
      },
    ],
  },
  {
    title: "DX Tools",
    slug: "dx-tools",
    docs: [
      {
        slug: "dx-metasearch",
        title: "Metasearch",
        description: "Privacy-respecting search",
        order: 1,
      },
      {
        slug: "dx-icon",
        title: "Icon Search",
        description: "Fastest icon search engine",
        order: 2,
      },
      {
        slug: "dx-check",
        title: "DX Check",
        description: "Validation & scoring",
        order: 3,
      },
      {
        slug: "dx-serializer",
        title: "Serializer",
        description: "Token-optimized serialization",
        order: 4,
      },
      {
        slug: "dx-dcp",
        title: "DCP",
        description: "Development Context Protocol",
        order: 5,
      },
      {
        slug: "dx-driven",
        title: "Driven",
        description: "Multi-editor AI rules",
        order: 6,
      },
      {
        slug: "dx-i18n",
        title: "i18n",
        description: "Translation & localization",
        order: 7,
      },
    ],
  },
  {
    title: "Providers",
    slug: "providers",
    docs: [
      {
        slug: "providers",
        title: "AI Provider Catalog",
        description: "184 providers, 6245 models",
        order: 1,
      },
    ],
  },
  {
    title: "Extensions",
    slug: "extensions",
    docs: [
      {
        slug: "extensions",
        title: "Host Adapters",
        description: "VS Code, Zed, Figma & more",
        order: 1,
      },
    ],
  },
  {
    title: "Build & Runtime",
    slug: "build-runtime",
    docs: [
      {
        slug: "dx-build",
        title: "DX Build",
        description: "Rolldown-based bundler",
        order: 1,
      },
      {
        slug: "dx-native",
        title: "DX Native",
        description: "Tauri desktop shell",
        order: 2,
      },
      {
        slug: "dx-python",
        title: "DX Python",
        description: "Python acceleration hub",
        order: 3,
      },
    ],
  },
];

export function getDocNavigation() {
  return docsNavigation;
}
