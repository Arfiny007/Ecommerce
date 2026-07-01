"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { getCartRecommendations } from "@/constants/products";
import { useRecentlyViewed } from "@/hooks/use-recently-viewed";
import { useCart } from "@/components/providers/cart-provider";
import { formatPrice } from "@/lib/utils";
import { checkoutCopy } from "@/constants/checkout";
import { Button } from "@/components/ui/button";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { getTransition } from "@/lib/motion-config";
import { cn } from "@/lib/utils";

interface CartRecommendationsProps {
  variant?: "drawer" | "page";
  className?: string;
}

export function CartRecommendations({
  variant = "page",
  className,
}: CartRecommendationsProps) {
  const { items, addItem } = useCart();
  const { getRecentProducts } = useRecentlyViewed();
  const reducedMotion = useReducedMotion();

  const cartIds = useMemo(() => items.map((i) => i.product.id), [items]);
  const accessories = useMemo(
    () => getCartRecommendations(cartIds, variant === "drawer" ? 3 : 4),
    [cartIds, variant]
  );
  const recent = useMemo(
    () => getRecentProducts().filter((p) => !cartIds.includes(p.id)).slice(0, variant === "drawer" ? 2 : 4),
    [getRecentProducts, cartIds, variant]
  );

  const sections = [
    { title: checkoutCopy.recommendationsAccessories, products: accessories },
    { title: checkoutCopy.recommendationsRecent, products: recent },
  ].filter((s) => s.products.length > 0);

  if (sections.length === 0) return null;

  return (
    <div className={cn("space-y-6", className)}>
      {sections.map((section) => (
        <div key={section.title}>
          <h3 className="label-caps mb-3 text-muted-foreground">
            {section.title}
          </h3>
          <div
            className={cn(
              "flex gap-3 overflow-x-auto pb-1 scrollbar-none",
              variant === "page" && "md:grid md:grid-cols-4 md:overflow-visible"
            )}
          >
            {section.products.map((product) => {
              const color = product.colors[0];
              const size = product.sizes.find((s) => s.available) ?? product.sizes[0];
              return (
                <motion.article
                  key={product.id}
                  layout
                  className={cn(
                    "group shrink-0",
                    variant === "drawer" ? "w-28" : "w-36 md:w-auto"
                  )}
                >
                  <Link
                    href={`/product/${product.slug}`}
                    className="relative block aspect-[3/4] overflow-hidden rounded-[var(--radius-xl)] bg-surface-muted"
                  >
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover transition-luxury group-hover:scale-105"
                      sizes="150px"
                    />
                  </Link>
                  <div className="mt-2 space-y-1">
                    <Link
                      href={`/product/${product.slug}`}
                      className="line-clamp-1 text-xs font-medium transition-luxury hover:text-muted-foreground"
                    >
                      {product.name}
                    </Link>
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs tabular-nums">
                        {formatPrice(product.price)}
                      </span>
                      {size.available && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          aria-label={`Add ${product.name} to bag`}
                          onClick={() => addItem(product, color, size, 1)}
                        >
                          <motion.span
                            whileTap={reducedMotion ? undefined : { scale: 0.85 }}
                            transition={getTransition(reducedMotion, 0.15)}
                          >
                            <Plus className="h-3 w-3" />
                          </motion.span>
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
