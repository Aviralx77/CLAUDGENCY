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
    <div className="group p-5 rounded-xl border border-[hsl(27,30%,18%)] bg-[hsl(0,0%,8%)]/60 hover:bg-[hsl(0,0%,10%)] hover:border-[hsl(27,95%,50%)]/40 transition-all duration-300 backdrop-blur-sm">
      <div className="flex items-start justify-between gap-3 mb-3">
        <span
          className={cn(
            "px-2.5 py-1 rounded-full text-xs border shrink-0",
            CATEGORY_COLORS[prompt.category as Category] ||
              "bg-[hsl(0,0%,15%)] text-[hsl(0,0%,60%)] border-[hsl(0,0%,25%)]"
          )}
        >
          {prompt.category}
        </span>
      </div>

      <h3 className="font-semibold text-[hsl(0,0%,95%)] mb-2 line-clamp-2">
        {prompt.title}
      </h3>

      <p className="text-sm text-[hsl(0,0%,50%)] line-clamp-2 mb-4">
        {prompt.use_case}
      </p>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => onView(prompt)}
        className="group/btn text-[hsl(27,95%,60%)] hover:text-[hsl(27,95%,70%)] hover:bg-[hsl(27,95%,50%)]/10"
      >
        View Prompt
        <ArrowRight className="ml-1 w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
      </Button>
    </div>
  );
}
