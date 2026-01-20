import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 border-t border-[hsl(27,30%,15%)]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[hsl(27,95%,60%)]" />
            <span className="font-semibold text-[hsl(0,0%,95%)]">
              Claudgency
            </span>
          </div>
          <p className="text-sm text-[hsl(0,0%,50%)] text-center">
            Built with ❤️ for the AI community. Free forever.
          </p>
          <div className="text-sm text-[hsl(0,0%,50%)]">
            © {new Date().getFullYear()} All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
}
