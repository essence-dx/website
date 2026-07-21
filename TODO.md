# TODO: CDN-First Static Export Implementation

> Status: Phases 1-5, 7-8 ✅ | Phase 6 ⏸️ Deferred

---

## ✅ Phase 1: ESM Build Script

- [x] **Create `scripts/build-esm.mts`**
  - [x] Read component sources from `styles/{style}/ui/*.tsx` and `registry/{style}/ui/*.tsx`
  - [x] Compile TSX → ESM JS using TypeScript's `transpileModule` API (esbuild unavailable in dependency chain)
  - [x] Rewrite `@/` imports → CDN URLs
  - [x] Output to `public/r/styles/{style}/esm/{name}.js`
  - [x] Compile shared modules (`lib/utils.ts`, `hooks/*.ts`) → `public/r/esm/lib/*.js`, `public/r/esm/hooks/*.js`
  - [x] Compile example components (`examples/{base}/*.tsx`) → `public/r/examples/esm/{base}/*.js`
  - [x] Handle `export default` → named export conversion
  - [x] Parallelize with configurable concurrency
  - [x] Caching mechanism (hash-based manifest)

- [x] **Updated `package.json` build script**
  - [x] Added `bun run ./scripts/build-esm.mts` to build chain

## ✅ Phase 2: Modify Registry Component Imports

- [x] **Modified `scripts/build-registry.mts`**
  - [x] Updated `lazyComponentExpression()` (line 248) to generate CDN import URLs
  - [x] Handles all import path patterns: `@/registry/{style}/ui/`, `@/styles/{style}/ui/`, `@/registry/bases/{base}/ui/`, `./{base}/{name}`
  - [x] Falls back to local import for unrecognized patterns
  - [x] Uses `CDN_BASE` from env var or default

## ✅ Phase 3: Importmap Configuration

- [x] **Created `scripts/build-importmap.mts`**
  - [x] Maps 60+ npm packages to jsdelivr ESM URLs
  - [x] Covers: React, Radix UI, Base UI, React Aria, DnD Kit, Recharts, Framer Motion, icons, utilities
  - [x] Handles scoped packages (`@radix-ui/*`, `@base-ui/*`, etc.)
  - [x] Outputs `public/r/importmap.json`

- [x] **Added importmap to `app/layout.tsx`**
  - [x] Inline `<script type="importmap">` in `<head>`
  - [x] Covers all npm deps used by shadcn components

## ✅ Phase 4: Static Export Configuration

- [x] **Modified `next.config.mjs`**
  - [x] Added `output: 'export'`
  - [x] Added `images: { unoptimized: true }`
  - [x] Removed `redirects()` — moved to `vercel.json`
  - [x] Removed `rewrites()` — moved to `vercel.json`
  - [x] Kept `experimental.optimizePackageImports`

- [x] **Created `vercel.json`**
  - [x] All ~23 redirect rules migrated from `next.config.mjs`

## ✅ Phase 5: Route Handler Replacements

- [x] **Disabled 9 route handlers** (renamed to `*.route.disabled.ts`):
  - [x] `app/og/route.tsx` — Replaced with static `opengraph-image.png` / `og.jpg` fallback
  - [x] `app/typeset.css/route.ts` — Build script writes `public/typeset.css`
  - [x] `app/rss.xml/route.ts` — Build script writes `public/rss.xml`
  - [x] `app/r/registries.json/route.ts` — Build script writes `public/r/registries.json`
  - [x] `app/api/search/route.ts` — Build script writes `public/r/search-index.json`
  - [x] `app/llm/[...slug]/route.ts` — Disabled (needs standalone deployment)
  - [x] `app/(app)/(create)/init/route.ts` — Disabled (extract to standalone Vercel Function)
  - [x] `app/(app)/(create)/init/v0/route.ts` — Disabled (extract to standalone Vercel Function)
  - [x] `app/(app)/(create)/init/md/route.ts` — Disabled (extract to standalone Vercel Function)

- [x] **Created `scripts/build-static-files.mts`**
  - [x] Generates `public/typeset.css`
  - [x] Generates `public/rss.xml`
  - [x] Generates `public/r/registries.json` from `registry/directory.json`
  - [x] Generates `public/r/search-index.json`

## ⏸️ Phase 6: Direct Component Import Fixes (Deferred)

- [ ] `mdx-components.tsx` — 7 components imported directly (Accordion, Alert, AspectRatio, Button, Kbd, Tabs)
- [ ] Need to create client wrappers with CDN `React.lazy()` imports
- [ ] **Why deferred**: These components are used by the MDX renderer at build time (server rendering). Moving them to CDN imports requires the compiled ESM modules to be available during the Next.js build itself, creating a circular dependency. For now, these remain bundled.

## ✅ Phase 7: Content & Metadata Fixes

- [x] **Fixed OG image references in 7 page files:**
  - [x] `(root)/page.tsx` — 2 occurrences → `siteConfig.ogImage`
  - [x] `docs/[...slug]/page.tsx` — 2 occurrences → `siteConfig.ogImage`
  - [x] `colors/layout.tsx` — 2 occurrences → `siteConfig.ogImage`
  - [x] `blocks/layout.tsx` — 2 occurrences → `siteConfig.ogImage`
  - [x] `docs/changelog/page.tsx` — 1 occurrence → `siteConfig.ogImage`
  - [x] `examples/layout.tsx` — 2 occurrences → `siteConfig.ogImage`
  - [x] `charts/layout.tsx` — 2 occurrences → `siteConfig.ogImage`

- [x] **Fixed revalidation**
  - [x] `examples/[base]/[name]/page.tsx`: `revalidate = 3600` → `revalidate = false`

- [x] **Removed server action**
  - [x] `lib/blocks.ts`: Removed `"use server"` directive

## ✅ Phase 8: Build & Deploy Pipeline

- [x] **Updated `package.json` build script**
  - [x] `"build": "pnpm registry:build && bun run ./scripts/build-esm.mts && bun run ./scripts/build-static-files.mts && bun run ./scripts/build-importmap.mts && next build"`

- [x] **All build scripts created**
  - [x] `scripts/build-esm.mts` — ESM compilation
  - [x] `scripts/build-static-files.mts` — Static file generation
  - [x] `scripts/build-importmap.mts` — Importmap generation

## ⏳ Phase 9: CLI Registry URL Update (External)

- [ ] Update `packages/shadcn/src/registry/constants.ts`:
  ```ts
  export const REGISTRY_URL = process.env.REGISTRY_URL
    ?? "https://cdn.jsdelivr.net/gh/shadcn-ui/ui@latest/apps/v4/public/r"
  ```
- [ ] This is in a different package (`packages/shadcn/`) — not in `apps/v4/` scope

## ⏳ Phase 10: Cleanup & Verification

- [ ] Verify `publish/r/` directory has all expected ESM output
- [ ] Run `pnpm build` and confirm static export succeeds
- [ ] Deploy static export to Vercel
- [ ] Verify component previews load from CDN
- [ ] Verify all redirects work (from vercel.json)
- [ ] Create a Git tag for the CDN version reference

---

## Files Changed Summary

### New files
| File | Purpose |
|------|---------|
| `scripts/build-esm.mts` | Compiles component TSX → ESM JS bundles for CDN |
| `scripts/build-static-files.mts` | Generates static files replacing route handlers |
| `scripts/build-importmap.mts` | Generates npm package → CDN URL import map |
| `vercel.json` | Vercel deployment config with redirects |

### Modified files
| File | Change |
|------|--------|
| `next.config.mjs` | `output: 'export'`, `images.unoptimized`, removed redirects/rewrites |
| `package.json` | Updated build script with ESM + static files + importmap steps |
| `app/layout.tsx` | Added inline importmap for npm packages |
| `scripts/build-registry.mts` | `lazyComponentExpression()` now emits CDN URLs |
| `lib/blocks.ts` | Removed `"use server"` directive |
| `app/(view)/examples/[base]/[name]/page.tsx` | `revalidate: false` |
| 7 page files with OG metadata | Replaced `/og?title=` with `siteConfig.ogImage` |

### Disabled files
| File | Reason |
|------|--------|
| 9 route handler files | Incompatible with `output: 'export'` |
