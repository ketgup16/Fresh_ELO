import React, { useState } from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { WCPRating } from '@/components/walmart/WCPRating';
import { Button } from '@/components/ui/Button';
import styles from './WCPRating.module.css';

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className={styles.sectionTitle}>{children}</h2>;
}

function SectionDesc({ children }: { children: React.ReactNode }) {
  return <p className={styles.sectionDesc}>{children}</p>;
}

function DemoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className={styles.demoCard}>
      <h3 className={styles.cardTitle}>{title}</h3>
      {children}
    </div>
  );
}

const LABELS: Record<number, string> = {
  0: 'Unrated',
  1: 'Very poor',
  2: 'Poor',
  3: 'Fair',
  4: 'Good',
  5: 'Excellent',
};

export default function WCPRatingPage() {
  const [controlledValue, setControlledValue] = useState(0);
  const [lastSelected, setLastSelected] = useState<number | null>(null);

  return (
    <ComponentPageLayout
      section="WCP Components"
      title="Ratings"
      description="An interactive 5-star rating component for the Walmart consumer experience. Users click stars to select a rating and see a contextual label. Supports two size variants (small and medium) with responsive star dimensions across the 900px breakpoint."
    >
      <div className={styles.content}>

        {/* ── Live Interactive Demo ── */}
        <section className={styles.section}>
          <SectionTitle>Interactive Demo</SectionTitle>
          <SectionDesc>
            Click a star to select a rating. Click the same star again to clear it back to "Unrated". Hover over stars to preview the label.
          </SectionDesc>
          <div className={styles.interactiveDemo}>
            <div className={styles.interactiveDemoInner}>
              <WCPRating
                size="medium"
                value={controlledValue}
                onChange={(v) => {
                  setControlledValue(v);
                  setLastSelected(v);
                }}
                aria-label="Product rating"
              />
              <div className={styles.interactiveMeta}>
                <span className={styles.interactiveValue}>
                  Selected value: <strong>{controlledValue}</strong> — {LABELS[controlledValue]}
                </span>
                {lastSelected !== null && (
                  <span className={styles.interactiveLastEvent}>
                    Last onChange fired with: {lastSelected}
                  </span>
                )}
                <Button
                  variant="secondary"
                  size="small"
                  onClick={() => { setControlledValue(0); setLastSelected(null); }}
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Sizes ── */}
        <section className={styles.section}>
          <SectionTitle>Sizes</SectionTitle>
          <SectionDesc>
            Two size variants adapt across the 900px breakpoint. Resize the browser to see the stars change size — <code>small</code> goes from 20px (mobile) to 24px (desktop), and <code>medium</code> goes from 28px to 32px.
          </SectionDesc>

          <div className={styles.sizesGrid}>
            <DemoCard title="Small">
              <div className={styles.ratingsRow}>
                {[0, 1, 2, 3, 4, 5].map((v) => (
                  <WCPRating size="small" defaultValue={v} key={`small-${v}`} />
                ))}
              </div>
            </DemoCard>

            <DemoCard title="Medium">
              <div className={styles.ratingsRow}>
                {[0, 1, 2, 3, 4, 5].map((v) => (
                  <WCPRating size="medium" defaultValue={v} key={`medium-${v}`} />
                ))}
              </div>
            </DemoCard>
          </div>
        </section>

        {/* ── States ── */}
        <section className={styles.section}>
          <SectionTitle>States</SectionTitle>
          <SectionDesc>
            The rating component has three key interaction states. The disabled state prevents all interaction and reduces opacity to communicate unavailability.
          </SectionDesc>

          <div className={styles.statesGrid}>
            <DemoCard title="Default (Unrated)">
              <div className={styles.stateItem}>
                <WCPRating size="medium" defaultValue={0} />
              </div>
            </DemoCard>

            <DemoCard title="With selection (Good — 4 stars)">
              <div className={styles.stateItem}>
                <WCPRating size="medium" defaultValue={4} />
              </div>
            </DemoCard>

            <DemoCard title="Disabled (Unrated)">
              <div className={styles.stateItem}>
                <WCPRating size="medium" defaultValue={0} disabled />
              </div>
            </DemoCard>

            <DemoCard title="Disabled (with selection — 3 stars)">
              <div className={styles.stateItem}>
                <WCPRating size="medium" defaultValue={3} disabled />
              </div>
            </DemoCard>
          </div>
        </section>

        {/* ── Star labels reference ── */}
        <section className={styles.section}>
          <SectionTitle>Rating Labels</SectionTitle>
          <SectionDesc>
            Each star value maps to a semantic label shown below the stars. Hover over a star to preview its label before committing.
          </SectionDesc>

          <div className={styles.labelsTable}>
            <div className={styles.labelsTableHeader}>
              <span>Stars</span>
              <span>Label</span>
              <span>Preview</span>
            </div>
            {[0, 1, 2, 3, 4, 5].map((v) => (
              <div key={v} className={styles.labelsTableRow}>
                <span className={styles.labelsTableStars}>{v === 0 ? '—' : `${v} / 5`}</span>
                <span className={styles.labelsTableLabel}>{LABELS[v]}</span>
                <WCPRating size="small" value={v} aria-label={`${v} stars example`} />
              </div>
            ))}
          </div>
        </section>

        {/* ── Accessibility ── */}
        <section className={styles.section}>
          <SectionTitle>Accessibility</SectionTitle>
          <div className={styles.behaviorGrid}>
            <div className={styles.behaviorCard}>
              <h4 className={styles.behaviorTitle}>Keyboard interaction</h4>
              <ul className={styles.behaviorList}>
                <li><code>Tab</code> — moves focus between individual star buttons</li>
                <li><code>Enter</code> / <code>Space</code> — selects the focused star (or clears if already selected)</li>
                <li>Clicking the currently selected star clears the rating to "Unrated"</li>
              </ul>
            </div>
            <div className={styles.behaviorCard}>
              <h4 className={styles.behaviorTitle}>Screen reader support</h4>
              <ul className={styles.behaviorList}>
                <li>Stars are wrapped in a <code>role="radiogroup"</code></li>
                <li>Each star has <code>role="radio"</code> and <code>aria-checked</code></li>
                <li>The label below uses <code>aria-live="polite"</code> to announce changes</li>
                <li>Pass a custom <code>aria-label</code> to name the group contextually</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── API / Usage ── */}
        <section className={styles.section}>
          <SectionTitle>Usage</SectionTitle>
          <pre className={styles.codeBlock}>{`import { WCPRating } from '@/components/walmart/WCPRating';

// Uncontrolled — internal state
<WCPRating size="medium" defaultValue={0} onChange={(v) => console.log(v)} />

// Controlled — you manage the state
const [rating, setRating] = useState(0);
<WCPRating size="medium" value={rating} onChange={setRating} />

// Small size
<WCPRating size="small" />

// Disabled
<WCPRating size="medium" value={4} disabled />

// Custom group label for accessibility
<WCPRating size="medium" aria-label="Rate this product" />`}
          </pre>
        </section>

        {/* ── Props table ── */}
        <section className={styles.section}>
          <SectionTitle>Props</SectionTitle>
          <div className={styles.propsTable}>
            <div className={styles.propsTableHeader}>
              <span>Prop</span>
              <span>Type</span>
              <span>Default</span>
              <span>Description</span>
            </div>
            {[
              { prop: 'value', type: 'number', def: '—', desc: 'Controlled rating value (0–5). 0 = unrated.' },
              { prop: 'defaultValue', type: 'number', def: '0', desc: 'Uncontrolled initial value.' },
              { prop: 'onChange', type: '(value: number) => void', def: '—', desc: 'Called when the user selects or clears a rating.' },
              { prop: 'size', type: "'small' | 'medium'", def: "'medium'", desc: 'Controls star dimensions at mobile and desktop breakpoints.' },
              { prop: 'disabled', type: 'boolean', def: 'false', desc: 'Prevents all interaction and reduces opacity.' },
              { prop: 'aria-label', type: 'string', def: "'Star rating'", desc: 'Accessible name for the radiogroup.' },
              { prop: 'className', type: 'string', def: '—', desc: 'Additional class applied to the outer wrapper.' },
            ].map(({ prop, type, def, desc }) => (
              <div key={prop} className={styles.propsTableRow}>
                <code className={styles.propName}>{prop}</code>
                <code className={styles.propType}>{type}</code>
                <code className={styles.propDefault}>{def}</code>
                <span className={styles.propDesc}>{desc}</span>
              </div>
            ))}
          </div>
        </section>

      </div>
    </ComponentPageLayout>
  );
}
