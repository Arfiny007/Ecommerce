"use client";

import { useCallback, useMemo } from "react";
import { useLocalStorage } from "@/hooks/use-media-query";

export function useWishlist() {
  const [wishlist, setWishlist] = useLocalStorage<string[]>("maison-wishlist", []);

  const isWishlisted = useCallback(
    (productId: string) => wishlist.includes(productId),
    [wishlist]
  );

  const toggleWishlist = useCallback(
    (productId: string) => {
      setWishlist((prev) =>
        prev.includes(productId)
          ? prev.filter((id) => id !== productId)
          : [...prev, productId]
      );
    },
    [setWishlist]
  );

  const count = useMemo(() => wishlist.length, [wishlist]);

  return { wishlist, count, isWishlisted, toggleWishlist };
}
