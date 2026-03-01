'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash2, RefreshCw } from 'lucide-react';
import { GenerationRecord } from '@/hooks/use-generation-history';

interface HistoryPanelProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  history: GenerationRecord[];
  onSelectHistory: (record: GenerationRecord) => void;
  onRemove: (id: string) => void;
  onClearAll: () => void;
}

export default function HistoryPanel({
  isOpen,
  onOpenChange,
  history,
  onSelectHistory,
  onRemove,
  onClearAll,
}: HistoryPanelProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:w-96 glass border-white/20 p-0">
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-white/10">
          <SheetTitle className="text-gray-900">Generation History</SheetTitle>
          <SheetDescription className="text-gray-600">
            Your past presentations ({history.length})
          </SheetDescription>
        </SheetHeader>

        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] px-6 text-center">
            <div className="text-gray-400 mb-3">📋</div>
            <p className="text-gray-600 font-medium">No history yet</p>
            <p className="text-sm text-gray-500 mt-1">
              Generate presentations to see them here
            </p>
          </div>
        ) : (
          <>
            <ScrollArea className="h-[calc(100vh-180px)] px-6 py-4">
              <div className="space-y-3">
                {history.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectHistory(item);
                      onOpenChange(false);
                    }}
                    className="w-full text-left p-4 rounded-xl bg-white/40 hover:bg-white/60 transition-colors border border-white/20 hover:border-purple-300/50 group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 truncate text-sm group-hover:text-purple-600 transition-colors">
                          {item.topic}
                        </h4>
                        <div className="flex items-center gap-2 mt-2 text-xs text-gray-600 flex-wrap">
                          <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                            {item.slideCount} slides
                          </span>
                          <span className="capitalize bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded-full">
                            {item.tone}
                          </span>
                          <span className="text-gray-500">{item.createdAt}</span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemove(item.id);
                        }}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1.5 hover:bg-red-50 rounded-lg flex-shrink-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>

            <div className="px-6 py-4 border-t border-white/10">
              <Button
                onClick={onClearAll}
                variant="outline"
                className="w-full text-red-600 hover:bg-red-50 border-red-200"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All History
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
