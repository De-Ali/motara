'use client';
import { useMemo } from 'react';
import { TrendingUp, Eye, MessageCircle, Percent } from 'lucide-react';
import { useAdminStore } from '@/lib/admin-store';
import { useI18n } from '@/lib/i18n';
import { formatOMR } from '@/lib/utils';

const visits = [120, 145, 132, 168, 210, 198, 245, 280, 265, 310, 355, 402];
const inquiries = [12, 18, 14, 22, 28, 26, 33, 38, 35, 42, 48, 56];
const months = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'];

export default function AdminAnalytics() {
  const { cars } = useAdminStore();
  const { locale } = useI18n();
  const maxV = Math.max(...visits);
  const totalVisits = visits.reduce((a, b) => a + b, 0);
  const totalInquiries = inquiries.reduce((a, b) => a + b, 0);
  const conversion = ((totalInquiries / totalVisits) * 100).toFixed(1);
  const inventoryValue = useMemo(() => cars.filter((c) => c.status !== 'Sold').reduce((s, c) => s + c.priceOMR, 0), [cars]);

  const topCars = [...cars].sort((a, b) => b.inquiriesThisWeek - a.inquiriesThisWeek).slice(0, 5);
  const maxInq = Math.max(...topCars.map((c) => c.inquiriesThisWeek), 1);

  const stats = [
    { label: 'Visits (12 mo)',     value: totalVisits.toLocaleString(),       icon: Eye,            tone: 'bg-brand-600/15 text-brand-700 dark:text-brand-100' },
    { label: 'Inquiries (12 mo)',  value: totalInquiries.toLocaleString(),    icon: MessageCircle,  tone: 'bg-accent-500/15 text-accent-600' },
    { label: 'Conversion',         value: `${conversion}%`,                   icon: Percent,        tone: 'bg-success/15 text-success' },
    { label: 'Inventory value',    value: formatOMR(inventoryValue, locale),  icon: TrendingUp,     tone: 'bg-warn/15 text-warn' }
  ];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="heading-2">Analytics</h1>
        <p className="text-sm text-[rgb(var(--muted))] mt-1">Mock data — wire up Plausible or GA4 for production.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="card p-5">
            <div className={`grid h-10 w-10 place-items-center rounded-xl ${s.tone}`}><s.icon className="h-5 w-5" /></div>
            <div className="mt-4 text-2xl font-display font-semibold">{s.value}</div>
            <div className="text-xs text-[rgb(var(--muted))] uppercase tracking-wider mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <section className="card p-6">
        <header className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-semibold">Visits & inquiries · last 12 months</h2>
            <p className="text-xs text-[rgb(var(--muted))]">Scaled chart</p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5"><span className="h-2 w-3 rounded bg-brand-600" /> Visits</span>
            <span className="inline-flex items-center gap-1.5"><span className="h-2 w-3 rounded bg-accent-500" /> Inquiries</span>
          </div>
        </header>
        <div className="flex items-end gap-2 h-48 overflow-x-auto scrollbar-none">
          {months.map((m, i) => (
            <div key={m} className="flex flex-col items-center gap-1 flex-1 min-w-[36px]">
              <div className="flex items-end gap-1 h-full w-full justify-center">
                <div className="bg-brand-600 rounded-t w-2.5 transition-all" style={{ height: `${(visits[i] / maxV) * 100}%` }} title={`${visits[i]} visits`} />
                <div className="bg-accent-500 rounded-t w-2.5 transition-all" style={{ height: `${(inquiries[i] / maxV) * 100}%` }} title={`${inquiries[i]} inquiries`} />
              </div>
              <span className="text-[10px] text-[rgb(var(--muted))] uppercase">{m}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="card p-6">
        <h2 className="font-semibold mb-4">Top inquired cars · this week</h2>
        <ul className="space-y-3">
          {topCars.map((c) => (
            <li key={c.id} className="grid grid-cols-[1fr_auto] gap-3 items-center">
              <div className="min-w-0">
                <div className="text-sm font-medium truncate">{c.year} {c.make} {c.model}</div>
                <div className="mt-1.5 h-2 rounded-full bg-[rgb(var(--border))] overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-brand-600 to-accent-500" style={{ width: `${(c.inquiriesThisWeek / maxInq) * 100}%` }} />
                </div>
              </div>
              <span className="text-sm font-bold tabular-nums">{c.inquiriesThisWeek}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
