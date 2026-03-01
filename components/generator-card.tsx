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
import { Sparkles, Loader2 } from 'lucide-react';

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
      onGenerate(topic, parseInt(slideCount), tone);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isGenerating && topic.trim()) {
      handleSubmit();
    }
  };

  return (
    <div className="animate-slideIn">
      <div className="glass rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
        <div className="space-y-6">
          {/* Topic Input */}
          <div className="space-y-3">
            <Label htmlFor="topic" className="text-gray-800 font-semibold text-sm">
              Presentation Topic
            </Label>
            <Input
              id="topic"
              placeholder="e.g., Machine Learning Basics, Digital Marketing Strategy..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyPress={handleKeyPress}
              className="bg-white/80 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500/20 h-12 text-base rounded-xl transition-all"
              disabled={isGenerating}
            />
          </div>

          {/* Controls Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Slide Count */}
            <div className="space-y-3">
              <Label htmlFor="slides" className="text-gray-800 font-semibold text-sm">
                Number of Slides
              </Label>
              <Select value={slideCount} onValueChange={setSlideCount} disabled={isGenerating}>
                <SelectTrigger id="slides" className="bg-white/80 border-gray-200 text-gray-900 focus:border-purple-500 focus:ring-purple-500/20 h-11 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  {[3, 5, 7, 10, 15, 20].map((num) => (
                    <SelectItem key={num} value={num.toString()} className="text-gray-900">
                      {num} Slides
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Tone Select */}
            <div className="space-y-3">
              <Label htmlFor="tone" className="text-gray-800 font-semibold text-sm">
                Presentation Tone
              </Label>
              <Select value={tone} onValueChange={setTone} disabled={isGenerating}>
                <SelectTrigger id="tone" className="bg-white/80 border-gray-200 text-gray-900 focus:border-purple-500 focus:ring-purple-500/20 h-11 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  <SelectItem value="formal" className="text-gray-900">Formal</SelectItem>
                  <SelectItem value="creative" className="text-gray-900">Creative</SelectItem>
                  <SelectItem value="academic" className="text-gray-900">Academic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Generate Button */}
          <Button
            onClick={handleSubmit}
            disabled={isGenerating || !topic.trim()}
            className="w-full h-12 text-base font-semibold rounded-xl gradient-button shadow-lg hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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

          {/* Progress bar */}
          {isGenerating && (
            <div className="space-y-2">
              <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 animate-pulse rounded-full" />
              </div>
              <p className="text-center text-sm text-gray-600">Creating your presentation...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
