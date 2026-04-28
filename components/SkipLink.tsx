'use client';

export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="absolute start-3 top-3 z-[90] -translate-y-20 focus:translate-y-0 transition-transform rounded-full bg-brand-700 text-white px-4 py-2 text-sm shadow-soft"
    >
      Skip to content
    </a>
  );
}
