import { Breadcrumb, BreadcrumbItem } from '@/components/ui/Breadcrumb';
import { ResponsiveLayout } from '@/components/walmart/ResponsiveLayout';
import { SkylineBanner } from '@/components/walmart/SkylineBanner';
import { AccountSideNav } from '@/components/walmart/AccountSideNav';
import styles from './PurchaseHistory.module.css';

export default function PurchaseHistory() {
  return (
    <ResponsiveLayout maxWidth="full">
      <div className={styles.page}>
        {/* Top section: breadcrumbs + divider + banner */}
        <div className={styles.topSection}>
          <div className={styles.breadcrumbRow}>
            <Breadcrumb aria-label="Purchase history navigation">
              <BreadcrumbItem href="/account">Account</BreadcrumbItem>
              <BreadcrumbItem isCurrent>Purchase History</BreadcrumbItem>
            </Breadcrumb>
          </div>

          <div className={styles.divider} />

          <div className={styles.bannerRow}>
            <SkylineBanner
              logoSrc="https://api.builder.io/api/v1/image/assets/TEMP/b1a26e66a9f2b9c467e29b2c6bb339ed58cbcd54?width=154"
              logoAlt="TANYÉ"
              headline="Enhance your kitchen with top tools"
              subtext="Cook like a pro with the best equipment."
              imageSrc="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fb9a1addd35da48df88f41a3052039cd0?format=webp&width=800&height=1200"
              imageAlt="TANYÉ chocolate bar"
            />
          </div>

          <div className={styles.divider} />
        </div>

        {/* Body: side nav + main content */}
        <div className={styles.body}>
          <AccountSideNav />

          <main className={styles.main}>
            <div className={styles.emptyState}>
              <p className={styles.emptyHeading}>No purchases yet</p>
              <p className={styles.emptySubtext}>
                When you place an order on Walmart.com, it will show up here so you can track, return, or buy it again.
              </p>
            </div>
          </main>
        </div>
      </div>
    </ResponsiveLayout>
  );
}
