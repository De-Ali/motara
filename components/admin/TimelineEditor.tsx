'use client';
import { useState } from 'react';
import { Plus, Trash2, X, ChevronUp, ChevronDown, Image as ImageIcon } from 'lucide-react';
import type { RepairStage } from '@/lib/types';

const STAGE_OPTIONS: { value: RepairStage['stage']; label: string }[] = [
  { value: 'received',  label: 'Received' },
  { value: 'diagnosis', label: 'Diagnosis' },
  { value: 'repair',    label: 'Repair' },
  { value: 'final',     label: 'Final inspection' }
];

export default function TimelineEditor({
  stages, onChange
}: { stages: RepairStage[]; onChange: (next: RepairStage[]) => void }) {
  const [photoInputs, setPhotoInputs] = useState<Record<number, string>>({});

  const add = () => {
    const stage: RepairStage = {
      stage: 'received',
      title: { en: 'Vehicle received', ar: 'استلام المركبة' },
      description: { en: '', ar: '' },
      date: new Date().toISOString().slice(0, 10),
      photos: []
    };
    onChange([...stages, stage]);
  };

  const update = (i: number, patch: Partial<RepairStage>) => {
    onChange(stages.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));
  };

  const remove = (i: number) => onChange(stages.filter((_, idx) => idx !== i));

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= stages.length) return;
    const next = [...stages];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  const addPhoto = (i: number) => {
    const v = (photoInputs[i] ?? '').trim();
    if (!v) return;
    update(i, { photos: [...stages[i].photos, v] });
    setPhotoInputs({ ...photoInputs, [i]: '' });
  };

  const removePhoto = (i: number, k: number) => {
    update(i, { photos: stages[i].photos.filter((_, idx) => idx !== k) });
  };

  return (
    <div className="space-y-4">
      {stages.length === 0 ? (
        <div className="card p-6 text-center">
          <p className="text-sm text-[rgb(var(--muted))]">No timeline stages yet. Document the repair journey to build buyer trust.</p>
          <button type="button" onClick={add} className="btn-accent mt-4 inline-flex gap-1.5"><Plus className="h-4 w-4" /> Add first stage</button>
        </div>
      ) : (
        <ol className="space-y-3">
          {stages.map((s, i) => (
            <li key={i} className="card p-4">
              <header className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-accent-500 text-white text-xs font-bold">{i + 1}</span>
                  <span className="text-xs uppercase tracking-wider text-[rgb(var(--muted))]">Stage {i + 1}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="btn-ghost p-2" aria-label="Move up"><ChevronUp className="h-4 w-4" /></button>
                  <button type="button" onClick={() => move(i, 1)} disabled={i === stages.length - 1} className="btn-ghost p-2" aria-label="Move down"><ChevronDown className="h-4 w-4" /></button>
                  <button type="button" onClick={() => remove(i)} className="btn-ghost p-2 text-danger" aria-label="Remove"><Trash2 className="h-4 w-4" /></button>
                </div>
              </header>

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="label">Stage type</span>
                  <select
                    className="input"
                    value={s.stage}
                    onChange={(e) => update(i, { stage: e.target.value as RepairStage['stage'] })}
                  >
                    {STAGE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </label>
                <label className="block">
                  <span className="label">Date</span>
                  <input type="date" className="input" value={s.date} onChange={(e) => update(i, { date: e.target.value })} />
                </label>
                <label className="block sm:col-span-1">
                  <span className="label">Title (EN)</span>
                  <input className="input" value={s.title.en} onChange={(e) => update(i, { title: { ...s.title, en: e.target.value } })} />
                </label>
                <label className="block sm:col-span-1">
                  <span className="label">Title (AR)</span>
                  <input className="input" dir="rtl" value={s.title.ar} onChange={(e) => update(i, { title: { ...s.title, ar: e.target.value } })} />
                </label>
                <label className="block sm:col-span-2">
                  <span className="label">Description (EN)</span>
                  <textarea className="input min-h-[70px]" value={s.description.en} onChange={(e) => update(i, { description: { ...s.description, en: e.target.value } })} />
                </label>
                <label className="block sm:col-span-2">
                  <span className="label">Description (AR)</span>
                  <textarea className="input min-h-[70px]" dir="rtl" value={s.description.ar} onChange={(e) => update(i, { description: { ...s.description, ar: e.target.value } })} />
                </label>
              </div>

              <div className="mt-3 pt-3 border-t border-[rgb(var(--border))]">
                <span className="label">Photos</span>
                {s.photos.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-2">
                    {s.photos.map((p, k) => (
                      <div key={p + k} className="relative aspect-[4/3] overflow-hidden rounded-lg border border-[rgb(var(--border))] group">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p} alt="" className="h-full w-full object-cover" />
                        <button type="button" onClick={() => removePhoto(i, k)} aria-label="Remove photo" className="absolute top-1 end-1 grid h-6 w-6 place-items-center rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition">
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="grid grid-cols-[1fr_auto] gap-2">
                  <input
                    placeholder="Image URL (or data URL)"
                    className="input"
                    value={photoInputs[i] ?? ''}
                    onChange={(e) => setPhotoInputs({ ...photoInputs, [i]: e.target.value })}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addPhoto(i); } }}
                  />
                  <button type="button" onClick={() => addPhoto(i)} className="btn-outline gap-1"><ImageIcon className="h-4 w-4" /> Add</button>
                </div>
              </div>
            </li>
          ))}
        </ol>
      )}

      {stages.length > 0 && (
        <button type="button" onClick={add} className="btn-outline gap-1.5 w-full"><Plus className="h-4 w-4" /> Add another stage</button>
      )}
    </div>
  );
}
