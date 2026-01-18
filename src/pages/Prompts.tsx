import { useState, useMemo, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { usePrompts, Prompt } from "@/hooks/usePrompts";
import { useEmailCapture } from "@/hooks/useEmailCapture";
import { SearchBar } from "@/components/SearchBar";
import { CategorySidebar } from "@/components/CategorySidebar";
import { PromptCard } from "@/components/PromptCard";
import { PromptModal } from "@/components/PromptModal";
import { EmailCaptureModal } from "@/components/EmailCaptureModal";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Filter, Sparkles } from "lucide-react";

export default function Prompts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data: prompts, isLoading } = usePrompts();
  const {
    showModal: showEmailModal,
    subscribe,
    dismissModal,
    trackPromptView,
  } = useEmailCapture();

  const selectedCategory = searchParams.get("category");

  const setSelectedCategory = (category: string | null) => {
    if (category) {
      setSearchParams({ category });
    } else {
      setSearchParams({});
    }
    setSidebarOpen(false);
  };

  const filteredPrompts = useMemo(() => {
    if (!prompts) return [];

    return prompts.filter((prompt) => {
      const matchesCategory =
        !selectedCategory || prompt.category === selectedCategory;
      const matchesSearch =
        !searchQuery ||
        prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.use_case.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [prompts, selectedCategory, searchQuery]);

  const handleViewPrompt = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
    setModalOpen(true);
    trackPromptView();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </Link>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">
                Prompt Library
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:block w-64">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>

            {/* Mobile filter button */}
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Filter className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <CategorySidebar
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Mobile search */}
        <div className="md:hidden mb-6">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block w-64 shrink-0">
            <div className="sticky top-24">
              <CategorySidebar
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Results count */}
            <div className="mb-6">
              <p className="text-muted-foreground">
                {isLoading
                  ? "Loading prompts..."
                  : `${filteredPrompts.length} prompt${filteredPrompts.length !== 1 ? "s" : ""} found`}
                {selectedCategory && (
                  <span className="text-foreground"> in {selectedCategory}</span>
                )}
              </p>
            </div>

            {/* Prompts Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="p-5 rounded-xl border border-border/50 bg-card/50">
                    <Skeleton className="h-6 w-20 mb-3" />
                    <Skeleton className="h-5 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4 mb-4" />
                    <Skeleton className="h-8 w-28" />
                  </div>
                ))}
              </div>
            ) : filteredPrompts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPrompts.map((prompt) => (
                  <PromptCard
                    key={prompt.id}
                    prompt={prompt}
                    onView={handleViewPrompt}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No prompts found matching your criteria.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory(null);
                  }}
                  className="mt-4"
                >
                  Clear filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Prompt Detail Modal */}
      <PromptModal
        prompt={selectedPrompt}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />

      {/* Email Capture Modal */}
      <EmailCaptureModal
        open={showEmailModal}
        onOpenChange={dismissModal}
        onSubscribe={subscribe}
      />
    </div>
  );
}
