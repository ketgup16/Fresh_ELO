import React, { useState } from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { HeaderInstructional } from '@/components/ui/HeaderInstructional';
import { RadioGroup, Radio } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/Checkbox';
import styles from '@/components/examples/ExamplePage.module.css';

export default function HeaderInstructionalPage() {
  const [navigation, setNavigation] = useState<'None' | 'Chevron' | 'LinkButton'>('None');
  const [showCount, setShowCount] = useState(true);
  const [showDescription, setShowDescription] = useState(true);
  const [bottomPadding, setBottomPadding] = useState(false);

  return (
    <ComponentPageLayout
      section="AX Components"
      title="Instructional Header"
      description="Provides overall context for a screen and specific directions when needed. Positioned at the top of a screen's content area. Supports None, Chevron, and LinkButton trailing navigation types."
    >
      <div className={styles.pageGap}>

        {/* ① Interactive Demo */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Interactive Demo</h2>
          <p className={styles.desc}>
            Use the controls below to explore the component's props and variants.
          </p>

          <div className={styles.controlsRow}>
            <span className={styles.controlLabel}>Navigation:</span>
            <RadioGroup
              value={navigation}
              onValueChange={(v) => setNavigation(v as 'None' | 'Chevron' | 'LinkButton')}
              orientation="horizontal"
              className={styles.radioGroupRow}
            >
              <Radio value="None" label="None" />
              <Radio value="Chevron" label="Chevron" />
              <Radio value="LinkButton" label="LinkButton" />
            </RadioGroup>
          </div>

          <div className={styles.checkboxRow}>
            <Checkbox
              checked={showCount}
              onCheckedChange={(v) => setShowCount(Boolean(v))}
              label="Count"
            />
            <Checkbox
              checked={showDescription}
              onCheckedChange={(v) => setShowDescription(Boolean(v))}
              label="Description"
            />
            <Checkbox
              checked={bottomPadding}
              onCheckedChange={(v) => setBottomPadding(Boolean(v))}
              label="Bottom padding"
            />
          </div>

          <div className={styles.previewFrame}>
            <HeaderInstructional
              title="Review and start an action"
              count={showCount ? 5 : null}
              description={showDescription ? 'Your personalized actions are shown below in order of impact, choose one to get started.' : null}
              navigation={navigation}
              trailingLabel="Button label"
              onTrailingAction={() => {}}
              bottomPadding={bottomPadding}
            />
          </div>
        </div>

        {/* ② Variants */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Variants</h2>
          <p className={styles.desc}>
            Instructional Header supports three trailing navigation types: None, Chevron, and LinkButton.
          </p>

          <div className={styles.variantGrid}>
            <VariantCard label="None — no trailing action">
              <HeaderInstructional
                title="Title/instruction"
                count={5}
                description="Description text"
                navigation="None"
              />
            </VariantCard>

            <VariantCard label="Chevron">
              <HeaderInstructional
                title="Title/instruction"
                count={5}
                description="Description text"
                navigation="Chevron"
                onTrailingAction={() => {}}
              />
            </VariantCard>

            <VariantCard label="LinkButton">
              <HeaderInstructional
                title="Title/instruction"
                count={5}
                description="Description text"
                navigation="LinkButton"
                trailingLabel="Button label"
                onTrailingAction={() => {}}
              />
            </VariantCard>

            <VariantCard label="No count, no description">
              <HeaderInstructional
                title="Title/instruction"
                navigation="Chevron"
                onTrailingAction={() => {}}
              />
            </VariantCard>

            <VariantCard label="With bottom padding">
              <HeaderInstructional
                title="Title/instruction"
                count={5}
                description="Description text"
                navigation="None"
                bottomPadding
              />
            </VariantCard>
          </div>
        </div>

        {/* ③ Anatomy */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Anatomy</h2>
          <div className={styles.tableWrapper}>
            <table className={styles.docsTable}>
              <thead>
                <tr>
                  <th>Element</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Title text', 'Required. heading/large/default (24px / 700). Truncated at 2 lines.'],
                  ['Item count', 'Optional. Displayed as (N) after the title. Uses heading/small/alt (18px / 400).'],
                  ['Description text', 'Optional. body/medium/default (16px / 400). Truncated at 3 lines.'],
                  ['Action — None', 'No trailing element rendered.'],
                  ['Action — Chevron', '[LD 3.5] Icon button with ChevronRight icon in the trailing position of the title row.'],
                  ['Action — LinkButton', '[LD 3.5] Link Button (Size=Small) shown in the trailing position of the title row.'],
                ].map(([el, desc]) => (
                  <tr key={el}>
                    <td>{el}</td>
                    <td>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ④ Component Props */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Component Props</h2>
          <div className={styles.tableWrapper}>
            <table className={styles.docsTable}>
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
                  ['title', 'string', 'required', 'Screen heading text — truncated after 2 lines.'],
                  ['count', 'number | null', 'null', 'Optional item count shown as (N) after the title.'],
                  ['description', 'string | null', 'null', 'Optional body text below the title — truncated after 3 lines.'],
                  ['bottomPadding', 'boolean', 'false', 'Adds 16px bottom padding below the content.'],
                  ['navigation', "'None' | 'Chevron' | 'LinkButton'", "'None'", 'Trailing action type rendered in the title row.'],
                  ['trailingLabel', 'string', "'Button label'", "Label for the trailing LinkButton (navigation='LinkButton' only)."],
                  ['onTrailingAction', '() => void', '—', 'Callback fired when the Chevron button or LinkButton is activated.'],
                  ['UNSAFE_className', 'string', '—', 'Escape hatch for adding a custom class to the root element.'],
                  ['UNSAFE_style', 'React.CSSProperties', '—', 'Escape hatch for adding inline styles to the root element.'],
                ].map(([prop, type, def, desc]) => (
                  <tr key={prop}>
                    <td className={styles.propCell}>{prop}</td>
                    <td className={styles.codeCell}>{type}</td>
                    <td className={styles.codeCell}>{def}</td>
                    <td>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ⑤ Usage */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Usage</h2>
          <pre className={styles.codeBlock}>{`import { HeaderInstructional } from '@/components/ui/HeaderInstructional';

// With Chevron navigation
<HeaderInstructional
  title="Review and start an action"
  count={5}
  description="Your personalized actions are shown below in order of impact."
  navigation="Chevron"
  onTrailingAction={() => navigate(-1)}
  bottomPadding
/>

// With LinkButton navigation
<HeaderInstructional
  title="Your actions"
  count={3}
  navigation="LinkButton"
  trailingLabel="See all"
  onTrailingAction={() => navigate('/actions')}
/>

// No trailing action
<HeaderInstructional
  title="Goal Details"
  description="Review the description of your team and see how you are tracking."
/>`}</pre>
        </div>

        {/* ⑥ Guidelines */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Guidelines</h2>
          <div className={styles.guidelinesGrid}>
            {[
              { type: 'do', text: 'Use once per screen, positioned at the top, to help users quickly understand the purpose and contents of the screen and how to take action.' },
              { type: 'do', text: 'Keep titles concise; use descriptions only when needed to provide needed context to the title or when giving instruction.' },
              { type: 'do', text: 'Use the optional description to give extra instruction if needed. Keep titles brief and action-oriented.' },
              { type: 'dont', text: "Don't use more than once within an individual screen. Don't split content into separate individual elements." },
              { type: 'dont', text: "Don't use in positions other than the top of the screen content area." },
              { type: 'dont', text: 'Avoid redundancy with surrounding content. Optional description should not repeat what is already said.' },
            ].map(({ type, text }, i) => (
              <div key={i} className={`${styles.guidelineCard} ${type === 'do' ? styles.doCard : styles.dontCard}`}>
                <div className={type === 'do' ? styles.doLabel : styles.dontLabel}>
                  {type === 'do' ? 'Do' : "Don't"}
                </div>
                <p className={styles.desc}>{text}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </ComponentPageLayout>
  );
}

function VariantCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className={styles.variantCard}>
      <div className={styles.variantCardLabel}>{label}</div>
      <div>{children}</div>
    </div>
  );
}
