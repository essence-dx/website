import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { baseUrl } from "@/app/sitemap";
import { ComparisonPage } from "@/components/comparison-page";
import { getAllCompetitorSlugs, getCompetitorBySlug } from "@/data/competitors";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllCompetitorSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const competitor = getCompetitorBySlug(slug);

  if (!competitor) {
    return {
      title: "Comparison Not Found",
    };
  }

  const year = new Date().getFullYear();
  const title = `Best ${competitor.name} Alternative for Founders (${year}) | DX`;
  const description = `Looking for a ${competitor.name} alternative? Switch to DX - built for developers, not tool jugglers. Compare features, pricing, and see why teams are making the switch.`;
  const url = `${baseUrl}/compare/${slug}`;

  return {
    title,
    description,
    keywords: [
      `${competitor.name.toLowerCase()} alternative`,
      `${competitor.name.toLowerCase()} alternative ${year}`,
      `${competitor.name.toLowerCase()} vs dx`,
      `switch from ${competitor.name.toLowerCase()}`,
      `${competitor.name.toLowerCase()} pricing`,
      `${competitor.name.toLowerCase()} competitor`,
      "developer tools for teams",
      "DX tools for developers",
      "build monitoring",
      "agent orchestration",
      "developer tools",
      "dev tool ecosystem",
    ],
    openGraph: {
      title,
      description,
      type: "website",
      url,
      images: [
        {
          url: `${baseUrl}/og.png`,
          width: 1200,
          height: 630,
          alt: `DX vs ${competitor.name} comparison`,
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
      canonical: url,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const competitor = getCompetitorBySlug(slug);

  if (!competitor) {
    notFound();
  }

  const year = new Date().getFullYear();

  // Main page structured data
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Best ${competitor.name} Alternative for Founders (${year})`,
    description: `Looking for a ${competitor.name} alternative? Switch to DX - built for developers, not tool jugglers.`,
    url: `${baseUrl}/compare/${slug}`,
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "DX",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, macOS",
      description:
        "Developer tools for build monitoring, agent orchestration, code review, and project insights. Built for teams, not enterprises.",
      offers: {
        "@type": "Offer",
        price: "23",
        priceCurrency: "USD",
        description:
          "Starting at $23/month billed yearly with 14-day free trial",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5",
        ratingCount: "100",
      },
    },
    about: {
      "@type": "SoftwareApplication",
      name: competitor.name,
      applicationCategory: "BusinessApplication",
    },
  };

  // FAQ structured data for rich results
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: competitor.faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ComparisonPage competitor={competitor} />
    </>
  );
}
