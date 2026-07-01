"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useCart } from "@/components/providers/cart-provider";
import { useSavedForLater } from "@/hooks/use-saved-for-later";
import { useCheckoutPreferences } from "@/hooks/use-checkout-preferences";
import { CartItemRow } from "@/components/cart/cart-item-row";
import { CartRecommendations } from "@/components/cart/cart-recommendations";
import { CartTrustBadges } from "@/components/cart/cart-trust-badges";
import { CouponInput } from "@/components/cart/coupon-input";
import { GiftWrapToggle } from "@/components/cart/gift-wrap-toggle";
import { FreeShippingProgress } from "@/components/cart/free-shipping-progress";
import { EmptyCartIllustration } from "@/components/cart/empty-cart-illustration";
import { UndoSnackbar } from "@/components/cart/undo-snackbar";
import { OrderSummary } from "@/components/checkout/order-summary";
import { calculateCartTotals } from "@/lib/cart-calculations";
import { checkoutCopy } from "@/constants/checkout";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Magnetic } from "@/components/motion/magnetic";
import { useState } from "react";
import type { CartItem } from "@/types/cart";
import { formatPrice } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { CartShippingInfo } from "@/components/cart/cart-shipping-info";
import { fadeInUp } from "@/lib/animations";

export function SavedItemsSection() {
  const { savedItems, removeSaved, moveToCart } = useSavedForLater();
  const { restoreItem } = useCart();

  if (savedItems.length === 0) return null;

  const handleMoveToCart = (id: string) => {
    const item = moveToCart(id);
    if (item) restoreItem(item);
  };

  return (
    <section aria-labelledby="saved-items-heading" className="mt-16">
      <h2
        id="saved-items-heading"
        className="mb-6 font-display text-2xl font-light"
      >
        {checkoutCopy.savedItemsTitle}
      </h2>
      <ul className="space-y-4">
        {savedItems.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-4 rounded-[var(--radius-xl)] border border-border-subtle p-4"
          >
            <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-[var(--radius-lg)]">
              <Image
                src={item.product.images[0]}
                alt={item.product.name}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
            <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium">{item.product.name}</p>
                <p className="text-xs text-muted-foreground">
                  {item.selectedColor.name} / {item.selectedSize.label}
                </p>
                <p className="text-sm tabular-nums">
                  {formatPrice(item.product.price)}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleMoveToCart(item.id)}
                >
                  Move to bag
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSaved(item.id)}
                >
                  Remove
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function CartPageContent() {
  const { items, subtotal, removeItemWithUndo, restoreItem } = useCart();
  const { couponCode, setCouponCode, giftWrapping, setGiftWrapping } =
    useCheckoutPreferences();
  const [undoItem, setUndoItem] = useState<CartItem | null>(null);
  const reducedMotion = useReducedMotion();

  const totals = calculateCartTotals({ subtotal, couponCode, giftWrapping });

  const handleRemove = (id: string) => {
    const removed = removeItemWithUndo(id);
    if (removed) setUndoItem(removed);
  };

  if (items.length === 0) {
    return (
      <Container className="section-empty flex min-h-[60vh] flex-col items-center justify-center text-center">
        <motion.div
          variants={reducedMotion ? undefined : fadeInUp}
          initial={reducedMotion ? false : "hidden"}
          animate="visible"
          className="flex flex-col items-center gap-6"
        >
          <EmptyCartIllustration />
          <div>
            <h1 className="font-display text-3xl font-light md:text-4xl">
              {checkoutCopy.emptyCartTitle}
            </h1>
            <p className="mt-3 max-w-md text-sm text-muted-foreground">
              {checkoutCopy.emptyCartDescription}
            </p>
          </div>
          <Magnetic>
            <Button variant="luxury" size="xl" asChild>
              <Link href="/shop">{checkoutCopy.continueShopping}</Link>
            </Button>
          </Magnetic>
        </motion.div>
        <SavedItemsSection />
      </Container>
    );
  }

  return (
    <>
      <Container className="pb-24 pt-28 md:pt-32">
        <div className="mb-10">
          <Button variant="ghost" size="sm" className="mb-4 gap-2" asChild>
            <Link href="/shop">
              <ArrowLeft className="h-4 w-4" aria-hidden />
              {checkoutCopy.continueShopping}
            </Link>
          </Button>
          <h1 className="font-display text-4xl font-light md:text-5xl">
            {checkoutCopy.cartTitle}
          </h1>
          <p className="mt-2 text-muted-foreground">{checkoutCopy.cartSubtitle}</p>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <FreeShippingProgress
              progress={totals.shippingProgress}
              remaining={totals.shippingRemaining}
              qualified={totals.qualifiesForFreeShipping}
              className="mb-8"
            />

            <ul className="space-y-8" aria-label="Cart items">
              <AnimatePresence mode="popLayout">
                {items.map((item, index) => (
                  <li key={item.id}>
                    <CartItemRow
                      item={item}
                      index={index}
                      onRemove={handleRemove}
                      showSaveForLater
                    />
                  </li>
                ))}
              </AnimatePresence>
            </ul>

            <Separator className="my-10" />

            <div className="space-y-4">
              <CouponInput couponCode={couponCode} onApply={setCouponCode} />
              <GiftWrapToggle
                checked={giftWrapping}
                onCheckedChange={setGiftWrapping}
              />
            </div>

            <CartRecommendations variant="page" className="mt-12" />
            <CartShippingInfo />
            <SavedItemsSection />
          </div>

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28 lg:space-y-6">
              <OrderSummary
                subtotal={subtotal}
                items={items}
                showItems
                collapsible
              />
              <div className="hidden lg:block">
                <OrderSummary
                  subtotal={subtotal}
                  items={items}
                  showItems
                />
              </div>
              <Magnetic>
                <Button variant="cta" size="xl" className="hidden w-full lg:flex" asChild>
                  <Link href="/checkout">{checkoutCopy.proceedToCheckout}</Link>
                </Button>
              </Magnetic>
              <CartTrustBadges className="hidden lg:grid" />
            </div>
          </div>
        </div>

        <CartTrustBadges className="mt-12 lg:hidden" />

        <div className="fixed bottom-0 left-0 right-0 border-t border-border-subtle surface-glass p-4 lg:hidden">
          <Magnetic>
            <Button variant="cta" size="xl" className="w-full" asChild>
              <Link href="/checkout">{checkoutCopy.proceedToCheckout}</Link>
            </Button>
          </Magnetic>
        </div>
      </Container>

      <UndoSnackbar
        item={undoItem}
        onUndo={() => {
          if (undoItem) restoreItem(undoItem);
        }}
        onDismiss={() => setUndoItem(null)}
      />
    </>
  );
}
