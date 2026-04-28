'use client';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import WhatsAppFAB from './WhatsAppFAB';
import CompareDrawer from './CompareDrawer';
import CookieBanner from './CookieBanner';
import SearchPalette from './SearchPalette';
import SkipLink from './SkipLink';

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const path = usePathname() ?? '';
  const isAdmin = path.startsWith('/admin');
  if (isAdmin) return <>{children}</>;
  return (
    <>
      <SkipLink />
      <Header />
      <main id="main-content" className="pb-32">{children}</main>
      <Footer />
      <WhatsAppFAB />
      <CompareDrawer />
      <CookieBanner />
      <SearchPalette />
    </>
  );
}
