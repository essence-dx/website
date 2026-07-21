# PLAN: CDN-First Static Export for apps/v4 (shadcn/ui docs)

## Goal

Convert `apps/v4` (the official shadcn/ui documentation site) to a **CDN-first static architecture**:

- **CLI registry JSON** served from jsdelivr CDN instead of Vercel server
- **Component ESM bundles** compiled and served from CDN, not bundled in the Next.js build
- **Vercel deployment** contains only page shells (MDX docs, navigation, layouts) — no component source code
- **No serverless functions** — static export (`output: 'export'`)
- **Unlimited scale** — CDN handles all heavy asset delivery

---

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                      Build Pipeline                          │
│  scripts/build-registry.mts  +  scripts/build-esm.mts       │
│                                                              │
│  registry/bases/*/ui/*.tsx  ──►  public/r/styles/{s}/esm/*.js│
│  (TSX source)                   (compiled ESM JS bundles)    │
│                                                              │
│  registry.json              ──►  public/r/styles/{s}/*.json  │
│  (registry metadata)            (CLI registry with content)  │
│                                                              │
│  lib/utils.ts / hooks/*     ──►  public/r/esm/lib/*.js       │
│  (shared deps)                   (compiled shared modules)   │
└──────────────────────┬───────────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────────────┐
│                      CDN (jsdelivr)                          │
│                                                              │
│  https://cdn.jsdelivr.net/gh/shadcn-ui/ui@v1.0.0/           │
│    apps/v4/public/r/                                         │
│      index.json                  (component index)           │
│      config.json                 (presets)                   │
│      registries.json             (registry directory)        │
│      colors/*.json               (base colors)               │
│      styles/{style}/             (per-style artifacts)       │
│        {name}.json               (CLI: component + source)   │
│        esm/{name}.js             (Docs: compiled component)  │
│        registry.json             (full style registry)       │
│      esm/                        (shared ESM modules)        │
│        lib/utils.js                                           │
│        hooks/use-mobile.js                                    │
│        ...                                                    │
└──────────────────────┬───────────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────────────┐
│               Vercel (static export)                         │
│                                                              │
│  /docs/**                    (MDX content - server rendered) │
│  /blocks/**                  (block showcase page shells)    │
│  /examples/**                (example page shells)           │
│  /charts/**                  (chart page shells)             │
│  /colors                     (color page)                    │
│  /create                     (theme creator shell)           │
│                                                              │
│  All component previews use React.lazy() with CDN imports   │
│  No component source code in JS bundles                      │
│  No API route handlers (all static)                          │
└──────────────────────────────────────────────────────────────┘
```

---

## Key Components

### 1. ESM Build (`scripts/build-esm.mts`)

New build script that compiles component TSX → ESM JS.

**Input sources:**
- `styles/{style}/ui/{name}.tsx` — Already built by `build-registry.mts`
- `registry/new-york-v4/ui/{name}.tsx` — Legacy style
- `lib/utils.ts` — Shared utility
- `hooks/*.ts` — Shared hooks

**Output:**
- `public/r/styles/{style}/esm/{name}.js` — Compiled component
- `public/r/esm/lib/utils.js` — Compiled shared utils
- `public/r/esm/hooks/*.js` — Compiled hooks

**Import rewriting:**
- `@/lib/utils` → `${CDN_BASE}/esm/lib/utils.js`
- `@/styles/{style}/ui/X` → `${CDN_BASE}/styles/{style}/esm/X.js`
- `@/registry/{style}/ui/X` → `${CDN_BASE}/styles/{style}/esm/X.js`
- `@/hooks/X` → `${CDN_BASE}/esm/hooks/X.js`
- npm packages → bare specifiers (resolved via importmap)

**Build tool:** esbuild (`format: 'esm'`, `target: 'es2020'`, `jsx: 'automatic'`)

### 2. Modified `lazyComponentExpression()` in `build-registry.mts`

**Current (line 248):**
```tsx
const mod = await import("@/registry/new-york-v4/ui/accordion")
```

**New:**
```tsx
const CDN = "https://cdn.jsdelivr.net/gh/shadcn-ui/ui@{VERSION}/apps/v4/public/r"
const mod = await import(CDN + "/styles/new-york-v4/esm/accordion.js")
```

Generated in `__components__.tsx`:
```tsx
React.lazy(async () => {
  const baseUrl = "https://cdn.jsdelivr.net/gh/shadcn-ui/ui@{VERSION}/apps/v4/public/r"
  const mod = await import(`${baseUrl}/styles/${styleName}/esm/${name}.js`)
  const exportName = Object.keys(mod).find(
    key => typeof mod[key] === 'function' || typeof mod[key] === 'object'
  ) || "${name}"
  return { default: mod.default || mod[exportName] }
})
```

### 3. Importmap (`app/layout.tsx`)

Resolves npm package bare specifiers at runtime in the browser:

```html
<script type="importmap">
{
  "imports": {
    "react": "https://cdn.jsdelivr.net/npm/react@19.2.3/+esm",
    "react/jsx-runtime": "https://cdn.jsdelivr.net/npm/react@19.2.3/+esm",
    "react-dom": "https://cdn.jsdelivr.net/npm/react-dom@19.2.3/+esm",
    "class-variance-authority": "https://cdn.jsdelivr.net/npm/class-variance-authority@0.7.1/+esm",
    "clsx": "https://cdn.jsdelivr.net/npm/clsx@2.1.1/+esm",
    "tailwind-merge": "https://cdn.jsdelivr.net/npm/tailwind-merge@3.6.0/+esm",
    "@radix-ui/react-slot": "https://cdn.jsdelivr.net/npm/@radix-ui/react-slot@1.2.3/+esm",
    "@radix-ui/react-accordion": "https://cdn.jsdelivr.net/npm/@radix-ui/react-accordion@1.2.7/+esm",
    "@base-ui/react/button": "https://cdn.jsdelivr.net/npm/@base-ui/react@1.6.0/button/+esm",
    "lucide-react": "https://cdn.jsdelivr.net/npm/lucide-react@0.474.0/+esm",
    "sonner": "https://cdn.jsdelivr.net/npm/sonner@2.0.0/+esm",
    "vaul": "https://cdn.jsdelivr.net/npm/vaul@1.1.2/+esm",
    "cmdk": "https://cdn.jsdelivr.net/npm/cmdk@1.1.1/+esm",
    "recharts": "https://cdn.jsdelivr.net/npm/recharts@3.8.0/+esm"
  }
}
</script>
```

Generated via a build script (`scripts/build-importmap.mts`) that reads `package.json` dependencies.

### 4. Static Export (`next.config.mjs`)

```mjs
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  // redirects() and rewrites() removed — moved to vercel.json
}
```

### 5. Route Handler Replacements

| Route | Replacement |
|-------|-------------|
| `app/og/route.tsx` | Static `public/opengraph-image.png` fallback |
| `app/typeset.css/route.ts` | Build script writes `public/typeset.css` |
| `app/rss.xml/route.ts` | Build script writes `public/rss.xml` |
| `app/r/registries.json/route.ts` | Build script writes `public/r/registries.json` |
| `app/api/search/route.ts` | Client-side search with pre-built `public/search-index.json` |
| `app/llm/[...slug]/route.ts` | Pre-render to static files |
| `init/*/route.ts` | Extract to standalone Vercel Functions |

---

## Verification

The jsdelivr CDN was tested and confirmed working:

```
✅ https://cdn.jsdelivr.net/gh/shadcn-ui/ui@{COMMIT}/apps/v4/public/r/index.json
✅ https://cdn.jsdelivr.net/gh/shadcn-ui/ui@{COMMIT}/apps/v4/public/r/config.json
✅ https://cdn.jsdelivr.net/gh/shadcn-ui/ui@{COMMIT}/apps/v4/public/r/styles/new-york-v4/button.json
✅ https://cdn.jsdelivr.net/gh/shadcn-ui/ui@{COMMIT}/apps/v4/public/r/styles/base-nova/button.json
```

All files are tracked in git and served correctly with commit hash. Production would use a tagged release (`@v4.0.0`).

---

## CDN URL Patterns

```
# CLI registry (already committed to git)
https://cdn.jsdelivr.net/gh/shadcn-ui/ui@{TAG}/apps/v4/public/r/styles/{style}/{name}.json
https://cdn.jsdelivr.net/gh/shadcn-ui/ui@{TAG}/apps/v4/public/r/index.json
https://cdn.jsdelivr.net/gh/shadcn-ui/ui@{TAG}/apps/v4/public/r/config.json
https://cdn.jsdelivr.net/gh/shadcn-ui/ui@{TAG}/apps/v4/public/r/colors/{color}.json
https://cdn.jsdelivr.net/gh/shadcn-ui/ui@{TAG}/apps/v4/public/r/styles/{style}/registry.json

# Docs site ESM components (generated by build-esm.mts)
https://cdn.jsdelivr.net/gh/shadcn-ui/ui@{TAG}/apps/v4/public/r/styles/{style}/esm/{name}.js
https://cdn.jsdelivr.net/gh/shadcn-ui/ui@{TAG}/apps/v4/public/r/esm/lib/utils.js
https://cdn.jsdelivr.net/gh/shadcn-ui/ui@{TAG}/apps/v4/public/r/esm/hooks/{name}.js
https://cdn.jsdelivr.net/gh/shadcn-ui/ui@{TAG}/apps/v4/public/r/examples/esm/{base}/{name}.js
```

---

## Implementation Status

| Component | Status | Details |
|-----------|--------|---------|
| ESM Build Script | ✅ Done | `scripts/build-esm.mts` — TypeScript API, caching, concurrency |
| Registry CDN URLs | ✅ Done | `lazyComponentExpression()` updated in `build-registry.mts` |
| Importmap | ✅ Done | Inline in `layout.tsx` + generator script `scripts/build-importmap.mts` |
| Static Export Config | ✅ Done | `next.config.mjs` with `output: 'export'` |
| Vercel Redirects | ✅ Done | `vercel.json` with all ~23 rules |
| Route Handlers | ✅ Done | 9 handlers disabled, replaced by build-time files |
| OG Images | ✅ Done | 7 page files updated to static `siteConfig.ogImage` |
| Revalidation | ✅ Done | Examples page: `revalidate: false` |
| Server Action | ✅ Done | `lib/blocks.ts`: `"use server"` removed |
| mdx-components | ⏸️ Deferred | Direct component imports need client wrapper pattern |
| CLI Registry URL | ⏳ External | `packages/shadcn/` — separate package scope |
| Build Verification | ⏳ Pending | Requires `bun run build` in production environment |

## Benefits

- **Vercel**: No serverless functions, static HTML/JS only, tiny bundle
- **CLI**: Unlimited requests via CDN, no rate limiting
- **Scale**: CDN edge caching, global availability
- **Cost**: Minimal Vercel usage (bandwidth through CDN)
- **Simplicity**: Static export = no server management
