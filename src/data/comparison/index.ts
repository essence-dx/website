export interface ComparisonRow {
  area: string;
  dx: string;
  competitors: string[];
  dxWins: boolean;
}

export interface ComparisonGroup {
  id: string;
  group: string;
  items: ComparisonRow[];
}

export const groups: ComparisonGroup[] = [
  {
    id: 'foundation',
    group: 'Foundation',
    items: [
      { area: 'Project Scaffolding', dx: 'dx new', competitors: ['create-next-app', 'create-vite', 'ng new', 'create-react-app', 'vue create'], dxWins: true },
      { area: 'Monorepo Setup', dx: 'dx new --monorepo', competitors: ['Turborepo init', 'Nx workspace', 'Lerna init', 'Moonrepo', 'pnpm workspace'], dxWins: true },
      { area: 'Template System', dx: 'dx new --template', competitors: ['degit / tiged', 'yeoman', 'hygen', 'plop'], dxWins: false },
      { area: 'Ecosystem Manager', dx: 'dx ecosystem', competitors: ['rustup', 'nvm', 'fnm', 'asdf', 'sdkman'], dxWins: true },
    ],
  },
  {
    id: 'dev-server',
    group: 'Dev Server',
    items: [
      { area: 'Development Server', dx: 'dx dev', competitors: ['vite dev', 'next dev', 'webpack-dev-server', 'turbo dev', 'nodemon'], dxWins: true },
      { area: 'Hot Module Replacement', dx: 'dx dev HMR', competitors: ['Vite HMR', 'Webpack HMR', 'Turbopack HMR', 'Parcel HMR', 'Rolldown HMR'], dxWins: false },
      { area: 'Reverse Proxy', dx: 'dx dev --proxy', competitors: ['vite proxy', 'webpack proxy', 'http-proxy', 'Caddy', 'nginx proxy'], dxWins: true },
      { area: 'Static File Serving', dx: 'dx www --static', competitors: ['nginx static', 'caddy file-server', 'serve', 'http-server'], dxWins: true },
    ],
  },
  {
    id: 'build',
    group: 'Build & Compile',
    items: [
      { area: 'Bundling', dx: 'dx build', competitors: ['vite (Rolldown)', 'turbopack', 'esbuild', 'webpack', 'parcel'], dxWins: true },
      { area: 'Tree Shaking', dx: 'dx build (auto)', competitors: ['Rolldown', 'esbuild', 'webpack', 'Rollup', 'SWC'], dxWins: false },
      { area: 'Code Splitting', dx: 'dx build --split', competitors: ['webpack splitChunks', 'Rollup', 'esbuild', 'parcel', 'Rolldown'], dxWins: true },
      { area: 'Bundle Analysis', dx: 'dx build lighthouse', competitors: ['webpack-bundle-analyzer', 'vite analyze', 'source-map-explorer', 'bundlephobia', 'size-limit'], dxWins: true },
    ],
  },
  {
    id: 'typescript',
    group: 'TypeScript',
    items: [
      { area: 'TS/TSX Runner', dx: 'dx run', competitors: ['tsx', 'ts-node', 'bun run', 'deno run', 'swc-node'], dxWins: true },
      { area: 'Watch Mode', dx: 'dx run --watch', competitors: ['tsx watch', 'ts-node-dev', 'nodemon + ts', 'bun --watch', 'deno watch'], dxWins: true },
      { area: 'Type Check on Run', dx: 'dx run --check', competitors: ['tsc --noEmit', 'tsx --check', 'bun run --check', 'deno check'], dxWins: true },
    ],
  },
  {
    id: 'runtime',
    group: 'JavaScript Runtime',
    items: [
      { area: 'ESM/CJS Support', dx: 'dx js', competitors: ['Node.js', 'Bun', 'Deno', 'QuickJS', 'Hermes'], dxWins: true },
      { area: 'Package Scripts', dx: 'dx js <script>', competitors: ['npm run', 'pnpm run', 'yarn run', 'bun run', 'deno task'], dxWins: true },
      { area: 'Workspace Scripts', dx: 'dx js workspace', competitors: ['pnpm -r', 'npm workspaces', 'yarn workspaces', 'lerna run', 'turbo run'], dxWins: true },
    ],
  },
  {
    id: 'python',
    group: 'Python',
    items: [
      { area: 'Package Install', dx: 'dx py add', competitors: ['pip install', 'poetry add', 'conda install', 'uv add', 'rye add'], dxWins: true },
      { area: 'Virtual Environment', dx: 'dx py venv', competitors: ['python -m venv', 'poetry env', 'conda env', 'virtualenv', 'uv venv'], dxWins: true },
      { area: 'Package Build', dx: 'dx py build', competitors: ['python -m build', 'poetry build', 'flit build', 'pdm build', 'maturin build'], dxWins: false },
    ],
  },
  {
    id: 'build-graph',
    group: 'Build Graph',
    items: [
      { area: 'Task Orchestration', dx: 'dx graph', competitors: ['Turborepo', 'Nx', 'Bazel', 'Lerna', 'Moonrepo'], dxWins: true },
      { area: 'Dependency Visualization', dx: 'dx graph --viz', competitors: ['turbo graph', 'nx graph', 'bazel query', 'lerna graph', 'moon graph'], dxWins: true },
      { area: 'Remote Caching', dx: 'dx graph --cache', competitors: ['turborepo cache', 'nx cloud', 'bazel remote', 'moon cache', 'sccache'], dxWins: false },
    ],
  },
  {
    id: 'icons',
    group: 'Icons',
    items: [
      { area: 'Icon Search', dx: 'dx icon search', competitors: ['Iconify', 'Lucide', 'Material Icons', 'Phosphor', 'Heroicons'], dxWins: true },
      { area: 'Icon Export', dx: 'dx icon export', competitors: ['Iconify API', 'SVGR', 'svgo', 'npm packages', 'unplugin-icons'], dxWins: true },
      { area: 'Custom Pack Index', dx: 'dx icon build-index', competitors: ['Iconify collections', 'simple-icons', 'svgl', 'icomoon', 'fontello'], dxWins: true },
      { area: 'Total Packs', dx: '219 packs', competitors: ['Iconify (200k+)', 'Lucide (~1.5k)', 'Material (10k+)', 'Phosphor (~1k)', 'Heroicons (~500)'], dxWins: false },
    ],
  },
  {
    id: 'packages',
    group: 'Package Management',
    items: [
      { area: 'Add Packages', dx: 'dx add', competitors: ['npm install', 'pnpm add', 'yarn add', 'bun add', 'deno add'], dxWins: true },
      { area: 'Remove Packages', dx: 'dx add --remove', competitors: ['npm uninstall', 'pnpm remove', 'yarn remove', 'bun remove', 'deno uninstall'], dxWins: true },
      { area: 'Update Packages', dx: 'dx update', competitors: ['npm update', 'pnpm update', 'yarn upgrade', 'bun update', 'deno outdated'], dxWins: true },
    ],
  },
  {
    id: 'health',
    group: 'Project Health',
    items: [
      { area: 'Linting', dx: 'dx check', competitors: ['ESLint', 'Biome', 'Oxlint', 'StandardJS', 'JSHint'], dxWins: true },
      { area: 'Formatting', dx: 'dx check --fix', competitors: ['Prettier', 'Biome format', 'dprint', 'rustfmt', 'gofmt'], dxWins: true },
      { area: 'Type Checking', dx: 'dx check --types', competitors: ['tsc --noEmit', 'Flow', 'Pyright', 'mypy'], dxWins: true },
    ],
  },
  {
    id: 'styling',
    group: 'Styling',
    items: [
      { area: 'Utility CSS', dx: 'dx style', competitors: ['Tailwind CSS', 'UnoCSS', 'Windicss', 'Open Props', 'Panda CSS'], dxWins: true },
      { area: 'CSS-in-JS', dx: 'dx style --runtime', competitors: ['styled-components', 'Emotion', 'Linaria', 'Vanilla Extract', 'Stitches'], dxWins: false },
      { area: 'Preprocessing', dx: 'dx style --preprocess', competitors: ['Sass/SCSS', 'PostCSS', 'Less', 'Stylus', 'Lightning CSS'], dxWins: true },
    ],
  },
  {
    id: 'codegen',
    group: 'Code Generation',
    items: [
      { area: 'Scaffold Component', dx: 'dx forge', competitors: ['Nx generate', 'Angular CLI', 'Hygen', 'Plop', 'Yeoman'], dxWins: true },
      { area: 'Package Scaffolding', dx: 'dx forge package', competitors: ['nx g lib', 'ng g library', 'hygen gen', 'plop gen'], dxWins: true },
      { area: 'Custom Templates', dx: 'dx forge --template', competitors: ['hygen template', 'plopfile', 'yeoman', 'nx gen', 'copier'], dxWins: false },
    ],
  },
  {
    id: 'deploy',
    group: 'Deployment',
    items: [
      { area: 'Serverless Deploy', dx: 'dx deploy', competitors: ['Vercel', 'Netlify', 'AWS Amplify', 'Cloudflare Pages', 'Railway'], dxWins: true },
      { area: 'Container Deploy', dx: 'dx deploy --container', competitors: ['AWS ECS', 'Google Cloud Run', 'Fly.io', 'Railway'], dxWins: true },
      { area: 'Static Hosting', dx: 'dx deploy --static', competitors: ['Vercel', 'Netlify', 'Cloudflare Pages', 'GitHub Pages', 'Surge'], dxWins: true },
      { area: 'Receipt Handoff', dx: 'dx deploy --receipt', competitors: ['Vercel --confirm', 'Netlify --json', 'AWS CodeDeploy', 'Octopus Deploy'], dxWins: true },
    ],
  },
  {
    id: 'serializer',
    group: 'Serialization',
    items: [
      { area: 'Schema Validation', dx: 'dx serializer', competitors: ['Zod', 'Ajv', 'Joi', 'Valibot', 'ArkType'], dxWins: true },
      { area: 'Format Conversion', dx: 'dx serializer --convert', competitors: ['serde (Rust)', 'pydantic (Python)', 'zod (TS)', 'class-transformer', 'marshmallow'], dxWins: true },
      { area: 'Cache Pipeline', dx: 'dx serializer cache', competitors: ['.sr → .machine (DX)', 'protobuf', 'flatbuffers', 'capnp', 'bincode'], dxWins: true },
    ],
  },
  {
    id: 'web-serving',
    group: 'Web Serving',
    items: [
      { area: 'HTTP Server', dx: 'dx www', competitors: ['Nginx', 'Caddy', 'Apache', 'Traefik', 'serve'], dxWins: true },
      { area: 'Reverse Proxy', dx: 'dx www --proxy', competitors: ['nginx proxy', 'caddy', 'traefik', 'haproxy', 'envoy'], dxWins: false },
    ],
  },
  {
    id: 'native',
    group: 'Native Rendering',
    items: [
      { area: 'Desktop Apps', dx: 'dx native', competitors: ['Tauri', 'Electron', 'Flutter Desktop', '.NET MAUI', 'Qt'], dxWins: true },
      { area: 'Mobile Apps', dx: 'dx native --mobile', competitors: ['React Native', 'Flutter', 'SwiftUI', 'Jetpack Compose'], dxWins: false },
      { area: 'WebView Renderer', dx: 'dx native --webview', competitors: ['Tauri Webview', 'Electron', 'Flutter WebView', 'WKWebView', 'Android WebView'], dxWins: true },
    ],
  },
  {
    id: 'media',
    group: 'Media',
    items: [
      { area: 'Image Processing', dx: 'dx media', competitors: ['FFmpeg', 'ImageMagick', 'Sharp', 'libvips', 'Pillow'], dxWins: true },
      { area: 'Video Processing', dx: 'dx media --video', competitors: ['FFmpeg', 'GStreamer', 'HandBrake', 'DaVinci Resolve'], dxWins: true },
      { area: 'Audio Processing', dx: 'dx media --audio', competitors: ['FFmpeg', 'SoX', 'Audacity', 'librosa', 'pydub'], dxWins: true },
    ],
  },
  {
    id: 'workflow',
    group: 'CI / CD',
    items: [
      { area: 'Pipeline Orchestration', dx: 'dx flow', competitors: ['GitHub Actions', 'GitLab CI', 'CircleCI', 'Temporal', 'n8n'], dxWins: true },
      { area: 'Scheduled Jobs', dx: 'dx flow --schedule', competitors: ['cron (Actions)', 'schedule (GitLab)', 'cron (CI)', 'Temporal cron', 'node-cron'], dxWins: true },
      { area: 'Event-Driven', dx: 'dx flow --event', competitors: ['GitHub webhooks', 'GitLab webhooks', 'Temporal signals', 'n8n'], dxWins: true },
    ],
  },
  {
    id: 'backend',
    group: 'Backend / Data',
    items: [
      { area: 'Instant API', dx: 'dx driven', competitors: ['Hasura', 'PostgREST', 'Supabase', 'Directus', 'Strapi'], dxWins: true },
      { area: 'Data Sync', dx: 'dx driven --sync', competitors: ['Hasura sync', 'Supabase realtime', 'Firebase sync', 'PocketBase'], dxWins: true },
      { area: 'Data Analysis', dx: 'dx driven --analyze', competitors: ['Hasura analyze', 'Supabase analytics', 'Metabase', 'PostHog'], dxWins: false },
    ],
  },
  {
    id: 'container',
    group: 'Containers',
    items: [
      { area: 'Container Runtime', dx: 'dx dcp', competitors: ['Docker Compose', 'Kubernetes', 'Podman', 'Nomad'], dxWins: true },
      { area: 'Image Build', dx: 'dx dcp --build', competitors: ['docker build', 'podman build', 'kaniko', 'buildah', 'buildkit'], dxWins: true },
      { area: 'Service Orchestration', dx: 'dx dcp --up', competitors: ['docker compose up', 'kubectl apply', 'nomad run', 'helm install'], dxWins: true },
    ],
  },
  {
    id: 'search',
    group: 'Search',
    items: [
      { area: 'Full-Text Search', dx: 'dx metasearch', competitors: ['Algolia', 'Meilisearch', 'Elasticsearch', 'Typesense', 'Sonic'], dxWins: true },
      { area: 'Vector Search', dx: 'dx metasearch --vector', competitors: ['Pinecone', 'Qdrant', 'Milvus', 'Weaviate', 'ChromaDB'], dxWins: true },
      { area: 'Search Indexing', dx: 'dx metasearch --index', competitors: ['Algolia crawl', 'Meilisearch indexer', 'Elasticsearch ingest', 'Typesense scrape'], dxWins: true },
    ],
  },
  {
    id: 'infra',
    group: 'Infrastructure',
    items: [
      { area: 'Infra Provisioning', dx: 'dx providers', competitors: ['Terraform', 'Pulumi', 'AWS CDK', 'Crossplane', 'OpenTofu'], dxWins: true },
      { area: 'Cloud Config Sync', dx: 'dx providers --sync', competitors: ['Terraform apply', 'Pulumi up', 'CDK deploy', 'CloudFormation'], dxWins: true },
      { area: 'Secret Management', dx: 'dx providers --secrets', competitors: ['Vault', 'AWS Secrets Mgr', 'Azure Key Vault', 'GCP Secret Mgr'], dxWins: false },
    ],
  },
  {
    id: 'i18n',
    group: 'Internationalization',
    items: [
      { area: 'Translation Mgmt', dx: 'dx i18n', competitors: ['i18next', 'FormatJS', 'ICU MessageFormat', 'Lingui', 'Polyglot'], dxWins: true },
      { area: 'Locale Detection', dx: 'dx i18n --detect', competitors: ['i18next browser', 'FormatJS locale', 'Accept-Language', 'globalize'], dxWins: true },
      { area: 'String Extraction', dx: 'dx i18n --extract', competitors: ['i18next extract', 'FormatJS extract', 'Lingui extract', 'react-intl'], dxWins: false },
    ],
  },
  {
    id: 'update',
    group: 'Self-Update',
    items: [
      { area: 'Update Plan', dx: 'dx update plan', competitors: ['brew outdated', 'npm outdated', 'cargo outdated', 'pnpm outdated'], dxWins: true },
      { area: 'Apply Update', dx: 'dx update apply', competitors: ['brew upgrade', 'npm update', 'cargo update', 'pnpm update'], dxWins: true },
      { area: 'Rollback', dx: 'dx update rollback', competitors: ['brew rollback', 'npm cache', 'cargo --locked', 'git revert'], dxWins: true },
    ],
  },
  {
    id: 'doctor',
    group: 'Diagnostics',
    items: [
      { area: 'System Diagnostics', dx: 'dx doctor', competitors: ['next info', 'ng doctor', 'nuxt doctor', 'npx envinfo', 'taze'], dxWins: true },
      { area: 'JSON Reporting', dx: 'dx doctor --json', competitors: ['next info --json', 'envinfo --json', 'system-info'], dxWins: true },
      { area: 'Dependency Audit', dx: 'dx doctor --audit', competitors: ['npm audit', 'pnpm audit', 'yarn audit', 'cargo audit', 'pip-audit'], dxWins: true },
    ],
  },
  {
    id: 'status',
    group: 'Status',
    items: [
      { area: 'Build Status', dx: 'dx status', competitors: ['git status', 'nx show', 'cargo metadata', 'pnpm ls', 'npm ls'], dxWins: true },
      { area: 'Scored Report', dx: 'dx status --score', competitors: ['nx affected', 'turbo stat', 'sonarcloud', 'codeclimate'], dxWins: true },
      { area: 'Progress Tracking', dx: 'dx status --progress', competitors: ['nx projects', 'lerna list', 'pnpm ls -r', 'git log'], dxWins: true },
    ],
  },
];
