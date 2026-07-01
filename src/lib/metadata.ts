import type { Metadata } from "next";
import { baseUrl } from "@/app/sitemap";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  og?: { title: string; description: string };
  keywords?: string[];
  type?: "website" | "article";
  canonical?: boolean;
};

export function createPageMetadata(opts: PageMetadataOptions): Metadata {
  const url = `${baseUrl}${opts.path}`;
  const ogTitle = opts.og?.title ?? opts.title;
  const ogDesc = opts.og?.description ?? opts.description;
  const images = [{ url: `${baseUrl}/og.png`, width: 1200, height: 630 }];

  return {
    title: opts.title,
    description: opts.description,
    ...(opts.keywords && { keywords: opts.keywords }),
    openGraph: {
      title: opts.title,
      description: opts.description,
      type: opts.type ?? "website",
      url,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images,
    },
    ...(opts.canonical !== false && { alternates: { canonical: url } }),
  };
}
