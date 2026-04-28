'use client';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type StoreCtx = {
  favorites: string[];
  compare: string[];
  isFav: (id: string) => boolean;
  isComparing: (id: string) => boolean;
  toggleFav: (id: string) => 'added' | 'removed';
  toggleCompare: (id: string) => 'added' | 'removed' | 'max';
  clearCompare: () => void;
};

const Ctx = createContext<StoreCtx | null>(null);

const FAV_KEY = 'motara.favorites';
const CMP_KEY = 'motara.compare';

function read(key: string): string[] {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem(key) ?? '[]'); } catch { return []; }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(read(FAV_KEY));
    setCompare(read(CMP_KEY));
  }, []);

  useEffect(() => { localStorage.setItem(FAV_KEY, JSON.stringify(favorites)); }, [favorites]);
  useEffect(() => { localStorage.setItem(CMP_KEY, JSON.stringify(compare)); }, [compare]);

  const isFav = useCallback((id: string) => favorites.includes(id), [favorites]);
  const isComparing = useCallback((id: string) => compare.includes(id), [compare]);

  const toggleFav = useCallback((id: string): 'added' | 'removed' => {
    let result: 'added' | 'removed' = 'added';
    setFavorites((prev) => {
      if (prev.includes(id)) { result = 'removed'; return prev.filter((x) => x !== id); }
      return [id, ...prev];
    });
    return result;
  }, []);

  const toggleCompare = useCallback((id: string): 'added' | 'removed' | 'max' => {
    let result: 'added' | 'removed' | 'max' = 'added';
    setCompare((prev) => {
      if (prev.includes(id)) { result = 'removed'; return prev.filter((x) => x !== id); }
      if (prev.length >= 3) { result = 'max'; return prev; }
      return [...prev, id];
    });
    return result;
  }, []);

  const clearCompare = useCallback(() => setCompare([]), []);

  const value = useMemo(() => ({ favorites, compare, isFav, isComparing, toggleFav, toggleCompare, clearCompare }),
    [favorites, compare, isFav, isComparing, toggleFav, toggleCompare, clearCompare]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useStore must be used inside <StoreProvider>');
  return ctx;
}
