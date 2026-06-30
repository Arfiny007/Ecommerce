import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/common/section";
import { Heading, Eyebrow } from "@/components/common/typography";
import { MotionStagger, MotionItem } from "@/components/common/motion-wrapper";

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
    <Section id="collections">
      <div className="flex items-end justify-between gap-4">
        <div>
          <Eyebrow>Collections</Eyebrow>
          <Heading className="mt-3">Curated Categories</Heading>
        </div>
        <Link
          href="/shop"
          className="hidden items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground md:flex"
        >
          View All
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <MotionStagger className="mt-12 grid gap-6 md:grid-cols-3">
        {COLLECTIONS.map((collection, index) => (
          <MotionItem key={collection.slug}>
            <Link
              href={`/shop?category=${collection.slug}`}
              className="group relative block aspect-[3/4] overflow-hidden rounded-3xl"
            >
              <Image
                src={`https://images.unsplash.com/${collection.image}?w=800&q=85&auto=format&fit=crop`}
                alt={collection.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-xs text-white/70">{collection.count} pieces</p>
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
