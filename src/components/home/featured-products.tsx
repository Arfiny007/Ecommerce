"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { getFeaturedProducts } from "@/constants/products";
import { EDITORS_PICKS_NOTE } from "@/constants/editorial";
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
            className="icon-action absolute right-3 top-3 surface-glass opacity-0 shadow-subtle transition-luxury group-hover:opacity-100"
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

/** Bento grid — editor note occupies a typographic cell amid product tiles */
export function FeaturedProducts() {
  const products = getFeaturedProducts();

  return (
    <Section
      spacing="md"
      eyebrow="Featured"
      title="Editor's Selection"
      description="Four pieces that define the season — chosen for craft, not trend."
    >
      <MotionStagger className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        <div className="col-span-2 row-span-2 flex flex-col justify-between rounded-[var(--radius-2xl)] border border-border-subtle bg-surface-muted p-6 md:p-8">
          <div>
            <p className="text-xs uppercase tracking-editorial text-muted-foreground">
              {EDITORS_PICKS_NOTE.role}
            </p>
            <p className="mt-4 font-display text-xl font-light italic leading-snug md:text-2xl">
              &ldquo;{EDITORS_PICKS_NOTE.quote}&rdquo;
            </p>
            <p className="mt-4 text-sm text-muted-foreground">— {EDITORS_PICKS_NOTE.author}</p>
          </div>
          <ul className="mt-6 space-y-3 border-t border-border-subtle pt-6">
            {EDITORS_PICKS_NOTE.tips.map((tip) => (
              <li key={tip.title}>
                <p className="text-xs font-medium">{tip.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{tip.body}</p>
              </li>
            ))}
          </ul>
        </div>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </MotionStagger>
    </Section>
  );
}
