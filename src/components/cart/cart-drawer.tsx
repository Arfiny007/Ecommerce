"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/providers/cart-provider";
import { formatPrice } from "@/lib/utils";
import { emptyStates } from "@/constants/branding";
import { FREE_SHIPPING_THRESHOLD } from "@/constants/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { drawerItem } from "@/lib/animations";
import { getTransition } from "@/lib/motion-config";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function CartItemRow({
  id,
  product,
  quantity,
  selectedColor,
  selectedSize,
  index = 0,
}: {
  id: string;
  product: import("@/types/product").Product;
  quantity: number;
  selectedColor: import("@/types/product").ProductColor;
  selectedSize: import("@/types/product").ProductSize;
  index?: number;
}) {
  const { updateQuantity, removeItem } = useCart();
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      layout
      custom={index}
      variants={reducedMotion ? undefined : drawerItem}
      initial={reducedMotion ? false : "hidden"}
      animate="visible"
      exit="exit"
      className="flex gap-4"
    >
      <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl" data-cursor-image>
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-luxury hover:scale-105"
          sizes="80px"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-sm font-medium leading-tight">{product.name}</h4>
            <button
              onClick={() => removeItem(id)}
              className="text-muted-foreground transition-luxury hover:scale-110 hover:text-foreground"
              aria-label="Remove item"
              data-cursor="button"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {selectedColor.name} / {selectedSize.label}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => updateQuantity(id, quantity - 1)}
              aria-label="Decrease quantity"
            >
              <Minus className="h-3 w-3" />
            </Button>
            <motion.span
              key={quantity}
              initial={{ opacity: 0.5, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={getTransition(reducedMotion, 0.2)}
              className="w-6 text-center text-sm tabular-nums"
            >
              {quantity}
            </motion.span>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => updateQuantity(id, quantity + 1)}
              aria-label="Increase quantity"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <motion.span
            key={product.price * quantity}
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1 }}
            className="text-sm font-medium tabular-nums"
          >
            {formatPrice(product.price * quantity)}
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}

export function CartDrawer() {
  const { items, isOpen, closeCart, subtotal, itemCount } = useCart();
  const shippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const reducedMotion = useReducedMotion();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent className="flex w-full flex-col surface-elevated sm:max-w-md" data-cursor="hidden">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl font-light">
            {emptyStates.cartBagTitle}
          </SheetTitle>
          <SheetDescription>
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
            <motion.div
              animate={reducedMotion ? undefined : { y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              <ShoppingBag className="h-12 w-12 text-muted-foreground/40" />
            </motion.div>
            <p className="text-sm text-muted-foreground">{emptyStates.cart}</p>
            <Magnetic>
              <Button variant="luxury" onClick={closeCart} asChild>
                <a href="/shop">{emptyStates.cartCta}</a>
              </Button>
            </Magnetic>
          </motion.div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <motion.div layout className="space-y-6 py-4">
                <AnimatePresence mode="popLayout">
                  {items.map((item, index) => (
                    <CartItemRow key={item.id} {...item} index={index} />
                  ))}
                </AnimatePresence>
              </motion.div>
            </ScrollArea>

            <motion.div
              layout
              className="mt-auto space-y-4 border-t border-border pt-6"
            >
              {shippingRemaining > 0 && (
                <p className="text-center text-xs text-muted-foreground">
                  {formatPrice(shippingRemaining)} away from complimentary shipping
                </p>
              )}
              <div className="flex gap-2">
                <Input placeholder="Promo code" className="flex-1" />
                <Button variant="outline" size="sm">
                  Apply
                </Button>
              </div>
              <Separator />
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
              <p className="text-xs text-muted-foreground">
                Shipping and taxes calculated at checkout
              </p>
              <Magnetic>
                <Button variant="cta" size="xl" className="w-full">
                  Checkout
                </Button>
              </Magnetic>
            </motion.div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
