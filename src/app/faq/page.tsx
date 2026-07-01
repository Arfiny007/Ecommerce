import { ContentPageHero } from "@/components/content/content-page-hero";
import { FaqList } from "@/components/content/faq-list";
import { Section } from "@/components/common/section";
import { Container } from "@/components/common/container";
import { FAQ_PAGE, FAQ_ITEMS } from "@/constants/content/support";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "FAQ",
  description: FAQ_PAGE.lead,
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <ContentPageHero
        eyebrow={FAQ_PAGE.eyebrow}
        title={FAQ_PAGE.title}
        lead={FAQ_PAGE.lead}
      />
      <Section spacing="md">
        <Container>
          <FaqList items={FAQ_ITEMS} />
        </Container>
      </Section>
    </>
  );
}
