import type { InspectionCategory, InspectionItem } from '@/lib/types';

const ext: [string, string][] = [
  ['Front bumper & grille', 'الصدام الأمامي والشبك'],
  ['Hood alignment', 'محاذاة غطاء المحرك'],
  ['Front fenders', 'الرفارف الأمامية'],
  ['Doors & gaps', 'الأبواب والفواصل'],
  ['Rear bumper', 'الصدام الخلفي'],
  ['Trunk / tailgate', 'الصندوق الخلفي'],
  ['Roof & sunroof', 'السقف وفتحة السقف'],
  ['Headlights & lenses', 'المصابيح الأمامية'],
  ['Tail lights', 'المصابيح الخلفية'],
  ['Wheels & rims', 'العجلات والجنوط'],
  ['Tyres tread depth', 'عمق نقش الإطارات'],
  ['Paint condition', 'حالة الطلاء']
];
const intr: [string, string][] = [
  ['Driver seat & wear', 'مقعد السائق'],
  ['Passenger seats', 'مقاعد الركاب'],
  ['Dashboard', 'لوحة العدادات'],
  ['Steering wheel', 'عجلة القيادة'],
  ['Carpets & headliner', 'السجاد والسقف الداخلي'],
  ['Door cards', 'كسوة الأبواب'],
  ['AC system', 'نظام التكييف'],
  ['Audio system', 'النظام الصوتي'],
  ['Power windows', 'النوافذ الكهربائية'],
  ['Mirrors & adjusters', 'المرايا']
];
const mech: [string, string][] = [
  ['Engine compression', 'ضغط المحرك'],
  ['Oil & filter', 'الزيت والفلتر'],
  ['Coolant system', 'نظام التبريد'],
  ['Transmission shift', 'تبديل القير'],
  ['Drivetrain', 'نظام الدفع'],
  ['Suspension front', 'المساعدات الأمامية'],
  ['Suspension rear', 'المساعدات الخلفية'],
  ['Brakes front', 'فرامل أمامية'],
  ['Brakes rear', 'فرامل خلفية'],
  ['Exhaust system', 'نظام العادم'],
  ['CV joints / boots', 'مفاصل الإكسات'],
  ['Belts & hoses', 'الأحزمة والخراطيم'],
  ['Fuel system', 'نظام الوقود'],
  ['Engine mounts', 'كراسي المحرك'],
  ['Differential / 4WD', 'الدفرنس والدفع الرباعي']
];
const elec: [string, string][] = [
  ['Battery & charging', 'البطارية والشحن'],
  ['Starter motor', 'محرك التشغيل'],
  ['Alternator output', 'الدينامو'],
  ['Lights & indicators', 'الإنارة والإشارات'],
  ['Dashboard cluster', 'مجموعة العدادات'],
  ['Sensors & ECU codes', 'الحساسات وأكواد الكمبيوتر'],
  ['Infotainment', 'نظام المعلومات والترفيه'],
  ['Power outlets', 'مخارج الكهرباء']
];
const road: [string, string][] = [
  ['Cold start', 'التشغيل البارد'],
  ['Acceleration', 'التسارع'],
  ['Highway stability', 'ثبات الطريق السريع'],
  ['Braking response', 'استجابة الفرامل'],
  ['Steering feel', 'شعور التوجيه']
];

const photoFor = (i: number) =>
  `https://images.unsplash.com/photo-${
    ['1486006920555-c77dcf18193c', '1547038577-da80abbc4f19', '1503376780353-7e6692767b70', '1493238792000-8113da705763'][i % 4]
  }?w=800&auto=format&fit=crop&q=70`;

function build(items: [string, string][], passRate = 0.78, repairRate = 0.15): InspectionItem[] {
  return items.map(([en, ar], i) => {
    const r = (i * 13 + 7) % 100 / 100;
    const status: InspectionItem['status'] = r < passRate ? 'pass' : r < passRate + repairRate ? 'repaired' : 'note';
    const note = status === 'repaired'
      ? { en: 'OEM part replaced and tested.', ar: 'تم استبدال القطعة الأصلية واختبارها.' }
      : status === 'note'
      ? { en: 'Cosmetic only — see photos.', ar: 'تجميلي فقط — انظر الصور.' }
      : undefined;
    return {
      id: `${en.toLowerCase().replace(/[^a-z]+/g, '-')}-${i}`,
      label: { en, ar },
      status,
      note,
      photo: status !== 'pass' ? photoFor(i) : undefined
    };
  });
}

export function buildInspection(seed = 0): InspectionCategory[] {
  const offset = seed % 5;
  return [
    { key: 'exterior',   title: { en: 'Exterior',     ar: 'الهيكل الخارجي' },     items: build(ext,  0.75 + offset * 0.02) },
    { key: 'interior',   title: { en: 'Interior',     ar: 'المقصورة الداخلية' }, items: build(intr, 0.80) },
    { key: 'mechanical', title: { en: 'Mechanical',   ar: 'الميكانيكا' },         items: build(mech, 0.78) },
    { key: 'electrical', title: { en: 'Electrical',   ar: 'الكهرباء' },           items: build(elec, 0.85) },
    { key: 'roadtest',   title: { en: 'Road test',    ar: 'اختبار القيادة' },     items: build(road, 0.92) }
  ];
}

export function inspectionScore(cats: InspectionCategory[]): number {
  const all = cats.flatMap((c) => c.items);
  const pts = all.reduce((sum, it) => sum + (it.status === 'pass' ? 2 : it.status === 'repaired' ? 1.6 : 1.2), 0);
  return Math.round((pts / (all.length * 2)) * 100);
}
