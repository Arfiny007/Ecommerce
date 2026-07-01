"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Package, Truck, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { checkoutCopy } from "@/constants/checkout";
import { formatPrice } from "@/lib/utils";
import { getEstimatedDelivery } from "@/lib/cart-calculations";
import { useCheckoutPreferences } from "@/hooks/use-checkout-preferences";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { getTransition } from "@/lib/motion-config";
import { Magnetic } from "@/components/motion/magnetic";
import type { CartItem } from "@/types/cart";

interface CheckoutSuccessProps {
  orderNumber: string;
  total: number;
  items: CartItem[];
}

const timeline = [
  { icon: Check, label: "Order confirmed", status: "complete" },
  { icon: Package, label: "Preparing your pieces", status: "current" },
  { icon: Truck, label: "Shipped", status: "upcoming" },
  { icon: MapPin, label: "Delivered", status: "upcoming" },
] as const;

export function CheckoutSuccess({ orderNumber, total, items }: CheckoutSuccessProps) {
  const { shippingMethodId, resetPrefs } = useCheckoutPreferences();
  const reducedMotion = useReducedMotion();
  const delivery = getEstimatedDelivery(shippingMethodId);

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={getTransition(reducedMotion, 0.5)}
      className="mx-auto max-w-lg text-center"
    >
      <motion.div
        initial={reducedMotion ? false : { scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          ...getTransition(reducedMotion, 0.5),
          delay: reducedMotion ? 0 : 0.15,
        }}
        className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-[var(--radius-full)] bg-foreground text-background"
        aria-hidden
      >
        <Check className="h-10 w-10" strokeWidth={1.5} />
      </motion.div>

      <h1 className="font-display text-4xl font-light md:text-5xl">
        {checkoutCopy.successTitle}
      </h1>
      <p className="mt-3 text-muted-foreground">{checkoutCopy.successSubtitle}</p>

      <div className="mt-8 rounded-[var(--radius-2xl)] border border-border-subtle p-6 text-left surface-elevated">
        <p className="label-caps-muted">
          {checkoutCopy.successOrderNumber}
        </p>
        <p className="mt-1 font-display text-2xl font-light">{orderNumber}</p>
        <div className="mt-4 flex justify-between border-t border-border-subtle pt-4 text-sm">
          <span className="text-muted-foreground">Total paid</span>
          <span className="font-medium tabular-nums">{formatPrice(total)}</span>
        </div>
        <div className="mt-2 flex justify-between text-sm">
          <span className="text-muted-foreground">{checkoutCopy.estimatedDelivery}</span>
          <span>{delivery}</span>
        </div>
      </div>

      <div className="mt-10 text-left">
        <h2 className="label-caps mb-6 text-center text-muted-foreground">
          Order timeline
        </h2>
        <ol className="space-y-0" aria-label="Order status timeline">
          {timeline.map((step, i) => {
            const Icon = step.icon;
            return (
              <li key={step.label} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-[var(--radius-full)] ${
                      step.status === "complete"
                        ? "bg-foreground text-background"
                        : step.status === "current"
                          ? "border-2 border-foreground"
                          : "border border-border-subtle text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                  </div>
                  {i < timeline.length - 1 && (
                    <div className="my-1 h-8 w-px bg-border-subtle" aria-hidden />
                  )}
                </div>
                <div className="pb-8 pt-1">
                  <p
                    className={`text-sm ${
                      step.status === "upcoming"
                        ? "text-muted-foreground"
                        : "font-medium"
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-6 rounded-[var(--radius-xl)] border border-border-subtle p-4 text-left text-sm">
        <p className="label-caps-muted">
          Receipt preview
        </p>
        <ul className="mt-3 space-y-2">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between gap-4">
              <span className="text-muted-foreground line-clamp-1">
                {item.product.name} × {item.quantity}
              </span>
              <span className="shrink-0 tabular-nums">
                {formatPrice(item.product.price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Magnetic>
          <Button variant="cta" size="xl" asChild onClick={() => resetPrefs()}>
            <Link href="/shop">{checkoutCopy.continueShopping}</Link>
          </Button>
        </Magnetic>
        <Button variant="outline" size="xl" asChild>
          <Link href="/profile">View account</Link>
        </Button>
      </div>
    </motion.div>
  );
}
