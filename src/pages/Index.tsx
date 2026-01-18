import { HeroSection } from "@/components/HeroSection";
import { StatsSection } from "@/components/StatsSection";
import { CategoriesPreview } from "@/components/CategoriesPreview";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <StatsSection />
      <CategoriesPreview />
      <Footer />
    </div>
  );
};

export default Index;