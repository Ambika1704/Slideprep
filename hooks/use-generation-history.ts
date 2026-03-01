'use client';

import { useState, useCallback, useEffect } from 'react';

export interface GenerationRecord {
  id: string;
  topic: string;
  slideCount: number;
  tone: string;
  slides: string[];
  backgroundStyle: string;
  timestamp: number;
  createdAt: string;
}

export function useGenerationHistory() {
  const [history, setHistory] = useState<GenerationRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load history from localStorage on mount
  useEffect(() => {
    const storedHistory = localStorage.getItem('generationHistory');
    if (storedHistory) {
      try {
        setHistory(JSON.parse(storedHistory));
      } catch (error) {
        console.error('Failed to load history:', error);
      }
    }
    setIsLoading(false);
  }, []);

  // Save to localStorage whenever history changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('generationHistory', JSON.stringify(history));
    }
  }, [history, isLoading]);

  const addToHistory = useCallback((
    topic: string,
    slideCount: number,
    tone: string,
    slides: string[],
    backgroundStyle: string
  ) => {
    const newRecord: GenerationRecord = {
      id: Math.random().toString(36).substring(7),
      topic,
      slideCount,
      tone,
      slides,
      backgroundStyle,
      timestamp: Date.now(),
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setHistory(prev => [newRecord, ...prev].slice(0, 50)); // Keep last 50
  }, []);

  const removeFromHistory = useCallback((id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem('generationHistory');
  }, []);

  return {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory,
    isLoading,
  };
}
