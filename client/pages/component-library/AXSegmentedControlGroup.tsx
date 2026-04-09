import React, { useState } from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { SegmentedControlGroup } from '@/components/walmart/SegmentedControlGroup';
import { Button } from '@/components/ui/Button';
import { Calendar } from '@/components/icons/Calendar';
import { User } from '@/components/icons/User';
import { List } from '@/components/icons/List';
import { useTranslation } from 'react-i18next';
import styles from './AXSegmentedControlGroup.module.css';

// ── Shared style constants ────────────────────────────────────────────────────

const SECTION_TITLE: React.CSSProperties = {
  fontSize: '22px',
  fontWeight: 700,
  fontFamily: 'var(--ld-semantic-font-family-sans)',
  color: 'var(--ld-semantic-color-text-primary, #2e2f32)',
  margin: '0 0 24px',
  paddingBottom: '12px',
  borderBottom: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
};

const DESC: React.CSSProperties = {
  margin: '0 0 24px',
  fontSize: '14px',
  fontFamily: 'var(--ld-semantic-font-family-sans)',
  color: 'var(--ld-semantic-color-text-subtle)',
  lineHeight: 1.6,
};

// ── Page ─────────────────────────────────────────────────────────────────────

export default function AXSegmentedControlGroupPage() {
  const { t } = useTranslation();
  const [activeIndex2, setActiveIndex2] = useState(0);
  const [activeIndex3, setActiveIndex3] = useState(0);
  const [demoSegmentCount, setDemoSegmentCount] = useState<2 | 3>(2);
  const [showIcons, setShowIcons] = useState(false);
  const [demoActiveIndex, setDemoActiveIndex] = useState(0);

  const twoSegments = [
    { label: 'View by work', icon: showIcons ? <Calendar /> : undefined },
    { label: 'View by associate', icon: showIcons ? <User /> : undefined },
  ];

  const threeSegments = [
    { label: 'Today', icon: showIcons ? <Calendar /> : undefined },
    { label: 'Week', icon: showIcons ? <List /> : undefined },
    { label: 'Month', icon: showIcons ? <User /> : undefined },
  ];

  const demoSegments = demoSegmentCount === 2 ? twoSegments : threeSegments;

  const codeSnippet = `import { SegmentedControlGroup } from '@/components/walmart/SegmentedControlGroup';

// 2-segment variant
<SegmentedControlGroup
  segments={[
    { label: 'View by work' },
    { label: 'View by associate' },
  ]}
  activeIndex={activeIndex}
  onChange={(i) => setActiveIndex(i)}
  aria-label="View switcher"
/>

// 3-segment variant
<SegmentedControlGroup
  segments={[
    { label: 'Today' },
    { label: 'Week' },
    { label: 'Month' },
  ]}
  activeIndex={activeIndex}
  onChange={(i) => setActiveIndex(i)}
  aria-label="Time period"
/>`;

  return (
    <ComponentPageLayout
      section={t('componentLibrary.wcpComponents')}
      title={t('componentLibrary.navAXSegmentedControlGroup')}
      description={t('componentLibrary.descAXSegmentedControlGroup')}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>

        {/* ── Interactive Demo ── */}
        <div>
          <h2 style={SECTION_TITLE}>Interactive demo</h2>
          <p style={DESC}>
            Select 2 or 3 segments and toggle icon visibility. Click any segment in the preview to activate it.
          </p>

          <div className={styles.demoControls}>
            <div className={styles.controlRow}>
              <span className={styles.controlLabel}>Segment count</span>
              <div className={styles.controlButtons}>
                <Button
                  variant={demoSegmentCount === 2 ? 'primary' : 'secondary'}
                  size="small"
                  onClick={() => { setDemoSegmentCount(2); setDemoActiveIndex(0); }}
                >
                  2 Segments
                </Button>
                <Button
                  variant={demoSegmentCount === 3 ? 'primary' : 'secondary'}
                  size="small"
                  onClick={() => { setDemoSegmentCount(3); setDemoActiveIndex(0); }}
                >
                  3 Segments
                </Button>
              </div>
            </div>
            <div className={styles.controlRow}>
              <span className={styles.controlLabel}>Show icons</span>
              <div className={styles.controlButtons}>
                <Button
                  variant={!showIcons ? 'primary' : 'secondary'}
                  size="small"
                  onClick={() => setShowIcons(false)}
                >
                  No icons
                </Button>
                <Button
                  variant={showIcons ? 'primary' : 'secondary'}
                  size="small"
                  onClick={() => setShowIcons(true)}
                >
                  With icons
                </Button>
              </div>
            </div>
          </div>

          <div className={styles.previewFrame}>
            <SegmentedControlGroup
              segments={demoSegments}
              activeIndex={demoActiveIndex}
              onChange={setDemoActiveIndex}
              aria-label="Interactive demo"
            />
          </div>
          <p className={styles.previewCaption}>
            Active segment: <strong>{demoSegmentCount === 2 ? twoSegments[demoActiveIndex]?.label : threeSegments[demoActiveIndex]?.label}</strong>
          </p>
        </div>

        {/* ── Variants ── */}
        <div>
          <h2 style={SECTION_TITLE}>Variants</h2>
          <p style={DESC}>
            The Segmented Control Group supports 2 or 3 segments. Each segment expands equally to fill the container width.
          </p>

          <div className={styles.variantsGrid}>
            <div className={styles.variantItem}>
              <p className={styles.variantLabel}>Segmented Control | 2</p>
              <div className={styles.variantPreview}>
                <SegmentedControlGroup
                  segments={[{ label: 'View by work' }, { label: 'View by associate' }]}
                  activeIndex={activeIndex2}
                  onChange={setActiveIndex2}
                  aria-label="2-segment variant"
                />
              </div>
            </div>
            <div className={styles.variantItem}>
              <p className={styles.variantLabel}>Segmented Control | 3</p>
              <div className={styles.variantPreview}>
                <SegmentedControlGroup
                  segments={[{ label: 'Today' }, { label: 'Week' }, { label: 'Month' }]}
                  activeIndex={activeIndex3}
                  onChange={setActiveIndex3}
                  aria-label="3-segment variant"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── States ── */}
        <div>
          <h2 style={SECTION_TITLE}>States</h2>
          <p style={DESC}>
            Each segment supports four interactive states: Unselected, Selected (activated), Pressed, and Disabled.
          </p>

          <div className={styles.statesGrid}>
            <div className={styles.stateRow}>
              <span className={styles.stateLabel}>Unselected</span>
              <div className={styles.statePreview}>
                <SegmentedControlGroup
                  segments={[{ label: 'Text label' }, { label: 'Text label' }]}
                  activeIndex={1}
                  onChange={() => {}}
                  aria-label="Unselected state demo"
                />
              </div>
              <span className={styles.stateDesc}>Segment 1 is unselected</span>
            </div>

            <div className={styles.stateRow}>
              <span className={styles.stateLabel}>Selected</span>
              <div className={styles.statePreview}>
                <SegmentedControlGroup
                  segments={[{ label: 'Text label' }, { label: 'Text label' }]}
                  activeIndex={0}
                  onChange={() => {}}
                  aria-label="Selected state demo"
                />
              </div>
              <span className={styles.stateDesc}>Segment 1 is selected — 2px border, bold text</span>
            </div>

            <div className={styles.stateRow}>
              <span className={styles.stateLabel}>Disabled</span>
              <div className={styles.statePreview}>
                <SegmentedControlGroup
                  segments={[{ label: 'Text label' }, { label: 'Text label', disabled: true }]}
                  activeIndex={0}
                  onChange={() => {}}
                  aria-label="Disabled state demo"
                />
              </div>
              <span className={styles.stateDesc}>Segment 2 is disabled — muted colors, not interactive</span>
            </div>
          </div>
        </div>

        {/* ── Do / Don't ── */}
        <div>
          <h2 style={SECTION_TITLE}>Dos and Don'ts</h2>

          <div className={styles.dosAndDonts}>
            <div className={styles.doBlock}>
              <div className={styles.doHeader}>
                <span className={styles.doIcon}>Do</span>
              </div>
              <div className={styles.rule}>
                <strong>Keep labels concise.</strong> Each label should fit on one line. For 3 segments, aim for 9 characters or fewer per label on mobile. For 2 segments, 15 characters or fewer.
              </div>
              <div className={styles.rule}>
                <strong>Keep all segments consistently iconned.</strong> Either all segments have a leading icon or none do — never mix iconned and non-iconned segments in the same group.
              </div>
            </div>

            <div className={styles.dontBlock}>
              <div className={styles.dontHeader}>
                <span className={styles.dontIcon}>Don't</span>
              </div>
              <div className={styles.rule}>
                <strong>Don't use more than 3 segments.</strong> If you need 4 or more options, use a Tab navigation or a Select component instead.
              </div>
              <div className={styles.rule}>
                <strong>Don't use very long labels</strong> that force text wrapping or make segments uneven widths. Both degrade usability and visual consistency.
              </div>
            </div>
          </div>
        </div>

        {/* ── Props table ── */}
        <div>
          <h2 style={SECTION_TITLE}>Properties</h2>
          <p style={DESC}>Props accepted by the SegmentedControlGroup component.</p>
          <div style={{ overflowX: 'auto' }}>
            <table className={styles.propsTable}>
              <thead>
                <tr>
                  {['Prop', 'Type', 'Default', 'Description'].map((h) => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['segments', 'SegmentedControlGroupSegment[]', '—', 'Required. Array of 2–3 segment definitions. Each has label, optional icon, optional disabled flag, and optional ariaLabel override.'],
                  ['activeIndex', 'number', '—', 'Required. Zero-based index of the currently active segment. Controlled externally.'],
                  ['onChange', '(index: number) => void', '—', 'Required. Called with the new index when an inactive segment is pressed.'],
                  ['aria-label', 'string', '—', 'Accessible label for the group container (role="group").'],
                  ['className', 'string', '—', 'Optional additional CSS class applied to the root element.'],
                ].map(([prop, type, def, desc]) => (
                  <tr key={String(prop)}>
                    <td className={styles.propName}>{prop}</td>
                    <td className={styles.propType}>{type}</td>
                    <td className={styles.propDefault}>{def}</td>
                    <td>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p style={{ ...DESC, marginTop: '24px' }}>
            The <code>SegmentedControlGroupSegment</code> interface:
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table className={styles.propsTable}>
              <thead>
                <tr>
                  {['Prop', 'Type', 'Required', 'Description'].map((h) => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['label', 'string', 'Yes', 'Visible text shown in the segment.'],
                  ['icon', 'React.ReactNode', 'No', 'Optional leading icon (16px). If used, all segments in the group must have one.'],
                  ['disabled', 'boolean', 'No', 'When true, the segment is non-interactive and visually muted.'],
                  ['ariaLabel', 'string', 'No', 'Accessible label override for this specific segment button.'],
                ].map(([prop, type, req, desc]) => (
                  <tr key={String(prop)}>
                    <td className={styles.propName}>{prop}</td>
                    <td className={styles.propType}>{type}</td>
                    <td className={styles.propDefault}>{req}</td>
                    <td>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Import reference ── */}
        <div>
          <h2 style={SECTION_TITLE}>Import reference</h2>
          <pre className={styles.codeBlock}>{codeSnippet}</pre>
        </div>

      </div>
    </ComponentPageLayout>
  );
}
