import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatOMR(amount: number, locale: 'en' | 'ar' = 'en') {
  const fmt = new Intl.NumberFormat(locale === 'ar' ? 'ar-OM' : 'en-OM', {
    style: 'decimal',
    maximumFractionDigits: 0
  });
  return `${fmt.format(amount)} ${locale === 'ar' ? 'ر.ع' : 'OMR'}`;
}

export function formatKm(km: number, locale: 'en' | 'ar' = 'en') {
  const fmt = new Intl.NumberFormat(locale === 'ar' ? 'ar-OM' : 'en-OM');
  return `${fmt.format(km)} ${locale === 'ar' ? 'كم' : 'km'}`;
}

export function whatsappLink(phone: string, message: string) {
  const num = phone.replace(/[^0-9]/g, '');
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
}

export const MOTARA_PHONE = '+96891234567';
export const MOTARA_EMAIL = 'sales@motara-auto.om';
export const MOTARA_ADDRESS = {
  en: 'Al Khuwair, Muscat, Sultanate of Oman',
  ar: 'الخوير، مسقط، سلطنة عُمان'
};

export function pickLang<T>(obj: { en: T; ar: T }, locale: 'en' | 'ar'): T {
  return obj[locale];
}

export function relTime(iso: string, locale: 'en' | 'ar' = 'en') {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  if (diff < 60) return rtf.format(-Math.round(diff), 'second');
  if (diff < 3600) return rtf.format(-Math.round(diff / 60), 'minute');
  if (diff < 86400) return rtf.format(-Math.round(diff / 3600), 'hour');
  return rtf.format(-Math.round(diff / 86400), 'day');
}
