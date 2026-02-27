import React from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { OrderCard } from '@/components/walmart/purchase-history/OrderCard';
import { AutoCareOrderCard } from '@/components/walmart/purchase-history/AutoCareOrderCard';
import { CurbsideOrderCard } from '@/components/walmart/purchase-history/CurbsideOrderCard';
import { CombinedOrderCard } from '@/components/walmart/purchase-history/CombinedOrderCard';
import { DelayedDeliveryCard } from '@/components/walmart/purchase-history/DelayedDeliveryCard';
import { InlineAdBanner } from '@/components/walmart/purchase-history/InlineAdBanner';
import { ReviewPromptBanner } from '@/components/walmart/purchase-history/ReviewPromptBanner';

// ── Shared image helpers ────────────────────────────────────────────────────
const CDN = 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F';
function img(hash: string, alt: string) {
  return { src: `${CDN}${hash}?format=webp&width=400`, alt };
}

const P = {
  bananas:     img('3722ac211f454e0e981b44c68bd71f32', 'Organic Bananas'),
  avocado:     img('5d243d5fa5384060878d8e665e30b97a', 'Avocado'),
  blueberries: img('23fbfba8c5334a6e97499ee2bcbdeeed', 'Blueberries'),
  strawberries:img('182fe6cfc6cc4e94935dbbe85d069c17', 'Strawberries'),
  milk:        img('4275c57e09134f118110d61ffaed7f3e', 'Great Value Whole Milk'),
  eggs:        img('78ef20205e3c4c4d89a0402b3651cfaf', 'Great Value Cage Free Eggs'),
  tide:        img('1dc32c7426d2475a943854ef53106014', 'Tide Ultra OXI'),
  bounce:      img('439fe5b0b4304c4a921ed8602bb1f23c', 'Bounce Mega Sheets'),
  wateringCan: img('3807f1f88c0f42ab974b5b59ab07ff8b', 'Black Metal Watering Can'),
  firePit:     img('0c564c139118430c914ca80d9fe80dc9', 'Outdoor Fire Pit'),
  switch:      img('117a3b8c29e94104986149ff470e0f0b', 'Nintendo Switch™'),
  marioKart:   img('f58f628972ee4b62a864595c74d87835', 'Mario Kart 8 Deluxe'),
};

const GEICO_LOGO = `${CDN}e49854d53dde4904a3644e06872e21b1?format=webp&width=400`;
const GEICO_AD   = `${CDN}b7ecbf94d42b4e7aafd823d851677509?format=webp&width=400`;
const REVIEW_CTA = `${CDN}76440250dedc40518f93ea76656ae0eb?format=webp&width=400`;

// ── Auto Care order data (shared between two patterns) ──────────────────────
const AUTO_CARE_CARD = {
  orderType: 'auto' as const,
  location: 'Carrollton Supercenter at 1213 Trinity Mills Rd',
  statusHeading: 'Sat, Mar 7, 10:00am–11:00am',
  products: [],
  serviceDetails: {
    vehicle: '2019 Toyota Camry',
    services: ['Conventional Oil & Filter Change', 'Tire Rotation'],
    serviceItems: [
      {
        name: 'Conventional Oil & Filter Change',
        variant: 'Conventional oil - Pennzoil',
        price: '$29.88',
        capacity: 'Up to 5 qts.',
        notes: ['Additional charges may apply if more oil is needed.'],
      },
      {
        name: 'Tire Rotation',
        variant: 'Standard 4-tire rotation',
        price: '$14.88',
        notes: ['Includes inspection of tread depth and tire pressure.'],
      },
    ],
    appointmentContact: 'Marcus Johnson',
    storePhone: '(972) 466-2228',
    storeHours: '7am to 7pm',
    serviceInstructions: 'Please check the cabin air filter as well.',
  },
  orderTotal: '$89.88',
  actions: [
    { label: 'Check in', variant: 'primary' as const },
    { label: 'Reschedule', variant: 'secondary' as const },
    { label: 'View details', variant: 'secondary' as const },
  ],
};

const CURBSIDE_CARD = {
  orderType: 'curbside' as const,
  location: 'Carrollton Supercenter at 1213 Trinity Mills Rd',
  statusHeading: 'Sat, Mar 7, 12:00pm–1:00pm',
  timelineStep: 'placed' as const,
  timelineVariant: 'pickup' as const,
  addItemsBanner: '1hr 20min left to add to your order',
  products: [P.milk, P.eggs, P.bananas, P.avocado],
  orderTotal: '$85.00',
  actions: [
    { label: 'Get it now', variant: 'primary' as const },
    { label: 'Edit items', variant: 'secondary' as const },
    { label: 'View details', variant: 'secondary' as const },
  ],
};

// ── Pattern entry type ────────────────────────────────────────────────────────
interface PatternEntry {
  id: string;
  title: string;
  prompt: string;
  preview: React.ReactNode;
}

const PATTERNS: PatternEntry[] = [
  {
    id: 'standard-delivery',
    title: 'Completed delivery order',
    prompt: 'Show a completed grocery delivery order from Feb 15 with product thumbnails, order total, and a "Start a return" option.',
    preview: (
      <OrderCard
        orderType="delivery"
        statusHeading="Delivered on Feb 15"
        timelineStep="delivered"
        products={[P.bananas, P.blueberries, P.avocado, P.milk]}
        orderTotal="$41.90"
        showStartReturn
        actions={[{ label: 'View details', variant: 'secondary' }]}
      />
    ),
  },
  {
    id: 'curbside-completed',
    title: 'Completed curbside pickup',
    prompt: 'Show a curbside pickup order that was already collected, with store location, products, and a "View details" button.',
    preview: (
      <CurbsideOrderCard
        orderType="curbside"
        location="Carrollton Supercenter at 1213 Trinity Mills Rd"
        statusHeading="Picked up on Jan 15"
        timelineVariant="pickup"
        products={[P.wateringCan, P.firePit, P.bananas, P.milk]}
        orderTotal="$247.95"
        showStartReturn
        actions={[{ label: 'View details', variant: 'secondary' }]}
      />
    ),
  },
  {
    id: 'curbside-get-it-now',
    title: 'Active curbside with "Get it now" express upgrade',
    prompt: 'Show an active curbside order with a countdown to edit and a "Get it now" button to upgrade to express delivery for $9.95.',
    preview: (
      <CurbsideOrderCard
        {...CURBSIDE_CARD}
      />
    ),
  },
  {
    id: 'auto-care',
    title: 'Upcoming Auto Care appointment',
    prompt: 'Show a scheduled oil change appointment card with Check in, Reschedule, and View details actions.',
    preview: (
      <AutoCareOrderCard
        {...AUTO_CARE_CARD}
      />
    ),
  },
  {
    id: 'combined-bundle',
    title: 'Oil change + grocery pickup bundled',
    prompt: 'Show a combined card pairing a same-day oil change with a curbside pickup, with a merged bundle total.',
    preview: (
      <CombinedOrderCard
        autoCare={AUTO_CARE_CARD}
        delivery={CURBSIDE_CARD}
        autoCareAppointmentDate={new Date(2026, 2, 7)}
      />
    ),
  },
  {
    id: 'delayed-delivery',
    title: 'Late delivery warning',
    prompt: 'Show an amber warning card for a delivery that\'s running 2 hours late, with options to reschedule, switch to pickup, or cancel.',
    preview: (
      <DelayedDeliveryCard
        statusHeading="Delayed, estimated up to 2 hours"
        delayEstimate="Estimated up to 2 hours late"
        products={[P.strawberries, P.blueberries, P.bananas]}
        orderTotal="$32.47"
      />
    ),
  },
  {
    id: 'inline-ad',
    title: 'Sponsored ad banner between orders',
    prompt: 'Insert a sponsored brand banner between order cards with a logo, headline, and CTA button.',
    preview: (
      <InlineAdBanner
        logoSrc={GEICO_LOGO}
        logoAlt="GEICO"
        headline="15 minutes could save you on car insurance. Really..."
        ctaLabel="Get a quote"
        imageSrc={GEICO_AD}
        imageAlt="GEICO gecko"
      />
    ),
  },
  {
    id: 'review-prompt',
    title: 'Review prompt for recent purchases',
    prompt: 'Show a "Rate your recent purchases" carousel at the top of the order list for items the customer hasn\'t reviewed yet.',
    preview: (
      <ReviewPromptBanner
        products={[
          { name: P.switch.alt, imageSrc: P.switch.src, rating: 3.5 },
          { name: P.marioKart.alt, imageSrc: P.marioKart.src, rating: 4.5 },
        ]}
        ctaIllustration={REVIEW_CTA}
      />
    ),
  },
];

// ── Pattern card wrapper ──────────────────────────────────────────────────────
function PatternSection({ pattern }: { pattern: PatternEntry }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 0,
      borderRadius: '12px',
      border: '1px solid var(--ld-semantic-color-separator, #E3E4E5)',
      overflow: 'hidden',
      backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #fff)',
    }}>
      {/* Label row */}
      <div style={{
        padding: '16px 20px 12px',
        borderBottom: '1px solid var(--ld-semantic-color-separator, #E3E4E5)',
      }}>
        <p style={{
          margin: 0,
          fontSize: '13px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          color: 'var(--ld-semantic-color-text-subtle, #74767C)',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
        }}>
          {pattern.title}
        </p>
      </div>

      {/* Live preview */}
      <div style={{ padding: '24px 20px' }}>
        {pattern.preview}
      </div>

      {/* Prompt strip */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '10px',
        padding: '12px 20px',
        borderTop: '1px solid var(--ld-semantic-color-separator, #E3E4E5)',
        backgroundColor: 'var(--ld-semantic-color-background-subtle, #F2F3F3)',
      }}>
        <span style={{
          flexShrink: 0,
          fontSize: '11px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          color: 'var(--ld-semantic-color-text-subtlest, #74767C)',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          paddingTop: '1px',
        }}>
          Prompt
        </span>
        <p style={{
          margin: 0,
          fontSize: '13px',
          color: 'var(--ld-semantic-color-text, #2E2F32)',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          lineHeight: '1.5',
          fontStyle: 'italic',
        }}>
          "{pattern.prompt}"
        </p>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function OrderCardPatternsPage() {
  return (
    <div style={{
      padding: '48px',
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: 'var(--ld-semantic-font-family-sans)',
    }}>
      <PageHeader
        section="Patterns"
        title="Order Card Patterns"
        description="Ready-to-use card templates for the Purchase History page. Each pattern is a live component — copy the prompt below it to surface it via AI."
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginTop: '8px' }}>
        {PATTERNS.map(pattern => (
          <PatternSection key={pattern.id} pattern={pattern} />
        ))}
      </div>
    </div>
  );
}
