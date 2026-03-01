'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useGenerationHistory, GenerationRecord } from '@/hooks/use-generation-history';
import HeroSection from '@/components/hero-section';
import GeneratorCard from '@/components/generator-card';
import PresentationBackground from '@/components/presentation-background';
import SlidePreview from '@/components/slide-preview';
import SidePanel from '@/components/side-panel';
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
  const [currentTopic, setCurrentTopic] = useState('');
  const [currentSlideCount, setCurrentSlideCount] = useState(0);
  const [currentTone, setCurrentTone] = useState('');

  const handleGenerate = async (topic: string, slideCount: number, tone: string) => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }

    setIsGenerating(true);
    setCurrentTopic(topic);
    setCurrentSlideCount(slideCount);
    setCurrentTone(tone);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const generatedSlides = Array.from(
      { length: slideCount },
      (_, i) => `Slide ${i + 1}: ${topic}\n\nKey Point ${i + 1}\n\nTone: ${tone}`
    );
    
    setSlides(generatedSlides);
    setCurrentSlideIndex(0);
    
    // Add to history
    addToHistory(topic, slideCount, tone, generatedSlides, selectedBackgroundStyle);
    setIsGenerating(false);
  };

  const handleSelectFromHistory = (record: GenerationRecord) => {
    setSlides(record.slides);
    setCurrentSlideIndex(0);
    setSelectedBackgroundStyle(record.backgroundStyle);
    setCurrentTopic(record.topic);
    setCurrentSlideCount(record.slideCount);
    setCurrentTone(record.tone);
  };

  const handleDownload = () => {
    // Mock download functionality
    alert('Downloading presentation...');
  };

  const handleClear = () => {
    setSlides([]);
    setCurrentSlideIndex(0);
    setSelectedBackgroundStyle('minimal-light');
    setCurrentTopic('');
    setCurrentSlideCount(0);
    setCurrentTone('');
  };

  return (
    <div className="min-h-screen w-full">
      {/* Header with Auth/User Menu */}
      <header className="sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
            AI PPT
          </div>
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Button
                  onClick={() => setIsHistoryOpen(true)}
                  variant="outline"
                  className="gap-2 rounded-xl border-white/20 bg-white/40 hover:bg-white/60 text-gray-900"
                >
                  <Clock className="h-4 w-4" />
                  <span className="hidden sm:inline">History</span>
                </Button>
                <UserMenu onOpenHistory={() => setIsHistoryOpen(true)} />
              </>
            ) : (
              <Button
                onClick={() => setIsAuthModalOpen(true)}
                className="gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 hover:shadow-lg text-white font-semibold"
              >
                <LogIn className="h-4 w-4" />
                <span className="hidden sm:inline">Sign In</span>
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="relative w-full">
        {/* Hero Section */}
        <HeroSection />

        {/* Generator Card */}
        <div className="py-12 px-4 md:py-16">
          <div className="max-w-2xl mx-auto">
            <GeneratorCard 
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />
          </div>
        </div>

        {/* Presentation Background Style Section */}
        <div className="py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <PresentationBackground
              selectedStyle={selectedBackgroundStyle}
              onSelectStyle={setSelectedBackgroundStyle}
            />
          </div>
        </div>

        {/* Slide Preview Section */}
        {slides.length > 0 && (
          <div className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <SlidePreview 
                slides={slides}
                currentIndex={currentSlideIndex}
                onSlideChange={setCurrentSlideIndex}
                backgroundStyle={selectedBackgroundStyle}
              />
            </div>
          </div>
        )}
      </main>

      {/* Floating Side Actions */}
      <SidePanel 
        onDownload={handleDownload}
        onClear={handleClear}
        hasSlides={slides.length > 0}
      />

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onOpenChange={setIsAuthModalOpen}
        onLogin={async (email, password) => {
          await login(email, password);
          setIsAuthModalOpen(false);
        }}
      />

      {/* History Panel */}
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
