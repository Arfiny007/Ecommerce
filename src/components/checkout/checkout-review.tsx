"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { formatPrice } from "@/lib/utils";
import { checkoutCopy, PAYMENT_METHODS } from "@/constants/checkout";
import { calculateCartTotals, getEstimatedDelivery } from "@/lib/cart-calculations";
import { useCheckoutPreferences } from "@/hooks/use-checkout-preferences";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { fadeInUp } from "@/lib/animations";
import type { CartItem, ShippingFormData } from "@/types/cart";

interface CheckoutReviewProps {
  items: CartItem[];
  subtotal: number;
  shipping: ShippingFormData;
}

export function CheckoutReview({ items, subtotal, shipping }: CheckoutReviewProps) {
  const { couponCode, giftWrapping, shippingMethodId, paymentMethodId } =
    useCheckoutPreferences();
  const reducedMotion = useReducedMotion();
  const totals = calculateCartTotals({
    subtotal,
    couponCode,
    giftWrapping,
    shippingMethodId,
  });
  const delivery = getEstimatedDelivery(shippingMethodId);
  const paymentLabel =
    PAYMENT_METHODS.find((m) => m.id === paymentMethodId)?.label ?? "Card";

  return (
    <motion.div
      variants={reducedMotion ? undefined : fadeInUp}
      initial={reducedMotion ? false : "hidden"}
      animate="visible"
      className="space-y-8"
    >
      <section aria-labelledby="review-shipping">
        <h3 id="review-shipping" className="label-caps-muted mb-3">
          Shipping to
        </h3>
        <address className="not-italic text-sm leading-relaxed">
          {shipping.firstName} {shipping.lastName}
          <br />
          {shipping.address}
          {shipping.apartment && (
            <>
              <br />
              {shipping.apartment}
            </>
          )}
          <br />
          {shipping.city}, {shipping.state} {shipping.zip}
          <br />
          {shipping.phone}
        </address>
      </section>

      <section aria-labelledby="review-items">
        <h3 id="review-items" className="label-caps-muted mb-4">
          Items ({items.reduce((s, i) => s + i.quantity, 0)})
        </h3>
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.id} className="flex gap-4">
              <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-[var(--radius-lg)]">
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="flex flex-1 justify-between gap-4 text-sm">
                <div>
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.selectedColor.name} / {item.selectedSize.label} · Qty {item.quantity}
                  </p>
                  {giftWrapping && (
                    <p className="mt-1 text-xs text-muted-foreground">Gift wrapped</p>
                  )}
                </div>
                <span className="tabular-nums">
                  {formatPrice(item.product.price * item.quantity)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-2 border-t border-border-subtle pt-6 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Payment</span>
          <span>{paymentLabel}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">{checkoutCopy.estimatedDelivery}</span>
          <span>{delivery}</span>
        </div>
        <div className="flex justify-between text-base font-medium pt-2">
          <span>Total</span>
          <span className="tabular-nums">{formatPrice(totals.total)}</span>
        </div>
      </section>
    </motion.div>
  );
}
