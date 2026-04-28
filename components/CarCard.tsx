'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Fuel, Gauge, Heart, Settings2, Calendar, GitCompareArrows } from 'lucide-react';
import type { Car } from '@/lib/types';
import { useI18n } from '@/lib/i18n';
import { useStore } from '@/lib/store';
import { useToast } from '@/lib/toast';
import { cn, formatKm, formatOMR } from '@/lib/utils';
import Badge from './Badge';

export default function CarCard({ car, index = 0 }: { car: Car; index?: number }) {
  const { locale, t } = useI18n();
  const { isFav, toggleFav, isComparing, toggleCompare } = useStore();
  const toast = useToast();

  const onFav: React.MouseEventHandler = (e) => {
    e.preventDefault();
    const r = toggleFav(car.id);
    toast.show(t(r === 'added' ? 'toast.saved' : 'toast.removed'));
  };
  const onCompare: React.MouseEventHandler = (e) => {
    e.preventDefault();
    const r = toggleCompare(car.id);
    toast.show(t(r === 'max' ? 'toast.compareMax' : r === 'added' ? 'toast.added' : 'toast.removed'));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.3) }}
      className="group"
    >
      <Link href={`/cars/${car.slug}`} className="card flex flex-col h-full overflow-hidden hover:-translate-y-1 hover:shadow-soft transition-all">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={car.images[0]}
            alt={`${car.year} ${car.make} ${car.model}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 to-transparent" />

          <div className="absolute top-3 start-3 flex flex-wrap gap-1.5 max-w-[75%]">
            {car.badges.slice(0, 2).map((b) => <Badge key={b} kind={b} />)}
          </div>

          <div className="absolute top-3 end-3 flex gap-1.5">
            <button
              type="button"
              onClick={onFav}
              aria-label={t('common.save')}
              className={cn('grid h-9 w-9 place-items-center rounded-full backdrop-blur-md transition',
                isFav(car.id) ? 'bg-accent-500 text-white' : 'bg-white/80 text-brand-700 hover:bg-white')}
            >
              <Heart className={cn('h-4 w-4', isFav(car.id) && 'fill-current')} />
            </button>
            <button
              type="button"
              onClick={onCompare}
              aria-label={t('common.compare')}
              className={cn('grid h-9 w-9 place-items-center rounded-full backdrop-blur-md transition',
                isComparing(car.id) ? 'bg-brand-600 text-white' : 'bg-white/80 text-brand-700 hover:bg-white')}
            >
              <GitCompareArrows className="h-4 w-4" />
            </button>
          </div>

          {car.status === 'Sold' && (
            <span className="absolute bottom-3 start-3 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-semibold uppercase text-white">
              {t('common.sold')}
            </span>
          )}
          {car.status === 'Reserved' && (
            <span className="absolute bottom-3 start-3 rounded-full bg-warn px-2.5 py-1 text-[11px] font-semibold uppercase text-white">
              {t('common.reserved')}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3 p-4">
          <div>
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="font-semibold leading-tight">
                {car.year} {car.make} {car.model}
              </h3>
              <span className="text-xs text-[rgb(var(--muted))]">{car.trim}</span>
            </div>
            <p className="text-xs text-[rgb(var(--muted))] mt-0.5">{car.origin[locale]}</p>
          </div>

          <ul className="grid grid-cols-3 gap-1 text-[11px] text-[rgb(var(--muted))]">
            <li className="flex items-center gap-1"><Gauge className="h-3 w-3" />{formatKm(car.mileageKm, locale)}</li>
            <li className="flex items-center gap-1"><Fuel className="h-3 w-3" />{car.fuel}</li>
            <li className="flex items-center gap-1"><Settings2 className="h-3 w-3" />{car.transmission}</li>
            <li className="flex items-center gap-1"><Calendar className="h-3 w-3" />{car.year}</li>
            <li className="col-span-2 truncate">{car.color[locale]}</li>
          </ul>

          <div className="mt-auto flex items-end justify-between pt-1">
            <span className="text-xl font-bold tracking-tight text-brand-700 dark:text-brand-100">{formatOMR(car.priceOMR, locale)}</span>
            <span className="text-[11px] uppercase text-accent-600 font-semibold">{t('common.viewDetails')} →</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
