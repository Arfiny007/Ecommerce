import { ContentPageHero } from "@/components/content/content-page-hero";
import { PolicyPageContent } from "@/components/content/prose";
import { Section } from "@/components/common/section";
import { Container } from "@/components/common/container";
import { PRIVACY_POLICY } from "@/constants/content/policies";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description: PRIVACY_POLICY.lead,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <ContentPageHero
        eyebrow={PRIVACY_POLICY.eyebrow}
        title={PRIVACY_POLICY.title}
        lead={PRIVACY_POLICY.lead}
      />
      <Section spacing="md">
        <Container>
          <PolicyPageContent
            sections={PRIVACY_POLICY.sections}
            lastUpdated={PRIVACY_POLICY.lastUpdated}
          />
        </Container>
      </Section>
    </>
  );
}
