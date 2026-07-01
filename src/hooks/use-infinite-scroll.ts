"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseInfiniteScrollOptions {
  totalItems: number;
  pageSize?: number;
  rootMargin?: string;
}

export function useInfiniteScroll({
  totalItems,
  pageSize = 8,
  rootMargin = "200px",
}: UseInfiniteScrollOptions) {
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const [prevTotalItems, setPrevTotalItems] = useState(totalItems);
  const sentinelRef = useRef<HTMLDivElement>(null);

  if (prevTotalItems !== totalItems) {
    setPrevTotalItems(totalItems);
    setVisibleCount(pageSize);
  }

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + pageSize, totalItems));
  }, [pageSize, totalItems]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || visibleCount >= totalItems) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          loadMore();
        }
      },
      { rootMargin }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore, rootMargin, totalItems, visibleCount]);

  const visibleItems = Math.min(visibleCount, totalItems);
  const hasMore = visibleCount < totalItems;
  const isLoadingMore = hasMore;

  return {
    visibleCount: visibleItems,
    hasMore,
    isLoadingMore,
    sentinelRef,
    loadMore,
  };
}
