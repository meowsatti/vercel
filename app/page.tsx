import { Preloader } from "@/components/preloader";
import { CustomCursor } from "@/components/custom-cursor";
import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { ComparisonSection } from "@/components/comparison-section";
import { CostCalculator } from "@/components/cost-calculator";
import { Footer } from "@/components/footer";
import { SolutionsPreview } from "@/components/solutions-preview";

export default function Page() {
  return (
    <>
      <Preloader />
      <CustomCursor />
      <Navigation />
      <main>
        <HeroSection />
        <FeaturesSection />
        <SolutionsPreview />
        <HowItWorksSection />
        <ComparisonSection />
        <CostCalculator />
      </main>
      <Footer />
    </>
  );
}
