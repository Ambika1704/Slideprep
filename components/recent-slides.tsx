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
    },
    {
      id: '2',
      title: 'Social Media Marketing Tomorrow',
    },
    {
      id: '3',
      title: 'The Future of Remote Work',
    },
  ];

  const displaySlides = slides && slides.length > 0 ? slides : defaultSlides;
  const itemsPerPage = 3;
  const totalPages = Math.ceil(displaySlides.length / itemsPerPage);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  const handleNext = () => {
    if (currentIndex + itemsPerPage < displaySlides.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const getVisibleSlides = () => {
    return displaySlides.slice(currentIndex, currentIndex + itemsPerPage);
  };

  const currentPage = Math.floor(currentIndex / itemsPerPage);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[var(--ink)]">Recent Slides</h2>

      {/* Slides Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {getVisibleSlides().map((slide) => (
          <button
            key={slide.id}
            className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-6 text-left transition-all hover:shadow-md hover:border-[#c8b9a5]"
          >
            <h3 className="text-base font-semibold text-[var(--ink)] line-clamp-2">
              {slide.title}
            </h3>
            {slide.date && (
              <p className="mt-3 text-sm text-[var(--ink-soft)]">{slide.date}</p>
            )}
          </button>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4">
        <div className="flex gap-1.5">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * itemsPerPage)}
              className={`rounded-full transition-all ${
                index === currentPage
                  ? 'h-1.5 w-5 bg-[var(--ink)]'
                  : 'h-1.5 w-1.5 bg-[var(--line)] hover:bg-[var(--ink-soft)]'
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>

        <div className="hidden gap-2 sm:flex">
          <Button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            variant="ghost"
            size="sm"
            className="h-8 w-8 rounded-full p-0 text-[var(--ink-soft)] hover:bg-[#f5f3ef] disabled:opacity-30"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentIndex + itemsPerPage >= displaySlides.length}
            variant="ghost"
            size="sm"
            className="h-8 w-8 rounded-full p-0 text-[var(--ink-soft)] hover:bg-[#f5f3ef] disabled:opacity-30"
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
