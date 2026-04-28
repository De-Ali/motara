'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useI18n } from '@/lib/i18n';
import { useLeads } from '@/lib/leads-store';

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(7),
  date: z.string().min(1),
  time: z.string().min(1),
  notes: z.string().optional()
});

type FormData = z.infer<typeof schema>;

export default function TestDriveModal({
  open, onClose, carName, carSlug
}: { open: boolean; onClose: () => void; carName: string; carSlug?: string }) {
  const { t } = useI18n();
  const { add } = useLeads();
  const [done, setDone] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = handleSubmit(async (d) => {
    add({
      name: d.name,
      phone: d.phone,
      channel: 'Test Drive',
      carSlug,
      carName,
      message: `Preferred slot: ${d.date} at ${d.time}.${d.notes ? ' Notes: ' + d.notes : ''}`
    });
    await new Promise((r) => setTimeout(r, 600));
    setDone(true);
    setTimeout(() => { setDone(false); reset(); onClose(); }, 2200);
  });

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] grid place-items-center bg-black/60 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 12, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 22, stiffness: 250 }}
            onClick={(e) => e.stopPropagation()}
            className="card w-full max-w-md p-6 relative"
          >
            <button onClick={onClose} aria-label="Close" className="absolute top-3 end-3 btn-ghost p-2">
              <X className="h-4 w-4" />
            </button>

            {!done ? (
              <>
                <h3 className="heading-3">{t('testDrive.title')}</h3>
                <p className="text-sm text-[rgb(var(--muted))] mt-1">{t('testDrive.subtitle')}</p>
                <p className="mt-2 text-xs chip">{carName}</p>

                <form onSubmit={onSubmit} className="mt-5 space-y-3">
                  <div>
                    <label className="label">{t('common.name')}</label>
                    <input {...register('name')} className="input" placeholder={t('testDrive.namePh')} />
                    {errors.name && <p className="text-xs text-danger mt-1">Required</p>}
                  </div>
                  <div>
                    <label className="label">{t('common.phone')}</label>
                    <input {...register('phone')} className="input" placeholder={t('testDrive.phonePh')} />
                    {errors.phone && <p className="text-xs text-danger mt-1">Required</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="label">{t('common.date')}</label>
                      <input type="date" {...register('date')} className="input" />
                    </div>
                    <div>
                      <label className="label">{t('common.time')}</label>
                      <input type="time" {...register('time')} className="input" />
                    </div>
                  </div>
                  <div>
                    <label className="label">{t('common.message')}</label>
                    <textarea {...register('notes')} className="input min-h-[80px]" placeholder={t('testDrive.notesPh')} />
                  </div>
                  <button type="submit" disabled={isSubmitting} className="btn-accent w-full mt-1">
                    {isSubmitting ? t('common.sending') : t('testDrive.submit')}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-success/10 text-success">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h3 className="heading-3 mt-4">{t('testDrive.successTitle')}</h3>
                <p className="text-sm text-[rgb(var(--muted))] mt-2">{t('testDrive.successBody')}</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
