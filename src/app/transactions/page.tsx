import { Transactions } from "@/components/transactions";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "DX Activity Feed",
  description:
    "Every operation across your DX tools in one timeline. Builds, agent runs, media operations, search queries, and more.",
  path: "/transactions",
  og: {
    title: "Transactions",
    description: "Every operation, automatically tracked",
  },
  keywords: [
    "activity feed",
    "toolchain activity",
    "operation tracking",
    "development activity",
    "DX tools",
  ],
});

export default function Page() {
  return <Transactions />;
}
