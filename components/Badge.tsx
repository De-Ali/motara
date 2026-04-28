'use client';
import { cn } from '@/lib/utils';
import type { Badge as BadgeT } from '@/lib/types';
import { useI18n } from '@/lib/i18n';
import { Award, Flame, Sparkles, Gauge, Plane } from 'lucide-react';

const styles: Record<BadgeT, string> = {
  'Motara Verified': 'bg-brand-600 text-white',
  'Hot Deal':        'bg-accent-500 text-white',
  'New Arrival':     'bg-success text-white',
  'Low Mileage':     'bg-brand-100 text-brand-800',
  'Imported':        'bg-white/90 text-brand-800 border border-brand-200'
};

const Icon: Record<BadgeT, React.ComponentType<{ className?: string }>> = {
  'Motara Verified': Award,
  'Hot Deal': Flame,
  'New Arrival': Sparkles,
  'Low Mileage': Gauge,
  'Imported': Plane
};

const labels: Record<BadgeT, { en: string; ar: string }> = {
  'Motara Verified': { en: 'Motara Verified', ar: 'موثقة من مطرة' },
  'Hot Deal':        { en: 'Hot Deal',        ar: 'صفقة مميزة' },
  'New Arrival':     { en: 'New Arrival',     ar: 'وصلت حديثًا' },
  'Low Mileage':     { en: 'Low Mileage',     ar: 'كيلومترات قليلة' },
  'Imported':        { en: 'Imported',        ar: 'مستوردة' }
};

export default function Badge({ kind, className }: { kind: BadgeT; className?: string }) {
  const { locale } = useI18n();
  const I = Icon[kind];
  return (
    <span className={cn('badge', styles[kind], className)}>
      <I className="h-3 w-3" />
      {labels[kind][locale]}
    </span>
  );
}
