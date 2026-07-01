import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-luxury focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]",
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
        cta: "bg-foreground text-background uppercase tracking-[var(--tracking-widest)] shadow-luxury hover:-translate-y-0.5 hover:shadow-luxury",
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
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
