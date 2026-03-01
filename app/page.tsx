'use client';

import { useState } from 'react';
import HeroSection from '@/components/hero-section';
import GeneratorCard from '@/components/generator-card';
import PresentationBackground from '@/components/presentation-background';
import SlidePreview from '@/components/slide-preview';
import SidePanel from '@/components/side-panel';

export default function Home() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedBackgroundStyle, setSelectedBackgroundStyle] = useState('minimal-light');
  const [slides, setSlides] = useState<string[]>([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const handleGenerate = async (topic: string, slideCount: number, tone: string) => {
    setIsGenerating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const generatedSlides = Array.from(
      { length: slideCount },
      (_, i) => `Slide ${i + 1}: ${topic}\n\nKey Point ${i + 1}\n\nTone: ${tone}`
    );
    setSlides(generatedSlides);
    setCurrentSlideIndex(0);
    setIsGenerating(false);
  };

  const handleDownload = () => {
    // Mock download functionality
    alert('Downloading presentation...');
  };

  const handleClear = () => {
    setSlides([]);
    setCurrentSlideIndex(0);
    setSelectedBackgroundStyle('minimal-light');
  };

  return (
    <div className="min-h-screen w-full">
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
    </div>
  );
}
