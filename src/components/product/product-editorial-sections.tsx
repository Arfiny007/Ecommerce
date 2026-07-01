"use client";

import Image from "next/image";
import Link from "next/link";
import { getProductDetails } from "@/constants/product-details";
import { PRODUCT_EDITORIAL_DEFAULTS } from "@/constants/editorial";
import { getCompleteTheLook } from "@/constants/products";
import { Container } from "@/components/common/container";
import { Eyebrow, Heading, Body } from "@/components/common/typography";
import { ProductCard } from "@/components/home/featured-products";
import { EditorialQuote, FeatureColumns, ImageWithCaption } from "@/components/editorial";
import { Gift, Package, Sparkles, Truck } from "lucide-react";
import type { Product } from "@/types/product";

const IMG = (url: string) => url;

interface ProductEditorialSectionsProps {
  product: Product;
}

const PACKAGING_FEATURES = [
  { icon: Package, title: "Signature Box", description: "Rigid branded packaging with recycled tissue." },
  { icon: Gift, title: "Dust Bags", description: "Included for leather goods and footwear." },
  { icon: Truck, title: "Tracked Delivery", description: "Fully insured from our fulfilment centre." },
  { icon: Sparkles, title: "Gift Wrapping", description: "Available at checkout for $25." },
];

export function ProductEditorialSections({ product }: ProductEditorialSectionsProps) {
  const details = getProductDetails(product);
  const pairWith = getCompleteTheLook(product, 3);
  const textureImage = product.images[1] ?? product.images[0];

  return (
    <>
      <section className="border-t border-border-subtle bg-surface-muted py-12 md:py-14">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow>Craftsmanship</Eyebrow>
              <Heading className="mt-3 text-2xl md:text-3xl">How It&apos;s Made</Heading>
              <Body className="mt-4">{PRODUCT_EDITORIAL_DEFAULTS.craftsmanship}</Body>
              <div className="mt-6 space-y-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-editorial">Materials</p>
                  <p className="mt-2 text-sm text-muted-foreground">{details.materials}</p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-editorial">Dimensions &amp; Fit</p>
                  <p className="mt-2 text-sm text-muted-foreground">{details.dimensions}</p>
                </div>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
              <ImageWithCaption
                src={IMG(product.images[0])}
                alt={`${product.name} — full view`}
                caption="Full garment"
                aspectRatio="portrait"
              />
              <ImageWithCaption
                src={IMG(textureImage)}
                alt={`${product.name} — detail`}
                caption="Material detail"
                aspectRatio="portrait"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-border-subtle py-12 md:py-14">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <Eyebrow>Designer&apos;s Note</Eyebrow>
              <EditorialQuote
                text={PRODUCT_EDITORIAL_DEFAULTS.designerNote}
                attribution="FINY Design Studio, SoHo"
                variant="inline"
              />
            </div>
            <div>
              <Eyebrow>Styling</Eyebrow>
              <Heading className="mt-3 text-xl md:text-2xl">How to Wear</Heading>
              <Body className="mt-4">{PRODUCT_EDITORIAL_DEFAULTS.stylingAdvice}</Body>
              <Body className="mt-4">{details.care}</Body>
            </div>
          </div>
        </Container>
      </section>

      {pairWith.length > 0 && (
        <section className="border-t border-border-subtle bg-surface-muted py-12 md:py-14">
          <Container>
            <Eyebrow>Complete the Look</Eyebrow>
            <Heading className="mt-3 text-2xl md:text-3xl">Pair With</Heading>
            <Body className="mt-3 max-w-xl">
              Pieces from the same collection and complementary categories — curated to harmonise in palette and proportion.
            </Body>
            <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-3">
              {pairWith.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="border-t border-border-subtle py-12 md:py-14">
        <Container>
          <Eyebrow>Delivery</Eyebrow>
          <Heading className="mt-3 text-2xl md:text-3xl">Luxury Packaging</Heading>
          <Body className="mt-3 max-w-2xl">{PRODUCT_EDITORIAL_DEFAULTS.packaging}</Body>
          <FeatureColumns items={PACKAGING_FEATURES} columns={4} className="mt-8" />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-[var(--radius-xl)] border border-border-subtle p-6">
              <p className="text-xs font-medium uppercase tracking-editorial">Shipping</p>
              <p className="mt-2 text-sm text-muted-foreground">{details.shipping}</p>
              <Link href="/shipping" className="mt-3 inline-block text-sm underline underline-offset-4">
                Full shipping policy →
              </Link>
            </div>
            <div className="rounded-[var(--radius-xl)] border border-border-subtle p-6">
              <p className="text-xs font-medium uppercase tracking-editorial">Returns</p>
              <p className="mt-2 text-sm text-muted-foreground">{details.returns}</p>
              <Link href="/returns" className="mt-3 inline-block text-sm underline underline-offset-4">
                Returns &amp; exchanges →
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
