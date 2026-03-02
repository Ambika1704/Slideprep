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
      <div className="rounded-3xl border border-[var(--line)] bg-[var(--panel)] p-8 sm:p-10">
        <div className="space-y-8">
          {/* Topic Input */}
          <div className="space-y-4">
            <Label htmlFor="topic" className="text-xl font-semibold text-[var(--ink)]">
              Presentation Topic
            </Label>
            <Input
              id="topic"
              placeholder="e.g., Machine Learning Basics, Digital Marketing Strategy..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={handleKeyDown}
              className="h-12 rounded-2xl border border-[var(--line)] bg-[var(--paper)] px-5 text-base text-[var(--ink)] placeholder:text-[#a29a90] focus-visible:ring-0 focus-visible:border-[#c8b9a5]"
              disabled={isGenerating}
            />
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div className="space-y-3">
              <Label htmlFor="slides" className="text-lg font-semibold text-[var(--ink)]">
                Number of Slides
              </Label>
              <Select value={slideCount} onValueChange={setSlideCount} disabled={isGenerating}>
                <SelectTrigger
                  id="slides"
                  className="h-11 rounded-2xl border border-[var(--line)] bg-[var(--paper)] px-4 text-base text-[var(--ink)] focus:ring-0"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border border-[var(--line)] bg-[var(--paper)] text-[var(--ink)]">
                  {[3, 5, 7, 10, 15, 20].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} Slides
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="tone" className="text-lg font-semibold text-[var(--ink)]">
                Presentation Tone
              </Label>
              <Select value={tone} onValueChange={setTone} disabled={isGenerating}>
                <SelectTrigger
                  id="tone"
                  className="h-11 rounded-2xl border border-[var(--line)] bg-[var(--paper)] px-4 text-base text-[var(--ink)] focus:ring-0"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border border-[var(--line)] bg-[var(--paper)] text-[var(--ink)]">
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="creative">Creative</SelectItem>
                  <SelectItem value="academic">Academic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Generate Button */}
          <Button
            onClick={handleSubmit}
            disabled={isGenerating || !topic.trim()}
            className="h-14 w-full rounded-2xl bg-[#ddd2c4] text-lg font-medium text-[var(--ink)] hover:bg-[#d2c3b0] disabled:opacity-50 transition-colors"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-3 h-5 w-5" />
                Generate PPT
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
