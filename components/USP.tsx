'use client';
import { motion } from 'framer-motion';
import { ShieldCheck, Camera, ScrollText, MessageCircle, Globe2, BadgeDollarSign } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { useDict, useI18n } from '@/lib/i18n';

const ICONS = [ShieldCheck, Camera, ScrollText, MessageCircle, Globe2, BadgeDollarSign];

export default function USP() {
  const dict = useDict();
  const { t } = useI18n();
  return (
    <section className="container-app py-20">
      <SectionHeading title={t('usp.title')} subtitle={t('usp.subtitle')} align="center" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {dict.usp.items.map((it: any, i: number) => {
          const Icon = ICONS[i] ?? ShieldCheck;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="card p-6 group hover:-translate-y-1 transition"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent-500/10 text-accent-600 group-hover:bg-accent-500 group-hover:text-white transition-colors">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold">{it.title}</h3>
              <p className="mt-1.5 text-sm text-[rgb(var(--muted))] leading-relaxed">{it.body}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
