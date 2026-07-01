import { ContentPageHero } from "@/components/content/content-page-hero";
import { SizeGuideTables } from "@/components/content/size-guide-tables";
import { Section } from "@/components/common/section";
import { Container } from "@/components/common/container";
import { SIZE_GUIDE } from "@/constants/content/support";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Size Guide",
  description: SIZE_GUIDE.lead,
  path: "/size-guide",
});

export default function SizeGuidePage() {
  return (
    <>
      <ContentPageHero
        eyebrow={SIZE_GUIDE.eyebrow}
        title={SIZE_GUIDE.title}
        lead={SIZE_GUIDE.lead}
      />
      <Section spacing="md">
        <Container>
          <SizeGuideTables />
        </Container>
      </Section>
    </>
  );
}
