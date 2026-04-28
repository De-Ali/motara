import { cars } from '@/data/cars';
import CarDetailClient from './CarDetailClient';

export const dynamicParams = false;

export function generateStaticParams() {
  return cars.map((c) => ({ slug: c.slug }));
}

export default function Page() {
  return <CarDetailClient />;
}
