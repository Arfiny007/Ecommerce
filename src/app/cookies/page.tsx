import { ContentPageHero } from "@/components/content/content-page-hero";
import { PolicyPageContent } from "@/components/content/prose";
import { Section } from "@/components/common/section";
import { Container } from "@/components/common/container";
import { COOKIE_POLICY } from "@/constants/content/policies";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Cookie Policy",
  description: COOKIE_POLICY.lead,
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <>
      <ContentPageHero
        eyebrow={COOKIE_POLICY.eyebrow}
        title={COOKIE_POLICY.title}
        lead={COOKIE_POLICY.lead}
      />
      <Section spacing="md">
        <Container>
          <PolicyPageContent
            sections={COOKIE_POLICY.sections}
            lastUpdated={COOKIE_POLICY.lastUpdated}
          />
        </Container>
      </Section>
    </>
  );
}
