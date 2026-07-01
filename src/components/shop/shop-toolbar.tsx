"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Grid3X3, LayoutList, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShopSortDropdown } from "@/components/shop/shop-sort-dropdown";
import { cn } from "@/lib/utils";
import { getTransition } from "@/lib/motion-config";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { SortOption, ViewMode } from "@/types/product";

interface ShopToolbarProps {
  count: number;
  sort: SortOption;
  viewMode: ViewMode;
  activeFilterCount: number;
  onSortChange: (sort: SortOption) => void;
  onViewModeChange: (mode: ViewMode) => void;
  onOpenFilters: () => void;
}

export function ShopToolbar({
  count,
  sort,
  viewMode,
  activeFilterCount,
  onSortChange,
  onViewModeChange,
  onOpenFilters,
}: ShopToolbarProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "sticky top-[4.5rem] z-30 mb-6 border-b border-border-subtle bg-background/85 py-4 backdrop-blur-[var(--blur-md)] md:top-20"
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 rounded-[var(--radius-full)] lg:hidden"
            onClick={onOpenFilters}
            aria-label="Open filters"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-[var(--radius-full)] bg-foreground px-1.5 text-micro text-background">
                {activeFilterCount}
              </span>
            )}
          </Button>

          <p className="text-sm text-muted-foreground" aria-live="polite" aria-atomic="true">
            <AnimatePresence mode="wait">
              <motion.span
                key={count}
                initial={reducedMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -6 }}
                transition={getTransition(reducedMotion, 0.25)}
                className="inline-block tabular-nums"
              >
                {count}
              </motion.span>
            </AnimatePresence>
            {" "}piece{count !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <ShopSortDropdown value={sort} onChange={onSortChange} />

          <div
            className="flex rounded-[var(--radius-full)] border border-border p-0.5"
            role="group"
            aria-label="View mode"
          >
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8 rounded-[var(--radius-full)]"
              onClick={() => onViewModeChange("grid")}
              aria-label="Grid view"
              aria-pressed={viewMode === "grid"}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8 rounded-[var(--radius-full)]"
              onClick={() => onViewModeChange("list")}
              aria-label="List view"
              aria-pressed={viewMode === "list"}
            >
              <LayoutList className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
