import { cn } from "@/lib/utils";
import { Surface } from "@/components/common/surface";

interface EditorialQuoteProps {
  text: string;
  attribution: string;
  className?: string;
  variant?: "default" | "inline";
}

export function EditorialQuote({
  text,
  attribution,
  className,
  variant = "default",
}: EditorialQuoteProps) {
  if (variant === "inline") {
    return (
      <blockquote className={cn("border-l-2 border-foreground pl-6", className)}>
        <p className="font-display text-lg font-light italic leading-relaxed md:text-xl">
          &ldquo;{text}&rdquo;
        </p>
        <cite className="mt-3 block text-xs not-italic uppercase tracking-editorial text-muted-foreground">
          — {attribution}
        </cite>
      </blockquote>
    );
  }

  return (
    <Surface
      variant="elevated"
      rounded="2xl"
      padding="lg"
      className={cn("relative", className)}
    >
      <span
        className="pointer-events-none absolute -left-2 -top-4 font-display text-6xl leading-none text-foreground/10"
        aria-hidden
      >
        &ldquo;
      </span>
      <blockquote className="relative">
        <p className="font-display text-xl font-light italic leading-relaxed md:text-2xl">
          {text}
        </p>
        <cite className="mt-4 block text-sm not-italic text-muted-foreground">
          — {attribution}
        </cite>
      </blockquote>
    </Surface>
  );
}
