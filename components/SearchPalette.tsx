'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, X, ArrowRight, Compass, Heart, GitCompareArrows, FileText, Phone, Wrench, BadgeCheck } from 'lucide-react';
import { useAdminStore } from '@/lib/admin-store';
import { useI18n } from '@/lib/i18n';
import { posts } from '@/data/blog';
import { formatOMR, cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

type Result =
  | { type: 'car'; id: string; slug: string; title: string; subtitle: string; price: number; image: string }
  | { type: 'page'; href: string; title: string; subtitle: string; icon: React.ComponentType<{ className?: string }> }
  | { type: 'post'; slug: string; title: string; subtitle: string };

const PAGES = [
  { href: '/cars',      title: 'Browse cars',     subtitle: 'All inventory',           icon: Compass },
  { href: '/compare',   title: 'Compare cars',    subtitle: 'Side-by-side',            icon: GitCompareArrows },
  { href: '/favorites', title: 'Favorites',       subtitle: 'Saved cars',              icon: Heart },
  { href: '/services',  title: 'Services',        subtitle: 'Import · Repair · Warranty', icon: Wrench },
  { href: '/about',     title: 'About Motara',    subtitle: 'Story, team, certifications', icon: BadgeCheck },
  { href: '/contact',   title: 'Contact',         subtitle: 'WhatsApp · Phone · Map',  icon: Phone },
  { href: '/blog',      title: 'Blog',            subtitle: 'Buying guides & tips',    icon: FileText }
];

export default function SearchPalette() {
  const { cars } = useAdminStore();
  const { locale } = useI18n();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Open via custom event or shortcut
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === 'Escape' && open) setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener('motara:open-search', onOpen as EventListener);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('motara:open-search', onOpen as EventListener);
    };
  }, [open]);

  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 50); else { setQ(''); setActive(0); } }, [open]);

  const results = useMemo<Result[]>(() => {
    const t = q.trim().toLowerCase();
    const carResults: Result[] = cars
      .filter((c) => {
        if (!t) return true;
        return (
          `${c.year} ${c.make} ${c.model} ${c.trim ?? ''}`.toLowerCase().includes(t) ||
          c.bodyType.toLowerCase().includes(t) ||
          c.fuel.toLowerCase().includes(t) ||
          c.color[locale].toLowerCase().includes(t)
        );
      })
      .slice(0, 6)
      .map((c) => ({
        type: 'car', id: c.id, slug: c.slug,
        title: `${c.year} ${c.make} ${c.model}${c.trim ? ' · ' + c.trim : ''}`,
        subtitle: `${c.bodyType} · ${c.fuel} · ${c.color[locale]}`,
        price: c.priceOMR, image: c.images[0]
      }));

    const pageResults: Result[] = PAGES
      .filter((p) => !t || p.title.toLowerCase().includes(t) || p.subtitle.toLowerCase().includes(t))
      .map((p) => ({ type: 'page', ...p }));

    const postResults: Result[] = posts
      .filter((p) => !t || p.title[locale].toLowerCase().includes(t) || p.tags.join(' ').toLowerCase().includes(t))
      .slice(0, 4)
      .map((p) => ({ type: 'post', slug: p.slug, title: p.title[locale], subtitle: p.tags.join(' · ') }));

    return [...carResults, ...pageResults, ...postResults];
  }, [q, cars, locale]);

  useEffect(() => { setActive(0); }, [q]);

  const go = (r: Result) => {
    setOpen(false);
    if (r.type === 'car') router.push(`/cars/${r.slug}`);
    else if (r.type === 'page') router.push(r.href);
    else router.push(`/blog/${r.slug}`);
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    if (e.key === 'Enter' && results[active]) { e.preventDefault(); go(results[active]); }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] grid items-start justify-center bg-black/50 backdrop-blur-sm pt-[10vh] px-4"
          onClick={() => setOpen(false)}
          onKeyDown={onKeyDown}
          role="dialog" aria-modal="true" aria-label="Search"
        >
          <motion.div
            initial={{ y: -12, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className="card w-full max-w-2xl overflow-hidden p-0"
          >
            <div className="flex items-center gap-3 border-b border-[rgb(var(--border))] px-5 py-4">
              <Search className="h-5 w-5 text-[rgb(var(--muted))]" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search cars, pages, articles…"
                className="flex-1 bg-transparent outline-none text-base"
                aria-label="Search query"
              />
              <kbd className="hidden sm:inline rounded border border-[rgb(var(--border))] px-1.5 py-0.5 text-[10px] text-[rgb(var(--muted))]">ESC</kbd>
              <button onClick={() => setOpen(false)} className="btn-ghost p-1.5" aria-label="Close"><X className="h-4 w-4" /></button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              {results.length === 0 ? (
                <div className="p-10 text-center text-sm text-[rgb(var(--muted))]">No results for &ldquo;{q}&rdquo;.</div>
              ) : (
                <ul role="listbox">
                  {results.map((r, i) => (
                    <li key={`${r.type}-${i}`} role="option" aria-selected={i === active}>
                      <button
                        type="button"
                        onMouseEnter={() => setActive(i)}
                        onClick={() => go(r)}
                        className={cn(
                          'w-full flex items-center gap-3 rounded-xl p-2 text-start transition',
                          i === active ? 'bg-brand-600/10' : 'hover:bg-black/5 dark:hover:bg-white/5'
                        )}
                      >
                        {r.type === 'car' ? (
                          <Image src={r.image} alt="" width={56} height={42} className="h-10 w-14 rounded-md object-cover shrink-0" />
                        ) : (
                          <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-600/10 text-brand-700 dark:text-brand-100 shrink-0">
                            {r.type === 'page' ? <r.icon className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
                          </span>
                        )}
                        <span className="flex-1 min-w-0">
                          <span className="block text-sm font-medium truncate">{r.title}</span>
                          <span className="block text-xs text-[rgb(var(--muted))] truncate">{r.subtitle}</span>
                        </span>
                        {r.type === 'car' && <span className="text-sm font-semibold text-accent-600 shrink-0">{formatOMR(r.price, locale)}</span>}
                        <ArrowRight className="h-4 w-4 text-[rgb(var(--muted))] rtl-flip shrink-0" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <footer className="flex items-center justify-between border-t border-[rgb(var(--border))] px-5 py-3 text-[11px] text-[rgb(var(--muted))]">
              <span>↑↓ navigate · ↵ open · esc close</span>
              <Link href="/cars" onClick={() => setOpen(false)} className="hover:text-accent-500">Browse all cars →</Link>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
