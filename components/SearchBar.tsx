'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { makes, bodyTypes } from '@/data/cars';

export default function SearchBar() {
  const { t } = useI18n();
  const router = useRouter();
  const [make, setMake] = useState('');
  const [body, setBody] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const submit: React.FormEventHandler = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (make) params.set('make', make);
    if (body) params.set('body', body);
    if (maxPrice) params.set('maxPrice', maxPrice);
    router.push(`/cars${params.toString() ? `?${params}` : ''}`);
  };

  return (
    <form onSubmit={submit} className="card grid gap-2 p-3 sm:grid-cols-[1fr_1fr_1fr_auto]">
      <select className="input" value={make} onChange={(e) => setMake(e.target.value)} aria-label={t('common.make')}>
        <option value="">{t('search.anyMake')}</option>
        {makes.map((m) => <option key={m}>{m}</option>)}
      </select>
      <select className="input" value={body} onChange={(e) => setBody(e.target.value)} aria-label={t('common.body')}>
        <option value="">{t('search.anyBody')}</option>
        {bodyTypes.map((b) => <option key={b}>{b}</option>)}
      </select>
      <input
        type="number"
        inputMode="numeric"
        className="input"
        placeholder={t('search.maxPrice')}
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />
      <button type="submit" className="btn-accent gap-2 sm:px-6">
        <Search className="h-4 w-4" /> {t('search.go')}
      </button>
    </form>
  );
}
