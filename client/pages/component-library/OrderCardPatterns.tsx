import React, { useState } from 'react';
import pageStyles from './OrderCardPatterns.module.css';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { AutoCareOrderCard } from '@/components/walmart/purchase-history/AutoCareOrderCard';
import { CurbsideOrderCard } from '@/components/walmart/purchase-history/CurbsideOrderCard';
import { CombinedOrderCard } from '@/components/walmart/purchase-history/CombinedOrderCard';
import { DelayedDeliveryCard } from '@/components/walmart/purchase-history/DelayedDeliveryCard';
import { MaintenanceHealthCard } from '@/components/walmart/purchase-history/MaintenanceHealthCard';
import { AutoCareUpsellOfferCard } from '@/components/walmart/purchase-history/AutoCareUpsellOfferCard';
import { ServicesCard } from '@/components/walmart/purchase-history/ServicesCard';

// ── Shared image helpers ────────────────────────────────────────────────────
const CDN = 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F';
function img(hash: string, alt: string) {
  return { src: `${CDN}${hash}?format=webp&width=400`, alt };
}

const P = {
  milk:          img('4275c57e09134f118110d61ffaed7f3e', 'Great Value Whole Milk'),
  eggs:          img('78ef20205e3c4c4d89a0402b3651cfaf', 'Great Value Cage Free Eggs'),
  bananas:       img('3722ac211f454e0e981b44c68bd71f32', 'Organic Bananas'),
  avocado:       img('5d243d5fa5384060878d8e665e30b97a', 'Avocado'),
  blueberries:   img('23fbfba8c5334a6e97499ee2bcbdeeed', 'Blueberries'),
  strawberries:  img('182fe6cfc6cc4e94935dbbe85d069c17', 'Strawberries'),
};

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
  // ── Your Services card patterns (A–D) ─────────────────────────────────────────
  {
    id: 'services-urgency-focus',
    title: 'Services: Prescription ready + Auto Care in progress (urgency focus)',
    prompt: 'Show a "Your Services" card highlighting an urgent Prescription ready for pickup (with Alert banner) and Auto Care in progress. Optical is hidden in the collapsed view.',
    preview: (
      <ServicesCard
        services={[
          {
            id: 'rx-ready',
            serviceType: 'PHARMACY',
            serviceLabel: 'Prescription',
            status: 'READY_FOR_PICKUP',
            microcopy: 'Amoxicillin 500mg · ready since 9:15am',
            pickupLocation: 'Oak Lawn Supercenter',
            pickupDate: '2026-03-05',
          },
          {
            id: 'auto-in-progress',
            serviceType: 'AUTO',
            serviceLabel: 'Auto Care',
            status: 'IN_PROGRESS',
            microcopy: 'Oil change in progress',
          },
          {
            id: 'optical-scheduled',
            serviceType: 'OPTICAL',
            serviceLabel: 'Optical',
            status: 'SCHEDULED',
            microcopy: 'Pickup: Mon, Mar 10',
            pickupDate: '2026-03-10',
          },
        ]}
      />
    ),
  },
  {
    id: 'services-all-expanded',
    title: 'Services: All statuses expanded (full range)',
    prompt: 'Show an expanded "Your Services" card with all 4 service types showing every status variant — Ready (green), In Progress (blue), Scheduled (gray), and Canceled (red).',
    preview: (
      <ServicesCard
        defaultExpanded
        services={[
          {
            id: 'rx-ready',
            serviceType: 'PHARMACY',
            serviceLabel: 'Prescription',
            status: 'READY_FOR_PICKUP',
            microcopy: 'Lisinopril 10mg · ready since 8:30am',
            pickupLocation: 'Carrollton Supercenter',
            pickupDate: '2026-03-05',
          },
          {
            id: 'auto-in-progress',
            serviceType: 'AUTO',
            serviceLabel: 'Auto Care',
            status: 'IN_PROGRESS',
            microcopy: 'Tire rotation — est. 45 min remaining',
          },
          {
            id: 'optical-scheduled',
            serviceType: 'OPTICAL',
            serviceLabel: 'Optical',
            status: 'SCHEDULED',
            microcopy: 'Contact lens pickup: Mon, Mar 10',
            pickupDate: '2026-03-10',
          },
          {
            id: 'cake-cancelled',
            serviceType: 'BAKERY',
            serviceLabel: 'Custom Cake',
            status: 'CANCELLED',
            microcopy: 'Order cancelled on Mar 3',
          },
        ]}
      />
    ),
  },
  {
    id: 'services-single-rx-ready',
    title: 'Services: Single Rx ready (minimal state)',
    prompt: 'Show a minimal "Your Services" card with a single Prescription ready for pickup and an urgency Alert banner. No toggle or View All needed.',
    preview: (
      <ServicesCard
        services={[
          {
            id: 'rx-ready',
            serviceType: 'PHARMACY',
            serviceLabel: 'Prescription',
            status: 'READY_FOR_PICKUP',
            microcopy: 'Metformin 1000mg · ready since 10:00am',
            pickupLocation: 'Irving Supercenter',
            pickupDate: '2026-03-05',
          },
        ]}
      />
    ),
  },
  {
    id: 'services-multi-store',
    title: 'Services: Multi-store services',
    prompt: 'Show a "Your Services" card with 3 services across 2 different stores, demonstrating store context in each row microcopy.',
    preview: (
      <ServicesCard
        defaultExpanded
        services={[
          {
            id: 'rx-ready-store1',
            serviceType: 'PHARMACY',
            serviceLabel: 'Prescription',
            status: 'READY_FOR_PICKUP',
            microcopy: 'Oak Lawn Supercenter · ready since 9:00am',
            pickupLocation: 'Oak Lawn Supercenter',
            pickupDate: '2026-03-05',
          },
          {
            id: 'optical-scheduled-store2',
            serviceType: 'OPTICAL',
            serviceLabel: 'Optical',
            status: 'SCHEDULED',
            microcopy: 'Carrollton Supercenter · pickup Mar 10',
            pickupDate: '2026-03-10',
          },
          {
            id: 'auto-processing-store1',
            serviceType: 'AUTO',
            serviceLabel: 'Auto Care',
            status: 'PROCESSING',
            microcopy: 'Oak Lawn Supercenter · submitted today',
          },
        ]}
      />
    ),
  },
  // ── Auto Care Engagement Examples (2 cards, one prompt) ─────────────────────
  {
    id: 'auto-care-engagement',
    title: 'Auto center engagement cards',
    prompt: 'Show 2 ways to improve Auto Care engagement.',
    preview: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <MaintenanceHealthCard
          vehicle="2019 Toyota Camry"
          mileage="22,450 miles"
          healthScore={62}
          location="Carrollton Supercenter · Auto Care Center"
          illustration="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Ff991ec87514645ea86e2480394f1c3fd?format=webp&width=800"
          items={[
            { name: 'Oil Change', status: 'overdue', detail: '3,200 mi overdue', price: '$29.88' },
            { name: 'Tire Rotation', status: 'due', detail: 'Due in ~800 mi', price: '$14.88' },
            { name: 'Wiper Blades', status: 'good', detail: 'Next: Oct 2026' },
          ]}
          bundleSavings="Bundle oil change + tire rotation —"
          bundleSavingsAmount="$12"
          valueStatement="Walmart Auto Care is up to 40% less than dealership prices. Same-day availability. No hidden fees."
        />
        <AutoCareUpsellOfferCard
          vehicle="2019 Toyota Camry"
          vehicleSub="Last serviced 3,200 miles ago"
          serviceName="Tire Rotation"
          discountPct={20}
          regularPrice="$14.88"
          memberPrice="$11.90"
          savings="$2.98"
          expiresInDays={2}
          terms="Valid at Carrollton Supercenter Auto Care. One vehicle per offer. Walmart+ membership required."
          illustration="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Ff991ec87514645ea86e2480394f1c3fd?format=webp&width=800"
          valueBullets={[
            'Walmart-certified technicians',
            'Free multi-point inspection included',
            'Same-day service available',
          ]}
        />
      </div>
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
    <div className={pageStyles.patternCard}>
      {/* Label row */}
      <div className={pageStyles.patternLabel}>
        <p className={pageStyles.patternLabelText}>
          {pattern.title}
        </p>
      </div>

      {/* Live preview */}
      <div className={pageStyles.patternPreview}>
        {pattern.preview}
      </div>

      {/* Copyable prompt button */}
      <CopyPromptButton text={pattern.prompt} />
    </div>
  );
}

// ── Prompts summary table ─────────────────────────────────────────────────────
function PromptsTable() {
  const border = '1px solid var(--ld-semantic-color-separator, #E3E4E5)';
  const cellStyle: React.CSSProperties = {
    padding: '12px 16px',
    verticalAlign: 'top',
    borderBottom: border,
    fontFamily: 'var(--ld-semantic-font-family-sans)',
    fontSize: 'var(--ld-semantic-font-body-small-size, 0.875rem)',
    lineHeight: 'var(--ld-semantic-font-body-small-line-height, 1.25rem)',
    color: 'var(--ld-semantic-color-text, #2E2F32)',
  };

  return (
    <div className={pageStyles.tableWrapper}>
      <table className={pageStyles.table}>
        <thead>
          <tr style={{ background: 'var(--ld-semantic-color-background-subtle, #F2F3F3)' }}>
            <th style={{ ...cellStyle, width: '220px', fontWeight: 700, color: 'var(--ld-semantic-color-text-subtle, #515357)', fontSize: 'var(--ld-semantic-font-caption-size, 0.75rem)' }}>
              Pattern
            </th>
            <th style={{ ...cellStyle, fontWeight: 700, color: 'var(--ld-semantic-color-text-subtle, #515357)', fontSize: 'var(--ld-semantic-font-caption-size, 0.75rem)' }}>
              Prompt
            </th>
          </tr>
        </thead>
        <tbody>
          {PATTERNS.map((p, i) => (
            <tr key={p.id} style={{ background: i % 2 === 0 ? 'var(--ld-semantic-color-surface, #fff)' : 'var(--ld-semantic-color-background-subtle, #F2F3F3)' }}>
              <td style={{ ...cellStyle, fontWeight: 600, borderRight: border }}>
                {p.title}
              </td>
              <td style={{ ...cellStyle }}>
                {p.prompt}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function OrderCardPatternsPage() {
  return (
    <ComponentPageLayout
      section="WCP Patterns"
      title="Order Cards"
      description="Ready-to-use card templates for the Purchase History page. Each pattern is a live component — click the prompt below it to copy it, then paste it into Fusion."
    >
      <div className={pageStyles.stack}>
        <PromptsTable />
        {PATTERNS.map(pattern => (
          <PatternSection key={pattern.id} pattern={pattern} />
        ))}
      </div>
    </ComponentPageLayout>
  );
}
