import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSections";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-950 dark:via-orange-950 dark:to-yellow-950">
      <HeroSection />
      <FeaturesSection />
      <CTA />
      <Footer />
    </div>
  );
}
