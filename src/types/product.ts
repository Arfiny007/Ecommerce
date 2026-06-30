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

export interface ProductFilters {
  category?: string;
  collection?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: "newest" | "price-asc" | "price-desc" | "popular";
  search?: string;
}

export type ViewMode = "grid" | "list";
