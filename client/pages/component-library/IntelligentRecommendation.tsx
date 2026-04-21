import React, { useState } from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { IntelligentRecommendation } from '@/components/ui/IntelligentRecommendation';
import { Clock } from '@/components/icons/Clock';
import { User } from '@/components/icons/User';
import { RadioGroup, Radio } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/Checkbox';
import styles from '@/components/examples/ExamplePage.module.css';

const DEMO_ATTRIBUTES = [
  { icon: <Clock width={16} height={16} />, label: '116h total work across all goals' },
  { icon: <User width={16} height={16} />, label: '112h associate labor available' },
];

const DEMO_SOURCE_LINKS = [
  { label: 'Store sales data', onClick: () => {} },
  { label: 'Inventory report', onClick: () => {} },
];

export default function IntelligentRecommendationPage() {
  const [showDescription, setShowDescription] = useState(true);
  const [showLightEyebrow, setShowLightEyebrow] = useState(false);
  const [buttonType, setButtonType] = useState<'none' | 'single' | 'dual' | 'triple'>('single');
  const [showSources, setShowSources] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  return (
    <ComponentPageLayout
      section="AX Components"
      title="Intelligent Recommendation"
      description="AI recommendation card with eyebrow, title, optional attributes, content slot, alert, 0–3 buttons, and a collapsible sources section."
    >
      <div className={styles.pageGap}>

        {/* ① Interactive Demo */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Interactive Demo</h2>
          <p className={styles.desc}>
            Use the toggles below to explore the component's optional sections and button arrangements.
          </p>

          <div className={styles.checkboxRow}>
            <Checkbox checked={showDescription} onCheckedChange={(v) => setShowDescription(Boolean(v))} label="Description" />
            <Checkbox checked={showLightEyebrow} onCheckedChange={(v) => setShowLightEyebrow(Boolean(v))} label="Light eyebrow" />
            <Checkbox checked={showSources} onCheckedChange={(v) => setShowSources(Boolean(v))} label="Sources" />
            <Checkbox checked={showAlert} onCheckedChange={(v) => setShowAlert(Boolean(v))} label="Alert" />
          </div>

          <div className={styles.controlsRow}>
            <span className={styles.controlLabel}>Button type:</span>
            <RadioGroup
              value={buttonType}
              onValueChange={(v) => setButtonType(v as typeof buttonType)}
              orientation="horizontal"
              className={styles.radioGroupRow}
            >
              <Radio value="none" label="None" />
              <Radio value="single" label="Single" />
              <Radio value="dual" label="Dual" />
              <Radio value="triple" label="Triple" />
            </RadioGroup>
          </div>

          <div className={styles.previewFrame}>
            <IntelligentRecommendation
              title="Generate tonight's plan"
              showLightEyebrow={showLightEyebrow}
              lightEyebrowText="Stocking Night"
              showDescription={showDescription}
              description="Sidekick will help you plan stocking work and adjust for your store's unique needs."
              attributes={DEMO_ATTRIBUTES}
              buttonType={buttonType}
              primaryLabel="Plan your team's shift"
              onPrimary={() => {}}
              secondaryLabel="Dismiss"
              onSecondary={() => {}}
              tertiaryLabel="View details"
              onTertiary={() => {}}
              showAlert={showAlert}
              alertMessage="Unable to generate plan. Store data is unavailable."
              alertActionLabel="Retry"
              onAlertAction={() => {}}
              showSources={showSources}
              sourceDescription="This recommendation is based on your store's sales data, inventory, and process guides from yesterday."
              sourceLinks={DEMO_SOURCE_LINKS}
            />
          </div>
        </div>

        {/* ② Button Variants */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Button Variants</h2>
          <p className={styles.desc}>
            The <code>buttonType</code> prop controls the button arrangement. Choose the fewest buttons needed to complete the recommended action.
          </p>

          <div className={styles.variantGrid}>
            <VariantCard label="0 buttons — none">
              <IntelligentRecommendation
                title="Generate tonight's plan"
                showDescription
                description="Sidekick will help you plan stocking work."
                buttonType="none"
              />
            </VariantCard>

            <VariantCard label="1 button — single (Primary)">
              <IntelligentRecommendation
                title="Generate tonight's plan"
                showDescription
                description="Sidekick will help you plan stocking work."
                buttonType="single"
                primaryLabel="Plan your team's shift"
                onPrimary={() => {}}
              />
            </VariantCard>

            <VariantCard label="2 buttons — dual (Alternate + Primary)">
              <IntelligentRecommendation
                title="Generate tonight's plan"
                showDescription
                description="Sidekick will help you plan stocking work."
                buttonType="dual"
                primaryLabel="Plan shift"
                onPrimary={() => {}}
                secondaryLabel="Dismiss"
                onSecondary={() => {}}
              />
            </VariantCard>

            <VariantCard label="3 buttons — triple (Alternate + Primary + Tertiary)">
              <IntelligentRecommendation
                title="Generate tonight's plan"
                showDescription
                description="Sidekick will help you plan stocking work."
                buttonType="triple"
                primaryLabel="Plan shift"
                onPrimary={() => {}}
                secondaryLabel="Dismiss"
                onSecondary={() => {}}
                tertiaryLabel="View details"
                onTertiary={() => {}}
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
                  ['Container', 'Brand surface fill (ld-semantic-color-surface-brand), 8px border radius'],
                  ['Eyebrow', 'MagicFill icon + bold label — always visible'],
                  ['Light eyebrow', 'Optional secondary label, 1-line truncated (showLightEyebrow)'],
                  ['Title', 'Bold, 2-line truncated (required)'],
                  ['Description', 'Optional body text below the title (showDescription)'],
                  ['Attributes', 'Up to 4 rows — icon + label each (attributes prop)'],
                  ['Content slot', 'Customisable content slot in white surface panel (children)'],
                  ['Alert', 'Conditional error alert below the content slot (showAlert)'],
                  ['Button(s)', '0–3 buttons determined by buttonType'],
                  ['Sources', 'Collapsible: Divider + Show/Hide link + description + source links (showSources)'],
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
                  ['title', 'string', 'required', 'Recommendation heading — truncated after 2 lines.'],
                  ['eyebrow', 'string', '"Recommendation"', 'Bold eyebrow label next to the MagicFill icon.'],
                  ['showLightEyebrow', 'boolean', 'false', 'Show the secondary light-weight eyebrow label.'],
                  ['lightEyebrowText', 'string', '—', 'Text for the light eyebrow (requires showLightEyebrow).'],
                  ['showDescription', 'boolean', 'false', 'Show body description text below the title.'],
                  ['description', 'string', '—', 'Body text (requires showDescription).'],
                  ['attributes', 'IntelligentRecommendationAttribute[]', '—', 'Up to 4 icon + label rows.'],
                  ['children', 'ReactNode', '—', 'Content slot rendered inside a white surface panel.'],
                  ['showAlert', 'boolean', 'false', 'Show the error alert below the content slot.'],
                  ['alertMessage', 'string', '—', 'Alert body text.'],
                  ['alertActionLabel', 'string', '—', 'Label for the alert action link.'],
                  ['onAlertAction', '() => void', '—', 'Callback for the alert action link.'],
                  ['buttonType', "'none'|'single'|'dual'|'triple'", "'none'", 'Button arrangement (0–3 buttons).'],
                  ['primaryLabel', 'string', '"Primary"', 'Label for the primary button.'],
                  ['onPrimary', '() => void', '—', 'Callback for the primary button.'],
                  ['secondaryLabel', 'string', '"Alternate"', 'Label for the secondary/Alternate button (dual/triple).'],
                  ['onSecondary', '() => void', '—', 'Callback for the secondary button.'],
                  ['tertiaryLabel', 'string', '"Tertiary"', 'Label for the third button (triple only).'],
                  ['onTertiary', '() => void', '—', 'Callback for the tertiary button.'],
                  ['showSources', 'boolean', 'false', 'Show the collapsible sources section.'],
                  ['sourceDescription', 'string', '—', 'Explanation text shown when sources are expanded.'],
                  ['sourceLinks', 'IntelligentRecommendationSourceLink[]', '—', 'Source link buttons shown after the description.'],
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
          <pre className={styles.codeBlock}>{`import { IntelligentRecommendation } from '@/components/ui/IntelligentRecommendation';
import { Clock } from '@/components/icons/Clock';
import { User } from '@/components/icons/User';

<IntelligentRecommendation
  title="Generate tonight's plan"
  showDescription
  description="Sidekick will help you plan stocking work and adjust for your store's unique needs."
  attributes={[
    { icon: <Clock />, label: '116h total work across all goals' },
    { icon: <User />, label: '112h associate labor available' },
  ]}
  buttonType="single"
  primaryLabel="Plan your team's shift"
  onPrimary={() => {}}
  showSources
  sourceDescription="This recommendation is based on your store's sales data, inventory, and process guides from yesterday."
/>`}</pre>
        </div>

        {/* ⑥ Guidelines */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Guidelines</h2>
          <div className={styles.guidelinesGrid}>
            {[
              { type: 'do', text: 'Use to surface AI-driven recommendations at the top of a workflow — the card draws attention and provides context before action buttons.' },
              { type: 'do', text: 'Keep the title concise (2 lines max) and use the description for supporting detail.' },
              { type: 'do', text: 'Show sources when the recommendation is derived from store data, so associates can verify the basis.' },
              { type: 'dont', text: "Don't use more than one IntelligentRecommendation card in the same visible area — it dilutes the AI signal." },
              { type: 'dont', text: "Don't place the card inside a narrow container that restricts its width — it should fill its parent container." },
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
      {children}
    </div>
  );
}
