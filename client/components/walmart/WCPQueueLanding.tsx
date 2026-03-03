/**
 * [WCP] Queue Landing
 *
 * Content body for the queue waiting-room experience.
 * Two variants:
 * - authenticated: hourglass + "You're in line" + estimated wait timer + product card
 * - unauthenticated: "Sign in to join the line" + product card + create account link
 *
 * This component renders ONLY the content — header/footer chrome is provided
 * by Modal or WCPRichMediaSheet when composing.
 */

import React from 'react';
import { Button } from '@/components/ui/Button';
import { WCPTimerView } from './WCPTimerView';
import styles from './WCPQueueLanding.module.css';

// ── Hourglass SVG ──────────────────────────────────────────────────────────

function HourglassIcon() {
  return (
    <svg width="75" height="75" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="75" height="75" rx="37.5" fill="#ACC8FB" />
      <path d="M23.625 11.9059C23.625 11.1294 24.2544 10.5 25.0309 10.5H49.9691C50.7456 10.5 51.375 11.1294 51.375 11.9059V14.8548H23.625V11.9059Z" fill="#0E002E" />
      <path d="M51.375 63.0941C51.375 63.8706 50.7456 64.5 49.9691 64.5H25.0309C24.2544 64.5 23.625 63.8706 23.625 63.0941V60.1452H51.375V63.0941Z" fill="#0E002E" />
      <path fillRule="evenodd" clipRule="evenodd" d="M26.2266 14.8549H48.7734V21.6784C48.7734 25.3965 47.3006 28.9631 44.6773 31.5979L38.8008 37.5H36.1992L30.3227 31.5979C27.6994 28.9631 26.2266 25.3965 26.2266 21.6784V14.8549Z" fill="#E3E4E5" />
      <path opacity="0.2" d="M41.8359 14.8549H48.7734V23.8873C48.7734 26.1907 47.861 28.4003 46.2358 30.0326L38.8008 37.5H37.5L40.8387 29.4522C41.4971 27.8653 41.8359 26.1641 41.8359 24.446V14.8549Z" fill="#90B5F9" />
      <path fillRule="evenodd" clipRule="evenodd" d="M27.0938 23.5646H47.9062C47.3398 26.1246 46.0567 28.4705 44.2068 30.3285L38.9944 35.5637C38.1701 36.3915 36.8299 36.3915 36.0056 35.5637L30.7932 30.3285C28.9433 28.4705 27.6602 26.1246 27.0938 23.5646Z" fill="#FFC220" />
      <path opacity="0.6" d="M33.1641 14.8549H26.2266V23.8873C26.2266 26.1907 27.139 28.4003 28.7642 30.0326L36.1992 37.5H37.5L34.1613 29.4522C33.5029 27.8653 33.1641 26.1641 33.1641 24.446V14.8549Z" fill="white" />
      <path fillRule="evenodd" clipRule="evenodd" d="M48.7734 60.1451H26.2266V53.3216C26.2266 49.6035 27.6994 46.0369 30.3227 43.4021L36.1992 37.5H38.8008L44.6773 43.4021C47.3006 46.0369 48.7734 49.6035 48.7734 53.3216V60.1451Z" fill="#E3E4E5" />
      <path opacity="0.2" d="M41.8359 60.1452H48.7734V51.1127C48.7734 48.8093 47.861 46.5997 46.2358 44.9674L38.8008 37.5H37.5L40.8387 45.5478C41.4971 47.1348 41.8359 48.836 41.8359 50.554V60.1452Z" fill="#90B5F9" />
      <path fillRule="evenodd" clipRule="evenodd" d="M47.9062 60.1451H27.0938L36.1875 52.9145C36.9559 52.3036 38.0441 52.3036 38.8125 52.9145L47.9062 60.1451Z" fill="#FFC220" />
      <path opacity="0.6" d="M33.1641 60.1452H26.2266V51.1127C26.2266 48.8093 27.139 46.5997 28.7642 44.9674L36.1992 37.5H37.5L34.1613 45.5478C33.5029 47.1348 33.1641 48.836 33.1641 50.554V60.1452Z" fill="white" />
      <path fillRule="evenodd" clipRule="evenodd" d="M26.2266 14.8549H48.7734V17.4678L26.2266 14.8549Z" fill="#BABBBE" />
    </svg>
  );
}

// ── Product card (shared between variants) ─────────────────────────────────

interface ProductCardProps {
  productImage?: string;
  productAlt?: string;
  productDescription?: string;
  price?: string;
  wasPrice?: string;
}

function ProductCard({ productImage, productAlt, productDescription, price, wasPrice }: ProductCardProps) {
  return (
    <div className={styles.productRow}>
      {productImage ? (
        <img src={productImage} alt={productAlt || ''} className={styles.productImage} />
      ) : (
        <div className={styles.productImagePlaceholder}>
          <svg className={styles.placeholderIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M3 16l5-5 4 4 3-3 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="9" cy="9" r="1.5" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
      )}
      <div className={styles.productDetails}>
        {productDescription && (
          <p className={styles.productDescription}>{productDescription}</p>
        )}
        {price && (
          <div className={styles.priceRow}>
            <span className={styles.price}>{price}</span>
            {wasPrice && <span className={styles.wasPrice}>{wasPrice}</span>}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Types ──────────────────────────────────────────────────────────────────

export type WCPQueueLandingVariant = 'authenticated' | 'unauthenticated';

export interface WCPQueueLandingProps {
  /** Which variant to display */
  variant?: WCPQueueLandingVariant;

  /** Heading text */
  title?: string;
  /** Sub-heading copy */
  subtitle?: string;

  /** End time for timer (authenticated variant) — passed to WCPTimerView */
  endTime?: Date | number | string;
  /** Static display time fallback (e.g. "59mins") */
  displayTime?: string;

  /** 104×104 product image URL */
  productImage?: string;
  /** Alt text for product image */
  productAlt?: string;
  /** Product description text */
  productDescription?: string;
  /** Current price */
  price?: string;
  /** Original / strikethrough price */
  wasPrice?: string;

  /** Primary CTA label */
  primaryLabel?: string;
  /** Primary CTA handler */
  onPrimary?: () => void;
  /** Secondary / leave link label */
  secondaryLabel?: string;
  /** Secondary handler */
  onSecondary?: () => void;

  /** "Sign in" button label (unauthenticated) */
  signInLabel?: string;
  /** Sign in handler */
  onSignIn?: () => void;
  /** Create account handler */
  onCreateAccount?: () => void;

  /** Render action buttons inline (for standalone demos) */
  showInlineActions?: boolean;
}

// ── Component ──────────────────────────────────────────────────────────────

export const WCPQueueLanding: React.FC<WCPQueueLandingProps> = ({
  variant = 'authenticated',
  title,
  subtitle,
  endTime,
  displayTime,
  productImage,
  productAlt,
  productDescription = 'Item description that can wrap to multiple lines',
  price = '$499.99',
  wasPrice = '$600.00',
  primaryLabel = 'Hold my spot and keep shopping',
  onPrimary,
  secondaryLabel = 'Leave the line',
  onSecondary,
  signInLabel = 'Sign in to join the line',
  onSignIn,
  onCreateAccount,
  showInlineActions = false,
}) => {
  const isAuthenticated = variant === 'authenticated';

  const defaultTitle = isAuthenticated
    ? "You're in line"
    : 'Sign in to join the line';
  const defaultSubtitle = isAuthenticated
    ? "This item is in high demand right now. We'll hold your spot in line until it's your turn."
    : "Once you're in line, we'll hold your spot and let you know when it's your turn.";

  const resolvedTitle = title || defaultTitle;
  const resolvedSubtitle = subtitle || defaultSubtitle;

  // Resolve timer display — prefer live endTime, fall back to static displayTime
  const timerDisplay = displayTime || '59mins';

  return (
    <div className={styles.content}>
      {/* ── Authenticated: illustration + title + subtitle ── */}
      {isAuthenticated && (
        <div className={styles.titleSection}>
          <div className={styles.illustrationAndTitle}>
            <div className={styles.illustration}>
              <HourglassIcon />
            </div>
            <h2 className={styles.titleAuthenticated}>{resolvedTitle}</h2>
          </div>
          <p className={styles.subtitleAuthenticated}>{resolvedSubtitle}</p>
        </div>
      )}

      {/* ── Unauthenticated: title + subtitle + sign-in button ── */}
      {!isAuthenticated && (
        <>
          <div className={styles.illustrationAndTitle}>
            <h2 className={styles.titleUnauthenticated}>{resolvedTitle}</h2>
            <p className={styles.subtitleUnauthenticated}>{resolvedSubtitle}</p>
          </div>

          {showInlineActions && (
            <Button variant="secondary" onClick={onSignIn}>
              {signInLabel}
            </Button>
          )}
        </>
      )}

      {/* ── White card ── */}
      <div className={styles.card}>
        <div className={styles.cardContent}>
          {isAuthenticated ? (
            /* Authenticated: estimated wait + timer + disclaimer + divider + product */
            <div className={styles.waitSection}>
              <div className={styles.waitInfo}>
                <div className={styles.estimatedWaitLabel}>Estimated wait</div>
                {endTime ? (
                  <WCPTimerView endTime={endTime} variant="badge" badgeColor="blue" />
                ) : (
                  <div className={styles.timerBadge}>
                    <span className={styles.timerText}>{timerDisplay}</span>
                  </div>
                )}
                <p className={styles.disclaimer}>*Estimated wait time is subject to change</p>
              </div>

              <hr className={styles.divider} />

              <ProductCard
                productImage={productImage}
                productAlt={productAlt}
                productDescription={productDescription}
                price={price}
                wasPrice={wasPrice}
              />
            </div>
          ) : (
            /* Unauthenticated: product row only */
            <ProductCard
              productImage={productImage}
              productAlt={productAlt}
              productDescription={productDescription}
              price={price}
              wasPrice={wasPrice}
            />
          )}
        </div>
      </div>

      {/* ── Unauthenticated: account section ── */}
      {!isAuthenticated && (
        <div className={styles.accountSection}>
          <p className={styles.accountLabel}>Don&apos;t have an account?</p>
          <button type="button" className={styles.createAccountLink} onClick={onCreateAccount}>
            Create account
          </button>
        </div>
      )}

      {/* ── Inline actions (standalone demo) ── */}
      {showInlineActions && isAuthenticated && (
        <div className={styles.inlineActions}>
          <Button variant="primary" isFullWidth onClick={onPrimary}>
            {primaryLabel}
          </Button>
          <button type="button" className={styles.leaveLink} onClick={onSecondary}>
            {secondaryLabel}
          </button>
        </div>
      )}
    </div>
  );
};

export default WCPQueueLanding;
