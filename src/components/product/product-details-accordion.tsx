"use client";

import { getProductDetails } from "@/constants/product-details";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Container } from "@/components/common/container";
import { Eyebrow, Heading } from "@/components/common/typography";
import type { Product } from "@/types/product";

interface ProductDetailsAccordionProps {
  product: Product;
}

const ACCORDION_ITEMS = [
  { key: "description", label: "Description", field: "materials" as const, useProductDesc: true },
  { key: "materials", label: "Materials", field: "materials" as const },
  { key: "dimensions", label: "Dimensions", field: "dimensions" as const },
  { key: "care", label: "Care Guide", field: "care" as const },
  { key: "shipping", label: "Shipping", field: "shipping" as const },
  { key: "returns", label: "Returns", field: "returns" as const },
  { key: "warranty", label: "Warranty", field: "warranty" as const },
] as const;

export function ProductDetailsAccordion({ product }: ProductDetailsAccordionProps) {
  const details = getProductDetails(product);

  return (
    <section className="border-t border-border-subtle py-16 md:py-20" aria-label="Product details">
      <Container size="narrow">
        <Eyebrow>Details</Eyebrow>
        <Heading className="mt-3 text-2xl md:text-3xl">The Fine Print</Heading>

        <Accordion type="single" collapsible className="mt-10">
          {ACCORDION_ITEMS.map((item) => (
            <AccordionItem key={item.key} value={item.key}>
              <AccordionTrigger className="font-display text-lg font-light">
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
      </Container>
    </section>
  );
}
