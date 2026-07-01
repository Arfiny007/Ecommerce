"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Tag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isValidPromoCode } from "@/lib/cart-calculations";
import { checkoutCopy } from "@/constants/checkout";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { getTransition } from "@/lib/motion-config";
import { cn } from "@/lib/utils";

interface CouponInputProps {
  couponCode: string | null;
  onApply: (code: string | null) => void;
  compact?: boolean;
  className?: string;
}

export function CouponInput({
  couponCode,
  onApply,
  compact = false,
  className,
}: CouponInputProps) {
  const [value, setValue] = useState("");
  const [expanded, setExpanded] = useState(Boolean(couponCode));
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const reducedMotion = useReducedMotion();

  const handleApply = () => {
    const code = value.trim().toUpperCase();
    if (!code) return;
    if (isValidPromoCode(code)) {
      onApply(code);
      setError(null);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } else {
      setError(checkoutCopy.couponInvalid);
      setSuccess(false);
    }
  };

  const handleRemove = () => {
    onApply(null);
    setValue("");
    setError(null);
    setSuccess(false);
  };

  if (couponCode) {
    return (
      <motion.div
        layout
        initial={reducedMotion ? false : { opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        className={cn(
          "flex items-center justify-between rounded-[var(--radius-xl)] border border-foreground/20 bg-foreground/5 px-4 py-3",
          className
        )}
      >
        <div className="flex items-center gap-2 text-sm">
          <Check className="h-4 w-4" aria-hidden />
          <span>
            {checkoutCopy.couponApplied}: <strong>{couponCode}</strong>
          </span>
        </div>
        <button
          onClick={handleRemove}
          className="text-muted-foreground transition-luxury hover:text-foreground"
          aria-label="Remove promo code"
        >
          <X className="h-4 w-4" />
        </button>
      </motion.div>
    );
  }

  return (
    <div className={className}>
      {!expanded && compact ? (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-muted-foreground transition-luxury hover:text-foreground"
        >
          <Tag className="h-3.5 w-3.5" aria-hidden />
          Add promo code
        </button>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key="coupon-form"
            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
            transition={getTransition(reducedMotion)}
            className="space-y-2"
          >
            <div className="flex gap-2">
              <Input
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  setError(null);
                }}
                onKeyDown={(e) => e.key === "Enter" && handleApply()}
                placeholder={checkoutCopy.couponPlaceholder}
                aria-label={checkoutCopy.couponPlaceholder}
                className={cn(error && "border-destructive")}
              />
              <Button variant="outline" size="sm" onClick={handleApply} type="button">
                Apply
              </Button>
            </div>
            <AnimatePresence>
              {error && (
                <motion.p
                  role="alert"
                  initial={reducedMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-destructive"
                >
                  {error}
                </motion.p>
              )}
              {success && (
                <motion.p
                  initial={reducedMotion ? false : { opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-xs text-muted-foreground"
                  aria-live="polite"
                >
                  {checkoutCopy.couponApplied}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
