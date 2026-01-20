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
          <h2 className="text-3xl md:text-4xl font-bold text-[hsl(0,0%,95%)] mb-4">
            Prompts for Every Use Case
          </h2>
          <p className="text-[hsl(0,0%,55%)] text-lg max-w-2xl mx-auto">
            From sales outreach to technical documentation, we've got you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((category) => (
            <Link
              key={category}
              to={`/prompts?category=${encodeURIComponent(category)}`}
              className="group p-6 rounded-xl border border-[hsl(27,30%,18%)] bg-[hsl(0,0%,8%)]/60 hover:bg-[hsl(0,0%,10%)] hover:border-[hsl(27,95%,50%)]/40 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm border ${CATEGORY_COLORS[category as Category]}`}
                >
                  {category}
                </span>
                <ArrowRight className="w-4 h-4 text-[hsl(0,0%,50%)] group-hover:text-[hsl(27,95%,60%)] group-hover:translate-x-1 transition-all" />
              </div>
              <div className="text-2xl font-bold text-[hsl(0,0%,95%)]">
                {categoryCounts?.[category] ?? 0}
              </div>
              <div className="text-sm text-[hsl(0,0%,50%)]">prompts</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
