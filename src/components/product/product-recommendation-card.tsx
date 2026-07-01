"use client";

import { memo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, GitCompareArrows, Plus } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useWishlist } from "@/hooks/use-wishlist";
import { useCompare } from "@/hooks/use-compare";
import { useCart } from "@/components/providers/cart-provider";
import { isProductInStock } from "@/constants/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MotionItem } from "@/components/common/motion-wrapper";
import { cn } from "@/lib/utils";
import { getTransition } from "@/lib/motion-config";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { Product } from "@/types/product";

interface ProductRecommendationCardProps {
  product: Product;
  index?: number;
}

export const ProductRecommendationCard = memo(function ProductRecommendationCard({
  product,
  index = 0,
}: ProductRecommendationCardProps) {
  const [hovered, setHovered] = useState(false);
  const [adding, setAdding] = useState(false);
  const reducedMotion = useReducedMotion();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { isCompared, toggleCompare } = useCompare();
  const { addItem } = useCart();
  const wishlisted = isWishlisted(product.id);
  const compared = isCompared(product.id);
  const inStock = isProductInStock(product);
  const secondaryImage = product.images[1] ?? product.images[0];
  const defaultColor = product.colors[0];
  const defaultSize = product.sizes.find((s) => s.available) ?? product.sizes[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!inStock || !defaultSize.available) return;
    setAdding(true);
    addItem(product, defaultColor, defaultSize, 1);
    setTimeout(() => setAdding(false), 600);
  };

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
                key={hovered && !reducedMotion ? "alt" : "main"}
                initial={reducedMotion ? false : { opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: hovered && !reducedMotion ? 1.03 : 1 }}
                exit={reducedMotion ? undefined : { opacity: 0 }}
                transition={getTransition(reducedMotion, 0.5)}
                className="absolute inset-0"
              >
                <Image
                  src={hovered && !reducedMotion ? secondaryImage : product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  loading={index < 4 ? "eager" : "lazy"}
                />
              </motion.div>
            </AnimatePresence>
          </Link>

          <div className="absolute left-3 top-3 flex gap-1.5">
            {product.new && <Badge variant="champagne">New</Badge>}
            {product.bestseller && <Badge variant="muted">Bestseller</Badge>}
          </div>

          <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition-luxury group-hover:opacity-100 group-focus-within:opacity-100">
            <button
              onClick={() => toggleWishlist(product.id)}
              className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-full)] surface-glass shadow-soft transition-luxury hover:scale-105"
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              aria-pressed={wishlisted}
            >
              <motion.div
                animate={wishlisted ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                transition={getTransition(reducedMotion, 0.3)}
              >
                <Heart
                  className={cn(
                    "h-4 w-4",
                    wishlisted && "fill-foreground text-foreground"
                  )}
                />
              </motion.div>
            </button>
            <button
              onClick={() => toggleCompare(product.id)}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-[var(--radius-full)] surface-glass shadow-soft transition-luxury hover:scale-105",
                compared && "ring-1 ring-foreground"
              )}
              aria-label={compared ? "Remove from compare" : "Add to compare"}
              aria-pressed={compared}
            >
              <GitCompareArrows className="h-4 w-4" />
            </button>
          </div>

          {inStock && (
            <div className="absolute bottom-3 left-3 right-3 opacity-0 transition-luxury group-hover:opacity-100">
              <Button
                variant="secondary"
                size="sm"
                className="w-full gap-2 rounded-[var(--radius-full)] surface-glass"
                onClick={handleQuickAdd}
                disabled={adding}
              >
                <motion.span
                  animate={adding ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                  transition={getTransition(reducedMotion, 0.25)}
                >
                  <Plus className="h-3.5 w-3.5" />
                </motion.span>
                {adding ? "Added" : "Quick Add"}
              </Button>
            </div>
          )}
        </div>

        <div className="mt-4 space-y-1">
          <Link
            href={`/product/${product.slug}`}
            className="font-display text-base font-light transition-luxury hover:text-muted-foreground"
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
});
