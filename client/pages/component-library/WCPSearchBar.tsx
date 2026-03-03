import React, { useState } from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { WCPSearchBar } from '@/components/walmart/WCPSearchBar';
import styles from './WCPSearchBar.module.css';

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className={styles.sectionTitle}>{children}</h2>;
}

function SectionDesc({ children }: { children: React.ReactNode }) {
  return <p className={styles.sectionDesc}>{children}</p>;
}

function DemoCard({ title, children, narrow }: { title: string; children: React.ReactNode; narrow?: boolean }) {
  return (
    <div className={[styles.demoCard, narrow ? styles.demoCardNarrow : ''].filter(Boolean).join(' ')}>
      <div className={styles.cardLabel}>{title}</div>
      <div className={styles.cardContent}>{children}</div>
    </div>
  );
}

export default function WCPSearchBarPage() {
  const [value900, setValue900] = useState('');
  const [value0899, setValue0899] = useState('');
  const [valueWithText, setValueWithText] = useState('Running shoes');
  const [valueDisabled] = useState('');

  return (
    <ComponentPageLayout
      section="WCP Components"
      title="[WCP] Search Bar"
      description="An inline, page-level search bar for searching within a page. Not used for global navigation."
    >
      <div className={styles.page}>

        {/* ── 900+px States ───────────────────────────────────────────── */}
        <section className={styles.section}>
          <SectionTitle>900+ px — Desktop Breakpoint</SectionTitle>
          <SectionDesc>
            Full desktop version with min-height 56px. Padding is 8px 16px. Includes Hovered, Activated (no text), Activated (with text), and Disabled states. Cancel link appears outside the pill when activated.
          </SectionDesc>

          <div className={styles.statesGrid}>
            <DemoCard title="Enabled">
              <div className={styles.desktopDemo}>
                <WCPSearchBar
                  value=""
                  onChange={() => {}}
                  placeholder="Enter search term(s)"
                />
              </div>
            </DemoCard>

            <DemoCard title="Activated — No text">
              <div className={styles.desktopDemo}>
                <WCPSearchBar
                  value={value900}
                  onChange={setValue900}
                  onCancel={() => setValue900('')}
                  placeholder="Enter search term(s)"
                />
              </div>
            </DemoCard>

            <DemoCard title="Activated — With text">
              <div className={styles.desktopDemo}>
                <WCPSearchBar
                  value={valueWithText}
                  onChange={setValueWithText}
                  onClear={() => setValueWithText('')}
                  onCancel={() => setValueWithText('')}
                  placeholder="Enter search term(s)"
                />
              </div>
            </DemoCard>

            <DemoCard title="Disabled">
              <div className={styles.desktopDemo}>
                <WCPSearchBar
                  value={valueDisabled}
                  onChange={() => {}}
                  placeholder="Enter search term(s)"
                  disabled
                />
              </div>
            </DemoCard>
          </div>
        </section>

        {/* ── 0-899px States ──────────────────────────────────────────── */}
        <section className={styles.section}>
          <SectionTitle>0–899 px — Mobile Breakpoint</SectionTitle>
          <SectionDesc>
            Mobile version with min-height 48px, padding 12px. Focused padding is 4px 4px 4px 12px. No Hovered state on mobile. Cancel link appears outside when activated.
          </SectionDesc>

          <div className={styles.mobileStatesGrid}>
            <DemoCard title="Enabled" narrow>
              <WCPSearchBar
                value=""
                onChange={() => {}}
                placeholder="Enter search term(s)"
              />
            </DemoCard>

            <DemoCard title="Activated — No text" narrow>
              <WCPSearchBar
                value={value0899}
                onChange={setValue0899}
                onCancel={() => setValue0899('')}
                placeholder="Enter search term(s)"
              />
            </DemoCard>

            <DemoCard title="Disabled" narrow>
              <WCPSearchBar
                value=""
                onChange={() => {}}
                placeholder="Enter search term(s)"
                disabled
              />
            </DemoCard>
          </div>
        </section>

        {/* ── Live Demo ───────────────────────────────────────────────── */}
        <section className={styles.section}>
          <SectionTitle>Live Interactive Demo</SectionTitle>
          <SectionDesc>
            Type in the search box to see all states in action. The clear button (×) appears when the field is focused and has text. The Cancel link appears when the field is focused.
          </SectionDesc>
          <div className={styles.liveDemo}>
            <WCPSearchBar
              value={value900}
              onChange={setValue900}
              onClear={() => setValue900('')}
              onCancel={() => setValue900('')}
              placeholder="Search your orders"
            />
            {value900 && (
              <p className={styles.liveOutput}>
                Search value: <strong>{value900}</strong>
              </p>
            )}
          </div>
        </section>

        {/* ── Usage ───────────────────────────────────────────────────── */}
        <section className={styles.section}>
          <SectionTitle>Usage</SectionTitle>
          <SectionDesc>
            The WCPSearchBar is a controlled component. Pass <code>value</code> and <code>onChange</code> for controlled behavior.
            Use <code>onClear</code> to handle the X button click, and <code>onCancel</code> for the Cancel link.
          </SectionDesc>
          <div className={styles.codeBlock}>
            <pre>{`import { WCPSearchBar } from '@/components/walmart/WCPSearchBar';

function MyComponent() {
  const [search, setSearch] = useState('');

  return (
    <WCPSearchBar
      value={search}
      onChange={setSearch}
      onClear={() => setSearch('')}
      onCancel={() => setSearch('')}
      placeholder="Search your orders"
    />
  );
}`}</pre>
          </div>
        </section>

        {/* ── Props ───────────────────────────────────────────────────── */}
        <section className={styles.section}>
          <SectionTitle>Props</SectionTitle>
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
              <tr>
                <td><code>value</code></td>
                <td><code>string</code></td>
                <td>—</td>
                <td>Controlled value for the search input.</td>
              </tr>
              <tr>
                <td><code>onChange</code></td>
                <td><code>(value: string) =&gt; void</code></td>
                <td>—</td>
                <td>Called when the input value changes.</td>
              </tr>
              <tr>
                <td><code>onClear</code></td>
                <td><code>() =&gt; void</code></td>
                <td>—</td>
                <td>Called when the × clear button is clicked.</td>
              </tr>
              <tr>
                <td><code>onCancel</code></td>
                <td><code>() =&gt; void</code></td>
                <td>—</td>
                <td>Called when the Cancel link is clicked. Also clears the value.</td>
              </tr>
              <tr>
                <td><code>placeholder</code></td>
                <td><code>string</code></td>
                <td><code>"Enter search term(s)"</code></td>
                <td>Placeholder text shown in the input.</td>
              </tr>
              <tr>
                <td><code>disabled</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>Disables all interaction.</td>
              </tr>
              <tr>
                <td><code>className</code></td>
                <td><code>string</code></td>
                <td>—</td>
                <td>Additional CSS class for the wrapper.</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </ComponentPageLayout>
  );
}
