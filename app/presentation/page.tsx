'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, X, Maximize2, Minimize2, Languages, Home,
  Sparkles, ShieldCheck, Wrench, MessageCircle, Smartphone, Code2, TrendingUp,
  Award, Layers, Globe2, Check, Star
} from 'lucide-react';
import { slides, type Slide } from '@/data/presentation';
import { useI18n } from '@/lib/i18n';
import { cn } from '@/lib/utils';

export default function PresentationPage() {
  const { locale, toggle } = useI18n();
  const [i, setI] = useState(0);
  const [fs, setFs] = useState(false);
  const total = slides.length;
  const slide = slides[i];

  const next = useCallback(() => setI((x) => Math.min(total - 1, x + 1)), [total]);
  const prev = useCallback(() => setI((x) => Math.max(0, x - 1)), []);
  const go = useCallback((idx: number) => setI(Math.max(0, Math.min(total - 1, idx))), [total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); next(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
      else if (e.key === 'Home') { e.preventDefault(); go(0); }
      else if (e.key === 'End') { e.preventDefault(); go(total - 1); }
      else if (e.key.toLowerCase() === 'f') toggleFs();
      else if (e.key.toLowerCase() === 'l') toggle();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, go, total, toggle]);

  const toggleFs = () => {
    if (typeof document === 'undefined') return;
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().then(() => setFs(true)).catch(() => {});
    } else {
      document.exitFullscreen?.().then(() => setFs(false)).catch(() => {});
    }
  };

  const progress = ((i + 1) / total) * 100;

  return (
    <div className="fixed inset-0 z-[60] bg-[rgb(var(--bg))] flex flex-col" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Top bar */}
      <header className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b border-[rgb(var(--border))] bg-[rgb(var(--bg))]/80 backdrop-blur z-10">
        <div className="flex items-center gap-2">
          <Link href="/" aria-label="Home" className="btn-ghost p-2"><Home className="h-4 w-4" /></Link>
          <span className="text-xs uppercase tracking-wider text-[rgb(var(--muted))] hidden sm:inline">
            {locale === 'ar' ? 'عرض المنتج' : 'Pitch deck'}
          </span>
          <span className="text-xs font-medium tabular-nums">{i + 1} <span className="text-[rgb(var(--muted))]">/ {total}</span></span>
        </div>
        <div className="hidden md:flex flex-1 items-center justify-center gap-1.5 max-w-md">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => go(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={cn(
                'h-1.5 rounded-full transition-all',
                idx === i ? 'w-8 bg-accent-500' : idx < i ? 'w-3 bg-brand-600/60' : 'w-3 bg-[rgb(var(--border))] hover:bg-[rgb(var(--muted))]'
              )}
            />
          ))}
        </div>
        <div className="flex items-center gap-1">
          <button onClick={toggle} aria-label="Switch language" className="btn-ghost gap-1.5 p-2 text-xs font-semibold uppercase tracking-wider">
            <Languages className="h-4 w-4" /> {locale === 'ar' ? 'EN' : 'AR'}
          </button>
          <button onClick={toggleFs} aria-label="Toggle fullscreen" className="btn-ghost p-2 hidden sm:inline-flex">
            {fs ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
          <Link href="/" aria-label="Close" className="btn-ghost p-2">
            <X className="h-4 w-4" />
          </Link>
        </div>
      </header>

      {/* Mobile progress */}
      <div className="md:hidden h-1 bg-[rgb(var(--border))]">
        <div className="h-full bg-accent-500 transition-all" style={{ width: `${progress}%` }} />
      </div>

      {/* Slide */}
      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id + locale}
            initial={{ opacity: 0, x: locale === 'ar' ? -40 : 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: locale === 'ar' ? 40 : -40 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 overflow-y-auto"
          >
            <SlideRenderer slide={slide} index={i} />
          </motion.div>
        </AnimatePresence>

        {/* Side controls */}
        <button
          onClick={prev}
          disabled={i === 0}
          aria-label="Previous slide"
          className="absolute start-3 sm:start-6 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-white/80 dark:bg-white/10 backdrop-blur shadow-soft hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-5 w-5 rtl-flip" />
        </button>
        <button
          onClick={next}
          disabled={i === total - 1}
          aria-label="Next slide"
          className="absolute end-3 sm:end-6 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-accent-500 text-white shadow-soft hover:bg-accent-600 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight className="h-5 w-5 rtl-flip" />
        </button>
      </div>

      {/* Footer hint */}
      <footer className="hidden sm:flex items-center justify-center gap-3 text-[10px] uppercase tracking-wider text-[rgb(var(--muted))] py-2 border-t border-[rgb(var(--border))]">
        <kbd className="rounded border border-[rgb(var(--border))] px-1.5 py-0.5">←</kbd>
        <kbd className="rounded border border-[rgb(var(--border))] px-1.5 py-0.5">→</kbd>
        navigate
        <span>·</span>
        <kbd className="rounded border border-[rgb(var(--border))] px-1.5 py-0.5">L</kbd> language
        <span>·</span>
        <kbd className="rounded border border-[rgb(var(--border))] px-1.5 py-0.5">F</kbd> fullscreen
      </footer>
    </div>
  );
}

function SlideRenderer({ slide, index }: { slide: Slide; index: number }) {
  switch (slide.kind) {
    case 'cover':    return <CoverSlide slide={slide} />;
    case 'split':    return <SplitSlide slide={slide} index={index} />;
    case 'centered': return <CenteredSlide slide={slide} />;
    case 'stats':    return <StatsSlide slide={slide} />;
    case 'list':     return <ListSlide slide={slide} />;
    case 'phases':   return <PhasesSlide slide={slide} />;
    case 'pricing':  return <PricingSlide slide={slide} />;
    case 'closing':  return <ClosingSlide slide={slide} />;
  }
}

function useLang() { return useI18n().locale; }

function CoverSlide({ slide }: { slide: Slide }) {
  const locale = useLang();
  return (
    <section className="relative h-full min-h-[80vh] flex items-end p-6 sm:p-12">
      {slide.image && (
        <Image src={slide.image} alt="" fill priority sizes="100vw" className="object-cover" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/70 to-transparent" />
      <div aria-hidden className="absolute inset-0 bg-hero-glow opacity-60 mix-blend-overlay" />
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative max-w-3xl text-white"
      >
        {slide.eyebrow && <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-xs uppercase tracking-[0.2em]"><Sparkles className="h-3 w-3" />{slide.eyebrow[locale]}</span>}
        <h1 className="mt-6 text-5xl sm:text-7xl font-display font-semibold tracking-tight text-balance">{slide.title[locale]}</h1>
        {slide.subtitle && <p className="mt-5 text-lg sm:text-2xl text-white/85 max-w-2xl text-pretty">{slide.subtitle[locale]}</p>}
        {slide.body && <p className="mt-6 text-sm text-white/70">{slide.body[locale]}</p>}
      </motion.div>
    </section>
  );
}

function SplitSlide({ slide, index }: { slide: Slide; index: number }) {
  const locale = useLang();
  const reverse = index % 2 === 0;
  return (
    <section className="container-app py-10 sm:py-16 grid gap-10 lg:grid-cols-2 lg:items-center min-h-[80vh]">
      <motion.div
        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
        className={cn(reverse ? 'lg:order-1' : 'lg:order-2')}
      >
        {slide.eyebrow && <span className="chip mb-4">{slide.eyebrow[locale]}</span>}
        <h2 className="heading-1 text-balance">{slide.title[locale]}</h2>
        {slide.body && <p className="lead mt-5 text-pretty">{slide.body[locale]}</p>}
        {slide.bullets && (
          <ul className="mt-7 space-y-3">
            {slide.bullets.map((b, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.06 }}
                className="flex items-start gap-3"
              >
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-success/15 text-success mt-0.5">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="text-base">{b[locale]}</span>
              </motion.li>
            ))}
          </ul>
        )}
      </motion.div>
      {slide.image && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.15 }}
          className={cn('relative aspect-[4/3] overflow-hidden rounded-3xl shadow-soft', reverse ? 'lg:order-2' : 'lg:order-1')}
        >
          <Image src={slide.image} alt="" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-900/30 to-transparent" />
        </motion.div>
      )}
    </section>
  );
}

function CenteredSlide({ slide }: { slide: Slide }) {
  const locale = useLang();
  return (
    <section className="container-app py-12 sm:py-20 flex flex-col items-center text-center min-h-[80vh] justify-center">
      {slide.eyebrow && <span className="chip mb-5">{slide.eyebrow[locale]}</span>}
      <motion.h2 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="heading-1 max-w-4xl text-balance">
        {slide.title[locale]}
      </motion.h2>
      {slide.subtitle && (
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lead mt-6 max-w-2xl text-pretty">
          {slide.subtitle[locale]}
        </motion.p>
      )}
      {slide.bullets && (
        <ul className="mt-10 grid gap-3 sm:grid-cols-3 max-w-4xl w-full">
          {slide.bullets.map((b, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.06 }}
              className="card p-5 text-start text-sm"
            >
              <Check className="h-4 w-4 text-accent-500 mb-2" />
              {b[locale]}
            </motion.li>
          ))}
        </ul>
      )}
    </section>
  );
}

function StatsSlide({ slide }: { slide: Slide }) {
  const locale = useLang();
  return (
    <section className="container-app py-12 sm:py-20 min-h-[80vh] flex flex-col justify-center">
      {slide.eyebrow && <span className="chip mb-4">{slide.eyebrow[locale]}</span>}
      <h2 className="heading-1 max-w-3xl text-balance">{slide.title[locale]}</h2>
      {slide.subtitle && <p className="lead mt-5 max-w-2xl text-pretty">{slide.subtitle[locale]}</p>}
      {slide.stats && (
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {slide.stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.08 }}
              className="card p-6 relative overflow-hidden"
            >
              <div aria-hidden className="absolute -top-10 -end-8 h-32 w-32 rounded-full bg-accent-500/10 blur-2xl" />
              <div className="relative">
                <div className="text-4xl sm:text-5xl font-display font-semibold tracking-tight text-brand-700 dark:text-brand-100">{s.value}</div>
                <div className="text-xs uppercase tracking-wider text-[rgb(var(--muted))] mt-2">{s.label[locale]}</div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}

function ListSlide({ slide }: { slide: Slide }) {
  const locale = useLang();
  return (
    <section className="container-app py-12 sm:py-16 min-h-[80vh]">
      {slide.eyebrow && <span className="chip mb-4">{slide.eyebrow[locale]}</span>}
      <h2 className="heading-1 max-w-3xl text-balance">{slide.title[locale]}</h2>
      {slide.subtitle && <p className="lead mt-4 max-w-2xl text-pretty">{slide.subtitle[locale]}</p>}
      {slide.bullets && (
        <ul className="mt-10 grid gap-3 sm:grid-cols-2">
          {slide.bullets.map((b, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + i * 0.04 }}
              className="card p-4 flex items-start gap-3"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-accent-500/15 text-accent-600 text-xs font-bold">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-sm leading-relaxed">{b[locale]}</span>
            </motion.li>
          ))}
        </ul>
      )}
    </section>
  );
}

function PhasesSlide({ slide }: { slide: Slide }) {
  const locale = useLang();
  return (
    <section className="container-app py-12 sm:py-16 min-h-[80vh] flex flex-col justify-center">
      {slide.eyebrow && <span className="chip mb-4">{slide.eyebrow[locale]}</span>}
      <h2 className="heading-1 max-w-3xl text-balance">{slide.title[locale]}</h2>
      {slide.subtitle && <p className="lead mt-4 max-w-3xl text-pretty">{slide.subtitle[locale]}</p>}
      {slide.phases && (
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {slide.phases.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="card p-6 relative overflow-hidden"
            >
              <div className="absolute top-3 end-3 text-xs font-bold text-accent-600 uppercase tracking-wider">{p.tag}</div>
              <div className="text-3xl font-display font-semibold text-brand-700 dark:text-brand-100">{i + 1}</div>
              <h3 className="font-semibold mt-3">{p.title[locale]}</h3>
              <p className="text-sm text-[rgb(var(--muted))] mt-2 leading-relaxed">{p.body[locale]}</p>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}

function PricingSlide({ slide }: { slide: Slide }) {
  const locale = useLang();
  return (
    <section className="container-app py-12 sm:py-16 min-h-[80vh] flex flex-col justify-center">
      {slide.eyebrow && <span className="chip mb-4">{slide.eyebrow[locale]}</span>}
      <h2 className="heading-1 max-w-3xl text-balance">{slide.title[locale]}</h2>
      {slide.pricing && (
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {slide.pricing.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className={cn('card p-6 relative', i === 1 && 'ring-2 ring-accent-500 lg:scale-105')}
            >
              {i === 1 && (
                <span className="absolute -top-3 start-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-accent-500 text-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                  <Star className="h-3 w-3 fill-current" /> {locale === 'ar' ? 'موصى بها' : 'Recommended'}
                </span>
              )}
              <div className="text-xs uppercase tracking-wider text-[rgb(var(--muted))]">{p.tier[locale]}</div>
              <div className="mt-2 text-2xl font-display font-semibold tracking-tight">{p.price}</div>
              <p className="mt-4 text-sm text-[rgb(var(--muted))] leading-relaxed">{p.features[locale]}</p>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}

function ClosingSlide({ slide }: { slide: Slide }) {
  const locale = useLang();
  return (
    <section className="container-app py-12 sm:py-20 min-h-[80vh] flex flex-col items-center justify-center text-center">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-soft">
          <Award className="h-8 w-8" />
        </div>
      </motion.div>
      {slide.eyebrow && <span className="chip mt-6">{slide.eyebrow[locale]}</span>}
      <h2 className="heading-1 mt-4 text-balance max-w-3xl">{slide.title[locale]}</h2>
      {slide.subtitle && <p className="lead mt-5 max-w-2xl text-pretty">{slide.subtitle[locale]}</p>}
      {slide.bullets && (
        <ul className="mt-10 grid gap-3 sm:grid-cols-3 max-w-4xl w-full">
          {slide.bullets.map((b, i) => (
            <li key={i} className="card p-4 text-start text-sm flex items-start gap-2">
              <Check className="h-4 w-4 text-accent-500 mt-0.5 shrink-0" /> {b[locale]}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-10 flex flex-wrap gap-3 justify-center">
        <a href="https://de-ali.github.io/motara/" target="_blank" rel="noreferrer" className="btn-accent">{locale === 'ar' ? 'افتح العرض المباشر' : 'Open live demo'}</a>
        <a href="https://github.com/De-Ali/motara" target="_blank" rel="noreferrer" className="btn-outline">{locale === 'ar' ? 'الكود على GitHub' : 'Source on GitHub'}</a>
      </div>
    </section>
  );
}
