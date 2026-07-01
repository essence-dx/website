import { GeistPixelLine } from "geist/font/pixel";
import { Agents } from "@/components/agents";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Agents — AI agents for your toolchain",
  description:
    "DX agents let you automate code, builds, deployments, and more from any AI tool via MCP.",
  path: "/agents",
  og: { title: "Agents", description: "Let AI agents manage your toolchain" },
  keywords: [
    "agent native cli",
    "developer infrastructure for agents",
    "MCP",
    "DX CLI",
    "development automation",
    "toolchain automation",
  ],
});

export default function Page() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            :root, .dark {
              --background: 225, 70%, 22% !important;
              --foreground: 0, 0%, 100% !important;
              --muted-foreground: 225, 60%, 75% !important;
              --border: 225, 50%, 35% !important;
              --primary: 0, 0%, 100% !important;
              --primary-foreground: 225, 70%, 22% !important;
              --muted: 225, 60%, 18% !important;
              --secondary: 225, 70%, 22% !important;
              --secondary-foreground: 0, 0%, 100% !important;
            }
            footer img,
            footer svg {
              filter: sepia(0.4) hue-rotate(180deg) saturate(1.5) brightness(0.9);
            }
            img[src*="accounting-"],
            img[src*="header-dock-"] {
              filter: sepia(0.6) hue-rotate(180deg) saturate(2) brightness(0.9);
            }
            footer button[aria-label="Toggle theme"] {
              display: none;
            }
          `,
        }}
      />
      <Agents pixelFontClass={GeistPixelLine.className} />
    </>
  );
}
