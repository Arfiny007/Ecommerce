"use client";

import { motion } from "framer-motion";
import { formatPrice } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { SHOP_MAX_PRICE } from "@/constants/products";
import { getTransition } from "@/lib/motion-config";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface ShopPriceSliderProps {
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

export function ShopPriceSlider({ value, onChange }: ShopPriceSliderProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div>
      <div className="mb-4 flex items-baseline justify-between">
        <motion.span
          key={value[0]}
          initial={reducedMotion ? false : { opacity: 0.6, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={getTransition(reducedMotion, 0.2)}
          className="font-display text-lg font-light"
        >
          {formatPrice(value[0])}
        </motion.span>
        <span className="text-xs text-muted-foreground">to</span>
        <motion.span
          key={value[1]}
          initial={reducedMotion ? false : { opacity: 0.6, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={getTransition(reducedMotion, 0.2)}
          className="font-display text-lg font-light"
        >
          {formatPrice(value[1])}
        </motion.span>
      </div>
      <Slider
        min={0}
        max={SHOP_MAX_PRICE}
        step={50}
        value={value}
        onValueChange={(v) => onChange(v as [number, number])}
        aria-label="Price range"
      />
      <div className="mt-3 flex justify-between text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
        <span>{formatPrice(0)}</span>
        <span>{formatPrice(SHOP_MAX_PRICE)}</span>
      </div>
    </div>
  );
}
