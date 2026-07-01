"use client";

import { useState, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Eye, GitCompareArrows } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useWishlist } from "@/hooks/use-wishlist";
import { useCompare } from "@/hooks/use-compare";
import { isProductInStock } from "@/constants/products";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getTransition } from "@/lib/motion-config";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { Product, ViewMode } from "@/types/product";

function getProductBadges(product: Product) {
  const badges: { label: string; variant: "champagne" | "muted" | "outline" }[] = [];
  if (product.new) badges.push({ label: "New", variant: "champagne" });
  if (product.bestseller) badges.push({ label: "Bestseller", variant: "muted" });
  if (product.compareAtPrice) badges.push({ label: "Sale", variant: "outline" });
  if (!isProductInStock(product)) badges.push({ label: "Sold Out", variant: "outline" });
  return badges;
}

interface ShopProductCardProps {
  product: Product;
  viewMode: ViewMode;
  index: number;
  onQuickView: (product: Product) => void;
}

export const ShopProductCard = memo(function ShopProductCard({
  product,
  viewMode,
  index,
  onQuickView,
}: ShopProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const reducedMotion = useReducedMotion();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { isCompared, toggleCompare } = useCompare();
  const wishlisted = isWishlisted(product.id);
  const compared = isCompared(product.id);
  const badges = getProductBadges(product);
  const secondaryImage = product.images[1] ?? product.images[0];

  const imageBlock = (
    <div
      className={cn(
        "relative overflow-hidden bg-surface-muted",
        viewMode === "grid"
          ? "rounded-[var(--radius-2xl)]"
          : "rounded-[var(--radius-xl)] md:w-48 shrink-0"
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link
        href={`/product/${product.slug}`}
        className={cn(
          "relative block overflow-hidden",
          viewMode === "grid" ? "aspect-[3/4]" : "aspect-[3/4] md:aspect-square md:h-48 md:w-48"
        )}
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
              sizes={
                viewMode === "grid"
                  ? "(max-width: 768px) 50vw, 25vw"
                  : "(max-width: 768px) 100vw, 200px"
              }
              priority={index < 4}
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent opacity-0 transition-luxury group-hover:opacity-100" />
      </Link>

      {badges.length > 0 && (
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {badges.map((badge) => (
            <Badge key={badge.label} variant={badge.variant}>
              {badge.label}
            </Badge>
          ))}
        </div>
      )}

      <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition-luxury group-hover:opacity-100 group-focus-within:opacity-100">
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className="flex icon-action surface-glass shadow-soft hover:scale-105"
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wishlisted}
        >
          <motion.div
            animate={wishlisted ? { scale: [1, 1.35, 1] } : { scale: 1 }}
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
          onClick={(e) => {
            e.preventDefault();
            onQuickView(product);
          }}
          className="flex icon-action surface-glass shadow-soft hover:scale-105"
          aria-label={`Quick view ${product.name}`}
        >
          <Eye className="h-4 w-4" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleCompare(product.id);
          }}
          className={cn(
            "icon-action surface-glass shadow-soft",
            compared && "ring-1 ring-foreground"
          )}
          aria-label={compared ? "Remove from compare" : "Add to compare"}
          aria-pressed={compared}
        >
          <motion.div
            animate={compared ? { scale: [1, 1.2, 1] } : { scale: 1 }}
            transition={getTransition(reducedMotion, 0.25)}
          >
            <GitCompareArrows className="h-4 w-4" />
          </motion.div>
        </button>
      </div>
    </div>
  );

  const infoBlock = (
    <div className={cn("space-y-1", viewMode === "list" && "flex-1 py-2")}>
      <Link
        href={`/product/${product.slug}`}
        className="font-display text-base font-light transition-luxury hover:text-muted-foreground md:text-lg"
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
      {viewMode === "list" && (
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {product.description}
        </p>
      )}
      {viewMode === "list" && product.colors.length > 0 && (
        <div className="flex gap-1.5 pt-1">
          {product.colors.slice(0, 4).map((color) => (
            <span
              key={color.name}
              className="h-4 w-4 rounded-[var(--radius-full)] border border-border"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <motion.article
      layout
      initial={reducedMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reducedMotion ? undefined : { opacity: 0, scale: 0.98 }}
      transition={{
        ...getTransition(reducedMotion, 0.4),
        delay: reducedMotion ? 0 : Math.min(index * 0.04, 0.24),
      }}
      className={cn(
        "group",
        viewMode === "list" && "flex gap-6 border-b border-border-subtle pb-6"
      )}
    >
      {imageBlock}
      {infoBlock}
    </motion.article>
  );
});
