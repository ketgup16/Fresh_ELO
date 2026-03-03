import React, { useState } from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { WCPQueueBanner } from '@/components/walmart/WCPQueueBanner';
import { ProductCardList } from '@/components/walmart/ProductCardList';
import { Button } from '@/components/ui/Button';
import styles from './WCPQueueBanner.module.css';

// ── Helper: seconds from now ───────────────────────────────────────────────
function secondsFromNow(s: number): number {
  return Date.now() + s * 1000;
}

// ── Static demo product data ───────────────────────────────────────────────
const DEMO_PRODUCTS = [
  {
    image: 'https://i5.walmartimages.com/seo/Apple-AirPods-Pro-2nd-Generation-with-Lightning-Charging-Case_c3e28b66-aa34-45fa-9d5c-82ef81b8d0b0.0c8e6c0d6e34cf3e11da0965e8d6a21a.jpeg?odnWidth=612&odnHeight=612&odnBg=ffffff',
    name: 'Apple AirPods Pro (2nd Generation)',
    price: '189',
    cents: '00',
    wasPrice: 'Was $249.00',
    flag: 'Rollback',
    flagVariant: 'red' as const,
    rating: 4.8,
    ratingCount: '(3,241)',
    pickup: 'today',
  },
  {
    image: 'https://i5.walmartimages.com/seo/Samsung-65-Class-QLED-4K-Smart-TV_e5f4f5a0-5b2e-4b63-9e01-1d3adef06a14.d9453fa36d5a0d0c9e7faa85a0c16898.jpeg?odnWidth=612&odnHeight=612&odnBg=ffffff',
    name: 'Samsung 65" QLED 4K Smart TV',
    price: '697',
    cents: '00',
    wasPrice: 'Was $999.00',
    flag: 'Flash deal',
    flagVariant: 'red' as const,
    rating: 4.6,
    ratingCount: '(1,587)',
    pickup: 'today',
  },
  {
    image: 'https://i5.walmartimages.com/seo/Dyson-V15-Detect-Cordless-Vacuum-Cleaner_09bfc0d8-5a44-4f14-a7ed-6b9dc08c428e.fe7a3e83cde01e7b9f8a98a1f04e5b2e.jpeg?odnWidth=612&odnHeight=612&odnBg=ffffff',
    name: 'Dyson V15 Detect Cordless Vacuum',
    price: '449',
    cents: '99',
    wasPrice: 'Was $749.99',
    flag: 'Limited',
    flagVariant: 'red' as const,
    rating: 4.7,
    ratingCount: '(892)',
    pickup: 'tomorrow',
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className={styles.sectionTitle}>{children}</h2>;
}

function SectionDesc({ children }: { children: React.ReactNode }) {
  return <p className={styles.sectionDesc}>{children}</p>;
}

// ── Main page ──────────────────────────────────────────────────────────────

export default function WCPQueueBannerPage() {
  const [landingEnd, setLandingEnd] = useState<number>(() => secondsFromNow(12 * 60 + 30));
  const [urgencyEnd, setUrgencyEnd] = useState<number>(() => secondsFromNow(12 * 60));
  const [dismissed, setDismissed] = useState(false);

  return (
    <ComponentPageLayout
      section="WCP Components"
      title="[WCP] Queue Banner"
      description="A sticky or inline banner with a live countdown timer for reserved carts, flash sales, and limited-time queue flows. Connected to WCPTimerView and product card badge timers."
    >
      <div className={styles.page}>

        {/* ── Overview ─────────────────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Overview</SectionTitle>
          <SectionDesc>
            The WCP Queue Banner communicates time-limited cart reservations and flash-sale urgency
            to users mid-flow. It embeds a live <strong>WCPTimerView (compact)</strong> and
            automatically shifts background color as time runs low: blue (normal) → yellow (warning,
            &lt;10 min) → red-tinted (critical, &lt;1 min). It can be mounted sticky below the top
            nav or inline within a content area.
          </SectionDesc>
        </div>

        {/* ── Queue Landing Demo ───────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Queue Landing Demo</SectionTitle>
          <SectionDesc>
            A full queue landing experience: sticky banner at the top with a shared timer, and
            product cards below each showing the same countdown as a badge overlay.
          </SectionDesc>

          <div className={styles.controlRow}>
            <span className={styles.controlLabel}>Set timer:</span>
            <Button variant="secondary" size="small" onClick={() => setLandingEnd(secondsFromNow(12 * 60))}>
              12 min (normal)
            </Button>
            <Button variant="secondary" size="small" onClick={() => setLandingEnd(secondsFromNow(4 * 60 + 30))}>
              4:30 (warning)
            </Button>
            <Button variant="secondary" size="small" onClick={() => setLandingEnd(secondsFromNow(40))}>
              40 s (critical)
            </Button>
          </div>

          <div className={styles.landingDemo}>
            {/* Banner sits at the top of the demo frame */}
            <WCPQueueBanner
              endTime={landingEnd}
              title="Your cart is reserved"
              message="Complete checkout before time runs out"
              ctaLabel="Checkout now"
              onCta={() => {}}
              onDismiss={() => {}}
              position="inline"
              inline
            />

            {/* Product cards below with the same timer as badge */}
            <div className={styles.landingContent}>
              <div>
                <p className={styles.landingHeading}>Your reserved items</p>
                <p className={styles.landingSubheading}>
                  These items are held for you — complete checkout before the timer expires.
                </p>
              </div>

              <div className={styles.productCardRow}>
                {DEMO_PRODUCTS.map((product, i) => (
                  <ProductCardList
                    key={i}
                    {...product}
                    timerEndTime={landingEnd}
                    timerLabel="Held"
                    onAddToCart={() => {}}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Urgency States ───────────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Urgency States</SectionTitle>
          <SectionDesc>
            The banner background changes automatically based on remaining time.
          </SectionDesc>

          <div className={styles.controlRow}>
            <span className={styles.controlLabel}>Preview state:</span>
            <Button variant="secondary" size="small" onClick={() => setUrgencyEnd(secondsFromNow(2 * 3600))}>
              Normal
            </Button>
            <Button variant="secondary" size="small" onClick={() => setUrgencyEnd(secondsFromNow(5 * 60))}>
              Warning (5 min)
            </Button>
            <Button variant="secondary" size="small" onClick={() => setUrgencyEnd(secondsFromNow(30))}>
              Critical (30s)
            </Button>
          </div>

          <div className={styles.bannerFrame}>
            <WCPQueueBanner
              endTime={urgencyEnd}
              title="Your cart is reserved"
              message="Complete checkout before time runs out"
              ctaLabel="Checkout now"
              onCta={() => {}}
              position="inline"
              inline
            />
          </div>
        </div>

        {/* ── Position Variants ────────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Position Variants</SectionTitle>
          <SectionDesc>
            Use <code>position="top"</code> (default) for sticky placement just below the nav bar.
            Use <code>position="inline"</code> for in-flow placement within a content area — useful
            for demo pages, checkout flows, or cart pages.
          </SectionDesc>

          <div className={styles.bannerFrame}>
            {!dismissed ? (
              <WCPQueueBanner
                endTime={secondsFromNow(8 * 60)}
                title="Your cart is reserved"
                message="8 items are being held for you"
                ctaLabel="Go to checkout"
                onCta={() => {}}
                onDismiss={() => setDismissed(true)}
                showDismiss
                position="inline"
                inline
              />
            ) : (
              <div style={{ padding: '16px 24px', background: 'var(--ld-semantic-color-fill-accent-blue-subtle, #e8f1ff)' }}>
                <Button variant="secondary" size="small" onClick={() => setDismissed(false)}>
                  Restore banner
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* ── Component Props ──────────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Component Props</SectionTitle>
          <table className={styles.propsTable}>
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>endTime</td><td>Date | number | string</td><td>—</td><td>Required. Target end time for the countdown.</td></tr>
              <tr><td>title</td><td>string</td><td>'Your cart is reserved'</td><td>Bold headline in the banner.</td></tr>
              <tr><td>message</td><td>string</td><td>'Complete checkout before time runs out'</td><td>Secondary caption (hidden on tablet).</td></tr>
              <tr><td>ctaLabel</td><td>string</td><td>'Checkout now'</td><td>Primary action button label.</td></tr>
              <tr><td>onCta</td><td>() =&gt; void</td><td>—</td><td>Called when the CTA button is clicked.</td></tr>
              <tr><td>onDismiss</td><td>() =&gt; void</td><td>—</td><td>Called when the close button is clicked. Hides the dismiss button if omitted.</td></tr>
              <tr><td>showDismiss</td><td>boolean</td><td>true</td><td>Whether to render the close button.</td></tr>
              <tr><td>position</td><td>'top' | 'inline'</td><td>'top'</td><td>'top' = sticky; 'inline' = in-flow.</td></tr>
              <tr><td>onExpire</td><td>() =&gt; void</td><td>—</td><td>Called once when the timer hits zero.</td></tr>
            </tbody>
          </table>
        </div>

        {/* ── Code example ────────────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Usage</SectionTitle>
          <pre className={styles.codeBlock}>{`import { WCPQueueBanner } from '@/components/walmart/WCPQueueBanner';

// Sticky banner (default) — sits below the nav
<WCPQueueBanner
  endTime={reservationEndTime}
  title="Your cart is reserved"
  ctaLabel="Checkout now"
  onCta={handleCheckout}
  onDismiss={handleDismiss}
/>

// Inline banner — in-flow within a page section
<WCPQueueBanner
  endTime={reservationEndTime}
  position="inline"
  title="Flash sale ends soon"
  message="Only 3 left at this price"
  ctaLabel="Buy now"
  onCta={handleBuy}
/>

// Product card with timer badge
<ProductCardGrid
  {...productProps}
  timerEndTime={reservationEndTime}
  timerLabel="Held"
/>`}</pre>
        </div>

        {/* ── Do / Don't ──────────────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Guidelines</SectionTitle>
          <div className={styles.guidelineGrid}>
            <div className={styles.guidelineCard}>
              <div className={styles.doLabel}>Do</div>
              <p className={styles.guidelineText}>
                Use a single shared <code>endTime</code> value for both the queue banner and any
                product card badge timers in the same flow — they should always show the same
                remaining time.
              </p>
            </div>
            <div className={styles.guidelineCard}>
              <div className={styles.dontLabel}>Don't</div>
              <p className={styles.guidelineText}>
                Don't stack multiple queue banners at the top of the page. Only one queue reservation
                should be communicated at a time.
              </p>
            </div>
            <div className={styles.guidelineCard}>
              <div className={styles.doLabel}>Do</div>
              <p className={styles.guidelineText}>
                Always provide an <code>onExpire</code> callback when the banner is in a real queue
                flow — use it to navigate the user to an expired state or refresh their session.
              </p>
            </div>
            <div className={styles.guidelineCard}>
              <div className={styles.dontLabel}>Don't</div>
              <p className={styles.guidelineText}>
                Don't use the queue banner for generic promotions that are not time-constrained.
                Use the Basic Banner or Promo Banner component instead.
              </p>
            </div>
          </div>
        </div>

      </div>
    </ComponentPageLayout>
  );
}
