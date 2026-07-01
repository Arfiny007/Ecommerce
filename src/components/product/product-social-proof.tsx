"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Eye, ShoppingBag, Package, Lock, Gift } from "lucide-react";
import { FREE_SHIPPING_THRESHOLD } from "@/constants/site";
import { formatPrice } from "@/lib/utils";
import { getTransition } from "@/lib/motion-config";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { Product } from "@/types/product";

interface ProductSocialProofProps {
  product: Product;
}

function seededNumber(seed: string, min: number, max: number): number {
  const hash = seed.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return min + (hash % (max - min + 1));
}

export function ProductSocialProof({ product }: ProductSocialProofProps) {
  const reducedMotion = useReducedMotion();

  const viewers = useMemo(
    () => seededNumber(product.id, 8, 34),
    [product.id]
  );

  const recentPurchases = useMemo(
    () => seededNumber(product.slug, 2, 12),
    [product.slug]
  );

  const indicators = [
    {
      icon: Eye,
      text: `${viewers} people viewing now`,
    },
    {
      icon: ShoppingBag,
      text: `Purchased ${recentPurchases} times this week`,
    },
    {
      icon: Package,
      text: `Free shipping over ${formatPrice(FREE_SHIPPING_THRESHOLD)}`,
    },
    {
      icon: Lock,
      text: "Secure checkout",
    },
    {
      icon: Gift,
      text: "Premium packaging included",
    },
  ];

  return (
    <div className="space-y-3 border-t border-border pt-6" aria-label="Trust indicators">
      {indicators.map((item, index) => (
        <motion.div
          key={item.text}
          initial={reducedMotion ? false : { opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            ...getTransition(reducedMotion, 0.35),
            delay: reducedMotion ? 0 : index * 0.06,
          }}
          className="flex items-center gap-3 text-xs text-muted-foreground"
        >
          <item.icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
          <span>{item.text}</span>
        </motion.div>
      ))}
    </div>
  );
}
