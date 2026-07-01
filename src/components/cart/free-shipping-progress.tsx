"use client";

import { motion } from "framer-motion";
import { formatPrice } from "@/lib/utils";
import { checkoutCopy } from "@/constants/checkout";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { getTransition } from "@/lib/motion-config";
import { cn } from "@/lib/utils";

interface FreeShippingProgressProps {
  progress: number;
  remaining: number;
  qualified: boolean;
  className?: string;
}

export function FreeShippingProgress({
  progress,
  remaining,
  qualified,
  className,
}: FreeShippingProgressProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div className={cn("space-y-2", className)} role="status" aria-live="polite">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">
          {qualified
            ? checkoutCopy.freeShippingLabel
            : `${formatPrice(remaining)} ${checkoutCopy.freeShippingProgress}`}
        </span>
        <span className="tabular-nums text-muted-foreground">
          {Math.round(progress)}%
        </span>
      </div>
      <div
        className="h-1 overflow-hidden rounded-[var(--radius-full)] bg-muted"
        aria-hidden
      >
        <motion.div
          className="h-full rounded-[var(--radius-full)] bg-foreground"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={getTransition(reducedMotion, 0.5)}
        />
      </div>
    </div>
  );
}
