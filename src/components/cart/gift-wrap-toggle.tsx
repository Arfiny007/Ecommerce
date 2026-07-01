"use client";

import { motion } from "framer-motion";
import { Gift } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { checkoutCopy, GIFT_WRAP_PRICE } from "@/constants/checkout";
import { formatPrice } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { getTransition } from "@/lib/motion-config";

interface GiftWrapToggleProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function GiftWrapToggle({ checked, onCheckedChange }: GiftWrapToggleProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      layout
      className="flex items-center justify-between gap-4 rounded-[var(--radius-xl)] border border-border-subtle px-4 py-3"
    >
      <div className="flex items-start gap-3">
        <motion.div
          animate={checked && !reducedMotion ? { rotate: [0, -8, 8, 0] } : {}}
          transition={getTransition(reducedMotion, 0.4)}
        >
          <Gift className="mt-0.5 h-4 w-4 text-muted-foreground" aria-hidden />
        </motion.div>
        <div>
          <p className="text-sm font-medium">{checkoutCopy.giftWrapLabel}</p>
          <p className="text-xs text-muted-foreground">
            {checkoutCopy.giftWrapDescription} · {formatPrice(GIFT_WRAP_PRICE)}
          </p>
        </div>
      </div>
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        aria-label={checkoutCopy.giftWrapLabel}
      />
    </motion.div>
  );
}
