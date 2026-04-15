import { ReactNode } from 'react';
import { BottomNav } from './BottomNav';
import { AndroidBottomNav } from './AndroidBottomNav';
import { MobileTopNav } from './MobileTopNav';
import { useLayoutSettings } from '@/contexts/LayoutSettingsContext';
import { NativeStatusBar } from './NativeStatusBar';
import styles from './ResponsiveLayout.module.css';

interface ResponsiveLayoutProps {
  children: ReactNode;
  showMobileNav?: boolean;
  showMobileTopNav?: boolean;
  showOrderStatusBanner?: boolean;
  showHomeExtras?: boolean;
  /** @deprecated No longer used in native-only layout */
  maxWidth?: string;
  mobileActiveTab?: 'shop' | 'heart' | 'user';
  nativeStatusBarVariant?: 'blue' | 'white';
  mobileTopNavTitle?: string;
}

export function ResponsiveLayout({
  children,
  showMobileNav = true,
  showMobileTopNav = true,
  showOrderStatusBanner = false,
  showHomeExtras = false,
  mobileActiveTab = 'shop',
  nativeStatusBarVariant = 'blue',
  mobileTopNavTitle,
}: ResponsiveLayoutProps) {
  const { platform } = useLayoutSettings();

  return (
    <div className={styles.root}>
      {/* Native status bar + top nav */}
      {showMobileNav && (
        <div className={[styles.nativeNavWrapper, nativeStatusBarVariant === 'white' ? styles.nativeNavWrapperWhite : ''].filter(Boolean).join(' ')}>
          <NativeStatusBar platform={platform} />
          {showMobileTopNav && <MobileTopNav showHomeExtras={showHomeExtras} pageTitle={mobileTopNavTitle} />}
        </div>
      )}

      <main className={styles.main}>
        <div className={styles.contentContainer}>
          {children}
        </div>
      </main>

      {/* Bottom nav */}
      {showMobileNav && platform === 'android' && (
        <AndroidBottomNav activeTab={mobileActiveTab === 'heart' ? 'heart' : mobileActiveTab === 'user' ? 'account' : 'shop'} />
      )}
      {showMobileNav && platform !== 'android' && (
        <div className={styles.mobileNavWrapper}>
          <BottomNav activeTab={mobileActiveTab} />
        </div>
      )}
    </div>
  );
}

export function MobileOnlyLayout({ children }: { children: ReactNode }) {
  return (
    <ResponsiveLayout showMobileNav={true}>
      {children}
    </ResponsiveLayout>
  );
}
