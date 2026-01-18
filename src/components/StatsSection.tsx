import { usePromptsCount, useCategoryCounts } from "@/hooks/usePrompts";
import { FileText, FolderOpen, Users } from "lucide-react";

export function StatsSection() {
  const { data: promptCount } = usePromptsCount();
  const { data: categoryCounts } = useCategoryCounts();

  const categoryCount = categoryCounts ? Object.keys(categoryCounts).length : 0;

  const stats = [
    {
      icon: FileText,
      value: promptCount ?? 250,
      label: "Curated Prompts",
    },
    {
      icon: FolderOpen,
      value: categoryCount || 8,
      label: "Categories",
    },
    {
      icon: Users,
      value: "500+",
      label: "Agencies Using",
    },
  ];

  return (
    <section className="py-20 border-y border-border/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm hover:border-primary/30 transition-colors"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <stat.icon className="w-7 h-7 text-primary" />
              </div>
              <div className="text-4xl font-bold text-foreground mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
