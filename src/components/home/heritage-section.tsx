"use client";

import Image from "next/image";
import { brandStory } from "@/constants/branding";
import { BRAND_TIMELINE, BRAND_QUOTE } from "@/constants/home-content";
import { BRAND_STATS } from "@/constants/editorial";
import { Section } from "@/components/common/section";
import { Body, Eyebrow, Heading } from "@/components/common/typography";
import { MotionStagger, MotionItem } from "@/components/common/motion-wrapper";
import { BrandNumbers } from "@/components/editorial";

const TIMELINE_IMAGES = [
  "photo-1469334031218-e382a71b716b",
  "photo-1483985988355-763728e1935b",
  "photo-1509631179647-0177331693ae",
  "photo-1539533018447-63fcce2678e3",
];

const IMG = (id: string) =>
  `https://images.unsplash.com/${id}?w=200&q=80&auto=format&fit=crop`;

/**
 * Heritage — centred origin story + vertical timeline with inline thumbnails.
 * No image-column / text-column split.
 */
export function HeritageSection() {
  return (
    <Section
      id="story"
      spacing="md"
      background="gradient"
      eyebrow={brandStory.eyebrow}
      title={brandStory.heading}
      description={brandStory.body}
      headerAlign="center"
    >
      <BrandNumbers stats={BRAND_STATS} className="mb-10" />

      <MotionStagger className="mx-auto max-w-2xl space-y-0">
        {BRAND_TIMELINE.map((item, index) => (
          <MotionItem key={item.year}>
            <div className="relative flex gap-6 border-l border-border-subtle py-8 pl-8">
              <div className="absolute -left-[5px] top-10 h-2.5 w-2.5 rounded-full bg-foreground" />
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[var(--radius-lg)]">
                <Image
                  src={IMG(TIMELINE_IMAGES[index] ?? TIMELINE_IMAGES[0])}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div>
                <p className="font-display text-2xl font-light text-muted-foreground">
                  {item.year}
                </p>
                <h3 className="mt-1 font-display text-lg font-light">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          </MotionItem>
        ))}
      </MotionStagger>

      <blockquote className="mx-auto mt-12 max-w-3xl border-t border-border-subtle pt-10 text-center">
        <p className="font-display text-2xl font-light italic leading-snug md:text-3xl">
          &ldquo;{BRAND_QUOTE.text}&rdquo;
        </p>
        <cite className="mt-4 block text-sm not-italic text-muted-foreground">
          — {BRAND_QUOTE.attribution}
        </cite>
      </blockquote>
    </Section>
  );
}
