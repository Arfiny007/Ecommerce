"use client";

import { Surface } from "@/components/common/surface";
import { FilterPanel } from "@/components/shop/filter-panel";
import { cn } from "@/lib/utils";
import type { ShopFilterState } from "@/types/product";

interface ShopFilterSidebarProps {
  filters: ShopFilterState;
  onSearchChange: (search: string) => void;
  onCategoryChange: (category: string) => void;
  onPriceChange: (range: [number, number]) => void;
  onToggleSize: (size: string) => void;
  onToggleColor: (color: string) => void;
  onAvailabilityChange: (availability: ShopFilterState["availability"]) => void;
  onToggleBrand: (brand: string) => void;
  onClearAll: () => void;
  className?: string;
}

export function ShopFilterSidebar(props: ShopFilterSidebarProps) {
  const { className, ...panelProps } = props;

  return (
    <aside
      className={cn(
        "hidden lg:block lg:sticky lg:top-28 lg:w-72 lg:shrink-0 lg:self-start",
        className
      )}
      aria-label="Product filters"
    >
      <Surface variant="bordered" rounded="2xl" padding="md">
        <FilterPanel {...panelProps} idPrefix="sidebar" />
      </Surface>
    </aside>
  );
}
