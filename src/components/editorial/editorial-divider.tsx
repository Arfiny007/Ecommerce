import { cn } from "@/lib/utils";

interface EditorialDividerProps {
  label?: string;
  className?: string;
}

export function EditorialDivider({ label, className }: EditorialDividerProps) {
  return (
    <div
      className={cn("flex items-center gap-4 py-6", className)}
      role="separator"
      aria-label={label}
    >
      <div className="h-px flex-1 bg-border-subtle" />
      {label && (
        <span className="text-micro-caps text-muted-foreground">
          {label}
        </span>
      )}
      <div className="h-px flex-1 bg-border-subtle" />
    </div>
  );
}
