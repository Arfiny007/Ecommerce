import Image from "next/image";
import Link from "next/link";
import { ContentPageHero } from "@/components/content/content-page-hero";
import { Section } from "@/components/common/section";
import { Container } from "@/components/common/container";
import { ABOUT_PAGE, STORE_LOCATIONS } from "@/constants/content/company";
import { BRAND_TIMELINE, BRAND_QUOTE } from "@/constants/home-content";
import { BRAND_STATS, CRAFTSMANSHIP, LUXURY_SERVICES, SUSTAINABILITY_HIGHLIGHTS } from "@/constants/editorial";
import {
  BrandNumbers,
  EditorialQuote,
  FeatureColumns,
  MagazineGrid,
  ImageCollage,
} from "@/components/editorial";
import { Button } from "@/components/ui/button";
import { createPageMetadata } from "@/lib/metadata";

const IMG = (id: string) =>
  `https://images.unsplash.com/${id}?w=900&q=85&auto=format&fit=crop`;

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
        <Container>
          <BrandNumbers stats={BRAND_STATS} />
          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <ImageCollage
              images={[
                { src: IMG("photo-1469334031218-e382a71b716b"), alt: "SoHo studio" },
                { src: IMG("photo-1539533018447-63fcce2678e3"), alt: "Tailoring" },
                { src: IMG("photo-1548036328-c9fa89d128fa"), alt: "Leather craft" },
              ]}
            />
            <div>
              {ABOUT_PAGE.sections.slice(0, 2).map((section) => (
                <section key={section.title} className="mb-8 border-b border-border-subtle pb-8">
                  <h2 className="font-display text-2xl font-light">{section.title}</h2>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {section.body}
                  </p>
                </section>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="md" background="muted">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            {ABOUT_PAGE.sections.slice(2).map((section) => (
              <section key={section.title}>
                <h2 className="font-display text-2xl font-light">{section.title}</h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {section.body}
                </p>
              </section>
            ))}
          </div>
          <EditorialQuote
            className="mt-10"
            text={BRAND_QUOTE.text}
            attribution={BRAND_QUOTE.attribution}
          />
        </Container>
      </Section>

      <Section spacing="md">
        <Container>
          <h2 className="font-display text-3xl font-light">Our Values</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ABOUT_PAGE.values.map((value) => (
              <article
                key={value.title}
                className="rounded-[var(--radius-xl)] border border-border-subtle p-6"
              >
                <h3 className="font-display text-xl font-light">{value.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{value.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="md" background="gradient">
        <Container>
          <h2 className="font-display text-3xl font-light">{CRAFTSMANSHIP.title}</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">{CRAFTSMANSHIP.lead}</p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {CRAFTSMANSHIP.pillars.map((pillar) => (
              <article key={pillar.title} className="overflow-hidden rounded-[var(--radius-2xl)] border border-border-subtle bg-surface">
                <div className="relative aspect-[4/3]">
                  <Image src={IMG(pillar.image)} alt={pillar.title} fill className="object-cover" sizes="33vw" />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-light">{pillar.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{pillar.body}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="md">
        <Container>
          <h2 className="font-display text-3xl font-light">Milestones</h2>
          <div className="mt-8 grid gap-8 lg:grid-cols-12">
            <div className="space-y-6 border-l border-border-subtle pl-8 lg:col-span-5">
              {BRAND_TIMELINE.map((item) => (
                <div key={item.year} className="relative">
                  <div className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-foreground" />
                  <p className="font-display text-2xl font-light text-muted-foreground">{item.year}</p>
                  <h3 className="mt-1 font-display text-lg font-light">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
            <MagazineGrid
              className="lg:col-span-7"
              items={[
                { src: IMG("photo-1483985988355-763728e1935b"), alt: "Campaign" },
                { src: IMG("photo-1509631179647-0177331693ae"), alt: "Lookbook", span: "tall" },
                { src: IMG("photo-1490481651871-ab68de25d43d"), alt: "Editorial" },
                { src: IMG("photo-1515886657613-9f3515b0c78f"), alt: "Evening" },
              ]}
            />
          </div>
        </Container>
      </Section>

      <Section spacing="md" background="muted">
        <Container>
          <h2 className="font-display text-3xl font-light">{SUSTAINABILITY_HIGHLIGHTS.title}</h2>
          <FeatureColumns items={SUSTAINABILITY_HIGHLIGHTS.items} columns={3} className="mt-8" />
        </Container>
      </Section>

      <Section spacing="md">
        <Container>
          <h2 className="font-display text-3xl font-light">{LUXURY_SERVICES.title}</h2>
          <p className="mt-3 max-w-xl text-muted-foreground">{LUXURY_SERVICES.description}</p>
          <FeatureColumns items={LUXURY_SERVICES.services} columns={3} className="mt-8" />
        </Container>
      </Section>

      <Section spacing="md" background="muted">
        <Container>
          <h2 className="font-display text-3xl font-light">Global Boutiques</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {STORE_LOCATIONS.map((store) => (
              <article key={store.id} className="flex gap-4 rounded-[var(--radius-xl)] border border-border-subtle p-5">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-[var(--radius-lg)]">
                  <Image src={IMG(store.image)} alt={store.name} fill className="object-cover" sizes="96px" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-editorial text-muted-foreground">{store.city}</p>
                  <h3 className="font-display text-lg font-light">{store.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{store.hours}</p>
                </div>
              </article>
            ))}
          </div>
          <Button variant="luxury" className="mt-8" asChild>
            <Link href="/stores">View All Locations</Link>
          </Button>
        </Container>
      </Section>
    </>
  );
}
