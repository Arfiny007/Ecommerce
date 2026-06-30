import { cn } from "@/lib/utils";
import { Container } from "@/components/common/container";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  containerSize?: "default" | "narrow" | "wide" | "full";
  noPadding?: boolean;
}

export function Section({
  className,
  containerSize = "default",
  noPadding = false,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(!noPadding && "py-16 md:py-24 lg:py-32", className)}
      {...props}
    >
      <Container size={containerSize}>{children}</Container>
    </section>
  );
}
