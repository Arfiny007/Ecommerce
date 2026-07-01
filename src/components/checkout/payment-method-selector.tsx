"use client";

import { motion } from "framer-motion";
import { CreditCard, Wallet, Banknote } from "lucide-react";
import { PAYMENT_METHODS, type PaymentMethodId } from "@/constants/checkout";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { getTransition } from "@/lib/motion-config";
import { cn } from "@/lib/utils";

const iconMap = {
  card: CreditCard,
  apple: Wallet,
  google: Wallet,
  paypal: Wallet,
  cod: Banknote,
} as const;

interface PaymentMethodSelectorProps {
  selected: PaymentMethodId;
  onSelect: (id: PaymentMethodId) => void;
  savedCards?: readonly { id: string; brand: string; last4: string; expiry: string; isDefault: boolean }[];
  selectedCardId?: string | null;
  onSelectCard?: (id: string) => void;
}

export function PaymentMethodSelector({
  selected,
  onSelect,
  savedCards = [],
  selectedCardId,
  onSelectCard,
}: PaymentMethodSelectorProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div className="space-y-3" role="radiogroup" aria-label="Payment method">
      {PAYMENT_METHODS.map((method) => {
        const Icon = iconMap[method.icon];
        const isSelected = selected === method.id;

        return (
          <motion.button
            key={method.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onSelect(method.id)}
            layout
            className={cn(
              "flex w-full items-center gap-4 rounded-[var(--radius-xl)] border px-4 py-4 text-left transition-luxury",
              isSelected
                ? "border-foreground bg-foreground/5 shadow-subtle"
                : "border-border-subtle hover:border-border"
            )}
            whileTap={reducedMotion ? undefined : { scale: 0.99 }}
            transition={getTransition(reducedMotion, 0.15)}
          >
            <motion.div
              animate={isSelected && !reducedMotion ? { scale: [1, 1.1, 1] } : {}}
              transition={getTransition(reducedMotion, 0.3)}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-[var(--radius-full)]",
                isSelected ? "bg-foreground text-background" : "bg-muted"
              )}
            >
              <Icon className="h-4 w-4" aria-hidden />
            </motion.div>
            <span className="text-sm font-medium">{method.label}</span>
            <motion.span
              className="ml-auto h-4 w-4 rounded-[var(--radius-full)] border-2"
              animate={{
                borderColor: isSelected ? "var(--foreground)" : "var(--border)",
                backgroundColor: isSelected ? "var(--foreground)" : "transparent",
              }}
              transition={getTransition(reducedMotion, 0.2)}
              aria-hidden
            />
          </motion.button>
        );
      })}

      {selected === "card" && savedCards.length > 0 && (
        <div className="space-y-2 border-t border-border-subtle pt-4">
          <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
            Saved cards
          </p>
          {savedCards.map((card) => (
            <button
              key={card.id}
              type="button"
              onClick={() => onSelectCard?.(card.id)}
              className={cn(
                "flex w-full items-center justify-between rounded-[var(--radius-xl)] border px-4 py-3 text-sm transition-luxury",
                selectedCardId === card.id
                  ? "border-foreground bg-foreground/5"
                  : "border-border-subtle hover:border-border"
              )}
            >
              <span>
                {card.brand} ···· {card.last4}
              </span>
              <span className="text-xs text-muted-foreground">{card.expiry}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
