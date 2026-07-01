"use client";

import { useCallback, useMemo } from "react";
import { useLocalStorage } from "@/hooks/use-media-query";
import { storageKeys } from "@/constants/branding";

const MAX_COMPARE = 4;

export function useCompare() {
  const [compareList, setCompareList] = useLocalStorage<string[]>(
    storageKeys.compare,
    []
  );

  const isCompared = useCallback(
    (productId: string) => compareList.includes(productId),
    [compareList]
  );

  const toggleCompare = useCallback(
    (productId: string) => {
      setCompareList((prev) => {
        if (prev.includes(productId)) {
          return prev.filter((id) => id !== productId);
        }
        if (prev.length >= MAX_COMPARE) {
          return [...prev.slice(1), productId];
        }
        return [...prev, productId];
      });
    },
    [setCompareList]
  );

  const count = useMemo(() => compareList.length, [compareList]);

  return { compareList, count, isCompared, toggleCompare, maxCompare: MAX_COMPARE };
}
