"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { description } from "@/constants/branding";
import { SHOP_MAX_PRICE } from "@/constants/products";
import { Section } from "@/components/common/section";
import { Container } from "@/components/common/container";
import { Heading, Eyebrow, Body } from "@/components/common/typography";
import { ShopFilterSidebar } from "@/components/shop/shop-filter-sidebar";
import { ShopFilterDrawer } from "@/components/shop/shop-filter-drawer";
import { ShopFilterChips } from "@/components/shop/shop-filter-chips";
import { ShopCategoryPills } from "@/components/shop/shop-category-pills";
import { ShopToolbar } from "@/components/shop/shop-toolbar";
import { ShopProductGrid } from "@/components/shop/shop-product-grid";
import { useShopFilters } from "@/hooks/use-shop-filters";
import type { SortOption, ViewMode } from "@/types/product";

export function ShopPageContent() {
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  const {
    filters,
    filteredProducts,
    activeChips,
    isFiltered,
    setCategory,
    setSearch,
    setPriceRange,
    setSort,
    toggleSize,
    toggleColor,
    setAvailability,
    toggleBrand,
    removeChip,
    clearAll,
  } = useShopFilters({
    category: searchParams.get("category") || "",
    sort: (searchParams.get("sort") as SortOption) || "newest",
    priceRange: [0, SHOP_MAX_PRICE],
  });

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const filterPanelProps = {
    filters,
    onSearchChange: setSearch,
    onCategoryChange: setCategory,
    onPriceChange: setPriceRange,
    onToggleSize: toggleSize,
    onToggleColor: toggleColor,
    onAvailabilityChange: setAvailability,
    onToggleBrand: toggleBrand,
    onClearAll: clearAll,
  };

  return (
    <>
      <div className="border-b border-border-subtle bg-surface-muted pt-24 pb-10 md:pt-32 md:pb-14">
        <Container>
          <Eyebrow>Shop</Eyebrow>
          <Heading className="mt-3">All Products</Heading>
          <Body className="mt-4 prose-width">{description}</Body>
          <ShopCategoryPills
            activeCategory={filters.category}
            onCategoryChange={setCategory}
            className="mt-8"
          />
        </Container>
      </div>

      <Section noPadding className="py-8 md:py-12">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
            <ShopFilterSidebar {...filterPanelProps} />

            <div className="min-w-0 flex-1">
              <ShopToolbar
                count={filteredProducts.length}
                sort={filters.sort}
                viewMode={viewMode}
                activeFilterCount={activeChips.length}
                onSortChange={setSort}
                onViewModeChange={setViewMode}
                onOpenFilters={() => setDrawerOpen(true)}
              />

              {activeChips.length > 0 && (
                <div className="mt-6">
                  <ShopFilterChips
                    chips={activeChips}
                    onRemove={removeChip}
                    onClearAll={clearAll}
                  />
                </div>
              )}

              <div className="mt-8">
                <ShopProductGrid
                  products={filteredProducts}
                  viewMode={viewMode}
                  isFiltered={isFiltered}
                  onClearFilters={clearAll}
                  isInitialLoad={!isHydrated}
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <ShopFilterDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        resultCount={filteredProducts.length}
        {...filterPanelProps}
      />
    </>
  );
}
