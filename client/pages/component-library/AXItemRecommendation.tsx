import React, { useState } from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { AXItemRecommendation, AXItemRecommendationAction } from '@/components/walmart/AXItemRecommendation';
import { RadioGroup, Radio } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/Checkbox';
import styles from '@/components/examples/ExamplePage.module.css';

const DEMO_METRICS = [
  { label: 'Lead time', value: '6 days' },
  { label: 'Avg wk qty', value: '112' },
  { label: 'Avg wk sales', value: '$250' },
];

const DEMO_ATTRIBUTES = [
  { key: 'Key 1', value: 'Value 1' },
  { key: 'Key 2', value: 'Value 2' },
];

function VariantCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className={styles.controlLabel} style={{ marginBottom: '8px' }}>{label}</p>
      <div className={styles.previewFrame} style={{ maxWidth: '375px' }}>
        {children}
      </div>
    </div>
  );
}

export default function AXItemRecommendationPage() {
  const [trailingAction, setTrailingAction] = useState<AXItemRecommendationAction>('navigate');
  const [showInsight, setShowInsight] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [showMetrics, setShowMetrics] = useState(true);
  const [showLocation, setShowLocation] = useState(true);
  const [checked, setChecked] = useState(false);

  return (
    <ComponentPageLayout
      section="MyWalmart Components"
      title="Item Recommendation"
      description="A retail item recommendation card displaying pricing, metrics, location, an AI insight banner, optional alert, and dual action buttons. Supports four trailing action variants."
    >
      <div className={styles.pageGap}>

        {/* ① Interactive Demo */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Interactive Demo</h2>
          <p className={styles.desc}>
            Use the controls below to explore the component's props and variants.
          </p>

          <div className={styles.controlsRow}>
            <span className={styles.controlLabel}>Trailing action:</span>
            <RadioGroup
              value={trailingAction}
              onValueChange={(v) => setTrailingAction(v as AXItemRecommendationAction)}
              orientation="horizontal"
              className={styles.radioGroupRow}
            >
              <Radio value="none" label="None" />
              <Radio value="navigate" label="Navigate" />
              <Radio value="linkButton" label="Link Button" />
              <Radio value="checkbox" label="Checkbox" />
            </RadioGroup>
          </div>

          <div className={styles.checkboxRow}>
            <Checkbox checked={showInsight} onCheckedChange={(v) => setShowInsight(Boolean(v))} label="AI Insight" />
            <Checkbox checked={showAlert} onCheckedChange={(v) => setShowAlert(Boolean(v))} label="Alert" />
            <Checkbox checked={showMetrics} onCheckedChange={(v) => setShowMetrics(Boolean(v))} label="Metrics" />
            <Checkbox checked={showLocation} onCheckedChange={(v) => setShowLocation(Boolean(v))} label="Location" />
          </div>

          <div className={styles.previewFrame} style={{ maxWidth: '375px' }}>
            <AXItemRecommendation
              eyebrowText="Eyebrow text"
              tagLabel="Tag label"
              trailingAction={trailingAction}
              linkButtonLabel="Button"
              checked={checked}
              onCheckedChange={setChecked}
              itemName="ITEM NAME"
              itemColor="Color"
              price="$10.98 ea"
              wasPrice="$11.98"
              pricingDetails="Sold online by Walmart for $4.97, avg price"
              unitPrice="$1.99/fl oz"
              attributes={DEMO_ATTRIBUTES}
              metrics={showMetrics ? DEMO_METRICS : []}
              locationCode={showLocation ? 'J2-7-0001' : undefined}
              additionalLocations={showLocation ? 3 : undefined}
              showInsight={showInsight}
              insightText="Data-based intelligence to support action."
              showAlert={showAlert}
              alertMessage="Alert message"
              alertActionLabel="Action button"
              alternateLabel="Alternate"
              preferredLabel="Preferred"
            />
          </div>
        </div>

        {/* ② Trailing Action Variants */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Trailing Action Variants</h2>
          <p className={styles.desc}>
            Four trailing action types: Navigate (chevron), Link Button, Checkbox, and None.
          </p>

          <div className={styles.variantGrid}>
            <VariantCard label="Navigate">
              <AXItemRecommendation
                eyebrowText="Eyebrow text"
                tagLabel="Tag label"
                trailingAction="navigate"
                itemName="ITEM NAME"
                itemColor="Color"
                price="$10.98 ea"
                wasPrice="$11.98"
                pricingDetails="Sold online by Walmart for $4.97, avg price"
                unitPrice="$1.99/fl oz"
                attributes={DEMO_ATTRIBUTES}
                metrics={DEMO_METRICS}
                locationCode="J2-7-0001"
                additionalLocations={3}
                showInsight
                alternateLabel="Alternate"
                preferredLabel="Preferred"
              />
            </VariantCard>

            <VariantCard label="Link Button">
              <AXItemRecommendation
                eyebrowText="Eyebrow text"
                tagLabel="Tag label"
                trailingAction="linkButton"
                linkButtonLabel="Button"
                itemName="ITEM NAME"
                itemColor="Color"
                price="$10.98 ea"
                wasPrice="$11.98"
                pricingDetails="Sold online by Walmart for $4.97, avg price"
                unitPrice="$1.99/fl oz"
                attributes={DEMO_ATTRIBUTES}
                metrics={DEMO_METRICS}
                locationCode="J2-7-0001"
                additionalLocations={3}
                showInsight
                alternateLabel="Alternate"
                preferredLabel="Preferred"
              />
            </VariantCard>

            <VariantCard label="Checkbox">
              <AXItemRecommendation
                eyebrowText="Eyebrow text"
                tagLabel="Tag label"
                trailingAction="checkbox"
                itemName="ITEM NAME"
                itemColor="Color"
                price="$10.98 ea"
                wasPrice="$11.98"
                pricingDetails="Sold online by Walmart for $4.97, avg price"
                unitPrice="$1.99/fl oz"
                attributes={DEMO_ATTRIBUTES}
                metrics={DEMO_METRICS}
                locationCode="J2-7-0001"
                additionalLocations={3}
                showInsight
                alternateLabel="Alternate"
                preferredLabel="Preferred"
              />
            </VariantCard>

            <VariantCard label="None">
              <AXItemRecommendation
                eyebrowText="Eyebrow text"
                tagLabel="Tag label"
                trailingAction="none"
                itemName="ITEM NAME"
                itemColor="Color"
                price="$10.98 ea"
                wasPrice="$11.98"
                pricingDetails="Sold online by Walmart for $4.97, avg price"
                unitPrice="$1.99/fl oz"
                attributes={DEMO_ATTRIBUTES}
                metrics={DEMO_METRICS}
                locationCode="J2-7-0001"
                additionalLocations={3}
                showInsight
                alternateLabel="Alternate"
                preferredLabel="Preferred"
              />
            </VariantCard>
          </div>
        </div>

        {/* ③ States */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>States</h2>
          <p className={styles.desc}>
            The card can surface an optional alert row for time-sensitive information, and the AI insight banner is independently togglable.
          </p>
          <div className={styles.variantGrid}>
            <VariantCard label="With alert">
              <AXItemRecommendation
                eyebrowText="Eyebrow text"
                tagLabel="Tag label"
                trailingAction="navigate"
                itemName="ITEM NAME"
                itemColor="Color"
                price="$10.98 ea"
                wasPrice="$11.98"
                attributes={DEMO_ATTRIBUTES}
                metrics={DEMO_METRICS}
                locationCode="J2-7-0001"
                showInsight
                showAlert
                alertMessage="Alert message"
                alertActionLabel="Action button"
                alternateLabel="Alternate"
                preferredLabel="Preferred"
              />
            </VariantCard>
            <VariantCard label="No insight, no alert">
              <AXItemRecommendation
                eyebrowText="Eyebrow text"
                tagLabel="Tag label"
                trailingAction="navigate"
                itemName="ITEM NAME"
                itemColor="Color"
                price="$10.98 ea"
                wasPrice="$11.98"
                attributes={DEMO_ATTRIBUTES}
                metrics={DEMO_METRICS}
                locationCode="J2-7-0001"
                showInsight={false}
                showAlert={false}
                alternateLabel="Alternate"
                preferredLabel="Preferred"
              />
            </VariantCard>
          </div>
        </div>

        {/* ④ Anatomy */}
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
                  ['Header row', 'Eyebrow text (body/small), optional Tag chip, and trailing action (navigate chevron, link button, or checkbox).'],
                  ['Item detail card', 'White surface card with thumbnail image, item name, color, price with strikethrough WAS price, pricing details, unit price, and key-value attribute pairs.'],
                  ['Metrics row', 'White surface row of up to 3 metrics (label + bold value) separated by vertical dividers.'],
                  ['Location row', 'Map pin icon + location code (bold). Optional "+X more locations" link button on the right.'],
                  ['AI Insight banner', 'Light brand-blue banner with MagicFill gradient icon and insight text. Toggle with showInsight.'],
                  ['Alert', 'LD 3.5 Alert in error variant with message and optional action link. Toggle with showAlert.'],
                  ['Action buttons', 'Two full-width buttons: Secondary ("Alternate") + Primary ("Preferred").'],
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

        {/* ⑤ Component Props */}
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
                  ['eyebrowText', 'string', "'Eyebrow text'", 'Small label above the item card.'],
                  ['tagLabel', 'string', '—', 'Optional Tag chip label shown next to the eyebrow.'],
                  ['trailingAction', "'none' | 'navigate' | 'linkButton' | 'checkbox'", "'navigate'", 'Type of trailing element in the header row.'],
                  ['linkButtonLabel', 'string', "'Button'", 'Label for the LinkButton trailing action.'],
                  ['onLinkButtonClick', '() => void', '—', 'Callback for the LinkButton trailing action.'],
                  ['checked', 'boolean', 'false', 'Checked state for the Checkbox trailing action.'],
                  ['onCheckedChange', '(checked: boolean) => void', '—', 'Callback when checkbox state changes.'],
                  ['onNavigate', '() => void', '—', 'Callback for the navigate chevron trailing action.'],
                  ['imageSrc', 'string', '—', 'URL for the item thumbnail. A placeholder box renders when omitted.'],
                  ['imageAlt', 'string', "''", 'Alt text for the item thumbnail.'],
                  ['itemName', 'string', "'ITEM NAME'", 'Bold item name in the detail card.'],
                  ['itemColor', 'string', "'Color'", 'Color/variant descriptor below the item name.'],
                  ['price', 'string', "'$10.98 ea'", 'Current price string.'],
                  ['wasPrice', 'string', '—', 'Strike-through WAS price string.'],
                  ['pricingDetails', 'string', '—', 'Optional secondary pricing info (e.g. "Sold online by Walmart…").'],
                  ['unitPrice', 'string', '—', 'Optional unit price (e.g. "$1.99/fl oz").'],
                  ['attributes', 'Array<{ key: string; value: string }>', '[]', 'Key-value attribute pairs shown below the price.'],
                  ['metrics', 'AXItemRecommendationMetric[]', '[]', 'Up to 3 metrics ({ label, value }) shown in the metrics row.'],
                  ['locationCode', 'string', '—', 'Aisle or location code shown with a map pin icon.'],
                  ['additionalLocations', 'number', '—', 'Count for "+X more locations" link. Only shown when locationCode is provided.'],
                  ['onMoreLocations', '() => void', '—', 'Callback for "+X more locations" button.'],
                  ['showInsight', 'boolean', 'true', 'Whether to render the AI insight banner.'],
                  ['insightText', 'string', "'Data-based intelligence…'", 'Text content of the AI insight banner.'],
                  ['showAlert', 'boolean', 'false', 'Whether to render the alert row.'],
                  ['alertMessage', 'string', '—', 'Alert message text.'],
                  ['alertActionLabel', 'string', '—', 'Label for the alert action link.'],
                  ['onAlertAction', '() => void', '—', 'Callback for the alert action.'],
                  ['alternateLabel', 'string', "'Alternate'", 'Label for the secondary action button.'],
                  ['preferredLabel', 'string', "'Preferred'", 'Label for the primary action button.'],
                  ['onAlternate', '() => void', '—', 'Callback for the secondary action button.'],
                  ['onPreferred', '() => void', '—', 'Callback for the primary action button.'],
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

        {/* ⑥ Usage */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Usage</h2>
          <pre className={styles.codeBlock}>{`import { AXItemRecommendation } from '@/components/walmart/AXItemRecommendation';

<AXItemRecommendation
  eyebrowText="Replenishment"
  tagLabel="Offsite"
  trailingAction="navigate"
  onNavigate={() => navigate('/item/123')}
  itemName="TIDE PODS LAUNDRY DETERGENT"
  itemColor="Spring Meadow"
  price="$10.98 ea"
  wasPrice="$11.98"
  pricingDetails="Sold online by Walmart for $4.97, avg price"
  unitPrice="$1.99/fl oz"
  attributes={[
    { key: 'Key 1', value: 'Value 1' },
    { key: 'Key 2', value: 'Value 2' },
  ]}
  metrics={[
    { label: 'Lead time', value: '6 days' },
    { label: 'Avg wk qty', value: '112' },
    { label: 'Avg wk sales', value: '$250' },
  ]}
  locationCode="J2-7-0001"
  additionalLocations={3}
  showInsight
  insightText="Data-based intelligence to support action."
  alternateLabel="Alternate"
  preferredLabel="Preferred"
  onAlternate={() => handleAlternate()}
  onPreferred={() => handlePreferred()}
/>`}</pre>
        </div>

        {/* ⑦ Guidelines */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Guidelines</h2>
          <div className={styles.guidelinesGrid}>
            {[
              { type: 'do', text: 'Use the navigate trailing action as the default — it promotes discoverability by signaling that more item detail is available.' },
              { type: 'do', text: 'Always provide metrics when quantitative context is available. Metrics help managers make faster, data-informed decisions.' },
              { type: 'do', text: 'Use the AI insight banner when the recommendation is driven by data models. Keep insight text to a single sentence.' },
              { type: 'dont', text: "Don't use more than 3 metrics — the row becomes crowded and hard to scan on mobile." },
              { type: 'dont', text: "Don't omit both action buttons. The card always requires at least a primary (Preferred) action." },
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
