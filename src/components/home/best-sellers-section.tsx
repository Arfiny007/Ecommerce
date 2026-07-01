"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Eye } from "lucide-react";
import { getBestsellers } from "@/constants/products";
import { formatPrice } from "@/lib/utils";
import { useWishlist } from "@/hooks/use-wishlist";
import { Section } from "@/components/common/section";
import { SectionLinkAction } from "@/components/common/section-header";
import { MotionStagger, MotionItem } from "@/components/common/motion-wrapper";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

function getProductLabel(product: Product): string | null {
  if (product.new) return "NEW";
  if (product.collection === "limited") return "LIMITED";
  if (product.featured) return "EXCLUSIVE";
  return null;
}

function BestSellerCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const { isWishlisted, toggleWishlist } = useWishlist();
  const label = getProductLabel(product);
  const secondaryImage = product.images[1] ?? product.images[0];

  return (
    <MotionItem>
      <article
        className="group"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="relative overflow-hidden rounded-[var(--radius-2xl)] bg-surface-muted">
          <Link
            href={`/product/${product.slug}`}
            className="relative block aspect-[3/4] overflow-hidden"
          >
            <AnimatePresence mode="sync">
              <motion.div
                key={hovered ? "alt" : "main"}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: hovered ? 1.04 : 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={hovered ? secondaryImage : product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent opacity-0 transition-luxury group-hover:opacity-100" />
          </Link>

          {label && (
            <div className="absolute left-4 top-4">
              <Badge variant="champagne">{label}</Badge>
            </div>
          )}

          <div className="absolute right-4 top-4 flex flex-col gap-2 opacity-0 transition-luxury group-hover:opacity-100">
            <button
              onClick={() => toggleWishlist(product.id)}
              className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-full)] surface-glass shadow-soft transition-luxury hover:scale-105"
              aria-label={isWishlisted(product.id) ? "Remove from wishlist" : "Add to wishlist"}
            >
              <motion.div
                animate={isWishlisted(product.id) ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Heart
                  className={cn(
                    "h-4 w-4",
                    isWishlisted(product.id) && "fill-foreground text-foreground"
                  )}
                />
              </motion.div>
            </button>
            <Link
              href={`/product/${product.slug}`}
              className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-full)] surface-glass shadow-soft transition-luxury hover:scale-105"
              aria-label={`View ${product.name}`}
            >
              <Eye className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-5 space-y-1">
          <Link
            href={`/product/${product.slug}`}
            className="font-display text-lg font-light transition-luxury hover:text-muted-foreground"
          >
            {product.name}
          </Link>
          <div className="flex items-baseline gap-2">
            <span className="text-sm tracking-wide">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
        </div>
      </article>
    </MotionItem>
  );
}

export function BestSellers() {
  const products = getBestsellers();

  return (
    <Section
      spacing="lg"
      eyebrow="Popular"
      title="Best Sellers"
      description="The pieces our community returns to — season after season."
      action={<SectionLinkAction href="/shop?sort=popular" label="View All" />}
    >
      <MotionStagger className="grid grid-cols-2 gap-[var(--grid-gap)] lg:grid-cols-4">
        {products.map((product) => (
          <BestSellerCard key={product.id} product={product} />
        ))}
      </MotionStagger>
    </Section>
  );
}
