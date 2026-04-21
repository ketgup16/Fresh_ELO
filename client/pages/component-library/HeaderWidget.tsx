import React, { useState } from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { HeaderWidget } from '@/components/ui/HeaderWidget';
import { RadioGroup, Radio } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/Checkbox';
import styles from '@/components/examples/ExamplePage.module.css';

export default function HeaderWidgetPage() {
  const [navigation, setNavigation] = useState<'None' | 'Chevron' | 'LinkButton'>('None');
  const [type, setType] = useState<'Default' | 'Error'>('Default');
  const [showCount, setShowCount] = useState(true);
  const [showDescription, setShowDescription] = useState(true);
  const [showDivider, setShowDivider] = useState(false);

  return (
    <ComponentPageLayout
      section="AX Components"
      title="Widget Header"
      description="Provides a concise title, optional count, optional description, and optional trailing action for a widget (a self-contained card or section within a screen). Use once per widget, positioned at the top."
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

          <div className={styles.controlsRow}>
            <span className={styles.controlLabel}>Type:</span>
            <RadioGroup
              value={type}
              onValueChange={(v) => setType(v as 'Default' | 'Error')}
              orientation="horizontal"
              className={styles.radioGroupRow}
            >
              <Radio value="Default" label="Default" />
              <Radio value="Error" label="Error" />
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
              checked={showDivider}
              onCheckedChange={(v) => setShowDivider(Boolean(v))}
              label="Divider"
            />
          </div>

          <div className={styles.previewFrame}>
            <HeaderWidget
              title="Widget title"
              count={showCount ? 5 : null}
              description={showDescription ? 'Description text (optional)' : null}
              navigation={navigation}
              trailingLabel="Button label"
              onTrailingAction={() => {}}
              type={type}
              alertMessage="Failed to load content."
              alertActionLabel="Try again"
              onAlertAction={() => {}}
              showDivider={showDivider}
            />
          </div>
        </div>

        {/* ② Variants */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Variants</h2>
          <p className={styles.desc}>
            Widget Header supports three trailing navigation types: None, Chevron, and LinkButton, plus an Error type.
          </p>

          <div className={styles.variantGrid}>
            <VariantCard label="None — no trailing action">
              <HeaderWidget
                title="Widget title"
                count={5}
                description="Description text (optional)"
                navigation="None"
              />
            </VariantCard>

            <VariantCard label="Chevron">
              <HeaderWidget
                title="Widget title"
                count={5}
                description="Description text (optional)"
                navigation="Chevron"
                onTrailingAction={() => {}}
              />
            </VariantCard>

            <VariantCard label="LinkButton">
              <HeaderWidget
                title="Widget title"
                count={5}
                description="Description text (optional)"
                navigation="LinkButton"
                trailingLabel="Button label"
                onTrailingAction={() => {}}
              />
            </VariantCard>

            <VariantCard label="Error type">
              <HeaderWidget
                title="Widget title"
                count={5}
                description="Description text (optional)"
                navigation="Chevron"
                type="Error"
                alertMessage="Failed to load content."
                alertActionLabel="Try again"
                onAlertAction={() => {}}
                onTrailingAction={() => {}}
              />
            </VariantCard>

            <VariantCard label="With divider">
              <HeaderWidget
                title="Widget title"
                count={5}
                description="Description text (optional)"
                navigation="None"
                showDivider
              />
            </VariantCard>

            <VariantCard label="Title only">
              <HeaderWidget
                title="Widget title"
                navigation="Chevron"
                onTrailingAction={() => {}}
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
                  ['Title text', 'Optional. heading/large/default (24px / 700). Truncated at 2 lines.'],
                  ['Item count', 'Optional. Displayed as (N) after the title. Uses body/large/default (18px / 400).'],
                  ['Description text', 'Optional. body/medium/default (16px / 400). Truncated at 3 lines.'],
                  ['Action — None', 'No trailing element rendered.'],
                  ['Action — Chevron', '[LD 3.5] Icon button (round, ghost) with ChevronRight icon in the trailing position of the title row.'],
                  ['Action — LinkButton', '[LD 3.5] Link Button (Size=Small) shown in the trailing position of the title row.'],
                  ['Divider', 'Optional decorative horizontal divider rendered at the bottom (16px top padding).'],
                  ['Alert (Error)', 'Warning Alert rendered below content when type="Error" (8px top padding).'],
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
                  ['title', 'string', '—', 'Widget title text. Truncated after 2 lines.'],
                  ['count', 'number | null', 'null', 'Optional item count shown as (N) after the title.'],
                  ['description', 'string | null', 'null', 'Optional body text below the title row. Truncated after 3 lines.'],
                  ['showDivider', 'boolean', 'false', 'Renders a decorative Divider at the bottom (16px top padding).'],
                  ['navigation', "'None' | 'Chevron' | 'LinkButton'", "'None'", 'Trailing action type rendered in the title row.'],
                  ['trailingLabel', 'string', "'Button label'", "Label for the trailing LinkButton (navigation='LinkButton' only)."],
                  ['onTrailingAction', '() => void', '—', 'Callback fired when the Chevron button or LinkButton is activated.'],
                  ['type', "'Default' | 'Error'", "'Default'", 'Error renders a Warning Alert below the content.'],
                  ['alertMessage', 'string', "'Failed to load content.'", 'Alert body text (type="Error" only).'],
                  ['alertActionLabel', 'string', "'Try again'", 'Alert action button label (type="Error" only).'],
                  ['onAlertAction', '() => void', '—', 'Callback for the alert action button (type="Error" only).'],
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
          <pre className={styles.codeBlock}>{`import { HeaderWidget } from '@/components/ui/HeaderWidget';

// With Chevron navigation and divider
<HeaderWidget
  title="Today's summary"
  count={5}
  description="Outcome metrics for today."
  navigation="Chevron"
  onTrailingAction={() => navigate('/summary')}
  showDivider
/>

// With LinkButton navigation
<HeaderWidget
  title="Track progress"
  count={3}
  navigation="LinkButton"
  trailingLabel="View all"
  onTrailingAction={() => navigate('/progress')}
/>

// Error type
<HeaderWidget
  title="Widget title"
  type="Error"
  alertMessage="Failed to load content."
  alertActionLabel="Try again"
  onAlertAction={handleRetry}
/>

// No trailing action
<HeaderWidget
  title="Widget title"
  description="Description text (optional)"
/>`}</pre>
        </div>

        {/* ⑥ Guidelines */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Guidelines</h2>
          <div className={styles.guidelinesGrid}>
            {[
              { type: 'do', text: 'Use once per widget, positioned at the top, to help users quickly understand the purpose and contents of the widget.' },
              { type: 'do', text: 'Keep titles concise; use descriptions only when needed to provide needed context to the title or when giving instruction.' },
              { type: 'do', text: 'Use the Divider component to visually separate the widget header from its content when a distinct boundary is needed.' },
              { type: 'dont', text: "Don't use more than once within an individual widget. Consider using another header type with a different typographic hierarchy." },
              { type: 'dont', text: "Don't use in positions other than the top of a widget's content area." },
              { type: 'dont', text: 'Avoid redundancy with surrounding content. Use the Widget Header to focus the visual.' },
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
