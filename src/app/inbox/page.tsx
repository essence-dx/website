import { Inbox } from "@/components/inbox";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "DX Inbox — Document capture & management",
  description:
    "Capture documents and files from email, uploads, and messaging apps. DX organizes your digital assets for search and retrieval.",
  path: "/inbox",
  og: {
    title: "Inbox",
    description: "Documents captured and organized, automatically",
  },
  keywords: [
    "document management",
    "file capture",
    "document organization",
    "digital assets",
    "inbox",
  ],
});

export default function Page() {
  return <Inbox />;
}
