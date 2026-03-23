import React, { useState } from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { AXSearchField, AXSearchFieldSize, AXSearchFieldCornerStyle } from '@/components/walmart/AXSearchField';
import styles from './AXSearchField.module.css';

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className={styles.sectionTitle}>{children}</h2>;
}

function SectionDesc({ children }: { children: React.ReactNode }) {
  return <p className={styles.sectionDesc}>{children}</p>;
}

export default function AXSearchFieldPage() {
  const [liveValue, setLiveValue] = useState('');
  const [disabledValue] = useState('');

  return (
    <ComponentPageLayout
      section="AX Components"
      title="Search Field"
      description="Inline page search component positioned within a page — not used for global navigation. Supports two breakpoints (0–899px and 900+px) and states: Enabled, Hovered, Activated (empty & with value), and Disabled."
    >
      <div className={styles.page}>

        {/* ── Overview ─────────────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Overview</SectionTitle>
          <SectionDesc>
            The AX Search Field is an inline search field for filtering content within a page. It
            differs from the global navigation search — it is scoped to a single section or page.
            On mobile (0–899px) it uses a slightly more compact height (48px) and on desktop
            (900+px) it uses 56px. When activated, a blinking cursor appears and a Cancel link
            is shown; when text is entered, a clear (✕) button replaces the cursor.
          </SectionDesc>
        </div>

        {/* ── Interactive Demo ─────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Interactive Demo</SectionTitle>
          <SectionDesc>
            Try typing to activate the search field. The clear button appears once text is entered,
            and the Cancel link dismisses focus and clears the value.
          </SectionDesc>
          <div className={styles.demoWrapper}>
            <AXSearchField
              value={liveValue}
              onChange={setLiveValue}
              onClear={() => setLiveValue('')}
              onCancel={() => setLiveValue('')}
              placeholder="Search"
            />
          </div>
          {liveValue && (
            <p className={styles.searchValueDisplay}>
              Current value: <code>{liveValue}</code>
            </p>
          )}
        </div>

        {/* ── States ───────────────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>States</SectionTitle>
          <SectionDesc>
            The search field has four interaction states. Hover is desktop-only (900+px). The
            Activated state shows a focus ring and Cancel link; the entered variant shows the
            typed value and a clear button.
          </SectionDesc>

          <div className={styles.statesGrid}>
            {/* Enabled */}
            <div className={styles.stateCard}>
              <div className={styles.stateLabel}>Enabled</div>
              <div className={styles.stateDemo}>
                <AXSearchField
                  value=""
                  onChange={() => {}}
                  placeholder="Search"
                  showMic={false}
                  showBarcode={false}
                />
              </div>
              <p className={styles.stateDesc}>Default resting state. Subtle border and fill.</p>
            </div>

            {/* Enabled — with value */}
            <div className={styles.stateCard}>
              <div className={styles.stateLabel}>Enabled — with value</div>
              <div className={styles.stateDemo}>
                <AXSearchField
                  value="running shoes"
                  onChange={() => {}}
                  placeholder="Search"
                  showMic={false}
                  showBarcode={false}
                />
              </div>
              <p className={styles.stateDesc}>Resting state with a filled value. Clear (✕) button visible on the right.</p>
            </div>

            {/* Activated — empty (cursor shown) */}
            <div className={styles.stateCard}>
              <div className={styles.stateLabel}>Activated — empty</div>
              <div className={styles.stateDemo}>
                <ActivatedEmptyDemo />
              </div>
              <p className={styles.stateDesc}>
                Focused with no input. Blue border (2px), white fill, blinking cursor.
              </p>
            </div>

            {/* Activated — with value */}
            <div className={styles.stateCard}>
              <div className={styles.stateLabel}>Activated — with value</div>
              <div className={styles.stateDemo}>
                <ActivatedWithValueDemo />
              </div>
              <p className={styles.stateDesc}>
                Focused with input text. Clear (✕) button appears on the right.
              </p>
            </div>

            {/* Enabled — with trailing icons */}
            <div className={styles.stateCard}>
              <div className={styles.stateLabel}>Enabled — with trailing icons</div>
              <div className={styles.stateDemo}>
                <AXSearchField
                  value=""
                  onChange={() => {}}
                  placeholder="Search"
                  showMic
                  showBarcode
                />
              </div>
              <p className={styles.stateDesc}>
                Resting state with mic and barcode icon buttons visible. Both are optional and independently toggleable.
              </p>
            </div>

            {/* Disabled */}
            <div className={styles.stateCard}>
              <div className={styles.stateLabel}>Disabled</div>
              <div className={styles.stateDemo}>
                <AXSearchField
                  value={disabledValue}
                  onChange={() => {}}
                  placeholder="Search"
                  disabled
                />
              </div>
              <p className={styles.stateDesc}>
                Cannot be interacted with. Muted border and text colors.
              </p>
            </div>
          </div>
        </div>

        {/* ── Corner Style ─────────────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Corner Style</SectionTitle>
          <SectionDesc>
            Two corner style variants are available via the <code>cornerStyle</code> prop.
          </SectionDesc>
          <div className={styles.statesGrid}>
            {(
              [
                { cornerStyle: 'default', label: 'Default', desc: 'No border-radius. Square corners. Default state.' },
                { cornerStyle: 'rounded', label: 'Rounded', desc: 'Full pill shape.' },
              ] as { cornerStyle: AXSearchFieldCornerStyle; label: string; desc: string }[]
            ).map(({ cornerStyle, label, desc }) => (
              <div key={cornerStyle} className={styles.stateCard}>
                <div className={styles.stateLabel}>{label}</div>
                <div className={styles.stateDemo}>
                  <AXSearchField
                    value=""
                    onChange={() => {}}
                    placeholder="Search"
                    cornerStyle={cornerStyle}
                    showMic={false}
                    showBarcode={false}
                  />
                </div>
                <p className={styles.stateDesc}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Sizes ────────────────────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Sizes</SectionTitle>
          <SectionDesc>
            Four height variants are available via the <code>size</code> prop. X Small and Small
            use the small icon variant (20px); Medium and Large use the medium icon variant (24px).
          </SectionDesc>
          <div className={styles.sizesGrid}>
            {(
              [
                { size: 'xsmall', label: 'X Small', height: '32px' },
                { size: 'small',  label: 'Small',   height: '40px' },
                { size: 'medium', label: 'Medium',  height: '48px' },
                { size: 'large',  label: 'Large',   height: '56px' },
              ] as { size: AXSearchFieldSize; label: string; height: string }[]
            ).map(({ size, label, height }) => (
              <div key={size} className={styles.sizeRow}>
                <div className={styles.sizeRowLabel}>
                  <span className={styles.sizeName}>{label}</span>
                  <span className={styles.sizeHeight}>{height}</span>
                </div>
                <div className={styles.sizeDemo}>
                  <AXSearchField
                    value=""
                    onChange={() => {}}
                    placeholder="Search"
                    size={size}
                    showMic
                    showBarcode
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Breakpoints ───────────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Breakpoints</SectionTitle>
          <SectionDesc>
            The component automatically adapts between two breakpoints. At 900+px (desktop) the
            pill height increases to 56px and horizontal padding grows to 16px. At 0–899px (mobile
            and tablet) the height is 48px with 12px padding. The "Hovered" state only applies on
            desktop.
          </SectionDesc>

          <div className={styles.breakpointTable}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Property</th>
                  <th>0–899px (Mobile/Tablet)</th>
                  <th>900+px (Desktop)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Min height (enabled)</td>
                  <td>48px</td>
                  <td>56px</td>
                </tr>
                <tr>
                  <td>Padding (enabled)</td>
                  <td>12px (all sides)</td>
                  <td>8px top/bottom, 16px left/right</td>
                </tr>
                <tr>
                  <td>Padding (activated)</td>
                  <td>4px top/bottom/right, 12px left</td>
                  <td>8px top/bottom/right, 16px left</td>
                </tr>
                <tr>
                  <td>Hover state</td>
                  <td>No (touch devices)</td>
                  <td>Yes — slightly darker border + fill</td>
                </tr>
                <tr>
                  <td>Cancel link</td>
                  <td>Shown when activated</td>
                  <td>Shown when activated</td>
                </tr>
              </tbody>
            </table>
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
              <tr><td>value</td><td>string</td><td>—</td><td>Required. Controlled input value.</td></tr>
              <tr><td>onChange</td><td>(value: string) =&gt; void</td><td>—</td><td>Required. Called on every keystroke.</td></tr>
              <tr><td>onClear</td><td>() =&gt; void</td><td>—</td><td>Called when the clear (✕) button is pressed.</td></tr>
              <tr><td>onCancel</td><td>() =&gt; void</td><td>—</td><td>Called when the Cancel link is pressed.</td></tr>
              <tr><td>showMic</td><td>boolean</td><td>true</td><td>Show microphone icon button in resting/unfilled state.</td></tr>
              <tr><td>showBarcode</td><td>boolean</td><td>true</td><td>Show barcode icon button in resting/unfilled state.</td></tr>
              <tr><td>onMicClick</td><td>() =&gt; void</td><td>—</td><td>Called when the microphone button is pressed.</td></tr>
              <tr><td>onBarcodeClick</td><td>() =&gt; void</td><td>—</td><td>Called when the barcode button is pressed.</td></tr>
              <tr><td>placeholder</td><td>string</td><td>'Search'</td><td>Placeholder text shown when the field is empty.</td></tr>
              <tr><td>size</td><td>'xsmall' | 'small' | 'medium' | 'large'</td><td>'large'</td><td>Height variant. xsmall=32px, small=40px, medium=48px, large=56px. xsmall/small use small icons; medium/large use medium icons.</td></tr>
              <tr><td>simulateFocused</td><td>boolean</td><td>false</td><td>Forces the activated visual state without real browser focus. Useful for docs and design previews.</td></tr>
              <tr><td>disabled</td><td>boolean</td><td>false</td><td>Disables all interaction.</td></tr>
              <tr><td>className</td><td>string</td><td>—</td><td>Optional extra CSS class on the root wrapper.</td></tr>
            </tbody>
          </table>
        </div>

        {/* ── Usage ─────────────────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Usage</SectionTitle>
          <pre className={styles.codeBlock}>{`import { AXSearchField } from '@/components/walmart/AXSearchField';

function MyPage() {
  const [query, setQuery] = React.useState('');

  return (
    <AXSearchField
      value={query}
      onChange={setQuery}
      onClear={() => setQuery('')}
      onCancel={() => setQuery('')}
      placeholder="Search products"
    />
  );
}`}</pre>
        </div>

        {/* ── Guidelines ───────────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Guidelines</SectionTitle>
          <div className={styles.guidelineGrid}>
            <div className={styles.guidelineCard}>
              <div className={styles.doLabel}>Do</div>
              <p className={styles.guidelineText}>Use for inline/page-scoped search — filtering a list, table, or product catalog on the current page.</p>
            </div>
            <div className={styles.guidelineCard}>
              <div className={styles.dontLabel}>Don't</div>
              <p className={styles.guidelineText}>Don't use in the global header for site-wide search. Use the dedicated global search bar for that.</p>
            </div>
            <div className={styles.guidelineCard}>
              <div className={styles.doLabel}>Do</div>
              <p className={styles.guidelineText}>Always provide both <code>onClear</code> and <code>onCancel</code> so users can exit the search state cleanly.</p>
            </div>
            <div className={styles.guidelineCard}>
              <div className={styles.dontLabel}>Don't</div>
              <p className={styles.guidelineText}>Don't stack multiple search fields on the same page. Only one per content area is recommended.</p>
            </div>
          </div>
        </div>

      </div>
    </ComponentPageLayout>
  );
}

// ── Helper demos with pre-triggered focus state ───────────────────────────

function ActivatedEmptyDemo() {
  const [val, setVal] = React.useState('');
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Focus the input so the cursor blinks; simulateFocused keeps the visual
    // state correct even if the user clicks elsewhere on the page.
    const input = wrapperRef.current?.querySelector('input');
    input?.focus();
  }, []);

  return (
    <div ref={wrapperRef}>
      <AXSearchField
        value={val}
        onChange={setVal}
        onClear={() => setVal('')}
        onCancel={() => setVal('')}
        placeholder="Search"
        simulateFocused
      />
    </div>
  );
}

function ActivatedWithValueDemo() {
  const [val, setVal] = React.useState('running shoes');

  return (
    <AXSearchField
      value={val}
      onChange={setVal}
      onClear={() => setVal('')}
      onCancel={() => setVal('')}
      placeholder="Search"
      simulateFocused
    />
  );
}
