import React, { useState } from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { ListGoal } from '@/components/ui/ListGoal';
import { Checkbox } from '@/components/ui/Checkbox';
import {
  ScopingEdited,
  ScopingNotEdited,
  Explanation,
  Unplanned,
  AdditionalWorkIncomplete,
  AdditionalWorkComplete,
} from '@/components/examples/ListGoalExample';
import { useTranslation } from 'react-i18next';
import styles from './ListGoal.module.css';

const ILLUSTRATION_SRC =
  'https://api.builder.io/api/v1/image/assets/TEMP/fdad55ccb9a659cab73b1691154f72d1cb9ac3ae?width=80';

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className={styles.sectionTitle}>{children}</h2>;
}

function SectionDesc({ children }: { children: React.ReactNode }) {
  return <p className={styles.sectionDesc}>{children}</p>;
}

export default function ListGoalPage() {
  const { t } = useTranslation();

  // Interactive demo state
  const [demoType, setDemoType] = useState<'default' | 'ai'>('default');
  const [showTag, setShowTag] = useState(true);
  const [showProgressBar, setShowProgressBar] = useState(true);
  const [showInsight, setShowInsight] = useState(true);
  const [showAlert, setShowAlert] = useState(true);
  const [showNavigation, setShowNavigation] = useState(true);
  const [showDivider, setShowDivider] = useState(false);

  return (
    <ComponentPageLayout
      section={t('componentLibrary.listCategory')}
      title={t('componentLibrary.navListGoal')}
      description={t('componentLibrary.descListGoal')}
    >
      <div className={styles.page}>

        {/* ── Interactive Demo ─────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Interactive Demo</SectionTitle>
          <SectionDesc>
            Toggle props below to preview how the List Goal component adapts to different
            configurations. The Default variant displays standard goal items; the AI variant adds
            a Sidekick icon to signal AI-created goals.
          </SectionDesc>
          <div className={styles.demoGrid}>
            {/* Controls panel */}
            <div className={styles.controlsPanel}>
              <div className={styles.controlsTitle}>Props</div>

              <div className={styles.controlGroup}>
                <div className={styles.controlGroupLabel}>type</div>
                <div className={styles.typeToggle}>
                  <button
                    className={`${styles.typeButton} ${demoType === 'default' ? styles.typeButtonActive : ''}`}
                    onClick={() => setDemoType('default')}
                    aria-pressed={demoType === 'default'}
                  >
                    Default
                  </button>
                  <button
                    className={`${styles.typeButton} ${demoType === 'ai' ? styles.typeButtonActive : ''}`}
                    onClick={() => setDemoType('ai')}
                    aria-pressed={demoType === 'ai'}
                  >
                    AI
                  </button>
                </div>
              </div>

              <div className={styles.controlRow}>
                <Checkbox
                  checked={showTag}
                  onCheckedChange={(v) => setShowTag(v === true)}
                  label="showTag"
                />
              </div>
              <div className={styles.controlRow}>
                <Checkbox
                  checked={showProgressBar}
                  onCheckedChange={(v) => setShowProgressBar(v === true)}
                  label="showProgressBar"
                />
              </div>
              <div className={styles.controlRow}>
                <Checkbox
                  checked={showInsight}
                  onCheckedChange={(v) => setShowInsight(v === true)}
                  label="showInsight"
                />
              </div>
              <div className={styles.controlRow}>
                <Checkbox
                  checked={showAlert}
                  onCheckedChange={(v) => setShowAlert(v === true)}
                  label="showAlert"
                />
              </div>
              <div className={styles.controlRow}>
                <Checkbox
                  checked={showNavigation}
                  onCheckedChange={(v) => setShowNavigation(v === true)}
                  label="showNavigation"
                />
              </div>
              <div className={styles.controlRow}>
                <Checkbox
                  checked={showDivider}
                  onCheckedChange={(v) => setShowDivider(v === true)}
                  label="showDivider"
                />
              </div>
            </div>

            {/* Preview panel */}
            <div className={styles.previewPanel}>
              <ListGoal
                type={demoType}
                goalName="Goal name"
                illustrationSrc={ILLUSTRATION_SRC}
                illustrationAlt="Goal illustration"
                showTag={showTag}
                tagLabel="Tag label"
                tagVariant="tertiary"
                tagColor="warning"
                progressTitle="50% complete · On track"
                showProgressBar={showProgressBar}
                progressValue={50}
                progressLabel="Label"
                progressValueLabel="Value label"
                showInsight={showInsight}
                insightLabel="Data-based intelligence to support action."
                showAlert={showAlert}
                alertMessage="Alert message"
                alertAction="Action button"
                showNavigation={showNavigation}
                showDivider={showDivider}
              >
                <div className={styles.contentSlotPlaceholder}>
                  Replace with your content component.
                </div>
              </ListGoal>
            </div>
          </div>
        </div>

        {/* ── Type Variants ────────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Type variants</SectionTitle>
          <SectionDesc>
            The <code>type</code> prop controls whether the goal is treated as a standard
            goal (<code>default</code>) or an AI-created Sidekick goal (<code>ai</code>). In the
            AI variant, the goal name is prefixed with the Sidekick logo icon.
          </SectionDesc>

          <div className={styles.variantsGrid}>
            {/* Default */}
            <div className={styles.variantColumn}>
              <div className={styles.variantLabel}>Default</div>
              <div className={styles.variantCard}>
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
            </div>

            {/* AI */}
            <div className={styles.variantColumn}>
              <div className={styles.variantLabel}>AI</div>
              <div className={styles.variantCard}>
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
          </div>
        </div>

        {/* ── Content Slot Presets ─────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Content slot presets</SectionTitle>
          <SectionDesc>
            The <code>children</code> prop is a flexible content slot. These preset components
            cover the most common patterns: scoping metrics, explanatory text, unplanned actions,
            and additional work progress states.
          </SectionDesc>

          <div className={styles.presetsGrid}>
            {/* Scoping: edited */}
            <div className={styles.presetCell}>
              <div className={styles.presetLabel}>Content | Scoping: edited</div>
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
              <div className={styles.presetLabel}>Content | Explanation</div>
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
              <div className={styles.presetLabel}>Content | Unplanned</div>
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
              <div className={styles.presetLabel}>Content | Scoping: not edited</div>
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
              <div className={styles.presetLabel}>Content | Additional work progress: incomplete</div>
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
              <div className={styles.presetLabel}>Content | Additional work progress: complete</div>
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
        </div>

        {/* ── Component Props ───────────────────────────────────── */}
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
              <tr><td>type</td><td>'default' | 'ai'</td><td>'default'</td><td>Variant — standard goal or AI-created Sidekick goal.</td></tr>
              <tr><td>goalName</td><td>string</td><td>—</td><td>Required. Goal name text displayed in the header row.</td></tr>
              <tr><td>illustrationSrc</td><td>string</td><td>—</td><td>URL for the goal illustration image. Falls back to a placeholder div.</td></tr>
              <tr><td>illustrationAlt</td><td>string</td><td>''</td><td>Alt text for the illustration image.</td></tr>
              <tr><td>showTag</td><td>boolean</td><td>true</td><td>Show or hide the status Tag badge.</td></tr>
              <tr><td>tagLabel</td><td>string</td><td>'Tag label'</td><td>Text content of the Tag badge.</td></tr>
              <tr><td>tagVariant</td><td>TagVariant</td><td>'tertiary'</td><td>Visual variant of the Tag (e.g. tertiary, primary).</td></tr>
              <tr><td>tagColor</td><td>TagColor</td><td>'warning'</td><td>Color of the Tag (e.g. warning, positive, negative).</td></tr>
              <tr><td>progressTitle</td><td>string</td><td>—</td><td>Text label shown above the progress bar (e.g. "50% complete · On track").</td></tr>
              <tr><td>showProgressBar</td><td>boolean</td><td>true</td><td>Show or hide the ProgressIndicator bar.</td></tr>
              <tr><td>progressValue</td><td>number</td><td>50</td><td>Progress value from 0 to 100.</td></tr>
              <tr><td>progressLabel</td><td>string</td><td>'Label'</td><td>Left label rendered beneath the progress bar.</td></tr>
              <tr><td>progressValueLabel</td><td>string</td><td>'Value label'</td><td>Right caption rendered beneath the progress bar.</td></tr>
              <tr><td>children</td><td>ReactNode</td><td>—</td><td>Content slot for preset subcomponents (scoping, explanation, unplanned, etc.).</td></tr>
              <tr><td>showInsight</td><td>boolean</td><td>true</td><td>Show or hide the IntelligentInsight block.</td></tr>
              <tr><td>insightLabel</td><td>string</td><td>'Data-based intelligence to support action.'</td><td>Insight text shown in the IntelligentInsight block.</td></tr>
              <tr><td>showAlert</td><td>boolean</td><td>true</td><td>Show or hide the Alert banner.</td></tr>
              <tr><td>alertMessage</td><td>string</td><td>'Alert message'</td><td>Alert body text.</td></tr>
              <tr><td>alertAction</td><td>string</td><td>'Action button'</td><td>Alert action link label.</td></tr>
              <tr><td>onAlertAction</td><td>() =&gt; void</td><td>—</td><td>Called when the alert action link is pressed.</td></tr>
              <tr><td>showNavigation</td><td>boolean</td><td>true</td><td>Show or hide the ChevronRight navigation button.</td></tr>
              <tr><td>onNavigate</td><td>() =&gt; void</td><td>—</td><td>Called when the chevron navigation button is pressed.</td></tr>
              <tr><td>showDivider</td><td>boolean</td><td>true</td><td>Show or hide the bottom Divider separator.</td></tr>
              <tr><td>UNSAFE_className</td><td>string</td><td>—</td><td>Escape hatch — extra CSS class on the root article element.</td></tr>
              <tr><td>UNSAFE_style</td><td>CSSProperties</td><td>—</td><td>Escape hatch — inline style on the root article element.</td></tr>
            </tbody>
          </table>
        </div>

        {/* ── Usage ─────────────────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Usage</SectionTitle>
          <pre className={styles.codeBlock}>{`import { ListGoal } from '@/components/ui/ListGoal';

// Default variant with progress and insight
<ListGoal
  goalName="Increase customer satisfaction"
  illustrationSrc="/illustrations/goal.png"
  progressTitle="50% complete · On track"
  progressValue={50}
  showInsight
  insightLabel="Data-based intelligence to support action."
  showAlert
  alertMessage="2 actions are overdue"
  alertAction="View actions"
  onAlertAction={() => navigate('/actions')}
  showNavigation
  onNavigate={() => navigate('/goal/123')}
/>

// AI variant
<ListGoal
  type="ai"
  goalName="AI-suggested goal"
  progressTitle="25% complete · Behind"
  progressValue={25}
  showInsight
  insightLabel="Sidekick recommends focusing on item resolution rate."
/>

// With content slot preset
import { ScopingEdited } from '@/components/examples/ListGoalExample';

<ListGoal
  goalName="Reduce handling time"
  showTag={false}
  showProgressBar={false}
  showInsight={false}
  showAlert={false}
>
  <ScopingEdited />
</ListGoal>`}</pre>
        </div>

        {/* ── Guidelines ───────────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Guidelines</SectionTitle>
          <div className={styles.guidelineGrid}>
            <div className={styles.guidelineCard}>
              <div className={styles.doLabel}>Do</div>
              <p className={styles.guidelineText}>
                Use the AI variant (<code>type="ai"</code>) exclusively for goals created or
                recommended by Sidekick. The Sidekick logo provides a clear visual signal.
              </p>
            </div>
            <div className={styles.guidelineCard}>
              <div className={styles.dontLabel}>Don't</div>
              <p className={styles.guidelineText}>
                Don't use the AI variant for manually-created goals. The logo implies AI
                authorship and will mislead users if misused.
              </p>
            </div>
            <div className={styles.guidelineCard}>
              <div className={styles.doLabel}>Do</div>
              <p className={styles.guidelineText}>
                Use the content slot presets — <code>ScopingEdited</code>,{' '}
                <code>Explanation</code>, <code>Unplanned</code>, etc. — to ensure consistent
                formatting across goal list items.
              </p>
            </div>
            <div className={styles.guidelineCard}>
              <div className={styles.dontLabel}>Don't</div>
              <p className={styles.guidelineText}>
                Don't place arbitrary free-form content in the children slot. Stick to the
                defined preset components to maintain visual coherence.
              </p>
            </div>
          </div>
        </div>

      </div>
    </ComponentPageLayout>
  );
}
