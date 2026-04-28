'use client';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import en from '@/messages/en.json';
import ar from '@/messages/ar.json';
import type { Locale, Direction } from '@/lib/types';

type Messages = typeof en;

const dictionaries: Record<Locale, Messages> = { en, ar: ar as Messages };

type I18nContextValue = {
  locale: Locale;
  dir: Direction;
  t: (path: string, vars?: Record<string, string | number>) => string;
  setLocale: (l: Locale) => void;
  toggle: () => void;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function getByPath(obj: any, path: string): any {
  return path.split('.').reduce((acc, key) => (acc == null ? acc : acc[key]), obj);
}

function interpolate(s: string, vars?: Record<string, string | number>) {
  if (!vars) return s;
  return s.replace(/\{(\w+)\}/g, (_, k) => (vars[k] != null ? String(vars[k]) : `{${k}}`));
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    const stored = (typeof window !== 'undefined' && (localStorage.getItem('motara.locale') as Locale | null)) || null;
    const preferred: Locale = stored || (typeof navigator !== 'undefined' && navigator.language.startsWith('ar') ? 'ar' : 'en');
    setLocaleState(preferred);
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
      document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    }
    if (typeof window !== 'undefined') localStorage.setItem('motara.locale', locale);
  }, [locale]);

  const setLocale = useCallback((l: Locale) => setLocaleState(l), []);
  const toggle = useCallback(() => setLocaleState((l) => (l === 'en' ? 'ar' : 'en')), []);

  const t = useCallback(
    (path: string, vars?: Record<string, string | number>) => {
      const dict = dictionaries[locale];
      const v = getByPath(dict, path);
      if (typeof v === 'string') return interpolate(v, vars);
      return path;
    },
    [locale]
  );

  const value = useMemo<I18nContextValue>(() => ({
    locale,
    dir: locale === 'ar' ? 'rtl' : 'ltr',
    t,
    setLocale,
    toggle
  }), [locale, t, setLocale, toggle]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>');
  return ctx;
}

export function useT() {
  return useI18n().t;
}

// Access raw dictionary objects (e.g., for arrays)
export function useDict() {
  const { locale } = useI18n();
  return dictionaries[locale];
}
