'use client';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/lib/theme';

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button type="button" onClick={toggle} aria-label="Toggle theme" className="btn-ghost p-2.5">
      {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}
