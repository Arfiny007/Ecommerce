import Image from "next/image";
import { ContentPageHero } from "@/components/content/content-page-hero";
import { Section } from "@/components/common/section";
import { Container } from "@/components/common/container";
import { ABOUT_PAGE } from "@/constants/content/company";
import { BRAND_TIMELINE } from "@/constants/home-content";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "About Us",
  description: ABOUT_PAGE.lead,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <ContentPageHero
        eyebrow={ABOUT_PAGE.eyebrow}
        title={ABOUT_PAGE.title}
        lead={ABOUT_PAGE.lead}
      />
      <Section spacing="md">
        <Container size="narrow">
          <div className="relative mb-16 aspect-[21/9] overflow-hidden rounded-[var(--radius-3xl)]">
            <Image
              src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=85&auto=format&fit=crop"
              alt="FINY FASHIONS atelier"
              fill
              className="object-cover"
              sizes="800px"
              priority
            />
          </div>
          {ABOUT_PAGE.sections.map((section) => (
            <section key={section.title} className="mb-12 border-b border-border-subtle pb-12 last:border-0">
              <h2 className="font-display text-2xl font-light md:text-3xl">{section.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                {section.body}
              </p>
            </section>
          ))}
        </Container>
      </Section>
      <Section spacing="md" background="muted">
        <Container>
          <h2 className="mb-12 text-center font-display text-3xl font-light">Our Values</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {ABOUT_PAGE.values.map((value) => (
              <div key={value.title} className="text-center">
                <h3 className="font-display text-xl font-light">{value.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
      <Section spacing="md">
        <Container size="narrow">
          <h2 className="mb-12 font-display text-3xl font-light">Milestones</h2>
          <div className="space-y-8 border-l border-border-subtle pl-8">
            {BRAND_TIMELINE.map((item) => (
              <div key={item.year} className="relative">
                <div className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-foreground" />
                <p className="font-display text-2xl font-light text-muted-foreground">{item.year}</p>
                <h3 className="mt-1 font-display text-lg font-light">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
