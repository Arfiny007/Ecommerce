import type { Product } from "@/types/product";

const IMG = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?w=${w}&q=85&auto=format&fit=crop`;

export const PRODUCTS: Product[] = [
  {
    id: "1",
    slug: "cashmere-overcoat",
    name: "Cashmere Overcoat",
    description:
      "Double-faced cashmere overcoat with relaxed tailoring and horn buttons. Crafted in Italy from the finest Mongolian cashmere.",
    price: 1890,
    compareAtPrice: 2200,
    category: "ready-to-wear",
    collection: "ss26",
    images: [
      IMG("photo-1539533018447-63fcce2678e3"),
      IMG("photo-1591047139820-d91fecd50f1b"),
      IMG("photo-1594938298603-c8148c4dae35"),
    ],
    colors: [
      { name: "Charcoal", hex: "#3d3d3d" },
      { name: "Camel", hex: "#c4a882" },
      { name: "Ivory", hex: "#f5f0e8" },
    ],
    sizes: [
      { label: "XS", available: true },
      { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: false },
      { label: "XL", available: true },
    ],
    tags: ["outerwear", "cashmere", "winter"],
    featured: true,
    bestseller: true,
    rating: 4.9,
    reviewCount: 47,
  },
  {
    id: "2",
    slug: "silk-crepe-blouse",
    name: "Silk Crepe Blouse",
    description:
      "Fluid silk crepe blouse with concealed placket and mother-of-pearl buttons. An essential silhouette reimagined.",
    price: 680,
    category: "ready-to-wear",
    collection: "essentials",
    images: [
      IMG("photo-1564257631407-4deb1f99d992"),
      IMG("photo-1585487000160-6ebcfceb0d03"),
    ],
    colors: [
      { name: "Pearl", hex: "#f5f0e8" },
      { name: "Noir", hex: "#0a0a0a" },
    ],
    sizes: [
      { label: "XS", available: true },
      { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: true },
    ],
    tags: ["tops", "silk"],
    new: true,
    rating: 4.8,
    reviewCount: 32,
  },
  {
    id: "3",
    slug: "leather-crossbody",
    name: "Leather Crossbody",
    description:
      "Vegetable-tanned leather crossbody with brushed gold hardware. Hand-stitched in Florence.",
    price: 1250,
    category: "accessories",
    collection: "essentials",
    images: [
      IMG("photo-1548036328-c9fa89d128fa"),
      IMG("photo-1590871191283-3c32b3c0c0e0"),
    ],
    colors: [
      { name: "Tan", hex: "#c4a882" },
      { name: "Black", hex: "#0a0a0a" },
    ],
    sizes: [{ label: "One Size", available: true }],
    tags: ["bags", "leather"],
    bestseller: true,
    rating: 4.9,
    reviewCount: 89,
  },
  {
    id: "4",
    slug: "wool-trousers",
    name: "Wool Tailored Trousers",
    description:
      "High-rise wool trousers with pressed crease and side adjusters. Cut from Super 120s merino wool.",
    price: 520,
    category: "ready-to-wear",
    collection: "ss26",
    images: [
      IMG("photo-1594938298603-c8148c4dae35"),
      IMG("photo-1509631179647-0177331693ae"),
    ],
    colors: [
      { name: "Graphite", hex: "#3d3d3d" },
      { name: "Stone", hex: "#a8a29e" },
    ],
    sizes: [
      { label: "28", available: true },
      { label: "30", available: true },
      { label: "32", available: true },
      { label: "34", available: false },
      { label: "36", available: true },
    ],
    tags: ["bottoms", "wool"],
    rating: 4.7,
    reviewCount: 24,
  },
  {
    id: "5",
    slug: "suede-loafers",
    name: "Suede Penny Loafers",
    description:
      "Hand-lasted suede loafers with leather sole and cushioned insole. Made in Portugal.",
    price: 890,
    category: "footwear",
    collection: "ss26",
    images: [
      IMG("photo-1614252235316-8c857d38b5f4"),
      IMG("photo-1533867610400-7dd949b74520"),
    ],
    colors: [
      { name: "Sand", hex: "#c4a882" },
      { name: "Navy", hex: "#1e3a5f" },
    ],
    sizes: [
      { label: "39", available: true },
      { label: "40", available: true },
      { label: "41", available: true },
      { label: "42", available: false },
      { label: "43", available: true },
    ],
    tags: ["shoes", "suede"],
    new: true,
    rating: 4.8,
    reviewCount: 56,
  },
  {
    id: "6",
    slug: "eau-de-parfum",
    name: "Eau de Parfum No. 7",
    description:
      "A composition of bergamot, iris, and white musk. Created by master perfumer in Grasse.",
    price: 320,
    category: "fragrance",
    collection: "limited",
    images: [
      IMG("photo-1541643600914-78b084683601"),
      IMG("photo-1592945403244-b3fbafd7f539"),
    ],
    colors: [{ name: "Clear", hex: "#f5f0e8" }],
    sizes: [
      { label: "50ml", available: true },
      { label: "100ml", available: true },
    ],
    tags: ["fragrance", "limited"],
    featured: true,
    rating: 5.0,
    reviewCount: 112,
  },
  {
    id: "7",
    slug: "linen-shirt",
    name: "Linen Camp Collar Shirt",
    description:
      "Relaxed camp collar shirt in washed Belgian linen. Breathable and effortlessly refined.",
    price: 380,
    category: "ready-to-wear",
    collection: "ss26",
    images: [
      IMG("photo-1596755094514-f87e34085b2c"),
      IMG("photo-1602810318383-e386cc2a3ccf"),
    ],
    colors: [
      { name: "White", hex: "#fafaf8" },
      { name: "Sage", hex: "#9ca88f" },
    ],
    sizes: [
      { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: true },
      { label: "XL", available: true },
    ],
    tags: ["tops", "linen"],
    rating: 4.6,
    reviewCount: 18,
  },
  {
    id: "8",
    slug: "ceramic-vessel",
    name: "Ceramic Vessel",
    description:
      "Hand-thrown stoneware vessel with matte glaze. A sculptural object for the considered home.",
    price: 240,
    category: "home",
    collection: "essentials",
    images: [
      IMG("photo-1615529328331-f8917597711f"),
      IMG("photo-1578500494198-246f612d3b4d"),
    ],
    colors: [{ name: "Stone", hex: "#a8a29e" }],
    sizes: [{ label: "One Size", available: true }],
    tags: ["home", "ceramic"],
    rating: 4.9,
    reviewCount: 41,
  },
];

export const SHOP_MAX_PRICE = 2500;

export const CATEGORIES = [
  { slug: "ready-to-wear", label: "Ready-to-Wear", count: 4 },
  { slug: "accessories", label: "Accessories", count: 1 },
  { slug: "footwear", label: "Footwear", count: 1 },
  { slug: "fragrance", label: "Fragrance", count: 1 },
  { slug: "home", label: "Home", count: 1 },
] as const;

export const BRANDS = [
  { slug: "ss26", label: "SS26 Collection" },
  { slug: "essentials", label: "FINY Essentials" },
  { slug: "limited", label: "Limited Edition" },
] as const;

export function isProductInStock(product: Product): boolean {
  return product.sizes.some((s) => s.available);
}

export function getShopFilterOptions() {
  const sizeSet = new Set<string>();
  const colorMap = new Map<string, string>();

  for (const product of PRODUCTS) {
    for (const size of product.sizes) {
      if (size.available) sizeSet.add(size.label);
    }
    for (const color of product.colors) {
      colorMap.set(color.name, color.hex);
    }
  }

  return {
    sizes: Array.from(sizeSet).sort(),
    colors: Array.from(colorMap.entries()).map(([name, hex]) => ({ name, hex })),
  };
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured);
}

export function getBestsellers(): Product[] {
  return PRODUCTS.filter((p) => p.bestseller);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category
  ).slice(0, limit);
}
