import { Link } from "react-router-dom";
import { CATEGORIES, CATEGORY_COLORS, Category } from "@/lib/constants";
import { useCategoryCounts } from "@/hooks/usePrompts";
import { ArrowRight } from "lucide-react";

export function CategoriesPreview() {
  const { data: categoryCounts } = useCategoryCounts();

  return (
    <section id="categories" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Prompts for Every Use Case
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From sales outreach to technical documentation, we've got you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((category) => (
            <Link
              key={category}
              to={`/prompts?category=${encodeURIComponent(category)}`}
              className="group p-6 rounded-xl border border-border/50 bg-card/50 hover:bg-card hover:border-primary/30 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm border ${CATEGORY_COLORS[category as Category]}`}
                >
                  {category}
                </span>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
              <div className="text-2xl font-bold text-foreground">
                {categoryCounts?.[category] ?? 0}
              </div>
              <div className="text-sm text-muted-foreground">prompts</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
