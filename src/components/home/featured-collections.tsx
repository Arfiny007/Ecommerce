import Link from "next/link";
import Image from "next/image";
import { SectionLinkAction } from "@/components/common/section-header";
import { Section } from "@/components/common/section";
import { MotionStagger, MotionItem } from "@/components/common/motion-wrapper";
import { PremiumImage } from "@/components/common/premium-image";

const COLLECTIONS = [
  {
    title: "Ready-to-Wear",
    slug: "ready-to-wear",
    image: "photo-1539533018447-63fcce2678e3",
    count: 24,
  },
  {
    title: "Accessories",
    slug: "accessories",
    image: "photo-1548036328-c9fa89d128fa",
    count: 18,
  },
  {
    title: "Footwear",
    slug: "footwear",
    image: "photo-1614252235316-8c857d38b5f4",
    count: 12,
  },
];

export function FeaturedCollections() {
  return (
    <Section
      eyebrow="Collections"
      title="Curated Categories"
      action={<SectionLinkAction href="/shop" label="View All" />}
    >
      <MotionStagger className="grid gap-[var(--grid-gap)] md:grid-cols-3">
        {COLLECTIONS.map((collection, index) => (
          <MotionItem key={collection.slug}>
            <Link
              href={`/shop?category=${collection.slug}`}
              className="group relative block overflow-hidden rounded-[var(--radius-3xl)]"
            >
              <PremiumImage
                src={`https://images.unsplash.com/${collection.image}?w=800&q=85&auto=format&fit=crop`}
                alt={collection.title}
                aspectRatio="portrait"
                rounded="3xl"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority={index === 0}
                overlay
              />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-xs tracking-[var(--tracking-wide)] text-white/70">
                  {collection.count} pieces
                </p>
                <h3 className="mt-1 font-display text-2xl font-light text-white md:text-3xl">
                  {collection.title}
                </h3>
              </div>
            </Link>
          </MotionItem>
        ))}
      </MotionStagger>
    </Section>
  );
}
