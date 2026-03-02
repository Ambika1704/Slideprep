'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Sparkles } from 'lucide-react';

interface GeneratorCardProps {
  onGenerate: (topic: string, slideCount: number, tone: string) => void;
  isGenerating: boolean;
}

export default function GeneratorCard({ onGenerate, isGenerating }: GeneratorCardProps) {
  const [topic, setTopic] = useState('');
  const [slideCount, setSlideCount] = useState('5');
  const [tone, setTone] = useState('formal');

  const handleSubmit = () => {
    if (topic.trim()) {
      onGenerate(topic, parseInt(slideCount, 10), tone);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isGenerating && topic.trim()) {
      handleSubmit();
    }
  };

  return (
    <div className="animate-slideIn">
      <div className="overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--panel)] shadow-[0_20px_48px_rgba(63,46,24,0.1)] backdrop-blur-sm">
        <div className="relative p-8 sm:p-10">
          {/* Subtle background gradient accent */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-gradient-to-br from-[rgba(222,212,197,0.2)] to-transparent blur-3xl" />
          </div>

          <div className="relative space-y-8">
            <div className="space-y-4">
              <Label htmlFor="topic" className="text-2xl font-semibold text-[var(--ink)]">
                Presentation Topic
              </Label>
              <Input
                id="topic"
                placeholder="e.g., Machine Learning Basics, Digital Marketing Strategy..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={handleKeyDown}
                className="h-14 rounded-2xl border border-[var(--line)] bg-[var(--paper)] px-5 text-base text-[var(--ink)] placeholder:text-[#a29a90] focus-visible:ring-1 focus-visible:ring-[#c8b9a5] transition-all hover:border-[#c8b9a5]"
                disabled={isGenerating}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="sm:col-span-2" />
              <div className="flex justify-end">
                <Button
                  onClick={handleSubmit}
                  disabled={isGenerating || !topic.trim()}
                  className="h-12 w-full rounded-xl bg-[#ddd2c4] text-base font-semibold text-[var(--ink)] hover:bg-[#d2c3b0] disabled:opacity-50 transition-colors shadow-[0_8px_16px_rgba(56,42,26,0.12)]"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Slides
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
