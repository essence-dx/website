import { FileStorage } from "@/components/file-storage";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "DX File Storage — Centralized Project Assets",
  description:
    "Store and organize all your project assets in one secure place. Access builds, configs, docs, and media files anytime. Built for developer teams.",
  path: "/file-storage",
  og: {
    title: "File Storage",
    description: "All your project assets in one place",
  },
  keywords: [
    "document storage",
    "project file storage",
    "secure document vault",
    "build storage",
    "asset management",
  ],
});

export default function Page() {
  return <FileStorage />;
}
