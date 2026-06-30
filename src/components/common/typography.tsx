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
        "font-display text-5xl font-light leading-[1.05] tracking-tight md:text-7xl lg:text-8xl",
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
        "font-display text-3xl font-light leading-tight tracking-tight md:text-4xl lg:text-5xl",
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
        "text-lg font-medium tracking-wide md:text-xl",
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
        "text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground",
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
        "text-lg leading-relaxed text-muted-foreground md:text-xl md:leading-relaxed",
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
      className={cn("text-sm leading-relaxed text-muted-foreground md:text-base", className)}
      {...props}
    >
      {children}
    </p>
  );
}
