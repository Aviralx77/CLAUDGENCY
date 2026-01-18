import { cn } from "@/lib/utils";
import { CATEGORIES, CATEGORY_COLORS, Category } from "@/lib/constants";
import { useCategoryCounts } from "@/hooks/usePrompts";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface CategorySidebarProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export function CategorySidebar({
  selectedCategory,
  onSelectCategory,
}: CategorySidebarProps) {
  const { data: categoryCounts } = useCategoryCounts();

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Categories</h3>
        {selectedCategory && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSelectCategory(null)}
            className="h-8 px-2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      <button
        onClick={() => onSelectCategory(null)}
        className={cn(
          "w-full text-left px-3 py-2 rounded-lg transition-colors",
          selectedCategory === null
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:bg-card hover:text-foreground"
        )}
      >
        <div className="flex items-center justify-between">
          <span>All Prompts</span>
          <span className="text-sm">
            {categoryCounts
              ? Object.values(categoryCounts).reduce((a, b) => a + b, 0)
              : 0}
          </span>
        </div>
      </button>

      {CATEGORIES.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={cn(
            "w-full text-left px-3 py-2 rounded-lg transition-colors",
            selectedCategory === category
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-card hover:text-foreground"
          )}
        >
          <div className="flex items-center justify-between">
            <span
              className={cn(
                "px-2 py-0.5 rounded text-xs border",
                CATEGORY_COLORS[category as Category]
              )}
            >
              {category}
            </span>
            <span className="text-sm">{categoryCounts?.[category] ?? 0}</span>
          </div>
        </button>
      ))}
    </div>
  );
}
