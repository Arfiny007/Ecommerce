"use client";

import { useState, useMemo } from "react";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import { ShopProductCard } from "@/components/shop/shop-product-card";
import { ShopQuickView } from "@/components/shop/shop-quick-view";
import { ShopEmptyState } from "@/components/shop/shop-empty-state";
import { ShopLoadingSkeleton } from "@/components/shop/shop-loading-skeleton";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { cn } from "@/lib/utils";
import type { Product, ViewMode } from "@/types/product";

interface ShopProductGridProps {
  products: Product[];
  viewMode: ViewMode;
  isFiltered: boolean;
  onClearFilters: () => void;
  isInitialLoad?: boolean;
}

export function ShopProductGrid({
  products,
  viewMode,
  isFiltered,
  onClearFilters,
  isInitialLoad = false,
}: ShopProductGridProps) {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const { visibleCount, hasMore, sentinelRef } = useInfiniteScroll({
    totalItems: products.length,
    pageSize: 8,
  });

  const visibleProducts = useMemo(
    () => products.slice(0, visibleCount),
    [products, visibleCount]
  );

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setQuickViewOpen(true);
  };

  if (isInitialLoad) {
    return <ShopLoadingSkeleton viewMode={viewMode} />;
  }

  if (products.length === 0) {
    return <ShopEmptyState onClearFilters={onClearFilters} hasFilters={isFiltered} />;
  }

  return (
    <>
      <LayoutGroup>
        <AnimatePresence mode="popLayout">
          <div
            className={cn(
              "grid gap-6",
              viewMode === "grid"
                ? "grid-cols-2 md:grid-cols-2 xl:grid-cols-3"
                : "grid-cols-1"
            )}
            role="list"
            aria-label="Products"
          >
            {visibleProducts.map((product, index) => (
              <div key={product.id} role="listitem">
                <ShopProductCard
                  product={product}
                  viewMode={viewMode}
                  index={index}
                  onQuickView={handleQuickView}
                />
              </div>
            ))}
          </div>
        </AnimatePresence>
      </LayoutGroup>

      {hasMore && (
        <div ref={sentinelRef} className="py-8" aria-hidden>
          <ShopLoadingSkeleton viewMode={viewMode} count={viewMode === "grid" ? 3 : 2} />
        </div>
      )}

      <ShopQuickView
        product={quickViewProduct}
        open={quickViewOpen}
        onOpenChange={setQuickViewOpen}
      />
    </>
  );
}
