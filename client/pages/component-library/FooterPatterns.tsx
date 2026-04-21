import React, { useState } from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import { Tag } from '@/components/ui/Tag';
import { BottomNav } from '@/components/walmart/BottomNav';
import { AndroidBottomNav } from '@/components/walmart/AndroidBottomNav';
import { FloatingFooter } from '@/components/walmart/FloatingFooter';
import { Pause } from '@/components/icons/Pause';
import { Flash } from '@/components/icons/Flash';
import styles from './FooterPatterns.module.css';

type Platform = 'native' | 'android';
type BottomTabId = 'for-you' | 'todays-plan' | 'your-team';

const TAB_LABELS: Record<BottomTabId, string> = {
  'for-you': 'For you',
  'todays-plan': "Today's Plan",
  'your-team': 'Your team',
};
const TAB_ORDER: BottomTabId[] = ['for-you', 'todays-plan', 'your-team'];

const PLATFORM_META: Record<Platform, {
  component: string;
  tag: string;
  tagVariant: 'info' | 'success' | 'neutral';
  description: string;
}> = {
  native: {
    component: 'Bottom Nav (iOS)',
    tag: 'iOS',
    tagVariant: 'neutral',
    description: 'Glassmorphic bottom navigation bar with three primary destinations: For you, Today’s Plan, and Your team. Includes a floating Squiggly AI agent and iOS home indicator.',
  },
  android: {
    component: 'Bottom Nav (Android)',
    tag: 'Android',
    tagVariant: 'neutral',
    description: 'Material-style bottom navigation bar with three tabs: For you, Today’s Plan, and Your team. Includes a floating Squiggly AI agent and Android gesture bar. Active tab highlighted in brand blue.',
  },
};

export default function FooterPatternsPage() {
  const [platform, setPlatform] = useState<Platform>('native');
  const [nativeTab, setNativeTab] = useState<BottomTabId>('for-you');
  const [androidTab, setAndroidTab] = useState<BottomTabId>('for-you');

  const meta = PLATFORM_META[platform];

  return (
    <ComponentPageLayout
      section="AX Patterns"
      title="Bottom Nav"
      description="Native bottom navigation patterns — one for each platform. The project-wide platform is configured in Project Settings."
    >

      {/* ── Platform Component Preview ──────────────────────────── */}
      <div className={styles.previewSection}>
        <div className={styles.previewHeader}>
          <h2 className={styles.previewTitle}>Component preview</h2>
          <ButtonGroup>
            <Button
              variant={platform === 'native' ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setPlatform('native')}
            >
              Bottom Nav (iOS)
            </Button>
            <Button
              variant={platform === 'android' ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setPlatform('android')}
            >
              Bottom Nav (Android)
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
          {platform === 'android' && (
            <div className={styles.nativeFrame}>
              <div className={styles.androidPhone}>
                <div className={styles.androidScreen}>
                  <div className={styles.nativePageContent}>
                    <p className={styles.nativePageHint}>App content above the nav bar</p>
                  </div>
                  <AndroidBottomNav
                    contained
                    activeTab={androidTab}
                    onTabChange={(tab) => setAndroidTab(tab)}
                  />
                </div>
              </div>

              <div className={styles.nativeTabSwitcher}>
                <p className={styles.nativeTabLabel}>Active tab:</p>
                <ButtonGroup>
                  {TAB_ORDER.map((tab) => (
                    <Button
                      key={tab}
                      variant={androidTab === tab ? 'primary' : 'secondary'}
                      size="small"
                      onClick={() => setAndroidTab(tab)}
                    >
                      {TAB_LABELS[tab]}
                    </Button>
                  ))}
                </ButtonGroup>
              </div>
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
                  {TAB_ORDER.map((tab) => (
                    <Button
                      key={tab}
                      variant={nativeTab === tab ? 'primary' : 'secondary'}
                      size="small"
                      onClick={() => setNativeTab(tab)}
                    >
                      {TAB_LABELS[tab]}
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
              <span className={styles.usagePlatform}>Bottom Nav (iOS)</span>
              <Tag variant="neutral">iOS</Tag>
            </div>
            <div className={styles.usageCell}>
              <code className={styles.usageCode}>{'<BottomNav activeTab="for-you" />'}</code>
            </div>
            <div className={styles.usageCell}>
              <span className={styles.usageImport}>@/components/walmart/BottomNav</span>
            </div>
          </div>
          <div className={styles.usageRow}>
            <div className={styles.usageCell}>
              <span className={styles.usagePlatform}>Bottom Nav (Android)</span>
              <Tag variant="neutral">Android</Tag>
            </div>
            <div className={styles.usageCell}>
              <code className={styles.usageCode}>{'<AndroidBottomNav activeTab="for-you" />'}</code>
            </div>
            <div className={styles.usageCell}>
              <span className={styles.usageImport}>@/components/walmart/AndroidBottomNav</span>
            </div>
          </div>
        </div>

        <div className={styles.noteBox}>
          <strong>Usage:</strong> The project-level platform is configured in <strong>Project Settings</strong>. iOS uses a glassmorphic pill bar with spring animation, Android uses a Material-style tab bar with four destinations.
        </div>
      </div>

      {/* ── Floating Action Bar ─────────────────────────────────── */}
      <div className={styles.floatingSection}>
        <div className={styles.previewHeader}>
          <h2 className={styles.previewTitle}>Floating Action Bar</h2>
          <Tag variant="neutral">iOS Glass</Tag>
        </div>
        <p className={styles.metaDesc}>
          A glassmorphic floating pill bar with two action buttons. Uses the same iOS glass kit as the Bottom Nav. Set <code>fixed</code> to pin it to the viewport bottom in production screens.
        </p>
        <div className={styles.floatingDemo}>
          <FloatingFooter
            fixed={false}
            secondaryAction={{ label: 'Pause Delivery', icon: <Pause width={20} height={20} /> }}
            primaryAction={{ label: 'Get it now', subLabel: 'as soon as 37 mins', icon: <Flash width={20} height={20} /> }}
          />
        </div>
      </div>
    </ComponentPageLayout>
  );
}
