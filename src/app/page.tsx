import { HeroSection } from "@/components/home/hero-section";
import { CampaignStorySection } from "@/components/home/campaign-story-section";
import { AtelierSection } from "@/components/home/atelier-section";
import { HorizontalLookbook } from "@/components/home/horizontal-lookbook";
import { ManifestoSection } from "@/components/home/manifesto-section";
import { JournalPreviewSection } from "@/components/home/journal-preview-section";
import { HeritageSection } from "@/components/home/heritage-section";
import { BestSellers } from "@/components/home/best-sellers-section";
import { VoicesSection } from "@/components/home/voices-section";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { baseMetadata } from "@/lib/metadata";
import { SITE_URL } from "@/constants/site";

export const metadata = {
  ...baseMetadata,
  alternates: { canonical: SITE_URL },
};

/**
 * Homepage sections — each with a distinct layout:
 * Hero → Campaign → Atelier → Lookbook → Manifesto → Journal → Heritage → Best Sellers → Voices → Newsletter
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CampaignStorySection />
      <AtelierSection />
      <HorizontalLookbook />
      <ManifestoSection />
      <JournalPreviewSection />
      <HeritageSection />
      <BestSellers />
      <VoicesSection />
      <NewsletterSection />
    </>
  );
}
