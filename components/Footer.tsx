'use client';
import { useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { useI18n } from '@/lib/i18n';
import { useSettings } from '@/lib/settings';
import { useToast } from '@/lib/toast';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

export default function Footer() {
  const { t, locale } = useI18n();
  const { settings } = useSettings();
  const toast = useToast();
  const [email, setEmail] = useState('');
  const address = locale === 'ar' ? settings.addressAr : settings.addressEn;

  const subscribe: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!email.includes('@')) { toast.show('Enter a valid email'); return; }
    toast.show(locale === 'ar' ? 'تم الاشتراك. شكرًا!' : "Subscribed. We'll be in touch.");
    setEmail('');
  };

  const cols = [
    {
      title: t('footer.explore'),
      links: [
        { label: t('nav.cars'),     href: '/cars' },
        { label: t('nav.compare'),  href: '/compare' },
        { label: t('nav.services'), href: '/services' },
        { label: t('nav.blog'),     href: '/blog' }
      ]
    },
    {
      title: t('footer.company'),
      links: [
        { label: t('nav.about'),    href: '/about' },
        { label: t('nav.contact'),  href: '/contact' },
        { label: t('nav.admin'),    href: '/admin' }
      ]
    },
    {
      title: t('footer.legal'),
      links: [
        { label: t('footer.privacy'), href: '#' },
        { label: t('footer.terms'),   href: '#' },
        { label: t('footer.cookie'),  href: '#' }
      ]
    }
  ];

  return (
    <footer className="border-t border-[rgb(var(--border))] bg-[rgb(var(--card))]">
      <div className="container-app py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-[rgb(var(--muted))]">{t('footer.tagline')}</p>
            <ul className="mt-6 space-y-2 text-sm">
              <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-accent-500" /><span>{address}</span></li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-accent-500" /><a href={`tel:${settings.phone}`} className="hover:underline">{settings.phone}</a></li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-accent-500" /><a href={`mailto:${settings.email}`} className="hover:underline">{settings.email}</a></li>
            </ul>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold mb-4">{col.title}</h4>
              <ul className="space-y-2 text-sm">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-[rgb(var(--muted))] hover:text-accent-500 transition">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-[1fr_auto] md:items-center rounded-2xl bg-brand-50 dark:bg-white/5 p-5">
          <div>
            <div className="text-sm font-semibold">{locale === 'ar' ? 'سيارات جديدة كل أسبوع' : 'New arrivals weekly'}</div>
            <div className="text-xs text-[rgb(var(--muted))]">{locale === 'ar' ? 'احصل على أحدث المخزون عبر البريد. لا إزعاج.' : 'Get the latest inventory by email. No spam.'}</div>
          </div>
          <form onSubmit={subscribe} className="flex gap-2">
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              required placeholder={locale === 'ar' ? 'بريدك الإلكتروني' : 'you@example.com'}
              className="input min-w-0 flex-1 md:w-72"
            />
            <button type="submit" className="btn-accent gap-1.5 shrink-0">
              <Send className="h-4 w-4" /> {locale === 'ar' ? 'اشترك' : 'Subscribe'}
            </button>
          </form>
        </div>

        <div className="divider-y mt-12" />
        <div className="mt-6 flex flex-col-reverse items-center justify-between gap-3 md:flex-row">
          <p className="text-xs text-[rgb(var(--muted))]">{t('footer.copyright')}</p>
          <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-wider text-[rgb(var(--muted))]">
            <span className="rounded-full border border-[rgb(var(--border))] px-2.5 py-1">ROP Registered</span>
            <span className="rounded-full border border-[rgb(var(--border))] px-2.5 py-1">VAT Certified</span>
            <span className="rounded-full border border-[rgb(var(--border))] px-2.5 py-1">Trade License</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
