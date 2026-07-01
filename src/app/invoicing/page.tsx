import { Invoicing } from "@/components/invoicing";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "DX Transactions & Insights",
  description:
    "Track your DX toolchain activity. Build statuses, agent runs, media operations, search queries, and more in one unified timeline.",
  path: "/invoicing",
  og: {
    title: "Invoicing",
    description: "Track your toolchain activity",
  },
  keywords: [
    "activity tracking",
    "toolchain insights",
    "development metrics",
    "build tracking",
    "developer tools",
  ],
});

export default function Page() {
  return <Invoicing />;
}
