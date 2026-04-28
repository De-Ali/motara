'use client';
import { useEffect, useState } from 'react';
import { getRecents } from '@/lib/recents';
import { useAdminStore } from '@/lib/admin-store';
import CarCard from './CarCard';
import { Clock } from 'lucide-react';

export default function RecentlyViewed({ excludeId }: { excludeId?: string }) {
  const { cars } = useAdminStore();
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    setIds(getRecents().filter((id) => id !== excludeId));
  }, [excludeId]);

  const items = ids.map((id) => cars.find((c) => c.id === id)).filter(Boolean) as typeof cars;
  if (items.length === 0) return null;

  return (
    <section className="mt-16">
      <header className="flex items-center gap-2 mb-5">
        <Clock className="h-4 w-4 text-accent-500" />
        <h3 className="heading-3">Recently viewed</h3>
      </header>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.slice(0, 4).map((c, i) => <CarCard key={c.id} car={c} index={i} />)}
      </div>
    </section>
  );
}
