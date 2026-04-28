import type { Car, RepairStage } from '@/lib/types';
import { buildInspection, inspectionScore } from './inspection-template';

const galleryFor = (id: string) => {
  const codes: Record<string, string[]> = {
    landcruiser: [
      '1559416523-140ddc3d238c', '1606664515524-ed2f786a0bd6',
      '1583121274602-3e2820c69888', '1525609004556-c46c7d6cf023',
      '1601921004897-b7d5d3d0a6dc', '1503376780353-7e6692767b70',
      '1493238792000-8113da705763', '1494976388531-d1058494cdd8',
      '1542362567-b07e54358753', '1583121274602-3e2820c69888'
    ],
    hilux: [
      '1591293836027-e05b48473b67', '1605559424843-9e4c228bf1c5',
      '1542282088-fe8426682b8f', '1572635148818-ef6fd45eb394',
      '1606016159991-dfe4f2746ad5', '1606664515524-ed2f786a0bd6',
      '1583121274602-3e2820c69888', '1494976388531-d1058494cdd8',
      '1503376780353-7e6692767b70', '1547038577-da80abbc4f19'
    ],
    camry: [
      '1606664515524-ed2f786a0bd6', '1503376780353-7e6692767b70',
      '1493238792000-8113da705763', '1525609004556-c46c7d6cf023',
      '1583121274602-3e2820c69888', '1486006920555-c77dcf18193c',
      '1494976388531-d1058494cdd8', '1542362567-b07e54358753',
      '1547038577-da80abbc4f19', '1503376780353-7e6692767b70'
    ],
    patrol: [
      '1606664515524-ed2f786a0bd6', '1601921004897-b7d5d3d0a6dc',
      '1559416523-140ddc3d238c', '1583121274602-3e2820c69888',
      '1494976388531-d1058494cdd8', '1525609004556-c46c7d6cf023',
      '1493238792000-8113da705763', '1503376780353-7e6692767b70',
      '1547038577-da80abbc4f19', '1486006920555-c77dcf18193c'
    ]
  };
  const list = codes[id] ?? codes.camry;
  return list.map((p) => `https://images.unsplash.com/photo-${p}?w=1600&auto=format&fit=crop&q=75`);
};

const repairTimeline = (carName: string): RepairStage[] => [
  {
    stage: 'received',
    title: { en: 'Vehicle received', ar: 'استلام المركبة' },
    description: {
      en: `${carName} arrived at our Muscat workshop. Initial walkaround photos and documentation completed.`,
      ar: `${carName} وصلت إلى ورشتنا في مسقط. تم التوثيق المصور للحالة الأولية.`
    },
    date: '2026-03-12',
    photos: [
      'https://images.unsplash.com/photo-1599256871775-9d7d0a51c5fc?w=900&auto=format&fit=crop&q=70',
      'https://images.unsplash.com/photo-1597007030739-6d2e7172ee6c?w=900&auto=format&fit=crop&q=70'
    ]
  },
  {
    stage: 'diagnosis',
    title: { en: 'Diagnosis & assessment', ar: 'التشخيص والتقييم' },
    description: {
      en: '50-point inspection performed. ECU scan, compression test, road test. Findings logged.',
      ar: 'فحص من 50 نقطة. فحص الكمبيوتر، اختبار الضغط، تجربة قيادة. تسجيل النتائج.'
    },
    date: '2026-03-15',
    photos: [
      'https://images.unsplash.com/photo-1632823469850-1b7b1e8b7e2e?w=900&auto=format&fit=crop&q=70',
      'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=900&auto=format&fit=crop&q=70'
    ]
  },
  {
    stage: 'repair',
    title: { en: 'Refurbishment', ar: 'التجديد والإصلاح' },
    description: {
      en: 'Repairs done with OEM parts. Body, mechanical, and detailing in-house.',
      ar: 'إصلاحات بقطع أصلية. الهيكل والميكانيكا والتلميع داخل الورشة.'
    },
    date: '2026-03-22',
    photos: [
      'https://images.unsplash.com/photo-1532581140115-3e355d1ed1de?w=900&auto=format&fit=crop&q=70',
      'https://images.unsplash.com/photo-1606577924006-27d39b132ae2?w=900&auto=format&fit=crop&q=70'
    ]
  },
  {
    stage: 'final',
    title: { en: 'Final inspection', ar: 'الفحص النهائي' },
    description: {
      en: 'Re-inspection, certification, photography, and showroom prep.',
      ar: 'إعادة الفحص والاعتماد والتصوير والتجهيز للمعرض.'
    },
    date: '2026-04-02',
    photos: [
      'https://images.unsplash.com/photo-1542362567-b07e54358753?w=900&auto=format&fit=crop&q=70',
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=900&auto=format&fit=crop&q=70'
    ]
  }
];

type CarSeed = Omit<Car, 'inspection' | 'repairTimeline' | 'images'> & { gallery?: string };

const seeds: CarSeed[] = [
  {
    id: '1', slug: 'toyota-land-cruiser-2020-vxr',
    make: 'Toyota', model: 'Land Cruiser', trim: 'VXR', year: 2020,
    priceOMR: 18500, mileageKm: 62000, fuel: 'Petrol', transmission: 'Automatic',
    bodyType: 'SUV', color: { en: 'Pearl White', ar: 'أبيض لؤلؤي' }, seats: 7,
    engine: '5.7L V8', origin: { en: 'Imported · USA', ar: 'مستوردة · الولايات المتحدة' },
    warrantyMonths: 6, status: 'Available',
    badges: ['Motara Verified', 'Imported', 'Hot Deal'],
    features: [
      { en: 'Sunroof', ar: 'فتحة سقف' }, { en: 'Leather seats', ar: 'مقاعد جلد' },
      { en: 'Adaptive cruise', ar: 'مثبت سرعة تكيفي' }, { en: '360° camera', ar: 'كاميرا 360' },
      { en: 'JBL audio', ar: 'صوتيات JBL' }, { en: 'Heated seats', ar: 'مقاعد مدفأة' }
    ],
    description: {
      en: 'Pristine VXR in pearl white. One careful owner, full Toyota service history. Imported from California — no rust. Ready to drive home today.',
      ar: 'لاندكروزر VXR بحالة ممتازة. مالك واحد، صيانة كاملة لدى تويوتا. مستوردة من كاليفورنيا بدون صدأ. جاهزة للتسليم اليوم.'
    },
    inquiriesThisWeek: 14,
    location: { en: 'Al Khuwair Showroom · Muscat', ar: 'معرض الخوير · مسقط' }
  },
  {
    id: '2', slug: 'toyota-hilux-2021-double-cab',
    make: 'Toyota', model: 'Hilux', trim: 'Double Cab GLX', year: 2021,
    priceOMR: 9800, mileageKm: 78000, fuel: 'Diesel', transmission: 'Automatic',
    bodyType: 'Pickup', color: { en: 'Silver', ar: 'فضي' }, seats: 5,
    engine: '2.4L Turbo Diesel', origin: { en: 'Imported · UAE', ar: 'مستوردة · الإمارات' },
    warrantyMonths: 6, status: 'Available',
    badges: ['Motara Verified', 'Low Mileage'],
    features: [
      { en: '4WD', ar: 'دفع رباعي' }, { en: 'Bedliner', ar: 'بطانة الصندوق' },
      { en: 'Tow package', ar: 'حزمة قطر' }, { en: 'Reverse camera', ar: 'كاميرا خلفية' }
    ],
    description: {
      en: 'Workhorse Hilux Double Cab GLX. Ideal for off-road and daily duty. Service log included.',
      ar: 'هايلكس دبل كابينة GLX، مثالية للطرق الوعرة والاستخدام اليومي. سجل الصيانة مرفق.'
    },
    inquiriesThisWeek: 9,
    location: { en: 'Al Khuwair Showroom · Muscat', ar: 'معرض الخوير · مسقط' }
  },
  {
    id: '3', slug: 'toyota-camry-2022-grande',
    make: 'Toyota', model: 'Camry', trim: 'Grande', year: 2022,
    priceOMR: 7400, mileageKm: 41000, fuel: 'Petrol', transmission: 'Automatic',
    bodyType: 'Sedan', color: { en: 'Phantom Black', ar: 'أسود فانتوم' }, seats: 5,
    engine: '2.5L 4-cyl', origin: { en: 'GCC Specs', ar: 'مواصفات خليجية' },
    warrantyMonths: 6, status: 'Available',
    badges: ['Motara Verified', 'Low Mileage', 'New Arrival'],
    features: [
      { en: 'Wireless CarPlay', ar: 'كار بلاي لاسلكي' }, { en: 'Lane assist', ar: 'مساعد المسار' },
      { en: 'Leather', ar: 'جلد' }, { en: 'Push-to-start', ar: 'تشغيل بالزر' }
    ],
    description: {
      en: 'GCC-spec Camry Grande, Toyota agency-serviced. Clean interior, no accidents reported.',
      ar: 'كامري قراندي خليجية، صيانة لدى وكالة تويوتا. مقصورة نظيفة وبدون حوادث.'
    },
    inquiriesThisWeek: 22,
    location: { en: 'Al Khuwair Showroom · Muscat', ar: 'معرض الخوير · مسقط' }
  },
  {
    id: '4', slug: 'nissan-patrol-2019-le',
    make: 'Nissan', model: 'Patrol', trim: 'LE Platinum', year: 2019,
    priceOMR: 14200, mileageKm: 95000, fuel: 'Petrol', transmission: 'Automatic',
    bodyType: 'SUV', color: { en: 'Desert Beige', ar: 'بيج صحراوي' }, seats: 8,
    engine: '5.6L V8', origin: { en: 'GCC Specs', ar: 'مواصفات خليجية' },
    warrantyMonths: 3, status: 'Available',
    badges: ['Motara Verified', 'Imported'],
    features: [
      { en: 'Sunroof', ar: 'فتحة سقف' }, { en: 'BOSE audio', ar: 'صوتيات BOSE' },
      { en: '4WD', ar: 'دفع رباعي' }, { en: 'Cool box', ar: 'ثلاجة' }
    ],
    description: {
      en: 'Iconic Patrol LE Platinum. Service history, well-maintained. Perfect family hauler.',
      ar: 'باترول LE بلاتينيوم. سجل صيانة كامل، حالة ممتازة. مثالية للعائلة.'
    },
    inquiriesThisWeek: 11,
    location: { en: 'Al Khuwair Showroom · Muscat', ar: 'معرض الخوير · مسقط' }
  },
  {
    id: '5', slug: 'hyundai-tucson-2022-gls',
    make: 'Hyundai', model: 'Tucson', trim: 'GLS', year: 2022,
    priceOMR: 6800, mileageKm: 36000, fuel: 'Petrol', transmission: 'Automatic',
    bodyType: 'SUV', color: { en: 'Titanium Grey', ar: 'رمادي تيتانيوم' }, seats: 5,
    engine: '2.0L 4-cyl', origin: { en: 'GCC Specs', ar: 'مواصفات خليجية' },
    warrantyMonths: 6, status: 'Available',
    badges: ['Motara Verified', 'New Arrival', 'Low Mileage'],
    features: [
      { en: 'Panoramic roof', ar: 'سقف بانورامي' }, { en: 'Wireless charging', ar: 'شاحن لاسلكي' },
      { en: 'Lane keep', ar: 'مساعد المسار' }, { en: 'Heated seats', ar: 'مقاعد مدفأة' }
    ],
    description: {
      en: 'Modern Tucson with bold styling and excellent fuel economy. Single owner since new.',
      ar: 'توسان حديث بتصميم جذاب واقتصاد ممتاز في الوقود. مالك واحد منذ الجديدة.'
    },
    inquiriesThisWeek: 18,
    location: { en: 'Al Khuwair Showroom · Muscat', ar: 'معرض الخوير · مسقط' }
  },
  {
    id: '6', slug: 'kia-sportage-2021-gt-line',
    make: 'Kia', model: 'Sportage', trim: 'GT-Line', year: 2021,
    priceOMR: 5900, mileageKm: 58000, fuel: 'Petrol', transmission: 'Automatic',
    bodyType: 'SUV', color: { en: 'Snow White', ar: 'أبيض ثلجي' }, seats: 5,
    engine: '2.4L 4-cyl', origin: { en: 'GCC Specs', ar: 'مواصفات خليجية' },
    warrantyMonths: 3, status: 'Available',
    badges: ['Motara Verified'],
    features: [
      { en: 'Smart key', ar: 'مفتاح ذكي' }, { en: 'Reverse camera', ar: 'كاميرا خلفية' },
      { en: 'Cruise control', ar: 'مثبت سرعة' }, { en: 'Bluetooth', ar: 'بلوتوث' }
    ],
    description: {
      en: 'Sportage GT-Line. Solid family SUV. Recent service done at Kia agency.',
      ar: 'سبورتاج GT-Line. سيارة عائلية متينة. صيانة حديثة لدى وكالة كيا.'
    },
    inquiriesThisWeek: 7,
    location: { en: 'Al Khuwair Showroom · Muscat', ar: 'معرض الخوير · مسقط' }
  },
  {
    id: '7', slug: 'lexus-lx570-2018',
    make: 'Lexus', model: 'LX 570', trim: 'Premier', year: 2018,
    priceOMR: 21500, mileageKm: 88000, fuel: 'Petrol', transmission: 'Automatic',
    bodyType: 'SUV', color: { en: 'Onyx Black', ar: 'أسود أونيكس' }, seats: 7,
    engine: '5.7L V8', origin: { en: 'Imported · USA', ar: 'مستوردة · الولايات المتحدة' },
    warrantyMonths: 6, status: 'Available',
    badges: ['Motara Verified', 'Imported', 'Hot Deal'],
    features: [
      { en: 'Massage seats', ar: 'مقاعد مساج' }, { en: 'Mark Levinson audio', ar: 'صوتيات Mark Levinson' },
      { en: 'Rear entertainment', ar: 'ترفيه خلفي' }, { en: 'HUD', ar: 'شاشة أمامية' }
    ],
    description: {
      en: 'Flagship LX 570 Premier with every option. CarFax-clean US import.',
      ar: 'لكزس LX 570 برميير بكامل المواصفات. مستوردة من الولايات المتحدة بسجل نظيف.'
    },
    inquiriesThisWeek: 16,
    location: { en: 'Al Khuwair Showroom · Muscat', ar: 'معرض الخوير · مسقط' }
  },
  {
    id: '8', slug: 'bmw-x5-2020-xdrive40i',
    make: 'BMW', model: 'X5', trim: 'xDrive40i', year: 2020,
    priceOMR: 16800, mileageKm: 67000, fuel: 'Petrol', transmission: 'Automatic',
    bodyType: 'SUV', color: { en: 'Mineral White', ar: 'أبيض معدني' }, seats: 5,
    engine: '3.0L Twin-Turbo I6', origin: { en: 'Imported · USA', ar: 'مستوردة · الولايات المتحدة' },
    warrantyMonths: 6, status: 'Available',
    badges: ['Motara Verified', 'Imported'],
    features: [
      { en: 'Harman Kardon', ar: 'هارمان كاردون' }, { en: 'M Sport pkg', ar: 'حزمة M Sport' },
      { en: 'Air suspension', ar: 'مساعدات هوائية' }, { en: 'Heads-up display', ar: 'شاشة أمامية' }
    ],
    description: {
      en: 'Sport-spec X5 with M-Sport package. Recently serviced. Drives like new.',
      ar: 'X5 رياضية بحزمة M-Sport. صيانة حديثة. أداء كأنها جديدة.'
    },
    inquiriesThisWeek: 12,
    location: { en: 'Al Khuwair Showroom · Muscat', ar: 'معرض الخوير · مسقط' }
  },
  {
    id: '9', slug: 'mercedes-e300-2021-amg-line',
    make: 'Mercedes-Benz', model: 'E 300', trim: 'AMG-Line', year: 2021,
    priceOMR: 14900, mileageKm: 49000, fuel: 'Petrol', transmission: 'Automatic',
    bodyType: 'Sedan', color: { en: 'Obsidian Black', ar: 'أسود أوبسيديان' }, seats: 5,
    engine: '2.0L Turbo I4', origin: { en: 'GCC Specs', ar: 'مواصفات خليجية' },
    warrantyMonths: 6, status: 'Reserved',
    badges: ['Motara Verified', 'Low Mileage'],
    features: [
      { en: 'Burmester audio', ar: 'صوتيات Burmester' }, { en: 'AMG kit', ar: 'حزمة AMG' },
      { en: 'Ambient lighting', ar: 'إضاءة محيطية' }, { en: 'MBUX', ar: 'نظام MBUX' }
    ],
    description: {
      en: 'Stunning E 300 AMG-Line. Single owner, agency-serviced. Currently reserved — join the waitlist.',
      ar: 'E 300 AMG-Line مذهلة. مالك واحد، صيانة لدى الوكالة. محجوزة حاليًا — انضم لقائمة الانتظار.'
    },
    inquiriesThisWeek: 25,
    location: { en: 'Al Khuwair Showroom · Muscat', ar: 'معرض الخوير · مسقط' }
  },
  {
    id: '10', slug: 'mazda-cx5-2022-signature',
    make: 'Mazda', model: 'CX-5', trim: 'Signature', year: 2022,
    priceOMR: 7200, mileageKm: 32000, fuel: 'Petrol', transmission: 'Automatic',
    bodyType: 'SUV', color: { en: 'Soul Red', ar: 'أحمر سول' }, seats: 5,
    engine: '2.5L Turbo', origin: { en: 'Imported · Japan', ar: 'مستوردة · اليابان' },
    warrantyMonths: 6, status: 'Available',
    badges: ['Motara Verified', 'Low Mileage', 'New Arrival'],
    features: [
      { en: 'Bose audio', ar: 'صوتيات Bose' }, { en: 'AWD', ar: 'دفع رباعي' },
      { en: 'Nappa leather', ar: 'جلد نابا' }, { en: 'Adaptive headlights', ar: 'مصابيح تكيفية' }
    ],
    description: {
      en: 'CX-5 Signature in iconic Soul Red. Top-trim, low mileage. Imported from Japan.',
      ar: 'CX-5 Signature بلون أحمر سول الشهير. أعلى فئة وكيلومترات قليلة. مستوردة من اليابان.'
    },
    inquiriesThisWeek: 19,
    location: { en: 'Al Khuwair Showroom · Muscat', ar: 'معرض الخوير · مسقط' }
  },
  {
    id: '11', slug: 'mitsubishi-pajero-2019',
    make: 'Mitsubishi', model: 'Pajero', trim: 'GLS', year: 2019,
    priceOMR: 6400, mileageKm: 102000, fuel: 'Petrol', transmission: 'Automatic',
    bodyType: 'SUV', color: { en: 'Granite Brown', ar: 'بني جرانيت' }, seats: 7,
    engine: '3.8L V6', origin: { en: 'GCC Specs', ar: 'مواصفات خليجية' },
    warrantyMonths: 3, status: 'Available',
    badges: ['Motara Verified'],
    features: [
      { en: '4WD', ar: 'دفع رباعي' }, { en: 'Sunroof', ar: 'فتحة سقف' },
      { en: 'Leather', ar: 'جلد' }, { en: 'Cruise control', ar: 'مثبت سرعة' }
    ],
    description: {
      en: 'Reliable Pajero GLS, Oman-driven, regular service. Excellent off-road capability.',
      ar: 'باجيرو GLS موثوقة، استخدمت في عُمان، صيانة منتظمة. أداء ممتاز خارج الطريق.'
    },
    inquiriesThisWeek: 6,
    location: { en: 'Al Khuwair Showroom · Muscat', ar: 'معرض الخوير · مسقط' }
  },
  {
    id: '12', slug: 'honda-accord-2022-touring',
    make: 'Honda', model: 'Accord', trim: 'Touring', year: 2022,
    priceOMR: 7100, mileageKm: 38000, fuel: 'Petrol', transmission: 'Automatic',
    bodyType: 'Sedan', color: { en: 'Lunar Silver', ar: 'فضي قمري' }, seats: 5,
    engine: '2.0L Turbo', origin: { en: 'Imported · USA', ar: 'مستوردة · الولايات المتحدة' },
    warrantyMonths: 6, status: 'Available',
    badges: ['Motara Verified', 'Imported', 'Low Mileage'],
    features: [
      { en: 'Honda Sensing', ar: 'Honda Sensing' }, { en: 'Wireless CarPlay', ar: 'كار بلاي لاسلكي' },
      { en: 'HUD', ar: 'شاشة أمامية' }, { en: 'Heated steering', ar: 'مقود مدفأ' }
    ],
    description: {
      en: 'Top-trim Accord Touring with full safety suite. Imported and certified by Motara.',
      ar: 'أكورد Touring أعلى فئة بكامل أنظمة السلامة. مستوردة ومعتمدة من مطرة.'
    },
    inquiriesThisWeek: 13,
    location: { en: 'Al Khuwair Showroom · Muscat', ar: 'معرض الخوير · مسقط' }
  }
];

const galleryKey = (slug: string) =>
  slug.includes('land-cruiser') ? 'landcruiser'
  : slug.includes('hilux') ? 'hilux'
  : slug.includes('patrol') || slug.includes('lx570') || slug.includes('x5') || slug.includes('pajero') || slug.includes('tucson') || slug.includes('sportage') || slug.includes('cx5') ? 'patrol'
  : 'camry';

export const cars: Car[] = seeds.map((s, i) => {
  const cats = buildInspection(i);
  return {
    ...s,
    images: galleryFor(galleryKey(s.slug)),
    inspection: {
      score: inspectionScore(cats),
      inspectorName: 'Eng. Yusuf Al-Habsi',
      inspectedAt: '2026-04-02',
      categories: cats
    },
    repairTimeline: repairTimeline(`${s.year} ${s.make} ${s.model}`)
  } as Car;
});

export const carBySlug = (slug: string) => cars.find((c) => c.slug === slug);
export const carById = (id: string) => cars.find((c) => c.id === id);

export const makes = Array.from(new Set(cars.map((c) => c.make))).sort();
export const bodyTypes = Array.from(new Set(cars.map((c) => c.bodyType))).sort();
export const fuels = Array.from(new Set(cars.map((c) => c.fuel)));
export const transmissions = Array.from(new Set(cars.map((c) => c.transmission)));
