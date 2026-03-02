'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface RecentSlide {
  id: string;
  title: string;
  date?: string;
}

interface RecentSlidesProps {
  slides?: RecentSlide[];
}

export default function RecentSlides({ slides }: RecentSlidesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const defaultSlides: RecentSlide[] = [
    {
      id: '1',
      title: "Beginner's Guide to Machine Learning",
      date: '2 days ago',
    },
    {
      id: '2',
      title: 'Social Media Marketing Tomorrow',
      date: '1 week ago',
    },
    {
      id: '3',
      title: 'The Future of Remote Work',
      date: '2 weeks ago',
    },
  ];

  const displaySlides = slides && slides.length > 0 ? slides : defaultSlides;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? displaySlides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === displaySlides.length - 1 ? 0 : prev + 1));
  };

  const getVisibleSlides = () => {
    const visibleCount = 3;
    const slides = [];
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % displaySlides.length;
      slides.push(displaySlides[index]);
    }
    return slides;
  };

  return (
    <div className="animate-slideIn">
      <div className="mb-12">
        <h2 className="font-serif text-3xl font-semibold text-[var(--ink)]">
          Recent Slides
        </h2>
      </div>

      <div className="space-y-8">
        {/* Slides Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {getVisibleSlides().map((slide, idx) => (
            <button
              key={slide.id}
              className="group relative overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-8 text-left transition-all duration-300 hover:shadow-[0_16px_32px_rgba(56,42,26,0.12)] hover:border-[#c8b9a5]"
              style={{
                animation: `slideIn 0.5s ease-out both ${0.1 * idx}s`,
              }}
            >
              {/* Subtle background accent */}
              <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-gradient-to-br from-[rgba(222,212,197,0.3)] to-transparent blur-2xl" />
              
              <div className="relative z-10">
                <h3 className="font-serif text-lg font-semibold text-[var(--ink)] leading-tight group-hover:text-[#2a2622] transition-colors">
                  {slide.title}
                </h3>
                {slide.date && (
                  <p className="mt-4 text-sm text-[var(--ink-soft)] font-medium">{slide.date}</p>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-8">
          {/* Navigation Dots */}
          <div className="flex gap-2">
            {displaySlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'h-2 w-6 bg-[var(--ink)]'
                    : 'h-2 w-2 bg-[var(--line)] hover:bg-[var(--ink-soft)]'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="hidden sm:flex gap-3">
            <Button
              onClick={handlePrev}
              variant="ghost"
              size="sm"
              className="h-9 w-9 rounded-full p-0 text-[var(--ink-soft)] hover:bg-[#ddd2c4] hover:text-[var(--ink)] transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              onClick={handleNext}
              variant="ghost"
              size="sm"
              className="h-9 w-9 rounded-full p-0 text-[var(--ink-soft)] hover:bg-[#ddd2c4] hover:text-[var(--ink)] transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
