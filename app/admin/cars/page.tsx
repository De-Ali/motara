'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { Plus, Search, Pencil, Trash2, ExternalLink, ChevronDown } from 'lucide-react';
import { useAdminStore } from '@/lib/admin-store';
import { useToast } from '@/lib/toast';
import { useI18n } from '@/lib/i18n';
import { formatKm, formatOMR, cn } from '@/lib/utils';
import type { Car } from '@/lib/types';

const STATUSES: Car['status'][] = ['Available', 'Reserved', 'Sold'];

export default function AdminCarsList() {
  const { cars, remove, setStatus } = useAdminStore();
  const { locale } = useI18n();
  const toast = useToast();
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState<'All' | Car['status']>('All');

  const filtered = useMemo(() => {
    return cars.filter((c) => {
      if (filter !== 'All' && c.status !== filter) return false;
      if (q) {
        const t = q.toLowerCase();
        return (
          c.make.toLowerCase().includes(t) ||
          c.model.toLowerCase().includes(t) ||
          (c.trim ?? '').toLowerCase().includes(t) ||
          String(c.year).includes(t)
        );
      }
      return true;
    });
  }, [cars, q, filter]);

  const onDelete = (id: string, name: string) => {
    if (!confirm(`Delete ${name}? This cannot be undone (use "Reset mock data" to restore).`)) return;
    remove(id);
    toast.show('Car deleted');
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="heading-2">Inventory</h1>
          <p className="text-sm text-[rgb(var(--muted))] mt-1">{filtered.length} of {cars.length} cars</p>
        </div>
        <Link href="/admin/cars/new" className="btn-accent gap-2 self-start sm:self-end">
          <Plus className="h-4 w-4" /> Add a car
        </Link>
      </header>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 -translate-y-1/2 start-3 h-4 w-4 text-[rgb(var(--muted))]" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search make, model, trim, year…"
            className="input ps-9"
          />
        </div>
        <div className="card !rounded-full p-1 flex gap-1">
          {(['All', ...STATUSES] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={cn(
                'rounded-full px-3 py-1.5 text-xs transition',
                filter === s ? 'bg-brand-600 text-white' : 'hover:bg-black/5 dark:hover:bg-white/5'
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-start text-[10px] uppercase tracking-wider text-[rgb(var(--muted))] border-b border-[rgb(var(--border))]">
                <th className="p-3 text-start">Car</th>
                <th className="p-3 text-start hidden md:table-cell">Specs</th>
                <th className="p-3 text-start">Price</th>
                <th className="p-3 text-start">Status</th>
                <th className="p-3 text-start hidden lg:table-cell">Inspection</th>
                <th className="p-3 text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-b border-[rgb(var(--border))] last:border-0 hover:bg-black/[0.02] dark:hover:bg-white/[0.02]">
                  <td className="p-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <Image src={c.images[0]} alt="" width={56} height={42} className="h-10 w-14 rounded-md object-cover shrink-0" />
                      <div className="min-w-0">
                        <div className="font-medium truncate">{c.year} {c.make} {c.model}</div>
                        <div className="text-xs text-[rgb(var(--muted))] truncate">{c.trim} · {c.color[locale]}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 hidden md:table-cell text-xs text-[rgb(var(--muted))]">
                    {formatKm(c.mileageKm, locale)} · {c.fuel} · {c.transmission}
                  </td>
                  <td className="p-3 font-medium">{formatOMR(c.priceOMR, locale)}</td>
                  <td className="p-3">
                    <div className="relative inline-block">
                      <select
                        value={c.status}
                        onChange={(e) => { setStatus(c.id, e.target.value as Car['status']); toast.show('Status updated'); }}
                        className={cn('appearance-none rounded-full pe-7 ps-3 py-1 text-xs font-medium border-0 outline-none cursor-pointer',
                          c.status === 'Available' ? 'bg-success/15 text-success' :
                          c.status === 'Reserved'  ? 'bg-warn/15 text-warn'      :
                          'bg-danger/15 text-danger')}
                      >
                        {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <ChevronDown className="pointer-events-none absolute end-1.5 top-1/2 -translate-y-1/2 h-3 w-3 opacity-70" />
                    </div>
                  </td>
                  <td className="p-3 hidden lg:table-cell text-xs">
                    <span className="font-semibold text-success">{c.inspection.score}</span>
                    <span className="text-[rgb(var(--muted))]"> / 100</span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-1 justify-end">
                      <Link href={`/cars/${c.slug}`} target="_blank" className="btn-ghost p-2" aria-label="View public">
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                      <Link href={`/admin/cars/${c.id}/edit`} className="btn-ghost p-2" aria-label="Edit">
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <button onClick={() => onDelete(c.id, `${c.year} ${c.make} ${c.model}`)} className="btn-ghost p-2 text-danger" aria-label="Delete">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-sm text-[rgb(var(--muted))]">No cars match your filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
