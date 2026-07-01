import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "narrow" | "default" | "wide" | "full";
  asGrid?: boolean;
}

const sizeClasses = {
  narrow: "max-w-[var(--container-narrow)]",
  default: "max-w-[var(--container-default)]",
  wide: "max-w-[var(--container-wide)]",
  full: "max-w-[var(--container-full)]",
};

export function Container({
  className,
  size = "default",
  asGrid = false,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-[var(--space-5)] sm:px-[var(--space-8)] lg:px-[var(--space-12)]",
        sizeClasses[size],
        asGrid && "grid grid-cols-12 gap-[var(--grid-gap)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
