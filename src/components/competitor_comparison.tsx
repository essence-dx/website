import React, { useState } from 'react';
import { CheckCircle2, ArrowUpDown, ChevronUp } from 'lucide-react';

interface Competitor {
  name: string;
  logo: string;
}

interface CategoryRow {
  area: string;
  dx: string;
  competitors: string[];
}

interface CategorySection {
  id: string;
  category: string;
  icon: string;
  rows: CategoryRow[];
}

const top5: Competitor[] = [
  { name: 'Competitor 1', logo: '' },
  { name: 'Competitor 2', logo: '' },
  { name: 'Competitor 3', logo: '' },
  { name: 'Competitor 4', logo: '' },
  { name: 'Competitor 5', logo: '' },
];

const categories: CategorySection[] = [
  {
    id: 'scaffolding',
    category: 'Project Scaffolding',
    icon: '/svgl/svgl_vercel.svg',
    rows: [
      { area: 'New project', dx: 'dx new', competitors: ['create-next-app', 'create-vite', 'ng new (Angular)', 'create-react-app', 'vue create'] },
      { area: 'Monorepo setup', dx: 'dx new --monorepo', competitors: ['Turborepo init', 'Nx workspace', 'Lerna init', 'Moonrepo', 'pnpm workspace'] },
      { area: 'Template system', dx: 'dx new --template', competitors: ['degit / tiged', 'yeoman', 'hygen', 'plop'] },
    ],
  },
  {
    id: 'dev-server',
    category: 'Dev Server',
    icon: '/svgl/svgl_vite.svg',
    rows: [
      { area: 'Dev server', dx: 'dx dev', competitors: ['vite dev', 'next dev', 'webpack-dev-server', 'turbo dev', 'nodemon'] },
      { area: 'HMR', dx: 'dx dev (built-in)', competitors: ['Vite HMR', 'Webpack HMR', 'Turbopack HMR', 'Parcel HMR', 'Rolldown HMR'] },
      { area: 'Reverse proxy', dx: 'dx dev --proxy', competitors: ['vite proxy', 'webpack-dev-server proxy', 'http-proxy', 'Caddy reverse-proxy', 'nginx proxy'] },
    ],
  },
  {
    id: 'build-engine',
    category: 'Build Engine',
    icon: '/svgl/svgl_vercel.svg',
    rows: [
      { area: 'Bundling', dx: 'dx build', competitors: ['vite build (Rolldown)', 'turbopack', 'esbuild', 'webpack', 'parcel'] },
      { area: 'Tree shaking', dx: 'dx build (auto)', competitors: ['Rolldown tree-shaking', 'esbuild tree-shaking', 'webpack tree-shaking', 'Rollup tree-shaking', 'SWC'] },
      { area: 'Code splitting', dx: 'dx build --split', competitors: ['webpack splitChunks', 'Rollup code-split', 'esbuild splitting', 'parcel code-split', 'Rolldown auto-split'] },
      { area: 'Lighthouse contract', dx: 'dx build lighthouse', competitors: ['webpack-bundle-analyzer', 'vite analyze', 'source-map-explorer', 'bundlephobia', 'size-limit'] },
    ],
  },
  {
    id: 'ts-runner',
    category: 'TypeScript Runner',
    icon: '/svgl/svgl_typescript.svg',
    rows: [
      { area: 'Run TS/TSX', dx: 'dx run', competitors: ['tsx', 'ts-node', 'bun run', 'deno run', 'swc-node'] },
      { area: 'Watch mode', dx: 'dx run --watch', competitors: ['tsx watch', 'ts-node-dev', 'nodemon + ts-node', 'bun --watch', 'deno watch'] },
      { area: 'Type checking on run', dx: 'dx run --check', competitors: ['tsc --noEmit', 'tsx --check', 'bun run --check', 'deno check'] },
    ],
  },
  {
    id: 'js-runtime',
    category: 'JavaScript Runtime',
    icon: '/svgl/svgl_nodejs.svg',
    rows: [
      { area: 'ESM/CJS', dx: 'dx js', competitors: ['Node.js', 'Bun', 'Deno', 'QuickJS', 'Hermes'] },
      { area: 'Package scripts', dx: 'dx js <script>', competitors: ['npm run', 'pnpm run', 'yarn run', 'bun run', 'deno task'] },
      { area: 'Workspace scripts', dx: 'dx js workspace', competitors: ['pnpm -r', 'npm workspaces', 'yarn workspaces', 'lerna run', 'turbo run'] },
    ],
  },
  {
    id: 'python-pkg',
    category: 'Python Package Manager',
    icon: '/svgl/svgl_python.svg',
    rows: [
      { area: 'Package install', dx: 'dx py add', competitors: ['pip install', 'poetry add', 'conda install', 'uv add', 'rye add'] },
      { area: 'Virtual env', dx: 'dx py venv', competitors: ['python -m venv', 'poetry env', 'conda env', 'virtualenv', 'uv venv'] },
      { area: 'Package build', dx: 'dx py build', competitors: ['python -m build', 'poetry build', 'flit build', 'pdm build', 'maturin build'] },
    ],
  },
  {
    id: 'build-graph',
    category: 'Build Graph / Monorepo',
    icon: '/svgl/svgl_github_dark.svg',
    rows: [
      { area: 'Task orchestration', dx: 'dx graph', competitors: ['Turborepo', 'Nx', 'Bazel', 'Lerna', 'Moonrepo'] },
      { area: 'Dependency graph', dx: 'dx graph --viz', competitors: ['turbo graph', 'nx graph', 'bazel query', 'lerna graph', 'moon graph'] },
      { area: 'Cache/computation', dx: 'dx graph --cache', competitors: ['turborepo cache', 'nx cloud', 'bazel remote cache', 'moon cache', 'sccache'] },
    ],
  },
  {
    id: 'icon-mgmt',
    category: 'Icon Management',
    icon: '/svgl/svgl_react_dark.svg',
    rows: [
      { area: 'Icon search', dx: 'dx icon search', competitors: ['Iconify search', 'Lucide search', 'Material Icons search', 'Phosphor search', 'Heroicons search'] },
      { area: 'Icon export', dx: 'dx icon export', competitors: ['Iconify API export', 'SVGR', 'svgo', 'npm icon packages', 'unplugin-icons'] },
      { area: 'Custom packs', dx: 'dx icon build-index', competitors: ['Iconify collections', 'simple-icons', 'svgl', 'icomoon', 'fontello'] },
      { area: 'Packs available', dx: '219 packs', competitors: 'Iconify (200k+)', 'Lucide (~1500)', 'Material (10k+)', 'Phosphor (~1000)', 'Heroicons (~500)'] },
  },
  {
    id: 'pkg-add',
    category: 'Package Management',
    icon: '/svgl/svgl_nodejs.svg',
    rows: [
      { area: 'Add packages', dx: 'dx add', competitors: ['npm install', 'pnpm add', 'yarn add', 'bun add', 'deno add'] },
      { area: 'Remove packages', dx: 'dx add --remove', competitors: ['npm uninstall', 'pnpm remove', 'yarn remove', 'bun remove', 'deno uninstall'] },
      { area: 'Update packages', dx: 'dx update', competitors: ['npm update', 'pnpm update', 'yarn upgrade', 'bun update', 'deno outdated'] },
    ],
  },
  {
    id: 'project-health',
    category: 'Project Health / Linting',
    icon: '/svgl/svgl_eslint-icon-dark.svg',
    rows: [
      { area: 'Linting', dx: 'dx check', competitors: ['ESLint', 'Biome', 'Oxlint', 'StandardJS', 'JSHint'] },
      { area: 'Formatting', dx: 'dx check --fix', competitors: ['Prettier', 'Biome format', 'dprint', 'rustfmt', 'gofmt'] },
      { area: 'Type checking', dx: 'dx check --types', competitors: ['tsc --noEmit', 'Flow', 'Pyright', 'mypy'] },
    ],
  },
  {
    id: 'css-style',
    category: 'CSS / Styling',
    icon: '/svgl/svgl_tailwindcss.svg',
    rows: [
      { area: 'Utility CSS', dx: 'dx style', competitors: ['Tailwind CSS', 'UnoCSS', 'Windicss', 'Open Props', 'Panda CSS'] },
      { area: 'CSS-in-JS', dx: 'dx style --runtime', competitors: ['styled-components', 'Emotion', 'Linaria', 'Vanilla Extract', 'Stitches'] },
      { area: 'Preprocessing', dx: 'dx style --preprocess', competitors: ['Sass/SCSS', 'PostCSS', 'Less', 'Stylus', 'Lightning CSS'] },
    ],
  },
  {
    id: 'code-gen',
    category: 'Code Generation',
    icon: '/svgl/svgl_github_dark.svg',
    rows: [
      { area: 'Scaffold component', dx: 'dx forge', competitors: ['Nx generate', 'Angular CLI', 'Hygen', 'Plop', 'Yeoman'] },
      { area: 'Package scaffolding', dx: 'dx forge package', competitors: ['nx g lib', 'ng g library', 'hygen generator', 'plop generator', 'create-package'] },
      { area: 'Custom templates', dx: 'dx forge --template', competitors: ['hygen template', 'plopfile', 'yeoman generator', 'nx generators', 'copier'] },
    ],
  },
  {
    id: 'deployment',
    category: 'Deployment',
    icon: '/svgl/svgl_vercel.svg',
    rows: [
      { area: 'Serverless deploy', dx: 'dx deploy', competitors: ['Vercel', 'Netlify', 'AWS Amplify', 'Cloudflare Pages', 'Railway'] },
      { area: 'Container deploy', dx: 'dx deploy --container', competitors: ['Vercel Docker', 'AWS ECS', 'Google Cloud Run', 'Fly.io', 'Railway'] },
      { area: 'Static hosting', dx: 'dx deploy --static', competitors: ['Vercel static', 'Netlify static', 'Cloudflare Pages', 'GitHub Pages', 'Surge'] },
      { area: 'Receipt handoff', dx: 'dx deploy --receipt', competitors: 'Vercel --confirm', 'Netlify deploy --json', 'AWS CodeDeploy', 'Octopus Deploy'] },
  },
  {
    id: 'serialization',
    category: 'Serialization',
    icon: '/svgl/svgl_rust.svg',
    rows: [
      { area: 'Schema validation', dx: 'dx serializer', competitors: ['Zod', 'Ajv', 'Joi', 'Valibot', 'ArkType'] },
      { area: 'Format conversion', dx: 'dx serializer --convert', competitors: ['serde (Rust)', 'pydantic (Python)', 'zod (TS)', 'class-transformer', 'marshmallow'] },
      { area: 'Cache pipeline', dx: 'dx serializer cache', competitors: '.sr → .machine', 'protobuf', 'flatbuffers', 'capnp', 'bincode'] },
    ],
  },
  {
    id: 'web-serving',
    category: 'Web Serving',
    icon: '/svgl/svgl_nginx.svg',
    rows: [
      { area: 'HTTP server', dx: 'dx www', competitors: ['Nginx', 'Caddy', 'Apache', 'Traefik', 'serve'] },
      { area: 'Reverse proxy', dx: 'dx www --proxy', competitors: ['nginx proxy', 'caddy reverse-proxy', 'traefik', 'haproxy', 'envoy'] },
      { area: 'Static file serving', dx: 'dx www --static', competitors: ['nginx static', 'caddy file-server', 'serve', 'http-server', 'simple-http-server'] },
    ],
  },
  {
    id: 'native',
    category: 'Native Rendering',
    icon: '/svgl/svgl_react_dark.svg',
    rows: [
      { area: 'Desktop apps', dx: 'dx native', competitors: ['Tauri', 'Electron', 'Flutter Desktop', '.NET MAUI', 'Qt'] },
      { area: 'Mobile apps', dx: 'dx native --mobile', competitors: ['React Native', 'Flutter', 'SwiftUI', 'Jetpack Compose', '.NET MAUI'] },
      { area: 'WebView renderer', dx: 'dx native --webview', competitors: ['Tauri Webview', 'Electron Chromium', 'Flutter WebView', 'WKWebView', 'Android WebView'] },
    ],
  },
  {
    id: 'media',
    category: 'Media Tools',
    icon: '/svgl/svgl_cloudflare.svg',
    rows: [
      { area: 'Image processing', dx: 'dx media', competitors: ['FFmpeg', 'ImageMagick', 'Sharp', 'libvips', 'Pillow'] },
      { area: 'Video processing', dx: 'dx media --video', competitors: ['FFmpeg', 'GStreamer', 'HandBrake', 'DaVinci Resolve', 'LosslessCut'] },
      { area: 'Audio processing', dx: 'dx media --audio', competitors: ['FFmpeg', 'SoX', 'Audacity', 'librosa', 'pydub'] },
    ],
  },
  {
    id: 'ci-cd',
    category: 'CI/CD / Workflow',
    icon: '/svgl/svgl_github_dark.svg',
    rows: [
      { area: 'Pipeline orchestration', dx: 'dx flow', competitors: ['GitHub Actions', 'GitLab CI', 'CircleCI', 'Temporal', 'n8n'] },
      { area: 'Scheduled jobs', dx: 'dx flow --schedule', competitors: ['cron (GitHub Actions)', 'schedule (GitLab)', 'cron (CircleCI)', 'cron (Temporal)', 'node-cron'] },
      { area: 'Event-driven', dx: 'dx flow --event', competitors: ['GitHub webhooks', 'GitLab webhooks', 'Temporal signals', 'n8n webhooks', 'Zapier'] },
    ],
  },
  {
    id: 'data-driven',
    category: 'Data-Driven / Backend',
    icon: '/svgl/svgl_cloudflare.svg',
    rows: [
      { area: 'Instant API', dx: 'dx driven', competitors: ['Hasura', 'PostgREST', 'Supabase', 'Directus', 'Strapi'] },
      { area: 'Data sync', dx: 'dx driven --sync', competitors: ['Hasura sync', 'Supabase realtime', 'Firebase sync', 'PocketBase', 'Appwrite'] },
      { area: 'Data analysis', dx: 'dx driven --analyze', competitors: ['Hasura analyze', 'Supabase analytics', 'Metabase', 'PostHog', 'DuckDB'] },
    ],
  },
  {
    id: 'container-dcp',
    category: 'Container / DCP',
    icon: '/svgl/svgl_docker.svg',
    rows: [
      { area: 'Container run', dx: 'dx dcp', competitors: ['Docker Compose', 'Kubernetes', 'Podman', 'Nomad', 'Docker Swarm'] },
      { area: 'Image build', dx: 'dx dcp --build', competitors: ['docker build', 'podman build', 'kaniko', 'buildah', 'buildkit'] },
      { area: 'Service orchestration', dx: 'dx dcp --up', competitors: ['docker compose up', 'kubectl apply', 'nomad run', 'docker stack deploy', 'helm install'] },
    ],
  },
  {
    id: 'search',
    category: 'Search',
    icon: '/svgl/svgl_google.svg',
    rows: [
      { area: 'Full-text search', dx: 'dx metasearch', competitors: ['Algolia', 'Meilisearch', 'Elasticsearch', 'Typesense', 'Sonic'] },
      { area: 'Vector search', dx: 'dx metasearch --vector', competitors: ['Pinecone', 'Qdrant', 'Milvus', 'Weaviate', 'ChromaDB'] },
      { area: 'Search indexing', dx: 'dx metasearch --index', competitors: ['Algolia crawl', 'Meilisearch indexer', 'Elasticsearch ingest', 'Typesense scrape', 'Sonic index'] },
    ],
  },
  {
    id: 'providers',
    category: 'Provider / Infrastructure',
    icon: '/svgl/svgl_amazon-q.svg',
    rows: [
      { area: 'Infra provisioning', dx: 'dx providers', competitors: ['Terraform', 'Pulumi', 'AWS CDK', 'Crossplane', 'OpenTofu'] },
      { area: 'Cloud config', dx: 'dx providers --sync', competitors: ['Terraform plan/apply', 'Pulumi up', 'CDK deploy', 'CloudFormation', 'Azure ARM'] },
      { area: 'Secret management', dx: 'dx providers --secrets', competitors: ['Vault', 'AWS Secrets Manager', 'Azure Key Vault', 'Google Secret Manager', '1Password'] },
    ],
  },
  {
    id: 'i18n',
    category: 'Internationalization',
    icon: '/svgl/svgl_google.svg',
    rows: [
      { area: 'Translation management', dx: 'dx i18n', competitors: ['i18next', 'FormatJS', 'ICU MessageFormat', 'Lingui', 'Polyglot'] },
      { area: 'Locale detection', dx: 'dx i18n --detect', competitors: ['i18next browser detector', 'FormatJS locale', 'Accept-Language', 'globalize', 'moment-timezone'] },
      { area: 'String extraction', dx: 'dx i18n --extract', competitors: ['i18next extract', 'FormatJS extract', 'Lingui extract', 'babel-plugin-i18n', 'react-intl extract'] },
    ],
  },
  {
    id: 'update',
    category: 'Self-Update',
    icon: '/svgl/svgl_microsoft.svg',
    rows: [
      { area: 'Plan update', dx: 'dx update plan', competitors: ['brew outdated', 'npm outdated', 'cargo outdated', 'pnpm outdated', 'pip list --outdated'] },
      { area: 'Apply update', dx: 'dx update apply', competitors: ['brew upgrade', 'npm update', 'cargo update', 'pnpm update', 'pip install --upgrade'] },
      { area: 'Rollback', dx: 'dx update rollback', competitors: ['brew rollback', 'npm cache', 'cargo --locked', 'git revert', 'pnpm store'] },
    ],
  },
  {
    id: 'ecosystem',
    category: 'Ecosystem Manager',
    icon: '/svgl/svgl_rust.svg',
    rows: [
      { area: 'Version manager', dx: 'dx ecosystem', competitors: ['rustup', 'nvm', 'fnm', 'asdf', 'sdkman'] },
      { area: 'Toolchain install', dx: 'dx ecosystem --install', competitors: ['rustup toolchain', 'nvm install', 'fnm install', 'asdf install', 'sdk install'] },
      { area: 'Readiness report', dx: 'dx ecosystem --report', competitors: ['rustup show', 'nvm ls', 'doctor (various)', 'asdf current', 'sdk current'] },
    ],
  },
  {
    id: 'doctor',
    category: 'Diagnostics / Doctor',
    icon: '/svgl/svgl_vercel.svg',
    rows: [
      { area: 'System diagnostics', dx: 'dx doctor', competitors: ['next info', 'ng doctor', 'nuxt doctor', 'npx envinfo', 'taze'] },
      { area: 'JSON output', dx: 'dx doctor --json', competitors: ['next info --json', 'npx envinfo --json', 'system-info', 'node -e process', 'npx diagnose'] },
      { area: 'Dependency audit', dx: 'dx doctor --audit', competitors: ['npm audit', 'pnpm audit', 'yarn audit', 'cargo audit', 'pip-audit'] },
    ],
  },
  {
    id: 'status',
    category: 'Status Reporting',
    icon: '/svgl/svgl_github_dark.svg',
    rows: [
      { area: 'Build status', dx: 'dx status', competitors: ['git status', 'nx show', 'cargo metadata', 'pnpm ls', 'npm ls'] },
      { area: 'Scored report', dx: 'dx status --score', competitors: ['nx affected graph', 'turbo stat', 'sonarcloud', 'codeclimate', 'coveralls'] },
      { area: 'Progress tracking', dx: 'dx status --progress', competitors: ['nx show projects', 'lerna list', 'pnpm ls -r', 'cargo workspace', 'git log --oneline'] },
    ],
  },
];

const categoryIcons: Record<string, string> = {
  scaffolding: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
  'dev-server': 'bg-green-500/10 border-green-500/20 text-green-400',
  'build-engine': 'bg-orange-500/10 border-orange-500/20 text-orange-400',
  'ts-runner': 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
  'js-runtime': 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400',
  'python-pkg': 'bg-blue-400/10 border-blue-400/20 text-blue-300',
  'build-graph': 'bg-purple-500/10 border-purple-500/20 text-purple-400',
  'icon-mgmt': 'bg-pink-500/10 border-pink-500/20 text-pink-400',
  'pkg-add': 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
  'project-health': 'bg-red-500/10 border-red-500/20 text-red-400',
  'css-style': 'bg-sky-500/10 border-sky-500/20 text-sky-400',
  'code-gen': 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400',
  deployment: 'bg-violet-500/10 border-violet-500/20 text-violet-400',
  serialization: 'bg-teal-500/10 border-teal-500/20 text-teal-400',
  'web-serving': 'bg-neutral-500/10 border-neutral-500/20 text-neutral-400',
  native: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
  media: 'bg-fuchsia-500/10 border-fuchsia-500/20 text-fuchsia-400',
  'ci-cd': 'bg-lime-500/10 border-lime-500/20 text-lime-400',
  'data-driven': 'bg-amber-500/10 border-amber-500/20 text-amber-400',
  'container-dcp': 'bg-sky-600/10 border-sky-600/20 text-sky-500',
  search: 'bg-blue-700/10 border-blue-700/20 text-blue-600',
  providers: 'bg-orange-600/10 border-orange-600/20 text-orange-500',
  i18n: 'bg-green-600/10 border-green-600/20 text-green-500',
  update: 'bg-gray-500/10 border-gray-500/20 text-gray-400',
  ecosystem: 'bg-cyan-600/10 border-cyan-600/20 text-cyan-500',
  doctor: 'bg-red-600/10 border-red-600/20 text-red-500',
  status: 'bg-purple-600/10 border-purple-600/20 text-purple-500',
};

function CategoryTable({ section }: { section: CategorySection }) {
  const style = categoryIcons[section.id] || 'bg-foreground/5 border-border text-foreground';

  return (
    <div id={section.id} className="border border-border rounded-lg overflow-hidden">
      <div className={`px-6 py-4 border-b border-border flex items-center gap-3 ${style.split(' ').slice(0, 2).join(' ')}`}>
        {section.icon && <img src={section.icon} alt="" className="w-5 h-5 object-contain" />}
        <span className={`text-lg font-semibold ${style.split(' ').slice(2).join(' ')}`}>{section.category}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left font-sans text-xs text-muted-foreground py-3 px-6 w-1/5 uppercase tracking-wider">Area</th>
              <th className="text-left font-sans text-xs text-foreground py-3 px-4 w-1/5 uppercase tracking-wider">DX</th>
              <th className="text-left font-sans text-xs text-muted-foreground py-3 px-4 w-3/5 uppercase tracking-wider">Top 5 Competitors</th>
            </tr>
          </thead>
          <tbody>
            {section.rows.map((row, i) => (
              <tr key={i} className="border-b border-border last:border-b-0 hover:bg-foreground/5 transition-colors">
                <td className="font-sans text-sm text-foreground py-3 px-6">{row.area}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-sm text-foreground font-medium">{row.dx}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex flex-wrap gap-1.5">
                    {Array.isArray(row.competitors)
                      ? row.competitors.map((comp, ci) => (
                          <span key={ci} className="inline-block font-sans text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                            {comp}
                          </span>
                        ))
                      : <span className="font-sans text-sm text-muted-foreground">{row.competitors}</span>
                    }
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function CompetitorComparison() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? categories : categories.slice(0, 4);

  return (
    <div className="w-full py-16 md:py-24 bg-background font-sans">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl text-foreground mb-4">DX Tools — Category Comparison</h2>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto">
            28 DX tools grouped by category, each compared against the top 5 industry alternatives.
          </p>
        </div>

        <div className="space-y-6">
          {visible.map((section) => (
            <CategoryTable key={section.id} section={section} />
          ))}
        </div>

        {!showAll && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setShowAll(true)}
              className="flex items-center gap-2 px-6 py-3 border border-border text-foreground hover:bg-foreground/5 transition-colors text-sm"
            >
              <ArrowUpDown className="w-4 h-4" />
              Show all {categories.length} categories
            </button>
          </div>
        )}

        {showAll && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setShowAll(false)}
              className="flex items-center gap-2 px-6 py-3 border border-border text-foreground hover:bg-foreground/5 transition-colors text-sm"
            >
              <ChevronUp className="w-4 h-4" />
              Show less
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
