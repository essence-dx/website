import { StartPage } from "@/components/startpage";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "DX — Enhanced Development Experience",
  description:
    "Enhanced Development Experience with repository-managed tools for code, web, agents, media, search, serialization, and more.",
  path: "/",
  og: {
    title: "DX",
    description: "Enhanced Development Experience",
  },
});

export default function Page() {
  return <StartPage />;
}
