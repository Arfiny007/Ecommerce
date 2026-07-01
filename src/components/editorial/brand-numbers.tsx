import { cn } from "@/lib/utils";

interface BrandNumbersProps {
  stats: readonly { value: string; label: string }[];
  className?: string;
  variant?: "default" | "inverted";
}

export function BrandNumbers({ stats, className, variant = "default" }: BrandNumbersProps) {
  const inverted = variant === "inverted";

  return (
    <div className={className} role="list" aria-label="Brand highlights">
      <div
        className={cn(
          "grid grid-cols-2 gap-6 border-y py-6 md:grid-cols-4 md:gap-8",
          inverted ? "border-background/20" : "border-border-subtle"
        )}
      >
        {stats.map((stat) => (
          <div key={stat.label} role="listitem" className="text-center md:text-left">
            <p
              className={cn(
                "font-display text-3xl font-light md:text-4xl",
                inverted && "text-background"
              )}
            >
              {stat.value}
            </p>
            <p
              className={cn(
                "mt-1 text-xs uppercase tracking-editorial",
                inverted ? "text-background/60" : "text-muted-foreground"
              )}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
