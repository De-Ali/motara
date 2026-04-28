'use client';
import type { Car } from '@/lib/types';

export default function VehicleSchema({ car }: { car: Car }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Vehicle',
    name: `${car.year} ${car.make} ${car.model}${car.trim ? ' · ' + car.trim : ''}`,
    description: car.description.en,
    brand: { '@type': 'Brand', name: car.make },
    model: car.model,
    vehicleModelDate: String(car.year),
    bodyType: car.bodyType,
    fuelType: car.fuel,
    vehicleTransmission: car.transmission,
    color: car.color.en,
    numberOfSeats: car.seats,
    mileageFromOdometer: { '@type': 'QuantitativeValue', value: car.mileageKm, unitCode: 'KMT' },
    image: car.images.slice(0, 5),
    offers: {
      '@type': 'Offer',
      price: car.priceOMR,
      priceCurrency: 'OMR',
      availability: car.status === 'Sold'
        ? 'https://schema.org/SoldOut'
        : car.status === 'Reserved'
        ? 'https://schema.org/InStoreOnly'
        : 'https://schema.org/InStock',
      seller: { '@type': 'AutoDealer', name: 'Motara Auto' }
    }
  };
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
