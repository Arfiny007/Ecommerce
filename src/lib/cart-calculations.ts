import {
  GIFT_WRAP_PRICE,
  STANDARD_SHIPPING_COST,
  TAX_RATE,
  VALID_PROMO_CODES,
  SHIPPING_METHODS,
  type ShippingMethodId,
} from "@/constants/checkout";
import { FREE_SHIPPING_THRESHOLD } from "@/constants/site";

export interface CartTotalsInput {
  subtotal: number;
  couponCode?: string | null;
  giftWrapping?: boolean;
  shippingMethodId?: ShippingMethodId;
}

export interface CartTotals {
  subtotal: number;
  discount: number;
  discountPercent: number;
  shipping: number;
  tax: number;
  giftWrap: number;
  total: number;
  qualifiesForFreeShipping: boolean;
  shippingRemaining: number;
  shippingProgress: number;
}

export function getDiscountPercent(code: string | null | undefined): number {
  if (!code) return 0;
  return VALID_PROMO_CODES[code.toUpperCase()] ?? 0;
}

export function isValidPromoCode(code: string): boolean {
  return code.toUpperCase() in VALID_PROMO_CODES;
}

export function calculateCartTotals({
  subtotal,
  couponCode,
  giftWrapping = false,
  shippingMethodId = "standard",
}: CartTotalsInput): CartTotals {
  const discountPercent = getDiscountPercent(couponCode);
  const discount = Math.round(subtotal * discountPercent);
  const afterDiscount = subtotal - discount;
  const giftWrap = giftWrapping ? GIFT_WRAP_PRICE : 0;

  const qualifiesForFreeShipping = afterDiscount >= FREE_SHIPPING_THRESHOLD;
  const method = SHIPPING_METHODS.find((m) => m.id === shippingMethodId);
  const baseShipping = qualifiesForFreeShipping
    ? 0
    : STANDARD_SHIPPING_COST;
  const methodExtra =
    method && method.id !== "standard" ? method.cost : 0;
  const shipping = baseShipping + methodExtra;

  const taxableAmount = afterDiscount + giftWrap + shipping;
  const tax = Math.round(taxableAmount * TAX_RATE * 100) / 100;
  const total = afterDiscount + giftWrap + shipping + tax;

  const shippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - afterDiscount);
  const shippingProgress = Math.min(
    100,
    (afterDiscount / FREE_SHIPPING_THRESHOLD) * 100
  );

  return {
    subtotal,
    discount,
    discountPercent,
    shipping,
    tax,
    giftWrap,
    total,
    qualifiesForFreeShipping,
    shippingRemaining,
    shippingProgress,
  };
}

export function getEstimatedDelivery(
  shippingMethodId: ShippingMethodId = "standard"
): string {
  const method = SHIPPING_METHODS.find((m) => m.id === shippingMethodId);
  if (!method) return "5–7 business days";

  const start = new Date();
  const addDays = (days: number) => {
    const d = new Date(start);
    let added = 0;
    while (added < days) {
      d.setDate(d.getDate() + 1);
      if (d.getDay() !== 0 && d.getDay() !== 6) added++;
    }
    return d;
  };

  const minDate = addDays(method.daysMin);
  const maxDate = addDays(method.daysMax);

  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric" });

  if (method.daysMin === method.daysMax) {
    return fmt(minDate);
  }
  return `${fmt(minDate)} – ${fmt(maxDate)}`;
}

export function generateOrderNumber(): string {
  const year = new Date().getFullYear();
  const num = Math.floor(1000 + Math.random() * 9000);
  return `FF-${year}-${num}`;
}
