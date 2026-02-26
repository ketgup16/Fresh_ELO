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

// Product image helpers
const PRODUCTS = {
  tomato: { src: 'https://i5.walmartimages.com/seo/Roma-Tomatoes_8d301408-1ac9-4bb3-9a15-eba6abff7e0b.f01c3e8de6f5c0a8c2aecb6efd66c9aa.jpeg?odnWidth=180&odnHeight=180&odnBg=ffffff', alt: 'Tomatoes' },
  milk: { src: 'https://i5.walmartimages.com/seo/Great-Value-Whole-Vitamin-D-Milk-Gallon-Plastic-Jug_f8bde15a-2a1a-4dd3-b18c-4c1427d4e6ad.f5a0fafde5cef22d8e9d64c7d5e16f28.jpeg?odnWidth=180&odnHeight=180&odnBg=ffffff', alt: 'Milk' },
  banana: { src: 'https://i5.walmartimages.com/seo/Fresh-Banana-Fruit-Each_2f24d1d7-a973-4177-8a98-cfbf67a67148.49ea92e8ab1f01feec3e5e3b78a9cc5e.jpeg?odnWidth=180&odnHeight=180&odnBg=ffffff', alt: 'Banana' },
  berries: { src: 'https://i5.walmartimages.com/seo/Fresh-Blueberries-18-oz_e84b21b8-9d27-40b5-bfaf-f0a05ec87bb4.a4a1b001e27a5dcc7dbe8289f4d62f70.jpeg?odnWidth=180&odnHeight=180&odnBg=ffffff', alt: 'Blueberries' },
  orange: { src: 'https://i5.walmartimages.com/seo/Fresh-Navel-Oranges-Bag-3-lb_c2c6d3fa-c3e0-459c-a7d9-a21cbf4ec40f.e97a3f6f4c7ab3a53d0c4dc4a5f4d7f9.jpeg?odnWidth=180&odnHeight=180&odnBg=ffffff', alt: 'Oranges' },
  detergent: { src: 'https://i5.walmartimages.com/seo/Arm-Hammer-Liquid-Laundry-Detergent-Plus-OxiClean-Odor-Blasters-Fresh-Burst-scent-90-loads-135-fl-oz_4ea7bf36-27cc-4b64-b2a7-ed4c7e95543e.f31b1fead2d87d0b80c2d6ad6e95f10e.jpeg?odnWidth=180&odnHeight=180&odnBg=ffffff', alt: 'Laundry Detergent' },
  switch: { src: 'https://i5.walmartimages.com/seo/Nintendo-Switch-with-Neon-Blue-and-Neon-Red-Joy-Con_0e5c95dc-b39e-4a48-9b44-e3abf41e4ced.bebc7bfb07ba88ccbc879ef462e38e5e.jpeg?odnWidth=180&odnHeight=180&odnBg=ffffff', alt: 'Nintendo Switch' },
  mario: { src: 'https://api.builder.io/api/v1/image/assets/TEMP/80e10dba609dd23bb5c9c29ffd3c7d84697f8acd?width=160', alt: 'Mario Kart Deluxe' },
  watering: { src: 'https://i5.walmartimages.com/seo/2-Gallon-Watering-Can_f2e5a4d6-85e1-4d00-9cad-fd893b41d15e.f2e5a4d6-85e1-4d00-9cad-fd893b41d15e.jpeg?odnWidth=180&odnHeight=180&odnBg=ffffff', alt: 'Watering Can' },
};

const REVIEW_PRODUCTS = [
  { name: 'Nintendo Switch™ with Neon Blue an...', imageSrc: PRODUCTS.switch.src, rating: 3.5 },
  { name: 'MarioKart Deluxe for Nintendo Switc...', imageSrc: PRODUCTS.mario.src, rating: 4.5 },
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
              <ReviewPromptBanner products={REVIEW_PRODUCTS} />

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
