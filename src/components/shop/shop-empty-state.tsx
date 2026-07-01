"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heading, Body } from "@/components/common/typography";
import { NoResultsIllustration } from "@/components/shop/shop-no-results-illustration";
import { EMPTY_STATE_COPY } from "@/constants/content";
import { emptyStates } from "@/constants/branding";
import { fadeInUp } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface ShopEmptyStateProps {
  onClearFilters: () => void;
  hasFilters: boolean;
}

export function ShopEmptyState({ onClearFilters, hasFilters }: ShopEmptyStateProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={reducedMotion ? false : "hidden"}
      animate="visible"
      variants={fadeInUp}
      className="section-empty flex flex-col items-center justify-center text-center"
      role="status"
    >
      <NoResultsIllustration />
      <Heading as="h3" className="mt-8 text-2xl">
        {emptyStates.products}
      </Heading>
      <Body className="mt-4 max-w-md">
        {hasFilters
          ? EMPTY_STATE_COPY.shop.bodyFiltered
          : EMPTY_STATE_COPY.shop.bodyDefault}
      </Body>
      {hasFilters && (
        <Button variant="luxury" className="mt-8" onClick={onClearFilters}>
          {emptyStates.productsCta}
        </Button>
      )}
    </motion.div>
  );
}
