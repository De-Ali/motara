'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, ArrowRight, Sparkles } from 'lucide-react';
import { useAdminAuth } from '@/lib/admin-auth';

export default function AdminLoginPage() {
  const { user, loading, signIn } = useAdminAuth();
  const router = useRouter();
  const [u, setU] = useState('admin');
  const [p, setP] = useState('motara');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) router.replace('/admin');
  }, [loading, user, router]);

  const submit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    setErr(''); setBusy(true);
    const ok = await signIn(u, p);
    setBusy(false);
    if (ok) router.replace('/admin');
    else setErr('Enter any username and password to continue (mock auth).');
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-brand-50 via-[rgb(var(--bg))] to-accent-50 dark:from-brand-900 dark:via-[rgb(var(--bg))] dark:to-brand-800 p-6">
      <div className="card w-full max-w-md p-8 relative overflow-hidden">
        <div aria-hidden className="absolute -top-20 -end-16 h-48 w-48 rounded-full bg-accent-500/15 blur-3xl" />
        <div className="relative">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-600 text-white"><Lock className="h-5 w-5" /></div>
          <h1 className="heading-3 mt-5">Motara Admin</h1>
          <p className="text-sm text-[rgb(var(--muted))] mt-1.5">Sign in to manage inventory, leads, and analytics.</p>

          <div className="mt-4 chip">
            <Sparkles className="h-3 w-3" /> Mock auth — any credentials work
          </div>

          <form onSubmit={submit} className="mt-6 space-y-3">
            <div>
              <label className="label">Username</label>
              <input className="input" value={u} onChange={(e) => setU(e.target.value)} autoComplete="username" />
            </div>
            <div>
              <label className="label">Password</label>
              <input type="password" className="input" value={p} onChange={(e) => setP(e.target.value)} autoComplete="current-password" />
            </div>
            {err && <p className="text-xs text-danger">{err}</p>}
            <button type="submit" disabled={busy} className="btn-accent w-full gap-2">
              {busy ? 'Signing in…' : (<>Sign in <ArrowRight className="h-4 w-4 rtl-flip" /></>)}
            </button>
          </form>

          <Link href="/" className="mt-6 block text-center text-xs text-[rgb(var(--muted))] hover:text-accent-500">
            ← Back to public site
          </Link>
        </div>
      </div>
    </div>
  );
}
