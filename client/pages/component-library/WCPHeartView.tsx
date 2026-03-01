import React from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { WCPHeartView } from '@/components/walmart/WCPHeartView';
import styles from './WCPHeartView.module.css';

function StateLabel({ children }: { children: React.ReactNode }) {
  return <div className={styles.stateLabel}>{children}</div>;
}

function DemoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className={styles.demoCard}>
      <h3 className={styles.cardTitle}>{title}</h3>
      {children}
    </div>
  );
}

export default function WCPHeartViewPage() {
  const [controlled, setControlled] = React.useState(false);

  return (
    <div className={styles.page}>
      <PageHeader
        section="WCP Components"
        title="Heart View"
        description="A circular toggle button for adding items to a favorites list. Similar to the Floating Button but acts as a toggle. On desktop (900px+) it shows a callout on hover; on mobile it triggers a snackbar after toggling."
      />

      <div className={styles.content}>

        {/* ── States showcase ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>States</h2>
          <p className={styles.sectionDesc}>
            The Heart View has two size variants and five interaction states. Hover over the inactive variants on desktop to see the callout tooltip.
          </p>

          <div className={styles.statesGrid}>
            {/* Medium — desktop size */}
            <DemoCard title="Medium (desktop 900px+)">
              <div className={styles.stateRow}>
                <div className={styles.stateItem}>
                  <StateLabel>Enabled</StateLabel>
                  <WCPHeartView size="medium" listName="Amy's List" />
                </div>
                <div className={styles.stateItem}>
                  <StateLabel>Activated</StateLabel>
                  <WCPHeartView size="medium" defaultActivated listName="Amy's List" />
                </div>
                <div className={styles.stateItem}>
                  <StateLabel>Disabled</StateLabel>
                  <WCPHeartView size="medium" disabled listName="Amy's List" />
                </div>
                <div className={styles.stateItem}>
                  <StateLabel>Disabled + Active</StateLabel>
                  <WCPHeartView size="medium" disabled defaultActivated listName="Amy's List" />
                </div>
              </div>
            </DemoCard>

            {/* Small — mobile size */}
            <DemoCard title="Small (mobile <900px)">
              <div className={styles.stateRow}>
                <div className={styles.stateItem}>
                  <StateLabel>Enabled</StateLabel>
                  <WCPHeartView size="small" listName="Amy's List" />
                </div>
                <div className={styles.stateItem}>
                  <StateLabel>Activated</StateLabel>
                  <WCPHeartView size="small" defaultActivated listName="Amy's List" />
                </div>
                <div className={styles.stateItem}>
                  <StateLabel>Disabled</StateLabel>
                  <WCPHeartView size="small" disabled listName="Amy's List" />
                </div>
                <div className={styles.stateItem}>
                  <StateLabel>Disabled + Active</StateLabel>
                  <WCPHeartView size="small" disabled defaultActivated listName="Amy's List" />
                </div>
              </div>
            </DemoCard>
          </div>
        </section>

        {/* ── Responsive (no size prop) ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Responsive (default)</h2>
          <p className={styles.sectionDesc}>
            When no <code>size</code> prop is set, the button uses <strong>small (32px)</strong> below 900px and <strong>medium (40px)</strong> at 900px and above — matching product tile usage.
          </p>
          <div className={styles.responsiveDemo}>
            <div className={styles.responsiveItem}>
              <StateLabel>Inactive</StateLabel>
              <WCPHeartView listName="Amy's List" onViewList={() => alert('View list')} />
            </div>
            <div className={styles.responsiveItem}>
              <StateLabel>Activated</StateLabel>
              <WCPHeartView defaultActivated listName="Amy's List" onViewList={() => alert('View list')} />
            </div>
          </div>
        </section>

        {/* ── Controlled example ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Controlled</h2>
          <p className={styles.sectionDesc}>
            Use the <code>activated</code> + <code>onChange</code> props for a controlled component.
            Current state: <strong>{controlled ? 'Favorited' : 'Not favorited'}</strong>
          </p>
          <div className={styles.controlledDemo}>
            <WCPHeartView
              activated={controlled}
              onChange={setControlled}
              listName="Amy's List"
              onViewList={() => alert('Navigate to list')}
            />
            <button
              type="button"
              className={styles.resetBtn}
              onClick={() => setControlled(false)}
            >
              Reset
            </button>
          </div>
        </section>

        {/* ── Product tile example ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>In Context — Product Tile</h2>
          <p className={styles.sectionDesc}>
            The Heart View is typically overlaid on a product tile in the top-right corner. Below is a simplified tile example showing the positioning pattern.
          </p>
          <div className={styles.tilesRow}>
            {[false, true, false].map((initial, i) => (
              <MockProductTile key={i} initialFavorited={initial} />
            ))}
          </div>
        </section>

        {/* ── Behavior notes ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Behavior</h2>
          <div className={styles.behaviorGrid}>
            <div className={styles.behaviorCard}>
              <h3 className={styles.behaviorTitle}>Desktop (900px+)</h3>
              <ul className={styles.behaviorList}>
                <li>Hover inactive → "Add to favorites" callout on left</li>
                <li>Hover activated → "Saved to favorites: [list]" callout with View link</li>
                <li>Click to toggle → transient callout ("Saved…" / "Removed…") for 2 seconds</li>
                <li>No snackbar on desktop</li>
              </ul>
            </div>
            <div className={styles.behaviorCard}>
              <h3 className={styles.behaviorTitle}>Mobile (&lt;900px)</h3>
              <ul className={styles.behaviorList}>
                <li>No hover callout (touch device)</li>
                <li>Click to toggle → snackbar fires at bottom center</li>
                <li>Add: "Saved to favorites: [list]" + View action</li>
                <li>Remove: "Removed from favorites: [list]"</li>
                <li>Snackbar auto-dismisses after 3.5s (configurable)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── Code usage ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Usage</h2>
          <pre className={styles.codeBlock}>{`import { WCPHeartView } from '@/components/walmart/WCPHeartView';

// Uncontrolled
<WCPHeartView
  listName="Amy's List"
  onViewList={() => navigate('/favorites')}
/>

// Controlled
<WCPHeartView
  activated={isFavorited}
  onChange={setIsFavorited}
  listName="Amy's List"
  onViewList={() => navigate('/favorites')}
  snackbarDuration={3500}
/>`}</pre>
        </section>

      </div>
    </div>
  );
}

// ── Mock product tile for context demo ──────────────────
function MockProductTile({ initialFavorited }: { initialFavorited: boolean }) {
  const [fav, setFav] = React.useState(initialFavorited);
  return (
    <div className={styles.tile}>
      <div className={styles.tileImage} aria-hidden="true">
        <div className={styles.tilePlaceholder} />
      </div>
      <div className={styles.tileHeartWrap}>
        <WCPHeartView
          activated={fav}
          onChange={setFav}
          listName="Amy's List"
          onViewList={() => {}}
        />
      </div>
      <div className={styles.tileMeta}>
        <div className={styles.tilePrice}>$24.97</div>
        <div className={styles.tileName}>Product name here</div>
      </div>
    </div>
  );
}
