'use client';

interface BackgroundStyle {
  id: string;
  name: string;
  description: string;
}

interface PresentationBackgroundProps {
  selectedStyle: string;
  onSelectStyle: (id: string) => void;
}

const backgroundStyles: BackgroundStyle[] = [
  {
    id: 'minimal-light',
    name: 'Minimal Light',
    description: 'Soft off-white gradient with thin purple top bar',
  },
  {
    id: 'corporate-blue',
    name: 'Corporate Blue',
    description: 'Light background with blue side panel for professional look',
  },
  {
    id: 'gradient-modern',
    name: 'Gradient Modern',
    description: 'Purple to cyan gradient with abstract soft shapes',
  },
  {
    id: 'elegant-academic',
    name: 'Elegant Academic',
    description: 'Cream background with navy border frame',
  },
];

export default function PresentationBackground({
  selectedStyle,
  onSelectStyle,
}: PresentationBackgroundProps) {
  return (
    <div className="animate-slideIn">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Presentation Background Style
        </h2>
        <p className="text-gray-600">
          Choose the background design for your generated PowerPoint slides
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {backgroundStyles.map((style) => (
          <button
            key={style.id}
            onClick={() => onSelectStyle(style.id)}
            className={`group relative card-lift rounded-2xl overflow-hidden transition-all duration-300 ${
              selectedStyle === style.id
                ? 'ring-2 ring-purple-500 shadow-xl shadow-purple-500/20'
                : 'ring-1 ring-gray-200 hover:ring-purple-300'
            }`}
          >
            {/* Slide Preview Background */}
            <div
              className={`relative h-48 w-full overflow-hidden ${
                style.id === 'minimal-light'
                  ? 'bg-gradient-to-br from-gray-50 to-gray-100'
                  : style.id === 'corporate-blue'
                    ? 'bg-gradient-to-r from-blue-50 to-white'
                    : style.id === 'gradient-modern'
                      ? 'bg-gradient-to-br from-purple-400 via-cyan-300 to-cyan-200'
                      : 'bg-yellow-50'
              }`}
            >
              {/* Minimal Light - Purple top bar */}
              {style.id === 'minimal-light' && (
                <div className="h-1 bg-purple-500" />
              )}

              {/* Corporate Blue - Side panel */}
              {style.id === 'corporate-blue' && (
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-blue-500" />
              )}

              {/* Gradient Modern - Abstract shapes */}
              {style.id === 'gradient-modern' && (
                <>
                  <div className="absolute -top-16 -left-16 w-32 h-32 bg-white/20 rounded-full blur-2xl" />
                  <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-white/15 rounded-full blur-xl" />
                </>
              )}

              {/* Elegant Academic - Navy border frame */}
              {style.id === 'elegant-academic' && (
                <div className="absolute inset-0 border-4 border-blue-900/30" />
              )}

              {/* Slide content preview */}
              <div className="absolute inset-0 flex flex-col justify-center items-start p-6">
                <div
                  className={`text-lg font-serif font-bold mb-3 ${
                    style.id === 'elegant-academic'
                      ? 'text-blue-900'
                      : 'text-gray-700'
                  }`}
                >
                  {style.name}
                </div>
                <div className="space-y-2">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className={`h-2 rounded ${
                        style.id === 'corporate-blue'
                          ? 'bg-blue-400'
                          : style.id === 'gradient-modern'
                            ? 'bg-white/60'
                            : 'bg-gray-400'
                      }`}
                      style={{
                        width: i === 1 ? '80%' : '60%',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Selection Badge */}
            {selectedStyle === style.id && (
              <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                Selected
              </div>
            )}

            {/* Description */}
            <div className="p-4 bg-white">
              <h3 className="font-semibold text-gray-900 text-sm mb-2">
                {style.name}
              </h3>
              <p className="text-xs text-gray-600 line-clamp-2">
                {style.description}
              </p>
            </div>

            {/* Hover glow effect */}
            <div className="absolute inset-0 pointer-events-none rounded-2xl hover-glow" />
          </button>
        ))}
      </div>
    </div>
  );
}
