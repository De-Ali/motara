import type { Metadata, Viewport } from 'next';
import { Inter, IBM_Plex_Sans_Arabic } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import SiteChrome from '@/components/SiteChrome';
import RegisterSW from '@/components/RegisterSW';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const arabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-arabic',
  display: 'swap'
});

export const metadata: Metadata = {
  title: { default: 'Motara Auto · Certified Used Cars in Oman', template: '%s · Motara Auto' },
  description:
    "Oman's most transparent certified used-car platform. 50-point inspection, repair history, and warranty included on every car. Muscat-based.",
  applicationName: 'Motara Auto',
  manifest: '/manifest.webmanifest',
  metadataBase: new URL((process.env.NEXT_PUBLIC_BASE_PATH ? `https://de-ali.github.io${process.env.NEXT_PUBLIC_BASE_PATH}` : 'https://motara-auto.om')),
  appleWebApp: { capable: true, statusBarStyle: 'default', title: 'Motara Auto' },
  formatDetection: { telephone: false },
  icons: {
    icon: [
      { url: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/icons/icon.svg`, type: 'image/svg+xml' },
      { url: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/icons/icon-192.png`, sizes: '192x192', type: 'image/png' },
      { url: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/icons/icon-512.png`, sizes: '512x512', type: 'image/png' }
    ],
    apple: [{ url: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/icons/apple-touch.png`, sizes: '180x180' }]
  },
  openGraph: {
    type: 'website',
    siteName: 'Motara Auto',
    title: 'Motara Auto · Certified Used Cars in Oman',
    description:
      "Imported. Inspected. Warrantied. Buy a used car you can actually trust — in Muscat, Oman.",
    images: [`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/og.jpg`]
  },
  twitter: { card: 'summary_large_image', title: 'Motara Auto', description: "Oman's most transparent used-car platform." },
  robots: { index: true, follow: true }
};

export const viewport: Viewport = {
  themeColor: '#0F4C5C',
  viewportFit: 'cover',
  width: 'device-width',
  initialScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning className={`${inter.variable} ${arabic.variable}`}>
      <body className="relative min-h-screen antialiased">
        <Providers>
          <SiteChrome>{children}</SiteChrome>
          <RegisterSW />
        </Providers>
      </body>
    </html>
  );
}
