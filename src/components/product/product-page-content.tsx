"use client";

import { useEffect } from "react";
import { Container } from "@/components/common/container";
import { ProductBreadcrumb } from "@/components/product/product-breadcrumb";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductPurchasePanel } from "@/components/product/product-purchase-panel";
import { ProductDetailsAccordion } from "@/components/product/product-details-accordion";
import { ProductReviewsSection } from "@/components/product/product-reviews-section";
import { ProductRecommendations } from "@/components/product/product-recommendations";
import { useRecentlyViewed } from "@/hooks/use-recently-viewed";
import type { Product } from "@/types/product";

interface ProductPageContentProps {
  product: Product;
}

export function ProductPageContent({ product }: ProductPageContentProps) {
  const { addViewed } = useRecentlyViewed();

  useEffect(() => {
    addViewed(product.id);
  }, [product.id, addViewed]);

  return (
    <>
      <div className="pt-20 md:pt-24">
        <Container>
          <ProductBreadcrumb product={product} />

          <div className="grid gap-12 pb-16 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <ProductGallery product={product} />
            </div>
            <div className="lg:col-span-5">
              <ProductPurchasePanel product={product} />
            </div>
          </div>
        </Container>
      </div>

      <ProductDetailsAccordion product={product} />
      <ProductReviewsSection product={product} />
      <ProductRecommendations product={product} />
    </>
  );
}
