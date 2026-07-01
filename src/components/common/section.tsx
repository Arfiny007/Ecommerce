import { cn } from "@/lib/utils";
import { Container } from "@/components/common/container";
import { SectionHeader } from "@/components/common/section-header";

type SectionSpacing = "sm" | "md" | "lg";
type ContainerSize = "narrow" | "default" | "wide" | "full";

interface SectionProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  containerSize?: ContainerSize;
  spacing?: SectionSpacing;
  noPadding?: boolean;
  eyebrow?: string;
  title?: React.ReactNode;
  description?: string;
  action?: React.ReactNode;
  headerAlign?: "left" | "center";
  background?: "default" | "muted" | "gradient" | "mesh";
  containerized?: boolean;
}

const spacingClasses: Record<SectionSpacing, string> = {
  sm: "py-[var(--section-py-sm)]",
  md: "py-[var(--section-py-md)]",
  lg: "py-[var(--section-py-lg)]",
};

const backgroundClasses = {
  default: "",
  muted: "bg-surface-muted",
  gradient: "bg-luxury-gradient",
  mesh: "bg-mesh-light",
};

export function Section({
  className,
  containerSize = "default",
  spacing = "md",
  noPadding = false,
  eyebrow,
  title,
  description,
  action,
  headerAlign = "left",
  background = "default",
  containerized = true,
  children,
  ...props
}: SectionProps) {
  const hasHeader = Boolean(eyebrow || title || description || action);

  const inner = (
    <>
      {hasHeader && (
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
          action={action}
          align={headerAlign}
          className={children ? "mb-[var(--space-12)] md:mb-[var(--space-16)]" : undefined}
        />
      )}
      {children}
    </>
  );

  return (
    <section
      className={cn(
        !noPadding && spacingClasses[spacing],
        backgroundClasses[background],
        className
      )}
      {...props}
    >
      {containerized ? (
        <Container size={containerSize}>{inner}</Container>
      ) : (
        inner
      )}
    </section>
  );
}
