import { ContentPageHero } from "@/components/content/content-page-hero";
import { CareersList } from "@/components/content/careers-list";
import { Section } from "@/components/common/section";
import { Container } from "@/components/common/container";
import { CAREERS_PAGE, CAREER_ROLES } from "@/constants/content/company";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Careers",
  description: CAREERS_PAGE.lead,
  path: "/careers",
});

export default function CareersPage() {
  return (
    <>
      <ContentPageHero
        eyebrow={CAREERS_PAGE.eyebrow}
        title={CAREERS_PAGE.title}
        lead={CAREERS_PAGE.lead}
      />
      <Section spacing="md">
        <Container size="narrow">
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            {CAREERS_PAGE.culture}
          </p>
          <h2 className="mt-12 font-display text-2xl font-light">Benefits</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {CAREERS_PAGE.benefits.map((benefit) => (
              <li key={benefit} className="flex gap-2 text-sm text-muted-foreground">
                <span aria-hidden>·</span>
                {benefit}
              </li>
            ))}
          </ul>
        </Container>
      </Section>
      <Section spacing="md" background="muted">
        <Container>
          <h2 className="mb-8 font-display text-2xl font-light">Open Positions</h2>
          <CareersList roles={CAREER_ROLES} />
        </Container>
      </Section>
    </>
  );
}
