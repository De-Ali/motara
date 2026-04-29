export type Slide = {
  id: string;
  kind: 'cover' | 'split' | 'centered' | 'stats' | 'list' | 'phases' | 'pricing' | 'closing';
  eyebrow?: { en: string; ar: string };
  title: { en: string; ar: string };
  subtitle?: { en: string; ar: string };
  body?: { en: string; ar: string };
  bullets?: { en: string; ar: string }[];
  stats?: { value: string; label: { en: string; ar: string } }[];
  phases?: { tag: string; title: { en: string; ar: string }; body: { en: string; ar: string } }[];
  pricing?: { tier: { en: string; ar: string }; price: string; features: { en: string; ar: string } }[];
  image?: string;
  accent?: string;
};

export const slides: Slide[] = [
  {
    id: 'cover',
    kind: 'cover',
    eyebrow: { en: 'OMAN · MUSCAT', ar: 'سلطنة عُمان · مسقط' },
    title: {
      en: 'Motara Auto',
      ar: 'مطرة للسيارات'
    },
    subtitle: {
      en: 'A bilingual PWA for Oman\'s most transparent certified used-car platform.',
      ar: 'تطبيق ويب تقدمي ثنائي اللغة لأكثر منصة سيارات مستعملة شفافية في عُمان.'
    },
    body: {
      en: 'MVP review · Phase 1 build complete',
      ar: 'مراجعة النموذج الأولي · المرحلة الأولى مكتملة'
    },
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1600&auto=format&fit=crop&q=80'
  },
  {
    id: 'problem',
    kind: 'split',
    eyebrow: { en: '01 · THE PROBLEM', ar: '01 · المشكلة' },
    title: {
      en: 'Buying a used car in Oman is a gamble.',
      ar: 'شراء سيارة مستعملة في عُمان مغامرة.'
    },
    body: {
      en: 'OpenSooq and other classifieds dominate, but offer zero quality control, no inspection reports, no warranty, and blurry photos. Buyers face hidden damage, inflated prices, and no recourse — especially expats unfamiliar with the market.',
      ar: 'تهيمن منصات الإعلانات المبوبة كأوبن سوق، لكنها بلا رقابة جودة ولا تقارير فحص ولا ضمان وبصور رديئة. يواجه المشترون أضرارًا خفية وأسعارًا مبالغًا فيها وانعدام حلول — خاصة المقيمين غير المعتادين على السوق.'
    },
    bullets: [
      { en: 'No inspection or repair history disclosed', ar: 'لا يتم الإفصاح عن الفحص أو سجل الإصلاح' },
      { en: 'Identical-looking listings for trash and gems', ar: 'إعلانات متشابهة للسيارات الجيدة والرديئة' },
      { en: 'No warranty, no accountability', ar: 'لا ضمان ولا مساءلة' },
      { en: 'Poor Arabic UX, weak mobile experience', ar: 'تجربة عربية ضعيفة وتجربة هاتف رديئة' }
    ],
    image: 'https://images.unsplash.com/photo-1566936737687-8f392a237b8b?w=1400&auto=format&fit=crop&q=70'
  },
  {
    id: 'solution',
    kind: 'split',
    eyebrow: { en: '02 · THE SOLUTION', ar: '02 · الحل' },
    title: {
      en: 'Sell trust as a product.',
      ar: 'الثقة كمنتج.'
    },
    body: {
      en: 'Motara controls the full chain: import, refurbishment, certification, sale. Every car ships with a 50-point inspection, repair history with photos, and a real warranty — converting browsers to buyers via a WhatsApp-first funnel.',
      ar: 'تتحكم مطرة في السلسلة الكاملة: الاستيراد، التجديد، الاعتماد، البيع. كل سيارة تصل مع فحص من 50 نقطة، وسجل إصلاح مصور، وضمان حقيقي — تحوّل المتصفحين إلى مشترين عبر قمع مبيعات أساسه واتساب.'
    },
    bullets: [
      { en: '50-point inspection report — visual checklist', ar: 'تقرير فحص من 50 نقطة — قائمة مرئية' },
      { en: 'Photo-documented repair timeline', ar: 'سجل إصلاح موثق بالصور' },
      { en: '3 to 6 months warranty included', ar: 'ضمان 3 إلى 6 أشهر مشمول' },
      { en: 'WhatsApp click-to-chat on every listing', ar: 'زر واتساب فوري على كل إعلان' }
    ],
    image: 'https://images.unsplash.com/photo-1632823469850-1b7b1e8b7e2e?w=1400&auto=format&fit=crop&q=70'
  },
  {
    id: 'market',
    kind: 'stats',
    eyebrow: { en: '03 · MARKET OPPORTUNITY', ar: '03 · فرصة السوق' },
    title: {
      en: 'Oman first. GCC ready.',
      ar: 'عُمان أولاً. الخليج جاهز.'
    },
    subtitle: {
      en: 'A trust-led platform that replicates across the GCC — UAE, Saudi Arabia, Kuwait, Bahrain — once proven in Muscat.',
      ar: 'منصة قائمة على الثقة قابلة للتوسع في الخليج — الإمارات والسعودية والكويت والبحرين — بعد إثباتها في مسقط.'
    },
    stats: [
      { value: '4.8M', label: { en: 'Population of Oman',          ar: 'سكان عُمان' } },
      { value: '75%',  label: { en: 'OpenSooq mobile traffic',     ar: 'حركة OpenSooq من الهاتف' } },
      { value: '15-25%', label: { en: 'Target gross margin',       ar: 'هامش الربح المستهدف' } },
      { value: '4',    label: { en: 'GCC expansion markets',       ar: 'أسواق التوسع الخليجي' } }
    ]
  },
  {
    id: 'model',
    kind: 'phases',
    eyebrow: { en: '04 · BUSINESS MODEL', ar: '04 · نموذج الأعمال' },
    title: {
      en: 'Hybrid dealership-marketplace.',
      ar: 'وكالة هجينة + سوق إلكتروني.'
    },
    subtitle: {
      en: 'Three-phase evolution. Revenue from day one. Path to scale without owning all inventory.',
      ar: 'تطور عبر ثلاث مراحل. إيرادات من اليوم الأول. مسار للتوسع بدون امتلاك كل المخزون.'
    },
    phases: [
      {
        tag: 'PHASE 1',
        title: { en: 'Direct dealership', ar: 'وكالة مباشرة' },
        body:  { en: 'List own inventory only. Build trust. Margin: 15–25% per vehicle.', ar: 'عرض المخزون الخاص فقط. بناء الثقة. هامش 15–25% لكل سيارة.' }
      },
      {
        tag: 'PHASE 2',
        title: { en: 'Curated marketplace', ar: 'سوق منتقى' },
        body:  { en: 'Onboard verified sellers. Earn 2–5% commission + featured listings.', ar: 'استقبال بائعين موثقين. عمولة 2–5% + إعلانات مميزة.' }
      },
      {
        tag: 'PHASE 3',
        title: { en: 'Full ecosystem', ar: 'منظومة متكاملة' },
        body:  { en: 'Financing, insurance, inspection, logistics referrals (8–15% commission).', ar: 'تمويل، تأمين، فحص، خدمات لوجستية (عمولة 8–15%).' }
      }
    ]
  },
  {
    id: 'product-public',
    kind: 'list',
    eyebrow: { en: '05 · PRODUCT — BUYER SIDE', ar: '05 · المنتج — جانب المشتري' },
    title: {
      en: 'A modern, fast PWA built for Oman.',
      ar: 'تطبيق ويب تقدمي حديث وسريع مصمم لعُمان.'
    },
    bullets: [
      { en: 'Search palette (⌘K) across cars, pages, and articles', ar: 'لوحة بحث شاملة (⌘K) للسيارات والصفحات والمقالات' },
      { en: 'Filters: make, body, price, year, mileage, fuel, transmission', ar: 'فلاتر: الماركة، الهيكل، السعر، السنة، الكيلومترات، الوقود، ناقل الحركة' },
      { en: 'Compare drawer — up to 3 cars side-by-side', ar: 'لوحة مقارنة — حتى 3 سيارات جنبًا إلى جنب' },
      { en: 'Favorites and recently viewed (localStorage)', ar: 'المفضلة والمشاهَد مؤخرًا (تخزين محلي)' },
      { en: 'Test drive booking with date and time picker', ar: 'حجز تجربة قيادة مع اختيار التاريخ والوقت' },
      { en: 'Lightbox image gallery with 10+ photos per car', ar: 'معرض صور موسّع بـ10+ صور لكل سيارة' },
      { en: 'Web Share API + WhatsApp deep links', ar: 'مشاركة عبر Web Share API + روابط واتساب مباشرة' }
    ]
  },
  {
    id: 'trust',
    kind: 'split',
    eyebrow: { en: '06 · TRUST DIFFERENTIATOR', ar: '06 · ميزة الثقة' },
    title: {
      en: 'The 50-point inspection is the moat.',
      ar: 'فحص الـ50 نقطة هو الحاجز التنافسي.'
    },
    body: {
      en: 'Five categories — exterior, interior, mechanical, electrical, road test. Each item is tagged Pass, Repaired (with note + photo), or Note. The score auto-calculates. This level of disclosure is unmatched in the GCC used-car market.',
      ar: 'خمس فئات — الهيكل الخارجي، المقصورة، الميكانيكا، الكهرباء، اختبار القيادة. كل بند مصنف: ناجح، مُصلَح (مع ملاحظة وصورة)، أو ملاحظة. الدرجة تُحسب تلقائيًا. هذا المستوى من الإفصاح لا مثيل له في سوق السيارات المستعملة الخليجي.'
    },
    bullets: [
      { en: '50 items across 5 categories per car', ar: '50 بندًا عبر 5 فئات لكل سيارة' },
      { en: 'Photos attached to repaired items', ar: 'صور مرفقة بالعناصر المُصلَحة' },
      { en: '4-stage repair timeline (received → final)', ar: 'سجل إصلاح من 4 مراحل (الاستلام → النهائي)' },
      { en: 'Auto-generated score out of 100', ar: 'درجة تلقائية من 100' }
    ],
    image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=1400&auto=format&fit=crop&q=70'
  },
  {
    id: 'whatsapp',
    kind: 'centered',
    eyebrow: { en: '07 · CONVERSION FUNNEL', ar: '07 · قمع التحويل' },
    title: {
      en: 'WhatsApp-first. 30 seconds from browse to chat.',
      ar: 'واتساب أولاً. 30 ثانية من التصفح للمحادثة.'
    },
    subtitle: {
      en: 'Every car detail, hero, footer, and floating button opens WhatsApp with a pre-filled message including the car name. The single highest-converting channel in the Oman market.',
      ar: 'كل صفحة تفاصيل سيارة، وقسم رئيسي، وتذييل، وزر عائم يفتح واتساب برسالة مُعبّأة مسبقًا تحتوي اسم السيارة. أعلى قناة تحويل في السوق العُماني.'
    },
    bullets: [
      { en: 'Persistent FAB bottom-right (auto-flips RTL)', ar: 'زر عائم ثابت أسفل يمين (ينعكس تلقائيًا في RTL)' },
      { en: 'Pre-filled bilingual message per car', ar: 'رسالة معبأة مسبقًا بلغتين لكل سيارة' },
      { en: 'Test drive form auto-creates a lead in admin', ar: 'نموذج تجربة القيادة يُنشئ ليد تلقائيًا في لوحة التحكم' }
    ]
  },
  {
    id: 'bilingual',
    kind: 'split',
    eyebrow: { en: '08 · BILINGUAL & RTL', ar: '08 · ثنائي اللغة و RTL' },
    title: {
      en: 'True Arabic. Not a translation slap.',
      ar: 'عربية أصيلة. ليست ترجمة سطحية.'
    },
    body: {
      en: 'One toggle flips the entire interface — direction, fonts, layouts, and copy. Inter for Latin, IBM Plex Sans Arabic for Arabic. Logical CSS properties (start/end) so every spacing, icon, and motion auto-mirrors.',
      ar: 'زر واحد يقلب الواجهة بأكملها — الاتجاه، الخطوط، التخطيطات، النصوص. Inter للاتيني وIBM Plex Sans Arabic للعربي. خصائص CSS منطقية (start/end) لتنعكس المسافات والأيقونات والحركة تلقائيًا.'
    },
    bullets: [
      { en: 'Full RTL layout mirroring', ar: 'انعكاس تخطيط RTL كامل' },
      { en: 'Native font per language', ar: 'خط أصلي لكل لغة' },
      { en: 'Localised numerals and dates', ar: 'أرقام وتواريخ معرّبة' },
      { en: 'Light + dark themes', ar: 'مظهر فاتح وداكن' }
    ],
    image: 'https://images.unsplash.com/photo-1556139966-4dad26ea1cc8?w=1400&auto=format&fit=crop&q=70'
  },
  {
    id: 'admin',
    kind: 'list',
    eyebrow: { en: '09 · PRODUCT — ADMIN SIDE', ar: '09 · المنتج — لوحة الإدارة' },
    title: {
      en: 'Dealer dashboard preview.',
      ar: 'معاينة لوحة الوكيل.'
    },
    subtitle: {
      en: 'Mock-only in MVP. Showcases the full Phase 2 dealer flow.',
      ar: 'معاينة فقط في النموذج الأولي. تعرض تدفق الوكيل الكامل للمرحلة الثانية.'
    },
    bullets: [
      { en: 'Inventory list — search, filter by status, inline status change', ar: 'قائمة المخزون — بحث وتصفية بالحالة وتغيير حالة سريع' },
      { en: '6-step car form: basics, specs, photos, inspection, timeline, description', ar: 'نموذج إضافة من 6 خطوات: أساسيات، مواصفات، صور، فحص، خط زمني، وصف' },
      { en: 'Photo drop zone with drag-reorder + primary photo', ar: 'منطقة إفلات صور مع إعادة ترتيب وصورة رئيسية' },
      { en: '50-point inspection editor with live score', ar: 'محرر فحص 50 نقطة مع حساب الدرجة المباشر' },
      { en: 'Repair timeline editor with photos per stage', ar: 'محرر سجل الإصلاح مع صور لكل مرحلة' },
      { en: 'Leads inbox: WhatsApp, test drive, form, phone — CSV export', ar: 'صندوق العملاء المحتملين: واتساب وتجربة قيادة ونموذج وهاتف — تصدير CSV' },
      { en: 'Settings: WhatsApp number, hours, address, ROP/VAT', ar: 'الإعدادات: رقم واتساب، الساعات، العنوان، التسجيل والضريبة' },
      { en: 'Analytics: visits, inquiries, conversion, top inquired cars', ar: 'تحليلات: زيارات، استفسارات، تحويل، أعلى السيارات استفسارًا' }
    ]
  },
  {
    id: 'pwa',
    kind: 'centered',
    eyebrow: { en: '10 · PROGRESSIVE WEB APP', ar: '10 · تطبيق ويب تقدمي' },
    title: {
      en: 'Installable. Offline-aware. Native feel.',
      ar: 'قابل للتثبيت. يعمل بدون اتصال. بإحساس تطبيق أصلي.'
    },
    subtitle: {
      en: 'Add to home screen on Android and iOS. Service worker caches the shell. Mobile bottom nav with animated active indicator. Splash screens, theme color, app icons (192/512/maskable).',
      ar: 'أضفه إلى الشاشة الرئيسية على أندرويد و iOS. عامل الخدمة يخزّن الواجهة. شريط تنقل سفلي للهاتف بمؤشر نشط متحرك. شاشات بداية، لون السمة، أيقونات (192/512/قابلة للقناع).'
    },
    bullets: [
      { en: 'Install prompt with iOS Safari fallback hint', ar: 'دعوة تثبيت مع تلميح بديل لـ iOS Safari' },
      { en: 'Network-first navigations + offline page', ar: 'تنقلات أولوية للشبكة + صفحة بدون اتصال' },
      { en: 'Stale-while-revalidate caching for images', ar: 'تخزين الصور بنمط Stale-while-revalidate' },
      { en: 'Mobile bottom nav (glass-morphism, 5 tabs)', ar: 'شريط تنقل سفلي للهاتف (زجاجي، 5 تبويبات)' }
    ]
  },
  {
    id: 'tech',
    kind: 'list',
    eyebrow: { en: '11 · TECHNOLOGY', ar: '11 · التقنية' },
    title: {
      en: 'Modern, scalable, GCC-ready.',
      ar: 'حديثة، قابلة للتوسع، جاهزة للخليج.'
    },
    bullets: [
      { en: 'Frontend — Next.js 14 App Router, TypeScript strict, Tailwind', ar: 'الواجهة — Next.js 14، TypeScript، Tailwind' },
      { en: 'Animation — framer-motion (cards, modal, drawer, nav)', ar: 'الحركة — framer-motion (البطاقات، النوافذ، الأدراج، التنقل)' },
      { en: 'Forms — react-hook-form + zod validation', ar: 'النماذج — react-hook-form + تحقق zod' },
      { en: 'PWA — custom manifest + service worker + maskable icons', ar: 'PWA — manifest وخدمة عاملة وأيقونات مخصصة' },
      { en: 'SEO — schema.org Vehicle JSON-LD, sitemap, hreflang', ar: 'SEO — JSON-LD للسيارات، خريطة الموقع، hreflang' },
      { en: 'Deploy — GitHub Actions → GitHub Pages (static export)', ar: 'النشر — GitHub Actions → GitHub Pages (تصدير ثابت)' },
      { en: 'Phase 2 backend target — Laravel or Node.js + PostgreSQL + Cloudinary', ar: 'هدف الواجهة الخلفية للمرحلة 2 — Laravel أو Node.js + PostgreSQL + Cloudinary' }
    ]
  },
  {
    id: 'roadmap',
    kind: 'phases',
    eyebrow: { en: '12 · ROADMAP', ar: '12 · خارطة الطريق' },
    title: {
      en: 'From MVP to GCC-wide platform.',
      ar: 'من النموذج الأولي إلى منصة خليجية شاملة.'
    },
    phases: [
      { tag: 'M 1-3',  title: { en: 'MVP launch',         ar: 'إطلاق النموذج الأولي' }, body: { en: 'This release. Public site + admin preview, 12+ cars, WhatsApp funnel.',                ar: 'هذا الإصدار. موقع عام + معاينة لوحة الإدارة، 12+ سيارة، قمع واتساب.' } },
      { tag: 'M 4-6',  title: { en: 'Real backend',        ar: 'خلفية حقيقية' },          body: { en: 'API, DB, auth, image upload, persistent leads, Google Analytics.',                  ar: 'API وقاعدة بيانات وتسجيل دخول ورفع صور وعملاء محتملين دائمين وتحليلات.' } },
      { tag: 'M 7-12', title: { en: 'Marketplace',         ar: 'سوق إلكتروني' },          body: { en: 'Verified sellers, multi-seller listings, Thawani payments, dealer plans.',          ar: 'بائعون موثقون، قوائم متعددة البائعين، مدفوعات ثواني، خطط الوكلاء.' } },
      { tag: 'Y 2',    title: { en: 'Full ecosystem',      ar: 'منظومة متكاملة' },        body: { en: 'Financing calculator, insurance integration, React Native app, GCC expansion.',     ar: 'حاسبة تمويل، تكامل تأمين، تطبيق React Native، توسع خليجي.' } }
    ]
  },
  {
    id: 'budget',
    kind: 'pricing',
    eyebrow: { en: '13 · BUDGET TIERS', ar: '13 · شرائح الميزانية' },
    title: {
      en: 'Three packages. One recommendation.',
      ar: 'ثلاث باقات. توصية واحدة.'
    },
    pricing: [
      { tier: { en: 'Low — WordPress MVP',         ar: 'منخفضة — WordPress' },        price: '800–1,500 OMR',  features: { en: 'Basic listings, WhatsApp integration, fast launch.', ar: 'إعلانات أساسية، تكامل واتساب، إطلاق سريع.' } },
      { tier: { en: 'Recommended — Custom build',  ar: 'موصى بها — مخصصة' },          price: '3,000–6,000 OMR', features: { en: 'Custom Next.js + Laravel, professional UI, Phase 1+2 complete, scalable.', ar: 'Next.js + Laravel مخصصة، واجهة احترافية، المرحلة 1+2 كاملة، قابلة للتوسع.' } },
      { tier: { en: 'High — Marketplace ready',    ar: 'عالية — جاهزة للسوق' },        price: '10,000–18,000 OMR', features: { en: 'Full marketplace, payments, multi-language, dealer dashboards, regional-ready.', ar: 'سوق كامل، مدفوعات، متعدد اللغات، لوحات الوكلاء، جاهز إقليميًا.' } }
    ]
  },
  {
    id: 'closing',
    kind: 'closing',
    eyebrow: { en: 'NEXT STEPS', ar: 'الخطوات التالية' },
    title: {
      en: 'Ready when you are.',
      ar: 'جاهزون متى استعديت.'
    },
    subtitle: {
      en: 'Review the live MVP, share with stakeholders, and let us know which phase to build next.',
      ar: 'راجع النموذج الحي، شاركه مع الفريق، وأخبرنا بالمرحلة التالية للبناء.'
    },
    bullets: [
      { en: 'Live demo: de-ali.github.io/motara', ar: 'العرض المباشر: de-ali.github.io/motara' },
      { en: 'Admin preview: /admin/login (any credentials)', ar: 'معاينة لوحة التحكم: /admin/login (أي بيانات اعتماد)' },
      { en: 'Source: github.com/De-Ali/motara', ar: 'الكود: github.com/De-Ali/motara' }
    ]
  }
];
