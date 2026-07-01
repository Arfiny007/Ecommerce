"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { getFeaturedProducts } from "@/constants/products";
import { formatPrice } from "@/lib/utils";
import { useWishlist } from "@/hooks/use-wishlist";
import { Section } from "@/components/common/section";
import { MotionStagger, MotionItem } from "@/components/common/motion-wrapper";
import { PremiumImage } from "@/components/common/premium-image";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
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
      <Card variant="ghost" rounded="2xl" className="overflow-hidden border-0 bg-transparent p-0 shadow-none">
        <div className="relative">
          <Link href={`/product/${product.slug}`} className="block">
            <PremiumImage
              src={product.images[0]}
              alt={product.name}
              aspectRatio="portrait"
              rounded="2xl"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </Link>
          <div className="absolute left-3 top-3 flex gap-2">
            {product.new && <Badge variant="champagne">New</Badge>}
            {product.bestseller && <Badge variant="muted">Bestseller</Badge>}
          </div>
          <button
            onClick={() => toggleWishlist(product.id)}
            className="absolute right-3 top-3 rounded-[var(--radius-full)] surface-glass p-2 opacity-0 shadow-subtle transition-luxury group-hover:opacity-100 hover:scale-105"
            aria-label={isWishlisted(product.id) ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-luxury",
                isWishlisted(product.id) && "fill-foreground text-foreground"
              )}
            />
          </button>
        </div>
        <div className="mt-4 space-y-1">
          <Link
            href={`/product/${product.slug}`}
            className="font-display text-base font-light transition-luxury hover:text-muted-foreground"
          >
            {product.name}
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-sm tracking-wide">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
        </div>
      </Card>
    </MotionItem>
  );
}

export function FeaturedProducts() {
  const products = getFeaturedProducts();

  return (
    <Section
      spacing="lg"
      background="default"
      eyebrow="Featured"
      title="Editor's Selection"
      description="Handpicked pieces defining the season."
    >
      <MotionStagger className="grid grid-cols-2 gap-[var(--grid-gap)] md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </MotionStagger>
    </Section>
  );
}
