'use client';

import { Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="pt-20 md:pt-32 pb-16 px-4 text-center">
      {/* Badge */}
      <div className="flex justify-center mb-8 animate-fadeIn">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass shadow-lg">
          <Sparkles size={16} className="text-purple-600" />
          <span className="text-sm font-semibold text-gray-700">AI PPT Maker</span>
        </div>
      </div>

      {/* Main Heading */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900 animate-fadeIn text-balance" style={{ animationDelay: '0.1s' }}>
        AI Powered <span className="bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent">PPT Generator</span>
      </h1>

      {/* Subtitle */}
      <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto animate-fadeIn text-balance" style={{ animationDelay: '0.2s' }}>
        Create beautiful presentations in seconds. Just describe your idea, and let AI do the magic.
      </p>

      {/* Decorative dots */}
      <div className="flex justify-center gap-2 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
        <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-purple-600 to-purple-400" />
        <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400" />
        <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-purple-600 to-purple-400" />
      </div>
    </div>
  );
}
