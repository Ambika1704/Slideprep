'use client';

interface SlidePreviewProps {
  slides: string[];
  currentIndex: number;
  onSlideChange: (index: number) => void;
  backgroundStyle?: string;
}

export default function SlidePreview({
  slides,
  currentIndex,
  onSlideChange,
  backgroundStyle = 'minimal-light',
}: SlidePreviewProps) {
  return (
    <div className="animate-slideIn">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Your Presentation
        </h2>
        <p className="text-gray-600">
          {slides.length} slides generated
        </p>
      </div>

      <div className="space-y-8">
        {/* Main Slide Display */}
        <div className="flex justify-center">
          <div className={`relative w-full max-w-3xl aspect-video rounded-2xl shadow-2xl p-8 md:p-12 flex flex-col justify-between transition-all duration-500 ${
            backgroundStyle === 'minimal-light'
              ? 'glass'
              : backgroundStyle === 'corporate-blue'
                ? 'bg-gradient-to-r from-blue-50 to-white'
                : backgroundStyle === 'gradient-modern'
                  ? 'bg-gradient-to-br from-purple-400 via-cyan-300 to-cyan-200'
                  : 'bg-yellow-50'
          }`}>
            {/* Minimal Light - Purple top bar */}
            {backgroundStyle === 'minimal-light' && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-purple-500" />
            )}

            {/* Corporate Blue - Side panel */}
            {backgroundStyle === 'corporate-blue' && (
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-blue-500 rounded-l-2xl" />
            )}

            {/* Gradient Modern - Abstract shapes */}
            {backgroundStyle === 'gradient-modern' && (
              <>
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-white/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-white/15 rounded-full blur-2xl" />
              </>
            )}

            {/* Elegant Academic - Navy border frame */}
            {backgroundStyle === 'elegant-academic' && (
              <div className="absolute inset-0 border-4 border-blue-900/30 rounded-2xl pointer-events-none" />
            )}

            {/* Slide Number Badge */}
            <div className="absolute top-4 right-4 gradient-button px-4 py-2 rounded-lg text-white text-sm font-semibold z-10">
              {currentIndex + 1} / {slides.length}
            </div>

            {/* Slide Content */}
            <div className={`space-y-6 relative z-5 ${backgroundStyle === 'corporate-blue' ? 'ml-12' : ''}`}>
              <h1 className={`text-3xl md:text-4xl font-bold text-balance ${
                backgroundStyle === 'elegant-academic'
                  ? 'text-blue-900 font-serif'
                  : backgroundStyle === 'gradient-modern'
                    ? 'text-white'
                    : 'text-gray-900'
              }`}>
                {slides[currentIndex].split('\n')[0]}
              </h1>

              <div className="space-y-3">
                {slides[currentIndex].split('\n').slice(1).map((line, idx) => (
                  <p key={idx} className={`text-base md:text-lg ${
                    backgroundStyle === 'gradient-modern'
                      ? 'text-white/90'
                      : backgroundStyle === 'elegant-academic'
                        ? 'text-blue-900/80'
                        : 'text-gray-700'
                  }`}>
                    {line}
                  </p>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className={`flex items-center justify-between relative z-5 ${
              backgroundStyle === 'gradient-modern' ? 'text-white/70' : ''
            }`}>
              <div className={`text-sm ${
                backgroundStyle === 'gradient-modern'
                  ? 'text-white/70'
                  : backgroundStyle === 'elegant-academic'
                    ? 'text-blue-900/60'
                    : 'text-gray-500'
              }`}>
                AI PPT Maker
              </div>
              <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i === 0
                        ? 'bg-gradient-to-r from-purple-600 to-cyan-500 w-8'
                        : backgroundStyle === 'gradient-modern'
                          ? 'bg-white/40 w-2'
                          : 'bg-gray-300 w-2'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Preview */}
        <div className="overflow-x-auto pb-4 scroll-smooth">
          <div className="flex gap-4 min-w-full px-4">
            {slides.map((slide, index) => (
              <button
                key={index}
                onClick={() => onSlideChange(index)}
                className={`flex-shrink-0 w-40 h-28 rounded-xl border-2 transition-all duration-300 p-4 flex flex-col justify-between text-left ${
                  currentIndex === index
                    ? 'glass border-purple-500 shadow-lg shadow-purple-500/30'
                    : 'glass border-gray-200 hover:border-purple-300 hover:shadow-lg'
                }`}
              >
                <div className="text-xs font-semibold text-purple-600">
                  Slide {index + 1}
                </div>
                <div className="text-sm text-gray-700 font-medium truncate">
                  {slide.split('\n')[0]}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Indicators */}
        <div className="flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => onSlideChange(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-500 w-8'
                  : 'bg-gray-300 w-2 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

