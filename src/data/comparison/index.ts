export interface CompetitorEntry {
  name: string;
  dxWins: boolean;
}

export interface ComparisonRow {
  area: string;
  dx: string;
  competitors: CompetitorEntry[];
}

export interface ComparisonGroup {
  id: string;
  group: string;
  items: ComparisonRow[];
}

export const groups: ComparisonGroup[] = [
  {
    id: "foundation",
    group: "Foundation",
    items: [
      {
        area: "Project Scaffolding",
        dx: "dx new",
        competitors: [
          { name: "create-next-app", dxWins: true },
          { name: "create-vite", dxWins: true },
          { name: "ng new", dxWins: true },
          { name: "create-react-app", dxWins: true },
          { name: "vue create", dxWins: true },
        ],
      },
      {
        area: "Monorepo Setup",
        dx: "dx new --monorepo",
        competitors: [
          { name: "Turborepo init", dxWins: true },
          { name: "Nx workspace", dxWins: true },
          { name: "Lerna init", dxWins: true },
          { name: "Moonrepo", dxWins: true },
          { name: "pnpm workspace", dxWins: true },
        ],
      },
      {
        area: "Template System",
        dx: "dx new --template",
        competitors: [
          { name: "degit / tiged", dxWins: false },
          { name: "yeoman", dxWins: false },
          { name: "hygen", dxWins: false },
          { name: "plop", dxWins: false },
        ],
      },
      {
        area: "Ecosystem Manager",
        dx: "dx ecosystem",
        competitors: [
          { name: "rustup", dxWins: true },
          { name: "nvm", dxWins: true },
          { name: "fnm", dxWins: true },
          { name: "asdf", dxWins: true },
          { name: "sdkman", dxWins: true },
        ],
      },
    ],
  },
  {
    id: "dev-server",
    group: "Dev Server",
    items: [
      {
        area: "Development Server",
        dx: "dx dev",
        competitors: [
          { name: "vite dev", dxWins: true },
          { name: "next dev", dxWins: true },
          { name: "webpack-dev-server", dxWins: true },
          { name: "turbo dev", dxWins: true },
          { name: "nodemon", dxWins: true },
        ],
      },
      {
        area: "Hot Module Replacement",
        dx: "dx dev HMR",
        competitors: [
          { name: "Vite HMR", dxWins: false },
          { name: "Webpack HMR", dxWins: false },
          { name: "Turbopack HMR", dxWins: false },
          { name: "Parcel HMR", dxWins: false },
          { name: "Rolldown HMR", dxWins: false },
        ],
      },
      {
        area: "Reverse Proxy",
        dx: "dx dev --proxy",
        competitors: [
          { name: "vite proxy", dxWins: true },
          { name: "webpack proxy", dxWins: true },
          { name: "http-proxy", dxWins: true },
          { name: "Caddy", dxWins: true },
          { name: "nginx proxy", dxWins: true },
        ],
      },
      {
        area: "Static File Serving",
        dx: "dx www --static",
        competitors: [
          { name: "nginx static", dxWins: true },
          { name: "caddy file-server", dxWins: true },
          { name: "serve", dxWins: true },
          { name: "http-server", dxWins: true },
        ],
      },
    ],
  },
  {
    id: "build",
    group: "Build & Compile",
    items: [
      {
        area: "Bundling",
        dx: "dx build",
        competitors: [
          { name: "vite (Rolldown)", dxWins: true },
          { name: "turbopack", dxWins: true },
          { name: "esbuild", dxWins: true },
          { name: "webpack", dxWins: true },
          { name: "parcel", dxWins: true },
        ],
      },
      {
        area: "Tree Shaking",
        dx: "dx build (auto)",
        competitors: [
          { name: "Rolldown", dxWins: false },
          { name: "esbuild", dxWins: false },
          { name: "webpack", dxWins: false },
          { name: "Rollup", dxWins: false },
          { name: "SWC", dxWins: false },
        ],
      },
      {
        area: "Code Splitting",
        dx: "dx build --split",
        competitors: [
          { name: "webpack splitChunks", dxWins: true },
          { name: "Rollup", dxWins: true },
          { name: "esbuild", dxWins: true },
          { name: "parcel", dxWins: true },
          { name: "Rolldown", dxWins: true },
        ],
      },
      {
        area: "Bundle Analysis",
        dx: "dx build lighthouse",
        competitors: [
          { name: "webpack-bundle-analyzer", dxWins: true },
          { name: "vite analyze", dxWins: true },
          { name: "source-map-explorer", dxWins: true },
          { name: "bundlephobia", dxWins: true },
          { name: "size-limit", dxWins: true },
        ],
      },
    ],
  },
  {
    id: "typescript",
    group: "TypeScript",
    items: [
      {
        area: "TS/TSX Runner",
        dx: "dx run",
        competitors: [
          { name: "tsx", dxWins: true },
          { name: "ts-node", dxWins: true },
          { name: "bun run", dxWins: true },
          { name: "deno run", dxWins: true },
          { name: "swc-node", dxWins: true },
        ],
      },
      {
        area: "Watch Mode",
        dx: "dx run --watch",
        competitors: [
          { name: "tsx watch", dxWins: true },
          { name: "ts-node-dev", dxWins: true },
          { name: "nodemon + ts", dxWins: true },
          { name: "bun --watch", dxWins: true },
          { name: "deno watch", dxWins: true },
        ],
      },
      {
        area: "Type Check on Run",
        dx: "dx run --check",
        competitors: [
          { name: "tsc --noEmit", dxWins: true },
          { name: "tsx --check", dxWins: true },
          { name: "bun run --check", dxWins: true },
          { name: "deno check", dxWins: true },
        ],
      },
    ],
  },
  {
    id: "runtime",
    group: "JavaScript Runtime",
    items: [
      {
        area: "ESM/CJS Support",
        dx: "dx js",
        competitors: [
          { name: "Node.js", dxWins: true },
          { name: "Bun", dxWins: true },
          { name: "Deno", dxWins: true },
          { name: "QuickJS", dxWins: true },
          { name: "Hermes", dxWins: true },
        ],
      },
      {
        area: "Package Scripts",
        dx: "dx js <script>",
        competitors: [
          { name: "npm run", dxWins: true },
          { name: "pnpm run", dxWins: true },
          { name: "yarn run", dxWins: true },
          { name: "bun run", dxWins: true },
          { name: "deno task", dxWins: true },
        ],
      },
      {
        area: "Workspace Scripts",
        dx: "dx js workspace",
        competitors: [
          { name: "pnpm -r", dxWins: true },
          { name: "npm workspaces", dxWins: true },
          { name: "yarn workspaces", dxWins: true },
          { name: "lerna run", dxWins: true },
          { name: "turbo run", dxWins: true },
        ],
      },
    ],
  },
  {
    id: "python",
    group: "Python",
    items: [
      {
        area: "Package Install",
        dx: "dx py add",
        competitors: [
          { name: "pip install", dxWins: true },
          { name: "poetry add", dxWins: true },
          { name: "conda install", dxWins: true },
          { name: "uv add", dxWins: true },
          { name: "rye add", dxWins: true },
        ],
      },
      {
        area: "Virtual Environment",
        dx: "dx py venv",
        competitors: [
          { name: "python -m venv", dxWins: true },
          { name: "poetry env", dxWins: true },
          { name: "conda env", dxWins: true },
          { name: "virtualenv", dxWins: true },
          { name: "uv venv", dxWins: true },
        ],
      },
      {
        area: "Package Build",
        dx: "dx py build",
        competitors: [
          { name: "python -m build", dxWins: false },
          { name: "poetry build", dxWins: false },
          { name: "flit build", dxWins: false },
          { name: "pdm build", dxWins: false },
          { name: "maturin build", dxWins: false },
        ],
      },
    ],
  },
  {
    id: "build-graph",
    group: "Build Graph",
    items: [
      {
        area: "Task Orchestration",
        dx: "dx graph",
        competitors: [
          { name: "Turborepo", dxWins: true },
          { name: "Nx", dxWins: true },
          { name: "Bazel", dxWins: true },
          { name: "Lerna", dxWins: true },
          { name: "Moonrepo", dxWins: true },
        ],
      },
      {
        area: "Dependency Visualization",
        dx: "dx graph --viz",
        competitors: [
          { name: "turbo graph", dxWins: true },
          { name: "nx graph", dxWins: true },
          { name: "bazel query", dxWins: true },
          { name: "lerna graph", dxWins: true },
          { name: "moon graph", dxWins: true },
        ],
      },
      {
        area: "Remote Caching",
        dx: "dx graph --cache",
        competitors: [
          { name: "turborepo cache", dxWins: false },
          { name: "nx cloud", dxWins: false },
          { name: "bazel remote", dxWins: false },
          { name: "moon cache", dxWins: false },
          { name: "sccache", dxWins: false },
        ],
      },
    ],
  },
  {
    id: "icons",
    group: "Icons",
    items: [
      {
        area: "Icon Search",
        dx: "dx icon search",
        competitors: [
          { name: "Iconify", dxWins: true },
          { name: "Lucide", dxWins: true },
          { name: "Material Icons", dxWins: true },
          { name: "Phosphor", dxWins: true },
          { name: "Heroicons", dxWins: true },
        ],
      },
      {
        area: "Icon Export",
        dx: "dx icon export",
        competitors: [
          { name: "Iconify API", dxWins: true },
          { name: "SVGR", dxWins: true },
          { name: "svgo", dxWins: true },
          { name: "npm packages", dxWins: true },
          { name: "unplugin-icons", dxWins: true },
        ],
      },
      {
        area: "Custom Pack Index",
        dx: "dx icon build-index",
        competitors: [
          { name: "Iconify collections", dxWins: true },
          { name: "simple-icons", dxWins: true },
          { name: "svgl", dxWins: true },
          { name: "icomoon", dxWins: true },
          { name: "fontello", dxWins: true },
        ],
      },
      {
        area: "Total Packs",
        dx: "219 packs",
        competitors: [
          { name: "Iconify (200k+)", dxWins: false },
          { name: "Lucide (~1.5k)", dxWins: true },
          { name: "Material (10k+)", dxWins: false },
          { name: "Phosphor (~1k)", dxWins: true },
          { name: "Heroicons (~500)", dxWins: true },
        ],
      },
    ],
  },
  {
    id: "packages",
    group: "Package Management",
    items: [
      {
        area: "Add Packages",
        dx: "dx add",
        competitors: [
          { name: "npm install", dxWins: true },
          { name: "pnpm add", dxWins: true },
          { name: "yarn add", dxWins: true },
          { name: "bun add", dxWins: true },
          { name: "deno add", dxWins: true },
        ],
      },
      {
        area: "Remove Packages",
        dx: "dx add --remove",
        competitors: [
          { name: "npm uninstall", dxWins: true },
          { name: "pnpm remove", dxWins: true },
          { name: "yarn remove", dxWins: true },
          { name: "bun remove", dxWins: true },
          { name: "deno uninstall", dxWins: true },
        ],
      },
      {
        area: "Update Packages",
        dx: "dx update",
        competitors: [
          { name: "npm update", dxWins: true },
          { name: "pnpm update", dxWins: true },
          { name: "yarn upgrade", dxWins: true },
          { name: "bun update", dxWins: true },
          { name: "deno outdated", dxWins: true },
        ],
      },
    ],
  },
  {
    id: "health",
    group: "Project Health",
    items: [
      {
        area: "Linting",
        dx: "dx check",
        competitors: [
          { name: "ESLint", dxWins: true },
          { name: "Biome", dxWins: true },
          { name: "Oxlint", dxWins: true },
          { name: "StandardJS", dxWins: true },
          { name: "JSHint", dxWins: true },
        ],
      },
      {
        area: "Formatting",
        dx: "dx check --fix",
        competitors: [
          { name: "Prettier", dxWins: true },
          { name: "Biome format", dxWins: true },
          { name: "dprint", dxWins: true },
          { name: "rustfmt", dxWins: true },
          { name: "gofmt", dxWins: true },
        ],
      },
      {
        area: "Type Checking",
        dx: "dx check --types",
        competitors: [
          { name: "tsc --noEmit", dxWins: true },
          { name: "Flow", dxWins: true },
          { name: "Pyright", dxWins: true },
          { name: "mypy", dxWins: true },
        ],
      },
    ],
  },
  {
    id: "styling",
    group: "Styling",
    items: [
      {
        area: "Utility CSS",
        dx: "dx style",
        competitors: [
          { name: "Tailwind CSS", dxWins: true },
          { name: "UnoCSS", dxWins: true },
          { name: "Windicss", dxWins: true },
          { name: "Open Props", dxWins: true },
          { name: "Panda CSS", dxWins: true },
        ],
      },
      {
        area: "CSS-in-JS",
        dx: "dx style --runtime",
        competitors: [
          { name: "styled-components", dxWins: false },
          { name: "Emotion", dxWins: false },
          { name: "Linaria", dxWins: false },
          { name: "Vanilla Extract", dxWins: false },
          { name: "Stitches", dxWins: false },
        ],
      },
      {
        area: "Preprocessing",
        dx: "dx style --preprocess",
        competitors: [
          { name: "Sass/SCSS", dxWins: true },
          { name: "PostCSS", dxWins: true },
          { name: "Less", dxWins: true },
          { name: "Stylus", dxWins: true },
          { name: "Lightning CSS", dxWins: true },
        ],
      },
    ],
  },
  {
    id: "codegen",
    group: "Code Generation",
    items: [
      {
        area: "Scaffold Component",
        dx: "dx forge",
        competitors: [
          { name: "Nx generate", dxWins: true },
          { name: "Angular CLI", dxWins: true },
          { name: "Hygen", dxWins: true },
          { name: "Plop", dxWins: true },
          { name: "Yeoman", dxWins: true },
        ],
      },
      {
        area: "Package Scaffolding",
        dx: "dx forge package",
        competitors: [
          { name: "nx g lib", dxWins: true },
          { name: "ng g library", dxWins: true },
          { name: "hygen gen", dxWins: true },
          { name: "plop gen", dxWins: true },
        ],
      },
      {
        area: "Custom Templates",
        dx: "dx forge --template",
        competitors: [
          { name: "hygen template", dxWins: false },
          { name: "plopfile", dxWins: false },
          { name: "yeoman", dxWins: false },
          { name: "nx gen", dxWins: false },
          { name: "copier", dxWins: false },
        ],
      },
    ],
  },
  {
    id: "deploy",
    group: "Deployment",
    items: [
      {
        area: "Serverless Deploy",
        dx: "dx deploy",
        competitors: [
          { name: "Vercel", dxWins: true },
          { name: "Netlify", dxWins: true },
          { name: "AWS Amplify", dxWins: true },
          { name: "Cloudflare Pages", dxWins: true },
          { name: "Railway", dxWins: true },
        ],
      },
      {
        area: "Container Deploy",
        dx: "dx deploy --container",
        competitors: [
          { name: "AWS ECS", dxWins: true },
          { name: "Google Cloud Run", dxWins: true },
          { name: "Fly.io", dxWins: true },
          { name: "Railway", dxWins: true },
        ],
      },
      {
        area: "Static Hosting",
        dx: "dx deploy --static",
        competitors: [
          { name: "Vercel", dxWins: true },
          { name: "Netlify", dxWins: true },
          { name: "Cloudflare Pages", dxWins: true },
          { name: "GitHub Pages", dxWins: true },
          { name: "Surge", dxWins: true },
        ],
      },
      {
        area: "Receipt Handoff",
        dx: "dx deploy --receipt",
        competitors: [
          { name: "Vercel --confirm", dxWins: true },
          { name: "Netlify --json", dxWins: true },
          { name: "AWS CodeDeploy", dxWins: true },
          { name: "Octopus Deploy", dxWins: true },
        ],
      },
    ],
  },
  {
    id: "serializer",
    group: "Serialization",
    items: [
      {
        area: "Schema Validation",
        dx: "dx serializer",
        competitors: [
          { name: "Zod", dxWins: true },
          { name: "Ajv", dxWins: true },
          { name: "Joi", dxWins: true },
          { name: "Valibot", dxWins: true },
          { name: "ArkType", dxWins: true },
        ],
      },
      {
        area: "Format Conversion",
        dx: "dx serializer --convert",
        competitors: [
          { name: "serde (Rust)", dxWins: true },
          { name: "pydantic (Python)", dxWins: true },
          { name: "zod (TS)", dxWins: true },
          { name: "class-transformer", dxWins: true },
          { name: "marshmallow", dxWins: true },
        ],
      },
      {
        area: "Cache Pipeline",
        dx: "dx serializer cache",
        competitors: [
          { name: "protobuf", dxWins: true },
          { name: "flatbuffers", dxWins: true },
          { name: "capnp", dxWins: true },
          { name: "bincode", dxWins: true },
        ],
      },
    ],
  },
  {
    id: "web-serving",
    group: "Web Serving",
    items: [
      {
        area: "HTTP Server",
        dx: "dx www",
        competitors: [
          { name: "Nginx", dxWins: true },
          { name: "Caddy", dxWins: true },
          { name: "Apache", dxWins: true },
          { name: "Traefik", dxWins: true },
          { name: "serve", dxWins: true },
        ],
      },
      {
        area: "Reverse Proxy",
        dx: "dx www --proxy",
        competitors: [
          { name: "nginx proxy", dxWins: false },
          { name: "caddy", dxWins: false },
          { name: "traefik", dxWins: false },
          { name: "haproxy", dxWins: false },
          { name: "envoy", dxWins: false },
        ],
      },
    ],
  },
  {
    id: "native",
    group: "Native Rendering",
    items: [
      {
        area: "Desktop Apps",
        dx: "dx native",
        competitors: [
          { name: "Tauri", dxWins: true },
          { name: "Electron", dxWins: true },
          { name: "Flutter Desktop", dxWins: true },
          { name: ".NET MAUI", dxWins: true },
          { name: "Qt", dxWins: true },
        ],
      },
      {
        area: "Mobile Apps",
        dx: "dx native --mobile",
        competitors: [
          { name: "React Native", dxWins: false },
          { name: "Flutter", dxWins: false },
          { name: "SwiftUI", dxWins: false },
          { name: "Jetpack Compose", dxWins: false },
        ],
      },
      {
        area: "WebView Renderer",
        dx: "dx native --webview",
        competitors: [
          { name: "Tauri Webview", dxWins: true },
          { name: "Electron", dxWins: true },
          { name: "Flutter WebView", dxWins: true },
          { name: "WKWebView", dxWins: true },
          { name: "Android WebView", dxWins: true },
        ],
      },
    ],
  },
  {
    id: "media",
    group: "Media",
    items: [
      {
        area: "Image Processing",
        dx: "dx media",
        competitors: [
          { name: "FFmpeg", dxWins: true },
          { name: "ImageMagick", dxWins: true },
          { name: "Sharp", dxWins: true },
          { name: "libvips", dxWins: true },
          { name: "Pillow", dxWins: true },
        ],
      },
      {
        area: "Video Processing",
        dx: "dx media --video",
        competitors: [
          { name: "FFmpeg", dxWins: true },
          { name: "GStreamer", dxWins: true },
          { name: "HandBrake", dxWins: true },
          { name: "DaVinci Resolve", dxWins: true },
        ],
      },
      {
        area: "Audio Processing",
        dx: "dx media --audio",
        competitors: [
          { name: "FFmpeg", dxWins: true },
          { name: "SoX", dxWins: true },
          { name: "Audacity", dxWins: true },
          { name: "librosa", dxWins: true },
          { name: "pydub", dxWins: true },
        ],
      },
    ],
  },
  {
    id: "workflow",
    group: "CI / CD",
    items: [
      {
        area: "Pipeline Orchestration",
        dx: "dx flow",
        competitors: [
          { name: "GitHub Actions", dxWins: true },
          { name: "GitLab CI", dxWins: true },
          { name: "CircleCI", dxWins: true },
          { name: "Temporal", dxWins: true },
          { name: "n8n", dxWins: true },
        ],
      },
      {
        area: "Scheduled Jobs",
        dx: "dx flow --schedule",
        competitors: [
          { name: "cron (Actions)", dxWins: true },
          { name: "schedule (GitLab)", dxWins: true },
          { name: "cron (CI)", dxWins: true },
          { name: "Temporal cron", dxWins: true },
          { name: "node-cron", dxWins: true },
        ],
      },
      {
        area: "Event-Driven",
        dx: "dx flow --event",
        competitors: [
          { name: "GitHub webhooks", dxWins: true },
          { name: "GitLab webhooks", dxWins: true },
          { name: "Temporal signals", dxWins: true },
          { name: "n8n", dxWins: true },
        ],
      },
    ],
  },
  {
    id: "backend",
    group: "Backend / Data",
    items: [
      {
        area: "Instant API",
        dx: "dx driven",
        competitors: [
          { name: "Hasura", dxWins: true },
          { name: "PostgREST", dxWins: true },
          { name: "Supabase", dxWins: true },
          { name: "Directus", dxWins: true },
          { name: "Strapi", dxWins: true },
        ],
      },
      {
        area: "Data Sync",
        dx: "dx driven --sync",
        competitors: [
          { name: "Hasura sync", dxWins: true },
          { name: "Supabase realtime", dxWins: true },
          { name: "Firebase sync", dxWins: true },
          { name: "PocketBase", dxWins: true },
        ],
      },
      {
        area: "Data Analysis",
        dx: "dx driven --analyze",
        competitors: [
          { name: "Hasura analyze", dxWins: false },
          { name: "Supabase analytics", dxWins: false },
          { name: "Metabase", dxWins: false },
          { name: "PostHog", dxWins: false },
        ],
      },
    ],
  },
  {
    id: "container",
    group: "Containers",
    items: [
      {
        area: "Container Runtime",
        dx: "dx dcp",
        competitors: [
          { name: "Docker Compose", dxWins: true },
          { name: "Kubernetes", dxWins: true },
          { name: "Podman", dxWins: true },
          { name: "Nomad", dxWins: true },
        ],
      },
      {
        area: "Image Build",
        dx: "dx dcp --build",
        competitors: [
          { name: "docker build", dxWins: true },
          { name: "podman build", dxWins: true },
          { name: "kaniko", dxWins: true },
          { name: "buildah", dxWins: true },
          { name: "buildkit", dxWins: true },
        ],
      },
      {
        area: "Service Orchestration",
        dx: "dx dcp --up",
        competitors: [
          { name: "docker compose up", dxWins: true },
          { name: "kubectl apply", dxWins: true },
          { name: "nomad run", dxWins: true },
          { name: "helm install", dxWins: true },
        ],
      },
    ],
  },
  {
    id: "search",
    group: "Search",
    items: [
      {
        area: "Full-Text Search",
        dx: "dx metasearch",
        competitors: [
          { name: "Algolia", dxWins: true },
          { name: "Meilisearch", dxWins: true },
          { name: "Elasticsearch", dxWins: true },
          { name: "Typesense", dxWins: true },
          { name: "Sonic", dxWins: true },
        ],
      },
      {
        area: "Vector Search",
        dx: "dx metasearch --vector",
        competitors: [
          { name: "Pinecone", dxWins: true },
          { name: "Qdrant", dxWins: true },
          { name: "Milvus", dxWins: true },
          { name: "Weaviate", dxWins: true },
          { name: "ChromaDB", dxWins: true },
        ],
      },
      {
        area: "Search Indexing",
        dx: "dx metasearch --index",
        competitors: [
          { name: "Algolia crawl", dxWins: true },
          { name: "Meilisearch indexer", dxWins: true },
          { name: "Elasticsearch ingest", dxWins: true },
          { name: "Typesense scrape", dxWins: true },
        ],
      },
    ],
  },
  {
    id: "infra",
    group: "Infrastructure",
    items: [
      {
        area: "Infra Provisioning",
        dx: "dx providers",
        competitors: [
          { name: "Terraform", dxWins: true },
          { name: "Pulumi", dxWins: true },
          { name: "AWS CDK", dxWins: true },
          { name: "Crossplane", dxWins: true },
          { name: "OpenTofu", dxWins: true },
        ],
      },
      {
        area: "Cloud Config Sync",
        dx: "dx providers --sync",
        competitors: [
          { name: "Terraform apply", dxWins: true },
          { name: "Pulumi up", dxWins: true },
          { name: "CDK deploy", dxWins: true },
          { name: "CloudFormation", dxWins: true },
        ],
      },
      {
        area: "Secret Management",
        dx: "dx providers --secrets",
        competitors: [
          { name: "Vault", dxWins: false },
          { name: "AWS Secrets Mgr", dxWins: false },
          { name: "Azure Key Vault", dxWins: false },
          { name: "GCP Secret Mgr", dxWins: false },
        ],
      },
    ],
  },
  {
    id: "i18n",
    group: "Internationalization",
    items: [
      {
        area: "Translation Mgmt",
        dx: "dx i18n",
        competitors: [
          { name: "i18next", dxWins: true },
          { name: "FormatJS", dxWins: true },
          { name: "ICU MessageFormat", dxWins: true },
          { name: "Lingui", dxWins: true },
          { name: "Polyglot", dxWins: true },
        ],
      },
      {
        area: "Locale Detection",
        dx: "dx i18n --detect",
        competitors: [
          { name: "i18next browser", dxWins: true },
          { name: "FormatJS locale", dxWins: true },
          { name: "Accept-Language", dxWins: true },
          { name: "globalize", dxWins: true },
        ],
      },
      {
        area: "String Extraction",
        dx: "dx i18n --extract",
        competitors: [
          { name: "i18next extract", dxWins: false },
          { name: "FormatJS extract", dxWins: false },
          { name: "Lingui extract", dxWins: false },
          { name: "react-intl", dxWins: false },
        ],
      },
    ],
  },
  {
    id: "update",
    group: "Self-Update",
    items: [
      {
        area: "Update Plan",
        dx: "dx update plan",
        competitors: [
          { name: "brew outdated", dxWins: true },
          { name: "npm outdated", dxWins: true },
          { name: "cargo outdated", dxWins: true },
          { name: "pnpm outdated", dxWins: true },
        ],
      },
      {
        area: "Apply Update",
        dx: "dx update apply",
        competitors: [
          { name: "brew upgrade", dxWins: true },
          { name: "npm update", dxWins: true },
          { name: "cargo update", dxWins: true },
          { name: "pnpm update", dxWins: true },
        ],
      },
      {
        area: "Rollback",
        dx: "dx update rollback",
        competitors: [
          { name: "brew rollback", dxWins: true },
          { name: "npm cache", dxWins: true },
          { name: "cargo --locked", dxWins: true },
          { name: "git revert", dxWins: true },
        ],
      },
    ],
  },
  {
    id: "doctor",
    group: "Diagnostics",
    items: [
      {
        area: "System Diagnostics",
        dx: "dx doctor",
        competitors: [
          { name: "next info", dxWins: true },
          { name: "ng doctor", dxWins: true },
          { name: "nuxt doctor", dxWins: true },
          { name: "npx envinfo", dxWins: true },
          { name: "taze", dxWins: true },
        ],
      },
      {
        area: "JSON Reporting",
        dx: "dx doctor --json",
        competitors: [
          { name: "next info --json", dxWins: true },
          { name: "envinfo --json", dxWins: true },
          { name: "system-info", dxWins: true },
        ],
      },
      {
        area: "Dependency Audit",
        dx: "dx doctor --audit",
        competitors: [
          { name: "npm audit", dxWins: true },
          { name: "pnpm audit", dxWins: true },
          { name: "yarn audit", dxWins: true },
          { name: "cargo audit", dxWins: true },
          { name: "pip-audit", dxWins: true },
        ],
      },
    ],
  },
  {
    id: "status",
    group: "Status",
    items: [
      {
        area: "Build Status",
        dx: "dx status",
        competitors: [
          { name: "git status", dxWins: true },
          { name: "nx show", dxWins: true },
          { name: "cargo metadata", dxWins: true },
          { name: "pnpm ls", dxWins: true },
          { name: "npm ls", dxWins: true },
        ],
      },
      {
        area: "Scored Report",
        dx: "dx status --score",
        competitors: [
          { name: "nx affected", dxWins: true },
          { name: "turbo stat", dxWins: true },
          { name: "sonarcloud", dxWins: true },
          { name: "codeclimate", dxWins: true },
        ],
      },
      {
        area: "Progress Tracking",
        dx: "dx status --progress",
        competitors: [
          { name: "nx projects", dxWins: true },
          { name: "lerna list", dxWins: true },
          { name: "pnpm ls -r", dxWins: true },
          { name: "git log", dxWins: true },
        ],
      },
    ],
  },
];
