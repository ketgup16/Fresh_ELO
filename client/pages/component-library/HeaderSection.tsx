import React, { useState } from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { HeaderSection } from '@/components/ui/HeaderSection';
import { RadioGroup, Radio } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/Checkbox';
import styles from '@/components/examples/ExamplePage.module.css';

export default function HeaderSectionPage() {
  const [size, setSize] = useState<'medium' | 'small'>('medium');
  const [showCount, setShowCount] = useState(true);
  const [showDescription, setShowDescription] = useState(true);
  const [showDivider, setShowDivider] = useState(true);
  const [contentInset, setContentInset] = useState(true);

  return (
    <ComponentPageLayout
      section="AX Components"
      title="Section Header"
      description="Defines screen sections and creates typographic hierarchy within a screen. Supports Medium and Small sizes with optional count, description, and trailing action."
    >
      <div className={styles.pageGap}>

        {/* ① Interactive Demo */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Interactive Demo</h2>
          <p className={styles.desc}>
            Use the controls below to explore the component's props and variants.
          </p>

          <div className={styles.controlsRow}>
            <span className={styles.controlLabel}>Size:</span>
            <RadioGroup
              value={size}
              onValueChange={(v) => setSize(v as 'medium' | 'small')}
              orientation="horizontal"
              className={styles.radioGroupRow}
            >
              <Radio value="medium" label="Medium" />
              <Radio value="small" label="Small" />
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
            <Checkbox
              checked={contentInset}
              onCheckedChange={(v) => setContentInset(Boolean(v))}
              label="Content inset"
            />
          </div>

          <div className={styles.previewFrame}>
            <HeaderSection
              size={size}
              title="Title/instruction"
              count={showCount ? 5 : null}
              description={showDescription ? 'Description text for this section providing context to the user.' : null}
              trailingLabel="Button label"
              onTrailingAction={() => {}}
              showDivider={showDivider}
              contentInset={contentInset}
            />
          </div>
        </div>

        {/* ② Variants */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Variants</h2>
          <p className={styles.desc}>
            Section Header ships in two sizes. Medium uses a LinkButton trailing action;
            Small uses a chevron icon to expand/collapse.
          </p>

          <div className={styles.variantGrid}>
            <VariantCard label="Medium">
              <HeaderSection
                size="medium"
                title="Title/instruction"
                count={5}
                description="Description text"
                trailingLabel="Button label"
                onTrailingAction={() => {}}
                showDivider
                contentInset
              />
            </VariantCard>

            <VariantCard label="Small">
              <HeaderSection
                size="small"
                title="Title/instruction"
                count={5}
                description="Description text"
                showDivider
                contentInset
              />
            </VariantCard>

            <VariantCard label="Medium — no count, no description">
              <HeaderSection
                size="medium"
                title="Title/instruction"
                trailingLabel="See all"
                onTrailingAction={() => {}}
                showDivider
              />
            </VariantCard>

            <VariantCard label="Medium — no divider, with inset">
              <HeaderSection
                size="medium"
                title="Today's Plan"
                count={12}
                description="Review and start an action below"
                trailingLabel="See all"
                onTrailingAction={() => {}}
                showDivider={false}
                contentInset
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
                  ['Title text', 'Required. heading/medium/default (20px 700) for Medium; heading/small/default (18px 700) for Small. Truncated at 2 lines.'],
                  ['Item count', 'Optional. Displayed as (N) after the title. Uses heading/small/alt (18px 400).'],
                  ['Description text', 'Optional. body/medium/default (16px 400). Truncated at 3 lines.'],
                  ['Divider', 'Optional separator rendered full-width at the bottom (showDivider prop).'],
                  ['Action — Medium', '[LD 3.5] Link Button (Size=Small) shown in the trailing position of the title row.'],
                  ['Action — Small', '[LD 3.5] Icon button with ChevronUp / ChevronDown that toggles expand/collapse state.'],
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
                  ['size', "'medium' | 'small'", "'medium'", 'Controls typography scale and trailing action type.'],
                  ['title', 'string', 'required', 'Section heading text — truncated after 2 lines.'],
                  ['count', 'number | null', 'null', 'Optional item count shown as (N) after the title.'],
                  ['description', 'string | null', 'null', 'Optional body text below the title — truncated after 3 lines.'],
                  ['trailingLabel', 'string', "'Button label'", 'Label for the trailing LinkButton (Medium only).'],
                  ['onTrailingAction', '() => void', '—', 'Callback for the trailing action. For Small, overrides the internal chevron toggle.'],
                  ['showDivider', 'boolean', 'true', 'Whether to render a Divider at the bottom.'],
                  ['contentInset', 'boolean', 'false', 'Adds left/right padding to the content area; Divider stays full-width.'],
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
          <pre className={styles.codeBlock}>{`import { HeaderSection } from '@/components/ui/HeaderSection';

// Medium — with LinkButton trailing action
<HeaderSection
  size="medium"
  title="Today's Plan"
  count={5}
  description="Review and start an action for your team."
  trailingLabel="See all"
  onTrailingAction={() => navigate('/plan')}
  showDivider
  contentInset
/>

// Small — with chevron expand/collapse
<HeaderSection
  size="small"
  title="Goal Details"
  count={3}
  showDivider
  contentInset
/>`}</pre>
        </div>

        {/* ⑥ Guidelines */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Guidelines</h2>
          <div className={styles.guidelinesGrid}>
            {[
              { type: 'do', text: 'Use Section Header as the top-level label for each discrete section within a screen to provide clear typographic hierarchy.' },
              { type: 'do', text: 'Use the description slot only when readers need context about the title or its contents. Avoid redundancy with the title.' },
              { type: 'do', text: 'Use Medium size for primary sections and Small size for subsections or collapsible areas within a screen.' },
              { type: 'dont', text: "Don't split content into separate individual widgets — always try to use Section Header with a Divider to contain related content below." },
              { type: 'dont', text: "Don't use more than one inline text entry within the description. For longer content use a separate body element instead." },
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
