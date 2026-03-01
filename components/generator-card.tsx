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
      <div className="rounded-[26px] border border-[var(--line)] bg-[var(--panel)] p-6 shadow-[0_18px_40px_rgba(63,46,24,0.08)] sm:p-8">
        <div className="space-y-8">
          <div className="space-y-3">
            <Label htmlFor="topic" className="text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
              Presentation Topic
            </Label>
            <Input
              id="topic"
              placeholder="e.g., Machine Learning Basics, Digital Marketing Strategy..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={handleKeyDown}
              className="h-14 rounded-2xl border-[var(--line)] bg-[var(--paper)] px-5 text-base text-[var(--ink-soft)] placeholder:text-[#a29a90] focus-visible:ring-0"
              disabled={isGenerating}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <Label htmlFor="slides" className="text-lg font-semibold text-[var(--ink)] sm:text-xl">
                Number of Slides
              </Label>
              <Select value={slideCount} onValueChange={setSlideCount} disabled={isGenerating}>
                <SelectTrigger
                  id="slides"
                  className="h-11 rounded-2xl border-[var(--line)] bg-[var(--paper)] px-4 text-base text-[var(--ink)] focus:ring-0"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-[var(--line)] bg-[var(--paper)] text-[var(--ink)]">
                  {[3, 5, 7, 10, 15, 20].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} Slides
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="tone" className="text-lg font-semibold text-[var(--ink)] sm:text-xl">
                Presentation Tone
              </Label>
              <Select value={tone} onValueChange={setTone} disabled={isGenerating}>
                <SelectTrigger
                  id="tone"
                  className="h-11 rounded-2xl border-[var(--line)] bg-[var(--paper)] px-4 text-base text-[var(--ink)] focus:ring-0"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-[var(--line)] bg-[var(--paper)] text-[var(--ink)]">
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="creative">Creative</SelectItem>
                  <SelectItem value="academic">Academic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={isGenerating || !topic.trim()}
            className="h-14 w-full rounded-2xl bg-[#ddd2c4] text-xl font-semibold text-[var(--ink)] hover:bg-[#d2c3b0] disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Generate PPT
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
