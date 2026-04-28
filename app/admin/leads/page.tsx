'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Phone, MessageCircle, Calendar, FileText, ChevronDown, Download, Search, Trash2 } from 'lucide-react';
import type { Lead } from '@/data/leads';
import { useLeads, leadsToCsv, downloadCsv } from '@/lib/leads-store';
import { useAdminStore } from '@/lib/admin-store';
import { useToast } from '@/lib/toast';
import { relTime, cn } from '@/lib/utils';

const ICONS: Record<Lead['channel'], React.ComponentType<{ className?: string }>> = {
  WhatsApp: MessageCircle, Phone: Phone, 'Test Drive': Calendar, Form: FileText
};
const FILTERS: Array<'All' | Lead['status']> = ['All', 'New', 'Contacted', 'Closed'];

export default function AdminLeads() {
  const { leads, setStatus, remove } = useLeads();
  const { cars } = useAdminStore();
  const toast = useToast();
  const [filter, setFilter] = useState<'All' | Lead['status']>('All');
  const [carFilter, setCarFilter] = useState<string>('');
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      if (filter !== 'All' && l.status !== filter) return false;
      if (carFilter && l.carSlug !== carFilter) return false;
      if (q) {
        const t = q.toLowerCase();
        return (
          l.name.toLowerCase().includes(t) ||
          l.phone.includes(t) ||
          (l.message ?? '').toLowerCase().includes(t) ||
          (l.carName ?? '').toLowerCase().includes(t)
        );
      }
      return true;
    });
  }, [leads, filter, carFilter, q]);

  const exportCsv = () => {
    const csv = leadsToCsv(filtered);
    downloadCsv(`motara-leads-${new Date().toISOString().slice(0, 10)}.csv`, csv);
    toast.show(`Exported ${filtered.length} leads`);
  };

  const onDelete = (id: string, name: string) => {
    if (!confirm(`Delete lead from ${name}?`)) return;
    remove(id);
    toast.show('Lead removed');
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="heading-2">Leads</h1>
          <p className="text-sm text-[rgb(var(--muted))] mt-1">{filtered.length} of {leads.length} inquiries</p>
        </div>
        <button onClick={exportCsv} className="btn-outline gap-1.5 self-start sm:self-end">
          <Download className="h-4 w-4" /> Export CSV
        </button>
      </header>

      <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto]">
        <div className="relative">
          <Search className="absolute top-1/2 -translate-y-1/2 start-3 h-4 w-4 text-[rgb(var(--muted))]" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, phone, message…" className="input ps-9" />
        </div>
        <select value={carFilter} onChange={(e) => setCarFilter(e.target.value)} className="input !py-2 text-sm">
          <option value="">All cars</option>
          {cars.map((c) => <option key={c.id} value={c.slug}>{c.year} {c.make} {c.model}</option>)}
        </select>
        <div className="card !rounded-full p-1 flex gap-1">
          {FILTERS.map((s) => (
            <button key={s} onClick={() => setFilter(s)} className={cn('rounded-full px-3 py-1.5 text-xs transition', filter === s ? 'bg-brand-600 text-white' : 'hover:bg-black/5 dark:hover:bg-white/5')}>{s}</button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((l) => {
          const Icon = ICONS[l.channel];
          return (
            <article key={l.id} className="card p-4 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className={cn('grid h-10 w-10 place-items-center rounded-xl shrink-0',
                l.channel === 'WhatsApp' ? 'bg-[#25D366]/15 text-[#1c9c4f]' :
                l.channel === 'Test Drive' ? 'bg-accent-500/15 text-accent-600' :
                l.channel === 'Form' ? 'bg-brand-600/15 text-brand-700 dark:text-brand-100' :
                'bg-warn/15 text-warn'
              )}>
                <Icon className="h-5 w-5" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium">{l.name}</span>
                  <span className="text-xs text-[rgb(var(--muted))]">·</span>
                  <a href={`tel:${l.phone}`} className="text-xs text-[rgb(var(--muted))] hover:text-accent-500">{l.phone}</a>
                  <span className="badge bg-[rgb(var(--border))] text-[rgb(var(--muted))]">{l.channel}</span>
                </div>
                {l.carSlug ? (
                  <Link href={`/cars/${l.carSlug}`} target="_blank" className="text-xs text-accent-600 hover:underline">{l.carName}</Link>
                ) : (
                  <span className="text-xs text-[rgb(var(--muted))]">{l.carName}</span>
                )}
                <p className="text-sm mt-1.5 text-pretty">{l.message}</p>
                <div className="text-[11px] text-[rgb(var(--muted))] mt-1">{relTime(l.createdAt)}</div>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <select
                    value={l.status}
                    onChange={(e) => { setStatus(l.id, e.target.value as Lead['status']); toast.show('Status updated'); }}
                    className={cn('appearance-none rounded-full pe-7 ps-3 py-1.5 text-xs font-medium border-0 outline-none cursor-pointer',
                      l.status === 'New' ? 'bg-accent-500/15 text-accent-600' :
                      l.status === 'Contacted' ? 'bg-brand-600/15 text-brand-700 dark:text-brand-100' :
                      'bg-success/15 text-success')}
                  >
                    <option>New</option><option>Contacted</option><option>Closed</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute end-1.5 top-1/2 -translate-y-1/2 h-3 w-3 opacity-70" />
                </div>
                <a href={`https://wa.me/${l.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="btn-accent !py-1.5 !px-3 text-xs">Reply</a>
                <button onClick={() => onDelete(l.id, l.name)} className="btn-ghost p-1.5 text-danger" aria-label="Delete">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </article>
          );
        })}
        {filtered.length === 0 && (
          <div className="card p-10 text-center text-sm text-[rgb(var(--muted))]">No leads match these filters.</div>
        )}
      </div>
    </div>
  );
}
