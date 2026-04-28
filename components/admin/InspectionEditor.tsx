'use client';
import { useMemo } from 'react';
import { Check, Wrench, AlertCircle, RotateCcw } from 'lucide-react';
import type { InspectionCategory, InspectionItem } from '@/lib/types';
import { buildInspection, inspectionScore } from '@/data/inspection-template';
import { cn } from '@/lib/utils';

type Props = {
  categories: InspectionCategory[];
  onChange: (next: InspectionCategory[]) => void;
};

const STATUSES: InspectionItem['status'][] = ['pass', 'repaired', 'note'];
const STATUS_META: Record<InspectionItem['status'], { label: string; cls: string; Icon: React.ComponentType<{ className?: string }> }> = {
  pass:     { label: 'Pass',     cls: 'bg-success/15 text-success',          Icon: Check },
  repaired: { label: 'Repaired', cls: 'bg-accent-500/15 text-accent-600',    Icon: Wrench },
  note:     { label: 'Note',     cls: 'bg-warn/15 text-warn',                Icon: AlertCircle }
};

export default function InspectionEditor({ categories, onChange }: Props) {
  const score = useMemo(() => inspectionScore(categories), [categories]);

  const setItem = (catKey: string, itemId: string, patch: Partial<InspectionItem>) => {
    onChange(categories.map((c) => c.key !== catKey ? c : {
      ...c,
      items: c.items.map((it) => it.id !== itemId ? it : { ...it, ...patch })
    }));
  };

  const setNote = (catKey: string, itemId: string, en: string) => {
    setItem(catKey, itemId, { note: en ? { en, ar: en } : undefined });
  };

  const reset = () => onChange(buildInspection(0));

  const totals = categories.reduce(
    (acc, c) => {
      c.items.forEach((it) => acc[it.status]++);
      return acc;
    },
    { pass: 0, repaired: 0, note: 0 } as Record<InspectionItem['status'], number>
  );

  return (
    <div className="space-y-5">
      <div className="card p-5 grid gap-4 sm:grid-cols-[auto_1fr_auto] items-center">
        <div className="relative grid h-16 w-16 place-items-center">
          <svg viewBox="0 0 36 36" className="absolute inset-0 -rotate-90">
            <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="3" />
            <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-accent-500" strokeDasharray={`${(score / 100) * 94.2} 94.2`} />
          </svg>
          <div className="text-base font-bold">{score}</div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-[rgb(var(--muted))]">Inspection score</div>
          <div className="text-base font-semibold">{score} / 100 · {categories.reduce((s, c) => s + c.items.length, 0)} items</div>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {STATUSES.map((s) => {
              const M = STATUS_META[s];
              return (
                <span key={s} className={cn('badge', M.cls)}>
                  <M.Icon className="h-3 w-3" /> {M.label} · {totals[s]}
                </span>
              );
            })}
          </div>
        </div>
        <button type="button" onClick={reset} className="btn-ghost gap-1.5 text-xs">
          <RotateCcw className="h-3.5 w-3.5" /> Reset to template
        </button>
      </div>

      <div className="space-y-4">
        {categories.map((cat) => (
          <details key={cat.key} className="card overflow-hidden" open>
            <summary className="flex cursor-pointer items-center justify-between gap-3 p-4 list-none">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-white text-sm font-bold">{cat.items.length}</span>
                <div>
                  <div className="font-semibold">{cat.title.en}</div>
                  <div className="text-xs text-[rgb(var(--muted))]">{cat.items.filter((i) => i.status === 'pass').length}/{cat.items.length} pass</div>
                </div>
              </div>
              <span className="text-xs text-[rgb(var(--muted))]">Click to expand</span>
            </summary>
            <ul className="border-t border-[rgb(var(--border))] divide-y divide-[rgb(var(--border))]">
              {cat.items.map((item) => {
                const M = STATUS_META[item.status];
                return (
                  <li key={item.id} className="p-3 grid gap-2 sm:grid-cols-[1fr_auto_2fr] sm:items-center">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={cn('grid h-6 w-6 shrink-0 place-items-center rounded-full', M.cls)}>
                        <M.Icon className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-sm truncate">{item.label.en}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {STATUSES.map((s) => {
                        const Mi = STATUS_META[s];
                        const active = item.status === s;
                        return (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setItem(cat.key, item.id, { status: s, note: s === 'pass' ? undefined : item.note })}
                            className={cn(
                              'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] transition border',
                              active ? Mi.cls + ' border-transparent ring-1 ring-current' : 'border-[rgb(var(--border))] text-[rgb(var(--muted))] hover:bg-black/5 dark:hover:bg-white/5'
                            )}
                            aria-pressed={active}
                          >
                            <Mi.Icon className="h-3 w-3" /> {Mi.label}
                          </button>
                        );
                      })}
                    </div>
                    <input
                      type="text"
                      value={item.note?.en ?? ''}
                      onChange={(e) => setNote(cat.key, item.id, e.target.value)}
                      placeholder={item.status === 'pass' ? 'No note needed' : 'Optional note (e.g. OEM part replaced)'}
                      disabled={item.status === 'pass'}
                      className="input !py-1.5 !px-3 text-xs disabled:opacity-50"
                    />
                  </li>
                );
              })}
            </ul>
          </details>
        ))}
      </div>
    </div>
  );
}
