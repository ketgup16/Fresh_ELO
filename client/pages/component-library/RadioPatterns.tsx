import React, { useState } from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { RadioGroup, Radio } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/Checkbox';
import { AXRadio } from '@/components/walmart/AXRadio';
import exStyles from '@/components/examples/ExamplePage.module.css';
import styles from './RadioPatterns.module.css';

export default function RadioPatternsPage() {
  const [size, setSize] = useState<'large' | 'small'>('small');
  const [showEyebrow, setShowEyebrow] = useState(true);
  const [showCaption, setShowCaption] = useState(true);
  const [showDivider, setShowDivider] = useState(true);
  const [demoValue, setDemoValue] = useState('option1');

  return (
    <ComponentPageLayout
      section="AX Components"
      title="Radio Patterns"
      description="AX Radio extends the LD Radio control with an enriched label pattern: optional eyebrow text above, a main label in two sizes, and optional caption text below. Use inside a RadioGroup for full keyboard navigation and group state."
    >
      <div className={exStyles.pageGap}>

        {/* ① Interactive Demo */}
        <div className={exStyles.section}>
          <h2 className={exStyles.sectionTitle}>Interactive Demo</h2>
          <p className={exStyles.desc}>
            Use the controls below to explore the component's props and variants.
          </p>

          <div className={exStyles.controlsRow}>
            <span className={exStyles.controlLabel}>Size:</span>
            <RadioGroup
              value={size}
              onValueChange={(v) => setSize(v as 'large' | 'small')}
              orientation="horizontal"
              className={exStyles.radioGroupRow}
            >
              <Radio value="large" label="Large" />
              <Radio value="small" label="Small" />
            </RadioGroup>
          </div>

          <div className={exStyles.checkboxRow}>
            <Checkbox
              checked={showEyebrow}
              onCheckedChange={(v) => setShowEyebrow(Boolean(v))}
              label="Eyebrow"
            />
            <Checkbox
              checked={showCaption}
              onCheckedChange={(v) => setShowCaption(Boolean(v))}
              label="Caption"
            />
            <Checkbox
              checked={showDivider}
              onCheckedChange={(v) => setShowDivider(Boolean(v))}
              label="Divider"
            />
          </div>

          <div className={styles.previewFrame}>
            <RadioGroup
              value={demoValue}
              onValueChange={setDemoValue}
              orientation="vertical"
            >
              <AXRadio
                value="option1"
                label="Morning shift"
                size={size}
                eyebrow={showEyebrow ? 'Schedule' : undefined}
                caption={showCaption ? 'Today, 7:30am – 4:00pm' : undefined}
                showDivider={showDivider}
              />
              <AXRadio
                value="option2"
                label="Afternoon shift"
                size={size}
                eyebrow={showEyebrow ? 'Schedule' : undefined}
                caption={showCaption ? 'Today, 12:00pm – 8:00pm' : undefined}
                showDivider={showDivider}
              />
              <AXRadio
                value="option3"
                label="Evening shift"
                size={size}
                eyebrow={showEyebrow ? 'Schedule' : undefined}
                caption={showCaption ? 'Today, 4:00pm – 12:00am' : undefined}
                showDivider={showDivider}
              />
            </RadioGroup>
          </div>
        </div>

        {/* ② Sizes */}
        <div className={exStyles.section}>
          <h2 className={exStyles.sectionTitle}>Sizes</h2>
          <p className={exStyles.desc}>
            Two sizes are available. Large uses body-large (18px) for the label; Small uses body-small (14px).
          </p>

          <div className={exStyles.variantGrid}>
            <div className={exStyles.variantCard}>
              <span className={exStyles.variantCardLabel}>Large</span>
              <div className={styles.sizeFrame}>
                <RadioGroup value="a" onValueChange={() => {}} orientation="vertical">
                  <AXRadio
                    value="a"
                    label="Label"
                    size="large"
                    eyebrow="Eyebrow"
                    caption="Caption"
                    showDivider
                  />
                  <AXRadio
                    value="b"
                    label="Label"
                    size="large"
                    eyebrow="Eyebrow"
                    caption="Caption"
                    showDivider={false}
                  />
                </RadioGroup>
              </div>
            </div>

            <div className={exStyles.variantCard}>
              <span className={exStyles.variantCardLabel}>Small</span>
              <div className={styles.sizeFrame}>
                <RadioGroup value="a" onValueChange={() => {}} orientation="vertical">
                  <AXRadio
                    value="a"
                    label="Label"
                    size="small"
                    eyebrow="Eyebrow"
                    caption="Caption"
                    showDivider
                  />
                  <AXRadio
                    value="b"
                    label="Label"
                    size="small"
                    eyebrow="Eyebrow"
                    caption="Caption"
                    showDivider={false}
                  />
                </RadioGroup>
              </div>
            </div>
          </div>
        </div>

        {/* ③ States */}
        <div className={exStyles.section}>
          <h2 className={exStyles.sectionTitle}>States</h2>
          <p className={exStyles.desc}>
            Unselected, selected, disabled unselected, and disabled selected.
          </p>

          <div className={styles.statesGrid}>
            {/* Unselected */}
            <div className={exStyles.variantCard}>
              <span className={exStyles.variantCardLabel}>Unselected</span>
              <div className={styles.stateFrame}>
                <RadioGroup value="" onValueChange={() => {}} orientation="vertical">
                  <AXRadio
                    value="x"
                    label="Label"
                    eyebrow="Eyebrow"
                    caption="Caption"
                    size="small"
                    showDivider={false}
                  />
                </RadioGroup>
              </div>
            </div>

            {/* Selected */}
            <div className={exStyles.variantCard}>
              <span className={exStyles.variantCardLabel}>Selected</span>
              <div className={styles.stateFrame}>
                <RadioGroup value="x" onValueChange={() => {}} orientation="vertical">
                  <AXRadio
                    value="x"
                    label="Label"
                    eyebrow="Eyebrow"
                    caption="Caption"
                    size="small"
                    showDivider={false}
                  />
                </RadioGroup>
              </div>
            </div>

            {/* Disabled unselected */}
            <div className={exStyles.variantCard}>
              <span className={exStyles.variantCardLabel}>Disabled unselected</span>
              <div className={styles.stateFrame}>
                <RadioGroup value="" onValueChange={() => {}} orientation="vertical">
                  <AXRadio
                    value="x"
                    label="Label"
                    eyebrow="Eyebrow"
                    caption="Caption"
                    size="small"
                    disabled
                    showDivider={false}
                  />
                </RadioGroup>
              </div>
            </div>

            {/* Disabled selected */}
            <div className={exStyles.variantCard}>
              <span className={exStyles.variantCardLabel}>Disabled selected</span>
              <div className={styles.stateFrame}>
                <RadioGroup value="x" onValueChange={() => {}} disabled orientation="vertical">
                  <AXRadio
                    value="x"
                    label="Label"
                    eyebrow="Eyebrow"
                    caption="Caption"
                    size="small"
                    showDivider={false}
                  />
                </RadioGroup>
              </div>
            </div>
          </div>
        </div>

        {/* ④ Label anatomy */}
        <div className={exStyles.section}>
          <h2 className={exStyles.sectionTitle}>Label Anatomy</h2>
          <p className={exStyles.desc}>
            All three text layers — eyebrow, label, and caption — are optional. Use eyebrow to
            add categorisation context above the label and caption for supplemental detail below.
          </p>

          <div className={styles.anatomyFrame}>
            <RadioGroup value="a" onValueChange={() => {}} orientation="vertical">
              <AXRadio
                value="a"
                label="Label"
                size="large"
                eyebrow="Eyebrow"
                caption="Caption"
                showDivider={false}
              />
            </RadioGroup>

            <div className={styles.anatomyLegend}>
              <span className={styles.legendEyebrow}>Eyebrow — caption size, optional</span>
              <span className={styles.legendLabel}>Label — body-large (large) or body-small (small), bold when selected</span>
              <span className={styles.legendCaption}>Caption — body-small (large) or caption (small), subtle color, optional</span>
            </div>
          </div>
        </div>

        {/* ⑤ Props */}
        <div className={exStyles.section}>
          <h2 className={exStyles.sectionTitle}>Props</h2>
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
                  ['value', 'string', '—', 'Value identifier for the radio option.'],
                  ['label', 'string', '—', 'Main label text shown in the centre.'],
                  ['size', "'large' | 'small'", "'small'", 'Controls label font size and control alignment.'],
                  ['eyebrow', 'string', '—', 'Optional caption-size text shown above the label.'],
                  ['caption', 'string', '—', 'Optional detail text shown below the label.'],
                  ['showDivider', 'boolean', 'true', 'Renders a Divider separator below the row.'],
                  ['disabled', 'boolean', 'false', 'Disables interaction and applies muted styles.'],
                  ['UNSAFE_className', 'string', '—', 'Escape hatch for adding a custom class to the row element.'],
                  ['UNSAFE_style', 'React.CSSProperties', '—', 'Escape hatch for adding inline styles to the row element.'],
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
          <pre className={exStyles.codeBlock}>{`import { RadioGroup } from '@/components/ui/radio-group';
import { AXRadio } from '@/components/walmart/AXRadio';

<RadioGroup value={value} onValueChange={setValue}>
  <AXRadio
    value="morning"
    label="Morning shift"
    size="small"
    eyebrow="Schedule"
    caption="Today, 7:30am – 4:00pm"
    showDivider
  />
  <AXRadio
    value="evening"
    label="Evening shift"
    size="small"
    eyebrow="Schedule"
    caption="Today, 4:00pm – 12:00am"
    showDivider={false}
  />
</RadioGroup>`}</pre>
        </div>

      </div>
    </ComponentPageLayout>
  );
}
