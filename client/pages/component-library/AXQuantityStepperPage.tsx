import React, { useState } from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { RadioGroup, Radio } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/Checkbox';
import { AXQuantityStepper, AXQuantityLabelStyle } from '@/components/walmart/AXQuantityStepper';
import exStyles from '@/components/examples/ExamplePage.module.css';

export default function AXQuantityStepperPage() {
  // Demo controls
  const [labelStyle, setLabelStyle] = useState<AXQuantityLabelStyle>('duration');
  const [showSecondLabel, setShowSecondLabel] = useState(true);

  // Internal demo values (lifted so we can reset them)
  const [durationMins, setDurationMins] = useState(0);
  const [amountCount, setAmountCount] = useState(0);
  const [pct, setPct] = useState(0);

  function handleDemoChange(v: number) {
    if (labelStyle === 'duration') setDurationMins(v);
    else if (labelStyle === 'amount') setAmountCount(v);
    else setPct(v);
  }

  const demoValue =
    labelStyle === 'duration' ? durationMins
    : labelStyle === 'amount' ? amountCount
    : pct;

  const demoProps =
    labelStyle === 'duration'
      ? { totalMinutes: durationMins, targetMinutes: 120 }
      : labelStyle === 'amount'
      ? { count: amountCount, totalCount: 24 }
      : { percent: pct };

  return (
    <ComponentPageLayout
      section="AX Patterns"
      title="Quantity Stepper"
      description="An AX-level pill stepper with a rich labeled center that replaces the plain count. Supports three label styles — Duration (hh mm), Amount (ea), and Percent (%) — and always renders in expanded mode with − and + controls."
    >
      <div className={exStyles.pageGap}>

        {/* ① Interactive Demo */}
        <div className={exStyles.section}>
          <h2 className={exStyles.sectionTitle}>Interactive Demo</h2>
          <p className={exStyles.desc}>
            Use the controls below to explore label styles and visibility options.
          </p>

          <div className={exStyles.controlsRow}>
            <span className={exStyles.controlLabel}>Label style:</span>
            <RadioGroup
              value={labelStyle}
              onValueChange={(v) => {
                setLabelStyle(v as AXQuantityLabelStyle);
                setDurationMins(0);
                setAmountCount(0);
                setPct(0);
              }}
              orientation="horizontal"
              className={exStyles.radioGroupRow}
            >
              <Radio value="duration" label="Duration" />
              <Radio value="amount" label="Amount" />
              <Radio value="percent" label="Percent" />
            </RadioGroup>
          </div>

          <div className={exStyles.checkboxRow}>
            <Checkbox
              checked={showSecondLabel}
              onCheckedChange={(v) => setShowSecondLabel(Boolean(v))}
              label="Show second label (of X)"
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0' }}>
            <AXQuantityStepper
              labelStyle={labelStyle}
              showSecondLabel={showSecondLabel}
              onChange={handleDemoChange}
              {...demoProps}
            />
          </div>
          <p className={exStyles.desc} style={{ textAlign: 'center' }}>
            Current value: <strong>{demoValue}</strong>
            {labelStyle === 'duration' && ' minutes'}
            {labelStyle === 'amount' && ' ea'}
            {labelStyle === 'percent' && '%'}
          </p>
        </div>

        {/* ② Label Styles */}
        <div className={exStyles.section}>
          <h2 className={exStyles.sectionTitle}>Label Styles</h2>
          <p className={exStyles.desc}>
            Three display variants handle different quantity contexts. Duration uses hours and minutes, Amount uses an "ea" unit with an optional total, and Percent shows a single percentage value.
          </p>

          <div className={exStyles.variantGrid}>
            <div className={exStyles.variantCard}>
              <span className={exStyles.variantCardLabel}>Duration</span>
              <AXQuantityStepper
                labelStyle="duration"
                totalMinutes={75}
                targetMinutes={120}
                showSecondLabel
              />
            </div>
            <div className={exStyles.variantCard}>
              <span className={exStyles.variantCardLabel}>Amount</span>
              <AXQuantityStepper
                labelStyle="amount"
                count={8}
                totalCount={24}
                showSecondLabel
              />
            </div>
            <div className={exStyles.variantCard}>
              <span className={exStyles.variantCardLabel}>Percent</span>
              <AXQuantityStepper
                labelStyle="percent"
                percent={45}
              />
            </div>
          </div>
        </div>

        {/* ③ Second Label Visibility */}
        <div className={exStyles.section}>
          <h2 className={exStyles.sectionTitle}>Second Label</h2>
          <p className={exStyles.desc}>
            The "of [target]" second label is optional. Hide it when no target context is needed.
          </p>

          <div className={exStyles.variantGrid}>
            <div className={exStyles.variantCard}>
              <span className={exStyles.variantCardLabel}>With second label</span>
              <AXQuantityStepper
                labelStyle="duration"
                totalMinutes={30}
                targetMinutes={60}
                showSecondLabel
              />
            </div>
            <div className={exStyles.variantCard}>
              <span className={exStyles.variantCardLabel}>Without second label</span>
              <AXQuantityStepper
                labelStyle="duration"
                totalMinutes={30}
                showSecondLabel={false}
              />
            </div>
          </div>
        </div>

        {/* ④ States */}
        <div className={exStyles.section}>
          <h2 className={exStyles.sectionTitle}>States</h2>
          <p className={exStyles.desc}>
            The stepper supports default, at-min (decrement disabled), at-max (increment disabled), and disabled states.
          </p>

          <div className={exStyles.variantGrid}>
            <div className={exStyles.variantCard}>
              <span className={exStyles.variantCardLabel}>Default</span>
              <AXQuantityStepper labelStyle="amount" count={5} totalCount={10} showSecondLabel />
            </div>
            <div className={exStyles.variantCard}>
              <span className={exStyles.variantCardLabel}>At minimum (0)</span>
              <AXQuantityStepper labelStyle="amount" count={0} totalCount={10} min={0} showSecondLabel />
            </div>
            <div className={exStyles.variantCard}>
              <span className={exStyles.variantCardLabel}>At maximum</span>
              <AXQuantityStepper labelStyle="percent" percent={100} max={100} />
            </div>
            <div className={exStyles.variantCard}>
              <span className={exStyles.variantCardLabel}>Disabled</span>
              <AXQuantityStepper labelStyle="duration" totalMinutes={45} targetMinutes={60} showSecondLabel disabled />
            </div>
          </div>
        </div>

        {/* ⑤ Props Table */}
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
                  ['labelStyle', "'duration' | 'amount' | 'percent'", "'duration'", 'Controls the center label format.'],
                  ['totalMinutes', 'number', '0', 'Current value in minutes (duration mode).'],
                  ['targetMinutes', 'number', '0', 'Target total in minutes shown in "of X" (duration mode).'],
                  ['count', 'number', '0', 'Current count (amount mode).'],
                  ['totalCount', 'number', '0', 'Target total count shown in "of X" (amount mode).'],
                  ['percent', 'number', '0', 'Current percentage 0–100 (percent mode).'],
                  ['showSecondLabel', 'boolean', 'true', 'Show or hide the "of [target]" second label.'],
                  ['minuteStep', 'number', '15', 'Increment step in minutes for duration mode.'],
                  ['step', 'number', '1', 'Increment step for amount and percent modes.'],
                  ['min', 'number', '0', 'Minimum allowed value.'],
                  ['max', 'number', '—', 'Maximum allowed value (100 for percent by default).'],
                  ['disabled', 'boolean', 'false', 'Disables all interactions.'],
                  ['onChange', '(value: number) => void', '—', 'Called with the new internal value after each step.'],
                  ['UNSAFE_className', 'string', '—', 'Escape hatch for adding a custom class to the root element.'],
                  ['UNSAFE_style', 'React.CSSProperties', '—', 'Escape hatch for adding inline styles to the root element.'],
                ].map(([prop, type, def, desc]) => (
                  <tr key={prop} style={{ borderBottom: '1px solid var(--ld-semantic-color-border-subtlest)' }}>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: 13, color: 'var(--ld-semantic-color-text-brand)', whiteSpace: 'nowrap' }}>{prop}</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: 12, color: 'var(--ld-semantic-color-text-subtle)' }}>{type}</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: 12, color: 'var(--ld-semantic-color-text-subtle)', whiteSpace: 'nowrap' }}>{def}</td>
                    <td style={{ padding: '8px 12px', color: 'var(--ld-semantic-color-text-subtle)' }}>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ⑥ Usage */}
        <div className={exStyles.section}>
          <h2 className={exStyles.sectionTitle}>Usage</h2>
          <pre className={exStyles.codeBlock}>{`import { AXQuantityStepper } from '@/components/walmart/AXQuantityStepper';

// Duration — 1h 15m of 2h 00m
<AXQuantityStepper
  labelStyle="duration"
  totalMinutes={75}
  targetMinutes={120}
  minuteStep={15}
  showSecondLabel
  onChange={(mins) => console.log(mins)}
/>

// Amount — 08ea of 24ea
<AXQuantityStepper
  labelStyle="amount"
  count={8}
  totalCount={24}
  showSecondLabel
/>

// Percent — 45%
<AXQuantityStepper
  labelStyle="percent"
  percent={45}
  max={100}
/>`}</pre>
        </div>
      </div>
    </ComponentPageLayout>
  );
}
