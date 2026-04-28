'use client';
import { I18nProvider } from '@/lib/i18n';
import { ThemeProvider } from '@/lib/theme';
import { StoreProvider } from '@/lib/store';
import { ToastProvider } from '@/lib/toast';
import { AdminAuthProvider } from '@/lib/admin-auth';
import { AdminStoreProvider } from '@/lib/admin-store';
import { LeadsProvider } from '@/lib/leads-store';
import { SettingsProvider } from '@/lib/settings';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <I18nProvider>
        <SettingsProvider>
          <AdminAuthProvider>
            <AdminStoreProvider>
              <LeadsProvider>
                <StoreProvider>
                  <ToastProvider>{children}</ToastProvider>
                </StoreProvider>
              </LeadsProvider>
            </AdminStoreProvider>
          </AdminAuthProvider>
        </SettingsProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
