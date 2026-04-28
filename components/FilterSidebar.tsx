'use client';
import { useEffect, useMemo, useState } from 'react';
import { useI18n } from '@/lib/i18n';
import { bodyTypes, fuels, makes, transmissions } from '@/data/cars';
import { RotateCcw } from 'lucide-react';

export type Filters = {
  make: string;
  body: string;
  fuel: string;
  transmission: string;
  priceMax: number;
  yearMin: number;
  mileageMax: number;
};

export const defaultFilters: Filters = {
  make: '', body: '', fuel: '', transmission: '',
  priceMax: 25000, yearMin: 2017, mileageMax: 150000
};

export default function FilterSidebar({
  value, onChange, total
}: { value: Filters; onChange: (f: Filters) => void; total: number }) {
  const { t } = useI18n();
  const [local, setLocal] = useState<Filters>(value);
  useEffect(() => setLocal(value), [value]);

  const set = (patch: Partial<Filters>) => {
    const next = { ...local, ...patch };
    setLocal(next);
    onChange(next);
  };

  return (
    <aside className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto pr-1">
      <div className="card p-5 space-y-5">
        <header className="flex items-center justify-between">
          <h2 className="font-semibold">{t('filters.title')}</h2>
          <button onClick={() => onChange(defaultFilters)} className="btn-ghost gap-1.5 px-2 py-1.5 text-xs">
            <RotateCcw className="h-3.5 w-3.5" /> {t('common.reset')}
          </button>
        </header>

        <div>
          <label className="label">{t('common.make')}</label>
          <select className="input" value={local.make} onChange={(e) => set({ make: e.target.value })}>
            <option value="">{t('filters.anyMake')}</option>
            {makes.map((m) => <option key={m}>{m}</option>)}
          </select>
        </div>

        <div>
          <label className="label">{t('common.body')}</label>
          <div className="flex flex-wrap gap-1.5">
            {bodyTypes.map((b) => (
              <button key={b}
                onClick={() => set({ body: local.body === b ? '' : b })}
                className={`rounded-full px-3 py-1 text-xs border transition ${local.body === b ? 'bg-brand-600 text-white border-brand-600' : 'border-[rgb(var(--border))] hover:bg-black/5 dark:hover:bg-white/5'}`}>
                {b}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="label">{t('filters.priceRange')}: ≤ {local.priceMax.toLocaleString()}</label>
          <input type="range" min={3000} max={30000} step={500}
            value={local.priceMax}
            onChange={(e) => set({ priceMax: Number(e.target.value) })}
            className="w-full accent-accent-500"
          />
        </div>

        <div>
          <label className="label">{t('filters.yearRange')}: ≥ {local.yearMin}</label>
          <input type="range" min={2014} max={2024} step={1}
            value={local.yearMin}
            onChange={(e) => set({ yearMin: Number(e.target.value) })}
            className="w-full accent-accent-500"
          />
        </div>

        <div>
          <label className="label">{t('filters.mileageMax')}: ≤ {local.mileageMax.toLocaleString()}</label>
          <input type="range" min={20000} max={200000} step={5000}
            value={local.mileageMax}
            onChange={(e) => set({ mileageMax: Number(e.target.value) })}
            className="w-full accent-accent-500"
          />
        </div>

        <div>
          <label className="label">{t('filters.fuel')}</label>
          <div className="flex flex-wrap gap-1.5">
            {fuels.map((f) => (
              <button key={f}
                onClick={() => set({ fuel: local.fuel === f ? '' : f })}
                className={`rounded-full px-3 py-1 text-xs border transition ${local.fuel === f ? 'bg-brand-600 text-white border-brand-600' : 'border-[rgb(var(--border))]'}`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="label">{t('filters.transmission')}</label>
          <div className="flex flex-wrap gap-1.5">
            {transmissions.map((t) => (
              <button key={t}
                onClick={() => set({ transmission: local.transmission === t ? '' : t })}
                className={`rounded-full px-3 py-1 text-xs border transition ${local.transmission === t ? 'bg-brand-600 text-white border-brand-600' : 'border-[rgb(var(--border))]'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="text-center text-xs text-[rgb(var(--muted))] pt-2 border-t border-[rgb(var(--border))]">
          {total} {t('common.results')}
        </div>
      </div>
    </aside>
  );
}
