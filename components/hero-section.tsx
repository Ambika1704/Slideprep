'use client';

export default function HeroSection() {
  return (
    <section className="mx-auto max-w-3xl text-center animate-fadeIn">
      <h1 className="font-sans text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl">
        AI-Powered Presentation Builder
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-slate-300 sm:text-2xl">
        Create beautiful presentations in seconds. Just describe your idea, and let our AI do the work.
      </p>
      <div className="mt-10">
        <span className="inline-flex h-11 items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-6 text-base font-semibold text-purple-200 shadow-lg shadow-purple-500/20">
          AI Slide Maker
        </span>
      </div>
    </section>
  );
}
