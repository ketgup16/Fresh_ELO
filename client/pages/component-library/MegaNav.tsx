import React, { useState } from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { Tag } from '@/components/ui/Tag';
import { Button } from '@/components/ui/Button';
import { MobileMenuPanel } from '@/components/walmart/MobileMenuPanel';
import styles from './MegaNav.module.css';

export default function MegaNavPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <ComponentPageLayout
      section="AX Patterns"
      title="Mega Nav"
      description="A full-screen sliding menu panel used for primary mobile navigation. Provides access to account management, browsing, lists, and support links with a backdrop overlay."
    >

      {/* ── Interactive Demo ── */}
      <div className={styles.previewSection}>
        <div className={styles.previewHeader}>
          <h2 className={styles.previewTitle}>Interactive Demo</h2>
          <Tag variant="info">Mobile navigation</Tag>
        </div>

        <p className={styles.previewDesc}>
          The Mega Nav slides in from the left as a full-screen overlay. It supports keyboard navigation (Escape to close), body scroll lock when open, and a backdrop tap to dismiss.
        </p>

        <div className={styles.demoTrigger}>
          <Button variant="secondary" size="medium" onClick={() => setIsMenuOpen(true)}>
            Open Mega Nav
          </Button>
        </div>

        <MobileMenuPanel isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </div>

      {/* ── Anatomy ── */}
      <div className={styles.guidelinesSection}>
        <h2 className={styles.guidelinesTitle}>Anatomy</h2>
        <p className={styles.previewDesc}>
          The Mega Nav is composed of distinct zones stacked vertically inside a scrollable panel.
        </p>
        <div className={styles.anatomyList}>
          <div className={styles.anatomyItem}>
            <span className={styles.anatomyNumber}>1</span>
            <div>
              <strong className={styles.anatomyLabel}>Header</strong>
              <p className={styles.anatomyDesc}>Contains the Walmart+ logo, a personalised greeting, and the close (X) button.</p>
            </div>
          </div>
          <div className={styles.anatomyItem}>
            <span className={styles.anatomyNumber}>2</span>
            <div>
              <strong className={styles.anatomyLabel}>Language selector row</strong>
              <p className={styles.anatomyDesc}>A tappable row with a globe icon that opens the language settings. Indicates the current language.</p>
            </div>
          </div>
          <div className={styles.anatomyItem}>
            <span className={styles.anatomyNumber}>3</span>
            <div>
              <strong className={styles.anatomyLabel}>Walmart Cash CTA</strong>
              <p className={styles.anatomyDesc}>A prominent banner row that drives users to the Walmart Cash rewards flow.</p>
            </div>
          </div>
          <div className={styles.anatomyItem}>
            <span className={styles.anatomyNumber}>4</span>
            <div>
              <strong className={styles.anatomyLabel}>Grouped menu sections</strong>
              <p className={styles.anatomyDesc}>Links are grouped by category (Account, Help, Lists, Browse, Feedback) and separated by Divider components.</p>
            </div>
          </div>
          <div className={styles.anatomyItem}>
            <span className={styles.anatomyNumber}>5</span>
            <div>
              <strong className={styles.anatomyLabel}>Backdrop overlay</strong>
              <p className={styles.anatomyDesc}>A semi-transparent backdrop covers the rest of the screen. Tapping it closes the panel.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Pattern Guidelines ── */}
      <div className={styles.guidelinesSection}>
        <h2 className={styles.guidelinesTitle}>Pattern Guidelines</h2>
        <div className={styles.guidelinesGrid}>
          <div className={styles.guidelineCard}>
            <h3 className={styles.guidelineCardTitle}>Full-screen overlay</h3>
            <p className={styles.guidelineCardDesc}>
              The panel slides in from the left and covers the full viewport height. Use <code>position: fixed</code> with <code>inset: 0</code> to ensure it covers the entire screen including safe areas on mobile devices.
            </p>
          </div>
          <div className={styles.guidelineCard}>
            <h3 className={styles.guidelineCardTitle}>Grouped links with dividers</h3>
            <p className={styles.guidelineCardDesc}>
              Navigation links are grouped by category and separated using the <code>Divider</code> LD component. Never combine unrelated links without a visual separator.
            </p>
          </div>
          <div className={styles.guidelineCard}>
            <h3 className={styles.guidelineCardTitle}>Keyboard accessible</h3>
            <p className={styles.guidelineCardDesc}>
              The panel listens for <code>Escape</code> to close and sets <code>aria-hidden</code> when closed. The close button must always have an <code>aria-label</code> for screen readers.
            </p>
          </div>
          <div className={styles.guidelineCard}>
            <h3 className={styles.guidelineCardTitle}>Body scroll lock</h3>
            <p className={styles.guidelineCardDesc}>
              When the Mega Nav is open, <code>document.body.style.overflow = 'hidden'</code> prevents the background page from scrolling. This is restored on close via a <code>useEffect</code> cleanup.
            </p>
          </div>
        </div>
      </div>

      {/* ── Import Reference ── */}
      <div className={styles.usageSection}>
        <h2 className={styles.usageTitle}>Import Reference</h2>
        <div className={styles.usageTable}>
          <div className={styles.usageRowHeader}>
            <span>Component</span>
            <span>Usage</span>
            <span>Import path</span>
          </div>
          <div className={styles.usageRow}>
            <div className={styles.usageCell}>
              <span className={styles.usagePlatform}>MobileMenuPanel</span>
              <Tag variant="info">Mega Nav</Tag>
            </div>
            <div className={styles.usageCell}>
              <code className={styles.usageCode}>{'<MobileMenuPanel />'}</code>
            </div>
            <div className={styles.usageCell}>
              <span className={styles.usageImport}>@/components/walmart/MobileMenuPanel</span>
            </div>
          </div>
          <div className={styles.usageRow}>
            <div className={styles.usageCell}>
              <span className={styles.usagePlatform}>AccountSideNav</span>
              <Tag variant="info">Account pages</Tag>
            </div>
            <div className={styles.usageCell}>
              <code className={styles.usageCode}>{'<AccountSideNav />'}</code>
            </div>
            <div className={styles.usageCell}>
              <span className={styles.usageImport}>@/components/walmart/AccountSideNav</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Props Reference ── */}
      <div className={styles.usageSection}>
        <h2 className={styles.usageTitle}>Props</h2>
        <div className={styles.usageTable}>
          <div className={styles.usageRowHeader}>
            <span>Prop</span>
            <span>Type</span>
            <span>Description</span>
          </div>
          <div className={styles.usageRow}>
            <div className={styles.usageCell}>
              <code className={styles.usageCode}>isOpen</code>
            </div>
            <div className={styles.usageCell}>
              <code className={styles.usageCode}>boolean</code>
            </div>
            <div className={styles.usageCell}>
              <span className={styles.usageImport}>Controls whether the panel is visible.</span>
            </div>
          </div>
          <div className={styles.usageRow}>
            <div className={styles.usageCell}>
              <code className={styles.usageCode}>onClose</code>
            </div>
            <div className={styles.usageCell}>
              <code className={styles.usageCode}>{'() => void'}</code>
            </div>
            <div className={styles.usageCell}>
              <span className={styles.usageImport}>Called when the user closes the panel (backdrop tap, Escape key, or close button).</span>
            </div>
          </div>
        </div>
      </div>
    </ComponentPageLayout>
  );
}
