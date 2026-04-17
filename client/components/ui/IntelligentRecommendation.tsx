import * as React from 'react';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { Divider } from '@/components/ui/Divider';
import { LinkButton } from '@/components/ui/LinkButton';
import { ChevronDown } from '@/components/icons/ChevronDown';
import { ChevronUp } from '@/components/icons/ChevronUp';
import { ExternalLink } from '@/components/icons/ExternalLink';
import { cn } from '@/lib/utils';
import styles from './IntelligentRecommendation.module.css';

// ── Gradient ID must be unique per page to avoid SVG conflicts ───────────────
const MAGIC_GRADIENT_ID = 'ir-magic-fill-gradient';

/** A MagicFill icon that renders the Figma-specified blue → cyan gradient. */
function MagicFillGradient({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id={MAGIC_GRADIENT_ID} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0053E2" />
          <stop offset="50%" stopColor="#3D90EC" />
          <stop offset="100%" stopColor="#79CDF6" />
        </linearGradient>
      </defs>
      <path
        d="M11.1458 2.79167L12.3333 2.33333L12.7708 1.16667C12.7917 1.0625 12.8958 1 13 1C13.0833 1 13.1875 1.0625 13.2083 1.16667L13.6667 2.33333L14.8333 2.79167C14.9375 2.8125 15 2.91667 15 3C15 3.10417 14.9375 3.20833 14.8333 3.22917L13.6667 3.66667L13.2083 4.85417C13.1875 4.9375 13.0833 5 13 5C12.8958 5 12.7917 4.9375 12.7708 4.85417L12.3333 3.66667L11.1458 3.22917C11.0625 3.20833 11 3.10417 11 3C11 2.91667 11.0625 2.8125 11.1458 2.79167Z"
        fill={`url(#${MAGIC_GRADIENT_ID})`}
      />
      <path
        d="M1.28346 8.5288L1.8189 8.3089L2.07087 8.18325H2.10236L4.87402 6.89529L6.16535 4.09948L6.29134 3.84817L6.54331 3.31414C6.6063 3.12565 6.79528 3 6.98425 3C7.17323 3 7.3622 3.12565 7.45669 3.31414L7.70866 3.84817L7.80315 4.09948L7.83465 4.13089L9.09449 6.89529L11.8976 8.18325L12.1496 8.3089L12.685 8.56021C12.874 8.62304 13 8.81152 13 9C13 9.18848 12.874 9.37696 12.685 9.4712L12.1496 9.6911L11.8976 9.81675L9.09449 11.1047L7.80315 13.8691V13.9005L7.67717 14.1518L7.45669 14.6859C7.3622 14.8743 7.17323 15 6.98425 15C6.79528 15 6.6063 14.8743 6.54331 14.6859L6.29134 14.1518L6.16535 13.9005V13.8691L4.87402 11.1047L2.10236 9.81675H2.07087L1.8189 9.6911L1.28346 9.4712C1.09449 9.37696 1 9.18848 1 9C1 8.81152 1.09449 8.62304 1.28346 8.5288Z"
        fill={`url(#${MAGIC_GRADIENT_ID})`}
      />
    </svg>
  );
}

// ── Public types ─────────────────────────────────────────────────────────────

export interface IntelligentRecommendationAttribute {
  /** Icon element to display to the left of the label (16×16 recommended). */
  icon: React.ReactNode;
  /** Text label for the attribute. */
  label: string;
}

export interface IntelligentRecommendationSourceLink {
  /** Display text for the link button. */
  label: string;
  /** Optional href — if provided, renders as an `<a>` tag; otherwise `<button>`. */
  href?: string;
  /** Callback fired when the link is clicked. */
  onClick?: () => void;
}

export type IntelligentRecommendationButtonType = 'none' | 'single' | 'dual' | 'triple';

export interface IntelligentRecommendationProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> {
  // ── Eyebrow ──────────────────────────────────────────────────────────────
  /**
   * Bold eyebrow label shown next to the MagicFill icon.
   * @default "Recommendation"
   */
  eyebrow?: string;

  /**
   * Whether to show the lighter secondary eyebrow label.
   * @default false
   */
  showLightEyebrow?: boolean;

  /**
   * Text for the light-weight eyebrow label (shown when `showLightEyebrow` is true).
   */
  lightEyebrowText?: string;

  // ── Main copy ─────────────────────────────────────────────────────────────
  /**
   * The recommendation title (required). Truncated after 2 lines.
   */
  title: string;

  /**
   * Whether to show the description body text.
   * @default false
   */
  showDescription?: boolean;

  /**
   * Body text displayed below the title (visible when `showDescription` is true).
   */
  description?: string;

  // ── Attributes ────────────────────────────────────────────────────────────
  /**
   * Up to 4 attribute rows. Each row shows a 16px icon + label.
   */
  attributes?: IntelligentRecommendationAttribute[];

  // ── Content slot ──────────────────────────────────────────────────────────
  /**
   * Optional children rendered inside a white surface panel below the attributes.
   * The panel is hidden if no children are provided.
   */
  children?: React.ReactNode;

  // ── Alert ─────────────────────────────────────────────────────────────────
  /**
   * Whether to show the error-variant alert below the content slot.
   * @default false
   */
  showAlert?: boolean;

  /**
   * Text body of the alert message.
   */
  alertMessage?: string;

  /**
   * Label for the optional alert action link. Hidden if not provided.
   */
  alertActionLabel?: string;

  /**
   * Callback fired when the alert action link is clicked.
   */
  onAlertAction?: () => void;

  // ── Buttons ───────────────────────────────────────────────────────────────
  /**
   * Button arrangement variant.
   *
   * - `none`   — no buttons rendered
   * - `single` — one full-width Primary button
   * - `dual`   — Secondary (Alternate) + Primary side-by-side, each full-width
   * - `triple` — dual row + a third full-width Tertiary button below
   *
   * @default "none"
   */
  buttonType?: IntelligentRecommendationButtonType;

  /** Label for the primary action button. */
  primaryLabel?: string;
  /** Callback for the primary button. */
  onPrimary?: () => void;

  /** Label for the secondary (Alternate) button (used in dual/triple). */
  secondaryLabel?: string;
  /** Callback for the secondary button. */
  onSecondary?: () => void;

  /** Label for the third (Tertiary) button (used in triple only). */
  tertiaryLabel?: string;
  /** Callback for the tertiary button. */
  onTertiary?: () => void;

  // ── Sources ───────────────────────────────────────────────────────────────
  /**
   * Whether to show the collapsible sources section below the buttons.
   * @default false
   */
  showSources?: boolean;

  /**
   * Explanatory text shown when the sources section is expanded.
   */
  sourceDescription?: string;

  /**
   * Optional list of link buttons shown after the source description.
   */
  sourceLinks?: IntelligentRecommendationSourceLink[];

  // ── Escape hatches ────────────────────────────────────────────────────────
  /** Unsafe override for className. Use sparingly. */
  UNSAFE_className?: string;
  /** Unsafe override for style. Use sparingly. */
  UNSAFE_style?: React.CSSProperties;
}

// ── Component ────────────────────────────────────────────────────────────────

/**
 * IntelligentRecommendation — [AX] AI Recommendation card for Living Design 3.5
 *
 * A flexible AI-recommendation surface with:
 * - Eyebrow (MagicFill icon + "Recommendation" label, optional light label)
 * - Title + optional description
 * - Optional attribute rows (up to 4)
 * - Optional content slot (white surface panel)
 * - Optional error alert
 * - Configurable button arrangement (none / single / dual / triple)
 * - Collapsible sources section
 *
 * @example
 * ```tsx
 * <IntelligentRecommendation
 *   title="Generate tonight's plan"
 *   description="Sidekick will help you plan stocking work for your team."
 *   buttonType="dual"
 *   primaryLabel="Plan your shift"
 *   secondaryLabel="Dismiss"
 *   onPrimary={() => navigate('/plan')}
 *   onSecondary={() => dismiss()}
 *   showSources
 *   sourceDescription="Based on today's store data."
 * />
 * ```
 */
export const IntelligentRecommendation = React.forwardRef<
  HTMLDivElement,
  IntelligentRecommendationProps
>(
  (
    {
      eyebrow = 'Recommendation',
      showLightEyebrow = false,
      lightEyebrowText,
      title,
      showDescription = false,
      description,
      attributes,
      children,
      showAlert = false,
      alertMessage,
      alertActionLabel,
      onAlertAction,
      buttonType = 'none',
      primaryLabel = 'Primary',
      onPrimary,
      secondaryLabel = 'Alternate',
      onSecondary,
      tertiaryLabel = 'Tertiary',
      onTertiary,
      showSources = false,
      sourceDescription,
      sourceLinks,
      UNSAFE_className,
      UNSAFE_style,
      ...rest
    },
    ref
  ) => {
    const [sourcesExpanded, setSourcesExpanded] = React.useState(false);

    return (
      <div
        ref={ref}
        className={cn(styles.card, UNSAFE_className)}
        style={UNSAFE_style}
        {...rest}
      >
        {/* ── Eyebrow + Main copy ─────────────────────────────────────── */}
        <div className={styles.eyebrowSection}>
          {/* Icon + Bold "Recommendation" + Optional light eyebrow */}
          <div className={styles.iconLabelRow}>
            <div className={styles.iconWrapper}>
              <MagicFillGradient className={styles.magicIcon} />
            </div>
            <p className={styles.eyebrowText}>{eyebrow}</p>
            {showLightEyebrow && lightEyebrowText && (
              <p className={styles.lightEyebrow}>{lightEyebrowText}</p>
            )}
          </div>

          {/* Title + Description */}
          <div className={styles.titleDescSection}>
            <p className={styles.title}>{title}</p>
            {showDescription && description && (
              <p className={styles.description}>{description}</p>
            )}
          </div>
        </div>

        {/* ── Attributes ─────────────────────────────────────────────── */}
        {attributes && attributes.length > 0 && (
          <div className={styles.attributes}>
            {attributes.slice(0, 4).map((attr, idx) => (
              <div key={idx} className={styles.attributeRow}>
                <div className={styles.attributeInner}>
                  <div className={styles.attributeIconWrapper}>
                    <span className={styles.attributeIcon}>{attr.icon}</span>
                  </div>
                  <p className={styles.attributeLabel}>{attr.label}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Content slot ───────────────────────────────────────────── */}
        {children != null && (
          <div className={styles.contentSlot}>{children}</div>
        )}

        {/* ── Alert ─────────────────────────────────────────────────── */}
        {showAlert && (
          <Alert
            variant="error"
            action={
              alertActionLabel ? (
                <button type="button" onClick={onAlertAction}>
                  {alertActionLabel}
                </button>
              ) : undefined
            }
          >
            {alertMessage}
          </Alert>
        )}

        {/* ── Buttons ────────────────────────────────────────────────── */}
        {buttonType === 'single' && (
          <div className={styles.buttonSingle}>
            <Button variant="primary" size="medium" isFullWidth onClick={onPrimary}>
              {primaryLabel}
            </Button>
          </div>
        )}

        {buttonType === 'dual' && (
          <div className={styles.buttonDualRow}>
            <Button variant="secondary" size="medium" isFullWidth onClick={onSecondary}>
              {secondaryLabel}
            </Button>
            <Button variant="primary" size="medium" isFullWidth onClick={onPrimary}>
              {primaryLabel}
            </Button>
          </div>
        )}

        {buttonType === 'triple' && (
          <div className={styles.buttonTripleGroup}>
            <div className={styles.buttonTripleRow}>
              <Button variant="secondary" size="medium" isFullWidth onClick={onSecondary}>
                {secondaryLabel}
              </Button>
              <Button variant="primary" size="medium" isFullWidth onClick={onPrimary}>
                {primaryLabel}
              </Button>
            </div>
            <div className={styles.buttonTripleTertiary}>
              <LinkButton size="medium" onClick={onTertiary}>
                {tertiaryLabel}
              </LinkButton>
            </div>
          </div>
        )}

        {/* ── Sources ────────────────────────────────────────────────── */}
        {showSources && (
          <div className={styles.sources}>
            <Divider />
            <LinkButton
              onClick={() => setSourcesExpanded((prev) => !prev)}
              aria-expanded={sourcesExpanded}
              trailing={
                sourcesExpanded
                  ? <ChevronUp className={styles.sourcesToggleIcon} aria-hidden />
                  : <ChevronDown className={styles.sourcesToggleIcon} aria-hidden />
              }
            >
              {sourcesExpanded ? 'Hide sources' : 'Show sources'}
            </LinkButton>

            {sourcesExpanded && (
              <div className={styles.sourcesContent}>
                {sourceDescription && (
                  <p className={styles.sourceDescription}>{sourceDescription}</p>
                )}
                {sourceLinks?.map((link, idx) =>
                  link.href ? (
                    <LinkButton
                      key={idx}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={link.onClick}
                      trailing={<ExternalLink className={styles.sourceLinkIcon} aria-hidden />}
                    >
                      {link.label}
                    </LinkButton>
                  ) : (
                    <LinkButton
                      key={idx}
                      onClick={link.onClick}
                      trailing={<ExternalLink className={styles.sourceLinkIcon} aria-hidden />}
                    >
                      {link.label}
                    </LinkButton>
                  )
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

IntelligentRecommendation.displayName = 'IntelligentRecommendation';
