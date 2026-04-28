'use client';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { seedLeads, type Lead } from '@/data/leads';

type Ctx = {
  leads: Lead[];
  add: (lead: Omit<Lead, 'id' | 'createdAt' | 'status'> & Partial<Pick<Lead, 'status'>>) => void;
  setStatus: (id: string, status: Lead['status']) => void;
  remove: (id: string) => void;
  reset: () => void;
};

const KEY = 'motara.leads';
const Ctx = createContext<Ctx | null>(null);

function load(): Lead[] {
  if (typeof window === 'undefined') return seedLeads;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as Lead[];
  } catch {}
  return seedLeads;
}

export function LeadsProvider({ children }: { children: React.ReactNode }) {
  const [leads, setLeads] = useState<Lead[]>(seedLeads);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => { setLeads(load()); setHydrated(true); }, []);
  useEffect(() => { if (hydrated) localStorage.setItem(KEY, JSON.stringify(leads)); }, [leads, hydrated]);

  const add: Ctx['add'] = useCallback((lead) => {
    const item: Lead = {
      id: `l-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: lead.status ?? 'New',
      ...lead
    };
    setLeads((prev) => [item, ...prev]);
  }, []);

  const setStatus = useCallback((id: string, status: Lead['status']) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
  }, []);

  const remove = useCallback((id: string) => setLeads((prev) => prev.filter((l) => l.id !== id)), []);
  const reset = useCallback(() => { localStorage.removeItem(KEY); setLeads(seedLeads); }, []);

  return <Ctx.Provider value={useMemo(() => ({ leads, add, setStatus, remove, reset }), [leads, add, setStatus, remove, reset])}>{children}</Ctx.Provider>;
}

export function useLeads() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useLeads must be used inside <LeadsProvider>');
  return ctx;
}

export function leadsToCsv(leads: Lead[]): string {
  const headers = ['id', 'name', 'phone', 'channel', 'carName', 'carSlug', 'message', 'status', 'createdAt'];
  const escape = (v: unknown) => {
    const s = v == null ? '' : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const rows = leads.map((l) => headers.map((h) => escape((l as any)[h])).join(','));
  return [headers.join(','), ...rows].join('\n');
}

export function downloadCsv(filename: string, csv: string) {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 0);
}
