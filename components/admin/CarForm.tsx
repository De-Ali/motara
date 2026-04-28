'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save, X, Plus } from 'lucide-react';
import { useAdminStore } from '@/lib/admin-store';
import { useToast } from '@/lib/toast';
import { buildInspection, inspectionScore } from '@/data/inspection-template';
import type { Car, InspectionCategory, RepairStage } from '@/lib/types';
import PhotoDropzone from './PhotoDropzone';
import InspectionEditor from './InspectionEditor';
import TimelineEditor from './TimelineEditor';

const schema = z.object({
  make: z.string().min(2),
  model: z.string().min(1),
  trim: z.string().optional(),
  year: z.coerce.number().int().min(2000).max(2030),
  priceOMR: z.coerce.number().min(500),
  mileageKm: z.coerce.number().min(0),
  fuel: z.enum(['Petrol', 'Diesel', 'Hybrid', 'Electric']),
  transmission: z.enum(['Automatic', 'Manual']),
  bodyType: z.enum(['Sedan', 'SUV', 'Hatchback', 'Pickup', 'Coupe']),
  colorEn: z.string().min(2),
  colorAr: z.string().min(1),
  seats: z.coerce.number().min(2).max(9),
  engine: z.string().min(2),
  originEn: z.string().min(2),
  originAr: z.string().min(1),
  warrantyMonths: z.coerce.number().refine((v) => [3, 6, 12].includes(v)),
  status: z.enum(['Available', 'Reserved', 'Sold']),
  descEn: z.string().min(10),
  descAr: z.string().min(5)
});

type FormData = z.infer<typeof schema>;

const STAGES = [
  { id: 1, title: 'Basics' },
  { id: 2, title: 'Specs & origin' },
  { id: 3, title: 'Photos' },
  { id: 4, title: '50-pt inspection' },
  { id: 5, title: 'Repair timeline' },
  { id: 6, title: 'Description & publish' }
];

const slugify = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export default function CarForm({ initial }: { initial?: Car }) {
  const router = useRouter();
  const { upsert } = useAdminStore();
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [photos, setPhotos] = useState<string[]>(initial?.images ?? []);
  const [features, setFeatures] = useState<{ en: string; ar: string }[]>(initial?.features ?? [
    { en: 'Cruise control', ar: 'مثبت سرعة' },
    { en: 'Bluetooth', ar: 'بلوتوث' }
  ]);
  const [inspection, setInspection] = useState<InspectionCategory[]>(initial?.inspection.categories ?? buildInspection(0));
  const [timeline, setTimeline] = useState<RepairStage[]>(initial?.repairTimeline ?? []);
  const [featEn, setFeatEn] = useState('');
  const [featAr, setFeatAr] = useState('');

  const { register, handleSubmit, formState: { errors }, trigger } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initial
      ? {
          make: initial.make, model: initial.model, trim: initial.trim,
          year: initial.year, priceOMR: initial.priceOMR, mileageKm: initial.mileageKm,
          fuel: initial.fuel, transmission: initial.transmission, bodyType: initial.bodyType,
          colorEn: initial.color.en, colorAr: initial.color.ar,
          seats: initial.seats, engine: initial.engine,
          originEn: initial.origin.en, originAr: initial.origin.ar,
          warrantyMonths: initial.warrantyMonths, status: initial.status,
          descEn: initial.description.en, descAr: initial.description.ar
        }
      : {
          make: '', model: '', trim: '',
          year: 2022, priceOMR: 7500, mileageKm: 50000,
          fuel: 'Petrol', transmission: 'Automatic', bodyType: 'SUV',
          colorEn: 'Pearl White', colorAr: 'أبيض لؤلؤي',
          seats: 5, engine: '2.5L 4-cyl',
          originEn: 'GCC Specs', originAr: 'مواصفات خليجية',
          warrantyMonths: 6, status: 'Available',
          descEn: '', descAr: ''
        }
  });

  const next = async () => {
    const fields: (keyof FormData)[][] = [
      ['make', 'model', 'year', 'priceOMR', 'status'],
      ['mileageKm', 'fuel', 'transmission', 'bodyType', 'colorEn', 'colorAr', 'seats', 'engine', 'originEn', 'originAr', 'warrantyMonths'],
      [],
      [],
      [],
      ['descEn', 'descAr']
    ];
    const ok = await trigger(fields[step - 1]);
    if (step === 3 && photos.length < 3) { toast.show('Add at least 3 photos'); return; }
    if (ok) setStep((s) => Math.min(s + 1, STAGES.length));
  };

  const addFeature = () => {
    if (!featEn.trim() || !featAr.trim()) return;
    setFeatures((f) => [...f, { en: featEn.trim(), ar: featAr.trim() }]);
    setFeatEn(''); setFeatAr('');
  };
  const removeFeature = (i: number) => setFeatures((f) => f.filter((_, idx) => idx !== i));

  const onSubmit = handleSubmit((d) => {
    if (photos.length < 3) {
      toast.show('Add at least 3 photos');
      setStep(3);
      return;
    }
    const id = initial?.id ?? `c-${Date.now()}`;
    const slug = initial?.slug ?? `${slugify(`${d.year} ${d.make} ${d.model} ${d.trim ?? ''}`)}-${id.slice(-4)}`;
    const car: Car = {
      id,
      slug,
      make: d.make, model: d.model, trim: d.trim,
      year: d.year, priceOMR: d.priceOMR, mileageKm: d.mileageKm,
      fuel: d.fuel, transmission: d.transmission, bodyType: d.bodyType,
      color: { en: d.colorEn, ar: d.colorAr },
      seats: d.seats, engine: d.engine,
      origin: { en: d.originEn, ar: d.originAr },
      warrantyMonths: d.warrantyMonths as 3 | 6 | 12,
      status: d.status,
      badges: initial?.badges ?? ['Motara Verified', 'New Arrival'],
      images: photos,
      inspection: {
        score: inspectionScore(inspection),
        inspectorName: initial?.inspection.inspectorName ?? 'Eng. Yusuf Al-Habsi',
        inspectedAt: initial?.inspection.inspectedAt ?? new Date().toISOString().slice(0, 10),
        categories: inspection
      },
      repairTimeline: timeline,
      features,
      description: { en: d.descEn, ar: d.descAr },
      inquiriesThisWeek: initial?.inquiriesThisWeek ?? 0,
      location: initial?.location ?? { en: 'Al Khuwair Showroom · Muscat', ar: 'معرض الخوير · مسقط' }
    };
    upsert(car);
    toast.show(initial ? 'Car updated' : 'Car published');
    router.push('/admin/cars');
  });

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <ol className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
        {STAGES.map((s) => {
          const active = step === s.id;
          const done = step > s.id;
          return (
            <li key={s.id} className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setStep(s.id)}
                className={`grid h-8 w-8 place-items-center rounded-full text-xs font-bold transition ${
                  done ? 'bg-success text-white' : active ? 'bg-brand-600 text-white' : 'bg-[rgb(var(--border))] text-[rgb(var(--muted))]'
                }`}
                aria-current={active ? 'step' : undefined}
              >
                {s.id}
              </button>
              <span className={`text-xs whitespace-nowrap ${active ? 'font-semibold' : 'text-[rgb(var(--muted))]'}`}>{s.title}</span>
              {s.id < STAGES.length && <div className="w-6 h-px bg-[rgb(var(--border))] mx-1" />}
            </li>
          );
        })}
      </ol>

      {step === 1 && (
        <section className="card p-6 space-y-4">
          <h2 className="font-semibold">Basics</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Make" error={errors.make?.message}><input className="input" {...register('make')} placeholder="Toyota" /></Field>
            <Field label="Model" error={errors.model?.message}><input className="input" {...register('model')} placeholder="Camry" /></Field>
            <Field label="Trim"><input className="input" {...register('trim')} placeholder="Grande" /></Field>
            <Field label="Year" error={errors.year?.message}><input type="number" className="input" {...register('year')} /></Field>
            <Field label="Price (OMR)" error={errors.priceOMR?.message}><input type="number" className="input" {...register('priceOMR')} /></Field>
            <Field label="Status">
              <select className="input" {...register('status')}>
                <option>Available</option><option>Reserved</option><option>Sold</option>
              </select>
            </Field>
          </div>
        </section>
      )}

      {step === 2 && (
        <section className="card p-6 space-y-4">
          <h2 className="font-semibold">Specs & origin</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Mileage (km)" error={errors.mileageKm?.message}><input type="number" className="input" {...register('mileageKm')} /></Field>
            <Field label="Engine" error={errors.engine?.message}><input className="input" {...register('engine')} /></Field>
            <Field label="Fuel"><select className="input" {...register('fuel')}><option>Petrol</option><option>Diesel</option><option>Hybrid</option><option>Electric</option></select></Field>
            <Field label="Transmission"><select className="input" {...register('transmission')}><option>Automatic</option><option>Manual</option></select></Field>
            <Field label="Body type"><select className="input" {...register('bodyType')}><option>SUV</option><option>Sedan</option><option>Hatchback</option><option>Pickup</option><option>Coupe</option></select></Field>
            <Field label="Seats"><input type="number" className="input" {...register('seats')} /></Field>
            <Field label="Color (EN)" error={errors.colorEn?.message}><input className="input" {...register('colorEn')} /></Field>
            <Field label="Color (AR)" error={errors.colorAr?.message}><input className="input" {...register('colorAr')} dir="rtl" /></Field>
            <Field label="Origin (EN)"><input className="input" {...register('originEn')} /></Field>
            <Field label="Origin (AR)"><input className="input" {...register('originAr')} dir="rtl" /></Field>
            <Field label="Warranty (months)">
              <select className="input" {...register('warrantyMonths')}>
                <option value={3}>3 months</option><option value={6}>6 months</option><option value={12}>12 months</option>
              </select>
            </Field>
          </div>

          <div className="pt-3 border-t border-[rgb(var(--border))]">
            <div className="text-xs uppercase tracking-wider text-[rgb(var(--muted))] mb-2">Features</div>
            <div className="flex flex-wrap gap-2 mb-3">
              {features.map((f, i) => (
                <span key={i} className="chip gap-1.5">
                  {f.en} · {f.ar}
                  <button type="button" onClick={() => removeFeature(i)} aria-label="Remove"><X className="h-3 w-3" /></button>
                </span>
              ))}
            </div>
            <div className="grid grid-cols-[1fr_1fr_auto] gap-2">
              <input value={featEn} onChange={(e) => setFeatEn(e.target.value)} className="input" placeholder="Feature (EN)" />
              <input value={featAr} onChange={(e) => setFeatAr(e.target.value)} className="input" placeholder="ميزة (AR)" dir="rtl" />
              <button type="button" onClick={addFeature} className="btn-outline gap-1"><Plus className="h-4 w-4" /></button>
            </div>
          </div>
        </section>
      )}

      {step === 3 && (
        <section className="space-y-3">
          <h2 className="font-semibold">Photos</h2>
          <p className="text-xs text-[rgb(var(--muted))]">Drag to reorder. First photo is the cover. Min 3, recommended 10+.</p>
          <PhotoDropzone photos={photos} onChange={setPhotos} min={3} />
        </section>
      )}

      {step === 4 && (
        <section className="space-y-3">
          <h2 className="font-semibold">50-point inspection</h2>
          <p className="text-xs text-[rgb(var(--muted))]">Tag each item Pass / Repaired / Note. Repaired items get a note. Score auto-calculates.</p>
          <InspectionEditor categories={inspection} onChange={setInspection} />
        </section>
      )}

      {step === 5 && (
        <section className="space-y-3">
          <h2 className="font-semibold">Repair timeline</h2>
          <p className="text-xs text-[rgb(var(--muted))]">Document the journey: arrival → diagnosis → repair → final. Photos build trust.</p>
          <TimelineEditor stages={timeline} onChange={setTimeline} />
        </section>
      )}

      {step === 6 && (
        <section className="card p-6 space-y-4">
          <h2 className="font-semibold">Description & publish</h2>
          <Field label="Description (EN)" error={errors.descEn?.message}>
            <textarea className="input min-h-[120px]" {...register('descEn')} placeholder="Pristine model with full service history…" />
          </Field>
          <Field label="Description (AR)" error={errors.descAr?.message}>
            <textarea className="input min-h-[120px]" {...register('descAr')} placeholder="حالة ممتازة، صيانة كاملة لدى الوكالة…" dir="rtl" />
          </Field>

          <div className="rounded-xl bg-brand-50 dark:bg-brand-900/30 p-4 text-xs text-brand-800 dark:text-brand-100">
            <strong className="block mb-1">Ready to publish?</strong>
            {photos.length} photos · {inspection.reduce((s, c) => s + c.items.length, 0)} inspection items · {timeline.length} repair stage{timeline.length === 1 ? '' : 's'}.
          </div>
        </section>
      )}

      <div className="flex items-center justify-between gap-3">
        <button type="button" onClick={() => setStep((s) => Math.max(1, s - 1))} disabled={step === 1} className="btn-ghost">Back</button>
        {step < STAGES.length ? (
          <button type="button" onClick={next} className="btn-primary">Continue</button>
        ) : (
          <button type="submit" className="btn-accent gap-2"><Save className="h-4 w-4" /> {initial ? 'Save changes' : 'Publish car'}</button>
        )}
      </div>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      {children}
      {error && <span className="text-xs text-danger mt-1 block">{error}</span>}
    </label>
  );
}
