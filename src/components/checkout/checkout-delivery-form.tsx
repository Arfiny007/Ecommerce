"use client";

import { motion } from "framer-motion";
import { SHIPPING_METHODS, type ShippingMethodId } from "@/constants/checkout";
import { formatPrice } from "@/lib/utils";
import { calculateCartTotals } from "@/lib/cart-calculations";
import { useCheckoutPreferences } from "@/hooks/use-checkout-preferences";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { fadeInUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface CheckoutDeliveryFormProps {
  subtotal: number;
  selected: ShippingMethodId;
  onSelect: (id: ShippingMethodId) => void;
}

export function CheckoutDeliveryForm({
  subtotal,
  selected,
  onSelect,
}: CheckoutDeliveryFormProps) {
  const { couponCode, giftWrapping } = useCheckoutPreferences();
  const reducedMotion = useReducedMotion();
  const totals = calculateCartTotals({ subtotal, couponCode, giftWrapping });

  return (
    <motion.div
      variants={reducedMotion ? undefined : fadeInUp}
      initial={reducedMotion ? false : "hidden"}
      animate="visible"
      className="space-y-3"
      role="radiogroup"
      aria-label="Delivery method"
    >
      {SHIPPING_METHODS.map((method) => {
        const isSelected = selected === method.id;
        const cost =
          method.id === "standard" && totals.qualifiesForFreeShipping
            ? 0
            : method.id === "standard" && !totals.qualifiesForFreeShipping
              ? 15
              : method.cost;

        return (
          <motion.button
            key={method.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onSelect(method.id)}
            className={cn(
              "flex w-full items-center justify-between gap-4 rounded-[var(--radius-xl)] border px-5 py-4 text-left transition-luxury",
              isSelected
                ? "border-foreground bg-foreground/5"
                : "border-border-subtle hover:border-border"
            )}
            whileTap={reducedMotion ? undefined : { scale: 0.99 }}
          >
            <div>
              <p className="text-sm font-medium">{method.label}</p>
              <p className="text-xs text-muted-foreground">{method.description}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm tabular-nums">
                {cost === 0 ? "Complimentary" : formatPrice(cost)}
              </span>
              <span
                className={cn(
                  "h-4 w-4 rounded-[var(--radius-full)] border-2",
                  isSelected && "border-foreground bg-foreground"
                )}
                aria-hidden
              />
            </div>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
