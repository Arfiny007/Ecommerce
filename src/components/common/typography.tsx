import { cn } from "@/lib/utils";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4";
}

export function Display({
  className,
  as: Tag = "h1",
  children,
  ...props
}: HeadingProps) {
  return (
    <Tag
      className={cn(
        "font-display font-light text-[var(--text-display)] leading-[var(--leading-tight)] tracking-[var(--tracking-tighter)]",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

export function Heading({
  className,
  as: Tag = "h2",
  children,
  ...props
}: HeadingProps) {
  return (
    <Tag
      className={cn(
        "font-display text-3xl font-light leading-[var(--leading-tight)] tracking-[var(--tracking-tight)] md:text-4xl lg:text-5xl",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

export function Subheading({
  className,
  as: Tag = "h3",
  children,
  ...props
}: HeadingProps) {
  return (
    <Tag
      className={cn(
        "text-lg font-medium leading-[var(--leading-snug)] tracking-[var(--tracking-wide)] md:text-xl",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

export function Eyebrow({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-[var(--text-xs)] font-medium uppercase tracking-editorial text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

export function Lead({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-lg leading-[var(--leading-relaxed)] text-muted-foreground md:text-xl",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

export function Body({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-sm leading-[var(--leading-normal)] text-muted-foreground md:text-base",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

export function Caption({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-[var(--text-xs)] leading-[var(--leading-snug)] tracking-[var(--tracking-wide)] text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

export function LabelCaps({
  className,
  as: Tag = "span",
  children,
  ...props
}: React.HTMLAttributes<HTMLElement> & { as?: "span" | "p" | "h3" | "h4" }) {
  return (
    <Tag className={cn("label-caps text-foreground", className)} {...props}>
      {children}
    </Tag>
  );
}

export function MicroLabel({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn("text-micro-caps text-muted-foreground", className)} {...props}>
      {children}
    </span>
  );
}
