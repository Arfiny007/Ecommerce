import { ContentPageHero } from "@/components/content/content-page-hero";
import { StoreLocationsGrid } from "@/components/content/store-locations-grid";
import { Section } from "@/components/common/section";
import { Container } from "@/components/common/container";
import { STORES_PAGE, STORE_LOCATIONS } from "@/constants/content/company";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Store Locations",
  description: STORES_PAGE.lead,
  path: "/stores",
});

export default function StoresPage() {
  return (
    <>
      <ContentPageHero
        eyebrow={STORES_PAGE.eyebrow}
        title={STORES_PAGE.title}
        lead={STORES_PAGE.lead}
      />
      <Section spacing="md">
        <Container>
          <StoreLocationsGrid locations={STORE_LOCATIONS} />
        </Container>
      </Section>
    </>
  );
}
