'use client';
import { useI18n } from '@/lib/i18n';
import Link from 'next/link';

export default function Logo({ size = 28 }: { size?: number }) {
  const { locale } = useI18n();
  return (
    <Link href="/" className="group inline-flex items-center gap-2.5">
      <span
        aria-hidden
        className="relative grid place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-soft"
        style={{ width: size + 10, height: size + 10 }}
      >
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 13l2-5a3 3 0 0 1 2.8-2H16.2A3 3 0 0 1 19 8l2 5" />
          <path d="M3 13v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-1h10v1a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4" />
          <circle cx="7" cy="13" r="1.5" fill="currentColor" />
          <circle cx="17" cy="13" r="1.5" fill="currentColor" />
        </svg>
        <span className="absolute inset-0 rounded-xl bg-accent-500/0 group-hover:bg-accent-500/10 transition" />
      </span>
      <span className="leading-none">
        <span className="block text-sm font-semibold tracking-tight">{locale === 'ar' ? 'مطرة' : 'Motara'}</span>
        <span className="block text-[10px] uppercase tracking-[0.2em] text-[rgb(var(--muted))]">{locale === 'ar' ? 'للسيارات' : 'AUTO'}</span>
      </span>
    </Link>
  );
}
