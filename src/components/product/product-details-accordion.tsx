"use client";

import { getProductDetails } from "@/constants/product-details";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Container } from "@/components/common/container";
import { Eyebrow, Heading, Body } from "@/components/common/typography";
import type { Product } from "@/types/product";

interface ProductDetailsAccordionProps {
  product: Product;
}

const ACCORDION_ITEMS = [
  { key: "description", label: "Description", field: "materials" as const, useProductDesc: true },
  { key: "materials", label: "Materials & Composition", field: "materials" as const },
  { key: "dimensions", label: "Fit & Dimensions", field: "dimensions" as const },
  { key: "care", label: "Care Instructions", field: "care" as const },
  { key: "shipping", label: "Shipping & Delivery", field: "shipping" as const },
  { key: "returns", label: "Returns Policy", field: "returns" as const },
  { key: "warranty", label: "Craftsmanship Guarantee", field: "warranty" as const },
] as const;

export function ProductDetailsAccordion({ product }: ProductDetailsAccordionProps) {
  const details = getProductDetails(product);

  return (
    <section className="border-t border-border-subtle py-12 md:py-14" aria-label="Product details">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>Specifications</Eyebrow>
            <Heading className="mt-3 text-2xl md:text-3xl">Product Details</Heading>
            <Body className="mt-4">
              Full composition, care, and service information for {product.name}.
              Our client advisors are available for sizing and styling guidance.
            </Body>
          </div>
          <div className="lg:col-span-8">
            <Accordion type="single" collapsible className="rounded-[var(--radius-xl)] border border-border-subtle px-4">
              {ACCORDION_ITEMS.map((item) => (
                <AccordionItem key={item.key} value={item.key}>
                  <AccordionTrigger className="font-display text-base font-light md:text-lg">
                    {item.label}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {"useProductDesc" in item && item.useProductDesc
                      ? product.description
                      : details[item.field]}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </Container>
    </section>
  );
}
