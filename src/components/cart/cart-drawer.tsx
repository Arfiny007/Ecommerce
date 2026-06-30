"use client";

import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/components/providers/cart-provider";
import { formatPrice } from "@/lib/utils";
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

export function CartItemRow({
  id,
  product,
  quantity,
  selectedColor,
  selectedSize,
}: {
  id: string;
  product: import("@/types/product").Product;
  quantity: number;
  selectedColor: import("@/types/product").ProductColor;
  selectedSize: import("@/types/product").ProductSize;
}) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-4">
      <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-sm font-medium leading-tight">{product.name}</h4>
            <button
              onClick={() => removeItem(id)}
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Remove item"
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
            <span className="w-6 text-center text-sm">{quantity}</span>
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
          <span className="text-sm font-medium">
            {formatPrice(product.price * quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}

export function CartDrawer() {
  const { items, isOpen, closeCart, subtotal, itemCount } = useCart();
  const shippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl font-light">
            Your Bag
          </SheetTitle>
          <SheetDescription>
            {itemCount === 0
              ? "Your bag is empty"
              : `${itemCount} item${itemCount !== 1 ? "s" : ""}`}
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <p className="text-sm text-muted-foreground">
              Discover our curated collection
            </p>
            <Button variant="luxury" onClick={closeCart} asChild>
              <a href="/shop">Continue Shopping</a>
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-6 py-4">
                {items.map((item) => (
                  <CartItemRow key={item.id} {...item} />
                ))}
              </div>
            </ScrollArea>

            <div className="mt-auto space-y-4 border-t border-border pt-6">
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
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Shipping and taxes calculated at checkout
              </p>
              <Button variant="luxury" size="xl" className="w-full">
                Checkout
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
