'use client';
import { useEffect } from 'react';

export default function RegisterSW() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!('serviceWorker' in navigator)) return;
    if (process.env.NODE_ENV !== 'production') return;
    // Skip on GitHub Pages — basePath conflicts with SW scope.
    if (process.env.NEXT_PUBLIC_BASE_PATH) return;
    const onLoad = () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);
  return null;
}
