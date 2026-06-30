"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { getFeaturedProducts } from "@/constants/products";
import { formatPrice } from "@/lib/utils";
import { useWishlist } from "@/hooks/use-wishlist";
import { Section } from "@/components/common/section";
import { Heading, Eyebrow } from "@/components/common/typography";
import { MotionStagger, MotionItem } from "@/components/common/motion-wrapper";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function ProductCard({
  product,
  className,
}: {
  product: import("@/types/product").Product;
  className?: string;
}) {
  const { isWishlisted, toggleWishlist } = useWishlist();

  return (
    <MotionItem className={cn("group", className)}>
      <div className="relative">
        <Link
          href={`/product/${product.slug}`}
          className="relative block aspect-[3/4] overflow-hidden rounded-2xl bg-muted"
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          <div className="absolute left-3 top-3 flex gap-2">
            {product.new && <Badge variant="champagne">New</Badge>}
            {product.bestseller && <Badge variant="secondary">Bestseller</Badge>}
          </div>
        </Link>
        <button
          onClick={() => toggleWishlist(product.id)}
          className="absolute right-3 top-3 rounded-full bg-background/80 p-2 backdrop-blur-sm transition-transform hover:scale-110"
          aria-label={isWishlisted(product.id) ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-colors",
              isWishlisted(product.id) && "fill-foreground text-foreground"
            )}
          />
        </button>
      </div>
      <div className="mt-4 space-y-1">
        <Link
          href={`/product/${product.slug}`}
          className="text-sm font-medium transition-colors hover:text-muted-foreground"
        >
          {product.name}
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-sm">{formatPrice(product.price)}</span>
          {product.compareAtPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </MotionItem>
  );
}

export function FeaturedProducts() {
  const products = getFeaturedProducts();

  return (
    <Section className="bg-secondary/30">
      <Eyebrow>Featured</Eyebrow>
      <Heading className="mt-3">Editor&apos;s Selection</Heading>

      <MotionStagger className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </MotionStagger>
    </Section>
  );
}

export function BestSellers() {
  const products = getFeaturedProducts().slice(0, 4);

  return (
    <Section>
      <div className="flex items-end justify-between">
        <div>
          <Eyebrow>Popular</Eyebrow>
          <Heading className="mt-3">Best Sellers</Heading>
        </div>
        <Link
          href="/shop?sort=popular"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          View All
        </Link>
      </div>

      <MotionStagger className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </MotionStagger>
    </Section>
  );
}
