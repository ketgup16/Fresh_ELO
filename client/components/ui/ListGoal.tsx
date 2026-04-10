import * as React from 'react';
import { cn } from '@/lib/utils';
import { Tag } from '@/components/ui/Tag';
import type { TagVariant, TagColor } from '@/components/ui/Tag';
import { ProgressIndicator } from '@/components/ui/ProgressIndicator';
import { IntelligentInsight } from '@/components/ui/IntelligentInsight';
import { Alert } from '@/components/ui/Alert';
import { Divider } from '@/components/ui/Divider';
import { Link } from '@/components/ui/Link';
import { ChevronRight } from '@/components/icons/ChevronRight';
import { SidekickLogoIcon } from '@/components/icons-custom/SidekickLogoIcon';
import { IconButton } from '@/components/ui/IconButton';
import styles from './ListGoal.module.css';

export interface ListGoalProps {
  /** Non-Sidekick vs AI-created variant */
  type?: 'default' | 'ai';

  /** Goal name text */
  goalName: string;

  /** Goal illustration image URL */
  illustrationSrc?: string;

  /** Alt text for illustration */
  illustrationAlt?: string;

  /** Show/hide the status Tag */
  showTag?: boolean;

  /** Tag text */
  tagLabel?: string;

  /** Tag variant */
  tagVariant?: TagVariant;

  /** Tag color */
  tagColor?: TagColor;

  /** "% complete + status label" text */
  progressTitle?: string;

  /** Show/hide ProgressIndicator */
  showProgressBar?: boolean;

  /** 0–100 progress value */
  progressValue?: number;

  /** Left label for progress */
  progressLabel?: string;

  /** Right caption label for progress */
  progressValueLabel?: string;

  /** Content slot (preset area) */
  children?: React.ReactNode;

  /** Show/hide IntelligentInsight block */
  showInsight?: boolean;

  /** Insight text */
  insightLabel?: string;

  /** Show/hide Alert */
  showAlert?: boolean;

  /** Alert body message */
  alertMessage?: string;

  /** Alert action link text */
  alertAction?: string;

  /** Alert action click handler */
  onAlertAction?: () => void;

  /** Show/hide ChevronRight icon */
  showNavigation?: boolean;

  /** Navigation click handler */
  onNavigate?: () => void;

  /** Show/hide bottom Divider */
  showDivider?: boolean;

  /** Escape hatch */
  UNSAFE_className?: string;

  /** Escape hatch */
  UNSAFE_style?: React.CSSProperties;
}

/**
 * ListGoal — [AX] List / Goal component for Living Design 3.5
 *
 * A list item that represents a goal with optional progress indicator,
 * content slot presets, AI insight, and alert.
 *
 * @example
 * ```tsx
 * <ListGoal
 *   goalName="My Goal"
 *   progressTitle="50% complete"
 *   progressValue={50}
 *   showInsight
 *   insightLabel="Data-based intelligence to support action."
 * />
 * ```
 */
export const ListGoal = React.forwardRef<HTMLElement, ListGoalProps>(
  (
    {
      type = 'default',
      goalName,
      illustrationSrc,
      illustrationAlt = '',
      showTag = true,
      tagLabel = 'Tag label',
      tagVariant = 'tertiary',
      tagColor = 'warning',
      progressTitle,
      showProgressBar = true,
      progressValue = 50,
      progressLabel = 'Label',
      progressValueLabel = 'Value label',
      children,
      showInsight = true,
      insightLabel = 'Data-based intelligence to support action.',
      showAlert = true,
      alertMessage = 'Alert message',
      alertAction = 'Action button',
      onAlertAction,
      showNavigation = true,
      onNavigate,
      showDivider = true,
      UNSAFE_className,
      UNSAFE_style,
    },
    ref
  ) => {
    const isAI = type === 'ai';

    return (
      <article
        ref={ref}
        className={cn(styles.goal, UNSAFE_className)}
        style={UNSAFE_style}
      >
        {/* Top details row */}
        <div className={styles.topRow}>
          {/* Illustration */}
          {illustrationSrc && (
            <img
              src={illustrationSrc}
              alt={illustrationAlt}
              className={styles.illustration}
            />
          )}
          {!illustrationSrc && (
            <div className={styles.illustrationPlaceholder} aria-hidden="true" />
          )}

          {/* Content container */}
          <div className={styles.contentContainer}>
            {/* Name row */}
            <div className={styles.nameRow}>
              {isAI ? (
                <div className={styles.aiNameWrapper}>
                  <div className={styles.logoContainer}>
                    <SidekickLogoIcon size="small" alt="Sidekick AI" />
                  </div>
                  <span className={cn(styles.goalName, styles['goalName--brand'])}>
                    {goalName}
                  </span>
                </div>
              ) : (
                <span className={styles.goalName}>{goalName}</span>
              )}

              {showTag && (
                <Tag variant={tagVariant} color={tagColor}>
                  {tagLabel}
                </Tag>
              )}
            </div>

            {/* Progress section */}
            {(progressTitle || showProgressBar) && (
              <div className={styles.progressSection}>
                {progressTitle && (
                  <p className={styles.progressTitle}>{progressTitle}</p>
                )}
                {showProgressBar && (
                  <ProgressIndicator
                    variant="info"
                    value={progressValue}
                    label={progressLabel}
                    valueLabel={progressValueLabel}
                  />
                )}
              </div>
            )}

            {/* Content slot */}
            {children && (
              <div className={styles.contentSlot}>{children}</div>
            )}

            {/* IntelligentInsight — inside contentContainer so it stops at the chevron */}
            {showInsight && insightLabel && (
              <div className={styles.insightWrapper}>
                <IntelligentInsight label={insightLabel} />
              </div>
            )}

            {/* Alert — inside contentContainer so it stops at the chevron */}
            {showAlert && alertMessage && (
              <div className={styles.alertWrapper}>
              <Alert
                variant="warning"
                action={
                  alertAction ? (
                    <Link
                      variant="default"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        onAlertAction?.();
                      }}
                    >
                      {alertAction}
                    </Link>
                  ) : undefined
                }
              >
                {alertMessage}
              </Alert>
              </div>
            )}
          </div>

          {/* Chevron navigation */}
          {showNavigation && (
            <div className={styles.chevronContainer}>
              <IconButton
                variant="ghost"
                size="medium"
                aria-label="Navigate to goal"
                onClick={onNavigate}
              >
                <ChevronRight aria-hidden="true" />
              </IconButton>
            </div>
          )}
        </div>

        {/* Divider */}
        {showDivider && <Divider decorative />}
      </article>
    );
  }
);

ListGoal.displayName = 'ListGoal';
