import { Breadcrumb, BreadcrumbItem } from '@/components/ui/Breadcrumb';
import { Divider } from '@/components/ui/Divider';
import { ResponsiveLayout } from '@/components/walmart/ResponsiveLayout';
import { SkylineBanner } from '@/components/walmart/SkylineBanner';
import { AccountSideNav } from '@/components/walmart/AccountSideNav';
import { PurchaseHistoryFilters } from '@/components/walmart/purchase-history/PurchaseHistoryFilters';
import { ReviewPromptBanner } from '@/components/walmart/purchase-history/ReviewPromptBanner';
import { OrderCard } from '@/components/walmart/purchase-history/OrderCard';
import { InlineAdBanner } from '@/components/walmart/purchase-history/InlineAdBanner';
import styles from './PurchaseHistory.module.css';

// Product image helpers — locally hosted in public/assets/products/
const PRODUCTS = {
  tomato:    { src: '/assets/products/tomato.jpg',      alt: 'Tomatoes' },
  milk:      { src: '/assets/products/milk.jpg',        alt: 'Milk' },
  banana:    { src: '/assets/products/banana.jpg',      alt: 'Banana' },
  berries:   { src: '/assets/products/blueberries.jpg', alt: 'Blueberries' },
  orange:    { src: '/assets/products/oranges.jpg',     alt: 'Oranges' },
  detergent: { src: '/assets/products/detergent.jpg',   alt: 'Laundry Detergent' },
  switch:    { src: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F117a3b8c29e94104986149ff470e0f0b?format=webp&width=800&height=1200', alt: 'Nintendo Switch' },
  mario:     { src: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Ff58f628972ee4b62a864595c74d87835?format=webp&width=800&height=1200', alt: 'Mario Kart Deluxe' },
  watering:  { src: '/assets/products/watering-can.jpg', alt: 'Watering Can' },
};

// CTA card illustration — Figma export (gaming items collage)
const REVIEW_CTA_ILLUSTRATION = 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F76440250dedc40518f93ea76656ae0eb?format=webp&width=800&height=1200';

const REVIEW_PRODUCTS = [
  { name: 'Nintendo Switch™ with Neon Blue and Neon Red Joy-Con', imageSrc: PRODUCTS.switch.src, rating: 3.5 },
  { name: 'MarioKart Deluxe for Nintendo Switch™', imageSrc: PRODUCTS.mario.src, rating: 4.5 },
];

export default function PurchaseHistory() {
  return (
    <ResponsiveLayout maxWidth="full">
      <div className={styles.page}>
        {/* Top: breadcrumbs + banner */}
        <div className={styles.topSection}>
          <div className={styles.breadcrumbRow}>
            <Breadcrumb aria-label="Purchase history navigation">
              <BreadcrumbItem href="/account">Account</BreadcrumbItem>
              <BreadcrumbItem isCurrent>Purchase History</BreadcrumbItem>
            </Breadcrumb>
          </div>
          <Divider />
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
          <Divider />
        </div>

        {/* Body: side nav + main content */}
        <div className={styles.body}>
          <AccountSideNav />

          <main className={styles.main}>
            <div className={styles.content}>
              <h1 className={styles.pageTitle}>Purchase history</h1>

              {/* Search + Filters */}
              <PurchaseHistoryFilters />

              {/* Review Prompt */}
              <ReviewPromptBanner products={REVIEW_PRODUCTS} ctaIllustration={REVIEW_CTA_ILLUSTRATION} />

              {/* Order list */}
              <div className={styles.orderList}>
                {/* Active order: Curbside pickup — editing window open */}
                <OrderCard
                  orderType="curbside"
                  location="Carrollton Supercenter at 1213 Trinity Mills Rd"
                  statusHeading="Wed, May 14, 5pm–6pm"
                  timelineStep="placed"
                  timelineVariant="pickup"
                  addItemsBanner="2hr 35min left to add to your order"
                  products={[
                    PRODUCTS.tomato, PRODUCTS.banana, PRODUCTS.milk,
                    PRODUCTS.orange, PRODUCTS.detergent, PRODUCTS.berries,
                  ]}
                  orderTotal="$85.00"
                  actions={[
                    { label: 'Edit items', variant: 'primary' },
                    { label: 'View details', variant: 'secondary' },
                  ]}
                />

                {/* Active order: Delayed delivery */}
                <OrderCard
                  orderType="delivery"
                  statusHeading="Delayed, estimated up to 2 hours"
                  timelineStep="preparing"
                  isDelayed
                  products={[PRODUCTS.banana, PRODUCTS.berries, PRODUCTS.orange]}
                  orderTotal="$85.00"
                  actions={[
                    { label: 'Reschedule delivery', variant: 'secondary' },
                    { label: 'Pickup instead', variant: 'secondary' },
                    { label: 'View details', variant: 'secondary' },
                    { label: 'Cancel order', variant: 'secondary' },
                  ]}
                />

                {/* Active order: On the way */}
                <OrderCard
                  orderType="delivery"
                  statusHeading="Arrives today, 5pm–6pm"
                  timelineStep="on-the-way"
                  products={[PRODUCTS.detergent, PRODUCTS.milk, PRODUCTS.tomato, PRODUCTS.banana]}
                  orderTotal="$85.00"
                  actions={[
                    { label: 'Track order', variant: 'primary' },
                    { label: 'View details', variant: 'secondary' },
                  ]}
                />

                {/* Inline GEICO ad */}
                <InlineAdBanner
                  logoSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/GEICO_logo.svg/2560px-GEICO_logo.svg.png"
                  logoAlt="GEICO"
                  headline="GEICO: Real service, real savings"
                  ctaLabel="Shop now"
                  imageSrc="https://images.pexels.com/photos/2780143/pexels-photo-2780143.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop"
                  imageAlt="15 minutes could save you on car insurance"
                />

                {/* Past order: Delivered Mar 4 */}
                <OrderCard
                  orderType="delivery"
                  statusHeading="Delivered on Mar 4"
                  timelineStep="delivered"
                  products={[PRODUCTS.banana, PRODUCTS.berries, PRODUCTS.tomato, PRODUCTS.milk]}
                  orderTotal="$85.00"
                  showStartReturn
                  actions={[{ label: 'View details', variant: 'secondary' }]}
                />

                {/* Past order: Delivered Mar 8 */}
                <OrderCard
                  orderType="delivery"
                  statusHeading="Delivered on Mar 8"
                  timelineStep="delivered"
                  products={[
                    PRODUCTS.orange, PRODUCTS.berries, PRODUCTS.tomato,
                    PRODUCTS.banana, PRODUCTS.milk, PRODUCTS.detergent,
                  ]}
                  returnNotice="You still have items to return in this order"
                  returnDeadline="Jun 22"
                  actions={[{ label: 'View details', variant: 'secondary' }]}
                />

                {/* Past order: Shipping Mar 5 */}
                <OrderCard
                  orderType="shipping"
                  seller="WorldWide Inc"
                  fulfilledBy="Walmart"
                  statusHeading="Delivered on Mar 5"
                  timelineStep="delivered"
                  products={[PRODUCTS.watering, PRODUCTS.detergent, PRODUCTS.switch]}
                  orderTotal="$385.00"
                  showStartReturn
                  actions={[{ label: 'View details', variant: 'secondary' }]}
                />

                {/* Past order: Shipping Feb 28 */}
                <OrderCard
                  orderType="shipping"
                  seller="WorldWide Inc"
                  fulfilledBy="Walmart"
                  statusHeading="Delivered on Feb 28"
                  products={[PRODUCTS.watering, PRODUCTS.detergent, PRODUCTS.mario]}
                  actions={[{ label: 'View details', variant: 'secondary' }]}
                />

                {/* Past order: Curbside pickup Feb 25 */}
                <OrderCard
                  orderType="curbside"
                  location="Carrollton Supercenter at 1213 Trinity Mills Rd"
                  statusHeading="Picked up on Feb 25"
                  timelineVariant="pickup"
                  products={[PRODUCTS.watering, PRODUCTS.milk, PRODUCTS.detergent]}
                  orderTotal="$56.95"
                  showStartReturn
                  actions={[{ label: 'View details', variant: 'secondary' }]}
                />

                {/* Past order: Store purchase Feb 19 */}
                <OrderCard
                  orderType="store"
                  statusHeading="Feb 19, 2024 purchase"
                  products={[
                    PRODUCTS.milk, PRODUCTS.banana, PRODUCTS.tomato,
                    PRODUCTS.orange, PRODUCTS.berries, PRODUCTS.detergent,
                  ]}
                  orderTotal="$45.08"
                  showStartReturn
                  actions={[{ label: 'View details', variant: 'secondary' }]}
                />
              </div>

              {/* Pagination */}
              <div className={styles.pagination}>
                <button className={styles.paginationBtn} aria-label="Next page">›</button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ResponsiveLayout>
  );
}
