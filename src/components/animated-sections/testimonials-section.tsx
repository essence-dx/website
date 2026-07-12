"use client";

import Image from "next/image";

export function TestimonialsSection() {
  return (
    <section id="about" className="bg-background">
      <div className="relative aspect-[16/9] w-full">
        <Image
          src="/images/landing/testimonial-house.png"
          alt="Modern development environment"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        <div className="absolute inset-0 flex items-end justify-center px-6 pb-16 md:px-12 md:pb-24 lg:px-20 lg:pb-32">
          <p className="mx-auto max-w-5xl text-2xl leading-relaxed text-white md:text-3xl lg:text-[2.5rem] lg:leading-snug text-center">
            A platform that combines modern design with developer productivity &mdash;
            built for those who refuse to choose between speed and quality.
          </p>
        </div>
      </div>
    </section>
  );
}
