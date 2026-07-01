import { BRANDS, CATEGORIES, PRODUCTS, isProductInStock, SHOP_MAX_PRICE } from "@/constants/products";
import { formatPrice } from "@/lib/utils";
import type { ActiveFilterChip, Product, ShopFilterState, SortOption } from "@/types/product";

export const DEFAULT_SHOP_FILTERS: ShopFilterState = {
  category: "",
  search: "",
  priceRange: [0, SHOP_MAX_PRICE],
  sort: "newest",
  sizes: [],
  colors: [],
  availability: "all",
  brands: [],
};

export function filterProducts(
  products: Product[],
  filters: ShopFilterState
): Product[] {
  let result = products;

  if (filters.category) {
    result = result.filter((p) => p.category === filters.category);
  }

  if (filters.search.trim()) {
    const q = filters.search.toLowerCase().trim();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.includes(q))
    );
  }

  result = result.filter(
    (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
  );

  if (filters.sizes.length > 0) {
    result = result.filter((p) =>
      filters.sizes.some((size) =>
        p.sizes.some((s) => s.label === size && s.available)
      )
    );
  }

  if (filters.colors.length > 0) {
    result = result.filter((p) =>
      filters.colors.some((color) => p.colors.some((c) => c.name === color))
    );
  }

  if (filters.availability === "in-stock") {
    result = result.filter((p) => isProductInStock(p));
  } else if (filters.availability === "sold-out") {
    result = result.filter((p) => !isProductInStock(p));
  }

  if (filters.brands.length > 0) {
    result = result.filter(
      (p) => p.collection && filters.brands.includes(p.collection)
    );
  }

  return sortProducts([...result], filters.sort);
}

export function sortProducts(products: Product[], sort: SortOption): Product[] {
  const result = [...products];

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
}

export function getActiveFilterChips(filters: ShopFilterState): ActiveFilterChip[] {
  const chips: ActiveFilterChip[] = [];

  if (filters.category) {
    const cat = CATEGORIES.find((c) => c.slug === filters.category);
    chips.push({
      id: `category-${filters.category}`,
      label: cat?.label ?? filters.category,
      group: "category",
    });
  }

  if (filters.search.trim()) {
    chips.push({
      id: "search",
      label: `"${filters.search.trim()}"`,
      group: "search",
    });
  }

  if (filters.priceRange[0] > 0 || filters.priceRange[1] < SHOP_MAX_PRICE) {
    chips.push({
      id: "price",
      label: `${formatPrice(filters.priceRange[0])} – ${formatPrice(filters.priceRange[1])}`,
      group: "priceRange",
    });
  }

  for (const size of filters.sizes) {
    chips.push({
      id: `size-${size}`,
      label: size,
      group: "sizes",
      value: size,
    });
  }

  for (const color of filters.colors) {
    chips.push({
      id: `color-${color}`,
      label: color,
      group: "colors",
      value: color,
    });
  }

  if (filters.availability !== "all") {
    chips.push({
      id: "availability",
      label: filters.availability === "in-stock" ? "In Stock" : "Sold Out",
      group: "availability",
    });
  }

  for (const brand of filters.brands) {
    const b = BRANDS.find((item) => item.slug === brand);
    chips.push({
      id: `brand-${brand}`,
      label: b?.label ?? brand,
      group: "brands",
      value: brand,
    });
  }

  return chips;
}

export function hasActiveFilters(filters: ShopFilterState): boolean {
  return getActiveFilterChips(filters).length > 0;
}
