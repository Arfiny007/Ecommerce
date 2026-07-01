import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FeatureColumn {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface FeatureColumnsProps {
  items: FeatureColumn[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export function FeatureColumns({ items, columns = 3, className }: FeatureColumnsProps) {
  const gridCols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={cn("grid gap-6", gridCols[columns], className)}>
      {items.map((item) => (
        <article
          key={item.title}
          className="rounded-[var(--radius-xl)] border border-border-subtle bg-surface p-6"
        >
          <item.icon className="h-5 w-5 text-muted-foreground" aria-hidden />
          <h3 className="mt-4 text-sm font-medium">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {item.description}
          </p>
        </article>
      ))}
    </div>
  );
}
