import Link from "next/link";
import { ContentPageHero } from "@/components/content/content-page-hero";
import { LookbookGallery } from "@/components/content/lookbook-gallery";
import { Section } from "@/components/common/section";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { LOOKBOOK_PAGE } from "@/constants/content/lookbook";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Lookbook",
  description: LOOKBOOK_PAGE.lead,
  path: "/lookbook",
});

export default function LookbookPage() {
  return (
    <>
      <ContentPageHero
        eyebrow={LOOKBOOK_PAGE.eyebrow}
        title={LOOKBOOK_PAGE.title}
        lead={LOOKBOOK_PAGE.lead}
      />
      <Section spacing="md">
        <Container>
          <p className="mx-auto mb-12 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground md:text-base">
            {LOOKBOOK_PAGE.intro}
          </p>
          <LookbookGallery />
          <div className="mt-16 rounded-[var(--radius-2xl)] border border-border-subtle bg-surface-muted p-8 text-center">
            <p className="text-xs uppercase tracking-editorial text-muted-foreground">Credits</p>
            <div className="mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-4">
              <p>Photography: {LOOKBOOK_PAGE.credits.photographer}</p>
              <p>Styling: {LOOKBOOK_PAGE.credits.stylist}</p>
              <p>Creative: {LOOKBOOK_PAGE.credits.creativeDirection}</p>
              <p>Location: {LOOKBOOK_PAGE.credits.location}</p>
            </div>
            <Button variant="luxury" className="mt-8" asChild>
              <Link href="/shop?collection=ss26">Shop the Collection</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
