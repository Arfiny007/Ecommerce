"use client";

import { useState, useMemo, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Grid3X3, LayoutList, SlidersHorizontal } from "lucide-react";
import { PRODUCTS, CATEGORIES } from "@/constants/products";
import { description, emptyStates } from "@/constants/branding";
import { Section } from "@/components/common/section";
import { Container } from "@/components/common/container";
import { Heading, Eyebrow, Body } from "@/components/common/typography";
import { ProductCard } from "@/components/home/featured-products";
import { MotionStagger } from "@/components/common/motion-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Surface } from "@/components/common/surface";
import type { ViewMode } from "@/types/product";

const MAX_PRICE = 2500;

export function ShopPageContent() {
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, MAX_PRICE]);
  const [localCategory, setLocalCategory] = useState(
    searchParams.get("category") || ""
  );
  const [sort, setSort] = useState(searchParams.get("sort") || "newest");
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (localCategory) {
      result = result.filter((p) => p.category === localCategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q))
      );
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "popular":
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case "newest":
      default:
        result.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));
    }

    return result;
  }, [localCategory, search, priceRange, sort]);

  const clearFilters = useCallback(() => {
    setLocalCategory("");
    setPriceRange([0, MAX_PRICE]);
    setSearch("");
    setSort("newest");
  }, []);

  return (
    <>
      <div className="border-b border-border-subtle bg-surface-muted pt-24 pb-12 md:pt-32">
        <Container>
          <Eyebrow>Shop</Eyebrow>
          <Heading className="mt-3">All Products</Heading>
          <Body className="mt-4 prose-width">{description}</Body>
        </Container>
      </div>

      <Section noPadding className="py-8 md:py-12">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row">
            <aside
              className={cn(
                "lg:sticky lg:top-28 lg:w-64 lg:shrink-0 lg:self-start",
                sidebarOpen ? "block" : "hidden lg:block"
              )}
            >
              <Surface variant="bordered" rounded="2xl" padding="md" className="space-y-8">
                <div>
                  <h3 className="text-xs font-medium uppercase tracking-[0.15em]">
                    Search
                  </h3>
                  <Input
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="mt-3"
                  />
                </div>

                <Separator />

                <div>
                  <h3 className="text-xs font-medium uppercase tracking-[0.15em]">
                    Category
                  </h3>
                  <div className="mt-3 space-y-2">
                    <button
                      onClick={() => setLocalCategory("")}
                      className={cn(
                        "block w-full text-left text-sm transition-colors",
                        !localCategory
                          ? "font-medium text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      All ({PRODUCTS.length})
                    </button>
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.slug}
                        onClick={() => setLocalCategory(cat.slug)}
                        className={cn(
                          "block w-full text-left text-sm transition-colors",
                          localCategory === cat.slug
                            ? "font-medium text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {cat.label} ({cat.count})
                      </button>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-xs font-medium uppercase tracking-[0.15em]">
                    Price Range
                  </h3>
                  <Slider
                    min={0}
                    max={MAX_PRICE}
                    step={50}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mt-6"
                  />
                  <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                <Button variant="outline" size="sm" onClick={clearFilters} className="w-full">
                  {emptyStates.productsCta}
                </Button>
              </Surface>
            </aside>

            <div className="flex-1">
              <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="lg:hidden"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    {filteredProducts.length} product
                    {filteredProducts.length !== 1 ? "s" : ""}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="h-9 rounded-full border border-input bg-transparent px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="newest">Newest</option>
                    <option value="popular">Popular</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>

                  <div className="flex rounded-full border border-border">
                    <Button
                      variant={viewMode === "grid" ? "secondary" : "ghost"}
                      size="icon"
                      className="h-9 w-9 rounded-full"
                      onClick={() => setViewMode("grid")}
                      aria-label="Grid view"
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "secondary" : "ghost"}
                      size="icon"
                      className="h-9 w-9 rounded-full"
                      onClick={() => setViewMode("list")}
                      aria-label="List view"
                    >
                      <LayoutList className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <Heading as="h3" className="text-2xl">
                    {emptyStates.products}
                  </Heading>
                  <Body className="mt-4">
                    Try adjusting your filters or search terms.
                  </Body>
                  <Button variant="luxury" className="mt-8" onClick={clearFilters}>
                    {emptyStates.productsCta}
                  </Button>
                </div>
              ) : (
                <MotionStagger
                  className={cn(
                    "grid gap-6",
                    viewMode === "grid"
                      ? "grid-cols-2 md:grid-cols-3"
                      : "grid-cols-1"
                  )}
                >
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </MotionStagger>
              )}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
