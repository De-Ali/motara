'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle2, BadgeCheck } from 'lucide-react';
import { useDict, useI18n } from '@/lib/i18n';
import SectionHeading from '@/components/SectionHeading';

const team = [
  { name: 'Saif Al-Hinai', role: { en: 'Founder & CEO',         ar: 'المؤسس والرئيس التنفيذي' }, photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80' },
  { name: 'Yusuf Al-Habsi', role: { en: 'Head of Inspection',   ar: 'رئيس قسم الفحص' },           photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80' },
  { name: 'Layla Al-Riyami', role: { en: 'Customer Success',    ar: 'علاقات العملاء' },           photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=80' },
  { name: 'Hamdan Al-Saidi', role: { en: 'Lead Mechanic',       ar: 'كبير الميكانيكيين' },         photo: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&auto=format&fit=crop&q=80' }
];

export default function AboutPage() {
  const dict = useDict();
  const { t, locale } = useI18n();
  return (
    <div className="container-app py-12">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
          <span className="chip mb-4">{t('nav.about')}</span>
          <h1 className="heading-1 text-balance">{t('about.title')}</h1>
          <p className="lead mt-5">{t('about.lead')}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="relative aspect-[4/3] rounded-3xl overflow-hidden">
          <Image src="https://images.unsplash.com/photo-1567789884554-0b844b597180?w=1400&auto=format&fit=crop&q=80" alt="Motara workshop" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-900/40 to-transparent" />
        </motion.div>
      </div>

      <section className="mt-20">
        <SectionHeading title={t('about.valuesTitle')} align="center" />
        <div className="grid gap-4 md:grid-cols-3">
          {dict.about.values.map((v: any, i: number) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card p-6">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-600 text-white"><CheckCircle2 className="h-5 w-5" /></div>
              <h3 className="font-semibold mt-4">{v.title}</h3>
              <p className="text-sm text-[rgb(var(--muted))] mt-2">{v.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <SectionHeading title={t('about.certsTitle')} align="center" />
        <div className="flex flex-wrap items-center justify-center gap-3">
          {(dict.about.certs as string[]).map((c) => (
            <span key={c} className="card px-4 py-2.5 inline-flex items-center gap-2 text-sm">
              <BadgeCheck className="h-4 w-4 text-success" /> {c}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <SectionHeading title={t('about.teamTitle')} align="center" />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => (
            <div key={m.name} className="card p-5 text-center">
              <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full">
                <Image src={m.photo} alt={m.name} fill className="object-cover" sizes="96px" />
              </div>
              <h4 className="mt-3 font-semibold">{m.name}</h4>
              <p className="text-xs text-[rgb(var(--muted))]">{m.role[locale]}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
