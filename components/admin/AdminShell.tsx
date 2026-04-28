'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
import {
  LayoutDashboard, Car, Inbox, BarChart3, LogOut, Menu, X, ChevronLeft, ExternalLink, RefreshCw, ShieldCheck, Settings as SettingsIcon
} from 'lucide-react';
import Logo from '@/components/Logo';
import ThemeToggle from '@/components/ThemeToggle';
import { useAdminAuth } from '@/lib/admin-auth';
import { useAdminStore } from '@/lib/admin-store';
import { cn } from '@/lib/utils';

const nav = [
  { href: '/admin',           label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/cars',      label: 'Inventory', icon: Car },
  { href: '/admin/leads',     label: 'Leads',     icon: Inbox },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/admin/settings',  label: 'Settings',  icon: SettingsIcon }
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const { user, loading, signOut } = useAdminAuth();
  const { reset } = useAdminStore();
  const path = usePathname() ?? '';
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user && path !== '/admin/login') {
      window.location.assign(`${BASE}/admin/login/`);
    }
  }, [user, loading, path]);

  if (path === '/admin/login') return <>{children}</>;
  if (loading) return <div className="min-h-screen grid place-items-center text-sm text-[rgb(var(--muted))]">Loading…</div>;
  if (!user) return null;

  const Sidebar = (
    <aside className="flex flex-col h-full bg-brand-800 text-white">
      <div className="p-5 flex items-center justify-between border-b border-white/10">
        <div className="text-white"><Logo /></div>
        <button onClick={() => setOpen(false)} className="lg:hidden btn-ghost p-2 text-white" aria-label="Close menu">
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="px-4 py-3 border-b border-white/10">
        <div className="text-[10px] uppercase tracking-wider text-white/50">Signed in as</div>
        <div className="text-sm font-medium truncate">{user.username}</div>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {nav.map((n) => {
          const active = n.exact ? path === n.href : path.startsWith(n.href);
          return (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition',
                active ? 'bg-white text-brand-800 shadow-soft' : 'text-white/80 hover:bg-white/10 hover:text-white'
              )}
            >
              <n.icon className="h-4 w-4" />
              {n.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-3 space-y-1 border-t border-white/10">
        <Link href="/" target="_blank" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/80 hover:bg-white/10 hover:text-white">
          <ExternalLink className="h-4 w-4" /> View public site
        </Link>
        <button
          type="button"
          onClick={() => { if (confirm('Reset all admin changes back to seed data?')) reset(); }}
          className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/80 hover:bg-white/10 hover:text-white"
        >
          <RefreshCw className="h-4 w-4" /> Reset mock data
        </button>
        <button
          type="button"
          onClick={() => { signOut(); window.location.assign(`${BASE}/admin/login/`); }}
          className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/80 hover:bg-white/10 hover:text-white"
        >
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen grid lg:grid-cols-[260px_1fr] bg-[rgb(var(--bg))]">
      <div className="hidden lg:block sticky top-0 h-screen">{Sidebar}</div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden bg-black/50" onClick={() => setOpen(false)}>
          <div className="absolute inset-y-0 start-0 w-[80%] max-w-xs" onClick={(e) => e.stopPropagation()}>
            {Sidebar}
          </div>
        </div>
      )}

      <div className="flex flex-col min-w-0">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-[rgb(var(--border))] bg-[rgb(var(--bg))]/80 backdrop-blur px-4 sm:px-6 py-3">
          <div className="flex items-center gap-2">
            <button onClick={() => setOpen(true)} className="btn-ghost p-2 lg:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </button>
            {path !== '/admin' && (
              <Link href="/admin" className="btn-ghost p-2 hidden lg:inline-flex" aria-label="Back">
                <ChevronLeft className="h-5 w-5 rtl-flip" />
              </Link>
            )}
            <span className="chip"><ShieldCheck className="h-3 w-3" /> Admin · Phase 2 preview</span>
          </div>
          <ThemeToggle />
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
