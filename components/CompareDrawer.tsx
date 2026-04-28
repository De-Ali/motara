'use client';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronUp, X, GitCompareArrows } from 'lucide-react';
import { useStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { useAdminStore } from '@/lib/admin-store';
import { formatOMR } from '@/lib/utils';

export default function CompareDrawer() {
  const { compare, toggleCompare, clearCompare } = useStore();
  const { cars } = useAdminStore();
  const { t, locale } = useI18n();
  const [open, setOpen] = useState(false);
  if (compare.length === 0) return null;
  const items = compare.map((id) => cars.find((c) => c.id === id)).filter(Boolean);

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 24 }}
      className="fixed bottom-3 start-3 end-20 sm:end-24 z-40 max-w-3xl mx-auto"
    >
      <div className="glass rounded-2xl px-3 py-2 shadow-soft">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-600 text-white"
            aria-label="Toggle compare drawer"
          >
            <GitCompareArrows className="h-4 w-4" />
            <span className="sr-only">Compare</span>
          </button>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 text-xs font-semibold">
              <span>{t('common.comparing')} · {compare.length}/3</span>
            </div>
            <div className="mt-1 flex items-center gap-2 overflow-x-auto scrollbar-none">
              {items.map((c) => c && (
                <div key={c.id} className="flex items-center gap-2 rounded-full bg-white/70 dark:bg-white/10 px-2 py-1 text-xs">
                  <Image src={c.images[0]} alt="" width={24} height={24} className="rounded-full object-cover h-6 w-6" />
                  <span className="whitespace-nowrap">{c.make} {c.model}</span>
                  <button onClick={() => toggleCompare(c.id)} aria-label={t('compare.remove')} className="opacity-70 hover:opacity-100">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <Link href="/compare" className="btn-accent !py-2 !px-4 text-xs">{t('common.compare')}</Link>
          <button onClick={() => setOpen((v) => !v)} className="btn-ghost p-2" aria-label="Expand">
            <ChevronUp className={`h-4 w-4 transition ${open ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="grid gap-2 grid-cols-1 sm:grid-cols-3 mt-3 px-1 pb-2">
                {items.map((c) => c && (
                  <Link key={c.id} href={`/cars/${c.slug}`} className="card p-2 flex items-center gap-2">
                    <Image src={c.images[0]} alt="" width={56} height={42} className="rounded-md h-10 w-14 object-cover" />
                    <div className="min-w-0">
                      <div className="text-xs font-medium truncate">{c.year} {c.make} {c.model}</div>
                      <div className="text-[11px] text-accent-600 font-semibold">{formatOMR(c.priceOMR, locale)}</div>
                    </div>
                  </Link>
                ))}
              </div>
              <button onClick={clearCompare} className="text-[11px] text-[rgb(var(--muted))] hover:underline mb-1">
                {t('common.reset')}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
