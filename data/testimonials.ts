import type { Testimonial } from '@/lib/types';

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Khalid Al-Balushi',
    role: { en: 'Government employee · Muscat', ar: 'موظف حكومي · مسقط' },
    carBought: '2020 Toyota Land Cruiser VXR',
    rating: 5,
    quote: {
      en: 'I have bought three cars off classifieds before. This was the first time I actually saw what I was paying for. The inspection report alone made the decision easy.',
      ar: 'اشتريت ثلاث سيارات من الإعلانات سابقًا. هذه أول مرة أرى فعلاً ما أدفع مقابله. تقرير الفحص وحده جعل القرار سهلاً.'
    },
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 't2',
    name: 'Priya Menon',
    role: { en: 'Software engineer · Al Khoudh', ar: 'مهندسة برمجيات · الخوض' },
    carBought: '2022 Mazda CX-5 Signature',
    rating: 5,
    quote: {
      en: 'First car in Oman. The team replied on WhatsApp in two minutes and walked me through everything in English. No pressure, real photos, real warranty.',
      ar: 'أول سيارة لي في عُمان. الفريق رد على واتساب خلال دقيقتين وشرح لي كل شيء بالإنجليزية. بلا ضغط، صور حقيقية، وضمان حقيقي.'
    },
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 't3',
    name: 'Ahmed Al-Saidi',
    role: { en: 'Engineer · Sohar', ar: 'مهندس · صحار' },
    carBought: '2021 Toyota Hilux Double Cab',
    rating: 5,
    quote: {
      en: 'Drove down from Sohar to test it. Everything matched the photos exactly. Got a fair price and the warranty is real — they fixed a small AC issue free of charge.',
      ar: 'قدت من صحار لتجربتها. كل شيء يطابق الصور تمامًا. سعر عادل وضمان حقيقي — أصلحوا مشكلة بسيطة في التكييف مجانًا.'
    },
    avatar: 'https://images.unsplash.com/photo-1600486913747-55e5470d6f40?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 't4',
    name: 'Maria Santos',
    role: { en: 'Nurse · Ruwi', ar: 'ممرضة · روي' },
    carBought: '2022 Hyundai Tucson GLS',
    rating: 5,
    quote: {
      en: 'They explained the import process and showed the customs paperwork. I felt safe handing over the money. The car is amazing, six months in.',
      ar: 'شرحوا لي عملية الاستيراد وأَرَوني أوراق الجمارك. شعرت بالأمان عند الدفع. السيارة رائعة بعد ستة أشهر.'
    },
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop&q=80'
  }
];
