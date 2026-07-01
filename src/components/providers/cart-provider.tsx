"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartContextValue, CartItem } from "@/types/cart";
import type { Product, ProductColor, ProductSize } from "@/types/product";
import { useLocalStorage } from "@/hooks/use-media-query";
import { storageKeys } from "@/constants/branding";

const CartContext = createContext<CartContextValue | null>(null);

function generateCartItemId(
  productId: string,
  color: string,
  size: string
): string {
  return `${productId}-${color}-${size}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useLocalStorage<CartItem[]>(storageKeys.cart, []);
  const [isOpen, setIsOpen] = useState(false);

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () =>
      items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      ),
    [items]
  );

  const addItem = useCallback(
    (
      product: Product,
      color: ProductColor,
      size: ProductSize,
      quantity = 1
    ) => {
      const id = generateCartItemId(product.id, color.name, size.label);
      setItems((prev) => {
        const existing = prev.find((item) => item.id === id);
        if (existing) {
          return prev.map((item) =>
            item.id === id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [
          ...prev,
          { id, product, quantity, selectedColor: color, selectedSize: size },
        ];
      });
      setIsOpen(true);
    },
    [setItems]
  );

  const removeItem = useCallback(
    (id: string) => {
      setItems((prev) => prev.filter((item) => item.id !== id));
    },
    [setItems]
  );

  const removeItemWithUndo = useCallback(
    (id: string): CartItem | null => {
      let removed: CartItem | null = null;
      setItems((prev) => {
        const item = prev.find((i) => i.id === id);
        if (!item) return prev;
        removed = item;
        return prev.filter((i) => i.id !== id);
      });
      return removed;
    },
    [setItems]
  );

  const restoreItem = useCallback(
    (item: CartItem) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.id === item.id);
        if (existing) {
          return prev.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          );
        }
        return [...prev, item];
      });
    },
    [setItems]
  );

  const updateQuantity = useCallback(
    (id: string, quantity: number) => {
      if (quantity <= 0) {
        setItems((prev) => prev.filter((item) => item.id !== id));
        return;
      }
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    },
    [setItems]
  );

  const clearCart = useCallback(() => setItems([]), [setItems]);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      isOpen,
      itemCount,
      subtotal,
      addItem,
      removeItem,
      removeItemWithUndo,
      restoreItem,
      updateQuantity,
      clearCart,
      openCart,
      closeCart,
      toggleCart,
    }),
    [
      items,
      isOpen,
      itemCount,
      subtotal,
      addItem,
      removeItem,
      removeItemWithUndo,
      restoreItem,
      updateQuantity,
      clearCart,
      openCart,
      closeCart,
      toggleCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
