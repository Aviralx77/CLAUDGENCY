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
    <section className="py-20 border-y border-[hsl(27,30%,15%)]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-[hsl(0,0%,8%)]/60 border border-[hsl(27,30%,20%)] backdrop-blur-sm hover:border-[hsl(27,95%,50%)]/40 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-xl bg-[hsl(27,95%,50%)]/10 flex items-center justify-center mb-4 group-hover:bg-[hsl(27,95%,50%)]/20 transition-colors">
                <stat.icon className="w-7 h-7 text-[hsl(27,95%,60%)]" />
              </div>
              <div className="text-4xl font-bold text-[hsl(0,0%,95%)] mb-2">
                {stat.value}
              </div>
              <div className="text-[hsl(0,0%,55%)]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
