'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useGenerationHistory, GenerationRecord } from '@/hooks/use-generation-history';
import HeroSection from '@/components/hero-section';
import GeneratorCard from '@/components/generator-card';
import PresentationBackground from '@/components/presentation-background';
import RecentSlides from '@/components/recent-slides';
import SlidePreview from '@/components/slide-preview';
import AuthModal from '@/components/auth-modal';
import HistoryPanel from '@/components/history-panel';
import UserMenu from '@/components/user-menu';
import { Button } from '@/components/ui/button';
import { Clock, LogIn } from 'lucide-react';

export default function Home() {
  const { user, login, isAuthenticated } = useAuth();
  const { history, addToHistory, removeFromHistory, clearHistory } = useGenerationHistory();

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedBackgroundStyle, setSelectedBackgroundStyle] = useState('minimal-light');
  const [slides, setSlides] = useState<string[]>([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const handleGenerate = async (topic: string, slideCount: number, tone: string) => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }

    setIsGenerating(true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    const generatedSlides = Array.from(
      { length: slideCount },
      (_, i) => `Slide ${i + 1}: ${topic}\n\nKey Point ${i + 1}\n\nTone: ${tone}`
    );

    setSlides(generatedSlides);
    setCurrentSlideIndex(0);

    addToHistory(topic, slideCount, tone, generatedSlides, selectedBackgroundStyle);
    setIsGenerating(false);
  };

  const handleSelectFromHistory = (record: GenerationRecord) => {
    setSlides(record.slides);
    setCurrentSlideIndex(0);
    setIsHistoryOpen(false);
  };

  return (
    <div className="min-h-screen px-2 py-3 sm:px-4 sm:py-4">
      <div className="paper-frame mx-auto max-w-[1200px] overflow-hidden">
        <header className="border-b border-[var(--line)] bg-[var(--paper)]">
          <div className="mx-auto flex h-16 items-center justify-between px-5 sm:px-8">
            <div className="font-serif text-3xl leading-none text-[var(--ink)]">AI PPT</div>
            <div className="flex items-center gap-2 sm:gap-4">
              <Button
                onClick={() => setIsHistoryOpen(true)}
                variant="ghost"
                className="h-9 gap-2 rounded-full px-3 text-[15px] font-medium text-[var(--ink-soft)] hover:bg-[var(--paper-2)] hover:text-[var(--ink)]"
              >
                <Clock className="h-4 w-4" />
                <span>History</span>
              </Button>

              {isAuthenticated && user ? (
                <UserMenu onOpenHistory={() => setIsHistoryOpen(true)} />
              ) : (
                <Button
                  onClick={() => setIsAuthModalOpen(true)}
                  variant="ghost"
                  className="h-9 gap-2 rounded-full px-3 text-[15px] font-medium text-[var(--ink-soft)] hover:bg-[var(--paper-2)] hover:text-[var(--ink)]"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Sign in</span>
                </Button>
              )}
            </div>
          </div>
        </header>

        <main className="relative overflow-hidden">
          <div className="hero-wash absolute inset-0" />
          <div className="relative px-4 pb-16 pt-10 sm:px-10 sm:pb-20 sm:pt-14">
            <HeroSection />
            <div className="mx-auto mt-7 max-w-3xl">
              <GeneratorCard onGenerate={handleGenerate} isGenerating={isGenerating} />
            </div>

            <div className="mx-auto mt-16 max-w-3xl">
              <RecentSlides />
            </div>

            <div className="mx-auto mt-16 max-w-6xl">
              <PresentationBackground
                selectedStyle={selectedBackgroundStyle}
                onSelectStyle={setSelectedBackgroundStyle}
              />
            </div>

            {slides.length > 0 && (
              <div className="mx-auto mt-14 max-w-5xl">
                <SlidePreview
                  slides={slides}
                  currentIndex={currentSlideIndex}
                  onSlideChange={setCurrentSlideIndex}
                  backgroundStyle={selectedBackgroundStyle}
                />
              </div>
            )}
          </div>
        </main>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onOpenChange={setIsAuthModalOpen}
        onLogin={async (email, password) => {
          await login(email, password);
          setIsAuthModalOpen(false);
        }}
      />

      <HistoryPanel
        isOpen={isHistoryOpen}
        onOpenChange={setIsHistoryOpen}
        history={history}
        onSelectHistory={handleSelectFromHistory}
        onRemove={removeFromHistory}
        onClearAll={clearHistory}
      />
    </div>
  );
}
