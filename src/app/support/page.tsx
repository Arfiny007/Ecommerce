import Link from "next/link";
import { ContentPageHero } from "@/components/content/content-page-hero";
import { Section } from "@/components/common/section";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { SUPPORT_PAGE } from "@/constants/content/support";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Client Services",
  description: SUPPORT_PAGE.lead,
  path: "/support",
});

export default function SupportPage() {
  return (
    <>
      <ContentPageHero
        eyebrow={SUPPORT_PAGE.eyebrow}
        title={SUPPORT_PAGE.title}
        lead={SUPPORT_PAGE.lead}
      />
      <Section spacing="md">
        <Container>
          <div className="grid gap-8 md:grid-cols-3">
            {SUPPORT_PAGE.channels.map((channel) => (
              <article
                key={channel.title}
                className="rounded-[var(--radius-2xl)] border border-border-subtle p-8"
              >
                <h3 className="font-display text-xl font-light">{channel.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{channel.description}</p>
                <p className="mt-4 text-sm font-medium">{channel.contact}</p>
                <p className="mt-2 text-xs text-muted-foreground">{channel.hours}</p>
                <Button variant="outline" size="sm" className="mt-6" asChild>
                  <Link href={channel.href}>
                    {channel.title === "Email" ? "Send Email" : "Learn More"}
                  </Link>
                </Button>
              </article>
            ))}
          </div>
          <div className="mt-16 rounded-[var(--radius-2xl)] bg-surface-muted p-8 text-center">
            <p className="font-display text-xl font-light">Quick Links</p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/faq">FAQ</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/shipping">Shipping</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/returns">Returns</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/size-guide">Size Guide</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
