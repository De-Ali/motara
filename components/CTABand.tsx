'use client';
import { useI18n } from '@/lib/i18n';
import { MOTARA_PHONE, whatsappLink } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

export default function CTABand() {
  const { t, locale } = useI18n();
  return (
    <section className="container-app py-20">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 text-white p-10 md:p-14 shadow-soft">
        <div aria-hidden className="absolute inset-0 bg-hero-glow opacity-60" />
        <div aria-hidden className="absolute -top-24 -end-20 h-80 w-80 rounded-full bg-accent-500/30 blur-3xl" />
        <div className="relative grid gap-6 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="heading-2">{t('ctaBand.title')}</h2>
            <p className="mt-3 text-white/80 max-w-md">{t('ctaBand.body')}</p>
          </div>
          <div className="flex md:justify-end">
            <a
              href={whatsappLink(MOTARA_PHONE, locale === 'ar' ? 'مرحبًا مطرة، وجدت سيارة' : 'Hi Motara, I found a car I like')}
              target="_blank" rel="noopener noreferrer"
              className="btn-accent gap-2"
            >
              {t('ctaBand.button')} <ArrowRight className="h-4 w-4 rtl-flip" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
