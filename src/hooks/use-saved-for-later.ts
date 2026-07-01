"use client";

import { useCallback } from "react";
import { useLocalStorage } from "@/hooks/use-media-query";
import { storageKeys } from "@/constants/branding";
import type { CartItem } from "@/types/cart";

export function useSavedForLater() {
  const [savedItems, setSavedItems] = useLocalStorage<CartItem[]>(
    storageKeys.savedForLater,
    []
  );

  const saveForLater = useCallback(
    (item: CartItem) => {
      setSavedItems((prev) => {
        if (prev.some((i) => i.id === item.id)) return prev;
        return [...prev, item];
      });
    },
    [setSavedItems]
  );

  const removeSaved = useCallback(
    (id: string) => {
      setSavedItems((prev) => prev.filter((item) => item.id !== id));
    },
    [setSavedItems]
  );

  const moveToCart = useCallback(
    (id: string): CartItem | null => {
      let moved: CartItem | null = null;
      setSavedItems((prev) => {
        const item = prev.find((i) => i.id === id);
        if (!item) return prev;
        moved = item;
        return prev.filter((i) => i.id !== id);
      });
      return moved;
    },
    [setSavedItems]
  );

  return {
    savedItems,
    saveForLater,
    removeSaved,
    moveToCart,
    count: savedItems.length,
  };
}
