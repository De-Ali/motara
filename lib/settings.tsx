'use client';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type SiteSettings = {
  whatsapp: string;
  phone: string;
  email: string;
  addressEn: string;
  addressAr: string;
  hoursEn: string;
  hoursAr: string;
  showroomLat: number;
  showroomLng: number;
  ropNumber: string;
  vatNumber: string;
};

export const DEFAULT_SETTINGS: SiteSettings = {
  whatsapp: '+96891234567',
  phone: '+96891234567',
  email: 'sales@motara-auto.om',
  addressEn: 'Al Khuwair, Muscat, Sultanate of Oman',
  addressAr: 'الخوير، مسقط، سلطنة عُمان',
  hoursEn: 'Sat–Thu · 9:00 – 21:00 · Fri · 16:00 – 21:00',
  hoursAr: 'السبت–الخميس · 9:00 – 21:00 · الجمعة · 16:00 – 21:00',
  showroomLat: 23.5934,
  showroomLng: 58.4099,
  ropNumber: 'ROP-OM-2024-1188',
  vatNumber: 'VAT-OM-2024-7720'
};

const KEY = 'motara.settings';
type Ctx = { settings: SiteSettings; update: (patch: Partial<SiteSettings>) => void; reset: () => void };
const Ctx = createContext<Ctx | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(raw) });
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(KEY, JSON.stringify(settings));
  }, [settings, hydrated]);

  const update = useCallback((patch: Partial<SiteSettings>) => setSettings((s) => ({ ...s, ...patch })), []);
  const reset = useCallback(() => { localStorage.removeItem(KEY); setSettings(DEFAULT_SETTINGS); }, []);

  return <Ctx.Provider value={useMemo(() => ({ settings, update, reset }), [settings, update, reset])}>{children}</Ctx.Provider>;
}

export function useSettings() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useSettings must be used inside <SettingsProvider>');
  return ctx;
}
