import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(0,0%,45%)]" />
      <Input
        type="text"
        placeholder="Search prompts..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 bg-[hsl(0,0%,8%)] border-[hsl(27,30%,18%)] text-[hsl(0,0%,90%)] placeholder:text-[hsl(0,0%,40%)] focus:border-[hsl(27,95%,50%)]/50 focus:ring-[hsl(27,95%,50%)]/20"
      />
    </div>
  );
}
