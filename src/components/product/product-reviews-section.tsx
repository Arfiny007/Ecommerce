"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, BadgeCheck, PenLine } from "lucide-react";
import { getProductReviews, getRatingBreakdown } from "@/constants/product-reviews";
import { Container } from "@/components/common/container";
import { Eyebrow, Heading } from "@/components/common/typography";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { getTransition } from "@/lib/motion-config";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { Product, ProductReview } from "@/types/product";

type StarFilter = "all" | "5" | "4" | "3" | "2" | "1";
type SortOption = "newest" | "highest" | "lowest";

interface ProductReviewsSectionProps {
  product: Product;
}

function ReviewCard({ review }: { review: ProductReview }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.article
      initial={reducedMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={getTransition(reducedMotion)}
      className="border-b border-border-subtle py-8 last:border-0"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{review.author}</span>
            {review.verified && (
              <Badge variant="outline" className="gap-1 text-[10px]">
                <BadgeCheck className="h-3 w-3" />
                Verified
              </Badge>
            )}
          </div>
          <div className="mt-1 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-3 w-3",
                  i < review.rating
                    ? "fill-foreground text-foreground"
                    : "text-muted-foreground"
                )}
              />
            ))}
          </div>
        </div>
        <time className="text-xs text-muted-foreground">{review.date}</time>
      </div>
      <h4 className="mt-4 font-display text-lg font-light">{review.title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{review.body}</p>
      {review.images && review.images.length > 0 && (
        <div className="mt-4 flex gap-2">
          {review.images.map((src, i) => (
            <div
              key={i}
              className="relative h-16 w-16 overflow-hidden rounded-[var(--radius-lg)]"
            >
              <Image src={src} alt="" fill className="object-cover" sizes="64px" />
            </div>
          ))}
        </div>
      )}
    </motion.article>
  );
}

export function ProductReviewsSection({ product }: ProductReviewsSectionProps) {
  const allReviews = useMemo(() => getProductReviews(product.id), [product.id]);
  const breakdown = useMemo(() => getRatingBreakdown(allReviews), [allReviews]);
  const [starFilter, setStarFilter] = useState<StarFilter>("all");
  const [sort, setSort] = useState<SortOption>("newest");

  const filteredReviews = useMemo(() => {
    let result = [...allReviews];
    if (starFilter !== "all") {
      result = result.filter((r) => r.rating === Number(starFilter));
    }
    switch (sort) {
      case "highest":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "lowest":
        result.sort((a, b) => a.rating - b.rating);
        break;
      case "newest":
      default:
        result.sort((a, b) => b.date.localeCompare(a.date));
    }
    return result;
  }, [allReviews, starFilter, sort]);

  const totalReviews = allReviews.length;

  return (
    <section className="border-t border-border-subtle py-16 md:py-20" aria-label="Customer reviews">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>Reviews</Eyebrow>
            <Heading className="mt-3 text-2xl md:text-3xl">Customer Voices</Heading>

            <div className="mt-8 flex items-baseline gap-3">
              <span className="font-display text-5xl font-light">{product.rating}</span>
              <div>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < Math.floor(product.rating)
                          ? "fill-foreground text-foreground"
                          : "text-muted-foreground"
                      )}
                    />
                  ))}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Based on {product.reviewCount} reviews
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-2">
              {([5, 4, 3, 2, 1] as const).map((stars) => {
                const count = breakdown[stars] ?? 0;
                const pct = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                return (
                  <button
                    key={stars}
                    onClick={() =>
                      setStarFilter(starFilter === String(stars) ? "all" : (String(stars) as StarFilter))
                    }
                    className="flex w-full items-center gap-3 text-xs transition-luxury hover:opacity-80"
                    aria-pressed={starFilter === String(stars)}
                  >
                    <span className="w-3">{stars}</span>
                    <Star className="h-3 w-3 fill-foreground text-foreground" />
                    <div className="h-1 flex-1 overflow-hidden rounded-[var(--radius-full)] bg-muted">
                      <motion.div
                        className="h-full bg-foreground"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                    <span className="w-6 text-muted-foreground">{count}</span>
                  </button>
                );
              })}
            </div>

            <Button variant="outline" className="mt-8 gap-2" aria-label="Write a review">
              <PenLine className="h-4 w-4" />
              Write a Review
            </Button>
          </div>

          <div className="lg:col-span-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {(["all", "5", "4", "3"] as StarFilter[]).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setStarFilter(filter)}
                    aria-pressed={starFilter === filter}
                    className={cn(
                      "rounded-[var(--radius-full)] border px-3 py-1 text-xs transition-luxury",
                      starFilter === filter
                        ? "border-foreground bg-foreground text-background"
                        : "border-border text-muted-foreground hover:border-foreground"
                    )}
                  >
                    {filter === "all" ? "All" : `${filter} stars`}
                  </button>
                ))}
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="rounded-[var(--radius-full)]">
                    Sort: {sort === "newest" ? "Newest" : sort === "highest" ? "Highest" : "Lowest"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuRadioGroup
                    value={sort}
                    onValueChange={(v) => setSort(v as SortOption)}
                  >
                    <DropdownMenuRadioItem value="newest">Newest</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="highest">Highest Rated</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="lowest">Lowest Rated</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <AnimatePresence mode="popLayout">
              <div key={`${starFilter}-${sort}`}>
                {filteredReviews.length === 0 ? (
                  <p className="py-12 text-center text-sm text-muted-foreground">
                    No reviews match this filter.
                  </p>
                ) : (
                  filteredReviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))
                )}
              </div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
