import { ContentPageHero } from "@/components/content/content-page-hero";
import { PolicyPageContent } from "@/components/content/prose";
import { Section } from "@/components/common/section";
import { Container } from "@/components/common/container";
import { TERMS_OF_SERVICE } from "@/constants/content/policies";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Terms of Service",
  description: TERMS_OF_SERVICE.lead,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <ContentPageHero
        eyebrow={TERMS_OF_SERVICE.eyebrow}
        title={TERMS_OF_SERVICE.title}
        lead={TERMS_OF_SERVICE.lead}
      />
      <Section spacing="md">
        <Container>
          <PolicyPageContent
            sections={TERMS_OF_SERVICE.sections}
            lastUpdated={TERMS_OF_SERVICE.lastUpdated}
          />
        </Container>
      </Section>
    </>
  );
}
