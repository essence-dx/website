import { PreAccounting } from "@/components/pre-accounting";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "DX Check — Automated Validation",
  description:
    "Automated validation and scoring for your projects. DX runs checks across correctness, performance, security, style, and testing categories.",
  path: "/pre-accounting",
  og: {
    title: "DX Check",
    description: "Validation that runs itself",
  },
  keywords: [
    "code validation",
    "project scoring",
    "automated checks",
    "code quality",
    "developer tools",
  ],
});

export default function Page() {
  return <PreAccounting />;
}
