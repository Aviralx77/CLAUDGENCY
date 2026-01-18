import { Prompt } from "@/hooks/usePrompts";
import { CATEGORY_COLORS, Category } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { CopyButton } from "@/components/CopyButton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Lightbulb, FileText } from "lucide-react";

interface PromptModalProps {
  prompt: Prompt | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PromptModal({ prompt, open, onOpenChange }: PromptModalProps) {
  if (!prompt) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <span
              className={cn(
                "px-2.5 py-1 rounded-full text-xs border",
                CATEGORY_COLORS[prompt.category as Category] ||
                  "bg-muted text-muted-foreground border-border"
              )}
            >
              {prompt.category}
            </span>
          </div>
          <DialogTitle className="text-xl">{prompt.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Use Case */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">
              Use Case
            </h4>
            <p className="text-foreground">{prompt.use_case}</p>
          </div>

          {/* Prompt */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-muted-foreground">
                Prompt
              </h4>
              <CopyButton text={prompt.prompt} />
            </div>
            <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
              <pre className="text-sm text-foreground whitespace-pre-wrap font-mono">
                {prompt.prompt}
              </pre>
            </div>
          </div>

          {/* Example Output */}
          {prompt.example_output && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-muted-foreground" />
                <h4 className="text-sm font-medium text-muted-foreground">
                  Example Output
                </h4>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border/50">
                <p className="text-sm text-foreground whitespace-pre-wrap">
                  {prompt.example_output}
                </p>
              </div>
            </div>
          )}

          {/* Pro Tip */}
          {prompt.pro_tip && (
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-4 h-4 text-primary" />
                <h4 className="text-sm font-medium text-primary">Pro Tip</h4>
              </div>
              <p className="text-sm text-foreground">{prompt.pro_tip}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
