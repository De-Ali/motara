'use client';
import Link from 'next/link';
import Image from 'next/image';
import { X, GitCompareArrows } from 'lucide-react';
import { useStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { useAdminStore } from '@/lib/admin-store';
import { formatKm, formatOMR, cn } from '@/lib/utils';

export default function ComparePage() {
  const { compare, toggleCompare } = useStore();
  const { cars } = useAdminStore();
  const { t, locale } = useI18n();
  const items = compare.map((id) => cars.find((c) => c.id === id)).filter(Boolean) as typeof cars;

  if (items.length === 0) {
    return (
      <div className="container-app py-20 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-50 text-brand-700">
          <GitCompareArrows className="h-7 w-7" />
        </div>
        <h1 className="heading-2 mt-5">{t('compare.title')}</h1>
        <p className="lead mt-2 max-w-md mx-auto">{t('compare.empty')}</p>
        <Link href="/cars" className="btn-accent mt-6 inline-flex">{t('common.viewAll')}</Link>
      </div>
    );
  }

  const rows: { label: string; render: (c: typeof cars[number]) => string | number }[] = [
    { label: t('common.price'),        render: (c) => formatOMR(c.priceOMR, locale) },
    { label: t('common.year'),         render: (c) => c.year },
    { label: t('common.mileage'),      render: (c) => formatKm(c.mileageKm, locale) },
    { label: t('common.fuel'),         render: (c) => c.fuel },
    { label: t('common.transmission'), render: (c) => c.transmission },
    { label: t('common.body'),         render: (c) => c.bodyType },
    { label: t('common.engine'),       render: (c) => c.engine },
    { label: t('common.color'),        render: (c) => c.color[locale] },
    { label: t('common.seats'),        render: (c) => c.seats },
    { label: t('common.warranty'),     render: (c) => `${c.warrantyMonths} ${t('common.months')}` },
    { label: t('carDetail.inspectionScore'), render: (c) => `${c.inspection.score}/100` }
  ];

  return (
    <div className="container-app py-10">
      <h1 className="heading-2">{t('compare.title')}</h1>
      <p className="lead mt-2">{t('compare.diff')}</p>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="p-3 text-start text-[10px] uppercase tracking-wider text-[rgb(var(--muted))]">—</th>
              {items.map((c) => (
                <th key={c.id} className="p-3 align-top min-w-[220px]">
                  <div className="card p-3">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
                      <Image src={c.images[0]} alt="" fill className="object-cover" sizes="240px" />
                    </div>
                    <div className="mt-2 flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <Link href={`/cars/${c.slug}`} className="block text-sm font-semibold truncate hover:text-accent-500">
                          {c.year} {c.make} {c.model}
                        </Link>
                        <span className="text-xs text-[rgb(var(--muted))]">{c.trim}</span>
                      </div>
                      <button onClick={() => toggleCompare(c.id)} aria-label={t('compare.remove')} className="btn-ghost p-1.5">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const values = items.map((c) => row.render(c));
              const allSame = values.every((v) => v === values[0]);
              return (
                <tr key={row.label} className={i % 2 === 1 ? 'bg-black/[0.02] dark:bg-white/[0.02]' : ''}>
                  <td className="p-3 text-xs uppercase tracking-wider text-[rgb(var(--muted))] whitespace-nowrap">{row.label}</td>
                  {values.map((v, idx) => (
                    <td key={idx} className={cn('p-3 align-top text-sm font-medium', !allSame && 'text-accent-600')}>
                      {String(v)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
