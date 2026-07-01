import { HeroSection } from "@/components/home/hero-section";
import { FeaturedCollections } from "@/components/home/featured-collections";
import { FeaturedProducts } from "@/components/home/featured-products";
import { HorizontalLookbook } from "@/components/home/horizontal-lookbook";
import { EditorialStorySection } from "@/components/home/editorial-story-section";
import { BrandStory } from "@/components/home/brand-story-section";
import { BestSellers } from "@/components/home/best-sellers-section";
import { Testimonials } from "@/components/home/testimonials-carousel";
import { NewsletterSection } from "@/components/home/newsletter-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedCollections />
      <FeaturedProducts />
      <HorizontalLookbook />
      <EditorialStorySection />
      <BrandStory />
      <BestSellers />
      <Testimonials />
      <NewsletterSection />
    </>
  );
}
