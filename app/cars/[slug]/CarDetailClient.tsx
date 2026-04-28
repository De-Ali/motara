'use client';
import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Phone, Heart, GitCompareArrows, BadgeCheck, MapPin, Calendar, Gauge, Fuel, Settings2,
  Users, Cpu, Globe2, Shield, Award, ShieldCheck
} from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { useAdminStore } from '@/lib/admin-store';
import { useStore } from '@/lib/store';
import { useToast } from '@/lib/toast';
import { useSettings } from '@/lib/settings';
import { useLeads } from '@/lib/leads-store';
import { cn, formatKm, formatOMR, whatsappLink } from '@/lib/utils';
import Badge from '@/components/Badge';
import ImageGallery from '@/components/ImageGallery';
import InspectionReport from '@/components/InspectionReport';
import RepairTimeline from '@/components/RepairTimeline';
import TestDriveModal from '@/components/TestDriveModal';
import CarCard from '@/components/CarCard';
import ShareButton from '@/components/ShareButton';
import RecentlyViewed from '@/components/RecentlyViewed';
import VehicleSchema from '@/components/VehicleSchema';
import { addRecent } from '@/lib/recents';

type Tab = 'overview' | 'specs' | 'inspection' | 'repair' | 'warranty' | 'location';

export default function CarDetailClient() {
  const { slug } = useParams<{ slug: string }>();
  const { cars } = useAdminStore();
  const car = cars.find((c) => c.slug === slug);
  const { t, locale } = useI18n();
  const { isFav, toggleFav, isComparing, toggleCompare } = useStore();
  const toast = useToast();
  const { settings } = useSettings();
  const { add: addLead } = useLeads();
  const [tab, setTab] = useState<Tab>('overview');
  const [openTD, setOpenTD] = useState(false);

  useEffect(() => { if (car?.id) addRecent(car.id); }, [car?.id]);

  if (!car) return notFound();

  const onFav = () => {
    const r = toggleFav(car.id);
    toast.show(t(r === 'added' ? 'toast.saved' : 'toast.removed'));
  };
  const onCmp = () => {
    const r = toggleCompare(car.id);
    toast.show(t(r === 'max' ? 'toast.compareMax' : r === 'added' ? 'toast.added' : 'toast.removed'));
  };

  const carName = `${car.year} ${car.make} ${car.model}${car.trim ? ' · ' + car.trim : ''}`;
  const waMsg = locale === 'ar'
    ? `مرحبًا مطرة، أرغب بمعرفة المزيد عن ${carName}.`
    : `Hi Motara, I'd like to know more about the ${carName}.`;

  const related = cars.filter((c) => c.id !== car.id && (c.bodyType === car.bodyType || c.make === car.make)).slice(0, 4);

  const specs = [
    { icon: Calendar, label: t('common.year'),         value: String(car.year) },
    { icon: Gauge,    label: t('common.mileage'),      value: formatKm(car.mileageKm, locale) },
    { icon: Fuel,     label: t('common.fuel'),         value: car.fuel },
    { icon: Settings2,label: t('common.transmission'), value: car.transmission },
    { icon: Users,    label: t('common.seats'),        value: String(car.seats) },
    { icon: Cpu,      label: t('common.engine'),       value: car.engine },
    { icon: Globe2,   label: t('common.origin'),       value: car.origin[locale] },
    { icon: Shield,   label: t('common.warranty'),     value: `${car.warrantyMonths} ${t('common.months')}` }
  ];

  return (
    <div className="container-app pt-8 pb-16">
      <VehicleSchema car={car} />
      {/* Breadcrumb */}
      <nav className="text-xs text-[rgb(var(--muted))] mb-4">
        <Link href="/" className="hover:text-accent-500">{t('nav.home')}</Link>
        <span className="mx-2">/</span>
        <Link href="/cars" className="hover:text-accent-500">{t('nav.cars')}</Link>
        <span className="mx-2">/</span>
        <span className="text-[rgb(var(--fg))]">{carName}</span>
      </nav>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <ImageGallery images={car.images} alt={carName} />
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-1.5">{car.badges.map((b) => <Badge key={b} kind={b} />)}</div>
          <div>
            <h1 className="heading-3">{car.year} {car.make} {car.model}</h1>
            <p className="text-sm text-[rgb(var(--muted))] mt-1">{car.trim} · {car.color[locale]}</p>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-brand-700 dark:text-brand-100">{formatOMR(car.priceOMR, locale)}</span>
            <span className={cn('badge',
              car.status === 'Available' ? 'bg-success/15 text-success' :
              car.status === 'Reserved'  ? 'bg-warn/15 text-warn'      :
              'bg-danger/15 text-danger'
            )}>{t(`common.${car.status.toLowerCase()}`)}</span>
          </div>

          <div className="card p-3 flex items-center gap-2.5 bg-brand-50 dark:bg-brand-900/30 border-brand-100 dark:border-brand-800">
            <ShieldCheck className="h-4 w-4 text-brand-700 dark:text-brand-100" />
            <span className="text-xs text-brand-800 dark:text-brand-100">{t('carDetail.trustStrip')}</span>
          </div>

          <div className="text-xs text-[rgb(var(--muted))] flex items-center gap-1.5">
            <Award className="h-3.5 w-3.5 text-accent-500" />
            {t('carDetail.scarcity', { count: car.inquiriesThisWeek })}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <a href={whatsappLink(settings.whatsapp, waMsg)} target="_blank" rel="noopener noreferrer" className="btn-accent">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M20.5 3.5A11.94 11.94 0 0 0 12.05 0C5.45 0 .12 5.32.12 11.92a11.83 11.83 0 0 0 1.69 6.13L0 24l6.18-1.62a11.92 11.92 0 0 0 5.86 1.49h.01c6.6 0 11.93-5.32 11.93-11.92 0-3.18-1.24-6.18-3.48-8.45z"/></svg>
              {t('carDetail.whatsapp')}
            </a>
            <a href={`tel:${settings.phone}`} className="btn-outline">
              <Phone className="h-4 w-4" /> {t('carDetail.callNow')}
            </a>
            <button onClick={() => setOpenTD(true)} className="btn-primary col-span-2">
              {t('carDetail.bookTestDrive')}
            </button>
            <button onClick={onFav} className={cn('btn-outline', isFav(car.id) && 'bg-accent-500/10 text-accent-600 border-accent-500/30')}>
              <Heart className={cn('h-4 w-4', isFav(car.id) && 'fill-current')} />
              {isFav(car.id) ? t('common.saved') : t('common.save')}
            </button>
            <button onClick={onCmp} className={cn('btn-outline', isComparing(car.id) && 'bg-brand-600/10 text-brand-700')}>
              <GitCompareArrows className="h-4 w-4" />
              {t('common.compare')}
            </button>
            <ShareButton title={carName} text={`${carName} · ${formatOMR(car.priceOMR, locale)}`} className="col-span-2" />
          </div>

          <ul className="grid grid-cols-2 gap-2 mt-2">
            {specs.map((s) => (
              <li key={s.label} className="card p-3 flex items-center gap-2.5">
                <s.icon className="h-4 w-4 text-accent-500" />
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-wider text-[rgb(var(--muted))]">{s.label}</div>
                  <div className="text-xs font-medium truncate">{s.value}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12">
        <div className="card p-1 inline-flex gap-1 overflow-x-auto scrollbar-none max-w-full">
          {(['overview','specs','inspection','repair','warranty','location'] as Tab[]).map((k) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={cn(
                'rounded-full px-4 py-2 text-sm whitespace-nowrap transition',
                tab === k ? 'bg-brand-600 text-white' : 'hover:bg-black/5 dark:hover:bg-white/5'
              )}
            >
              {t(`carDetail.tabs${k.charAt(0).toUpperCase() + k.slice(1)}`)}
            </button>
          ))}
        </div>

        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}
          className="mt-6"
        >
          {tab === 'overview' && (
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 card p-6">
                <h3 className="heading-3 mb-3">{t('carDetail.tabsOverview')}</h3>
                <p className="text-sm leading-relaxed">{car.description[locale]}</p>
                <h4 className="font-semibold mt-6 mb-3">Features</h4>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {car.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <BadgeCheck className="h-4 w-4 text-success" /> {f[locale]}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card p-6 h-fit">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent-500 text-white">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-[rgb(var(--muted))]">{t('carDetail.inspectionScore')}</div>
                    <div className="text-2xl font-bold">{car.inspection.score}<span className="text-xs font-normal text-[rgb(var(--muted))]"> /100</span></div>
                  </div>
                </div>
                <button onClick={() => setTab('inspection')} className="btn-outline w-full text-xs">
                  {t('carDetail.tabsInspection')}
                </button>
              </div>
            </div>
          )}
          {tab === 'specs' && (
            <div className="card p-6">
              <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {specs.map((s) => (
                  <div key={s.label}>
                    <dt className="text-[10px] uppercase tracking-wider text-[rgb(var(--muted))]">{s.label}</dt>
                    <dd className="font-medium">{s.value}</dd>
                  </div>
                ))}
                <div>
                  <dt className="text-[10px] uppercase tracking-wider text-[rgb(var(--muted))]">{t('common.body')}</dt>
                  <dd className="font-medium">{car.bodyType}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-wider text-[rgb(var(--muted))]">{t('common.color')}</dt>
                  <dd className="font-medium">{car.color[locale]}</dd>
                </div>
              </dl>
            </div>
          )}
          {tab === 'inspection' && <InspectionReport report={car.inspection} />}
          {tab === 'repair' && <RepairTimeline stages={car.repairTimeline} />}
          {tab === 'warranty' && (
            <div className="card p-6">
              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-success/15 text-success">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="heading-3">{t('carDetail.warrantyTitle', { months: car.warrantyMonths })}</h3>
                  <p className="text-sm text-[rgb(var(--muted))] mt-2">{t('carDetail.warrantyCovers')}</p>
                </div>
              </div>
            </div>
          )}
          {tab === 'location' && (
            <div className="card overflow-hidden">
              <div className="aspect-[16/8] relative bg-brand-50 dark:bg-white/5">
                <iframe
                  title="Motara Showroom"
                  src="https://maps.google.com/maps?q=Al%20Khuwair%2C%20Muscat&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  className="h-full w-full border-0"
                  loading="lazy"
                />
              </div>
              <div className="p-5 flex items-center gap-3">
                <MapPin className="h-5 w-5 text-accent-500" />
                <span className="text-sm">{car.location[locale]}</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Related */}
      <section className="mt-16">
        <h3 className="heading-3 mb-6">{t('carDetail.relatedTitle')}</h3>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((c, i) => <CarCard key={c.id} car={c} index={i} />)}
        </div>
      </section>

      <RecentlyViewed excludeId={car.id} />

      <TestDriveModal open={openTD} onClose={() => setOpenTD(false)} carName={carName} carSlug={car.slug} />
    </div>
  );
}
