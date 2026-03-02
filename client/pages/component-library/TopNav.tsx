import React, { useState } from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import { Tag } from '@/components/ui/Tag';
import { DesktopHeader } from '@/components/walmart/DesktopHeader';
import { MobileHeader } from '@/components/walmart/MobileHeader';
import styles from './TopNav.module.css';

type Platform = 'dweb' | 'mweb';

const PLATFORM_META: Record<Platform, {
  component: string;
  tag: string;
  tagVariant: 'info' | 'success';
  description: string;
}> = {
  dweb: {
    component: 'Desktop Top Nav',
    tag: '≥ 1024px',
    tagVariant: 'info',
    description: 'Full desktop header with Walmart logo, search bar, account dropdown, and primary navigation links. Renders on screens 1024px and wider.',
  },
  mweb: {
    component: 'Mobile Top Nav',
    tag: '< 1024px',
    tagVariant: 'success',
    description: 'Compact mobile header with hamburger menu, Walmart logo, search icon, and cart/account actions. Designed for screens narrower than 1024px.',
  },
};

export default function TopNavPage() {
  const [platform, setPlatform] = useState<Platform>('dweb');
  const meta = PLATFORM_META[platform];

  return (
    <ComponentPageLayout
      section="WCP Patterns"
      title="Top Nav"
      description="Two WCP top navigation patterns — one for desktop web and one for mobile web. Both share the same Walmart brand identity and navigation hierarchy."
    >

      {/* ── Platform Component Preview ── */}
      <div className={styles.previewSection}>
        <div className={styles.previewHeader}>
          <h2 className={styles.previewTitle}>Component preview</h2>
          <ButtonGroup>
            <Button
              variant={platform === 'dweb' ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setPlatform('dweb')}
            >
              Desktop Top Nav
            </Button>
            <Button
              variant={platform === 'mweb' ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setPlatform('mweb')}
            >
              Mobile Top Nav
            </Button>
          </ButtonGroup>
        </div>

        {/* Meta row */}
        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>{meta.component}</span>
          <Tag variant={meta.tagVariant}>{meta.tag}</Tag>
          <p className={styles.metaDesc}>{meta.description}</p>
        </div>

        {/* Component frame */}
        <div className={styles.frame}>
          {platform === 'dweb' && (
            <div className={styles.dwebFrame}>
              <DesktopHeader />
            </div>
          )}
          {platform === 'mweb' && (
            <div className={styles.mwebFrame}>
              <MobileHeader />
            </div>
          )}
        </div>
      </div>

      {/* ── Usage table ── */}
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
              <span className={styles.usagePlatform}>Desktop Top Nav</span>
              <Tag variant="info">≥ 1024px</Tag>
            </div>
            <div className={styles.usageCell}>
              <code className={styles.usageCode}>{'<DesktopHeader />'}</code>
            </div>
            <div className={styles.usageCell}>
              <span className={styles.usageImport}>@/components/walmart/DesktopHeader</span>
            </div>
          </div>
          <div className={styles.usageRow}>
            <div className={styles.usageCell}>
              <span className={styles.usagePlatform}>Mobile Top Nav</span>
              <Tag variant="success">{'< 1024px'}</Tag>
            </div>
            <div className={styles.usageCell}>
              <code className={styles.usageCode}>{'<MobileHeader />'}</code>
            </div>
            <div className={styles.usageCell}>
              <span className={styles.usageImport}>@/components/walmart/MobileHeader</span>
            </div>
          </div>
        </div>

        <div className={styles.noteBox}>
          <strong>Responsive pairing:</strong> <code>DesktopHeader</code> and <code>MobileHeader</code> each manage their own breakpoint visibility via CSS — render both and the correct one will display automatically based on viewport width.
        </div>
      </div>
    </ComponentPageLayout>
  );
}
