'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { RepairStage } from '@/lib/types';
import { useI18n } from '@/lib/i18n';

export default function RepairTimeline({ stages }: { stages: RepairStage[] }) {
  const { t, locale } = useI18n();
  return (
    <ol className="relative ms-3 border-s-2 border-dashed border-[rgb(var(--border))]">
      {stages.map((s, i) => (
        <motion.li
          key={s.stage}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06 }}
          className="ms-6 mb-8 last:mb-0"
        >
          <span className="absolute -start-3 grid h-6 w-6 place-items-center rounded-full bg-accent-500 text-white text-[10px] font-bold ring-4 ring-[rgb(var(--bg))]">
            {i + 1}
          </span>
          <div className="card p-4">
            <div className="flex items-center justify-between gap-2">
              <h4 className="font-semibold">{s.title[locale]}</h4>
              <time className="text-xs text-[rgb(var(--muted))]">{s.date}</time>
            </div>
            <p className="mt-2 text-sm text-[rgb(var(--muted))] leading-relaxed">{s.description[locale]}</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {s.photos.map((p, k) => (
                <div key={k} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Image src={p} alt={`${s.stage}-${k}`} fill className="object-cover" sizes="(max-width: 768px) 50vw, 200px" />
                </div>
              ))}
            </div>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
