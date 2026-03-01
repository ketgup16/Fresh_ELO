import React, { useState } from 'react';
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
  bananas:       img('3722ac211f454e0e981b44c68bd71f32', 'Organic Bananas'),
  avocado:       img('5d243d5fa5384060878d8e665e30b97a', 'Avocado'),
  blueberries:   img('23fbfba8c5334a6e97499ee2bcbdeeed', 'Blueberries'),
  strawberries:  img('182fe6cfc6cc4e94935dbbe85d069c17', 'Strawberries'),
  blackberries:  img('253d78e864f649acb54e079fbeeb861c', 'Blackberries'),
  grapefruit:    img('32f015c99b914a939d4da0575ea302ef', 'Grapefruit'),
  redOnion:      img('c0aac98a03ab445db944c2155809258d', 'Red Onion'),
  milk:          img('4275c57e09134f118110d61ffaed7f3e', 'Great Value Whole Milk'),
  eggs:          img('78ef20205e3c4c4d89a0402b3651cfaf', 'Great Value Cage Free Eggs'),
  tide:          img('1dc32c7426d2475a943854ef53106014', 'Tide Ultra OXI'),
  bounce:        img('439fe5b0b4304c4a921ed8602bb1f23c', 'Bounce Mega Sheets'),
  angelSoft:     img('e07a9fb025044c9bb8479349a197c015', 'Angel Soft Toilet Paper'),
  wateringCan:   img('3807f1f88c0f42ab974b5b59ab07ff8b', 'Black Metal Watering Can'),
  firePit:       img('0c564c139118430c914ca80d9fe80dc9', 'Outdoor Fire Pit'),
  kitchenAid:    img('871a9d01d15e4344aeddd828e6ad96a4', 'KitchenAid Artisan Stand Mixer'),
  nutrBullet:    img('d97202fbf7544db59d1672fca554125c', 'NutriBullet Pro Blender'),
  switch:        img('117a3b8c29e94104986149ff470e0f0b', 'Nintendo Switch™'),
  marioKart:     img('f58f628972ee4b62a864595c74d87835', 'Mario Kart 8 Deluxe'),
  jblSpeaker:    img('009b0a2bda494171b74c4d0b9be9467d', 'JBL Clip 3 Bluetooth Speaker'),
  peanutButter:  img('49b526ad3c9e44438dccecf8e3a1f030', 'Adams Peanut Butter'),
  cereal:        img('2e3ad9b09a894c658b053653b52ae341', 'Great Value Frosted Shredded Wheat'),
  chexMix:       img('3b1c6c21fa734099a7e94fb02336f7a3', 'Chex Mix Traditional Multipack'),
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
    prompt: 'Show a completed grocery delivery order with product thumbnails, order total, and a "Start a return" option.',
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
    prompt: 'Show an active curbside order with a countdown to edit and a "Get it now" button to upgrade to express delivery.',
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
    prompt: 'Show a delayed delivery warning card with options to reschedule, switch to pickup, or cancel.',
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
  {
    id: 'delivery-on-the-way',
    title: 'Delivery in transit',
    prompt: 'Show a grocery delivery order that is on its way, with a track order button.',
    preview: (
      <OrderCard
        orderType="delivery"
        statusHeading="Arrives today, 5pm–6pm"
        timelineStep="on-the-way"
        products={[P.tide, P.bounce, P.angelSoft, P.milk]}
        orderTotal="$67.13"
        actions={[
          { label: 'Track order', variant: 'primary' },
          { label: 'View details', variant: 'secondary' },
        ]}
      />
    ),
  },
  {
    id: 'delivery-with-return',
    title: 'Completed delivery with return notice',
    prompt: 'Show a completed delivery order with an active return deadline notice.',
    preview: (
      <OrderCard
        orderType="delivery"
        statusHeading="Delivered on Feb 10"
        timelineStep="delivered"
        products={[P.blueberries, P.strawberries, P.grapefruit, P.bananas, P.milk, P.tide]}
        orderTotal="$67.13"
        returnNotice="You still have items to return in this order"
        returnDeadline="Jun 22"
        actions={[{ label: 'View details', variant: 'secondary' }]}
      />
    ),
  },
  {
    id: 'shipping-electronics',
    title: 'Shipped electronics order',
    prompt: 'Show a delivered shipping order for electronics with a third-party seller and a "Start a return" option.',
    preview: (
      <OrderCard
        orderType="shipping"
        seller="WorldWide Inc"
        fulfilledBy="Walmart"
        statusHeading="Delivered on Jan 28"
        timelineStep="delivered"
        products={[P.switch, P.marioKart, P.jblSpeaker]}
        orderTotal="$385.00"
        showStartReturn
        actions={[{ label: 'View details', variant: 'secondary' }]}
      />
    ),
  },
  {
    id: 'shipping-appliances',
    title: 'Shipped appliances order',
    prompt: 'Show a delivered shipping order for home appliances with a third-party seller.',
    preview: (
      <OrderCard
        orderType="shipping"
        seller="WorldWide Inc"
        fulfilledBy="Walmart"
        statusHeading="Delivered on Jan 20"
        products={[P.kitchenAid, P.nutrBullet]}
        orderTotal="$289.98"
        actions={[{ label: 'View details', variant: 'secondary' }]}
      />
    ),
  },
  {
    id: 'store-purchase',
    title: 'In-store purchase',
    prompt: 'Show an in-store purchase receipt with grocery items and a "Start a return" option.',
    preview: (
      <OrderCard
        orderType="store"
        statusHeading="Jan 10 purchase"
        products={[P.milk, P.bananas, P.eggs, P.peanutButter, P.cereal, P.chexMix]}
        orderTotal="$45.08"
        showStartReturn
        actions={[{ label: 'View details', variant: 'secondary' }]}
      />
    ),
  },
];

// ── Copy button ───────────────────────────────────────────────────────────────
function CopyPromptButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <button
      onClick={handleCopy}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        width: '100%',
        padding: '12px 20px',
        background: copied
          ? 'var(--ld-semantic-color-fill-positive-subtle, #EAF6ED)'
          : 'var(--ld-semantic-color-background-subtle, #F2F3F3)',
        border: 'none',
        borderTop: '1px solid var(--ld-semantic-color-separator, #E3E4E5)',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'background 0.15s ease',
        fontFamily: 'var(--ld-semantic-font-family-sans)',
      }}
    >
      {/* Left: label + prompt text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <span style={{
          display: 'block',
          fontSize: '11px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          color: copied
            ? 'var(--ld-semantic-color-text-positive, #1A7A34)'
            : 'var(--ld-semantic-color-text-subtlest, #74767C)',
          marginBottom: '4px',
        }}>
          {copied ? 'Copied!' : 'Prompt'}
        </span>
        <span style={{
          display: 'block',
          fontSize: '13px',
          fontStyle: 'italic',
          color: 'var(--ld-semantic-color-text, #2E2F32)',
          lineHeight: '1.5',
        }}>
          "{text}"
        </span>
      </div>

      {/* Right: copy icon */}
      <span style={{
        flexShrink: 0,
        marginTop: '2px',
        color: copied
          ? 'var(--ld-semantic-color-text-positive, #1A7A34)'
          : 'var(--ld-semantic-color-text-subtle, #74767C)',
        transition: 'color 0.15s ease',
      }}>
        {copied ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2.5 8.5L6 12L13.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <rect x="5.5" y="1.5" width="9" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M3.5 4.5H2.5C1.95 4.5 1.5 4.95 1.5 5.5V14.5C1.5 15.05 1.95 15.5 2.5 15.5H10.5C11.05 15.5 11.5 15.05 11.5 14.5V13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        )}
      </span>
    </button>
  );
}

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

      {/* Copyable prompt button */}
      <CopyPromptButton text={pattern.prompt} />
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
        section="WCP Patterns"
        title="Order Cards"
        description="Ready-to-use card templates for the Purchase History page. Each pattern is a live component — click the prompt below it to copy it, then paste it into Fusion."
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginTop: '8px' }}>
        {PATTERNS.map(pattern => (
          <PatternSection key={pattern.id} pattern={pattern} />
        ))}
      </div>
    </div>
  );
}
