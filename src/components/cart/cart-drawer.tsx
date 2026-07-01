"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/components/providers/cart-provider";
import { useCheckoutPreferences } from "@/hooks/use-checkout-preferences";
import { formatPrice } from "@/lib/utils";
import { emptyStates } from "@/constants/branding";
import { checkoutCopy } from "@/constants/checkout";
import { calculateCartTotals } from "@/lib/cart-calculations";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Magnetic } from "@/components/motion/magnetic";
import { CartItemRow } from "@/components/cart/cart-item-row";
import { CouponInput } from "@/components/cart/coupon-input";
import { GiftWrapToggle } from "@/components/cart/gift-wrap-toggle";
import { FreeShippingProgress } from "@/components/cart/free-shipping-progress";
import { CartRecommendations } from "@/components/cart/cart-recommendations";
import { EmptyCartIllustration } from "@/components/cart/empty-cart-illustration";
import { UndoSnackbar } from "@/components/cart/undo-snackbar";
import { getTransition } from "@/lib/motion-config";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { CartItem } from "@/types/cart";

export function CartDrawer() {
  const { items, isOpen, closeCart, subtotal, itemCount, removeItemWithUndo, restoreItem } =
    useCart();
  const {
    couponCode,
    setCouponCode,
    giftWrapping,
    setGiftWrapping,
  } = useCheckoutPreferences();
  const [undoItem, setUndoItem] = useState<CartItem | null>(null);
  const reducedMotion = useReducedMotion();

  const totals = calculateCartTotals({ subtotal, couponCode, giftWrapping });

  const handleRemove = (id: string) => {
    const removed = removeItemWithUndo(id);
    if (removed) setUndoItem(removed);
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
        <SheetContent
          className="flex w-full flex-col surface-elevated sm:max-w-md"
          data-cursor="hidden"
          aria-describedby="cart-drawer-description"
        >
          <SheetHeader>
            <SheetTitle className="font-display text-2xl font-light">
              {emptyStates.cartBagTitle}
            </SheetTitle>
            <SheetDescription id="cart-drawer-description">
              {itemCount === 0
                ? emptyStates.cart
                : `${itemCount} item${itemCount !== 1 ? "s" : ""}`}
            </SheetDescription>
          </SheetHeader>

          {items.length === 0 ? (
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={getTransition(reducedMotion)}
              className="flex flex-1 flex-col items-center justify-center gap-6 text-center"
            >
              <EmptyCartIllustration />
              <p className="text-sm text-muted-foreground">{emptyStates.cart}</p>
              <Magnetic>
                <Button variant="luxury" onClick={closeCart} asChild>
                  <Link href="/shop">{emptyStates.cartCta}</Link>
                </Button>
              </Magnetic>
            </motion.div>
          ) : (
            <>
              <ScrollArea className="flex-1 -mx-6 px-6">
                <div className="space-y-6 py-4">
                  <FreeShippingProgress
                    progress={totals.shippingProgress}
                    remaining={totals.shippingRemaining}
                    qualified={totals.qualifiesForFreeShipping}
                  />

                  <motion.div layout className="space-y-6">
                    <AnimatePresence mode="popLayout">
                      {items.map((item, index) => (
                        <CartItemRow
                          key={item.id}
                          item={item}
                          index={index}
                          onRemove={handleRemove}
                          size="sm"
                        />
                      ))}
                    </AnimatePresence>
                  </motion.div>

                  <Separator />

                  <CouponInput
                    couponCode={couponCode}
                    onApply={setCouponCode}
                    compact
                  />

                  <GiftWrapToggle
                    checked={giftWrapping}
                    onCheckedChange={setGiftWrapping}
                  />

                  <CartRecommendations variant="drawer" />
                </div>
              </ScrollArea>

              <motion.div
                layout
                className="mt-auto space-y-4 border-t border-border pt-6"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <motion.span
                    key={subtotal}
                    initial={{ opacity: 0.5, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={getTransition(reducedMotion, 0.25)}
                    className="font-medium tabular-nums"
                  >
                    {formatPrice(subtotal)}
                  </motion.span>
                </div>
                {totals.discount > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Discount</span>
                    <span className="tabular-nums">−{formatPrice(totals.discount)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{checkoutCopy.taxEstimate}</span>
                  <span className="tabular-nums">{formatPrice(totals.tax)}</span>
                </div>
                <div className="flex items-center justify-between text-sm font-medium">
                  <span>Estimated total</span>
                  <motion.span
                    key={totals.total}
                    initial={{ opacity: 0.5, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="tabular-nums"
                  >
                    {formatPrice(totals.total)}
                  </motion.span>
                </div>
                <Magnetic>
                  <Button variant="cta" size="xl" className="w-full" asChild onClick={closeCart}>
                    <Link href="/checkout">{checkoutCopy.proceedToCheckout}</Link>
                  </Button>
                </Magnetic>
                <Button variant="ghost" size="sm" className="w-full" asChild onClick={closeCart}>
                  <Link href="/cart">{checkoutCopy.viewFullCart}</Link>
                </Button>
              </motion.div>
            </>
          )}
        </SheetContent>
      </Sheet>

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
