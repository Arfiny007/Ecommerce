import { HeroSection } from "@/components/home/hero-section";
import { FeaturedCollections } from "@/components/home/featured-collections";
import { FeaturedProducts, BestSellers } from "@/components/home/featured-products";
import {
  LookbookSection,
  EditorialSection,
  BrandStory,
} from "@/components/home/lookbook-section";
import { Testimonials, NewsletterSection } from "@/components/home/testimonials";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedCollections />
      <FeaturedProducts />
      <LookbookSection />
      <EditorialSection />
      <BrandStory />
      <BestSellers />
      <Testimonials />
      <NewsletterSection />
    </>
  );
}
