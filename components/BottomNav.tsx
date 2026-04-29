'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, Car, GitCompareArrows, Heart, MoreHorizontal } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { useStore } from '@/lib/store';
import { cn } from '@/lib/utils';

type Tab = {
  href: string;
  key: string;
  match: (p: string) => boolean;
  Icon: React.ComponentType<{ className?: string }>;
  badge?: number;
};

export default function BottomNav() {
  const { t } = useI18n();
  const { favorites, compare } = useStore();
  const rawPath = usePathname() ?? '/';
  const path = rawPath.replace(/\/+$/, '') || '/';

  const tabs: Tab[] = [
    { href: '/',          key: 'nav.home',      match: (p) => p === '/',                                  Icon: Home },
    { href: '/cars',      key: 'nav.cars',      match: (p) => p === '/cars' || p.startsWith('/cars/'),    Icon: Car },
    { href: '/compare',   key: 'nav.compare',   match: (p) => p === '/compare',                            Icon: GitCompareArrows, badge: compare.length || undefined },
    { href: '/favorites', key: 'nav.favorites', match: (p) => p === '/favorites',                          Icon: Heart, badge: favorites.length || undefined },
    { href: '/contact',   key: 'nav.contact',   match: (p) => p === '/contact' || p === '/about' || p === '/services' || p === '/blog' || p.startsWith('/blog/'), Icon: MoreHorizontal }
  ];

  return (
    <nav
      aria-label="Primary"
      className="lg:hidden fixed inset-x-0 bottom-0 z-40 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 pointer-events-none"
    >
      <div className="pointer-events-auto mx-auto w-[min(calc(100%-1rem),28rem)]">
        <div className="relative grid grid-cols-5 rounded-3xl glass border border-white/40 dark:border-white/10 px-1 py-1 shadow-soft backdrop-blur-2xl">
          {tabs.map((tab) => {
            const active = tab.match(path);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                aria-current={active ? 'page' : undefined}
                className="relative grid place-items-center py-2 outline-none"
              >
                {active && (
                  <motion.span
                    layoutId="bottomnav-active"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    aria-hidden
                    className="absolute inset-1 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 shadow-soft"
                  />
                )}
                <span className={cn(
                  'relative z-10 flex flex-col items-center gap-0.5 transition-colors',
                  active ? 'text-white' : 'text-[rgb(var(--muted))] hover:text-[rgb(var(--fg))]'
                )}>
                  <span className="relative">
                    <tab.Icon className={cn('h-5 w-5 transition-transform', active && 'scale-110')} />
                    {tab.badge ? (
                      <span className={cn(
                        'absolute -top-1 -end-2 grid h-4 min-w-4 place-items-center rounded-full px-1 text-[9px] font-bold',
                        active ? 'bg-accent-400 text-white' : 'bg-accent-500 text-white'
                      )}>{tab.badge}</span>
                    ) : null}
                  </span>
                  <span className={cn('text-[10px] font-medium tracking-wide leading-none', active ? 'opacity-100' : 'opacity-80')}>
                    {t(tab.key)}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
