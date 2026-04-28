import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Motara Auto · Certified Used Cars in Oman',
    short_name: 'Motara Auto',
    description: "Oman's most transparent certified used-car platform. 50-point inspection, repair history, warranty included.",
    start_url: '/?utm_source=pwa',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#F8F7F4',
    theme_color: '#0F4C5C',
    lang: 'en',
    dir: 'auto',
    categories: ['shopping', 'business', 'automotive'],
    icons: [
      { src: '/icons/icon.svg', type: 'image/svg+xml', sizes: 'any' },
      { src: '/icons/icon-192.png', type: 'image/png', sizes: '192x192', purpose: 'any' },
      { src: '/icons/icon-512.png', type: 'image/png', sizes: '512x512', purpose: 'any' },
      { src: '/icons/maskable-512.png', type: 'image/png', sizes: '512x512', purpose: 'maskable' }
    ]
  };
}
