import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { TrustSection } from "@/components/landing/TrustSection";
import { StorySection } from "@/components/landing/StorySection";
import { FeaturedProductsSection } from "@/components/landing/FeaturedProductsSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { NewsletterSection } from "@/components/landing/NewsletterSection";
import { Footer } from "@/components/landing/Footer";
import { FeaturedProductersSection } from "@/components/landing/FeaturedProductersSection";
import ProducersList from "./ProductersList";
import { FeatureEntreprisesSections } from "@/components/landing/FeatureEntreprisesSections";
import PartnersSection from "./PartnersSection";


const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <TrustSection />
      <StorySection />
      <FeaturedProductsSection />
      <ProducersList />
      <PartnersSection />
      <PricingSection />
      <StatsSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
};

export default Index;
