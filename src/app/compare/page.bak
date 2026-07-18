import { Button } from "@dx/ui/button";
import type { Metadata } from "next";
import Link from "next/link";
import { baseUrl } from "@/app/sitemap";
import { competitors } from "@/data/competitors";

const year = new Date().getFullYear();
const title = `DX vs Other Developer Tools (${year}) — Compare the Ecosystem`;
const description =
  "Compare DX to other developer tools and platforms. DX unifies code editing, builds, AI agents, web frameworks, media, and more into one cohesive ecosystem.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "developer tools comparison",
    "code editor alternative",
    "all-in-one developer platform",
    "developer ecosystem",
    "development tools",
  ],
  openGraph: {
    title,
    description,
    type: "website",
    url: `${baseUrl}/compare`,
    images: [
      {
        url: `${baseUrl}/og.png`,
        width: 1200,
        height: 630,
        alt: "Compare DX to alternatives",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${baseUrl}/og.png`],
  },
  alternates: {
    canonical: `${baseUrl}/compare`,
  },
};

export default function ComparePage() {
  return (
    <div className="min-h-screen pt-24 sm:pt-28 lg:pt-32 pb-24">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h1 className="font-serif text-3xl lg:text-4xl text-foreground mb-4">
            Compare DX to alternatives
          </h1>
          <p className="font-sans text-base text-muted-foreground max-w-2xl mx-auto">
            DX is a unified development ecosystem. Compare how DX stacks up
            against standalone tools across code, build, web, agents, and more.
          </p>
        </div>

        {/* Competitors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {competitors.map((competitor) => (
            <Link
              key={competitor.id}
              href={`/compare/${competitor.slug}`}
              className="border border-border p-6 hover:border-foreground/20 transition-all duration-200"
            >
              <h2 className="font-sans text-lg text-foreground mb-2">
                {competitor.name} Alternative
              </h2>
              <p className="font-sans text-sm text-muted-foreground mb-4 line-clamp-2">
                {competitor.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {competitor.keyDifferences.slice(0, 2).map((diff) => (
                  <span
                    key={diff.title}
                    className="font-sans text-xs text-muted-foreground bg-muted px-2 py-1"
                  >
                    {diff.dx}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-background border border-border p-8 lg:p-12 text-center relative before:absolute before:inset-0 before:bg-[repeating-linear-gradient(-60deg,rgba(219,219,219,0.4),rgba(219,219,219,0.4)_1px,transparent_1px,transparent_6px)] dark:before:bg-[repeating-linear-gradient(-60deg,rgba(44,44,44,0.4),rgba(44,44,44,0.4)_1px,transparent_1px,transparent_6px)] before:pointer-events-none">
          <div className="relative z-10">
            <h2 className="font-serif text-2xl text-foreground mb-4">
              Ready to try DX?
            </h2>
            <p className="font-sans text-base text-muted-foreground mb-6 max-w-xl mx-auto">
              Try DX and experience a unified development toolchain.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="btn-inverse h-11 px-6">
                <a href="https://github.com/essence-dx">Explore DX on GitHub</a>
              </Button>
              <Button asChild variant="outline" className="h-11 px-6">
                <Link href="/pricing">View pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
