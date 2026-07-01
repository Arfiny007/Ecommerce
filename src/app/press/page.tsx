import { ContentPageHero } from "@/components/content/content-page-hero";
import { Section } from "@/components/common/section";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { PRESS_PAGE } from "@/constants/content/company";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Press",
  description: PRESS_PAGE.lead,
  path: "/press",
});

export default function PressPage() {
  return (
    <>
      <ContentPageHero
        eyebrow={PRESS_PAGE.eyebrow}
        title={PRESS_PAGE.title}
        lead={PRESS_PAGE.lead}
      />
      <Section spacing="md">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl font-light">Recent Coverage</h2>
              <div className="mt-8 space-y-6">
                {PRESS_PAGE.coverage.map((item) => (
                  <article key={item.title} className="border-b border-border-subtle pb-6">
                    <p className="text-xs uppercase tracking-editorial text-muted-foreground">
                      {item.outlet} · {item.date}
                    </p>
                    <h3 className="mt-2 font-display text-lg font-light">{item.title}</h3>
                  </article>
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-display text-2xl font-light">Press Assets</h2>
              <div className="mt-8 space-y-4">
                {PRESS_PAGE.assets.map((asset) => (
                  <div
                    key={asset.label}
                    className="rounded-[var(--radius-xl)] border border-border-subtle p-5"
                  >
                    <h3 className="text-sm font-medium">{asset.label}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{asset.description}</p>
                  </div>
                ))}
              </div>
              <Button variant="luxury" className="mt-8" asChild>
                <a href={`mailto:${PRESS_PAGE.contact}?subject=Press%20Kit%20Request`}>
                  Request Press Kit
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
