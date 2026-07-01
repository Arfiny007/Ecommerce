"use client";

import { useCallback, useMemo, useState } from "react";
import { PRODUCTS, SHOP_MAX_PRICE } from "@/constants/products";
import {
  DEFAULT_SHOP_FILTERS,
  filterProducts,
  getActiveFilterChips,
  hasActiveFilters,
} from "@/lib/shop-filters";
import type { ActiveFilterChip, ShopFilterState, SortOption } from "@/types/product";

export function useShopFilters(initial?: Partial<ShopFilterState>) {
  const [filters, setFilters] = useState<ShopFilterState>({
    ...DEFAULT_SHOP_FILTERS,
    priceRange: [0, SHOP_MAX_PRICE],
    ...initial,
  });

  const filteredProducts = useMemo(
    () => filterProducts(PRODUCTS, filters),
    [filters]
  );

  const activeChips = useMemo(
    () => getActiveFilterChips(filters),
    [filters]
  );

  const isFiltered = useMemo(() => hasActiveFilters(filters), [filters]);

  const setCategory = useCallback((category: string) => {
    setFilters((prev) => ({ ...prev, category }));
  }, []);

  const setSearch = useCallback((search: string) => {
    setFilters((prev) => ({ ...prev, search }));
  }, []);

  const setPriceRange = useCallback((priceRange: [number, number]) => {
    setFilters((prev) => ({ ...prev, priceRange }));
  }, []);

  const setSort = useCallback((sort: SortOption) => {
    setFilters((prev) => ({ ...prev, sort }));
  }, []);

  const toggleSize = useCallback((size: string) => {
    setFilters((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  }, []);

  const toggleColor = useCallback((color: string) => {
    setFilters((prev) => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter((c) => c !== color)
        : [...prev.colors, color],
    }));
  }, []);

  const setAvailability = useCallback(
    (availability: ShopFilterState["availability"]) => {
      setFilters((prev) => ({ ...prev, availability }));
    },
    []
  );

  const toggleBrand = useCallback((brand: string) => {
    setFilters((prev) => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter((b) => b !== brand)
        : [...prev.brands, brand],
    }));
  }, []);

  const removeChip = useCallback((chip: ActiveFilterChip) => {
    setFilters((prev) => {
      switch (chip.group) {
        case "category":
          return { ...prev, category: "" };
        case "search":
          return { ...prev, search: "" };
        case "priceRange":
          return { ...prev, priceRange: [0, SHOP_MAX_PRICE] };
        case "sizes":
          return {
            ...prev,
            sizes: prev.sizes.filter((s) => s !== chip.value),
          };
        case "colors":
          return {
            ...prev,
            colors: prev.colors.filter((c) => c !== chip.value),
          };
        case "availability":
          return { ...prev, availability: "all" };
        case "brands":
          return {
            ...prev,
            brands: prev.brands.filter((b) => b !== chip.value),
          };
        default:
          return prev;
      }
    });
  }, []);

  const clearAll = useCallback(() => {
    setFilters({
      ...DEFAULT_SHOP_FILTERS,
      priceRange: [0, SHOP_MAX_PRICE],
    });
  }, []);

  return {
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
  };
}
