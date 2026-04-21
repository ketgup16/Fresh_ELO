import React, { useState } from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { AXSearchBar } from '@/components/walmart/AXSearchBar';
import styles from '@/components/examples/ExamplePage.module.css';

export default function AXSearchBarPage() {
  const [liveValue, setLiveValue] = useState('');
  const [filledValue, setFilledValue] = useState('Text value');

  return (
    <ComponentPageLayout
      section="AX Components"
      title="Search Bar"
      description='An inline search input based on the [AX] Search Bar V2 spec. Supports Enabled, Focused, Disabled, and Read-only states with Unfilled and Filled content variants.'
    >
      <div className={styles.pageGap}>

        {/* Interactive Demo */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Interactive Demo</h2>
          <p className={styles.desc}>
            Click to focus. Type to fill. The trailing icons adapt per state — mic and barcode
            icons appear when empty, a clear (✕) button when filled, and a Cancel link while
            focused.
          </p>
          <div className={styles.previewFrame}>
            <AXSearchBar
              value={liveValue}
              onChange={setLiveValue}
              onClear={() => setLiveValue('')}
            />
          </div>
          {liveValue && (
            <p className={styles.desc}>
              Current value: <code>{liveValue}</code>
            </p>
          )}
        </div>

        {/* States */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>States</h2>
          <p className={styles.desc}>
            The search bar has four states (Enabled, Focused, Disabled, Read-only) and two
            content modes (Unfilled and Filled).
          </p>

          <div className={styles.variantGrid}>
            <div className={styles.variantCard}>
              <div className={styles.variantCardLabel}>Enabled — Unfilled</div>
              <AXSearchBar value="" onChange={() => {}} />
              <p className={styles.desc}>Default resting state. Trailing: mic and barcode icon buttons.</p>
            </div>

            <div className={styles.variantCard}>
              <div className={styles.variantCardLabel}>Enabled — Filled</div>
              <AXSearchBar
                value={filledValue}
                onChange={setFilledValue}
                onClear={() => setFilledValue('')}
              />
              <p className={styles.desc}>Value present. Trailing: clear (✕) button replaces mic/barcode.</p>
            </div>

            <div className={styles.variantCard}>
              <div className={styles.variantCardLabel}>Focused — Unfilled</div>
              <FocusedDemo value="" />
              <p className={styles.desc}>Border thickens to 2px. Trailing: Cancel link. Cursor blinks in input.</p>
            </div>

            <div className={styles.variantCard}>
              <div className={styles.variantCardLabel}>Focused — Filled</div>
              <FocusedDemo value="Text value" />
              <p className={styles.desc}>Border thickens to 2px + value present. Trailing: clear (✕) + Cancel link.</p>
            </div>

            <div className={styles.variantCard}>
              <div className={styles.variantCardLabel}>Disabled</div>
              <AXSearchBar value="" placeholder="Search" state="disabled" />
              <p className={styles.desc}>Non-interactive. Muted border, fill, and text.</p>
            </div>

            <div className={styles.variantCard}>
              <div className={styles.variantCardLabel}>Read-only — Filled</div>
              <AXSearchBar value="Text value" state="readOnly" />
              <p className={styles.desc}>Value shown but cannot be edited or interacted with.</p>
            </div>
          </div>
        </div>

        {/* Anatomy */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Anatomy</h2>
          <div className={styles.tableWrapper}>
            <table className={styles.docsTable}>
              <thead>
                <tr>
                  <th>Element</th>
                  <th>Description</th>
                  <th>Visibility</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Search icon', 'Leading icon. Always visible.', 'Always'],
                  ['Placeholder / Value', 'Input text or placeholder hint.', 'Always'],
                  ['Mic icon button', 'Triggers voice search.', 'Enabled, unfilled only'],
                  ['Barcode icon button', 'Triggers camera scan.', 'Enabled, unfilled only'],
                  ['Clear (✕) button', 'Clears field value.', 'When value is present'],
                  ['Cancel link', 'Dismisses focus and reverts value.', 'While focused'],
                  ['Bottom border', 'Semantic field border. Thicker (2px) when focused.', 'Always'],
                ].map(([el, desc, vis]) => (
                  <tr key={el}>
                    <td>{el}</td>
                    <td>{desc}</td>
                    <td>{vis}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Props */}
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
                  ['value', 'string', "''", 'Controlled input value.'],
                  ['placeholder', 'string', "'Search'", 'Placeholder text when empty.'],
                  ['state', "'enabled' | 'disabled' | 'readOnly'", "'enabled'", 'Visual and interaction state.'],
                  ['showMic', 'boolean', 'true', 'Show microphone icon button in unfilled state.'],
                  ['showBarcode', 'boolean', 'true', 'Show barcode icon button in unfilled state.'],
                  ['onChange', '(value: string) => void', '—', 'Called on every keystroke.'],
                  ['onClear', '() => void', '—', 'Called when clear (✕) button is pressed.'],
                  ['onCancel', '() => void', '—', 'Called when Cancel link is pressed.'],
                  ['onMicClick', '() => void', '—', 'Called when microphone button is pressed.'],
                  ['onBarcodeClick', '() => void', '—', 'Called when barcode button is pressed.'],
                  ['className', 'string', '—', 'Optional extra class on the root wrapper.'],
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

        {/* Usage */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Usage</h2>
          <pre className={styles.codeBlock}>{`import { AXSearchBar } from '@/components/walmart/AXSearchBar';

function MyPage() {
  const [query, setQuery] = React.useState('');

  return (
    <AXSearchBar
      value={query}
      onChange={setQuery}
      onClear={() => setQuery('')}
      placeholder="Search"
    />
  );
}`}</pre>
        </div>

        {/* Guidelines */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Guidelines</h2>
          <div className={styles.guidelinesGrid}>
            {[
              { type: 'do', text: 'Use for inline / page-scoped search — filtering a list, table, or catalog within the current view.' },
              { type: 'dont', text: "Don't use in the global header for site-wide search — use the dedicated header search bar for that." },
              { type: 'do', text: 'Provide onClear and onCancel callbacks so users can cleanly exit the search state.' },
              { type: 'dont', text: "Don't stack multiple search bars on the same page. One per content area is recommended." },
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

function FocusedDemo({ value: initialValue }: { value: string }) {
  const [val, setVal] = useState(initialValue);
  return (
    <AXSearchBar
      value={val}
      onChange={setVal}
      onClear={() => setVal('')}
      simulateFocused
    />
  );
}
