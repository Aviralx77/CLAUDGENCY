import { HeroSection } from "@/components/HeroSection";
import { StatsSection } from "@/components/StatsSection";
import { CategoriesPreview } from "@/components/CategoriesPreview";
import { Footer } from "@/components/Footer";
import { useCursorGlow } from "@/hooks/useCursorGlow";

const Index = () => {
  const cursorPosition = useCursorGlow();

  return (
    <div className="min-h-screen bg-[hsl(0,0%,4%)] relative overflow-hidden">
      {/* Cursor-following glow */}
      <div
        className="pointer-events-none fixed w-[600px] h-[600px] rounded-full blur-[150px] opacity-20 transition-all duration-300 ease-out z-0"
        style={{
          background: "radial-gradient(circle, hsl(27, 95%, 50%) 0%, transparent 70%)",
          left: `${cursorPosition.x}%`,
          top: `${cursorPosition.y}%`,
          transform: "translate(-50%, -50%)",
        }}
      />
      
      {/* Static ambient glows */}
      <div className="pointer-events-none fixed top-0 left-0 w-[400px] h-[400px] bg-[hsl(27,95%,45%)] rounded-full blur-[180px] opacity-10 z-0" />
      <div className="pointer-events-none fixed bottom-0 right-0 w-[500px] h-[500px] bg-[hsl(20,90%,40%)] rounded-full blur-[200px] opacity-10 z-0" />
      
      <div className="relative z-10">
        <HeroSection />
        <StatsSection />
        <CategoriesPreview />
        <Footer />
      </div>
    </div>
  );
};

export default Index;