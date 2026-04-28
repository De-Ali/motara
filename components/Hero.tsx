'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search, ArrowRight, ShieldCheck, Wrench, BadgeCheck } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { MOTARA_PHONE, whatsappLink } from '@/lib/utils';

export default function Hero() {
  const { t, locale } = useI18n();
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-glow" aria-hidden />
      <div className="absolute inset-x-0 top-0 h-[700px] bg-grid-fade" aria-hidden />
      <div aria-hidden className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(circle_at_1px_1px,rgb(var(--fg))_1px,transparent_0)] [background-size:24px_24px]" />

      <div className="container-app relative pt-12 pb-20 sm:pt-20 sm:pb-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <span className="chip mb-5">
              <ShieldCheck className="h-3.5 w-3.5" />
              {t('hero.eyebrow')}
            </span>
            <h1 className="heading-1 text-balance">
              {t('hero.title')}
            </h1>
            <p className="lead mt-5 max-w-2xl text-pretty">{t('hero.subtitle')}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/cars" className="btn-accent gap-2">
                {t('hero.ctaPrimary')} <ArrowRight className="h-4 w-4 rtl-flip" />
              </Link>
              <a
                href={whatsappLink(MOTARA_PHONE, locale === 'ar' ? 'مرحبًا مطرة' : 'Hi Motara')}
                target="_blank" rel="noopener noreferrer"
                className="btn-outline"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-[#25D366]">
                  <path d="M20.5 3.5A11.94 11.94 0 0 0 12.05 0C5.45 0 .12 5.32.12 11.92a11.83 11.83 0 0 0 1.69 6.13L0 24l6.18-1.62a11.92 11.92 0 0 0 5.86 1.49h.01c6.6 0 11.93-5.32 11.93-11.92 0-3.18-1.24-6.18-3.48-8.45z"/>
                </svg>
                {t('hero.ctaSecondary')}
              </a>
            </div>

            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl">
              <Stat value="350+" label={t('hero.stat1Label')} />
              <Stat value="50" label={t('hero.stat2Label')} />
              <Stat value="48h" label={t('hero.stat3Label')} />
              <Stat value="4.9★" label={t('hero.stat4Label')} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-soft">
              <Image
                src="https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1400&auto=format&fit=crop&q=80"
                alt="Motara certified used car"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-900/80 via-brand-900/10 to-transparent" />

              <div className="absolute inset-x-4 bottom-4 glass rounded-2xl p-4 text-white">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider opacity-80">
                  <BadgeCheck className="h-3.5 w-3.5 text-accent-300" />
                  {locale === 'ar' ? 'موثقة من مطرة' : 'Motara Verified'}
                </div>
                <div className="mt-1 text-base font-semibold">
                  {locale === 'ar' ? 'فحص من 50 نقطة + ضمان' : '50-point inspection + warranty'}
                </div>
              </div>

              <div className="absolute -top-2 -end-2 rotate-3 rounded-2xl glass p-3 text-xs flex items-center gap-2 shadow-soft">
                <Wrench className="h-4 w-4 text-accent-500" />
                <span className="font-medium">{locale === 'ar' ? 'إصلاحات مصورة' : 'Photo-documented repairs'}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-2xl font-display font-semibold text-brand-700 dark:text-brand-100">{value}</div>
      <div className="text-xs uppercase tracking-wider text-[rgb(var(--muted))] mt-1">{label}</div>
    </div>
  );
}
