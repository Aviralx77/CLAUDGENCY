import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">
              Claude Prompt Library
            </span>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Built with ❤️ for the AI community. Free forever.
          </p>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
}
