"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CATEGORIES, PRODUCTS } from "@/constants/products";
import { getTransition } from "@/lib/motion-config";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface ShopCategoryPillsProps {
  activeCategory: string;
  onCategoryChange: (slug: string) => void;
  className?: string;
}

export function ShopCategoryPills({
  activeCategory,
  onCategoryChange,
  className,
}: ShopCategoryPillsProps) {
  const reducedMotion = useReducedMotion();
  const pills = [{ slug: "", label: "All", count: PRODUCTS.length }, ...CATEGORIES];

  return (
    <div
      className={cn("flex flex-wrap gap-2", className)}
      role="tablist"
      aria-label="Product categories"
    >
      {pills.map((pill) => {
        const isActive = activeCategory === pill.slug;
        return (
          <button
            key={pill.slug || "all"}
            role="tab"
            aria-selected={isActive}
            onClick={() => onCategoryChange(pill.slug)}
            className={cn(
              "relative rounded-[var(--radius-full)] px-4 py-2 text-sm transition-luxury",
              isActive
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {isActive && (
              <motion.span
                layoutId="shop-category-pill"
                className="absolute inset-0 rounded-[var(--radius-full)] border border-border bg-surface-elevated shadow-subtle"
                transition={getTransition(reducedMotion)}
              />
            )}
            <span className="relative z-10">
              {pill.label}
              <span className="ml-1.5 text-xs text-muted-foreground">
                ({pill.count})
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
