import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { ViewMode } from "@/types/product";

interface ShopLoadingSkeletonProps {
  viewMode?: ViewMode;
  count?: number;
  className?: string;
}

export function ShopLoadingSkeleton({
  viewMode = "grid",
  count = 6,
  className,
}: ShopLoadingSkeletonProps) {
  return (
    <div
      className={cn(
        "grid gap-6",
        viewMode === "grid"
          ? "grid-cols-2 md:grid-cols-3"
          : "grid-cols-1",
        className
      )}
      aria-hidden
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton
            className={cn(
              "rounded-[var(--radius-2xl)]",
              viewMode === "grid" ? "aspect-[3/4]" : "aspect-[16/7]"
            )}
          />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      ))}
    </div>
  );
}
