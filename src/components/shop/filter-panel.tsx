"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ShopPriceSlider } from "@/components/shop/shop-price-slider";
import {
  BRANDS,
  CATEGORIES,
  PRODUCTS,
  getShopFilterOptions,
} from "@/constants/products";
import { emptyStates } from "@/constants/branding";
import { cn } from "@/lib/utils";
import type { ShopFilterState } from "@/types/product";

interface FilterPanelProps {
  filters: ShopFilterState;
  onSearchChange: (search: string) => void;
  onCategoryChange: (category: string) => void;
  onPriceChange: (range: [number, number]) => void;
  onToggleSize: (size: string) => void;
  onToggleColor: (color: string) => void;
  onAvailabilityChange: (availability: ShopFilterState["availability"]) => void;
  onToggleBrand: (brand: string) => void;
  onClearAll: () => void;
  showSearch?: boolean;
  idPrefix?: string;
}

function FilterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs font-medium uppercase tracking-[0.15em]">{children}</h3>
  );
}

export function FilterPanel({
  filters,
  onSearchChange,
  onCategoryChange,
  onPriceChange,
  onToggleSize,
  onToggleColor,
  onAvailabilityChange,
  onToggleBrand,
  onClearAll,
  showSearch = true,
  idPrefix = "filter",
}: FilterPanelProps) {
  const { sizes, colors } = getShopFilterOptions();

  return (
    <div className="space-y-8">
      {showSearch && (
        <div>
          <FilterHeading>Search</FilterHeading>
          <div className="relative mt-3">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              id={`${idPrefix}-search`}
              placeholder="Search pieces..."
              value={filters.search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
              aria-label="Search products"
            />
          </div>
        </div>
      )}

      {showSearch && <Separator />}

      <div>
        <FilterHeading>Category</FilterHeading>
        <div className="mt-3 space-y-1" role="group" aria-label="Category filter">
          <button
            onClick={() => onCategoryChange("")}
            className={cn(
              "block w-full rounded-[var(--radius-lg)] px-2 py-1.5 text-left text-sm transition-luxury",
              !filters.category
                ? "bg-accent font-medium text-foreground"
                : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
            )}
          >
            All ({PRODUCTS.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => onCategoryChange(cat.slug)}
              className={cn(
                "block w-full rounded-[var(--radius-lg)] px-2 py-1.5 text-left text-sm transition-luxury",
                filters.category === cat.slug
                  ? "bg-accent font-medium text-foreground"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
              )}
            >
              {cat.label} ({cat.count})
            </button>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <FilterHeading>Price</FilterHeading>
        <div className="mt-4">
          <ShopPriceSlider value={filters.priceRange} onChange={onPriceChange} />
        </div>
      </div>

      <Separator />

      <div>
        <FilterHeading>Size</FilterHeading>
        <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Size filter">
          {sizes.map((size) => {
            const selected = filters.sizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => onToggleSize(size)}
                aria-pressed={selected}
                className={cn(
                  "min-w-[2.5rem] rounded-[var(--radius-lg)] border px-2.5 py-1.5 text-xs transition-luxury",
                  selected
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                )}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      <Separator />

      <div>
        <FilterHeading>Color</FilterHeading>
        <div className="mt-3 flex flex-wrap gap-3" role="group" aria-label="Color filter">
          {colors.map((color) => {
            const selected = filters.colors.includes(color.name);
            return (
              <button
                key={color.name}
                onClick={() => onToggleColor(color.name)}
                aria-pressed={selected}
                aria-label={color.name}
                title={color.name}
                className={cn(
                  "relative h-7 w-7 rounded-[var(--radius-full)] border-2 transition-luxury",
                  selected
                    ? "border-foreground ring-2 ring-foreground ring-offset-2 ring-offset-background"
                    : "border-border hover:scale-105"
                )}
                style={{ backgroundColor: color.hex }}
              />
            );
          })}
        </div>
      </div>

      <Separator />

      <div>
        <FilterHeading>Availability</FilterHeading>
        <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Availability filter">
          {(
            [
              { value: "all", label: "All" },
              { value: "in-stock", label: "In Stock" },
              { value: "sold-out", label: "Sold Out" },
            ] as const
          ).map((option) => (
            <button
              key={option.value}
              onClick={() => onAvailabilityChange(option.value)}
              aria-pressed={filters.availability === option.value}
              className={cn(
                "rounded-[var(--radius-full)] border px-3 py-1.5 text-xs transition-luxury",
                filters.availability === option.value
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <FilterHeading>Brand</FilterHeading>
        <div className="mt-3 space-y-2" role="group" aria-label="Brand filter">
          {BRANDS.map((brand) => {
            const selected = filters.brands.includes(brand.slug);
            return (
              <label
                key={brand.slug}
                className="flex cursor-pointer items-center gap-3 text-sm"
              >
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={() => onToggleBrand(brand.slug)}
                  className="h-4 w-4 rounded border-border accent-foreground"
                />
                <span
                  className={cn(
                    selected ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {brand.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <Button variant="outline" size="sm" onClick={onClearAll} className="w-full">
        {emptyStates.productsCta}
      </Button>
    </div>
  );
}
