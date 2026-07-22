import { createFromSource } from "fumadocs-core/search/server"

import { source } from "@/lib/v4/source"

export const { GET } = createFromSource(source)
