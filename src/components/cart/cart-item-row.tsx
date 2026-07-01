"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, X, Bookmark } from "lucide-react";
import { useCart } from "@/components/providers/cart-provider";
import { useSavedForLater } from "@/hooks/use-saved-for-later";
import { formatPrice } from "@/lib/utils";
import { checkoutCopy } from "@/constants/checkout";
import { Button } from "@/components/ui/button";
import { drawerItem } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { getTransition } from "@/lib/motion-config";
import type { CartItem } from "@/types/cart";

interface CartItemRowProps {
  item: CartItem;
  index?: number;
  onRemove?: (id: string) => void;
  showSaveForLater?: boolean;
  size?: "sm" | "md";
}

export function CartItemRow({
  item,
  index = 0,
  onRemove,
  showSaveForLater = false,
  size = "md",
}: CartItemRowProps) {
  const { id, product, quantity, selectedColor, selectedSize } = item;
  const { updateQuantity, removeItemWithUndo } = useCart();
  const { saveForLater } = useSavedForLater();
  const reducedMotion = useReducedMotion();

  const handleRemove = () => {
    if (onRemove) {
      onRemove(id);
    } else {
      removeItemWithUndo(id);
    }
  };

  const handleSave = () => {
    saveForLater(item);
    if (onRemove) onRemove(id);
    else removeItemWithUndo(id);
  };

  const imgSize = size === "sm" ? "h-20 w-16" : "h-28 w-20";

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
      <Link
        href={`/product/${product.slug}`}
        className={`relative ${imgSize} shrink-0 overflow-hidden rounded-[var(--radius-xl)]`}
        data-cursor-image
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-luxury hover:scale-105"
          sizes="100px"
        />
      </Link>
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <Link
              href={`/product/${product.slug}`}
              className="text-sm font-medium leading-tight transition-luxury hover:text-muted-foreground"
            >
              {product.name}
            </Link>
            <div className="flex items-center gap-1">
              {showSaveForLater && (
                <button
                  onClick={handleSave}
                  className="text-muted-foreground transition-luxury hover:text-foreground"
                  aria-label="Save for later"
                >
                  <Bookmark className="h-3.5 w-3.5" />
                </button>
              )}
              <button
                onClick={handleRemove}
                className="text-muted-foreground transition-luxury hover:scale-110 hover:text-foreground"
                aria-label={`Remove ${product.name}`}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
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
            <AnimatePresence mode="popLayout">
              <motion.span
                key={quantity}
                initial={{ opacity: 0.5, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={getTransition(reducedMotion, 0.2)}
                className="w-6 text-center text-sm tabular-nums"
              >
                {quantity}
              </motion.span>
            </AnimatePresence>
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
