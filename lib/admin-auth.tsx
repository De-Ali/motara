'use client';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

type AdminUser = { username: string; loggedAt: string };
type Ctx = {
  user: AdminUser | null;
  loading: boolean;
  signIn: (username: string, password: string) => Promise<boolean>;
  signOut: () => void;
};

const KEY = 'motara.admin.user';
const AdminAuthCtx = createContext<Ctx | null>(null);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
    setLoading(false);
  }, []);

  const signIn = useCallback(async (username: string, password: string) => {
    await new Promise((r) => setTimeout(r, 500));
    if (!username || !password) return false;
    const u: AdminUser = { username, loggedAt: new Date().toISOString() };
    localStorage.setItem(KEY, JSON.stringify(u));
    setUser(u);
    return true;
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(KEY);
    setUser(null);
  }, []);

  return <AdminAuthCtx.Provider value={{ user, loading, signIn, signOut }}>{children}</AdminAuthCtx.Provider>;
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthCtx);
  if (!ctx) throw new Error('useAdminAuth must be used inside <AdminAuthProvider>');
  return ctx;
}
