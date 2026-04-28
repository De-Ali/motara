'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Plus, Car as CarIcon, Inbox, BadgeCheck, TrendingUp, ArrowRight, Eye } from 'lucide-react';
import { useAdminStore } from '@/lib/admin-store';
import { useLeads } from '@/lib/leads-store';
import { formatOMR } from '@/lib/utils';
import { useI18n } from '@/lib/i18n';

export default function AdminDashboard() {
  const { cars } = useAdminStore();
  const { leads } = useLeads();
  const { locale } = useI18n();

  const available = cars.filter((c) => c.status === 'Available').length;
  const reserved  = cars.filter((c) => c.status === 'Reserved').length;
  const sold      = cars.filter((c) => c.status === 'Sold').length;
  const newLeads  = leads.filter((l) => l.status === 'New').length;
  const inventoryValue = cars
    .filter((c) => c.status !== 'Sold')
    .reduce((sum, c) => sum + c.priceOMR, 0);
  const avgInspection = Math.round(cars.reduce((s, c) => s + c.inspection.score, 0) / Math.max(cars.length, 1));

  const stats = [
    { label: 'Available',         value: available,                 icon: CarIcon,    tone: 'bg-success/15 text-success' },
    { label: 'Reserved',          value: reserved,                  icon: BadgeCheck, tone: 'bg-warn/15 text-warn' },
    { label: 'Sold (lifetime)',   value: sold,                      icon: TrendingUp, tone: 'bg-brand-600/15 text-brand-700 dark:text-brand-100' },
    { label: 'New leads',         value: newLeads,                  icon: Inbox,      tone: 'bg-accent-500/15 text-accent-600' }
  ];

  const recentCars = [...cars].slice(0, 5);
  const recentLeads = leads.slice(0, 5);

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="heading-2">Dashboard</h1>
          <p className="text-sm text-[rgb(var(--muted))] mt-1">Overview of inventory, leads, and performance.</p>
        </div>
        <Link href="/admin/cars/new" className="btn-accent gap-2 self-start sm:self-end">
          <Plus className="h-4 w-4" /> Add a car
        </Link>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="card p-5"
          >
            <div className={`grid h-10 w-10 place-items-center rounded-xl ${s.tone}`}>
              <s.icon className="h-5 w-5" />
            </div>
            <div className="mt-4 text-3xl font-display font-semibold">{s.value}</div>
            <div className="text-xs text-[rgb(var(--muted))] uppercase tracking-wider mt-1">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="card p-5">
          <div className="text-xs uppercase tracking-wider text-[rgb(var(--muted))]">Inventory value</div>
          <div className="text-3xl font-bold mt-1">{formatOMR(inventoryValue, locale)}</div>
          <div className="mt-3 h-2 rounded-full bg-[rgb(var(--border))] overflow-hidden">
            <div className="h-full bg-gradient-to-r from-brand-600 to-accent-500" style={{ width: '72%' }} />
          </div>
          <div className="text-xs text-[rgb(var(--muted))] mt-2">72% of monthly inventory target</div>
        </div>
        <div className="card p-5">
          <div className="text-xs uppercase tracking-wider text-[rgb(var(--muted))]">Avg inspection score</div>
          <div className="text-3xl font-bold mt-1">{avgInspection}<span className="text-sm font-normal text-[rgb(var(--muted))]"> / 100</span></div>
          <div className="mt-3 h-2 rounded-full bg-[rgb(var(--border))] overflow-hidden">
            <div className="h-full bg-success" style={{ width: `${avgInspection}%` }} />
          </div>
          <div className="text-xs text-[rgb(var(--muted))] mt-2">Across {cars.length} active listings</div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="card p-5">
          <header className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Recent inventory</h2>
            <Link href="/admin/cars" className="text-xs text-accent-600 inline-flex items-center gap-1">
              View all <ArrowRight className="h-3 w-3 rtl-flip" />
            </Link>
          </header>
          <ul className="divide-y divide-[rgb(var(--border))]">
            {recentCars.map((c) => (
              <li key={c.id} className="py-3 flex items-center gap-3">
                <Image src={c.images[0]} alt="" width={56} height={42} className="h-10 w-14 rounded-md object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{c.year} {c.make} {c.model}</div>
                  <div className="text-xs text-[rgb(var(--muted))]">{formatOMR(c.priceOMR, locale)} · {c.status}</div>
                </div>
                <Link href={`/admin/cars/${c.id}/edit`} className="btn-ghost p-2" aria-label="Edit">
                  <Eye className="h-4 w-4" />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="card p-5">
          <header className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Latest leads</h2>
            <Link href="/admin/leads" className="text-xs text-accent-600 inline-flex items-center gap-1">
              View all <ArrowRight className="h-3 w-3 rtl-flip" />
            </Link>
          </header>
          <ul className="divide-y divide-[rgb(var(--border))]">
            {recentLeads.map((l) => (
              <li key={l.id} className="py-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium truncate">{l.name}</span>
                  <span className={`badge ${
                    l.status === 'New' ? 'bg-accent-500/15 text-accent-600' :
                    l.status === 'Contacted' ? 'bg-brand-600/15 text-brand-700 dark:text-brand-100' :
                    'bg-success/15 text-success'
                  }`}>{l.status}</span>
                </div>
                <div className="text-xs text-[rgb(var(--muted))] mt-0.5">{l.channel} · {l.carName}</div>
                <p className="text-xs mt-1 line-clamp-1">{l.message}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
