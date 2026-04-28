'use client';
import { WifiOff } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

export default function OfflinePage() {
  const { t } = useI18n();
  return (
    <div className="container-app py-20">
      <div className="card p-10 max-w-md mx-auto text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-50 text-brand-700">
          <WifiOff className="h-7 w-7" />
        </div>
        <h1 className="heading-3 mt-5">{t('offline.title')}</h1>
        <p className="lead mt-2">{t('offline.body')}</p>
      </div>
    </div>
  );
}
