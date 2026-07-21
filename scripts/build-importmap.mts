import { promises as fs } from "fs"
import path from "path"

const PACKAGE_JSON_PATH = path.join(process.cwd(), "package.json")
const OUTPUT_PATH = path.join(process.cwd(), "public", "r", "importmap.json")

const NPM_CDN = "https://cdn.jsdelivr.net/npm"

// Map of package names to their ESM entry points on jsdelivr
// These are the packages used by shadcn/ui components + examples
const PACKAGE_ESM_ENTRY: Record<string, (version: string) => string> = {
  "react": (v) => `/react@${v}/index.mjs`,
  "react-dom": (v) => `/react-dom@${v}/index.mjs`,
  "react/jsx-runtime": (v) => `/react@${v}/jsx-runtime.mjs`,
  "react/jsx-dev-runtime": (v) => `/react@${v}/jsx-dev-runtime.mjs`,
  "react-dom/client": (v) => `/react-dom@${v}/client.mjs`,
  "react-dom/server": (v) => `/react-dom@${v}/server.mjs`,
  "class-variance-authority": () => `/class-variance-authority@0.7.1/dist/index.mjs`,
  "clsx": () => `/clsx@2.1.1/dist/clsx.mjs`,
  "tailwind-merge": () => `/tailwind-merge@3.6.0/dist/bundle-esm.mjs`,
  "lucide-react": (v) => `/lucide-react@${v}/dist/esm/lucide-react.mjs`,
  "lucide-react/dynamic": (v) => `/lucide-react@${v}/dist/esm/dynamic.mjs`,
  "sonner": () => `/sonner@2.0.0/dist/index.mjs`,
  "cmdk": () => `/cmdk@1.1.1/dist/index.mjs`,
  "vaul": () => `/vaul@1.1.2/dist/index.mjs`,
  "input-otp": () => `/input-otp@1.4.2/dist/index.mjs`,
  "embla-carousel-react": () => `/embla-carousel-react@8.5.2/embla-carousel-react.mjs`,
  "embla-carousel-autoplay": () => `/embla-carousel-autoplay@8.5.2/embla-carousel-autoplay.mjs`,
  "react-day-picker": () => `/react-day-picker@9.7.0/dist/index.mjs`,
  "date-fns": () => `/date-fns@4.1.0/+esm`,
  "recharts": () => `/recharts@3.8.0/dist/index.mjs`,
  "react-resizable-panels": () => `/react-resizable-panels@4/dist/index.mjs`,
  "react-textarea-autosize": () => `/react-textarea-autosize@8.5.9/dist/react-textarea-autosize.mjs`,
  "react-hook-form": () => `/react-hook-form@7.62.0/dist/index.mjs`,
  "@hookform/resolvers": () => `/@hookform/resolvers@3.10.0/+esm`,
  "zod": () => `/zod@3.25.76/+esm`,
  "valibot": () => `/valibot@1.4.0/+esm`,
  "next-themes": () => `/next-themes@0.4.6/+esm`,
  "nuqs": () => `/nuqs@2.8.9/+esm`,
  "nuqs/adapters/next/app": () => `/nuqs@2.8.9/adapters/next/app.mjs`,
  "swr": () => `/swr@2.3.6/dist/index.mjs`,
  "lodash": () => `/lodash@4.17.23/+esm`,
  "change-case": () => `/change-case@5.4.4/+esm`,
  "lru-cache": () => `/lru-cache@11.2.4/dist/esm/index.mjs`,
  "framer-motion": () => `/framer-motion@12.12.1/dist/es/index.mjs`,

  // Radix UI packages
  "@radix-ui/react-slot": () => `/@radix-ui/react-slot@1.2.3/dist/index.mjs`,
  "@radix-ui/react-accordion": () => `/@radix-ui/react-accordion@1.2.7/dist/index.mjs`,
  "@radix-ui/react-alert-dialog": () => `/@radix-ui/react-alert-dialog@1.2.7/dist/index.mjs`,
  "@radix-ui/react-aspect-ratio": () => `/@radix-ui/react-aspect-ratio@1.2.3/dist/index.mjs`,
  "@radix-ui/react-avatar": () => `/@radix-ui/react-avatar@1.2.3/dist/index.mjs`,
  "@radix-ui/react-checkbox": () => `/@radix-ui/react-checkbox@1.3.1/dist/index.mjs`,
  "@radix-ui/react-collapsible": () => `/@radix-ui/react-collapsible@1.2.3/dist/index.mjs`,
  "@radix-ui/react-context-menu": () => `/@radix-ui/react-context-menu@1.2.7/dist/index.mjs`,
  "@radix-ui/react-dialog": () => `/@radix-ui/react-dialog@1.2.7/dist/index.mjs`,
  "@radix-ui/react-dropdown-menu": () => `/@radix-ui/react-dropdown-menu@1.2.7/dist/index.mjs`,
  "@radix-ui/react-hover-card": () => `/@radix-ui/react-hover-card@1.2.7/dist/index.mjs`,
  "@radix-ui/react-label": () => `/@radix-ui/react-label@1.2.3/dist/index.mjs`,
  "@radix-ui/react-menubar": () => `/@radix-ui/react-menubar@1.2.3/dist/index.mjs`,
  "@radix-ui/react-navigation-menu": () => `/@radix-ui/react-navigation-menu@1.2.7/dist/index.mjs`,
  "@radix-ui/react-popover": () => `/@radix-ui/react-popover@1.2.7/dist/index.mjs`,
  "@radix-ui/react-progress": () => `/@radix-ui/react-progress@1.2.3/dist/index.mjs`,
  "@radix-ui/react-radio-group": () => `/@radix-ui/react-radio-group@1.2.7/dist/index.mjs`,
  "@radix-ui/react-scroll-area": () => `/@radix-ui/react-scroll-area@1.2.6/dist/index.mjs`,
  "@radix-ui/react-select": () => `/@radix-ui/react-select@1.2.7/dist/index.mjs`,
  "@radix-ui/react-separator": () => `/@radix-ui/react-separator@1.2.3/dist/index.mjs`,
  "@radix-ui/react-slider": () => `/@radix-ui/react-slider@1.2.7/dist/index.mjs`,
  "@radix-ui/react-switch": () => `/@radix-ui/react-switch@1.2.3/dist/index.mjs`,
  "@radix-ui/react-tabs": () => `/@radix-ui/react-tabs@1.2.3/dist/index.mjs`,
  "@radix-ui/react-toggle": () => `/@radix-ui/react-toggle@1.2.3/dist/index.mjs`,
  "@radix-ui/react-toggle-group": () => `/@radix-ui/react-toggle-group@1.2.3/dist/index.mjs`,
  "@radix-ui/react-tooltip": () => `/@radix-ui/react-tooltip@1.2.7/dist/index.mjs`,

  // Base UI packages
  "@base-ui/react": () => `/@base-ui/react@1.6.0/+esm`,
  "@base-ui/react/button": () => `/@base-ui/react@1.6.0/button/+esm`,
  "@base-ui/react/accordion": () => `/@base-ui/react@1.6.0/accordion/+esm`,
  "@base-ui/react/alert-dialog": () => `/@base-ui/react@1.6.0/alert-dialog/+esm`,
  "@base-ui/react/avatar": () => `/@base-ui/react@1.6.0/avatar/+esm`,
  "@base-ui/react/checkbox": () => `/@base-ui/react@1.6.0/checkbox/+esm`,
  "@base-ui/react/collapsible": () => `/@base-ui/react@1.6.0/collapsible/+esm`,
  "@base-ui/react/combobox": () => `/@base-ui/react@1.6.0/combobox/+esm`,
  "@base-ui/react/dialog": () => `/@base-ui/react@1.6.0/dialog/+esm`,
  "@base-ui/react/drawer": () => `/@base-ui/react@1.6.0/drawer/+esm`,
  "@base-ui/react/dropdown-menu": () => `/@base-ui/react@1.6.0/menu/+esm`,
  "@base-ui/react/hover-card": () => `/@base-ui/react@1.6.0/hover-card/+esm`,
  "@base-ui/react/label": () => `/@base-ui/react@1.6.0/label/+esm`,
  "@base-ui/react/menubar": () => `/@base-ui/react@1.6.0/menubar/+esm`,
  "@base-ui/react/navigation-menu": () => `/@base-ui/react@1.6.0/navigation-menu/+esm`,
  "@base-ui/react/popover": () => `/@base-ui/react@1.6.0/popover/+esm`,
  "@base-ui/react/progress": () => `/@base-ui/react@1.6.0/progress/+esm`,
  "@base-ui/react/radio-group": () => `/@base-ui/react@1.6.0/radio-group/+esm`,
  "@base-ui/react/scroll-area": () => `/@base-ui/react@1.6.0/scroll-area/+esm`,
  "@base-ui/react/select": () => `/@base-ui/react@1.6.0/select/+esm`,
  "@base-ui/react/separator": () => `/@base-ui/react@1.6.0/separator/+esm`,
  "@base-ui/react/slider": () => `/@base-ui/react@1.6.0/slider/+esm`,
  "@base-ui/react/switch": () => `/@base-ui/react@1.6.0/switch/+esm`,
  "@base-ui/react/tabs": () => `/@base-ui/react@1.6.0/tabs/+esm`,
  "@base-ui/react/toggle": () => `/@base-ui/react@1.6.0/toggle/+esm`,
  "@base-ui/react/tooltip": () => `/@base-ui/react@1.6.0/tooltip/+esm`,

  // React Aria packages
  "react-aria-components": () => `/react-aria-components@1.8.0/+esm`,

  // Icons
  "@tabler/icons-react": () => `/@tabler/icons-react@3.31.0/+esm`,
  "@phosphor-icons/react": () => `/@phosphor-icons/react@2.1.10/+esm`,
  "@remixicon/react": () => `/@remixicon/react@4.7.0/+esm`,
  "@hugeicons/react": () => `/@hugeicons/react@1.1.1/+esm`,

  // UI utilities
  "class-variance-authority": () => `/class-variance-authority@0.7.1/dist/index.mjs`,
  "clsx": () => `/clsx@2.1.1/dist/clsx.mjs`,
  "tailwind-merge": () => `/tailwind-merge@3.6.0/dist/bundle-esm.mjs`,

  // DnD Kit
  "@dnd-kit/core": () => `/@dnd-kit/core@6.3.1/dist/index.mjs`,
  "@dnd-kit/modifiers": () => `/@dnd-kit/modifiers@9.0.0/dist/index.mjs`,
  "@dnd-kit/sortable": () => `/@dnd-kit/sortable@10.0.0/dist/index.mjs`,
  "@dnd-kit/utilities": () => `/@dnd-kit/utilities@3.2.2/dist/index.mjs`,

  // AI SDK
  "ai": () => `/ai@4.3.0/+esm`,
  "@ai-sdk/react": () => `/@ai-sdk/react@4.1.0/+esm`,
  "@tanstack/react-table": () => `/@tanstack/react-table@8.9.1/dist/index.mjs`,

  // Motion
  "motion": () => `/motion@12.12.1/dist/es/index.mjs`,

  // Radix UI (monolithic package)
  "radix-ui": () => `/radix-ui@1.4.3/+esm`,

  // Other
  "@tanstack/react-form": () => `/@tanstack/react-form@1.20.0/dist/index.mjs`,
  "jotai": () => `/jotai@2.15.0/dist/index.mjs`,
  "little-date": () => `/little-date@1.0.0/+esm`,
  "react-qr-code": () => `/react-qr-code@2.0.18/+esm`,
  "sanitize-html": () => `/sanitize-html@2.14.0/+esm`,
  "chrono-node": () => `/chrono-node@2.8.2/+esm`,

  // @shadcn packages
  "@shadcn/react": () => `/@shadcn/react@latest/+esm`,
  "@shadcn/helpers": () => `/@shadcn/helpers@latest/+esm`,
  "shadcn": () => `/shadcn@4.13.0/+esm`,
  "shadcn/schema": () => `/shadcn@4.13.0/schema/+esm`,
  "shadcn/utils": () => `/shadcn@4.13.0/utils/+esm`,
}

async function main() {
  const pkg = JSON.parse(await fs.readFile(PACKAGE_JSON_PATH, "utf8"))
  const allDeps = { ...pkg.dependencies, ...pkg.devDependencies }

  const importmap: Record<string, string> = {}
  const scopedPackages: Record<string, string> = {}

  for (const [name, version] of Object.entries(allDeps)) {
    const entryFn = PACKAGE_ESM_ENTRY[name]
    if (!entryFn) continue

    const cleanVersion = (version as string).replace(/^[\^~]/, "")
    const cdnPath = entryFn(cleanVersion)
    const url = `${NPM_CDN}${cdnPath}`

    if (name.startsWith("@")) {
      scopedPackages[name] = url
    } else {
      importmap[name] = url
    }
  }

  // Add JSX runtime entries
  importmap["react/jsx-runtime"] = PACKAGE_ESM_ENTRY["react/jsx-runtime"](
    (allDeps["react"] as string || "19.2.3").replace(/^[\^~]/, "")
  )

  const finalImportmap = {
    imports: {
      ...importmap,
      ...scopedPackages,
    },
  }

  await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true })
  await fs.writeFile(OUTPUT_PATH, JSON.stringify(finalImportmap, null, 2))

  console.log(`\n✅ Importmap generated: ${OUTPUT_PATH}`)
  console.log(`   ${Object.keys(finalImportmap.imports).length} packages mapped`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
