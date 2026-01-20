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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-[hsl(0,0%,6%)] border-[hsl(27,30%,18%)]">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <span
              className={cn(
                "px-2.5 py-1 rounded-full text-xs border",
                CATEGORY_COLORS[prompt.category as Category] ||
                  "bg-[hsl(0,0%,15%)] text-[hsl(0,0%,60%)] border-[hsl(0,0%,25%)]"
              )}
            >
              {prompt.category}
            </span>
          </div>
          <DialogTitle className="text-xl text-[hsl(0,0%,95%)]">{prompt.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Use Case */}
          <div>
            <h4 className="text-sm font-medium text-[hsl(0,0%,50%)] mb-2">
              Use Case
            </h4>
            <p className="text-[hsl(0,0%,90%)]">{prompt.use_case}</p>
          </div>

          {/* Prompt */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-[hsl(0,0%,50%)]">
                Prompt
              </h4>
              <CopyButton text={prompt.prompt} />
            </div>
            <div className="p-4 rounded-lg bg-[hsl(0,0%,10%)] border border-[hsl(27,30%,15%)]">
              <pre className="text-sm text-[hsl(0,0%,85%)] whitespace-pre-wrap font-mono">
                {prompt.prompt}
              </pre>
            </div>
          </div>

          {/* Example Output */}
          {prompt.example_output && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-[hsl(0,0%,50%)]" />
                <h4 className="text-sm font-medium text-[hsl(0,0%,50%)]">
                  Example Output
                </h4>
              </div>
              <div className="p-4 rounded-lg bg-[hsl(0,0%,8%)] border border-[hsl(27,30%,15%)]">
                <p className="text-sm text-[hsl(0,0%,80%)] whitespace-pre-wrap">
                  {prompt.example_output}
                </p>
              </div>
            </div>
          )}

          {/* Pro Tip */}
          {prompt.pro_tip && (
            <div className="p-4 rounded-lg bg-[hsl(27,95%,50%)]/10 border border-[hsl(27,95%,50%)]/30">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-4 h-4 text-[hsl(27,95%,60%)]" />
                <h4 className="text-sm font-medium text-[hsl(27,95%,60%)]">Pro Tip</h4>
              </div>
              <p className="text-sm text-[hsl(0,0%,85%)]">{prompt.pro_tip}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
