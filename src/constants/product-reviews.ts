import type { ProductReview } from "@/types/product";

const IMG = (id: string) =>
  `https://images.unsplash.com/${id}?w=400&q=80&auto=format&fit=crop`;

const REVIEW_POOL: Omit<ProductReview, "id">[] = [
  {
    author: "Elena M.",
    rating: 5,
    title: "Exceeds every expectation",
    body: "The craftsmanship is extraordinary. You can feel the quality the moment you touch it. Worth every penny — this is true luxury.",
    date: "2026-02-14",
    verified: true,
    images: [IMG("photo-1594938298603-c8148c4dae35")],
  },
  {
    author: "James K.",
    rating: 5,
    title: "Perfect fit and finish",
    body: "Ordered my usual size and it fits impeccably. The packaging alone felt like an experience. Will absolutely purchase again.",
    date: "2026-01-28",
    verified: true,
  },
  {
    author: "Sophie L.",
    rating: 4,
    title: "Beautiful, with minor note",
    body: "Stunning piece that elevates everything I pair it with. Delivery was fast. Only wish there were more colour options.",
    date: "2026-01-10",
    verified: true,
  },
  {
    author: "Marcus T.",
    rating: 5,
    title: "A wardrobe essential",
    body: "I've worn this countless times since it arrived. The material has held up beautifully and still looks brand new.",
    date: "2025-12-22",
    verified: false,
  },
  {
    author: "Aria N.",
    rating: 5,
    title: "Gift that impressed",
    body: "Bought this as a gift and the recipient was speechless. The presentation and quality are unmatched at this price point.",
    date: "2025-12-05",
    verified: true,
    images: [IMG("photo-1564257631407-4deb1f99d992")],
  },
  {
    author: "David R.",
    rating: 4,
    title: "Refined and versatile",
    body: "Works dressed up or down. The attention to detail is evident in every stitch. Highly recommend.",
    date: "2025-11-18",
    verified: true,
  },
  {
    author: "Isabelle F.",
    rating: 3,
    title: "Lovely but runs small",
    body: "Gorgeous quality as always from FINY. I'd suggest sizing up if you're between sizes.",
    date: "2025-11-02",
    verified: true,
  },
  {
    author: "Oliver W.",
    rating: 5,
    title: "Instant favourite",
    body: "This has become my most-reached-for piece. Minimal, elegant, and impeccably made.",
    date: "2025-10-20",
    verified: true,
  },
];

export function getProductReviews(productId: string, count = 8): ProductReview[] {
  const seed = productId.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const reviews: ProductReview[] = [];

  for (let i = 0; i < Math.min(count, REVIEW_POOL.length); i++) {
    const poolIndex = (seed + i * 3) % REVIEW_POOL.length;
    reviews.push({
      ...REVIEW_POOL[poolIndex],
      id: `${productId}-review-${i}`,
    });
  }

  return reviews;
}

export function getRatingBreakdown(reviews: ProductReview[]): Record<number, number> {
  const breakdown: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  for (const review of reviews) {
    breakdown[review.rating] = (breakdown[review.rating] ?? 0) + 1;
  }
  return breakdown;
}
