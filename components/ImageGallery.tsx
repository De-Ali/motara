'use client';
import Image from 'next/image';
import { useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function ImageGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const [light, setLight] = useState(false);

  const prev = useCallback(() => setActive((a) => (a - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setActive((a) => (a + 1) % images.length), [images.length]);

  useEffect(() => {
    if (!light) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLight(false);
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [light, prev, next]);

  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-black/5">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image src={images[active]} alt={`${alt} ${active + 1}`} fill priority={active === 0} className="object-cover" sizes="(max-width: 1024px) 100vw, 60vw" />
          </motion.div>
        </AnimatePresence>

        <button onClick={prev} aria-label="Previous" className="absolute start-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-white/80 backdrop-blur hover:bg-white shadow-soft">
          <ChevronLeft className="h-5 w-5 rtl-flip" />
        </button>
        <button onClick={next} aria-label="Next" className="absolute end-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-white/80 backdrop-blur hover:bg-white shadow-soft">
          <ChevronRight className="h-5 w-5 rtl-flip" />
        </button>
        <button onClick={() => setLight(true)} aria-label="Expand" className="absolute end-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/80 backdrop-blur hover:bg-white shadow-soft">
          <Maximize2 className="h-4 w-4" />
        </button>
        <div className="absolute bottom-3 start-1/2 -translate-x-1/2 rounded-full bg-black/60 text-white text-xs px-2.5 py-1">
          {active + 1} / {images.length}
        </div>
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto scrollbar-none pb-1">
        {images.map((src, i) => (
          <button
            key={src + i}
            onClick={() => setActive(i)}
            className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition ${i === active ? 'border-accent-500' : 'border-transparent opacity-70 hover:opacity-100'}`}
            aria-label={`Photo ${i + 1}`}
          >
            <Image src={src} alt="" fill className="object-cover" sizes="96px" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {light && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/90 grid place-items-center p-4"
            onClick={() => setLight(false)}
          >
            <button onClick={() => setLight(false)} aria-label="Close" className="absolute top-4 end-4 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
              <X className="h-5 w-5" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous" className="absolute start-4 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
              <ChevronLeft className="h-6 w-6 rtl-flip" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next" className="absolute end-4 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
              <ChevronRight className="h-6 w-6 rtl-flip" />
            </button>
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
              className="relative w-full max-w-5xl aspect-[16/10]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={images[active]} alt={`${alt} ${active + 1}`} fill className="object-contain" sizes="100vw" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
