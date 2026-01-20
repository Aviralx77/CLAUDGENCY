import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Sparkles, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EmailCaptureModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubscribe: (email: string) => Promise<{ success: boolean; message: string }>;
}

export function EmailCaptureModal({
  open,
  onOpenChange,
  onSubscribe,
}: EmailCaptureModalProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const result = await onSubscribe(email);
      toast({
        title: "Success!",
        description: result.message,
      });
      setEmail("");
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-[hsl(0,0%,6%)] border-[hsl(27,30%,18%)] overflow-hidden">
        {/* Ambient glow effects */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-[hsl(27,95%,50%)] rounded-full blur-[100px] opacity-20 pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[hsl(20,90%,40%)] rounded-full blur-[100px] opacity-15 pointer-events-none" />

        <DialogHeader className="text-center relative z-10">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-[hsl(27,95%,50%)] to-[hsl(20,90%,40%)] flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(234,88,12,0.4)]">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-2xl font-bold text-[hsl(0,0%,95%)]">
            Unlock All 250 Prompts
          </DialogTitle>
          <DialogDescription className="text-base text-[hsl(0,0%,60%)] mt-2">
            Get notified when we add new prompts and receive exclusive tips
            for maximizing Claude's potential.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6 relative z-10">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(0,0%,50%)]" />
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 bg-[hsl(0,0%,10%)] border-[hsl(27,30%,20%)] text-[hsl(0,0%,95%)] placeholder:text-[hsl(0,0%,40%)] focus:border-[hsl(27,95%,50%)] focus:ring-[hsl(27,95%,50%)]/20"
              disabled={loading}
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-[hsl(27,95%,50%)] to-[hsl(20,90%,45%)] hover:from-[hsl(27,95%,55%)] hover:to-[hsl(20,90%,50%)] text-white font-semibold shadow-[0_0_20px_rgba(234,88,12,0.3)] hover:shadow-[0_0_30px_rgba(234,88,12,0.5)] transition-all duration-300" 
            disabled={loading}
          >
            {loading ? "Subscribing..." : "Get Free Access"}
          </Button>
          <p className="text-xs text-center text-[hsl(0,0%,45%)]">
            No spam, unsubscribe anytime.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
