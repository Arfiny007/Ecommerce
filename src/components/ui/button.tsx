"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { buttonInteraction } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-luxury focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-subtle hover:opacity-90",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline:
          "border border-border bg-transparent hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-foreground underline-offset-4 hover:underline",
        text: "text-foreground hover:text-muted-foreground",
        luxury:
          "bg-foreground text-background uppercase tracking-[var(--tracking-widest)] shadow-soft hover:shadow-elevated hover:opacity-95",
        champagne:
          "bg-champagne text-foreground uppercase tracking-[var(--tracking-widest)] shadow-subtle hover:shadow-soft hover:opacity-95",
        cta: "bg-foreground text-background uppercase tracking-[var(--tracking-widest)] shadow-luxury hover:shadow-luxury",
      },
      size: {
        default: "h-11 rounded-[var(--radius-full)] px-6 text-sm",
        sm: "h-9 rounded-[var(--radius-full)] px-4 text-xs",
        lg: "h-12 rounded-[var(--radius-full)] px-8 text-base",
        icon: "h-10 w-10 rounded-[var(--radius-full)]",
        xl: "h-14 rounded-[var(--radius-full)] px-10 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  disableMotion?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      disableMotion = false,
      loading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const reducedMotion = useReducedMotion();
    const motionEnabled = !asChild && !disableMotion && !reducedMotion;
    const classes = cn(buttonVariants({ variant, size, className }));

    const content = loading ? (
      <span className="flex items-center gap-2">
        <span className="h-3.5 w-3.5 animate-spin rounded-[var(--radius-full)] border-2 border-current border-t-transparent" />
        <span>{children}</span>
      </span>
    ) : (
      children
    );

    if (asChild) {
      return (
        <Slot className={classes} ref={ref} {...props}>
          {content}
        </Slot>
      );
    }

    if (motionEnabled) {
      const isFullWidth = className?.includes("w-full");

      return (
        <motion.span
          className={cn("inline-flex gpu-accelerated", isFullWidth && "w-full")}
          variants={buttonInteraction}
          initial="rest"
          whileHover={disabled || loading ? undefined : "hover"}
          whileTap={disabled || loading ? undefined : "tap"}
        >
          <button
            ref={ref}
            className={classes}
            disabled={disabled || loading}
            data-cursor="button"
            {...props}
          >
            {content}
          </button>
        </motion.span>
      );
    }

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        data-cursor="button"
        {...props}
      >
        {content}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
