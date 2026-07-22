"use client";

import dynamic from "next/dynamic";

const HeroSection = dynamic(() =>
  import("@/components/animated-sections/hero-section").then(
    (m) => m.HeroSection,
  ),
);
const PhilosophySection = dynamic(() =>
  import("@/components/animated-sections/philosophy-section").then(
    (m) => m.PhilosophySection,
  ),
);
const FeaturedProductsSection = dynamic(() =>
  import("@/components/animated-sections/featured-products-section").then(
    (m) => m.FeaturedProductsSection,
  ),
);
const TechnologySection = dynamic(() =>
  import("@/components/animated-sections/technology-section").then(
    (m) => m.TechnologySection,
  ),
);
const GallerySection = dynamic(() =>
  import("@/components/animated-sections/gallery-section").then(
    (m) => m.GallerySection,
  ),
);
const CollectionSection = dynamic(() =>
  import("@/components/animated-sections/collection-section").then(
    (m) => m.CollectionSection,
  ),
);
const EditorialSection = dynamic(() =>
  import("@/components/animated-sections/editorial-section").then(
    (m) => m.EditorialSection,
  ),
);

export function LandingSections() {
  return (
    <>
      <HeroSection />
      <PhilosophySection />
      <FeaturedProductsSection />
      <TechnologySection />
      <GallerySection />
      <CollectionSection />
      <EditorialSection />
    </>
  );
}
