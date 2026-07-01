import { ContentPageHero } from "@/components/content/content-page-hero";
import { PolicyPageContent } from "@/components/content/prose";
import { Section } from "@/components/common/section";
import { Container } from "@/components/common/container";
import { SHIPPING_POLICY } from "@/constants/content/policies";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Shipping & Delivery",
  description: SHIPPING_POLICY.lead,
  path: "/shipping",
});

export default function ShippingPage() {
  return (
    <>
      <ContentPageHero
        eyebrow={SHIPPING_POLICY.eyebrow}
        title={SHIPPING_POLICY.title}
        lead={SHIPPING_POLICY.lead}
      />
      <Section spacing="md">
        <Container>
          <PolicyPageContent sections={SHIPPING_POLICY.sections} />
        </Container>
      </Section>
    </>
  );
}
