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
      <div className="mb-8">
        <h2 className="font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
          Recent Slides
        </h2>
      </div>

      <div className="flex items-center justify-between gap-4">
        {/* Slides Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
          {getVisibleSlides().map((slide) => (
            <button
              key={slide.id}
              className="group relative rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-6 text-left transition-all duration-300 hover:shadow-[0_12px_24px_rgba(56,42,26,0.08)] hover:border-[var(--ink-soft)]"
            >
              <h3 className="font-serif text-base font-semibold text-[var(--ink)] line-clamp-3 group-hover:text-[#2a2622]">
                {slide.title}
              </h3>
              {slide.date && (
                <p className="mt-3 text-sm text-[var(--ink-soft)]">{slide.date}</p>
              )}
            </button>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex flex-col items-center gap-4 md:gap-6">
          <div className="flex gap-1.5">
            {displaySlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-6 bg-[var(--ink)]'
                    : 'w-1.5 bg-[var(--line)] hover:bg-[var(--ink-soft)]'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="hidden sm:flex flex-col gap-2">
            <Button
              onClick={handlePrev}
              variant="ghost"
              size="sm"
              className="h-8 w-8 rounded-full p-0 text-[var(--ink-soft)] hover:bg-[var(--paper-2)] hover:text-[var(--ink)]"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              onClick={handleNext}
              variant="ghost"
              size="sm"
              className="h-8 w-8 rounded-full p-0 text-[var(--ink-soft)] hover:bg-[var(--paper-2)] hover:text-[var(--ink)]"
              aria-label="Next slide"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
