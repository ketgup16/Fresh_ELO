import * as React from 'react';
import { ListGoal } from '@/components/ui/ListGoal';
import { Divider } from '@/components/ui/Divider';
import { Link } from '@/components/ui/Link';
import { Clock } from '@/components/icons/Clock';
import { Box } from '@/components/icons/Box';
import styles from './ListGoalExample.module.css';

// ─── Illustration placeholder ──────────────────────────────────────────────
const ILLUSTRATION_SRC =
  'https://api.builder.io/api/v1/image/assets/TEMP/fdad55ccb9a659cab73b1691154f72d1cb9ac3ae?width=80';

// ─── Shared section headings ───────────────────────────────────────────────
function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className={styles.sectionHeading}>{children}</h2>;
}

function VariantLabel({ children }: { children: React.ReactNode }) {
  return <span className={styles.variantLabel}>{children}</span>;
}

// ─── Content slot presets ──────────────────────────────────────────────────

/** Content | Scoping: edited */
function ScopingEdited() {
  return (
    <div className={styles.scopingContent}>
      <div className={styles.attributeRow}>
        <Clock width={16} height={16} className={styles.attributeIcon} aria-hidden="true" />
        <span className={styles.attributeText}>26h of 31h (1,742 cases)</span>
      </div>
      <div className={styles.attributeRow}>
        <Box width={16} height={16} className={styles.attributeIcon} aria-hidden="true" />
        <span className={styles.attributeText}>4 of 7 actions</span>
      </div>
    </div>
  );
}

/** Content | Scoping: not edited */
function ScopingNotEdited() {
  return (
    <div className={styles.scopingContent}>
      <div className={styles.attributeRow}>
        <Clock width={16} height={16} className={styles.attributeIcon} aria-hidden="true" />
        <span className={styles.attributeText}>85h (242 cases)</span>
      </div>
      <div className={styles.attributeRow}>
        <Box width={16} height={16} className={styles.attributeIcon} aria-hidden="true" />
        <span className={styles.attributeText}>3 actions</span>
      </div>
    </div>
  );
}

/** Content | Explanation */
function Explanation() {
  return (
    <p className={styles.explanationText}>
      Sidekick will help your team progress daily to complete this goal within cycle window.
    </p>
  );
}

/** Content | Unplanned */
function Unplanned() {
  return (
    <div className={styles.unplannedCard}>
      <div className={styles.unplannedHeader}>
        <span className={styles.unplannedTitle}>Unplanned actions</span>
        <Divider decorative />
      </div>
      <div className={styles.actionItem}>
        <div className={styles.actionMain}>
          <span className={styles.actionTitle}>Action title</span>
          <div className={styles.attributeRow}>
            <Box width={16} height={16} className={styles.attributeIcon} aria-hidden="true" />
            <span className={styles.attributeSmall}>Label</span>
          </div>
        </div>
        <Link variant="default" href="#" onClick={(e) => e.preventDefault()}>
          Label
        </Link>
      </div>
      <Divider decorative />
      <div className={styles.actionItem}>
        <div className={styles.actionMain}>
          <span className={styles.actionTitle}>Action title</span>
          <div className={styles.attributeRow}>
            <Box width={16} height={16} className={styles.attributeIcon} aria-hidden="true" />
            <span className={styles.attributeSmall}>Label</span>
          </div>
        </div>
        <Link variant="default" href="#" onClick={(e) => e.preventDefault()}>
          Label
        </Link>
      </div>
      <Divider decorative />
      <div className={styles.showMoreRow}>
        <Link variant="default" href="#" onClick={(e) => e.preventDefault()}>
          +6 more actions
        </Link>
      </div>
    </div>
  );
}

/** Content | Additional work progress: incomplete */
function AdditionalWorkIncomplete() {
  return (
    <div className={styles.additionalWork}>
      <div className={styles.additionalWorkRows}>
        <div className={styles.workRow}>
          <span className={styles.workValue}>12</span>
          <span className={styles.workLabel}>to do</span>
        </div>
        <div className={styles.workRow}>
          <span className={styles.workValue}>2</span>
          <span className={styles.workLabel}>late</span>
        </div>
      </div>
      <span className={styles.workCaption}>[Timeframe] • Updated [0h 0m] ago</span>
    </div>
  );
}

/** Content | Additional work progress: complete */
function AdditionalWorkComplete() {
  return (
    <div className={styles.additionalWork}>
      <span className={styles.workComplete}>You're all caught up</span>
      <span className={styles.workCaption}>[Timeframe] • Updated [0h 0m] ago</span>
    </div>
  );
}

// ─── Main export ───────────────────────────────────────────────────────────

export function ListGoalExample() {
  return (
    <div className={styles.root}>

      {/* ── Section 1: Type Variants ──────────────────────────────────── */}
      <section className={styles.section}>
        <SectionHeading>Type variants</SectionHeading>

        <div className={styles.variantsGrid}>
          {/* Default */}
          <div className={styles.variantColumn}>
            <VariantLabel>Default</VariantLabel>
            <ListGoal
              type="default"
              goalName="{Goal name}"
              illustrationSrc={ILLUSTRATION_SRC}
              illustrationAlt="Goal illustration"
              showTag
              tagLabel="Tag label"
              tagVariant="tertiary"
              tagColor="warning"
              progressTitle="{% complete} {status label}"
              showProgressBar
              progressValue={50}
              progressLabel="Label"
              progressValueLabel="Value label"
              showInsight
              insightLabel="Data-based intelligence to support action."
              showAlert
              alertMessage="Alert message"
              alertAction="Action button"
              showNavigation
              showDivider={false}
            >
              <div className={styles.contentSlotPlaceholder}>
                Replace with your content component.
              </div>
            </ListGoal>
          </div>

          {/* AI */}
          <div className={styles.variantColumn}>
            <VariantLabel>AI</VariantLabel>
            <ListGoal
              type="ai"
              goalName="{Goal name}"
              illustrationSrc={ILLUSTRATION_SRC}
              illustrationAlt="Goal illustration"
              showTag
              tagLabel="Tag label"
              tagVariant="tertiary"
              tagColor="warning"
              progressTitle="{% complete} {status label}"
              showProgressBar
              progressValue={50}
              progressLabel="Label"
              progressValueLabel="Value label"
              showInsight
              insightLabel="Data-based intelligence to support action."
              showAlert
              alertMessage="Alert message"
              alertAction="Action button"
              showNavigation
              showDivider={false}
            >
              <div className={styles.contentSlotPlaceholder}>
                Replace with your content component.
              </div>
            </ListGoal>
          </div>
        </div>
      </section>

      {/* ── Section 2: Content Slot Presets ───────────────────────────── */}
      <section className={styles.section}>
        <SectionHeading>Content slot presets</SectionHeading>

        <div className={styles.presetsGrid}>
          {/* Scoping: edited */}
          <div className={styles.presetCell}>
            <VariantLabel>Content | Scoping: edited</VariantLabel>
            <ListGoal
              type="default"
              goalName="{Goal name}"
              illustrationSrc={ILLUSTRATION_SRC}
              illustrationAlt="Goal illustration"
              showTag={false}
              progressTitle="{% complete} {status label}"
              showProgressBar={false}
              showInsight={false}
              showAlert={false}
              showNavigation={false}
              showDivider={false}
            >
              <ScopingEdited />
            </ListGoal>
          </div>

          {/* Explanation */}
          <div className={styles.presetCell}>
            <VariantLabel>Content | Explanation</VariantLabel>
            <ListGoal
              type="default"
              goalName="{Goal name}"
              illustrationSrc={ILLUSTRATION_SRC}
              illustrationAlt="Goal illustration"
              showTag={false}
              progressTitle="{% complete} {status label}"
              showProgressBar={false}
              showInsight={false}
              showAlert={false}
              showNavigation={false}
              showDivider={false}
            >
              <Explanation />
            </ListGoal>
          </div>

          {/* Unplanned */}
          <div className={styles.presetCell}>
            <VariantLabel>Content | Unplanned</VariantLabel>
            <ListGoal
              type="default"
              goalName="{Goal name}"
              illustrationSrc={ILLUSTRATION_SRC}
              illustrationAlt="Goal illustration"
              showTag={false}
              progressTitle="{% complete} {status label}"
              showProgressBar={false}
              showInsight={false}
              showAlert={false}
              showNavigation={false}
              showDivider={false}
            >
              <Unplanned />
            </ListGoal>
          </div>

          {/* Scoping: not edited */}
          <div className={styles.presetCell}>
            <VariantLabel>Content | Scoping: not edited</VariantLabel>
            <ListGoal
              type="default"
              goalName="{Goal name}"
              illustrationSrc={ILLUSTRATION_SRC}
              illustrationAlt="Goal illustration"
              showTag={false}
              progressTitle="{% complete} {status label}"
              showProgressBar={false}
              showInsight={false}
              showAlert={false}
              showNavigation={false}
              showDivider={false}
            >
              <ScopingNotEdited />
            </ListGoal>
          </div>

          {/* Additional work: incomplete */}
          <div className={styles.presetCell}>
            <VariantLabel>Content | Additional work progress: incomplete</VariantLabel>
            <ListGoal
              type="default"
              goalName="{Goal name}"
              illustrationSrc={ILLUSTRATION_SRC}
              illustrationAlt="Goal illustration"
              showTag={false}
              progressTitle="{% complete} {status label}"
              showProgressBar={false}
              showInsight={false}
              showAlert={false}
              showNavigation={false}
              showDivider={false}
            >
              <AdditionalWorkIncomplete />
            </ListGoal>
          </div>

          {/* Additional work: complete */}
          <div className={styles.presetCell}>
            <VariantLabel>Content | Additional work progress: complete</VariantLabel>
            <ListGoal
              type="default"
              goalName="{Goal name}"
              illustrationSrc={ILLUSTRATION_SRC}
              illustrationAlt="Goal illustration"
              showTag={false}
              progressTitle="{% complete} {status label}"
              showProgressBar={false}
              showInsight={false}
              showAlert={false}
              showNavigation={false}
              showDivider={false}
            >
              <AdditionalWorkComplete />
            </ListGoal>
          </div>
        </div>
      </section>

    </div>
  );
}
