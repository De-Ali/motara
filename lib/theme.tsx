'use client';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
type Ctx = { theme: Theme; toggle: () => void; set: (t: Theme) => void };

const ThemeContext = createContext<Ctx | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const stored = (typeof window !== 'undefined' && (localStorage.getItem('motara.theme') as Theme | null)) || null;
    const initial: Theme = stored ?? (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(initial);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('motara.theme', theme);
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (meta) meta.content = theme === 'dark' ? '#0E1419' : '#0F4C5C';
  }, [theme]);

  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), []);
  return <ThemeContext.Provider value={{ theme, toggle, set: setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}
