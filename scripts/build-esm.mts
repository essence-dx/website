import { createHash } from "crypto"
import { promises as fs } from "fs"
import { createRequire } from "module"
import { availableParallelism } from "os"
import path from "path"
import { rimraf } from "rimraf"

const require = createRequire(import.meta.url)
const ts = require("typescript")

const CPU_COUNT = availableParallelism()
const ESM_BUILD_CONCURRENCY = Math.max(2, Math.min(CPU_COUNT, 8))
const CACHE_ROOT = path.join(process.cwd(), "node_modules/.cache/build-esm")
const CACHE_MANIFEST_PATH = path.join(CACHE_ROOT, "manifest.json")

const CDN_BASE = process.env.CDN_BASE ?? "https://cdn.jsdelivr.net/gh/shadcn-ui/ui@latest/apps/v4/public/r"

const STYLE_ROOTS = [
  { base: "registry", prefix: "registry" },
]

const SHARED_SOURCE_ROOTS = [
  { dir: "lib", output: "esm/lib" },
  { dir: "hooks", output: "esm/hooks" },
]

type SourceEntry = {
  sourcePath: string
  outputPath: string
  styleName: string | null
}

type CacheManifest = Record<string, string>

let cacheManifest: CacheManifest = {}
let cacheDirty = false

function toPosixPath(filePath: string) {
  return filePath.split(path.sep).join("/")
}

function hashContent(content: string) {
  return createHash("sha256").update(content).digest("hex")
}

function rewriteImport(source: string, styleName: string | null): string {
  const CDN = CDN_BASE

  const patterns: Array<[RegExp, (match: string, ...groups: string[]) => string]> = [
    [
      /@\/styles\/([\w-]+)\/ui\/([\w-]+)/g,
      (_, _style, name) => `${CDN}/styles/${_style}/esm/${name}.js`,
    ],
    [
      /@\/registry\/([\w-]+)\/ui\/([\w-]+)/g,
      (_, _style, name) => `${CDN}/styles/${_style}/esm/${name}.js`,
    ],
    [
      /@\/registry\/([\w-]+)\/lib\/([\w-]+)/g,
      (_, _style, name) => `${CDN}/esm/lib/${name}.js`,
    ],
    [
      /@\/registry\/([\w-]+)\/hooks\/([\w-]+)/g,
      (_, _style, name) => `${CDN}/esm/hooks/${name}.js`,
    ],
    [
      /@\/lib\/([\w-]+)/g,
      (_, name) => `${CDN}/esm/lib/${name}.js`,
    ],
    [
      /@\/hooks\/([\w-]+)/g,
      (_, name) => `${CDN}/esm/hooks/${name}.js`,
    ],
    [
      /@\/components\/ui\/([\w-]+)/g,
      (_, name) => `${CDN}/styles/base-nova/esm/${name}.js`,
    ],
    [
      /@\/components\/([\w-]+)/g,
      (_, name) => `${CDN}/esm/components/${name}.js`,
    ],
  ]

  for (const [regex, replacer] of patterns) {
    source = source.replace(regex, replacer)
  }

  return source
}

function getTranspileOptions() {
  return {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2020,
      jsx: ts.JsxEmit.Automatic,
      jsxImportSource: "react",
      esModuleInterop: true,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
      allowImportingTsExtensions: false,
      noEmit: false,
      declaration: false,
      sourceMap: false,
      inlineSourceMap: false,
      removeComments: false,
    },
  }
}

function compileTsxToEsm(source: string, styleName: string | null): string {
  const sourceWithRewrittenImports = styleName !== null
    ? rewriteImport(source, styleName)
    : rewriteImport(source, null)

  const result = ts.transpileModule(sourceWithRewrittenImports, getTranspileOptions())

  let output = result.outputText
  output = output.replace(/export\s+default\s+/g, "export ")

  return output
}

async function collectStyleEntries(): Promise<SourceEntry[]> {
  const entries: SourceEntry[] = []

  const styleDir = path.join(process.cwd(), "styles")
  try {
    const styleNames = await fs.readdir(styleDir, { withFileTypes: true })
    for (const dirent of styleNames) {
      if (!dirent.isDirectory()) continue
      const styleName = dirent.name
      const uiDir = path.join(styleDir, styleName, "ui")
      try {
        const files = await fs.readdir(uiDir)
        for (const file of files) {
          if (!file.endsWith(".tsx")) continue
          entries.push({
            sourcePath: path.join(uiDir, file),
            outputPath: `styles/${styleName}/esm/${file.replace(/\.tsx$/, ".js")}`,
            styleName,
          })
        }
      } catch { }
    }
  } catch { }

  const legacyUIRoot = path.join(process.cwd(), "registry", "new-york-v4", "ui")
  try {
    const files = await fs.readdir(legacyUIRoot)
    for (const file of files) {
      if (!file.endsWith(".tsx")) continue
      entries.push({
        sourcePath: path.join(legacyUIRoot, file),
        outputPath: `styles/new-york-v4/esm/${file.replace(/\.tsx$/, ".js")}`,
        styleName: "new-york-v4",
      })
    }
  } catch { }

  return entries
}

async function collectSharedEntries(): Promise<SourceEntry[]> {
  const entries: SourceEntry[] = []

  for (const { dir, output } of SHARED_SOURCE_ROOTS) {
    const sourceDir = path.join(process.cwd(), dir)
    try {
      const files = await fs.readdir(sourceDir)
      for (const file of files) {
        if (!file.endsWith(".ts") && !file.endsWith(".tsx")) continue
        if (file.endsWith(".d.ts")) continue
        entries.push({
          sourcePath: path.join(sourceDir, file),
          outputPath: `${output}/${file.replace(/\.(ts|tsx)$/, ".js")}`,
          styleName: null,
        })
      }
    } catch { }
  }

  return entries
}

async function collectExampleEntries(): Promise<SourceEntry[]> {
  const entries: SourceEntry[] = []

  const examplesDir = path.join(process.cwd(), "examples")
  try {
    const baseDirs = await fs.readdir(examplesDir, { withFileTypes: true })
    for (const dirent of baseDirs) {
      if (!dirent.isDirectory()) continue
      const baseName = dirent.name
      const baseDir = path.join(examplesDir, baseName)
      const files = await collectTsFilesRecursive(baseDir)
      for (const file of files) {
        const relativePath = path.relative(baseDir, file)
        entries.push({
          sourcePath: file,
          outputPath: `examples/esm/${baseName}/${relativePath.replace(/\.tsx$/, ".js")}`,
          styleName: baseName,
        })
      }
    }
  } catch { }

  return entries
}

async function collectTsFilesRecursive(dir: string): Promise<string[]> {
  const results: string[] = []
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        results.push(...await collectTsFilesRecursive(fullPath))
      } else if (entry.isFile() && entry.name.endsWith(".tsx")) {
        results.push(fullPath)
      }
    }
  } catch { }
  return results
}

async function loadCache(): Promise<void> {
  try {
    const content = await fs.readFile(CACHE_MANIFEST_PATH, "utf8")
    cacheManifest = JSON.parse(content)
  } catch {
    cacheManifest = {}
  }
}

async function saveCache(): Promise<void> {
  if (!cacheDirty) return
  await fs.mkdir(CACHE_ROOT, { recursive: true })
  await fs.writeFile(CACHE_MANIFEST_PATH, JSON.stringify(cacheManifest, null, 2))
}

async function buildEsmEntry(entry: SourceEntry): Promise<boolean> {
  const sourceContent = await fs.readFile(entry.sourcePath, "utf8")
  const sourceHash = hashContent(sourceContent)
  const cacheKey = `${toPosixPath(path.relative(process.cwd(), entry.sourcePath))}`

  if (cacheManifest[cacheKey] === sourceHash) {
    return false
  }

  const compiled = compileTsxToEsm(sourceContent, entry.styleName)

  const outputFullPath = path.join(process.cwd(), "public", "r", entry.outputPath)
  await fs.mkdir(path.dirname(outputFullPath), { recursive: true })
  await fs.writeFile(outputFullPath, compiled)

  cacheManifest[cacheKey] = sourceHash
  cacheDirty = true
  return true
}

async function runWithConcurrency<T>(
  items: T[],
  limit: number,
  worker: (item: T) => Promise<void>
): Promise<void> {
  let index = 0
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (index < items.length) {
        await worker(items[index++])
      }
    })
  )
}

async function cleanOutputDirs(): Promise<void> {
  const publicRDir = path.join(process.cwd(), "public", "r")

  const dirsToClean = [
    path.join(publicRDir, "esm"),
    path.join(publicRDir, "styles"),
  ]

  for (const dir of dirsToClean) {
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true })
      for (const entry of entries) {
        if (entry.isDirectory()) {
          const esmDir = path.join(dir, entry.name, "esm")
          try {
            await rimraf(esmDir)
          } catch { }
        }
      }
    } catch { }
  }

  const examplesEsmDir = path.join(publicRDir, "examples", "esm")
  try {
    await rimraf(examplesEsmDir)
  } catch { }
}

async function main() {
  const totalStart = performance.now()

  console.log("\n🔧 Building ESM modules...")
  await loadCache()
  await cleanOutputDirs()

  console.log("\n📦 Collecting style components...")
  const styleEntries = await collectStyleEntries()
  console.log(`   Found ${styleEntries.length} style component files`)

  console.log("\n📦 Collecting shared modules...")
  const sharedEntries = await collectSharedEntries()
  console.log(`   Found ${sharedEntries.length} shared module files`)

  console.log("\n📦 Collecting example components...")
  const exampleEntries = await collectExampleEntries()
  console.log(`   Found ${exampleEntries.length} example component files`)

  const allEntries = [...styleEntries, ...sharedEntries, ...exampleEntries]
  console.log(`\n⚙️  Compiling ${allEntries.length} files to ESM...`)

  let builtCount = 0
  let skippedCount = 0

  await runWithConcurrency(allEntries, ESM_BUILD_CONCURRENCY, async (entry) => {
    const changed = await buildEsmEntry(entry)
    if (changed) builtCount++
    else skippedCount++
  })

  await saveCache()

  const elapsed = ((performance.now() - totalStart) / 1000).toFixed(2)
  console.log(`\n✅ ESM build complete in ${elapsed}s!`)
  console.log(`   ${builtCount} built, ${skippedCount} cached`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
