'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { useI18n } from '@/lib/i18n';
import { testimonials } from '@/data/testimonials';

export default function Testimonials() {
  const { t, locale } = useI18n();
  return (
    <section className="container-app py-20">
      <SectionHeading title={t('testimonials.title')} subtitle={t('testimonials.subtitle')} align="center" />
      <div className="grid gap-4 md:grid-cols-2">
        {testimonials.map((t, i) => (
          <motion.figure
            key={t.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="card p-6 relative"
          >
            <Quote className="absolute top-5 end-5 h-6 w-6 text-accent-500/30" />
            <div className="flex items-center gap-3">
              <Image src={t.avatar} alt={t.name} width={48} height={48} className="rounded-full h-12 w-12 object-cover" />
              <div>
                <div className="font-semibold">{t.name}</div>
                <div className="text-xs text-[rgb(var(--muted))]">{t.role[locale]}</div>
              </div>
            </div>
            <div className="mt-3 flex gap-0.5 text-accent-500">
              {Array.from({ length: t.rating }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}
            </div>
            <blockquote className="mt-3 text-sm leading-relaxed text-[rgb(var(--fg))]">&ldquo;{t.quote[locale]}&rdquo;</blockquote>
            <figcaption className="mt-3 text-xs text-[rgb(var(--muted))]">{t.carBought}</figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
