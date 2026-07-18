// Sitemap temporarily simplified - only the landing page and _not-found are active
import type { MetadataRoute } from "next";

export const baseUrl = "https://dx.tips";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date().toISOString().split("T")[0];

  const staticRoutes = [""].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
  }));

  return [...staticRoutes];
}
