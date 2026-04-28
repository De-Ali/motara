'use client';
import { motion } from 'framer-motion';
import { PackageSearch, ClipboardCheck, Wrench, KeyRound } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { useDict, useI18n } from '@/lib/i18n';

const ICONS = [PackageSearch, ClipboardCheck, Wrench, KeyRound];

export default function Process() {
  const dict = useDict();
  const { t } = useI18n();
  return (
    <section className="container-app py-20">
      <SectionHeading title={t('process.title')} subtitle={t('process.subtitle')} align="center" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dict.process.steps.map((s: any, i: number) => {
          const Icon = ICONS[i] ?? PackageSearch;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="card p-6 relative"
            >
              <div className="absolute top-4 end-4 text-5xl font-display font-bold text-brand-50 dark:text-white/5 leading-none select-none">
                0{i + 1}
              </div>
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-600 text-white">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold">{s.title}</h3>
              <p className="mt-1.5 text-sm text-[rgb(var(--muted))]">{s.body}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
