"use client";

import { useCallback, useMemo } from "react";
import { useLocalStorage } from "@/hooks/use-media-query";
import { storageKeys } from "@/constants/branding";
import { getProductsByIds } from "@/constants/products";

const MAX_RECENT = 8;

export function useRecentlyViewed() {
  const [viewedIds, setViewedIds] = useLocalStorage<string[]>(
    storageKeys.recentlyViewed,
    []
  );

  const addViewed = useCallback(
    (productId: string) => {
      setViewedIds((prev) => {
        const filtered = prev.filter((id) => id !== productId);
        return [productId, ...filtered].slice(0, MAX_RECENT);
      });
    },
    [setViewedIds]
  );

  const getRecentProducts = useCallback(
    (excludeId?: string) => {
      const ids = excludeId
        ? viewedIds.filter((id) => id !== excludeId)
        : viewedIds;
      return getProductsByIds(ids);
    },
    [viewedIds]
  );

  const count = useMemo(() => viewedIds.length, [viewedIds]);

  return { viewedIds, count, addViewed, getRecentProducts, maxRecent: MAX_RECENT };
}
