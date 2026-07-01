import { Testimonials } from "@/components/testimonials";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Customer Stories",
  description:
    "See how developers use DX to build with less friction.",
  path: "/testimonials",
  og: {
    title: "Customer Stories",
    description: "How developers build with DX",
  },
  keywords: [
    "developer testimonials",
    "user stories",
    "DX reviews",
    "developer success",
    "testimonials",
  ],
});

export default function Page() {
  return <Testimonials />;
}
