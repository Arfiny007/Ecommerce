import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const surfaceVariants = cva("transition-luxury", {
  variants: {
    variant: {
      primary: "surface-primary",
      elevated: "surface-elevated",
      muted: "surface-muted",
      bordered: "surface-bordered",
      glass: "surface-glass",
    },
    rounded: {
      none: "rounded-none",
      sm: "rounded-[var(--radius-sm)]",
      md: "rounded-[var(--radius-md)]",
      lg: "rounded-[var(--radius-lg)]",
      xl: "rounded-[var(--radius-xl)]",
      "2xl": "rounded-[var(--radius-2xl)]",
      "3xl": "rounded-[var(--radius-3xl)]",
      full: "rounded-[var(--radius-full)]",
    },
    padding: {
      none: "",
      sm: "p-[var(--space-4)]",
      md: "p-[var(--space-6)]",
      lg: "p-[var(--space-8)]",
    },
  },
  defaultVariants: {
    variant: "primary",
    rounded: "xl",
    padding: "none",
  },
});

export interface SurfaceProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof surfaceVariants> {
  as?: "div" | "article" | "section";
}

export function Surface({
  className,
  variant,
  rounded,
  padding,
  as: Tag = "div",
  children,
  ...props
}: SurfaceProps) {
  return (
    <Tag
      className={cn(surfaceVariants({ variant, rounded, padding }), className)}
      {...props}
    >
      {children}
    </Tag>
  );
}

export { surfaceVariants };
