"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { getTransition } from "@/lib/motion-config";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { Product, ProductColor, ProductSize } from "@/types/product";

interface ProductColorSelectorProps {
  colors: ProductColor[];
  selected: ProductColor;
  onSelect: (color: ProductColor) => void;
}

export function ProductColorSelector({
  colors,
  selected,
  onSelect,
}: ProductColorSelectorProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.15em]">
        Color —{" "}
        <motion.span
          key={selected.name}
          initial={reducedMotion ? false : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={getTransition(reducedMotion, 0.2)}
        >
          {selected.name}
        </motion.span>
      </p>
      <div className="mt-3 flex gap-3" role="group" aria-label="Color selection">
        {colors.map((color) => {
          const isSelected = selected.name === color.name;
          return (
            <button
              key={color.name}
              onClick={() => onSelect(color)}
              aria-label={color.name}
              aria-pressed={isSelected}
              className={cn(
                "relative h-9 w-9 rounded-[var(--radius-full)] border-2 transition-luxury hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isSelected
                  ? "border-foreground ring-2 ring-foreground ring-offset-2 ring-offset-background"
                  : "border-border"
              )}
              style={{ backgroundColor: color.hex }}
            >
              {isSelected && (
                <motion.span
                  layoutId="pdp-color-selected"
                  className="absolute inset-0 rounded-[var(--radius-full)]"
                  transition={getTransition(reducedMotion)}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface ProductSizeSelectorProps {
  sizes: ProductSize[];
  selected: ProductSize;
  onSelect: (size: ProductSize) => void;
}

export function ProductSizeSelector({
  sizes,
  selected,
  onSelect,
}: ProductSizeSelectorProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.15em]">Size</p>
      <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Size selection">
        {sizes.map((size) => {
          const isSelected = selected.label === size.label;
          return (
            <button
              key={size.label}
              onClick={() => size.available && onSelect(size)}
              disabled={!size.available}
              aria-pressed={isSelected}
              aria-label={`Size ${size.label}${!size.available ? ", out of stock" : ""}`}
              className={cn(
                "relative min-w-[2.75rem] rounded-[var(--radius-xl)] border px-3 py-2.5 text-sm transition-luxury focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isSelected
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground",
                !size.available && "cursor-not-allowed opacity-40 line-through"
              )}
            >
              {isSelected && (
                <motion.span
                  layoutId="pdp-size-selected"
                  className="absolute inset-0 rounded-[var(--radius-xl)] border border-foreground bg-foreground"
                  transition={getTransition(reducedMotion)}
                />
              )}
              <span className="relative z-10">{size.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface ProductQuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  max?: number;
}

export function ProductQuantitySelector({
  quantity,
  onChange,
  max = 10,
}: ProductQuantitySelectorProps) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.15em]">Quantity</p>
      <div
        className="mt-3 inline-flex items-center rounded-[var(--radius-full)] border border-border"
        role="group"
        aria-label="Quantity"
      >
        <button
          onClick={() => onChange(Math.max(1, quantity - 1))}
          disabled={quantity <= 1}
          className="flex h-10 w-10 items-center justify-center text-muted-foreground transition-luxury hover:text-foreground disabled:opacity-40"
          aria-label="Decrease quantity"
        >
          −
        </button>
        <motion.span
          key={quantity}
          initial={{ opacity: 0.5, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-10 text-center text-sm tabular-nums"
          aria-live="polite"
        >
          {quantity}
        </motion.span>
        <button
          onClick={() => onChange(Math.min(max, quantity + 1))}
          disabled={quantity >= max}
          className="flex h-10 w-10 items-center justify-center text-muted-foreground transition-luxury hover:text-foreground disabled:opacity-40"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
    </div>
  );
}
