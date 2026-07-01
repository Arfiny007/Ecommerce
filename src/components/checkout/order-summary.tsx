"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { calculateCartTotals, getEstimatedDelivery } from "@/lib/cart-calculations";
import { formatPrice } from "@/lib/utils";
import { checkoutCopy } from "@/constants/checkout";
import { useCheckoutPreferences } from "@/hooks/use-checkout-preferences";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { getTransition } from "@/lib/motion-config";
import { cn } from "@/lib/utils";
import type { CartItem } from "@/types/cart";

interface OrderSummaryProps {
  subtotal: number;
  items?: CartItem[];
  collapsible?: boolean;
  showItems?: boolean;
  className?: string;
}

function SummaryLines({
  totals,
  delivery,
}: {
  totals: ReturnType<typeof calculateCartTotals>;
  delivery: string;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <div className="space-y-3 text-sm">
      <div className="flex justify-between">
        <span className="text-muted-foreground">Subtotal</span>
        <motion.span
          key={totals.subtotal}
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
          transition={getTransition(reducedMotion, 0.2)}
          className="tabular-nums"
        >
          {formatPrice(totals.subtotal)}
        </motion.span>
      </div>
      {totals.discount > 0 && (
        <div className="flex justify-between text-foreground">
          <span className="text-muted-foreground">
            Discount ({Math.round(totals.discountPercent * 100)}%)
          </span>
          <span className="tabular-nums">−{formatPrice(totals.discount)}</span>
        </div>
      )}
      {totals.giftWrap > 0 && (
        <div className="flex justify-between">
          <span className="text-muted-foreground">Gift wrapping</span>
          <span className="tabular-nums">{formatPrice(totals.giftWrap)}</span>
        </div>
      )}
      <div className="flex justify-between">
        <span className="text-muted-foreground">{checkoutCopy.shippingEstimate}</span>
        <span className="tabular-nums">
          {totals.shipping === 0 ? "Complimentary" : formatPrice(totals.shipping)}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">{checkoutCopy.taxEstimate}</span>
        <span className="tabular-nums">{formatPrice(totals.tax)}</span>
      </div>
      <Separator />
      <div className="flex justify-between text-base font-medium">
        <span>Total</span>
        <motion.span
          key={totals.total}
          initial={{ opacity: 0.6, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={getTransition(reducedMotion, 0.25)}
          className="tabular-nums"
        >
          {formatPrice(totals.total)}
        </motion.span>
      </div>
      <p className="text-xs text-muted-foreground">
        {checkoutCopy.estimatedDelivery}: {delivery}
      </p>
    </div>
  );
}

export function OrderSummary({
  subtotal,
  items = [],
  collapsible = false,
  showItems = false,
  className,
}: OrderSummaryProps) {
  const { couponCode, giftWrapping, shippingMethodId } = useCheckoutPreferences();
  const totals = calculateCartTotals({
    subtotal,
    couponCode,
    giftWrapping,
    shippingMethodId,
  });
  const delivery = getEstimatedDelivery(shippingMethodId);

  const content = (
    <>
      {showItems && items.length > 0 && (
        <ul className="mb-4 space-y-3 border-b border-border-subtle pb-4" aria-label="Order items">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between gap-4 text-sm">
              <span className="line-clamp-1 text-muted-foreground">
                {item.product.name} × {item.quantity}
              </span>
              <span className="shrink-0 tabular-nums">
                {formatPrice(item.product.price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>
      )}
      <SummaryLines totals={totals} delivery={delivery} />
    </>
  );

  if (collapsible) {
    return (
      <div className={cn("rounded-[var(--radius-2xl)] border border-border-subtle p-4 lg:hidden", className)}>
        <Accordion type="single" collapsible defaultValue="summary">
          <AccordionItem value="summary" className="border-none">
            <AccordionTrigger className="py-0 text-sm font-medium">
              {checkoutCopy.orderSummary} · {formatPrice(totals.total)}
            </AccordionTrigger>
            <AccordionContent className="pt-4">{content}</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  }

  return (
    <aside
      className={cn(
        "rounded-[var(--radius-2xl)] border border-border-subtle p-6 surface-elevated",
        className
      )}
      aria-label={checkoutCopy.orderSummary}
    >
      <h2 className="mb-6 font-display text-xl font-light">{checkoutCopy.orderSummary}</h2>
      {content}
    </aside>
  );
}

export { calculateCartTotals };
