import { ReactNode } from 'react';
import { BottomNav } from './BottomNav';
import { DesktopHeader } from './DesktopHeader';
import { DesktopFooter } from './DesktopFooter';
import { MobileTopNav } from './MobileTopNav';
import { SubNav } from './SubNav';
import { PromoBanner } from './PromoBanner';
import { OrderStatusBanner } from './OrderStatusBanner';
import styles from './ResponsiveLayout.module.css';

interface ResponsiveLayoutProps {
  children: ReactNode;
  showMobileNav?: boolean;
  showDesktopHeader?: boolean;
  showOrderStatusBanner?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

const maxWidthClassMap: Record<string, string> = {
  sm: styles.maxWidthSm,
  md: styles.maxWidthMd,
  lg: styles.maxWidthLg,
  xl: styles.maxWidthXl,
  '2xl': styles.maxWidth2xl,
  full: styles.maxWidthFull,
};

export function ResponsiveLayout({
  children,
  showMobileNav = true,
  showDesktopHeader = true,
  showOrderStatusBanner = false,
  maxWidth = '2xl',
}: ResponsiveLayoutProps) {
  const maxWidthClass = maxWidthClassMap[maxWidth] || styles.maxWidth2xl;

  return (
    <div className={styles.root}>
      {/* Mobile top nav — hidden on desktop via lg:hidden CSS */}
      {showMobileNav && <MobileTopNav />}
      {/* Desktop header — hidden on mobile via CSS */}
      {showDesktopHeader && <DesktopHeader />}
      {showDesktopHeader && <SubNav />}
      {showDesktopHeader && <PromoBanner />}

      <main className={styles.main}>
        <div className={`${styles.contentContainer} ${maxWidthClass}`}>
          {showOrderStatusBanner && <OrderStatusBanner />}
          {children}
        </div>
      </main>

      {showMobileNav && (
        <div className={styles.mobileNavWrapper}>
          <BottomNav />
        </div>
      )}

      <DesktopFooter />
    </div>
  );
}

export function MobileOnlyLayout({ children }: { children: ReactNode }) {
  return (
    <ResponsiveLayout showDesktopHeader={false} showMobileNav={true} maxWidth="full">
      {children}
    </ResponsiveLayout>
  );
}

export function DesktopOnlyLayout({ children }: { children: ReactNode }) {
  return (
    <ResponsiveLayout showDesktopHeader={true} showMobileNav={false} maxWidth="2xl">
      {children}
    </ResponsiveLayout>
  );
}
