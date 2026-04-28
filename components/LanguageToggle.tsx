'use client';
import { useI18n } from '@/lib/i18n';
import { Languages } from 'lucide-react';

export default function LanguageToggle() {
  const { locale, toggle } = useI18n();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle language"
      className="btn-ghost gap-1.5 px-3 py-2 text-xs font-semibold uppercase tracking-wider"
    >
      <Languages className="h-4 w-4" />
      <span>{locale === 'ar' ? 'EN' : 'AR'}</span>
    </button>
  );
}
