'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Download, X, Smartphone } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

type BIPEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

const KEY = 'motara.install.dismissed';

export default function InstallPrompt() {
  const { t, locale } = useI18n();
  const [evt, setEvt] = useState<BIPEvent | null>(null);
  const [show, setShow] = useState(false);
  const [iOSHint, setIOSHint] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const dismissed = localStorage.getItem(KEY);
    if (dismissed === '1') return;

    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;
    if (standalone) return;

    // iOS Safari has no beforeinstallprompt — show manual hint
    const ua = window.navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(ua) && !(window.navigator as any).standalone;
    if (isIOS) {
      const t = setTimeout(() => { setIOSHint(true); setShow(true); }, 8000);
      return () => clearTimeout(t);
    }

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setEvt(e as BIPEvent);
      setTimeout(() => setShow(true), 4000);
    };
    window.addEventListener('beforeinstallprompt', onPrompt);
    return () => window.removeEventListener('beforeinstallprompt', onPrompt);
  }, []);

  const dismiss = () => {
    localStorage.setItem(KEY, '1');
    setShow(false);
  };

  const install = async () => {
    if (!evt) return;
    await evt.prompt();
    await evt.userChoice;
    setEvt(null);
    setShow(false);
    localStorage.setItem(KEY, '1');
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 240, damping: 24 }}
          className="lg:hidden fixed inset-x-3 bottom-[calc(5.5rem+env(safe-area-inset-bottom))] z-40 max-w-md mx-auto"
          role="dialog" aria-live="polite"
        >
          <div className="card p-4 flex items-start gap-3 shadow-soft">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent-500 text-white shrink-0">
              {iOSHint ? <Smartphone className="h-5 w-5" /> : <Download className="h-5 w-5" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold">
                {locale === 'ar' ? 'ثبّت تطبيق مطرة' : 'Install Motara Auto'}
              </div>
              <p className="text-xs text-[rgb(var(--muted))] mt-0.5">
                {iOSHint
                  ? (locale === 'ar' ? 'افتح القائمة ← أضف إلى الشاشة الرئيسية' : 'Tap Share → "Add to Home Screen"')
                  : (locale === 'ar' ? 'تجربة أسرع، تعمل بدون اتصال، إشعارات فورية.' : 'Faster, offline-ready, native feel.')
                }
              </p>
              {!iOSHint && (
                <button onClick={install} className="btn-accent mt-2 !py-1.5 !px-3 text-xs">
                  {locale === 'ar' ? 'تثبيت' : 'Install'}
                </button>
              )}
            </div>
            <button onClick={dismiss} aria-label="Dismiss" className="btn-ghost p-1.5 shrink-0">
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
