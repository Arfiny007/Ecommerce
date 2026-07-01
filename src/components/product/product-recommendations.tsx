"use client";

import { useMemo } from "react";
import {
  getCompleteTheLook,
  getRelatedProducts,
  getTrendingProducts,
} from "@/constants/products";
import { ProductRecommendationsRow } from "@/components/product/product-recommendations-row";
import { useRecentlyViewed } from "@/hooks/use-recently-viewed";
import type { Product } from "@/types/product";

interface ProductRecommendationsProps {
  product: Product;
}

export function ProductRecommendations({ product }: ProductRecommendationsProps) {
  const { getRecentProducts } = useRecentlyViewed();

  const completeTheLook = useMemo(
    () => getCompleteTheLook(product),
    [product]
  );
  const youMayAlsoLike = useMemo(
    () => getRelatedProducts(product),
    [product]
  );
  const trending = useMemo(
    () => getTrendingProducts(product.id),
    [product]
  );
  const recentlyViewed = useMemo(
    () => getRecentProducts(product.id).slice(0, 4),
    [getRecentProducts, product.id]
  );

  return (
    <>
      {completeTheLook.length > 0 && (
        <ProductRecommendationsRow
          eyebrow="Styling"
          title="Complete The Look"
          description="Curated pieces to pair with this selection."
          products={completeTheLook}
        />
      )}
      <ProductRecommendationsRow
        eyebrow="Discover"
        title="You May Also Like"
        description="Similar pieces from the same collection."
        products={youMayAlsoLike}
      />
      <ProductRecommendationsRow
        eyebrow="Popular"
        title="Trending Now"
        description="Most loved by the FINY community."
        products={trending}
      />
      {recentlyViewed.length > 0 && (
        <ProductRecommendationsRow
          eyebrow="History"
          title="Recently Viewed"
          products={recentlyViewed}
        />
      )}
    </>
  );
}
