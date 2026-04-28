'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, Menu, Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import Logo from './Logo';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';
import { useI18n } from '@/lib/i18n';
import { useStore } from '@/lib/store';
import { cn } from '@/lib/utils';

const links = [
  { href: '/cars', key: 'nav.cars' },
  { href: '/compare', key: 'nav.compare' },
  { href: '/services', key: 'nav.services' },
  { href: '/about', key: 'nav.about' },
  { href: '/blog', key: 'nav.blog' },
  { href: '/contact', key: 'nav.contact' }
];

export default function Header() {
  const { t } = useI18n();
  const { favorites } = useStore();
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [path]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled ? 'glass border-b border-white/30 dark:border-white/10' : 'bg-transparent'
      )}
    >
      <div className="container-app flex items-center justify-between gap-3 py-3.5">
        <div className="flex items-center gap-6">
          <Logo />
          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  'rounded-full px-3.5 py-1.5 text-sm transition-colors',
                  path?.startsWith(l.href)
                    ? 'bg-brand-600/10 text-brand-700 dark:text-brand-100'
                    : 'text-[rgb(var(--fg))] hover:bg-black/5 dark:hover:bg-white/5'
                )}
              >
                {t(l.key)}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            aria-label={t('common.search')}
            onClick={() => window.dispatchEvent(new Event('motara:open-search'))}
            className="btn-ghost gap-1.5 p-2.5"
          >
            <Search className="h-5 w-5" />
            <kbd className="hidden xl:inline rounded border border-[rgb(var(--border))] px-1.5 py-0.5 text-[10px] text-[rgb(var(--muted))]">⌘K</kbd>
          </button>
          <Link href="/favorites" aria-label={t('nav.favorites')} className="btn-ghost relative p-2.5">
            <Heart className="h-5 w-5" />
            {favorites.length > 0 && (
              <span className="absolute -top-0.5 -end-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-accent-500 px-1 text-[10px] font-bold text-white">
                {favorites.length}
              </span>
            )}
          </Link>
          <LanguageToggle />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
            className="btn-ghost p-2.5 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-[rgb(var(--border))] bg-[rgb(var(--bg))]/95 backdrop-blur-xl">
          <nav className="container-app flex flex-col py-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  'rounded-xl px-4 py-3 text-sm',
                  path?.startsWith(l.href) ? 'bg-brand-600/10 text-brand-700 dark:text-brand-100' : 'hover:bg-black/5 dark:hover:bg-white/5'
                )}
              >
                {t(l.key)}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
