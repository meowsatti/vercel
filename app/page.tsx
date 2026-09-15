import { Preloader } from "@/components/preloader";
import { CustomCursor } from "@/components/custom-cursor";
import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { LiveCallSection } from "@/components/live-call-section";
import { FeaturesSection } from "@/components/features-section";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { ComparisonSection } from "@/components/comparison-section";
import { RoiCalculator, TrustedCompaniesSection, TestimonialsSection, BlogSection } from "@/components/trusted-companies-section";
import { Footer } from "@/components/footer";

export default function Page() {
  return (
    <>
      <Preloader />
      <CustomCursor />
      <Navigation />
      <main>
        <HeroSection />
        <LiveCallSection />
        <TrustedCompaniesSection />
        <FeaturesSection />
        <HowItWorksSection />
        <ComparisonSection />
        <RoiCalculator />
        <TestimonialsSection />
        <BlogSection />
      </main>
      <Footer />
    </>
  );
}
