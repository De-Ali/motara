'use client';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Grid2x2, List, SlidersHorizontal, X } from 'lucide-react';
import CarCard from '@/components/CarCard';
import FilterSidebar, { defaultFilters, type Filters } from '@/components/FilterSidebar';
import { useI18n } from '@/lib/i18n';
import { useAdminStore } from '@/lib/admin-store';
import { cn } from '@/lib/utils';

type Sort = 'newest' | 'priceAsc' | 'priceDesc' | 'yearDesc' | 'mileageAsc';

export default function CarsPage() {
  return (
    <Suspense fallback={<div className="container-app py-20 text-center text-sm text-[rgb(var(--muted))]">Loading…</div>}>
      <CarsInner />
    </Suspense>
  );
}

function CarsInner() {
  const { t } = useI18n();
  const { cars } = useAdminStore();
  const params = useSearchParams();
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [sort, setSort] = useState<Sort>('newest');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [drawer, setDrawer] = useState(false);

  // hydrate from URL on mount
  useEffect(() => {
    const next = { ...defaultFilters };
    const m = params.get('make'); if (m) next.make = m;
    const b = params.get('body'); if (b) next.body = b;
    const p = params.get('maxPrice'); if (p) next.priceMax = Number(p);
    setFilters(next);
  }, [params]);

  const filtered = useMemo(() => {
    let list = cars.filter((c) => {
      if (filters.make && c.make !== filters.make) return false;
      if (filters.body && c.bodyType !== filters.body) return false;
      if (filters.fuel && c.fuel !== filters.fuel) return false;
      if (filters.transmission && c.transmission !== filters.transmission) return false;
      if (c.priceOMR > filters.priceMax) return false;
      if (c.year < filters.yearMin) return false;
      if (c.mileageKm > filters.mileageMax) return false;
      return true;
    });
    switch (sort) {
      case 'priceAsc':   list = [...list].sort((a, b) => a.priceOMR - b.priceOMR); break;
      case 'priceDesc':  list = [...list].sort((a, b) => b.priceOMR - a.priceOMR); break;
      case 'yearDesc':   list = [...list].sort((a, b) => b.year - a.year); break;
      case 'mileageAsc': list = [...list].sort((a, b) => a.mileageKm - b.mileageKm); break;
      default:           list = [...list].sort((a, b) => b.year - a.year);
    }
    return list;
  }, [filters, sort]);

  return (
    <div className="container-app pt-8 pb-16">
      <header className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="heading-2">{t('nav.cars')}</h1>
          <p className="text-sm text-[rgb(var(--muted))] mt-1">{filtered.length} {t('common.results')}</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setDrawer(true)} className="btn-outline lg:hidden gap-1.5">
            <SlidersHorizontal className="h-4 w-4" /> {t('common.filters')}
          </button>
          <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="input !py-2 !px-3 text-xs">
            <option value="newest">{t('sort.newest')}</option>
            <option value="priceAsc">{t('sort.priceAsc')}</option>
            <option value="priceDesc">{t('sort.priceDesc')}</option>
            <option value="yearDesc">{t('sort.yearDesc')}</option>
            <option value="mileageAsc">{t('sort.mileageAsc')}</option>
          </select>
          <div className="hidden sm:flex card !rounded-full p-1 gap-1">
            <button onClick={() => setView('grid')} aria-label="Grid" className={cn('grid h-8 w-8 place-items-center rounded-full transition', view === 'grid' && 'bg-brand-600 text-white')}>
              <Grid2x2 className="h-4 w-4" />
            </button>
            <button onClick={() => setView('list')} aria-label="List" className={cn('grid h-8 w-8 place-items-center rounded-full transition', view === 'list' && 'bg-brand-600 text-white')}>
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <div className="hidden lg:block">
          <FilterSidebar value={filters} onChange={setFilters} total={filtered.length} />
        </div>

        <div>
          {filtered.length === 0 ? (
            <div className="card p-10 text-center">
              <h3 className="heading-3">{t('filters.noResultsTitle')}</h3>
              <p className="lead mt-2">{t('filters.noResultsBody')}</p>
              <button onClick={() => setFilters(defaultFilters)} className="btn-primary mt-5">{t('common.reset')}</button>
            </div>
          ) : (
            <div className={cn(
              'grid gap-5',
              view === 'grid' ? 'sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'
            )}>
              {filtered.map((c, i) => <CarCard key={c.id} car={c} index={i} />)}
            </div>
          )}
        </div>
      </div>

      {/* Mobile drawer */}
      {drawer && (
        <div className="fixed inset-0 z-[60] bg-black/50 lg:hidden" onClick={() => setDrawer(false)}>
          <div onClick={(e) => e.stopPropagation()} className="absolute inset-y-0 start-0 w-[85%] max-w-sm overflow-y-auto bg-[rgb(var(--bg))] p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">{t('filters.title')}</h2>
              <button onClick={() => setDrawer(false)} className="btn-ghost p-2"><X className="h-4 w-4" /></button>
            </div>
            <FilterSidebar value={filters} onChange={setFilters} total={filtered.length} />
            <button onClick={() => setDrawer(false)} className="btn-accent w-full mt-4">{t('filters.apply')}</button>
          </div>
        </div>
      )}
    </div>
  );
}
