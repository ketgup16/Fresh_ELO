import React, { useState } from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { WCPTimerView } from '@/components/walmart/WCPTimerView';
import type { WCPTimerBadgeColor } from '@/components/walmart/WCPTimerView';
import { Button } from '@/components/ui/Button';
import styles from './WCPTimerView.module.css';

// ── Helpers ────────────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className={styles.sectionTitle}>{children}</h2>;
}

function SectionDesc({ children }: { children: React.ReactNode }) {
  return <p className={styles.sectionDesc}>{children}</p>;
}

function DemoCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className={styles.demoCard}>
      <div className={styles.cardLabel}>{label}</div>
      <div className={styles.cardContent}>{children}</div>
    </div>
  );
}

function secondsFromNow(s: number): number {
  return Date.now() + s * 1000;
}

const NORMAL_END = secondsFromNow(2 * 3600 + 34 * 60 + 12);
const WARNING_END = secondsFromNow(4 * 60 + 30);
const CRITICAL_END = secondsFromNow(35);

// ── Badge color variant data ───────────────────────────────────────────────
const BADGE_COLORS: { color: WCPTimerBadgeColor; label: string }[] = [
  { color: 'spark',    label: 'Spark (yellow)' },
  { color: 'negative', label: 'Negative (red)' },
  { color: 'blue',     label: 'Blue (subtle)' },
  { color: 'inverse',  label: 'Inverse (navy)' },
  { color: 'outline',  label: 'Outline' },
  { color: 'plain',    label: 'Plain' },
];

// ── Main page ──────────────────────────────────────────────────────────────

export default function WCPTimerViewPage() {
  const [urgencyEnd, setUrgencyEnd] = useState<number>(NORMAL_END);

  return (
    <ComponentPageLayout
      section="WCP Components"
      title="[WCP] Timer View"
      description="A live countdown timer for limited-time offers, queue reservations, and flash sales. Three display variants — default (stacked digit blocks), compact (inline text), and badge (chip overlay) — all share the same urgency-aware color system."
    >
      <div className={styles.page}>

        {/* ── Overview ─────────────────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Overview</SectionTitle>
          <SectionDesc>
            The WCP Timer View wraps the <code>useWCPTimer</code> hook and renders a live countdown
            that automatically transitions through urgency states: <strong>normal</strong> (neutral,
            &gt;10 min), <strong>warning</strong> (yellow, 1–10 min), and <strong>critical</strong>{' '}
            (red, &lt;1 min). For the badge variant, an explicit <code>badgeColor</code> prop is also
            available in 6 colors × 2 sizes (12 variants total).
          </SectionDesc>
        </div>

        {/* ── Variants ─────────────────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Display Variants</SectionTitle>
          <SectionDesc>
            Three display variants cover every placement context.
          </SectionDesc>
          <div className={styles.demoGrid}>
            <DemoCard label="Default — stacked digit blocks">
              <WCPTimerView endTime={NORMAL_END} variant="default" label="Offer ends in" />
            </DemoCard>
            <DemoCard label="Compact — inline text">
              <WCPTimerView endTime={NORMAL_END} variant="compact" label="Ends in" />
            </DemoCard>
            <DemoCard label="Badge (small) — chip overlay">
              <WCPTimerView endTime={NORMAL_END} variant="badge" badgeSize="small" showLabel={false} />
            </DemoCard>
            <DemoCard label="Badge (large) — chip overlay">
              <WCPTimerView endTime={NORMAL_END} variant="badge" badgeSize="large" showLabel={false} />
            </DemoCard>
          </div>
        </div>

        {/* ── Badge Color Variants ─────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Badge Color Variants — 12 Total</SectionTitle>
          <SectionDesc>
            Use <code>badgeColor</code> to pin a specific color regardless of urgency state.
            Each color is available in <code>small</code> (default) and <code>large</code> sizes.
          </SectionDesc>

          <div className={styles.badgeVariantsGrid}>
            {/* Column headers */}
            <div className={styles.badgeVariantHeader} />
            <div className={styles.badgeVariantHeader}>Small</div>
            <div className={styles.badgeVariantHeader}>Large</div>

            {BADGE_COLORS.map(({ color, label }) => (
              <React.Fragment key={color}>
                <div className={styles.badgeVariantRowLabel}>{label}</div>
                <div className={styles.badgeVariantCell}>
                  <WCPTimerView
                    endTime={NORMAL_END}
                    variant="badge"
                    badgeColor={color}
                    badgeSize="small"
                    showLabel={false}
                  />
                </div>
                <div className={styles.badgeVariantCell}>
                  <WCPTimerView
                    endTime={NORMAL_END}
                    variant="badge"
                    badgeColor={color}
                    badgeSize="large"
                    showLabel={false}
                  />
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ── Urgency States ───────────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Auto Urgency States</SectionTitle>
          <SectionDesc>
            When no <code>badgeColor</code> is set, urgency is derived automatically from time
            remaining. Use the buttons below to preview each state.
          </SectionDesc>

          <div className={styles.controlRow}>
            <span className={styles.controlLabel}>Set urgency preview:</span>
            <Button variant="secondary" size="small" onClick={() => setUrgencyEnd(secondsFromNow(2 * 3600))}>
              Normal (&gt;10 min)
            </Button>
            <Button variant="secondary" size="small" onClick={() => setUrgencyEnd(secondsFromNow(4 * 60 + 30))}>
              Warning (4:30)
            </Button>
            <Button variant="secondary" size="small" onClick={() => setUrgencyEnd(secondsFromNow(35))}>
              Critical (35s)
            </Button>
          </div>

          <div className={styles.demoRow}>
            <DemoCard label="Default variant">
              <WCPTimerView endTime={urgencyEnd} variant="default" label="Offer ends in" />
            </DemoCard>
            <DemoCard label="Compact variant">
              <WCPTimerView endTime={urgencyEnd} variant="compact" label="Ends in" />
            </DemoCard>
            <DemoCard label="Badge (small)">
              <WCPTimerView endTime={urgencyEnd} variant="badge" badgeSize="small" showLabel={false} />
            </DemoCard>
            <DemoCard label="Badge (large)">
              <WCPTimerView endTime={urgencyEnd} variant="badge" badgeSize="large" showLabel={false} />
            </DemoCard>
          </div>
        </div>

        {/* ── Hook API ─────────────────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Hook API — useWCPTimer</SectionTitle>
          <SectionDesc>
            Use the hook directly when you need the raw timer state to drive custom UI logic.
          </SectionDesc>
          <pre className={styles.codeBlock}>{`import { useWCPTimer } from '@/hooks/use-wcp-timer';

const { hours, minutes, seconds, totalSeconds, isExpired, urgency, formatted } =
  useWCPTimer(endTime, onExpire);

// urgency: 'normal' | 'warning' | 'critical'
// formatted: "HH:MM:SS" or "MM:SS" when hours === 0`}</pre>
        </div>

        {/* ── Component API ────────────────────────────────────────── */}
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
              <tr><td>endTime</td><td>Date | number | string</td><td>—</td><td>Target end time. Required.</td></tr>
              <tr><td>variant</td><td>'default' | 'compact' | 'badge'</td><td>'default'</td><td>Display style.</td></tr>
              <tr><td>badgeColor</td><td>'spark' | 'negative' | 'blue' | 'inverse' | 'outline' | 'plain'</td><td>—</td><td>Badge only. Explicit color — overrides urgency auto-coloring.</td></tr>
              <tr><td>badgeSize</td><td>'small' | 'large'</td><td>'small'</td><td>Badge only. Controls padding and font size.</td></tr>
              <tr><td>label</td><td>string</td><td>'Offer ends in'</td><td>Text label shown next to or above the time.</td></tr>
              <tr><td>showLabel</td><td>boolean</td><td>true</td><td>Show or hide the label.</td></tr>
              <tr><td>onExpire</td><td>() =&gt; void</td><td>—</td><td>Called once when the countdown reaches zero.</td></tr>
            </tbody>
          </table>
        </div>

        {/* ── Accessibility ────────────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Accessibility</SectionTitle>
          <SectionDesc>
            The timer renders with <code>role="timer"</code> and <code>aria-live="polite"</code>, so
            screen readers announce time changes without interrupting the user's current reading flow.
            An <code>aria-label</code> describes the full remaining time in plain language (e.g.,
            "Offer ends in: 2 hours 34 minutes 12 seconds remaining"). The digit-flip animation is
            suppressed when <code>prefers-reduced-motion: reduce</code> is active.
          </SectionDesc>
        </div>

        {/* ── Do / Don't ──────────────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Guidelines</SectionTitle>
          <div className={styles.guidelineGrid}>
            <div className={styles.guidelineCard}>
              <div className={styles.doLabel}>Do</div>
              <p className={styles.guidelineText}>
                Use the badge variant inside product card image areas only. Keep it bottom-left to
                avoid overlapping with the price and heart button.
              </p>
            </div>
            <div className={styles.guidelineCard}>
              <div className={styles.dontLabel}>Don't</div>
              <p className={styles.guidelineText}>
                Don't show a timer for offers with more than 24 hours remaining — it creates
                unnecessary urgency and loses its effectiveness for truly limited-time events.
              </p>
            </div>
            <div className={styles.guidelineCard}>
              <div className={styles.doLabel}>Do</div>
              <p className={styles.guidelineText}>
                Let urgency colors change automatically. The component handles normal → warning →
                critical transitions without any custom logic required.
              </p>
            </div>
            <div className={styles.guidelineCard}>
              <div className={styles.dontLabel}>Don't</div>
              <p className={styles.guidelineText}>
                Don't pass a static string that looks like a time ("2:34:00") as <code>endTime</code>{' '}
                — always pass a real <code>Date</code> or a timestamp so the timer counts down correctly.
              </p>
            </div>
          </div>
        </div>

      </div>
    </ComponentPageLayout>
  );
}
