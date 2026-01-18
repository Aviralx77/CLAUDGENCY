import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Prompt {
  id: string;
  category: string;
  title: string;
  use_case: string;
  prompt: string;
  example_output: string | null;
  pro_tip: string | null;
  created_at: string;
}

export function usePrompts() {
  return useQuery({
    queryKey: ["prompts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("prompts")
        .select("*")
        .order("category", { ascending: true });

      if (error) throw error;
      return data as Prompt[];
    },
  });
}

export function usePromptsCount() {
  return useQuery({
    queryKey: ["prompts-count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("prompts")
        .select("*", { count: "exact", head: true });

      if (error) throw error;
      return count ?? 0;
    },
  });
}

export function useCategoryCounts() {
  return useQuery({
    queryKey: ["category-counts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("prompts")
        .select("category");

      if (error) throw error;

      const counts: Record<string, number> = {};
      data?.forEach((item) => {
        counts[item.category] = (counts[item.category] || 0) + 1;
      });
      return counts;
    },
  });
}
