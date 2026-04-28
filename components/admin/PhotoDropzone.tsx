'use client';
import { useCallback, useRef, useState } from 'react';
import { Upload, GripVertical, Trash2, Star, Image as ImageIcon, Link as LinkIcon, Plus } from 'lucide-react';
import { useToast } from '@/lib/toast';
import { cn } from '@/lib/utils';

type Props = {
  photos: string[];
  onChange: (next: string[]) => void;
  min?: number;
};

export default function PhotoDropzone({ photos, onChange, min = 3 }: Props) {
  const toast = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [reorderFrom, setReorderFrom] = useState<number | null>(null);
  const [urlInput, setUrlInput] = useState('');

  const addFiles = useCallback(async (files: FileList | File[]) => {
    const list = Array.from(files).filter((f) => f.type.startsWith('image/'));
    if (list.length === 0) {
      toast.show('Drop image files only');
      return;
    }
    const dataUrls = await Promise.all(list.map((f) => new Promise<string>((res, rej) => {
      const r = new FileReader();
      r.onload = () => res(r.result as string);
      r.onerror = rej;
      r.readAsDataURL(f);
    })));
    onChange([...photos, ...dataUrls]);
    toast.show(`Added ${dataUrls.length} photo${dataUrls.length > 1 ? 's' : ''}`);
  }, [photos, onChange, toast]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
  }, [addFiles]);

  const onPick: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) addFiles(e.target.files);
    e.target.value = '';
  };

  const remove = (i: number) => onChange(photos.filter((_, idx) => idx !== i));

  const makePrimary = (i: number) => {
    if (i === 0) return;
    const next = [...photos];
    const [item] = next.splice(i, 1);
    next.unshift(item);
    onChange(next);
    toast.show('Set as primary');
  };

  const onItemDragStart = (i: number) => (e: React.DragEvent) => {
    setReorderFrom(i);
    e.dataTransfer.effectAllowed = 'move';
    try { e.dataTransfer.setData('text/plain', String(i)); } catch {}
  };
  const onItemDragOver = (i: number) => (e: React.DragEvent) => {
    if (reorderFrom === null) return;
    e.preventDefault();
    if (i === reorderFrom) return;
    const next = [...photos];
    const [item] = next.splice(reorderFrom, 1);
    next.splice(i, 0, item);
    setReorderFrom(i);
    onChange(next);
  };
  const onItemDragEnd = () => setReorderFrom(null);

  const addUrl = () => {
    const v = urlInput.trim();
    if (!v) return;
    if (!/^https?:\/\//i.test(v) && !v.startsWith('data:image/')) {
      toast.show('Enter a valid URL');
      return;
    }
    onChange([...photos, v]);
    setUrlInput('');
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click(); }}
        className={cn(
          'rounded-2xl border-2 border-dashed transition cursor-pointer p-8 text-center',
          dragOver
            ? 'border-accent-500 bg-accent-500/5'
            : 'border-[rgb(var(--border))] hover:border-accent-500/60 hover:bg-black/[0.02] dark:hover:bg-white/[0.02]'
        )}
      >
        <input ref={inputRef} type="file" accept="image/*" multiple className="sr-only" onChange={onPick} />
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-accent-500/15 text-accent-600">
          <Upload className="h-6 w-6" />
        </div>
        <p className="mt-3 text-sm font-medium">Drop photos here, or click to browse</p>
        <p className="mt-1 text-xs text-[rgb(var(--muted))]">JPG / PNG / WebP. Min {min}, recommended 10+. First photo is primary.</p>
      </div>

      <div className="grid grid-cols-[1fr_auto] gap-2">
        <div className="relative">
          <LinkIcon className="absolute top-1/2 -translate-y-1/2 start-3 h-4 w-4 text-[rgb(var(--muted))]" />
          <input
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addUrl(); } }}
            className="input ps-9"
            placeholder="…or paste an image URL"
          />
        </div>
        <button type="button" onClick={addUrl} className="btn-outline gap-1"><Plus className="h-4 w-4" /></button>
      </div>

      {photos.length === 0 ? (
        <div className="card p-6 text-center text-sm text-[rgb(var(--muted))]">
          No photos yet. Add at least {min}.
        </div>
      ) : (
        <ul className="grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {photos.map((src, i) => (
            <li
              key={src + i}
              draggable
              onDragStart={onItemDragStart(i)}
              onDragOver={onItemDragOver(i)}
              onDragEnd={onItemDragEnd}
              className={cn(
                'relative group aspect-[4/3] overflow-hidden rounded-lg border border-[rgb(var(--border))] bg-black/5',
                reorderFrom === i && 'opacity-60 ring-2 ring-accent-500'
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`Photo ${i + 1}`} className="h-full w-full object-cover" />
              <span className="absolute top-1 start-1 grid h-6 w-6 place-items-center rounded-full bg-black/60 text-white text-[10px] font-bold">{i + 1}</span>
              {i === 0 && (
                <span className="absolute bottom-1 start-1 inline-flex items-center gap-1 rounded-full bg-accent-500 px-2 py-0.5 text-[10px] font-bold text-white">
                  <Star className="h-2.5 w-2.5 fill-current" /> Primary
                </span>
              )}
              <div className="absolute inset-x-1 top-1 flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition">
                {i !== 0 && (
                  <button type="button" onClick={() => makePrimary(i)} aria-label="Make primary" title="Make primary" className="grid h-7 w-7 place-items-center rounded-full bg-black/60 text-white hover:bg-black/80">
                    <Star className="h-3.5 w-3.5" />
                  </button>
                )}
                <button type="button" onClick={() => remove(i)} aria-label="Remove" title="Remove" className="grid h-7 w-7 place-items-center rounded-full bg-black/60 text-white hover:bg-danger">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
              <span className="absolute end-1 bottom-1 grid h-6 w-6 place-items-center rounded-full bg-black/60 text-white cursor-grab" aria-hidden>
                <GripVertical className="h-3.5 w-3.5" />
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
