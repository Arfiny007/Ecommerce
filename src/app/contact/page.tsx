import { ContentPageHero } from "@/components/content/content-page-hero";
import { ContactForm } from "@/components/content/contact-form";
import { Section } from "@/components/common/section";
import { Container } from "@/components/common/container";
import { CONTACT_PAGE } from "@/constants/content/company";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Contact",
  description: CONTACT_PAGE.lead,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <ContentPageHero
        eyebrow={CONTACT_PAGE.eyebrow}
        title={CONTACT_PAGE.title}
        lead={CONTACT_PAGE.lead}
      />
      <Section spacing="md">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl font-light">Departments</h2>
              <div className="mt-8 space-y-8">
                {CONTACT_PAGE.departments.map((dept) => (
                  <div key={dept.title}>
                    <h3 className="text-sm font-medium">{dept.title}</h3>
                    <a
                      href={`mailto:${dept.email}`}
                      className="mt-1 block text-sm text-muted-foreground underline-offset-4 hover:underline"
                    >
                      {dept.email}
                    </a>
                    <p className="mt-2 text-sm text-muted-foreground">{dept.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <ContactForm />
          </div>
        </Container>
      </Section>
    </>
  );
}
