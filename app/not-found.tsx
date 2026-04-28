'use client';
import Link from 'next/link';
import { CarFront } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container-app py-24 text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand-50 text-brand-700">
        <CarFront className="h-8 w-8" />
      </div>
      <h1 className="heading-1 mt-6">404</h1>
      <p className="lead mt-3 max-w-md mx-auto">This page took a wrong turn. Let&apos;s get you back on the road.</p>
      <Link href="/" className="btn-accent mt-6 inline-flex">Back home</Link>
    </div>
  );
}
