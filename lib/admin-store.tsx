'use client';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { Car } from '@/lib/types';
import { cars as seedCars } from '@/data/cars';

type Ctx = {
  cars: Car[];
  upsert: (c: Car) => void;
  remove: (id: string) => void;
  setStatus: (id: string, status: Car['status']) => void;
  reset: () => void;
};

const KEY = 'motara.admin.cars';
const AdminStoreCtx = createContext<Ctx | null>(null);

function load(): Car[] {
  if (typeof window === 'undefined') return seedCars;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as Car[];
  } catch {}
  return seedCars;
}

export function AdminStoreProvider({ children }: { children: React.ReactNode }) {
  const [cars, setCars] = useState<Car[]>(seedCars);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => { setCars(load()); setHydrated(true); }, []);
  useEffect(() => { if (hydrated) localStorage.setItem(KEY, JSON.stringify(cars)); }, [cars, hydrated]);

  const upsert = useCallback((c: Car) => {
    setCars((prev) => {
      const i = prev.findIndex((x) => x.id === c.id);
      if (i === -1) return [c, ...prev];
      const next = [...prev];
      next[i] = c;
      return next;
    });
  }, []);

  const remove = useCallback((id: string) => {
    setCars((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const setStatus = useCallback((id: string, status: Car['status']) => {
    setCars((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
  }, []);

  const reset = useCallback(() => {
    localStorage.removeItem(KEY);
    setCars(seedCars);
  }, []);

  const value = useMemo(() => ({ cars, upsert, remove, setStatus, reset }), [cars, upsert, remove, setStatus, reset]);
  return <AdminStoreCtx.Provider value={value}>{children}</AdminStoreCtx.Provider>;
}

export function useAdminStore() {
  const ctx = useContext(AdminStoreCtx);
  if (!ctx) throw new Error('useAdminStore must be used inside <AdminStoreProvider>');
  return ctx;
}
