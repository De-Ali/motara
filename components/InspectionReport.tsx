'use client';
import Image from 'next/image';
import { useState } from 'react';
import { Check, Wrench, AlertCircle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { InspectionReport as IR } from '@/lib/types';
import { useI18n } from '@/lib/i18n';
import { cn } from '@/lib/utils';

const StatusIcon = ({ s }: { s: 'pass' | 'repaired' | 'note' }) => {
  if (s === 'pass') return <Check className="h-3.5 w-3.5" />;
  if (s === 'repaired') return <Wrench className="h-3.5 w-3.5" />;
  return <AlertCircle className="h-3.5 w-3.5" />;
};

const statusClass = (s: 'pass' | 'repaired' | 'note') =>
  s === 'pass'
    ? 'bg-success/10 text-success'
    : s === 'repaired'
    ? 'bg-accent-500/15 text-accent-600'
    : 'bg-warn/15 text-warn';

export default function InspectionReport({ report }: { report: IR }) {
  const { t, locale } = useI18n();
  const [open, setOpen] = useState<string | null>(report.categories[0]?.key ?? null);

  return (
    <div>
      <div className="card p-5 flex items-center gap-4 mb-4">
        <div className="relative grid h-20 w-20 place-items-center">
          <svg viewBox="0 0 36 36" className="absolute inset-0 -rotate-90">
            <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="3" />
            <circle
              cx="18" cy="18" r="15" fill="none"
              stroke="currentColor" strokeWidth="3" strokeLinecap="round"
              className="text-accent-500"
              strokeDasharray={`${(report.score / 100) * 94.2} 94.2`}
            />
          </svg>
          <div className="text-lg font-bold">{report.score}</div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-[rgb(var(--muted))]">{t('carDetail.inspectionScore')}</div>
          <div className="text-base font-semibold">
            {report.score} <span className="text-xs text-[rgb(var(--muted))] font-normal">{t('carDetail.outOf')}</span>
          </div>
          <div className="mt-1 text-xs text-[rgb(var(--muted))]">
            {report.inspectorName} · {new Date(report.inspectedAt).toLocaleDateString(locale === 'ar' ? 'ar-OM' : 'en-OM', { year: 'numeric', month: 'short', day: 'numeric' })}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {report.categories.map((cat) => {
          const isOpen = open === cat.key;
          const passCount = cat.items.filter((i) => i.status === 'pass').length;
          return (
            <div key={cat.key} className="card overflow-hidden">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : cat.key)}
                className="w-full flex items-center justify-between gap-3 p-4 text-start"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-white text-sm font-bold">
                    {cat.items.length}
                  </span>
                  <div>
                    <div className="font-semibold">{cat.title[locale]}</div>
                    <div className="text-xs text-[rgb(var(--muted))]">
                      {passCount}/{cat.items.length} {t('carDetail.passed').toLowerCase()}
                    </div>
                  </div>
                </div>
                <ChevronDown className={cn('h-5 w-5 transition-transform', isOpen && 'rotate-180')} />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <ul className="border-t border-[rgb(var(--border))] divide-y divide-[rgb(var(--border))]">
                      {cat.items.map((item) => (
                        <li key={item.id} className="flex items-start gap-3 p-3.5">
                          <span className={cn('grid h-6 w-6 shrink-0 place-items-center rounded-full', statusClass(item.status))}>
                            <StatusIcon s={item.status} />
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm font-medium">{item.label[locale]}</span>
                              <span className={cn('badge', statusClass(item.status))}>
                                {t(item.status === 'pass' ? 'carDetail.passed' : item.status === 'repaired' ? 'carDetail.repaired' : 'carDetail.noted')}
                              </span>
                            </div>
                            {item.note && <p className="mt-1 text-xs text-[rgb(var(--muted))]">{item.note[locale]}</p>}
                          </div>
                          {item.photo && (
                            <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-md">
                              <Image src={item.photo} alt="" fill className="object-cover" sizes="64px" />
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
