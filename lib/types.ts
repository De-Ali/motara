export type Locale = 'en' | 'ar';
export type Direction = 'ltr' | 'rtl';

export type FuelType = 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';
export type Transmission = 'Automatic' | 'Manual';
export type BodyType = 'Sedan' | 'SUV' | 'Hatchback' | 'Pickup' | 'Coupe';
export type CarStatus = 'Available' | 'Reserved' | 'Sold';
export type Badge = 'Motara Verified' | 'Low Mileage' | 'New Arrival' | 'Hot Deal' | 'Imported';

export type InspectionItem = {
  id: string;
  label: { en: string; ar: string };
  status: 'pass' | 'repaired' | 'note';
  note?: { en: string; ar: string };
  photo?: string;
};

export type InspectionCategory = {
  key: 'exterior' | 'interior' | 'mechanical' | 'electrical' | 'roadtest';
  title: { en: string; ar: string };
  items: InspectionItem[];
};

export type InspectionReport = {
  score: number; // /100
  inspectorName: string;
  inspectedAt: string; // ISO
  categories: InspectionCategory[];
};

export type RepairStage = {
  stage: 'received' | 'diagnosis' | 'repair' | 'final';
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  date: string;
  photos: string[];
};

export type Car = {
  id: string;
  slug: string;
  make: string;
  model: string;
  trim?: string;
  year: number;
  priceOMR: number;
  mileageKm: number;
  fuel: FuelType;
  transmission: Transmission;
  bodyType: BodyType;
  color: { en: string; ar: string };
  seats: number;
  engine: string;
  origin: { en: string; ar: string };
  warrantyMonths: 3 | 6 | 12;
  status: CarStatus;
  badges: Badge[];
  images: string[];
  inspection: InspectionReport;
  repairTimeline: RepairStage[];
  features: { en: string; ar: string }[];
  description: { en: string; ar: string };
  inquiriesThisWeek: number;
  location: { en: string; ar: string };
};

export type Testimonial = {
  id: string;
  name: string;
  role: { en: string; ar: string };
  carBought: string;
  rating: number;
  quote: { en: string; ar: string };
  avatar: string;
};

export type BlogPost = {
  slug: string;
  title: { en: string; ar: string };
  excerpt: { en: string; ar: string };
  body: { en: string; ar: string };
  cover: string;
  author: string;
  publishedAt: string;
  readMin: number;
  tags: string[];
};
