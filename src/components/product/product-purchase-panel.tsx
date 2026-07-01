"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Star, Heart, GitCompareArrows, Share2, Truck, RotateCcw, Shield } from "lucide-react";
import type { Product, ProductColor, ProductSize } from "@/types/product";
import { useCart } from "@/components/providers/cart-provider";
import { useWishlist } from "@/hooks/use-wishlist";
import { useCompare } from "@/hooks/use-compare";
import { formatPrice } from "@/lib/utils";
import { isProductInStock } from "@/constants/products";
import { FREE_SHIPPING_THRESHOLD } from "@/constants/site";
import { Heading, Body } from "@/components/common/typography";
import { Surface } from "@/components/common/surface";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ProductColorSelector,
  ProductSizeSelector,
  ProductQuantitySelector,
} from "@/components/product/product-variant-selectors";
import { ProductSocialProof } from "@/components/product/product-social-proof";
import { Magnetic } from "@/components/motion/magnetic";
import { cn } from "@/lib/utils";
import { getTransition } from "@/lib/motion-config";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface ProductPurchasePanelProps {
  product: Product;
}

export function ProductPurchasePanel({ product }: ProductPurchasePanelProps) {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<ProductSize>(
    product.sizes.find((s) => s.available) ?? product.sizes[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [addedPulse, setAddedPulse] = useState(false);
  const { addItem, openCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { isCompared, toggleCompare } = useCompare();
  const reducedMotion = useReducedMotion();

  const inStock = isProductInStock(product);
  const wishlisted = isWishlisted(product.id);
  const compared = isCompared(product.id);
  const canPurchase = selectedSize.available && inStock;

  const handleAddToCart = useCallback(() => {
    if (!canPurchase) return;
    addItem(product, selectedColor, selectedSize, quantity);
    setAddedPulse(true);
    setTimeout(() => setAddedPulse(false), 700);
  }, [addItem, canPurchase, product, quantity, selectedColor, selectedSize]);

  const handleBuyNow = useCallback(() => {
    if (!canPurchase) return;
    addItem(product, selectedColor, selectedSize, quantity);
    openCart();
  }, [addItem, canPurchase, openCart, product, quantity, selectedColor, selectedSize]);

  const handleShare = useCallback(async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: product.name, url });
    } else {
      await navigator.clipboard.writeText(url);
    }
  }, [product.name]);

  const availableSizes = product.sizes.filter((s) => s.available).length;
  const stockLabel = !inStock
    ? "Sold out"
    : availableSizes <= 2
      ? "Low stock"
      : "In stock";

  return (
    <Surface
      variant="elevated"
      rounded="3xl"
      padding="lg"
      className="sticky top-28 space-y-8"
    >
      <div>
        <div className="flex flex-wrap gap-2">
          {product.new && <Badge variant="champagne">New</Badge>}
          {product.bestseller && <Badge variant="muted">Bestseller</Badge>}
          {product.compareAtPrice && <Badge variant="outline">Sale</Badge>}
        </div>

        <Heading as="h1" className="mt-4 text-3xl md:text-4xl">
          {product.name}
        </Heading>

        <div className="mt-4 flex items-baseline gap-3">
          <motion.span
            key={product.price}
            className="font-display text-2xl"
            initial={reducedMotion ? false : { opacity: 0.6 }}
            animate={{ opacity: 1 }}
            transition={getTransition(reducedMotion)}
          >
            {formatPrice(product.price)}
          </motion.span>
          {product.compareAtPrice && (
            <span className="text-lg text-muted-foreground line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>

        <div className="mt-3 flex items-center gap-2">
          <div className="flex" aria-label={`${product.rating} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-3.5 w-3.5",
                  i < Math.floor(product.rating)
                    ? "fill-foreground text-foreground"
                    : "text-muted-foreground"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            {product.rating} ({product.reviewCount} reviews)
          </span>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <span
            className={cn(
              "inline-flex h-2 w-2 rounded-[var(--radius-full)]",
              inStock ? "bg-foreground" : "bg-muted-foreground"
            )}
            aria-hidden
          />
          <span className="label-caps-muted">
            {stockLabel}
          </span>
        </div>
      </div>

      <Body className="leading-relaxed">{product.description}</Body>

      {product.colors.length > 0 && (
        <ProductColorSelector
          colors={product.colors}
          selected={selectedColor}
          onSelect={setSelectedColor}
        />
      )}

      {product.sizes.length > 0 && (
        <ProductSizeSelector
          sizes={product.sizes}
          selected={selectedSize}
          onSelect={setSelectedSize}
        />
      )}

      <ProductQuantitySelector quantity={quantity} onChange={setQuantity} />

      <div className="flex gap-2">
        <button
          onClick={() => toggleWishlist(product.id)}
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-[var(--radius-full)] border border-border transition-luxury hover:border-foreground",
            wishlisted && "border-foreground bg-accent"
          )}
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
          onClick={() => toggleCompare(product.id)}
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-[var(--radius-full)] border border-border transition-luxury hover:border-foreground",
            compared && "border-foreground bg-accent"
          )}
          aria-label={compared ? "Remove from compare" : "Add to compare"}
          aria-pressed={compared}
        >
          <GitCompareArrows className="h-4 w-4" />
        </button>
        <button
          onClick={handleShare}
          className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-full)] border border-border transition-luxury hover:border-foreground"
          aria-label="Share product"
        >
          <Share2 className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-3">
        <Magnetic>
          <motion.div whileTap={reducedMotion ? undefined : { scale: 0.98 }} className="w-full">
            <Button
              variant="cta"
              size="xl"
              className="w-full"
              onClick={handleAddToCart}
              disabled={!canPurchase}
            >
              <motion.span
                animate={addedPulse ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                transition={getTransition(reducedMotion, 0.3)}
              >
                {canPurchase
                  ? `Add to Bag — ${formatPrice(product.price * quantity)}`
                  : "Sold Out"}
              </motion.span>
            </Button>
          </motion.div>
        </Magnetic>
        <Magnetic>
          <Button
            variant="luxury"
            size="lg"
            className="w-full"
            onClick={handleBuyNow}
            disabled={!canPurchase}
          >
            Buy Now
          </Button>
        </Magnetic>
      </div>

      <div className="grid grid-cols-3 gap-4 border-t border-border pt-6">
        {[
          { icon: Truck, label: `Free over ${formatPrice(FREE_SHIPPING_THRESHOLD)}` },
          { icon: RotateCcw, label: "30-Day Returns" },
          { icon: Shield, label: "Authenticity" },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-2 text-center">
            <Icon className="h-4 w-4 text-muted-foreground" aria-hidden />
            <span className="text-micro-caps text-muted-foreground">
              {label}
            </span>
          </div>
        ))}
      </div>

      <div className="space-y-3 text-xs leading-relaxed text-muted-foreground">
        <p>
          <strong className="text-foreground">Shipping:</strong> Dispatched within 1–2
          business days. Complimentary standard delivery on orders over{" "}
          {formatPrice(FREE_SHIPPING_THRESHOLD)}.
        </p>
        <p>
          <strong className="text-foreground">Returns:</strong> Unworn items with tags
          attached may be returned within 30 days for a full refund.
        </p>
      </div>

      <ProductSocialProof product={product} />
    </Surface>
  );
}
