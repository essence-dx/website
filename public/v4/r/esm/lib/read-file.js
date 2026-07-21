import { promises as fs } from "fs";
import path from "path";
export async function readFileFromRoot(relativePath) {
    const absolutePath = path.join(process.cwd(), relativePath);
    return fs.readFile(absolutePath, "utf-8");
}
