import { Container } from "@/components/common/container";
import { Eyebrow, Heading, Lead } from "@/components/common/typography";

interface ContentPageHeroProps {
  eyebrow: string;
  title: string;
  lead?: string;
}

export function ContentPageHero({ eyebrow, title, lead }: ContentPageHeroProps) {
  return (
    <div className="border-b border-border-subtle bg-surface-muted pt-24 pb-10 md:pt-32 md:pb-14">
      <Container>
        <Eyebrow>{eyebrow}</Eyebrow>
        <Heading className="mt-3">{title}</Heading>
        {lead && <Lead className="mt-4 max-w-2xl">{lead}</Lead>}
      </Container>
    </div>
  );
}
