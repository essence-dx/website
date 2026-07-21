import { promises as fs } from "fs"
import path from "path"

export function resolveV4Path(relativePath: string) {
  const startsWithApp = relativePath.startsWith("/app/") || relativePath.startsWith("app/")
  const adjusted = startsWithApp
    ? relativePath.replace(/^\/?app\//, "src/app/v4/")
    : relativePath
  return path.join(/* turbopackIgnore: true */ process.cwd(), adjusted)
}

export async function readFileFromRoot(relativePath: string) {
  return fs.readFile(resolveV4Path(relativePath), "utf-8")
}
