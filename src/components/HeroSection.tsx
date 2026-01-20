import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[hsl(0,0%,4%)]">
      {/* Premium 4K Background with black/orange gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(0,0%,2%)] via-[hsl(20,30%,8%)] to-[hsl(0,0%,4%)]" />
      
      {/* Glowing orbs for premium effect */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[hsl(27,95%,45%)] rounded-full blur-[150px] opacity-20 animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-[hsl(20,90%,50%)] rounded-full blur-[120px] opacity-15 animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[hsl(25,85%,40%)] rounded-full blur-[200px] opacity-10" />
      
      {/* Subtle grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />

      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Project Name */}
        <h2 className="text-xl md:text-2xl font-bold tracking-[0.3em] uppercase mb-8 animate-fade-in">
          <span className="bg-gradient-to-r from-[hsl(27,95%,60%)] via-[hsl(33,100%,65%)] to-[hsl(27,95%,60%)] bg-clip-text text-transparent">
            Claudgency
          </span>
        </h2>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[hsl(27,50%,30%)] bg-[hsl(0,0%,8%)]/80 backdrop-blur-sm mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-[hsl(27,95%,60%)]" />
          <span className="text-sm text-[hsl(0,0%,70%)]">
            Free forever • No signup required
          </span>
        </div>

        {/* Main headline - smaller text */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 animate-fade-in">
          <span className="text-[hsl(0,0%,95%)]">250 Claude Prompts That</span>
          <br />
          <span className="bg-gradient-to-r from-[hsl(27,95%,55%)] via-[hsl(33,100%,60%)] to-[hsl(20,90%,50%)] bg-clip-text text-transparent">
            Scaled Our AI Agency
          </span>
          <br />
          <span className="text-[hsl(0,0%,95%)]">to $25K MRR</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base md:text-lg text-[hsl(0,0%,60%)] max-w-2xl mx-auto mb-10 animate-fade-in">
          The exact prompt library we use daily to deliver exceptional results
          for our clients. Curated, tested, and proven to work.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <Button asChild size="lg" className="text-lg px-8 py-6 group bg-gradient-to-r from-[hsl(27,95%,50%)] to-[hsl(20,90%,45%)] hover:from-[hsl(27,95%,55%)] hover:to-[hsl(20,90%,50%)] border-0 text-[hsl(0,0%,100%)] transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(234,88,12,0.4)]">
            <Link to="/prompts">
              Browse All Prompts
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="text-lg px-8 py-6 border-[hsl(27,50%,30%)] text-[hsl(27,95%,60%)] hover:bg-[hsl(27,95%,50%)]/10 hover:border-[hsl(27,95%,50%)] transition-all duration-500 hover:scale-105"
          >
            <a 
              href="#categories"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View Categories
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
