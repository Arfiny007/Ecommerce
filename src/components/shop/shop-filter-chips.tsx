"use client";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { emptyStates } from "@/constants/branding";
import { getTransition } from "@/lib/motion-config";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { ActiveFilterChip } from "@/types/product";

interface ShopFilterChipsProps {
  chips: ActiveFilterChip[];
  onRemove: (chip: ActiveFilterChip) => void;
  onClearAll: () => void;
}

export function ShopFilterChips({ chips, onRemove, onClearAll }: ShopFilterChipsProps) {
  const reducedMotion = useReducedMotion();

  if (chips.length === 0) return null;

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={getTransition(reducedMotion)}
      className="space-y-3"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
          {chips.length} active filter{chips.length !== 1 ? "s" : ""}
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="h-auto px-0 text-xs uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground"
        >
          {emptyStates.productsCta}
        </Button>
      </div>

      <div className="flex flex-wrap gap-2" role="list" aria-label="Active filters">
        <AnimatePresence mode="popLayout">
          {chips.map((chip) => (
            <motion.div
              key={chip.id}
              layout
              initial={reducedMotion ? false : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={getTransition(reducedMotion, 0.2)}
              role="listitem"
            >
              <Badge
                variant="outline"
                className="gap-1.5 rounded-[var(--radius-full)] py-1 pl-3 pr-1.5"
              >
                {chip.label}
                <button
                  onClick={() => onRemove(chip)}
                  className="rounded-[var(--radius-full)] p-0.5 transition-luxury hover:bg-accent"
                  aria-label={`Remove ${chip.label} filter`}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
