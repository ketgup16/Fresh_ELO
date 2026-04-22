import React, { useState } from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { ClockingWidget } from '@/components/walmart/ClockingWidget';
import { RadioGroup, Radio } from '@/components/ui/radio-group';
import exStyles from '@/components/examples/ExamplePage.module.css';
import styles from './ClockStatus.module.css';

/** Standalone clock status badge — label + signal icon (matches Figma .[AX] Clock status) */
function ClockStatusBadge({ clockedIn }: { clockedIn: boolean }) {
  return (
    <div className={styles.badge}>
      <span className={styles.badgeLabel}>
        {clockedIn ? 'Clocked in' : 'Clocked out'}
      </span>
      {clockedIn ? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
          <rect width="16" height="16" rx="8" fill="#F8F8F8" />
          <circle cx="8" cy="8" r="5.5" fill="#6DD400" stroke="#1D5F02" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
          <rect width="16" height="16" rx="8" fill="#F8F8F8" />
          <circle cx="8" cy="8" r="5.5" fill="#F8F8F8" stroke="#74767C" />
        </svg>
      )}
    </div>
  );
}

export default function ClockStatusPage() {
  const [demoState, setDemoState] = useState<'clocked-out' | 'clocked-in'>('clocked-out');

  return (
    <ComponentPageLayout
      section="AX Patterns"
      title="Clock Status"
      description="Displays whether an associate is clocked in or clocked out. Appears in the top header widget alongside shift details and clock-in/out actions. The status badge pairs a heading-medium label with a signal icon that changes colour between states."
    >
      <div className={exStyles.pageGap}>

        {/* ① Interactive Demo */}
        <div className={exStyles.section}>
          <h2 className={exStyles.sectionTitle}>Interactive Demo</h2>
          <p className={exStyles.desc}>
            Toggle between clock states to see how the full widget and status badge update.
          </p>

          <div className={exStyles.controlsRow}>
            <span className={exStyles.controlLabel}>State:</span>
            <RadioGroup
              value={demoState}
              onValueChange={(v) => setDemoState(v as 'clocked-out' | 'clocked-in')}
              orientation="horizontal"
              className={exStyles.radioGroupRow}
            >
              <Radio value="clocked-out" label="Clocked out" />
              <Radio value="clocked-in" label="Clocked in" />
            </RadioGroup>
          </div>

          <div className={styles.widgetFrame}>
            <ClockingWidget clockState={demoState} />
          </div>
        </div>

        {/* ② Status badge — isolated states */}
        <div className={exStyles.section}>
          <h2 className={exStyles.sectionTitle}>Status Badge States</h2>
          <p className={exStyles.desc}>
            The clock status badge is composed of a heading-medium label and a 16×16 signal icon.
            The icon uses a filled green circle when clocked in and an empty circle when clocked out.
          </p>

          <div className={exStyles.variantGrid}>
            <div className={exStyles.variantCard}>
              <span className={exStyles.variantCardLabel}>Clocked out</span>
              <div className={styles.badgeFrame}>
                <ClockStatusBadge clockedIn={false} />
              </div>
            </div>

            <div className={exStyles.variantCard}>
              <span className={exStyles.variantCardLabel}>Clocked in</span>
              <div className={styles.badgeFrame}>
                <ClockStatusBadge clockedIn={true} />
              </div>
            </div>
          </div>
        </div>

        {/* ③ Both widget states side-by-side */}
        <div className={exStyles.section}>
          <h2 className={exStyles.sectionTitle}>Widget States</h2>
          <p className={exStyles.desc}>
            The full clocking widget on the home screen uses the top-nav token fill as its background.
            Both states are shown below.
          </p>

          <div className={styles.widgetStatesGrid}>
            <div className={exStyles.variantCard}>
              <span className={exStyles.variantCardLabel}>Clocked out</span>
              <ClockingWidget clockState="clocked-out" />
            </div>

            <div className={exStyles.variantCard}>
              <span className={exStyles.variantCardLabel}>Clocked in</span>
              <ClockingWidget clockState="clocked-in" />
            </div>
          </div>
        </div>

        {/* ④ Signal icon anatomy */}
        <div className={exStyles.section}>
          <h2 className={exStyles.sectionTitle}>Signal Icon Anatomy</h2>
          <p className={exStyles.desc}>
            The signal icon is a 16×16 SVG with a subtle background circle and a filled indicator circle.
          </p>

          <div className={exStyles.variantGrid}>
            <div className={exStyles.variantCard}>
              <span className={exStyles.variantCardLabel}>Clocked out — empty circle, gray stroke</span>
              <div className={styles.iconFrame}>
                <svg width="32" height="32" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <rect width="16" height="16" rx="8" fill="#F8F8F8" />
                  <circle cx="8" cy="8" r="5.5" fill="#F8F8F8" stroke="#74767C" />
                </svg>
                <code className={styles.iconCode}>fill #F8F8F8 / stroke #74767C</code>
              </div>
            </div>

            <div className={exStyles.variantCard}>
              <span className={exStyles.variantCardLabel}>Clocked in — green fill, dark green stroke</span>
              <div className={styles.iconFrame}>
                <svg width="32" height="32" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <rect width="16" height="16" rx="8" fill="#F8F8F8" />
                  <circle cx="8" cy="8" r="5.5" fill="#6DD400" stroke="#1D5F02" />
                </svg>
                <code className={styles.iconCode}>fill #6DD400 / stroke #1D5F02</code>
              </div>
            </div>
          </div>
        </div>

        {/* ⑤ ClockingWidget Props */}
        <div className={exStyles.section}>
          <h2 className={exStyles.sectionTitle}>Props</h2>
          <p className={exStyles.desc}>Props accepted by the <code>ClockingWidget</code> component.</p>
          <div className={exStyles.tableWrapper}>
            <table className={exStyles.docsTable}>
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['clockState', "'clocked-out' | 'clocked-in'", "'clocked-out'", 'Drives the status label and signal icon.'],
                  ['role', 'string', "'Food & Consumables TL'", 'Associate role label shown below the status.'],
                  ['shiftTime', 'string', "'Today, 7:30am – 4:00pm'", 'Current shift time range.'],
                  ['lunchTime', 'string', "'12:00pm – 12:30pm'", 'Scheduled lunch window.'],
                  ['storeNumber', 'string', "'Store #972'", 'Store identifier.'],
                  ['walmartWeek', 'string', "'WM WK 9'", 'Walmart fiscal week label.'],
                  ['illustrationSrc', 'string', '—', 'URL for the associate illustration image.'],
                  ['onClockIn', '() => void', '—', 'Callback fired when the Clock in button is pressed.'],
                  ['onViewTimecard', '() => void', '—', 'Callback fired when the View timecard link is pressed.'],
                ].map(([prop, type, def, desc]) => (
                  <tr key={prop} style={{ borderBottom: '1px solid var(--ld-semantic-color-border-subtlest)' }}>
                    <td className={exStyles.propCell}>{prop}</td>
                    <td className={exStyles.codeCell}>{type}</td>
                    <td className={exStyles.codeCell}>{def}</td>
                    <td>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ⑥ Usage */}
        <div className={exStyles.section}>
          <h2 className={exStyles.sectionTitle}>Usage</h2>
          <pre className={exStyles.codeBlock}>{`import { ClockingWidget } from '@/components/walmart/ClockingWidget';

// Clocked out state
<ClockingWidget
  clockState="clocked-out"
  role="Food & Consumables TL"
  shiftTime="Today, 7:30am – 4:00pm"
  lunchTime="12:00pm – 12:30pm"
  storeNumber="Store #972"
  walmartWeek="WM WK 9"
  onClockIn={() => handleClockIn()}
  onViewTimecard={() => handleViewTimecard()}
/>

// Clocked in state
<ClockingWidget clockState="clocked-in" />`}</pre>
        </div>

      </div>
    </ComponentPageLayout>
  );
}
