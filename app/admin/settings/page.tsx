'use client';
import { useState } from 'react';
import { Save, RotateCcw } from 'lucide-react';
import { useSettings, type SiteSettings } from '@/lib/settings';
import { useToast } from '@/lib/toast';

export default function AdminSettingsPage() {
  const { settings, update, reset } = useSettings();
  const toast = useToast();
  const [local, setLocal] = useState<SiteSettings>(settings);

  const set = (k: keyof SiteSettings, v: string | number) => setLocal((s) => ({ ...s, [k]: v }));

  const save = () => {
    update(local);
    toast.show('Settings saved');
  };

  const onReset = () => {
    if (!confirm('Reset all settings to defaults?')) return;
    reset();
    toast.show('Settings reset');
    setTimeout(() => location.reload(), 300);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="heading-2">Settings</h1>
          <p className="text-sm text-[rgb(var(--muted))] mt-1">Business info shown across the public site. Saved to localStorage in this preview.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onReset} className="btn-ghost gap-1.5 text-xs"><RotateCcw className="h-4 w-4" /> Reset</button>
          <button onClick={save} className="btn-accent gap-1.5"><Save className="h-4 w-4" /> Save</button>
        </div>
      </header>

      <section className="card p-6 space-y-4">
        <h2 className="font-semibold">Contact channels</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="WhatsApp number" hint="Used for the FAB and click-to-chat on every car detail.">
            <input className="input" value={local.whatsapp} onChange={(e) => set('whatsapp', e.target.value)} placeholder="+96891234567" />
          </Field>
          <Field label="Phone number">
            <input className="input" value={local.phone} onChange={(e) => set('phone', e.target.value)} />
          </Field>
          <Field label="Email">
            <input type="email" className="input" value={local.email} onChange={(e) => set('email', e.target.value)} />
          </Field>
          <Field label="Hours (EN)">
            <input className="input" value={local.hoursEn} onChange={(e) => set('hoursEn', e.target.value)} />
          </Field>
          <Field label="Hours (AR)">
            <input className="input" dir="rtl" value={local.hoursAr} onChange={(e) => set('hoursAr', e.target.value)} />
          </Field>
        </div>
      </section>

      <section className="card p-6 space-y-4">
        <h2 className="font-semibold">Showroom address</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Address (EN)"><input className="input" value={local.addressEn} onChange={(e) => set('addressEn', e.target.value)} /></Field>
          <Field label="Address (AR)"><input className="input" dir="rtl" value={local.addressAr} onChange={(e) => set('addressAr', e.target.value)} /></Field>
          <Field label="Latitude"><input type="number" step="0.0001" className="input" value={local.showroomLat} onChange={(e) => set('showroomLat', Number(e.target.value))} /></Field>
          <Field label="Longitude"><input type="number" step="0.0001" className="input" value={local.showroomLng} onChange={(e) => set('showroomLng', Number(e.target.value))} /></Field>
        </div>
      </section>

      <section className="card p-6 space-y-4">
        <h2 className="font-semibold">Compliance</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="ROP registration number"><input className="input" value={local.ropNumber} onChange={(e) => set('ropNumber', e.target.value)} /></Field>
          <Field label="VAT certificate number"><input className="input" value={local.vatNumber} onChange={(e) => set('vatNumber', e.target.value)} /></Field>
        </div>
      </section>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      {children}
      {hint && <span className="text-[11px] text-[rgb(var(--muted))] mt-1 block">{hint}</span>}
    </label>
  );
}
