'use client';
import { whatsappLink } from '@/lib/utils';
import { useI18n } from '@/lib/i18n';
import { useSettings } from '@/lib/settings';
import { motion } from 'framer-motion';

export default function WhatsAppFAB() {
  const { locale } = useI18n();
  const { settings } = useSettings();
  const msg = locale === 'ar'
    ? 'مرحبًا مطرة، أرغب بمعرفة المزيد عن سياراتكم.'
    : "Hi Motara, I'd like to know more about your cars.";
  const href = whatsappLink(settings.whatsapp, msg);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
      className="fixed bottom-5 end-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-soft hover:scale-105 transition active:scale-95"
    >
      <span className="absolute inset-0 -z-10 rounded-full bg-[#25D366] opacity-50 animate-pulse-ring" />
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
        <path d="M20.5 3.5A11.94 11.94 0 0 0 12.05 0C5.45 0 .12 5.32.12 11.92a11.83 11.83 0 0 0 1.69 6.13L0 24l6.18-1.62a11.92 11.92 0 0 0 5.86 1.49h.01c6.6 0 11.93-5.32 11.93-11.92 0-3.18-1.24-6.18-3.48-8.45zm-8.45 18.34h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.66.96.98-3.57-.24-.37a9.83 9.83 0 0 1-1.51-5.27c0-5.46 4.45-9.91 9.92-9.91a9.86 9.86 0 0 1 7.02 2.91 9.86 9.86 0 0 1 2.9 7.02c-.01 5.46-4.46 9.82-9.99 9.82zm5.43-7.4c-.3-.15-1.76-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.34.22-.64.07-.3-.15-1.27-.47-2.41-1.49-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.51-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.51.07-.78.37-.27.3-1.03 1-1.03 2.45s1.05 2.84 1.2 3.04c.15.2 2.07 3.16 5.02 4.43.7.3 1.25.48 1.68.62.7.22 1.34.19 1.84.12.56-.08 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z"/>
      </svg>
    </motion.a>
  );
}
