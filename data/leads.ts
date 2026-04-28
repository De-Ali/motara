export type Lead = {
  id: string;
  name: string;
  phone: string;
  channel: 'WhatsApp' | 'Test Drive' | 'Form' | 'Phone';
  carSlug?: string;
  carName?: string;
  message: string;
  status: 'New' | 'Contacted' | 'Closed';
  createdAt: string;
};

export const seedLeads: Lead[] = [
  { id: 'l1', name: 'Khalid Al-Balushi', phone: '+96891112233', channel: 'WhatsApp',  carSlug: 'toyota-land-cruiser-2020-vxr', carName: '2020 Toyota Land Cruiser VXR', message: 'Is this still available? Can I see it tomorrow?', status: 'New',       createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString() },
  { id: 'l2', name: 'Priya Menon',       phone: '+96891445566', channel: 'Test Drive', carSlug: 'mazda-cx5-2022-signature',       carName: '2022 Mazda CX-5 Signature',     message: 'Saturday 11am works for me.',                 status: 'Contacted', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString() },
  { id: 'l3', name: 'Ahmed Al-Saidi',    phone: '+96894778899', channel: 'WhatsApp',   carSlug: 'toyota-hilux-2021-double-cab',   carName: '2021 Toyota Hilux',             message: 'Driving from Sohar — final price?',           status: 'New',       createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString() },
  { id: 'l4', name: 'Maria Santos',      phone: '+96892334411', channel: 'Form',       carName: 'General inquiry',               message: 'Do you offer financing through Bank Muscat?', status: 'New',                                createdAt: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString() },
  { id: 'l5', name: 'Faisal Al-Rashidi', phone: '+96895221177', channel: 'Phone',      carSlug: 'lexus-lx570-2018',               carName: '2018 Lexus LX 570',             message: 'Called — wants warranty terms emailed.',      status: 'Closed',    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString() },
  { id: 'l6', name: 'Sara Al-Habsi',     phone: '+96892887766', channel: 'WhatsApp',   carSlug: 'hyundai-tucson-2022-gls',         carName: '2022 Hyundai Tucson GLS',       message: 'Color options available?',                    status: 'Contacted', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString() },
  { id: 'l7', name: 'Imran Khan',        phone: '+96891667799', channel: 'Test Drive', carSlug: 'mercedes-e300-2021-amg-line',     carName: '2021 Mercedes E 300 AMG-Line',  message: 'When does reservation lift?',                 status: 'New',       createdAt: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString() }
];
