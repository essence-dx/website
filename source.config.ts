import { defineConfig, defineDocs } from "fumadocs-mdx/config"

export default defineConfig({
  mdxOptions: {
    rehypePlugins: (plugins) => {
      plugins.shift()
      return plugins
    },
  },
})

export const docs = defineDocs({
  dir: "content/docs",
})