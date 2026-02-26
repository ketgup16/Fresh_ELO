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

const CDN = 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F';

function img(hash: string, alt: string) {
  return { src: `${CDN}${hash}?format=webp&width=800&height=1200`, alt };
}

// ── Product image map ────────────────────────────────────────────────────────
const P = {
  // Fresh Produce
  bananas:       img('3722ac211f454e0e981b44c68bd71f32', 'Organic Bananas'),
  banana:        img('93748c8f78944c21b6ae51fe34608254', 'Banana'),
  avocado:       img('5d243d5fa5384060878d8e665e30b97a', 'Avocado'),
  blueberries:   img('23fbfba8c5334a6e97499ee2bcbdeeed', 'Blueberries'),
  strawberries:  img('182fe6cfc6cc4e94935dbbe85d069c17', 'Strawberries'),
  blackberries:  img('253d78e864f649acb54e079fbeeb861c', 'Blackberries'),
  grapefruit:    img('32f015c99b914a939d4da0575ea302ef', 'Grapefruit'),
  apple:         img('2cd68aff6f9b400ea138f8199f6d2212', 'Apple'),
  greenChili:    img('462eac076149459c8f607f298743b366', 'Green Chili Peppers'),
  redOnion:      img('c0aac98a03ab445db944c2155809258d', 'Red Onion'),
  cilantro:      img('c29bad3ebea8458786d700a4242df533', 'Cilantro'),

  // Dairy & Eggs
  milk:          img('4275c57e09134f118110d61ffaed7f3e', 'Great Value Whole Milk'),
  eggs:          img('78ef20205e3c4c4d89a0402b3651cfaf', 'Great Value Cage Free Eggs'),

  // Pantry & Snacks
  peanutButter:  img('49b526ad3c9e44438dccecf8e3a1f030', 'Adams 100% Natural Peanut Butter'),
  smoresSpread:  img('09092fca09c24496b57e1b0ac474eea0', "bettergoods S'mores Spread"),
  chexMix:       img('3b1c6c21fa734099a7e94fb02336f7a3', 'Chex Mix Traditional Multipack'),
  cereal:        img('2e3ad9b09a894c658b053653b52ae341', 'Great Value Frosted Shredded Wheat'),
  caesarSalad:   img('23784e4b483540e7a03bca9533196ad1', 'Marketside Caesar Salad Kit'),

  // Frozen
  dinoNuggets:   img('69e01c21e958445fb2017a5c822c9db7', 'Great Value Dino Shaped Chicken Nuggets'),
  chickenWings:  img('540b9b7e75c7478e8827b5330ad2a61b', 'bettergoods Garlic Butter Chicken Wings'),
  banquetChicken:img('82f274fed976412d897db9b98de64550', 'Banquet Mega Filets Spicy Crispy Chicken'),

  // Household / Laundry
  tide:          img('1dc32c7426d2475a943854ef53106014', 'Tide Ultra OXI Detergent'),
  bounce:        img('439fe5b0b4304c4a921ed8602bb1f23c', 'Bounce Pet Hair & Lint Guard Mega Sheets'),
  suavitel:      img('01ae669b2324463d8a60af4db27747df', 'Suavitel Field Flowers Fabric Softener'),
  angelSoft:     img('e07a9fb025044c9bb8479349a197c015', 'Angel Soft Toilet Paper 12 Mega Rolls'),
  vivaPaperTowels: img('41ab56aab7094eae9aa760136cc98eeb', 'Viva Signature Cloth Paper Towels'),

  // Home & Garden
  wateringCan:   img('3807f1f88c0f42ab974b5b59ab07ff8b', 'Black Metal Watering Can'),
  topiary:       img('0f8d5b645e4f46b4ab71f33adda8342a', 'Artificial Boxwood Topiary'),
  pillow:        img('d731bd4091e54b028f6cd66296ea4ba8', 'Decorative Throw Pillow'),
  adirondackChair: img('062bc77cad8f44b7b33114eaa7bbaac4', 'Modern Adirondack Chair'),
  rug:           img('e7df4cf2e5c3498291fbdd29d6a604b7', 'Striped Area Rug'),
  firePit:       img('0c564c139118430c914ca80d9fe80dc9', 'Outdoor Fire Pit'),

  // Electronics & Appliances
  jblSpeaker:    img('009b0a2bda494171b74c4d0b9be9467d', 'JBL Clip 3 Portable Bluetooth Speaker'),
  kitchenAid:    img('871a9d01d15e4344aeddd828e6ad96a4', 'KitchenAid Artisan 5-Qt Stand Mixer'),
  nutrBullet:    img('d97202fbf7544db59d1672fca554125c', 'NutriBullet Pro Blender'),
  nintendoSwitch: img('117a3b8c29e94104986149ff470e0f0b', 'Nintendo Switch™ with Neon Blue & Red Joy-Con'),
  marioKart:     img('f58f628972ee4b62a864595c74d87835', 'Mario Kart 8 Deluxe for Nintendo Switch™'),
};

// ── Ad assets ────────────────────────────────────────────────────────────────
const GEICO_LOGO = `${CDN}e49854d53dde4904a3644e06872e21b1?format=webp&width=800&height=1200`;
const GEICO_AD   = `${CDN}b7ecbf94d42b4e7aafd823d851677509?format=webp&width=800&height=1200`;

// ── Review carousel ───────────────────────────────────────────────────────────
const REVIEW_CTA_ILLUSTRATION = `${CDN}76440250dedc40518f93ea76656ae0eb?format=webp&width=800&height=1200`;

const REVIEW_PRODUCTS = [
  { name: P.nintendoSwitch.alt, imageSrc: P.nintendoSwitch.src, rating: 3.5 },
  { name: P.marioKart.alt,      imageSrc: P.marioKart.src,      rating: 4.5 },
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
                  products={[P.milk, P.eggs, P.bananas, P.avocado, P.redOnion, P.blueberries]}
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
                  products={[P.strawberries, P.blueberries, P.bananas]}
                  orderTotal="$32.47"
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
                  products={[P.tide, P.bounce, P.angelSoft, P.vivaPaperTowels]}
                  orderTotal="$67.13"
                  actions={[
                    { label: 'Track order', variant: 'primary' },
                    { label: 'View details', variant: 'secondary' },
                  ]}
                />

                {/* Inline GEICO ad */}
                <InlineAdBanner
                  logoSrc={GEICO_LOGO}
                  logoAlt="GEICO"
                  headline="15 minutes could save you on car insurance. Really..."
                  ctaLabel="Get a quote"
                  imageSrc={GEICO_AD}
                  imageAlt="GEICO gecko — 15 minutes could save you on car insurance"
                />

                {/* Past order: Delivered Mar 4 */}
                <OrderCard
                  orderType="delivery"
                  statusHeading="Delivered on Mar 4"
                  timelineStep="delivered"
                  products={[P.bananas, P.blackberries, P.avocado, P.milk]}
                  orderTotal="$41.90"
                  showStartReturn
                  actions={[{ label: 'View details', variant: 'secondary' }]}
                />

                {/* Past order: Delivered Mar 8 */}
                <OrderCard
                  orderType="delivery"
                  statusHeading="Delivered on Mar 8"
                  timelineStep="delivered"
                  products={[P.blueberries, P.strawberries, P.grapefruit, P.bananas, P.milk, P.tide]}
                  returnNotice="You still have items to return in this order"
                  returnDeadline="Jun 22"
                  actions={[{ label: 'View details', variant: 'secondary' }]}
                />

                {/* Past order: Shipping Mar 5 — electronics */}
                <OrderCard
                  orderType="shipping"
                  seller="WorldWide Inc"
                  fulfilledBy="Walmart"
                  statusHeading="Delivered on Mar 5"
                  timelineStep="delivered"
                  products={[P.nintendoSwitch, P.marioKart, P.jblSpeaker]}
                  orderTotal="$385.00"
                  showStartReturn
                  actions={[{ label: 'View details', variant: 'secondary' }]}
                />

                {/* Past order: Shipping Feb 28 — appliances */}
                <OrderCard
                  orderType="shipping"
                  seller="WorldWide Inc"
                  fulfilledBy="Walmart"
                  statusHeading="Delivered on Feb 28"
                  products={[P.kitchenAid, P.nutrBullet]}
                  orderTotal="$289.98"
                  actions={[{ label: 'View details', variant: 'secondary' }]}
                />

                {/* Past order: Curbside pickup Feb 25 — home & garden */}
                <OrderCard
                  orderType="curbside"
                  location="Carrollton Supercenter at 1213 Trinity Mills Rd"
                  statusHeading="Picked up on Feb 25"
                  timelineVariant="pickup"
                  products={[P.wateringCan, P.adirondackChair, P.firePit, P.rug]}
                  orderTotal="$247.95"
                  showStartReturn
                  actions={[{ label: 'View details', variant: 'secondary' }]}
                />

                {/* Past order: Store purchase Feb 19 */}
                <OrderCard
                  orderType="store"
                  statusHeading="Feb 19, 2024 purchase"
                  products={[P.milk, P.bananas, P.eggs, P.peanutButter, P.cereal, P.chexMix]}
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
