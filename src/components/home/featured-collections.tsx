"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { COLLECTION_EDITORIAL } from "@/constants/home-content";
import { SectionLinkAction } from "@/components/common/section-header";
import { Section } from "@/components/common/section";
import { MotionStagger, MotionItem } from "@/components/common/motion-wrapper";
import { PremiumImage } from "@/components/common/premium-image";
import { cn } from "@/lib/utils";

export function FeaturedCollections() {
  return (
    <Section
      spacing="lg"
      eyebrow="Collections"
      title="The Edit"
      description="Curated worlds of style — each collection a distinct narrative."
      action={<SectionLinkAction href="/shop" label="View All" />}
    >
      <MotionStagger className="flex flex-col gap-[var(--space-8)]">
        {COLLECTION_EDITORIAL.map((collection, index) => (
          <MotionItem key={collection.slug}>
            <Link
              href={`/shop?category=${collection.slug}`}
              className="group relative block overflow-hidden rounded-[var(--radius-3xl)]"
            >
              <div
                className={cn(
                  "grid items-center gap-0 md:grid-cols-12",
                  index % 2 === 1 && "md:[direction:rtl]"
                )}
              >
                <div className="relative md:col-span-7 md:[direction:ltr]">
                  <PremiumImage
                    src={`https://images.unsplash.com/${collection.image}?w=1200&q=85&auto=format&fit=crop`}
                    alt={collection.title}
                    aspectRatio="landscape"
                    rounded="3xl"
                    containerClassName="md:rounded-r-none md:rounded-l-[var(--radius-3xl)]"
                    sizes="(max-width: 768px) 100vw, 58vw"
                    priority={index === 0}
                  />
                  <motion.div
                    className="absolute inset-0 bg-foreground/0 transition-luxury group-hover:bg-foreground/10"
                    aria-hidden
                  />
                </div>

                <div className="relative surface-muted p-8 md:col-span-5 md:p-12 md:[direction:ltr]">
                  <span className="font-display text-6xl font-light text-foreground/10">
                    {collection.index}
                  </span>
                  <p className="mt-4 text-xs uppercase tracking-editorial text-muted-foreground">
                    {collection.count} pieces
                  </p>
                  <h3 className="mt-2 font-display text-3xl font-light md:text-4xl">
                    {collection.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">{collection.subtitle}</p>

                  <motion.div
                    initial={false}
                    className="mt-8 flex items-center gap-2 text-sm font-medium opacity-0 transition-luxury group-hover:opacity-100"
                  >
                    <span>Explore Collection</span>
                    <ArrowUpRight className="h-4 w-4 transition-luxury group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </motion.div>

                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-foreground transition-all duration-700 group-hover:w-full" />
                </div>
              </div>
            </Link>
          </MotionItem>
        ))}
      </MotionStagger>
    </Section>
  );
}
