export const CATEGORIES = [
  "Sales",
  "Marketing", 
  "Technical",
  "GTM",
  "Email Copywriting",
  "LinkedIn Copywriting",
  "Content Strategy",
  "Client Communication"
] as const;

export type Category = typeof CATEGORIES[number];

export const CATEGORY_COLORS: Record<Category, string> = {
  "Sales": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "Marketing": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Technical": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "GTM": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  "Email Copywriting": "bg-pink-500/20 text-pink-400 border-pink-500/30",
  "LinkedIn Copywriting": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  "Content Strategy": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  "Client Communication": "bg-rose-500/20 text-rose-400 border-rose-500/30",
};
