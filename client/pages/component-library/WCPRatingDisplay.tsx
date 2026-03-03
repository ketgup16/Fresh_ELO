import React from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { WCPRatingDisplay } from '@/components/walmart/WCPRatingDisplay';
import { Tag } from '@/components/ui/Tag';
import { Button } from '@/components/ui/Button';
import styles from './WCPRatingDisplay.module.css';

// ─── Auto Care service tile data ──────────────────────────────────────────────
const AUTO_CARE_SERVICES = [
  {
    id: 'oil-change',
    icon: '🛢️',
    title: 'Conventional Oil Change',
    description: 'Includes up to 5 quarts of conventional oil and new oil filter',
    price: '$19.88',
    rating: 4.7,
    count: '(4.7)',
    reviewCount: '12,451 reviews',
    badge: 'Best seller',
  },
  {
    id: 'synthetic',
    icon: '⚙️',
    title: 'Full Synthetic Oil Change',
    description: 'Includes up to 5 quarts of full synthetic oil and new oil filter',
    price: '$49.88',
    rating: 4.5,
    count: '(4.5)',
    reviewCount: '8,320 reviews',
    badge: 'Popular',
  },
  {
    id: 'tire-rotation',
    icon: '🔄',
    title: 'Tire Rotation',
    description: 'Rotate and balance up to 4 tires. Includes multi-point inspection',
    price: '$14.00',
    rating: 4.3,
    count: '(4.3)',
    reviewCount: '5,184 reviews',
    badge: null,
  },
  {
    id: 'battery',
    icon: '🔋',
    title: 'Battery Test & Replacement',
    description: 'Free battery test. Installation included with purchase',
    price: '$0.00',
    rating: 4.8,
    count: '(4.8)',
    reviewCount: '2,907 reviews',
    badge: 'Free',
  },
];

// ─── Review prompt card ───────────────────────────────────────────────────────
interface ReviewPromptCardProps {
  serviceName: string;
  completedDate: string;
  technicianName: string;
}

function ReviewPromptCard({ serviceName, completedDate, technicianName }: ReviewPromptCardProps) {
  return (
    <div className={styles.reviewCard}>
      <div className={styles.reviewCardHeader}>
        <div className={styles.reviewCardIcon}>✅</div>
        <div>
          <p className={styles.reviewCardTitle}>Service Complete</p>
          <p className={styles.reviewCardMeta}>{serviceName} · {completedDate}</p>
          <p className={styles.reviewCardMeta}>Technician: {technicianName}</p>
        </div>
      </div>

      <div className={styles.reviewCardDivider} />

      <div className={styles.reviewCardBody}>
        <p className={styles.reviewCardPrompt}>
          How was your experience? Your review helps other customers choose Auto Care services.
        </p>

        <div className={styles.reviewCardStars}>
          <p className={styles.reviewCardStarsLabel}>Tap to rate your visit</p>
          <WCPRatingDisplay
            value={0}
            size="medium"
            count="(0)"
            aria-label="Rate your Auto Care experience"
          />
        </div>

        <div className={styles.reviewCardActions}>
          <Button variant="primary" size="small">Write a Review</Button>
          <Button variant="tertiary" size="small">Not Now</Button>
        </div>
      </div>
    </div>
  );
}

// ─── Service tile with rating ─────────────────────────────────────────────────
interface ServiceTileProps {
  icon: string;
  title: string;
  description: string;
  price: string;
  rating: number;
  count: string;
  reviewCount: string;
  badge: string | null;
}

function ServiceTile({ icon, title, description, price, rating, count, reviewCount, badge }: ServiceTileProps) {
  return (
    <div className={styles.serviceTile}>
      <div className={styles.serviceTileTop}>
        <div className={styles.serviceTileIcon}>{icon}</div>
        <div className={styles.serviceTileContent}>
          <div className={styles.serviceTileMeta}>
            <span className={styles.serviceTileTitle}>{title}</span>
            {badge && (
              <Tag variant={badge === 'Free' ? 'success' : badge === 'Best seller' ? 'info' : 'neutral'}>
                {badge}
              </Tag>
            )}
          </div>
          <p className={styles.serviceTileDesc}>{description}</p>
          <WCPRatingDisplay
            value={rating}
            size="small"
            count={count}
            linkText={reviewCount}
            aria-label={`${title}: ${rating} stars`}
          />
        </div>
      </div>
      <div className={styles.serviceTileFooter}>
        <span className={styles.serviceTilePrice}>
          {price === '$0.00' ? 'Free' : <><span className={styles.serviceTilePriceAmount}>{price}</span> per vehicle</>}
        </span>
        <Button variant="primary" size="small">Book Service</Button>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function WCPRatingDisplayPage() {
  return (
    <ComponentPageLayout
      section="WCP Components"
      title="Rating Display"
      description="A non-interactive aggregate rating component for item tiles and review sections. Shows 5 stars reflecting an overall score, with optional count, link, and trailing text. Two ways to use ratings to improve Auto Care engagement are shown below."
    >
      <div className={styles.content}>

        {/* ══════════════════════════════════════════════════════════════════════
            WAY 1 — Service Tile Ratings
        ══════════════════════════════════════════════════════════════════════ */}
        <section className={styles.section}>
          <div className={styles.sectionBadge}>Way 1 of 2</div>
          <h2 className={styles.sectionTitle}>Surface Ratings on Service Tiles</h2>
          <p className={styles.sectionDesc}>
            Displaying aggregate star ratings directly on Auto Care service cards increases
            customer confidence before booking. Customers who see high ratings are more likely
            to proceed to checkout without needing to navigate away to read reviews — reducing
            drop-off and increasing same-session conversions.
          </p>

          <div className={styles.engagementHighlight}>
            <div className={styles.highlightStat}>
              <span className={styles.highlightNumber}>+23%</span>
              <span className={styles.highlightLabel}>booking rate when ratings are visible on service tiles</span>
            </div>
            <div className={styles.highlightDivider} />
            <div className={styles.highlightStat}>
              <span className={styles.highlightNumber}>4.6★</span>
              <span className={styles.highlightLabel}>average Auto Care rating across all service types</span>
            </div>
          </div>

          {/* Service tile preview */}
          <div className={styles.frameLabel}>Auto Care Service Listing — Mobile</div>
          <div className={styles.mobileFrame}>
            <div className={styles.frameHeader}>
              <span className={styles.frameHeaderTitle}>Auto Care Services</span>
              <span className={styles.frameHeaderSub}>4 services near you</span>
            </div>
            <div className={styles.serviceList}>
              {AUTO_CARE_SERVICES.map((s) => (
                <ServiceTile key={s.id} {...s} />
              ))}
            </div>
          </div>

          {/* Before/after */}
          <div className={styles.beforeAfterGrid}>
            <div className={styles.beforeCard}>
              <h4 className={styles.beforeAfterTitle}>Without ratings</h4>
              <p className={styles.beforeAfterDesc}>
                Service tiles show only title, description, and price. Customers must tap
                into each service to find reviews — creating friction and reducing bookings.
              </p>
              <div className={styles.simpleTile}>
                <span className={styles.simpleTileIcon}>🛢️</span>
                <div>
                  <p className={styles.simpleTileName}>Conventional Oil Change</p>
                  <p className={styles.simpleTilePrice}>$19.88</p>
                </div>
                <Button variant="secondary" size="small">Book</Button>
              </div>
            </div>
            <div className={styles.afterCard}>
              <h4 className={styles.beforeAfterTitle}>With ratings</h4>
              <p className={styles.beforeAfterDesc}>
                Ratings surface trust signals inline. Review count links take customers
                directly to the reviews section for deeper evaluation.
              </p>
              <div className={styles.simpleTile}>
                <span className={styles.simpleTileIcon}>🛢️</span>
                <div className={styles.simpleTileBody}>
                  <p className={styles.simpleTileName}>Conventional Oil Change</p>
                  <WCPRatingDisplay
                    value={4.7}
                    size="small"
                    count="(4.7)"
                    linkText="12,451 reviews"
                  />
                  <p className={styles.simpleTilePrice}>$19.88</p>
                </div>
                <Button variant="primary" size="small">Book</Button>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            WAY 2 — Post-service Review Prompts
        ══════════════════════════════════════════════════════════════════════ */}
        <section className={styles.section}>
          <div className={styles.sectionBadge}>Way 2 of 2</div>
          <h2 className={styles.sectionTitle}>Post-Service Review Prompts</h2>
          <p className={styles.sectionDesc}>
            After a completed Auto Care appointment, a contextual review prompt re-engages
            customers and collects fresh UGC. More reviews keep ratings accurate, surface
            recent sentiment, and create a feedback loop that improves both service quality
            and future bookings.
          </p>

          <div className={styles.engagementHighlight}>
            <div className={styles.highlightStat}>
              <span className={styles.highlightNumber}>3×</span>
              <span className={styles.highlightLabel}>more reviews submitted when prompted in-app vs. email</span>
            </div>
            <div className={styles.highlightDivider} />
            <div className={styles.highlightStat}>
              <span className={styles.highlightNumber}>+18%</span>
              <span className={styles.highlightLabel}>repeat booking rate among customers who leave a review</span>
            </div>
          </div>

          {/* Review prompt preview */}
          <div className={styles.frameLabel}>Post-Service Review Card — Mobile</div>
          <div className={styles.mobileFrameNarrow}>
            <ReviewPromptCard
              serviceName="Conventional Oil Change"
              completedDate="Today, 2:15 PM"
              technicianName="Marcus T."
            />
          </div>

          <div className={styles.promptVariantsGrid}>
            <div className={styles.promptVariantCard}>
              <h4 className={styles.promptVariantTitle}>Order confirmation</h4>
              <p className={styles.promptVariantDesc}>
                Embed the rating prompt in the service completion confirmation screen for
                maximum visibility immediately after the appointment.
              </p>
              <div className={styles.promptVariantDemo}>
                <WCPRatingDisplay
                  value={0}
                  size="small"
                  linkText="Rate your visit"
                  text="takes 30 seconds"
                  aria-label="Rate your visit"
                />
              </div>
            </div>

            <div className={styles.promptVariantCard}>
              <h4 className={styles.promptVariantTitle}>Purchase history</h4>
              <p className={styles.promptVariantDesc}>
                Surface unreviewed past services in Purchase History so customers can
                retroactively leave ratings without re-opening the order flow.
              </p>
              <div className={styles.promptVariantDemo}>
                <WCPRatingDisplay
                  value={0}
                  size="small"
                  linkText="Leave a review"
                  text="Not yet reviewed"
                  aria-label="Leave a review for this service"
                />
              </div>
            </div>

            <div className={styles.promptVariantCard}>
              <h4 className={styles.promptVariantTitle}>Home page widget</h4>
              <p className={styles.promptVariantDesc}>
                A "Recent visit" widget on the Walmart home page nudges customers who
                haven't rated their service in the 7 days after an appointment.
              </p>
              <div className={styles.promptVariantDemo}>
                <WCPRatingDisplay
                  value={0}
                  size="small"
                  count="(0)"
                  linkText="Rate your Oil Change"
                  aria-label="Rate your Oil Change"
                />
              </div>
            </div>

            <div className={styles.promptVariantCard}>
              <h4 className={styles.promptVariantTitle}>Service detail page</h4>
              <p className={styles.promptVariantDesc}>
                On the Auto Care service detail page, aggregate ratings use the medium size
                for increased prominence alongside the full review list.
              </p>
              <div className={styles.promptVariantDemo}>
                <WCPRatingDisplay
                  value={4.7}
                  size="medium"
                  count="(4.7)"
                  linkText="12,451 reviews"
                  text="Based on verified bookings"
                  aria-label="Oil Change: 4.7 stars from 12,451 reviews"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Component variants reference ───────────────────────────────── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>All Variants</h2>
          <p className={styles.sectionDesc}>
            WCPRatingDisplay is non-interactive — it displays a read-only aggregate score.
            It supports two sizes and two color schemes (default / inverse).
          </p>

          <div className={styles.variantsGrid}>
            {/* Default / Small */}
            <div className={styles.variantBox}>
              <span className={styles.variantLabel}>Default · Small</span>
              <WCPRatingDisplay value={0} size="small" count="(1.5)" linkText="Link" text="Text string" />
            </div>
            {/* Default / Small / partial fill */}
            <div className={styles.variantBox}>
              <span className={styles.variantLabel}>Default · Small · 2 stars</span>
              <WCPRatingDisplay value={2} size="small" count="(2.0)" linkText="Link" text="Text string" />
            </div>
            {/* Default / Medium */}
            <div className={styles.variantBox}>
              <span className={styles.variantLabel}>Default · Medium</span>
              <WCPRatingDisplay value={0} size="medium" count="(1.5)" linkText="Link" text="Text string" />
            </div>
            {/* Default / Medium / partial fill */}
            <div className={styles.variantBox}>
              <span className={styles.variantLabel}>Default · Medium · 2 stars</span>
              <WCPRatingDisplay value={2} size="medium" count="(1.5)" linkText="Link" text="Text string" />
            </div>
            {/* Inverse / Small */}
            <div className={`${styles.variantBox} ${styles.variantBoxInverse}`}>
              <span className={`${styles.variantLabel} ${styles.variantLabelInverse}`}>Inverse · Small</span>
              <WCPRatingDisplay value={0} size="small" color="inverse" count="(1.5)" linkText="Link" text="Text string" />
            </div>
            {/* Inverse / Medium */}
            <div className={`${styles.variantBox} ${styles.variantBoxInverse}`}>
              <span className={`${styles.variantLabel} ${styles.variantLabelInverse}`}>Inverse · Medium</span>
              <WCPRatingDisplay value={0} size="medium" color="inverse" count="(1.5)" linkText="Link" text="Text string" />
            </div>
          </div>
        </section>

        {/* ── Props reference ────────────────────────────────────────────── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Props</h2>
          <div className={styles.propsTable}>
            <div className={styles.propsRow + ' ' + styles.propsHeader}>
              <span>Prop</span><span>Type</span><span>Default</span><span>Description</span>
            </div>
            {[
              { prop: 'value', type: 'number', def: '0', desc: 'Rating value 0–5. Supports whole numbers and 0.5 increments.' },
              { prop: 'size', type: "'small' | 'medium'", def: "'small'", desc: 'Small → 12px stars + caption text. Medium → 20px stars + body text.' },
              { prop: 'color', type: "'default' | 'inverse'", def: "'default'", desc: 'Default for light backgrounds. Inverse for dark / coloured surfaces.' },
              { prop: 'count', type: 'string', def: '—', desc: 'Aggregate count label, e.g. "(4.7)". Omit to hide.' },
              { prop: 'linkText', type: 'string', def: '—', desc: 'Clickable link text, e.g. "12,451 reviews". Omit to hide.' },
              { prop: 'linkHref', type: 'string', def: '"#"', desc: 'href for the link element.' },
              { prop: 'onLinkClick', type: '(e) => void', def: '—', desc: 'Click handler for the link.' },
              { prop: 'text', type: 'string', def: '—', desc: 'Trailing text shown after the pipe separator. Omit to hide.' },
              { prop: 'className', type: 'string', def: '—', desc: 'Additional classes applied to the wrapper.' },
              { prop: 'aria-label', type: 'string', def: 'auto', desc: 'Accessible label for the star region.' },
            ].map(({ prop, type, def, desc }) => (
              <div key={prop} className={styles.propsRow}>
                <code className={styles.propName}>{prop}</code>
                <code className={styles.propType}>{type}</code>
                <code className={styles.propDefault}>{def}</code>
                <span className={styles.propDesc}>{desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Usage ─────────────────────────────────────────────────────── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Usage</h2>
          <pre className={styles.codeBlock}>{`import { WCPRatingDisplay } from '@/components/walmart/WCPRatingDisplay';

// Service tile (small, default)
<WCPRatingDisplay
  value={4.7}
  size="small"
  count="(4.7)"
  linkText="12,451 reviews"
  linkHref="/auto-care/oil-change/reviews"
  text="Verified bookings"
/>

// Review section header (medium, default)
<WCPRatingDisplay
  value={4.7}
  size="medium"
  count="(4.7)"
  linkText="12,451 reviews"
/>

// On a dark/coloured background (inverse)
<WCPRatingDisplay
  value={4.7}
  size="small"
  color="inverse"
  count="(4.7)"
  linkText="Reviews"
/>`}
          </pre>
        </section>

      </div>
    </ComponentPageLayout>
  );
}
