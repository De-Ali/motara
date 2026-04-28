'use client';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import CarForm from '@/components/admin/CarForm';

export default function NewCarPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <Link href="/admin/cars" className="text-xs text-[rgb(var(--muted))] hover:text-accent-500 inline-flex items-center gap-1.5">
        <ArrowLeft className="h-4 w-4 rtl-flip" /> Back to inventory
      </Link>
      <header>
        <h1 className="heading-2">Add a car</h1>
        <p className="text-sm text-[rgb(var(--muted))] mt-1">Walk through 6 steps. Saves locally for this preview.</p>
      </header>
      <CarForm />
    </div>
  );
}
