'use client';
import { useState } from 'react';
import { Mail, MapPin, Phone, Clock, Send, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';
import { useSettings } from '@/lib/settings';
import { useLeads } from '@/lib/leads-store';

export default function ContactPage() {
  const { t, locale } = useI18n();
  const { settings } = useSettings();
  const { add } = useLeads();
  const [done, setDone] = useState(false);
  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    add({
      name: String(fd.get('name') ?? 'Anonymous'),
      phone: String(fd.get('phone') ?? ''),
      channel: 'Form',
      carName: String(fd.get('subject') ?? 'General inquiry'),
      message: String(fd.get('message') ?? '')
    });
    await new Promise((r) => setTimeout(r, 400));
    setDone(true);
    setTimeout(() => setDone(false), 4000);
    (e.currentTarget as HTMLFormElement).reset();
  };

  return (
    <div className="container-app py-12">
      <div className="grid gap-10 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
          <span className="chip mb-4">{t('nav.contact')}</span>
          <h1 className="heading-1 text-balance">{t('contact.title')}</h1>
          <p className="lead mt-4">{t('contact.subtitle')}</p>

          <ul className="mt-8 space-y-3">
            <li className="card p-4 flex gap-3 items-start">
              <MapPin className="h-5 w-5 text-accent-500 shrink-0" />
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[rgb(var(--muted))]">{t('contact.address')}</div>
                <div className="font-medium">{locale === 'ar' ? settings.addressAr : settings.addressEn}</div>
              </div>
            </li>
            <li className="card p-4 flex gap-3 items-start">
              <Phone className="h-5 w-5 text-accent-500 shrink-0" />
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[rgb(var(--muted))]">{t('contact.phone')}</div>
                <a href={`tel:${settings.phone}`} className="font-medium hover:text-accent-500">{settings.phone}</a>
              </div>
            </li>
            <li className="card p-4 flex gap-3 items-start">
              <Mail className="h-5 w-5 text-accent-500 shrink-0" />
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[rgb(var(--muted))]">{t('contact.email')}</div>
                <a href={`mailto:${settings.email}`} className="font-medium hover:text-accent-500">{settings.email}</a>
              </div>
            </li>
            <li className="card p-4 flex gap-3 items-start">
              <Clock className="h-5 w-5 text-accent-500 shrink-0" />
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[rgb(var(--muted))]">{t('contact.hours')}</div>
                <div className="font-medium text-sm">{locale === 'ar' ? settings.hoursAr : settings.hoursEn}</div>
              </div>
            </li>
          </ul>

          <div className="mt-6 card overflow-hidden aspect-[16/9]">
            <iframe
              title="Map"
              src="https://maps.google.com/maps?q=Al%20Khuwair%2C%20Muscat&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="h-full w-full border-0"
              loading="lazy"
            />
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          onSubmit={onSubmit}
          className="card p-6 h-fit lg:sticky lg:top-24"
        >
          <h2 className="heading-3">{t('contact.formTitle')}</h2>
          <div className="mt-5 space-y-3">
            <div>
              <label className="label">{t('common.name')}</label>
              <input name="name" required className="input" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">{t('common.phone')}</label>
                <input name="phone" required className="input" />
              </div>
              <div>
                <label className="label">{t('common.email')}</label>
                <input name="email" type="email" className="input" />
              </div>
            </div>
            <div>
              <label className="label">{t('contact.subjectPh')}</label>
              <input name="subject" className="input" />
            </div>
            <div>
              <label className="label">{t('common.message')}</label>
              <textarea name="message" required className="input min-h-[120px]" placeholder={t('contact.messagePh')} />
            </div>
            <button type="submit" className="btn-accent w-full gap-2">
              {done ? <><CheckCircle2 className="h-4 w-4" /> {t('testDrive.successTitle')}</> : <><Send className="h-4 w-4" /> {t('contact.send')}</>}
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
