import { cars } from '@/data/cars';
import EditClient from './EditClient';

export const dynamicParams = false;

export function generateStaticParams() {
  return cars.map((c) => ({ id: c.id }));
}

export default function Page() {
  return <EditClient />;
}
