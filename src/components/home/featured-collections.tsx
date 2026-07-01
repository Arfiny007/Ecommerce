"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { COLLECTION_EDITORIAL } from "@/constants/home-content";
import { CATEGORY_COPY } from "@/constants/content/catalog";
import { SectionLinkAction } from "@/components/common/section-header";
import { Section } from "@/components/common/section";
import { MotionStagger, MotionItem } from "@/components/common/motion-wrapper";

const IMG = (id: string) =>
  `https://images.unsplash.com/${id}?w=1400&q=85&auto=format&fit=crop`;

/** Full-bleed stacked cards — text overlaid on imagery, no side-by-side splits */
export function FeaturedCollections() {
  return (
    <Section
      spacing="md"
      eyebrow="Collections"
      title="The Edit"
      description="Three worlds of style — enter each through a single frame."
      action={<SectionLinkAction href="/shop" label="View All" />}
    >
      <MotionStagger className="flex flex-col gap-4">
        {COLLECTION_EDITORIAL.map((collection) => (
          <MotionItem key={collection.slug}>
            <Link
              href={`/shop?category=${collection.slug}`}
              className="group relative block overflow-hidden rounded-[var(--radius-3xl)]"
            >
              <div className="relative aspect-[4/5] md:aspect-[21/9]">
                <Image
                  src={IMG(collection.image)}
                  alt={collection.title}
                  fill
                  className="image-hover-zoom-subtle"
                  sizes="100vw"
                  priority={collection.index === "01"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/25 to-foreground/10" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                  <div className="flex items-end justify-between gap-6">
                    <div className="max-w-xl">
                      <span className="font-display text-5xl font-light text-background/30 md:text-7xl">
                        {collection.index}
                      </span>
                      <p className="mt-2 text-xs uppercase tracking-editorial text-background/60">
                        {collection.count} pieces
                      </p>
                      <h3 className="mt-2 font-display text-3xl font-light text-background md:text-5xl">
                        {collection.title}
                      </h3>
                      <p className="mt-3 max-w-md text-sm text-background/80">
                        {CATEGORY_COPY[collection.slug]?.editorial ?? collection.subtitle}
                      </p>
                    </div>
                    <span className="hidden shrink-0 items-center gap-2 text-sm font-medium text-background opacity-0 transition-luxury group-hover:opacity-100 md:flex">
                      Explore
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </MotionItem>
        ))}
      </MotionStagger>
    </Section>
  );
}
