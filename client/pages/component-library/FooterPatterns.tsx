import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import { Tag } from '@/components/ui/Tag';
import { DesktopFooter } from '@/components/walmart/DesktopFooter';
import { MwebFooter } from '@/components/walmart/MwebFooter';
import { BottomNav } from '@/components/walmart/BottomNav';
import { useLayoutSettings, type MobileFooterMode } from '@/contexts/LayoutSettingsContext';
import styles from './FooterPatterns.module.css';

type Platform = 'dweb' | 'mweb' | 'native';
type NativeTab = 'shop' | 'heart' | 'user';

const PLATFORM_META: Record<Platform, {
  component: string;
  tag: string;
  tagVariant: 'info' | 'success' | 'neutral';
  description: string;
}> = {
  dweb: {
    component: 'WCP Footer (Dweb)',
    tag: '≥ 1024px',
    tagVariant: 'info',
    description: 'The standard desktop footer. Renders below all page content with a feedback section, full link grid, and copyright. Hidden on screens narrower than 1024px.',
  },
  mweb: {
    component: 'WCP Footer (Mweb)',
    tag: '< 1024px',
    tagVariant: 'success',
    description: 'Single-column stacked layout for mobile browsers. Same content as the desktop footer — feedback, full link list, copyright — collapsed into a scannable vertical list.',
  },
  native: {
    component: 'WCP Bottom Nav',
    tag: 'iOS / Android',
    tagVariant: 'neutral',
    description: 'Glassmorphic bottom navigation bar with animated spring indicator. Three primary destinations: Shop, My Items, and Account. Includes the Sparky AI button.',
  },
};

export default function FooterPatternsPage() {
  const navigate = useNavigate();
  const { mobileFooter, setMobileFooter } = useLayoutSettings();
  const [platform, setPlatform] = useState<Platform>('dweb');
  const [nativeTab, setNativeTab] = useState<NativeTab>('shop');

  const meta = PLATFORM_META[platform];

  function handleSetDefault(mode: MobileFooterMode) {
    setMobileFooter(mode);
  }

  return (
    <ComponentPageLayout
      section="WCP Patterns"
      title="Footer & Bottom Nav"
      description="Three navigation patterns — one for each platform. Use the selector below to set the project-wide mobile default, then preview each component live."
    >

      {/* ── Mobile Default Selector ─────────────────────────────── */}
      <div className={styles.defaultSelector}>
        <div className={styles.defaultSelectorHeader}>
          <div className={styles.defaultSelectorLeft}>
            <h2 className={styles.defaultSelectorTitle}>Mobile default for this project</h2>
            <p className={styles.defaultSelectorDesc}>
              Controls which component renders at mobile breakpoints (&lt;1024px) across all Walmart app pages.
              Persisted to <code>localStorage</code> — changing this updates the live app immediately.
            </p>
          </div>
          <Button
            variant="tertiary"
            size="small"
            onClick={() => navigate('/walmart')}
          >
            Preview in app →
          </Button>
        </div>

        <div className={styles.defaultOptions}>
          <button
            className={[
              styles.defaultOption,
              mobileFooter === 'native' ? styles.defaultOptionActive : '',
            ].join(' ')}
            onClick={() => handleSetDefault('native')}
          >
            <div className={styles.defaultOptionTop}>
              <span className={styles.defaultOptionLabel}>WCP Bottom Nav</span>
              <Tag variant="neutral">iOS / Android</Tag>
              {mobileFooter === 'native' && <Tag variant="success">Active</Tag>}
            </div>
            <p className={styles.defaultOptionDesc}>
              Native-style floating glass nav bar with animated spring indicator. Best for app-like experiences.
            </p>
          </button>

          <button
            className={[
              styles.defaultOption,
              mobileFooter === 'mweb' ? styles.defaultOptionActive : '',
            ].join(' ')}
            onClick={() => handleSetDefault('mweb')}
          >
            <div className={styles.defaultOptionTop}>
              <span className={styles.defaultOptionLabel}>WCP Footer (Mweb)</span>
              <Tag variant="success">{'< 1024px'}</Tag>
              {mobileFooter === 'mweb' && <Tag variant="success">Active</Tag>}
            </div>
            <p className={styles.defaultOptionDesc}>
              Stacked mobile web footer with full link list. Best for web-first or SEO-focused experiences.
            </p>
          </button>
        </div>
      </div>

      {/* ── Platform Component Preview ──────────────────────────── */}
      <div className={styles.previewSection}>
        <div className={styles.previewHeader}>
          <h2 className={styles.previewTitle}>Component preview</h2>
          <ButtonGroup>
            <Button
              variant={platform === 'dweb' ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setPlatform('dweb')}
            >
              WCP Footer (Dweb)
            </Button>
            <Button
              variant={platform === 'mweb' ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setPlatform('mweb')}
            >
              WCP Footer (Mweb)
            </Button>
            <Button
              variant={platform === 'native' ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setPlatform('native')}
            >
              WCP Bottom Nav
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
              <DesktopFooter />
            </div>
          )}

          {platform === 'mweb' && (
            <div className={styles.mwebFrame}>
              {/* contained overrides the desktop display:none */}
              <MwebFooter contained />
            </div>
          )}

          {platform === 'native' && (
            <div className={styles.nativeFrame}>
              <div className={styles.nativePhone}>
                <div className={styles.nativeScreen}>
                  <div className={styles.nativePageContent}>
                    <p className={styles.nativePageHint}>App content above the nav bar</p>
                  </div>
                  <BottomNav
                    contained
                    activeTab={nativeTab}
                    onTabChange={(tab) => setNativeTab(tab)}
                  />
                </div>
              </div>

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
      </div>

      {/* ── Usage table ─────────────────────────────────────────── */}
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
              <span className={styles.usagePlatform}>WCP Footer (Dweb)</span>
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
              <span className={styles.usagePlatform}>WCP Footer (Mweb)</span>
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
              <span className={styles.usagePlatform}>WCP Bottom Nav</span>
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
          <strong>Responsive pairing:</strong> <code>DesktopFooter</code> and <code>MwebFooter</code> each manage their own breakpoint visibility — render both and CSS handles which one shows. The project-level default above controls whether <code>MwebFooter</code> or <code>BottomNav</code> is used at mobile widths in <code>ResponsiveLayout</code>.
        </div>
      </div>
    </ComponentPageLayout>
  );
}
