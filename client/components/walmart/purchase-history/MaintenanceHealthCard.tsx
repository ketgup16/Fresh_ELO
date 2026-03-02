import React from 'react';
import { DollarCircleFill } from '@/components/icons/DollarCircleFill';
import { WarningFill } from '@/components/icons/WarningFill';
import { Clock } from '@/components/icons/Clock';
import { CheckCircleFill } from '@/components/icons/CheckCircleFill';
import { Tag } from '@/components/ui/Tag';
import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import styles from './MaintenanceHealthCard.module.css';

export type HealthStatus = 'overdue' | 'due' | 'good';

export interface MaintenanceItem {
  name: string;
  status: HealthStatus;
  detail: string;   // e.g. "3,200 mi overdue" | "Due in ~800 mi" | "Next: Oct 2026"
  price?: string;   // estimated cost, shown for overdue/due
}

export interface MaintenanceHealthCardProps {
  vehicle: string;
  mileage: string;          // e.g. "22,450 miles"
  healthScore: number;      // 0–100
  items: MaintenanceItem[];
  bundleSavings?: string;   // e.g. "Bundle oil change + tire rotation and save $12"
  bundleSavingsAmount?: string; // e.g. "$12"
  location?: string;
  /** Optional illustration shown as header background. Store locally in public/illustrations/ */
  illustration?: string;
  /** Short value statement shown below the health grid, e.g. "Save up to 40% vs. dealerships" */
  valueStatement?: string;
  onSchedule?: () => void;
  onViewReport?: () => void;
}

const STATUS_TAG_CONFIG: Record<HealthStatus, { color: 'negative' | 'warning' | 'positive'; icon: React.ReactNode; label: string }> = {
  overdue: { color: 'negative', icon: <WarningFill />, label: 'Overdue' },
  due:     { color: 'warning',  icon: <Clock />,        label: 'Due soon' },
  good:    { color: 'positive', icon: <CheckCircleFill />, label: 'Good' },
};

// Radial health score ring
function ScoreRing({ score }: { score: number }) {
  const r = 20;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const color =
    score >= 70
      ? 'var(--ld-semantic-color-text-positive, #4ADE80)'
      : score >= 40
      ? 'var(--ld-semantic-color-rating-fill, #FACC15)'
      : 'var(--ld-semantic-color-text-negative, #F87171)';

  return (
    <svg className={styles.scoreRing} viewBox="0 0 52 52" aria-label={`Health score: ${score} out of 100`}>
      {/* Track */}
      <circle cx="26" cy="26" r={r} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="5" />
      {/* Progress */}
      <circle
        cx="26" cy="26" r={r}
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        transform="rotate(-90 26 26)"
      />
      {/* Score number */}
      <text
        x="26" y="26"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#ffffff"
        fontSize="12"
        fontWeight="700"
        fontFamily="var(--ld-semantic-font-family-sans)"
      >
        {score}
      </text>
    </svg>
  );
}

export function MaintenanceHealthCard({
  vehicle,
  mileage,
  healthScore,
  items,
  bundleSavings,
  bundleSavingsAmount,
  location,
  illustration,
  valueStatement,
  onSchedule,
  onViewReport,
}: MaintenanceHealthCardProps) {
  const needsAction = items.some(i => i.status === 'overdue' || i.status === 'due');

  return (
    <article className={styles.card}>
      {/* ── Header: illustration background + vehicle info + health score ── */}
      <div className={`${styles.header} ${illustration ? styles.headerWithIllustration : ''}`}>
        {illustration && (
          <img
            src={illustration}
            alt=""
            aria-hidden="true"
            className={styles.headerIllustration}
          />
        )}
        <div className={styles.headerContent}>
          <div className={styles.headerText}>
            <p className={styles.headerEyebrow}>Auto Care Center</p>
            <p className={styles.headerVehicle}>{vehicle}</p>
            {location && <p className={styles.headerMileage}>{location}</p>}
            <p className={styles.headerMileage}>{mileage}</p>
          </div>
          <div className={styles.healthScore}>
            <ScoreRing score={healthScore} />
            <span className={styles.scoreLabel}>Health</span>
          </div>
        </div>
      </div>

      {/* ── Maintenance health grid ── */}
      <div className={styles.section}>
        <p className={styles.sectionTitle}>Maintenance status</p>
        <div className={styles.healthGrid}>
          {items.map((item) => (
            <div
              key={item.name}
              className={`${styles.healthItem} ${styles[`healthItem--${item.status}`]}`}
            >
              <Tag
                variant="primary"
                color={STATUS_TAG_CONFIG[item.status].color}
                leading={STATUS_TAG_CONFIG[item.status].icon}
              >
                {STATUS_TAG_CONFIG[item.status].label}
              </Tag>
              <p className={styles.itemName}>{item.name}</p>
              <p className={styles.itemDetail}>{item.detail}</p>
              {item.price && <p className={styles.itemPrice}>~{item.price}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* ── Value statement strip ── */}
      {valueStatement && (
        <div className={styles.valueBar}>
          <span className={styles.valueBarText}>{valueStatement}</span>
        </div>
      )}

      {/* ── Bundle savings strip ── */}
      {bundleSavings && (
        <div className={styles.savingsBanner}>
          <DollarCircleFill className={styles.savingsIconSvg} aria-hidden="true" />
          <p className={styles.savingsText}>
            {bundleSavings}{' '}
            {bundleSavingsAmount && (
              <span className={styles.savingsAmount}>Save {bundleSavingsAmount}</span>
            )}
          </p>
        </div>
      )}

      {/* ── Footer ── */}
      <div className={styles.footer}>
        <span className={styles.footerLeft}>
          {needsAction ? 'Action recommended' : 'All services on track'}
        </span>
        <ButtonGroup>
          {onViewReport && (
            <Button variant="secondary" size="small" onClick={onViewReport}>
              View full report
            </Button>
          )}
          <Button variant="primary" size="small" onClick={onSchedule}>
            Schedule services
          </Button>
        </ButtonGroup>
      </div>
    </article>
  );
}
