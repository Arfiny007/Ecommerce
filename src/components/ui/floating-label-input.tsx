"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { getTransition } from "@/lib/motion-config";

export interface FloatingLabelInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "placeholder"> {
  label: string;
  error?: string;
  success?: boolean;
}

const FloatingLabelInput = React.forwardRef<
  HTMLInputElement,
  FloatingLabelInputProps
>(({ className, label, error, success, id, value, onFocus, onBlur, ...props }, ref) => {
  const inputId = id ?? React.useId();
  const [focused, setFocused] = React.useState(false);
  const reducedMotion = useReducedMotion();
  const hasValue = Boolean(value && String(value).length > 0);
  const floated = focused || hasValue;

  return (
    <div className="relative">
      <input
        ref={ref}
        id={inputId}
        value={value}
        onFocus={(e) => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur?.(e);
        }}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={cn(
          "peer flex h-14 w-full rounded-[var(--radius-xl)] border bg-surface px-4 pt-5 pb-2 text-sm shadow-subtle transition-luxury focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-40",
          error
            ? "border-destructive focus-visible:ring-destructive/30"
            : success
              ? "border-foreground/40 focus-visible:ring-foreground/20"
              : "border-input hover:border-border focus-visible:border-foreground focus-visible:ring-ring/30",
          className
        )}
        placeholder=" "
        {...props}
      />
      <label
        htmlFor={inputId}
        className={cn(
          "pointer-events-none absolute left-4 origin-left text-muted-foreground transition-luxury",
          floated
            ? "top-2 text-micro-caps"
            : "top-1/2 -translate-y-1/2 text-sm"
        )}
      >
        {label}
      </label>
      {error && (
        <motion.p
          id={`${inputId}-error`}
          role="alert"
          initial={reducedMotion ? false : { opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={getTransition(reducedMotion, 0.2)}
          className="mt-1.5 text-xs text-destructive"
        >
          {error}
        </motion.p>
      )}
      {success && !error && (
        <motion.p
          initial={reducedMotion ? false : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={getTransition(reducedMotion, 0.2)}
          className="mt-1.5 text-xs text-muted-foreground"
          aria-live="polite"
        >
          Looks good
        </motion.p>
      )}
    </div>
  );
});
FloatingLabelInput.displayName = "FloatingLabelInput";

export { FloatingLabelInput };
