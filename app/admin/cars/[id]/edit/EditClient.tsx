'use client';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import CarForm from '@/components/admin/CarForm';
import { useAdminStore } from '@/lib/admin-store';

export default function EditClient() {
  const { id } = useParams<{ id: string }>();
  const { cars } = useAdminStore();
  const car = cars.find((c) => c.id === id);
  if (!car) return (
    <div className="card p-10 text-center">
      <h2 className="heading-3">Car not found</h2>
      <p className="text-sm text-[rgb(var(--muted))] mt-2">It may have been deleted.</p>
      <Link href="/admin/cars" className="btn-accent mt-4 inline-flex">Back to inventory</Link>
    </div>
  );

  return (
    <div className="space-y-6 max-w-3xl">
      <Link href="/admin/cars" className="text-xs text-[rgb(var(--muted))] hover:text-accent-500 inline-flex items-center gap-1.5">
        <ArrowLeft className="h-4 w-4 rtl-flip" /> Back to inventory
      </Link>
      <header>
        <h1 className="heading-2">Edit car</h1>
        <p className="text-sm text-[rgb(var(--muted))] mt-1">{car.year} {car.make} {car.model}</p>
      </header>
      <CarForm initial={car} />
    </div>
  );
}
