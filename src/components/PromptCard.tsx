import { Prompt } from "@/hooks/usePrompts";
import { CATEGORY_COLORS, Category } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface PromptCardProps {
  prompt: Prompt;
  onView: (prompt: Prompt) => void;
}

export function PromptCard({ prompt, onView }: PromptCardProps) {
  return (
    <div className="group p-5 rounded-xl border border-border/50 bg-card/50 hover:bg-card hover:border-primary/30 transition-all">
      <div className="flex items-start justify-between gap-3 mb-3">
        <span
          className={cn(
            "px-2.5 py-1 rounded-full text-xs border shrink-0",
            CATEGORY_COLORS[prompt.category as Category] ||
              "bg-muted text-muted-foreground border-border"
          )}
        >
          {prompt.category}
        </span>
      </div>

      <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
        {prompt.title}
      </h3>

      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
        {prompt.use_case}
      </p>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => onView(prompt)}
        className="group/btn text-primary hover:text-primary hover:bg-primary/10"
      >
        View Prompt
        <ArrowRight className="ml-1 w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
      </Button>
    </div>
  );
}
