import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "narrow" | "wide" | "full";
}

const sizeClasses = {
  default: "max-w-7xl",
  narrow: "max-w-4xl",
  wide: "max-w-[90rem]",
  full: "max-w-full",
};

export function Container({
  className,
  size = "default",
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8 lg:px-12",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
