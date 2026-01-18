import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search prompts..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 bg-card/50 border-border/50 focus:border-primary/50"
      />
    </div>
  );
}
