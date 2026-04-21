import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { TrustSection } from "@/components/landing/TrustSection";
import { StorySection } from "@/components/landing/StorySection";
import { FeaturedProductsSection } from "@/components/landing/FeaturedProductsSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { NewsletterSection } from "@/components/landing/NewsletterSection";
import { Footer } from "@/components/landing/Footer";
import ProducersList from "./ProductersList";
import { RecognitionSection } from "@/components/landing/RecognitionSection";
import FeatureSectionWithBentoGrid from "@/components/ui/feature-section-with-bento-grid";

const Index = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (pathname !== "/") return;
    const id = hash?.replace(/^#/, "");
    if (!id) return;
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [pathname, hash]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <TrustSection />
      <StorySection />
      <FeaturedProductsSection />
      <ProducersList />
      <section id="reconnaissance" className="scroll-mt-28">
        <RecognitionSection />
      </section>
      <FeatureSectionWithBentoGrid />
      <PricingSection />
      <StatsSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
};

export default Index;
