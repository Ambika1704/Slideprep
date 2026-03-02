'use client';

export default function HeroSection() {
  return (
    <section className="mx-auto max-w-3xl text-center animate-fadeIn">
      <h1 className="font-serif text-4xl leading-[1.1] tracking-[-0.01em] text-[var(--ink)] sm:text-5xl">
        AI-Powered Presentation Builder
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-[var(--ink-soft)] sm:text-xl">
        Create beautiful presentations in seconds. Just describe your idea, and let our AI do the work.
      </p>
      <div className="mt-8">
        <span className="inline-flex h-10 items-center rounded-full border border-[var(--line)] bg-[#f5f2ed] px-6 text-base font-semibold text-[var(--ink-soft)] shadow-[0_6px_18px_rgba(56,42,26,0.08)]">
          AI Slide Maker
        </span>
      </div>
    </section>
  );
}
