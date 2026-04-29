'use client';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import WhatsAppFAB from './WhatsAppFAB';
import CompareDrawer from './CompareDrawer';
import CookieBanner from './CookieBanner';
import SearchPalette from './SearchPalette';
import SkipLink from './SkipLink';
import BottomNav from './BottomNav';
import InstallPrompt from './InstallPrompt';

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const path = usePathname() ?? '';
  const isAdmin = path.startsWith('/admin');
  const isDeck = path.startsWith('/presentation');
  if (isAdmin || isDeck) return <>{children}</>;
  return (
    <>
      <SkipLink />
      <Header />
      <main id="main-content" className="pb-32 lg:pb-32">{children}</main>
      <Footer />
      <WhatsAppFAB />
      <CompareDrawer />
      <BottomNav />
      <CookieBanner />
      <SearchPalette />
      <InstallPrompt />
    </>
  );
}
