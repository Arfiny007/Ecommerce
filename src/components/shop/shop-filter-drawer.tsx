"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FilterPanel } from "@/components/shop/filter-panel";
import type { ShopFilterState } from "@/types/product";

interface ShopFilterDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: ShopFilterState;
  onSearchChange: (search: string) => void;
  onCategoryChange: (category: string) => void;
  onPriceChange: (range: [number, number]) => void;
  onToggleSize: (size: string) => void;
  onToggleColor: (color: string) => void;
  onAvailabilityChange: (availability: ShopFilterState["availability"]) => void;
  onToggleBrand: (brand: string) => void;
  onClearAll: () => void;
  resultCount: number;
}

export function ShopFilterDrawer({
  open,
  onOpenChange,
  resultCount,
  ...panelProps
}: ShopFilterDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-full sm:max-w-sm p-0">
        <SheetHeader className="border-b border-border px-6 py-5 text-left">
          <SheetTitle>Refine</SheetTitle>
          <SheetDescription>
            {resultCount} piece{resultCount !== 1 ? "s" : ""} match your selection
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-5.5rem)] px-6 py-6">
          <FilterPanel {...panelProps} idPrefix="drawer" />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
