'use client';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { useAdminStore } from '@/lib/admin-store';
import CarCard from '@/components/CarCard';

export default function FavoritesPage() {
  const { favorites } = useStore();
  const { cars } = useAdminStore();
  const { t } = useI18n();
  const items = favorites.map((id) => cars.find((c) => c.id === id)).filter(Boolean) as typeof cars;

  return (
    <div className="container-app py-12">
      <h1 className="heading-2">{t('favorites.title')}</h1>
      {items.length === 0 ? (
        <div className="card p-10 text-center mt-8">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent-500/10 text-accent-500">
            <Heart className="h-7 w-7" />
          </div>
          <p className="lead mt-5 max-w-md mx-auto">{t('favorites.empty')}</p>
          <Link href="/cars" className="btn-accent mt-6 inline-flex">{t('common.viewAll')}</Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((c, i) => <CarCard key={c.id} car={c} index={i} />)}
        </div>
      )}
    </div>
  );
}
