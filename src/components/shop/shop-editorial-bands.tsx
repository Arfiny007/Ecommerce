"use client";

import Link from "next/link";
import Image from "next/image";
import { SHOP_EDITORIAL } from "@/constants/editorial";
import { getCategoryCopy } from "@/constants/content/catalog";
import { CATEGORIES } from "@/constants/products";
import { Container } from "@/components/common/container";
import { Eyebrow, Heading, Body } from "@/components/common/typography";
import {
  CampaignBanner,
  FeatureColumns,
  MaterialShowcase,
  EditorialDivider,
} from "@/components/editorial";

const IMG = (id: string) =>
  `https://images.unsplash.com/${id}?w=900&q=85&auto=format&fit=crop`;

interface ShopEditorialBandsProps {
  showSeasonBanner?: boolean;
  showCategoryStories?: boolean;
}

export function ShopEditorialBands({
  showSeasonBanner = true,
  showCategoryStories = true,
}: ShopEditorialBandsProps) {
  const { seasonBanner, shoppingBenefits, styleAdvice, fabricGuide, featuredLooks } =
    SHOP_EDITORIAL;

  return (
    <>
      {showSeasonBanner && (
        <div className="border-b border-border-subtle bg-surface-muted py-10 md:py-12">
          <Container>
            <CampaignBanner
              eyebrow={seasonBanner.eyebrow}
              title={seasonBanner.title}
              body={seasonBanner.body}
              image={IMG(seasonBanner.image)}
              href={seasonBanner.href}
              ctaLabel="Shop the Season"
            />
          </Container>
        </div>
      )}

      {showCategoryStories && (
        <div className="border-b border-border-subtle py-10 md:py-12">
          <Container>
            <Eyebrow>Categories</Eyebrow>
            <Heading className="mt-3">Shop by World</Heading>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {CATEGORIES.map((cat) => {
                const copy = getCategoryCopy(cat.slug);
                return (
                  <Link
                    key={cat.slug}
                    href={`/shop?category=${cat.slug}`}
                    className="group rounded-[var(--radius-2xl)] border border-border-subtle p-6 transition-luxury hover:border-border"
                  >
                    <h3 className="font-display text-xl font-light">{cat.label}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {copy?.description ?? cat.description}
                    </p>
                    <p className="mt-3 text-xs text-muted-foreground">
                      {cat.count} pieces →
                    </p>
                  </Link>
                );
              })}
            </div>
          </Container>
        </div>
      )}

      <div className="border-b border-border-subtle py-10 md:py-12">
        <Container>
          <FeatureColumns items={shoppingBenefits} columns={4} />
        </Container>
      </div>

      <div className="border-b border-border-subtle bg-surface-muted py-10 md:py-12">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <Eyebrow>Style Guide</Eyebrow>
              <Heading className="mt-3">{styleAdvice.title}</Heading>
              <ul className="mt-6 space-y-6">
                {styleAdvice.items.map((item) => (
                  <li key={item.heading} className="border-l-2 border-foreground pl-4">
                    <p className="text-sm font-medium">{item.heading}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Eyebrow>Materials</Eyebrow>
              <Heading className="mt-3">{fabricGuide.title}</Heading>
              <MaterialShowcase fabrics={fabricGuide.fabrics} className="mt-6" />
            </div>
          </div>
        </Container>
      </div>

      <div className="border-b border-border-subtle py-10 md:py-12">
        <Container>
          <EditorialDivider label="Featured Looks" />
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {featuredLooks.map((look) => (
              <article key={look.title} className="group overflow-hidden rounded-[var(--radius-2xl)]">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={IMG(look.image)}
                    alt={look.title}
                    fill
                    className="image-hover-zoom"
                    sizes="33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-background">
                    <h3 className="font-display text-xl font-light">{look.title}</h3>
                    <p className="mt-1 text-xs text-background/80">{look.pieces}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
}
