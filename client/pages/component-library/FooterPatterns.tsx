import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import { Tag } from '@/components/ui/tag';
import { DesktopFooter } from '@/components/walmart/DesktopFooter';
import { MwebFooter } from '@/components/walmart/MwebFooter';
import { BottomNav } from '@/components/walmart/BottomNav';
import styles from './FooterPatterns.module.css';

type Platform = 'dweb' | 'mweb' | 'native';
type NativeTab = 'shop' | 'heart' | 'user';

const PLATFORM_META: Record<Platform, { label: string; tag: string; tagVariant: 'info' | 'success' | 'neutral'; description: string }> = {
  dweb: {
    label: 'Desktop Web',
    tag: '≥ 1024px',
    tagVariant: 'info',
    description: 'The standard desktop footer. Renders below all page content with a feedback section, full link grid, and copyright. Hidden on screens narrower than 1024px.',
  },
  mweb: {
    label: 'Mobile Web',
    tag: '< 1024px',
    tagVariant: 'success',
    description: 'Single-column stacked layout for mobile browsers. Same content as the desktop footer — feedback, full link list, copyright — collapsed into a scannable vertical list.',
  },
  native: {
    label: 'Native App',
    tag: 'iOS / Android',
    tagVariant: 'neutral',
    description: 'Glassmorphic bottom navigation bar with animated spring indicator. Three primary destinations: Shop, My Items, and Account. Includes the Sparky AI button.',
  },
};

export default function FooterPatternsPage() {
  const [platform, setPlatform] = useState<Platform>('dweb');
  const [nativeTab, setNativeTab] = useState<NativeTab>('shop');

  const meta = PLATFORM_META[platform];

  return (
    <div className={styles.page}>
      <PageHeader
        section="Patterns"
        title="Footer & Bottom Navigation"
        description="Three platform-specific footer and navigation patterns. Choose the one that matches your target platform — Desktop Web, Mobile Web, or Native App."
      />

      {/* Platform switcher */}
      <div className={styles.switcher}>
        <ButtonGroup>
          <Button
            variant={platform === 'dweb' ? 'primary' : 'secondary'}
            size="medium"
            onClick={() => setPlatform('dweb')}
          >
            Desktop Web
          </Button>
          <Button
            variant={platform === 'mweb' ? 'primary' : 'secondary'}
            size="medium"
            onClick={() => setPlatform('mweb')}
          >
            Mobile Web
          </Button>
          <Button
            variant={platform === 'native' ? 'primary' : 'secondary'}
            size="medium"
            onClick={() => setPlatform('native')}
          >
            Native
          </Button>
        </ButtonGroup>
      </div>

      {/* Active variant meta */}
      <div className={styles.metaRow}>
        <span className={styles.metaLabel}>{meta.label}</span>
        <Tag variant={meta.tagVariant}>{meta.tag}</Tag>
        <p className={styles.metaDesc}>{meta.description}</p>
      </div>

      {/* Component frame */}
      <div className={styles.frame}>
        {platform === 'dweb' && (
          <div className={styles.dwebFrame}>
            <DesktopFooter />
          </div>
        )}

        {platform === 'mweb' && (
          <div className={styles.mwebFrame}>
            <MwebFooter />
          </div>
        )}

        {platform === 'native' && (
          <div className={styles.nativeFrame}>
            <div className={styles.nativePhone}>
              <div className={styles.nativeScreen}>
                <div className={styles.nativePageContent}>
                  <p className={styles.nativePageHint}>App content sits here above the nav bar</p>
                </div>
                <BottomNav
                  contained
                  activeTab={nativeTab}
                  onTabChange={(tab) => setNativeTab(tab)}
                />
              </div>
            </div>

            {/* Tab state switcher */}
            <div className={styles.nativeTabSwitcher}>
              <p className={styles.nativeTabLabel}>Active tab:</p>
              <ButtonGroup>
                {(['shop', 'heart', 'user'] as NativeTab[]).map((tab) => (
                  <Button
                    key={tab}
                    variant={nativeTab === tab ? 'primary' : 'secondary'}
                    size="small"
                    onClick={() => setNativeTab(tab)}
                  >
                    {tab === 'shop' ? 'Shop' : tab === 'heart' ? 'My Items' : 'Account'}
                  </Button>
                ))}
              </ButtonGroup>
            </div>
          </div>
        )}
      </div>

      {/* Usage table */}
      <div className={styles.usageSection}>
        <h2 className={styles.usageTitle}>Usage Guidelines</h2>
        <div className={styles.usageTable}>
          <div className={styles.usageRow}>
            <div className={styles.usageCell}>
              <span className={styles.usagePlatform}>Desktop Web</span>
              <Tag variant="info">≥ 1024px</Tag>
            </div>
            <div className={styles.usageCell}>
              <code className={styles.usageCode}>{'<DesktopFooter />'}</code>
            </div>
            <div className={styles.usageCell}>
              <span className={styles.usageImport}>@/components/walmart/DesktopFooter</span>
            </div>
          </div>
          <div className={styles.usageRow}>
            <div className={styles.usageCell}>
              <span className={styles.usagePlatform}>Mobile Web</span>
              <Tag variant="success">{'< 1024px'}</Tag>
            </div>
            <div className={styles.usageCell}>
              <code className={styles.usageCode}>{'<MwebFooter />'}</code>
            </div>
            <div className={styles.usageCell}>
              <span className={styles.usageImport}>@/components/walmart/MwebFooter</span>
            </div>
          </div>
          <div className={styles.usageRow}>
            <div className={styles.usageCell}>
              <span className={styles.usagePlatform}>Native App</span>
              <Tag variant="neutral">iOS / Android</Tag>
            </div>
            <div className={styles.usageCell}>
              <code className={styles.usageCode}>{'<BottomNav activeTab="shop" />'}</code>
            </div>
            <div className={styles.usageCell}>
              <span className={styles.usageImport}>@/components/walmart/BottomNav</span>
            </div>
          </div>
        </div>

        <div className={styles.noteBox}>
          <strong>Responsive pairing:</strong> Use <code>DesktopFooter</code> and <code>MwebFooter</code> together — each component handles its own breakpoint visibility via CSS (<code>display: none</code> above/below 1024px), so you can render both and let CSS pick the right one.
        </div>
      </div>
    </div>
  );
}
