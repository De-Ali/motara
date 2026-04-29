'use client';
import { useEffect } from 'react';

export default function RegisterSW() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!('serviceWorker' in navigator)) return;
    if (process.env.NODE_ENV !== 'production') return;
    const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
    const swUrl = `${base}/sw.js`;
    const scope = `${base}/`;
    const onLoad = () => {
      navigator.serviceWorker.register(swUrl, { scope }).catch(() => {});
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);
  return null;
}
