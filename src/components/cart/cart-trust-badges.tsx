"use client";

import { motion } from "framer-motion";
import { Shield, BadgeCheck, RotateCcw, Truck } from "lucide-react";
import { checkoutCopy } from "@/constants/checkout";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { fadeInUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

const badges = [
  { icon: Shield, label: checkoutCopy.trustSecure },
  { icon: BadgeCheck, label: checkoutCopy.trustAuthentic },
  { icon: RotateCcw, label: checkoutCopy.trustReturns },
  { icon: Truck, label: checkoutCopy.trustShipping },
] as const;

interface CartTrustBadgesProps {
  className?: string;
  compact?: boolean;
}

export function CartTrustBadges({ className, compact = false }: CartTrustBadgesProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className={cn(
        compact
          ? "grid grid-cols-2 gap-3"
          : "grid grid-cols-2 gap-4 md:grid-cols-4",
        className
      )}
      role="list"
      aria-label="Trust and service guarantees"
    >
      {badges.map(({ icon: Icon, label }, i) => (
        <motion.div
          key={label}
          role="listitem"
          custom={i}
          variants={reducedMotion ? undefined : fadeInUp}
          initial={reducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="flex items-center gap-2.5 rounded-[var(--radius-xl)] border border-border-subtle px-3 py-3 md:px-4"
        >
          <Icon className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
          <span className="text-xs leading-tight text-muted-foreground">{label}</span>
        </motion.div>
      ))}
    </div>
  );
}
