export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductSize {
  label: string;
  available: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  category: string;
  collection?: string;
  images: string[];
  colors: ProductColor[];
  sizes: ProductSize[];
  tags: string[];
  featured?: boolean;
  bestseller?: boolean;
  new?: boolean;
  rating: number;
  reviewCount: number;
}

export type SortOption = "newest" | "price-asc" | "price-desc" | "popular";

export type AvailabilityFilter = "all" | "in-stock" | "sold-out";

export interface ShopFilterState {
  category: string;
  search: string;
  priceRange: [number, number];
  sort: SortOption;
  sizes: string[];
  colors: string[];
  availability: AvailabilityFilter;
  brands: string[];
}

export interface ProductFilters {
  category?: string;
  collection?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: SortOption;
  search?: string;
}

export type ViewMode = "grid" | "list";

export interface ActiveFilterChip {
  id: string;
  label: string;
  group: keyof ShopFilterState;
  value?: string;
}

export interface ProductDetailContent {
  materials: string;
  dimensions: string;
  care: string;
  shipping: string;
  returns: string;
  warranty: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified: boolean;
  images?: string[];
}
