"use client";

import { Section } from "@/components/common/section";
import { MotionStagger } from "@/components/common/motion-wrapper";
import { ProductRecommendationCard } from "@/components/product/product-recommendation-card";
import type { Product } from "@/types/product";

interface ProductRecommendationsRowProps {
  eyebrow?: string;
  title: string;
  description?: string;
  products: Product[];
}

export function ProductRecommendationsRow({
  eyebrow,
  title,
  description,
  products,
}: ProductRecommendationsRowProps) {
  if (products.length === 0) return null;

  return (
    <Section
      className="border-t border-border-subtle"
      spacing="lg"
      eyebrow={eyebrow}
      title={title}
      description={description}
    >
      <MotionStagger className="grid grid-cols-2 gap-[var(--grid-gap)] md:grid-cols-4">
        {products.map((product, index) => (
          <ProductRecommendationCard
            key={product.id}
            product={product}
            index={index}
          />
        ))}
      </MotionStagger>
    </Section>
  );
}
