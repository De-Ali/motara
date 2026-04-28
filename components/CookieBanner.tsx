'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/lib/i18n';

export default function CookieBanner() {
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem('motara.cookies');
    if (!seen) setTimeout(() => setVisible(true), 1200);
  }, []);

  const dismiss = (choice: 'accept' | 'decline') => {
    localStorage.setItem('motara.cookies', choice);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-3 inset-x-3 sm:inset-x-auto sm:start-5 z-[60] max-w-md card p-4 shadow-soft"
          role="dialog" aria-live="polite"
        >
          <p className="text-xs leading-relaxed text-[rgb(var(--muted))]">{t('cookie.body')}</p>
          <div className="mt-3 flex gap-2">
            <button onClick={() => dismiss('accept')} className="btn-primary !py-1.5 !px-4 text-xs">{t('cookie.accept')}</button>
            <button onClick={() => dismiss('decline')} className="btn-ghost !py-1.5 !px-4 text-xs">{t('cookie.decline')}</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
