import { createMDX } from "fumadocs-mdx/next"

/** @type {import("next").NextConfig} */
const config = {
  poweredByHeader: false,
  reactStrictMode: true,
  trailingSlash: true,
  transpilePackages: ["@dx/ui", "@dx/app-store", "next-mdx-remote"],
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    inlineCss: true,
    optimizePackageImports: [
      "react-icons",
      "motion",
      "@dx/ui",
      "@radix-ui/react-icons",
      "lucide-react",
    ],
  },
  images: {
    unoptimized: true,
    qualities: [50, 75],
  },
};

const withMDX = createMDX({})
export default withMDX(config)
