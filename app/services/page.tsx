'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Wrench, Shield, ChevronDown } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { useDict, useI18n } from '@/lib/i18n';

const ICONS = [Plane, Wrench, Shield];

export default function ServicesPage() {
  const dict = useDict();
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="container-app py-12">
      <SectionHeading title={t('services.title')} subtitle={t('services.subtitle')} align="center" />
      <div className="grid gap-5 md:grid-cols-3">
        {dict.services.items.map((s: any, i: number) => {
          const Icon = ICONS[i] ?? Plane;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="card p-6 group hover:-translate-y-1 transition relative overflow-hidden"
            >
              <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-accent-500/0 to-accent-500/0 group-hover:from-accent-500/5 group-hover:to-brand-600/10 transition" />
              <div className="relative">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-600 text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mt-4 text-lg">{s.title}</h3>
                <p className="text-sm text-[rgb(var(--muted))] mt-2 leading-relaxed">{s.body}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <section className="mt-20 max-w-3xl mx-auto">
        <SectionHeading title={t('services.faqTitle')} align="center" />
        <div className="space-y-2">
          {dict.services.faqs.map((f: any, i: number) => {
            const isOpen = open === i;
            return (
              <div key={i} className="card overflow-hidden">
                <button onClick={() => setOpen(isOpen ? null : i)} className="w-full flex items-center justify-between gap-3 p-4 text-start">
                  <span className="font-medium">{f.q}</span>
                  <ChevronDown className={`h-5 w-5 transition ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                      <p className="px-4 pb-4 text-sm text-[rgb(var(--muted))] leading-relaxed">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
