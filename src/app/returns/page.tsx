import { ContentPageHero } from "@/components/content/content-page-hero";
import { PolicyPageContent } from "@/components/content/prose";
import { Section } from "@/components/common/section";
import { Container } from "@/components/common/container";
import { RETURNS_POLICY } from "@/constants/content/policies";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Returns & Exchanges",
  description: RETURNS_POLICY.lead,
  path: "/returns",
});

export default function ReturnsPage() {
  return (
    <>
      <ContentPageHero
        eyebrow={RETURNS_POLICY.eyebrow}
        title={RETURNS_POLICY.title}
        lead={RETURNS_POLICY.lead}
      />
      <Section spacing="md">
        <Container>
          <PolicyPageContent sections={RETURNS_POLICY.sections} />
        </Container>
      </Section>
    </>
  );
}
