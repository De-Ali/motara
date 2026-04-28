'use client';
const KEY = 'motara.recents';
const MAX = 8;

export function addRecent(id: string) {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(KEY);
    const list: string[] = raw ? JSON.parse(raw) : [];
    const next = [id, ...list.filter((x) => x !== id)].slice(0, MAX);
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {}
}

export function getRecents(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}
