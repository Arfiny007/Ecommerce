import Link from "next/link";
import { cn } from "@/lib/utils";
import { Eyebrow, Heading, Body } from "@/components/common/typography";

interface SectionHeaderProps {
  eyebrow?: string;
  title?: React.ReactNode;
  description?: string;
  action?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  align = "left",
  className,
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <header
      className={cn(
        "flex flex-col gap-[var(--space-4)]",
        isCenter && "items-center text-center",
        action && !isCenter && "md:flex-row md:items-end md:justify-between",
        className
      )}
    >
      <div className={cn("space-y-[var(--space-3)]", isCenter && "max-w-2xl")}>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        {title && (
          <Heading as="h2" className={cn(isCenter && "mx-auto")}>
            {title}
          </Heading>
        )}
        {description && (
          <Body className={cn("prose-width", isCenter && "mx-auto")}>
            {description}
          </Body>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </header>
  );
}

interface SectionLinkActionProps {
  href: string;
  label: string;
  className?: string;
}

export function SectionLinkAction({ href, label, className }: SectionLinkActionProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-luxury hover:text-foreground",
        className
      )}
    >
      {label}
      <span
        aria-hidden
        className="inline-block transition-luxury group-hover:translate-x-0.5"
      >
        →
      </span>
    </Link>
  );
}
