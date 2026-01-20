import { useState, useMemo, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { usePrompts, Prompt } from "@/hooks/usePrompts";
import { useEmailCapture } from "@/hooks/useEmailCapture";
import { useCursorGlow } from "@/hooks/useCursorGlow";
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
  const [isVisible, setIsVisible] = useState(false);

  const cursorPosition = useCursorGlow();
  const { data: prompts, isLoading } = usePrompts();
  const {
    showModal: showEmailModal,
    subscribe,
    dismissModal,
    trackPromptView,
  } = useEmailCapture();

  const selectedCategory = searchParams.get("category");

  // Page entrance animation
  useEffect(() => {
    setIsVisible(true);
  }, []);

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
    <div className="min-h-screen bg-[hsl(0,0%,4%)] relative overflow-hidden">
      {/* Cursor-following glow */}
      <div
        className="pointer-events-none fixed w-[600px] h-[600px] rounded-full blur-[150px] opacity-20 transition-all duration-300 ease-out z-0"
        style={{
          background: "radial-gradient(circle, hsl(27, 95%, 50%) 0%, transparent 70%)",
          left: `${cursorPosition.x}%`,
          top: `${cursorPosition.y}%`,
          transform: "translate(-50%, -50%)",
        }}
      />
      
      {/* Static ambient glows */}
      <div className="pointer-events-none fixed top-0 right-0 w-[400px] h-[400px] bg-[hsl(27,95%,45%)] rounded-full blur-[180px] opacity-10 z-0" />
      <div className="pointer-events-none fixed bottom-0 left-0 w-[500px] h-[500px] bg-[hsl(20,90%,40%)] rounded-full blur-[200px] opacity-10 z-0" />

      <div className={`relative z-10 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-[hsl(27,30%,15%)] bg-[hsl(0,0%,4%)]/90 backdrop-blur-md">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="flex items-center gap-2 text-[hsl(0,0%,50%)] hover:text-[hsl(0,0%,90%)] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back</span>
              </Link>
              <div className="h-4 w-px bg-[hsl(27,30%,20%)]" />
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[hsl(27,95%,60%)]" />
                <span className="font-semibold text-[hsl(0,0%,95%)]">
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
                  <Button variant="outline" size="icon" className="md:hidden border-[hsl(27,30%,20%)] bg-[hsl(0,0%,8%)] text-[hsl(0,0%,70%)] hover:bg-[hsl(0,0%,12%)] hover:text-[hsl(0,0%,90%)]">
                    <Filter className="w-4 h-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72 bg-[hsl(0,0%,6%)] border-[hsl(27,30%,15%)]">
                  <SheetHeader>
                    <SheetTitle className="text-[hsl(0,0%,95%)]">Filters</SheetTitle>
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
                <p className="text-[hsl(0,0%,50%)]">
                  {isLoading
                    ? "Loading prompts..."
                    : `${filteredPrompts.length} prompt${filteredPrompts.length !== 1 ? "s" : ""} found`}
                  {selectedCategory && (
                    <span className="text-[hsl(0,0%,90%)]"> in {selectedCategory}</span>
                  )}
                </p>
              </div>

              {/* Prompts Grid */}
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="p-5 rounded-xl border border-[hsl(27,30%,15%)] bg-[hsl(0,0%,8%)]/60">
                      <Skeleton className="h-6 w-20 mb-3 bg-[hsl(0,0%,15%)]" />
                      <Skeleton className="h-5 w-full mb-2 bg-[hsl(0,0%,15%)]" />
                      <Skeleton className="h-4 w-3/4 mb-4 bg-[hsl(0,0%,15%)]" />
                      <Skeleton className="h-8 w-28 bg-[hsl(0,0%,15%)]" />
                    </div>
                  ))}
                </div>
              ) : filteredPrompts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredPrompts.map((prompt, index) => (
                    <div
                      key={prompt.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <PromptCard
                        prompt={prompt}
                        onView={handleViewPrompt}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-[hsl(0,0%,50%)] text-lg">
                    No prompts found matching your criteria.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory(null);
                    }}
                    className="mt-4 border-[hsl(27,30%,20%)] text-[hsl(27,95%,60%)] hover:bg-[hsl(27,95%,50%)]/10"
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </main>
          </div>
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
