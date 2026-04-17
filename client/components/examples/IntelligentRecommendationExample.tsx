import * as React from 'react';
import { IntelligentRecommendation } from '@/components/ui/IntelligentRecommendation';
import { Divider } from '@/components/ui/Divider';
import { Clock } from '@/components/icons/Clock';
import { User } from '@/components/icons/User';
import { Location } from '@/components/icons/Location';
import { Tag } from '@/components/icons/Tag';
import styles from './IntelligentInsightExample.module.css';

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className={styles.sectionHeading}>{children}</h2>;
}

function SectionDesc({ children }: { children: React.ReactNode }) {
  return <p className={styles.sectionDesc}>{children}</p>;
}

const iconStyle: React.CSSProperties = { width: 16, height: 16 };

export function IntelligentRecommendationExample() {
  return (
    <div className={styles.root}>

      {/* ── Minimal / Title only ─────────────────────────────────────── */}
      <section className={styles.section}>
        <SectionHeading>Minimal — Title only, no buttons</SectionHeading>
        <SectionDesc>
          The simplest form: MagicFill icon + "Recommendation" eyebrow and a
          bold title. No buttons, no sources.
        </SectionDesc>
        <div className={styles.demoRow}>
          <IntelligentRecommendation
            title="Generate tonight's stocking plan"
            buttonType="none"
          />
        </div>
      </section>

      {/* ── With light eyebrow label ─────────────────────────────────── */}
      <section className={styles.section}>
        <SectionHeading>With light eyebrow label</SectionHeading>
        <SectionDesc>
          Set <code>showLightEyebrow</code> and <code>lightEyebrowText</code> to
          add a contextual label (e.g. department name) next to the eyebrow.
          Truncated to 1 line.
        </SectionDesc>
        <div className={styles.demoRow}>
          <IntelligentRecommendation
            title="Generate tonight's stocking plan"
            showLightEyebrow
            lightEyebrowText="Stocking Night"
            buttonType="none"
          />
        </div>
      </section>

      {/* ── With description ─────────────────────────────────────────── */}
      <section className={styles.section}>
        <SectionHeading>With description</SectionHeading>
        <SectionDesc>
          Use <code>showDescription</code> + <code>description</code> to add a
          supporting body-text message below the title.
        </SectionDesc>
        <div className={styles.demoRow}>
          <IntelligentRecommendation
            title="Generate tonight's stocking plan"
            showDescription
            description="Sidekick will help you plan stocking work and adjust for your store's unique needs."
            buttonType="none"
          />
        </div>
      </section>

      {/* ── With attributes ──────────────────────────────────────────── */}
      <section className={styles.section}>
        <SectionHeading>With attributes (up to 4)</SectionHeading>
        <SectionDesc>
          Pass an <code>attributes</code> array (max 4 items). Each item is a
          16px icon paired with a label.
        </SectionDesc>
        <div className={styles.demoRow}>
          <IntelligentRecommendation
            title="Generate tonight's stocking plan"
            showDescription
            description="Sidekick will help you plan stocking work for your store's unique needs."
            attributes={[
              { icon: <Clock style={iconStyle} />, label: '116h total work across all goals' },
              { icon: <User style={iconStyle} />, label: '27 associates available' },
              { icon: <Location style={iconStyle} />, label: 'Store #100' },
              { icon: <Tag style={iconStyle} />, label: '3 of 5 trucks arrived' },
            ]}
            buttonType="none"
          />
        </div>
      </section>

      {/* ── Button variants ───────────────────────────────────────────── */}
      <section className={styles.section}>
        <SectionHeading>Button variants</SectionHeading>
        <SectionDesc>
          Use <code>buttonType</code> to control the button arrangement:
          "single", "dual" (Secondary + Primary row), or "triple" (dual row +
          full-width tertiary below).
        </SectionDesc>
        <div className={styles.demoGrid}>
          <IntelligentRecommendation
            title="Single primary button"
            buttonType="single"
            primaryLabel="Plan your shift"
            onPrimary={() => {}}
          />
          <IntelligentRecommendation
            title="Dual buttons — Secondary + Primary"
            buttonType="dual"
            primaryLabel="Primary"
            secondaryLabel="Alternate"
            onPrimary={() => {}}
            onSecondary={() => {}}
          />
          <IntelligentRecommendation
            title="Triple buttons — Row + full-width tertiary"
            buttonType="triple"
            primaryLabel="Resolve"
            secondaryLabel="Dismiss"
            tertiaryLabel="Tertiary action"
            onPrimary={() => {}}
            onSecondary={() => {}}
            onTertiary={() => {}}
          />
        </div>
      </section>

      {/* ── With error alert ─────────────────────────────────────────── */}
      <section className={styles.section}>
        <SectionHeading>With error alert</SectionHeading>
        <SectionDesc>
          Set <code>showAlert</code> to render the error-variant alert between
          the content slot and the buttons. Optionally include an action link.
        </SectionDesc>
        <div className={styles.demoRow}>
          <IntelligentRecommendation
            title="There might be a duplicate action"
            showAlert
            alertMessage="Alert message"
            alertActionLabel="Action button"
            onAlertAction={() => {}}
            buttonType="dual"
            primaryLabel="Resolve"
            secondaryLabel="Dismiss"
            onPrimary={() => {}}
            onSecondary={() => {}}
          />
        </div>
      </section>

      {/* ── With content slot ─────────────────────────────────────────── */}
      <section className={styles.section}>
        <SectionHeading>With content slot (children)</SectionHeading>
        <SectionDesc>
          The content slot accepts any React children and renders them in a
          white surface panel. These two presets show the two common patterns
          from the Figma designs: an action-list item (used when a duplicate or
          related action is detected) and an associate-list (used when the
          recommendation surfaces top associate matches).
        </SectionDesc>
        <div className={styles.demoGrid}>

          {/* Preset A — Content | Action-list-item */}
          <IntelligentRecommendation
            title="There might be a duplicate action"
            buttonType="dual"
            primaryLabel="Resolve"
            secondaryLabel="Dismiss"
            onPrimary={() => {}}
            onSecondary={() => {}}
          >
            <div className={styles.slotAction}>
              <p className={styles.slotActionTitle}>
                Scan and pick in aisle 001
              </p>
              <p className={styles.slotActionDesc}>
                Contains items at this location that match your current task.
              </p>
              <div className={styles.slotAttr}>
                <Location className={styles.slotAttrIcon} aria-hidden="true" />
                <span className={styles.slotAttrLabel}>Backroom aisle 001</span>
              </div>
            </div>
          </IntelligentRecommendation>

          {/* Preset B — Content | Associate-list-item */}
          <IntelligentRecommendation
            title="Consider these top matches"
            buttonType="none"
          >
            <div className={styles.slotAssociateList}>
              <div className={styles.slotAssociateRow}>
                <div className={styles.slotAvatar} aria-hidden="true">BK</div>
                <div className={styles.slotAssociateInfo}>
                  <p className={styles.slotAssociateName}>Beth Karlov</p>
                  <p className={styles.slotAssociateRole}>Stocking Night TA</p>
                  <p className={styles.slotAssociateInsight}>Assigned 5 times</p>
                </div>
              </div>
              <Divider />
              <div className={styles.slotAssociateRow}>
                <div className={styles.slotAvatar} aria-hidden="true">AC</div>
                <div className={styles.slotAssociateInfo}>
                  <p className={styles.slotAssociateName}>Alex Carter</p>
                  <p className={styles.slotAssociateRole}>Stocking Day 1 TA</p>
                  <p className={styles.slotAssociateInsight}>Has 4h capacity left</p>
                </div>
              </div>
            </div>
          </IntelligentRecommendation>

        </div>
      </section>

      {/* ── With sources ─────────────────────────────────────────────── */}
      <section className={styles.section}>
        <SectionHeading>With collapsible sources</SectionHeading>
        <SectionDesc>
          Set <code>showSources</code> to reveal a "Show sources / Hide sources"
          toggle below the buttons. Provide <code>sourceDescription</code> and
          optional <code>sourceLinks</code> for the expanded state.
        </SectionDesc>
        <div className={styles.demoRow}>
          <IntelligentRecommendation
            title="Generate tonight's stocking plan"
            showDescription
            description="Sidekick will help you plan stocking work for your store's unique needs."
            buttonType="dual"
            primaryLabel="Plan your shift"
            secondaryLabel="Dismiss"
            onPrimary={() => {}}
            onSecondary={() => {}}
            showSources
            sourceDescription="This recommendation is based on your store's sales data, inventory, and process guides from yesterday."
            sourceLinks={[
              { label: 'View store data', onClick: () => {} },
              { label: 'View process guides', onClick: () => {} },
            ]}
          />
        </div>
      </section>

      {/* ── Full max state ───────────────────────────────────────────── */}
      <section className={styles.section}>
        <SectionHeading>Full / Max state</SectionHeading>
        <SectionDesc>
          All sections enabled: light eyebrow, description, 4 attributes,
          content slot, alert, dual buttons, and sources.
        </SectionDesc>
        <div className={styles.demoRow}>
          <IntelligentRecommendation
            eyebrow="Recommendation"
            showLightEyebrow
            lightEyebrowText="Stocking Night"
            title="Lorem ipsum dolor sit amet"
            showDescription
            description="Lorem ipsum dolor sit amet consectetur. Tincidunt nisl ac luctus nam eros dui aliquet."
            attributes={[
              { icon: <Clock style={iconStyle} />, label: 'Label' },
              { icon: <User style={iconStyle} />, label: 'Label' },
              { icon: <Location style={iconStyle} />, label: 'Label' },
              { icon: <Tag style={iconStyle} />, label: 'Label' },
            ]}
            showAlert
            alertMessage="Alert message"
            alertActionLabel="Action button"
            onAlertAction={() => {}}
            buttonType="dual"
            primaryLabel="Primary"
            secondaryLabel="Alternate"
            onPrimary={() => {}}
            onSecondary={() => {}}
            showSources
            sourceDescription="This recommendation is based on your store's sales data, inventory, and process guides from yesterday."
            sourceLinks={[
              { label: 'Button label', onClick: () => {} },
              { label: 'Button label', onClick: () => {} },
            ]}
          >
            <p className={styles.slotActionDesc}>
              Content slot — render any custom content here.
            </p>
          </IntelligentRecommendation>
        </div>
      </section>

    </div>
  );
}
