"use client";

import { cn } from "@/lib/utils";
import { CHECKOUT_STEPS, type CheckoutStepId } from "@/constants/checkout";
import { Check } from "lucide-react";

interface CheckoutStepsProps {
  current: CheckoutStepId;
  className?: string;
}

export function CheckoutSteps({ current, className }: CheckoutStepsProps) {
  const currentIndex =
    current === "success"
      ? CHECKOUT_STEPS.length
      : CHECKOUT_STEPS.findIndex((s) => s.id === current);

  return (
    <nav aria-label="Checkout progress" className={cn("w-full", className)}>
      <ol className="flex items-center justify-between">
        {CHECKOUT_STEPS.map((step, index) => {
          const isComplete = index < currentIndex;
          const isCurrent = step.id === current;
          const isUpcoming = index > currentIndex;

          return (
            <li
              key={step.id}
              className="flex flex-1 items-center last:flex-none"
              aria-current={isCurrent ? "step" : undefined}
            >
              <div className="flex flex-col items-center gap-2">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-[var(--radius-full)] text-xs transition-luxury",
                    isComplete && "bg-foreground text-background",
                    isCurrent && "border-2 border-foreground",
                    isUpcoming && "border border-border-subtle text-muted-foreground"
                  )}
                  aria-hidden
                >
                  {isComplete ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={cn(
                    "label-caps-muted hidden sm:block",
                    isCurrent ? "font-medium text-foreground" : "text-muted-foreground"
                  )}
                >
                  {step.label}
                </span>
              </div>
              {index < CHECKOUT_STEPS.length - 1 && (
                <div
                  className={cn(
                    "mx-2 h-px flex-1",
                    isComplete ? "bg-foreground" : "bg-border-subtle"
                  )}
                  aria-hidden
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
