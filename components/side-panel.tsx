'use client';

import { Download, Trash2 } from 'lucide-react';

interface SidePanelProps {
  onDownload: () => void;
  onClear: () => void;
  hasSlides: boolean;
}

export default function SidePanel({
  onDownload,
  onClear,
  hasSlides,
}: SidePanelProps) {
  return (
    <div className="fixed right-4 bottom-8 flex flex-col gap-4 z-20">
      {/* Download Button */}
      {hasSlides && (
        <button
          onClick={onDownload}
          className="group relative flex items-center justify-center p-4 rounded-full gradient-button shadow-xl hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-110 animate-float"
          title="Download PPT"
        >
          <Download size={24} />
          
          {/* Tooltip */}
          <div className="absolute right-full mr-4 px-3 py-2 rounded-lg glass text-gray-900 text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Download PPT
          </div>
        </button>
      )}

      {/* Clear Button */}
      {hasSlides && (
        <button
          onClick={onClear}
          className="group relative flex items-center justify-center p-4 rounded-full bg-red-500 text-white shadow-lg hover:shadow-xl hover:shadow-red-500/40 transition-all duration-300 hover:scale-110"
          title="Clear Project"
        >
          <Trash2 size={24} />
          
          {/* Tooltip */}
          <div className="absolute right-full mr-4 px-3 py-2 rounded-lg glass text-gray-900 text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Clear Project
          </div>
        </button>
      )}

      {/* Floating indicator when no slides */}
      {!hasSlides && (
        <div className="flex flex-col items-center gap-2 text-gray-500 px-2">
          <div className="w-10 h-10 rounded-full glass flex items-center justify-center animate-pulse">
            <span className="text-lg">↓</span>
          </div>
          <span className="text-xs font-medium text-center">Generate slides</span>
        </div>
      )}
    </div>
  );
}

