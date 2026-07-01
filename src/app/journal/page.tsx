import { ContentPageHero } from "@/components/content/content-page-hero";
import { JournalGrid } from "@/components/content/journal-grid";
import { Section } from "@/components/common/section";
import { Container } from "@/components/common/container";
import { JOURNAL_PAGE, JOURNAL_ARTICLES } from "@/constants/content/journal";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Journal",
  description: JOURNAL_PAGE.lead,
  path: "/journal",
});

export default function JournalPage() {
  return (
    <>
      <ContentPageHero
        eyebrow={JOURNAL_PAGE.eyebrow}
        title={JOURNAL_PAGE.title}
        lead={JOURNAL_PAGE.lead}
      />
      <Section spacing="md">
        <Container>
          <JournalGrid articles={JOURNAL_ARTICLES} />
        </Container>
      </Section>
    </>
  );
}
