import { cn } from "@/lib/utils";

const spanMap: Record<number, string> = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  5: "col-span-5",
  6: "col-span-6",
  7: "col-span-7",
  8: "col-span-8",
  9: "col-span-9",
  10: "col-span-10",
  11: "col-span-11",
  12: "col-span-12",
};

const smSpanMap: Record<number, string> = {
  1: "sm:col-span-1",
  2: "sm:col-span-2",
  3: "sm:col-span-3",
  4: "sm:col-span-4",
  5: "sm:col-span-5",
  6: "sm:col-span-6",
  7: "sm:col-span-7",
  8: "sm:col-span-8",
  9: "sm:col-span-9",
  10: "sm:col-span-10",
  11: "sm:col-span-11",
  12: "sm:col-span-12",
};

const lgSpanMap: Record<number, string> = {
  1: "lg:col-span-1",
  2: "lg:col-span-2",
  3: "lg:col-span-3",
  4: "lg:col-span-4",
  5: "lg:col-span-5",
  6: "lg:col-span-6",
  7: "lg:col-span-7",
  8: "lg:col-span-8",
  9: "lg:col-span-9",
  10: "lg:col-span-10",
  11: "lg:col-span-11",
  12: "lg:col-span-12",
};

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: "sm" | "md" | "lg";
}

const colClasses = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  6: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6",
  12: "grid-cols-12",
};

const gapClasses = {
  sm: "gap-[var(--space-4)]",
  md: "gap-[var(--grid-gap)]",
  lg: "gap-[var(--space-8)]",
};

export function Grid({
  className,
  cols = 12,
  gap = "md",
  children,
  ...props
}: GridProps) {
  return (
    <div
      className={cn("grid", colClasses[cols], gapClasses[gap], className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function GridItem({
  className,
  span = 12,
  spanSm,
  spanLg,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  span?: number;
  spanSm?: number;
  spanLg?: number;
}) {
  return (
    <div
      className={cn(
        spanMap[span],
        spanSm && smSpanMap[spanSm],
        spanLg && lgSpanMap[spanLg],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
