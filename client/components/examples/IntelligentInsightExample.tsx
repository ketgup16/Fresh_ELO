import * as React from 'react';
import { IntelligentInsight } from '@/components/ui/IntelligentInsight';
import styles from './IntelligentInsightExample.module.css';

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className={styles.sectionHeading}>{children}</h2>;
}

function SectionDesc({ children }: { children: React.ReactNode }) {
  return <p className={styles.sectionDesc}>{children}</p>;
}

export function IntelligentInsightExample() {
  return (
    <div className={styles.root}>

      {/* ── Default (label only) ──────────────────────────────────────── */}
      <section className={styles.section}>
        <SectionHeading>Default — Label only</SectionHeading>
        <SectionDesc>
          The minimal form of the component: a Sidekick logo paired with a short
          insight message. No action button is shown.
        </SectionDesc>
        <div className={styles.demoRow}>
          <IntelligentInsight
            label="Data-based intelligence to support action."
          />
        </div>
      </section>

      {/* ── With action button ────────────────────────────────────────── */}
      <section className={styles.section}>
        <SectionHeading>With action button</SectionHeading>
        <SectionDesc>
          Set <code>showButton</code> to show a full-width secondary action
          button below the label. Use <code>buttonLabel</code> to customise the
          text and <code>onButtonClick</code> to handle the action.
        </SectionDesc>
        <div className={styles.demoRow}>
          <IntelligentInsight
            label="Data-based intelligence to support action."
            showButton
            buttonLabel="Button label"
            onButtonClick={() => {}}
          />
        </div>
      </section>

      {/* ── Custom labels ─────────────────────────────────────────────── */}
      <section className={styles.section}>
        <SectionHeading>Custom labels</SectionHeading>
        <SectionDesc>
          The <code>label</code> and <code>buttonLabel</code> props accept any
          string so the component can surface diverse AI-driven insights.
        </SectionDesc>
        <div className={styles.demoGrid}>
          <IntelligentInsight
            label="Customers who bought this also added bananas and almond milk."
            showButton
            buttonLabel="Add suggested items"
            onButtonClick={() => {}}
          />
          <IntelligentInsight
            label="Your order is ready for pickup. Estimated wait: 4 minutes."
            showButton
            buttonLabel="Get directions"
            onButtonClick={() => {}}
          />
          <IntelligentInsight
            label="Based on your purchase history, you may be running low on coffee pods."
          />
          <IntelligentInsight
            label="Price dropped 12% on items in your saved list since your last visit."
            showButton
            buttonLabel="View savings"
            onButtonClick={() => {}}
          />
        </div>
      </section>

      {/* ── Responsive width ──────────────────────────────────────────── */}
      <section className={styles.section}>
        <SectionHeading>Responsive width</SectionHeading>
        <SectionDesc>
          The component stretches to fill its container. Constrain it via the
          parent layout — here shown at three common widths.
        </SectionDesc>
        <div className={styles.responsiveDemo}>
          <div className={styles.constrainNarrow}>
            <IntelligentInsight
              label="Insight at 280px width."
              showButton
              buttonLabel="Action"
              onButtonClick={() => {}}
            />
          </div>
          <div className={styles.constrainMid}>
            <IntelligentInsight
              label="Insight at 360px width with a longer message that wraps naturally."
              showButton
              buttonLabel="View details"
              onButtonClick={() => {}}
            />
          </div>
          <div className={styles.constrainWide}>
            <IntelligentInsight
              label="Insight at full container width."
              showButton
              buttonLabel="Take action"
              onButtonClick={() => {}}
            />
          </div>
        </div>
      </section>

    </div>
  );
}
