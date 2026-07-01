import { Container } from "@/components/common/container";
import { Eyebrow, Heading, Lead } from "@/components/common/typography";
import { cn } from "@/lib/utils";

interface ContentPageHeroProps {
  eyebrow: string;
  title: string;
  lead?: string;
  size?: "narrow" | "default" | "wide";
  className?: string;
  children?: React.ReactNode;
}

export function ContentPageHero({
  eyebrow,
  title,
  lead,
  size = "default",
  className,
  children,
}: ContentPageHeroProps) {
  return (
    <div
      className={cn(
        "page-hero border-b border-border-subtle bg-surface-muted",
        className
      )}
    >
      <Container size={size}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <Heading className="mt-3">{title}</Heading>
        {lead && <Lead className="mt-4 max-w-2xl">{lead}</Lead>}
        {children}
      </Container>
    </div>
  );
}
