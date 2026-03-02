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
  onSchedule?: () => void;
  onViewReport?: () => void;
}

const STATUS_LABELS: Record<HealthStatus, string> = {
  overdue: 'Overdue',
  due: 'Due soon',
  good: 'Good',
};

const STATUS_DOT: Record<HealthStatus, string> = {
  overdue: '●',
  due: '●',
  good: '●',
};

// Wrench SVG icon (inline, no external dep)
function WrenchIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
        stroke="#ffffff"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Radial health score ring
function ScoreRing({ score }: { score: number }) {
  const r = 20;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const color = score >= 70 ? '#4ADE80' : score >= 40 ? '#FACC15' : '#F87171';

  return (
    <svg className={styles.scoreRing} viewBox="0 0 52 52" aria-label={`Health score: ${score}/100`}>
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
  onSchedule,
  onViewReport,
}: MaintenanceHealthCardProps) {
  const needsAction = items.some(i => i.status === 'overdue' || i.status === 'due');

  return (
    <article className={styles.card}>
      {/* ── Header: dark navy + vehicle info + health score ── */}
      <div className={styles.header}>
        <div className={styles.headerIcon}>
          <WrenchIcon />
        </div>
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

      {/* ── Maintenance health grid ── */}
      <div className={styles.section}>
        <p className={styles.sectionTitle}>Vehicle Maintenance Status</p>
        <div className={styles.healthGrid}>
          {items.map((item) => (
            <div
              key={item.name}
              className={`${styles.healthItem} ${styles[`healthItem--${item.status}`]}`}
            >
              <span className={`${styles.statusBadge} ${styles[`statusBadge--${item.status}`]}`}>
                {STATUS_DOT[item.status]} {STATUS_LABELS[item.status]}
              </span>
              <p className={styles.itemName}>{item.name}</p>
              <p className={styles.itemDetail}>{item.detail}</p>
              {item.price && <p className={styles.itemPrice}>~{item.price}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* ── Bundle savings strip ── */}
      {bundleSavings && (
        <div className={styles.savingsBanner}>
          <span className={styles.savingsIcon} aria-hidden="true">💰</span>
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
