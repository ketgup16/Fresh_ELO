import React, { useState, useEffect } from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import { Chip } from '@/components/ui/Chip';
import { Divider } from '@/components/ui/Divider';
import { Tag } from '@/components/ui/Tag';
import { TextField } from '@/components/ui/TextField';
import { MobileTopNav, type MobileTopNavVariant } from '@/components/walmart/MobileTopNav';
import * as Icons from '@/components/icons';
import styles from './TopNav.module.css';

const ICON_NAMES: string[] = Object.keys(Icons).sort();

function renderIcon(name: string): React.ReactNode {
  const Comp = (Icons as Record<string, React.ComponentType>)[name];
  return Comp ? <Comp /> : <Icons.Placeholder />;
}

type Platform = 'native' | 'native-tablet';

const PLATFORM_META: Record<Platform, {
  component: string;
  tag: string;
  tagVariant: 'info' | 'success' | 'neutral';
  description: string;
}> = {
  native: {
    component: 'Native Mobile',
    tag: 'Phone',
    tagVariant: 'neutral',
    description: 'Native app-style app header for phones. Supports blue (home) and white (search/inner) color variants with menu icon, title, action buttons, and search bar.',
  },
  'native-tablet': {
    component: 'Native Tablet',
    tag: 'iPad / Android Tablet',
    tagVariant: 'neutral',
    description: 'Native app-style app header for tablets (> 900px). Supports iOS (centered title) and Android (left-aligned title). Adds an optional 4th trailing action button.',
  },
};

export default function TopNavPage() {
  const [platform, setPlatform] = useState<Platform>('native');
  const [nativeVariant, setNativeVariant] = useState<MobileTopNavVariant>('blue');
  const [nativeTitle, setNativeTitle] = useState('Title');
  const [nativeSubtitle, setNativeSubtitle] = useState('Subtitle');
  const [showNativeSubtitle, setShowNativeSubtitle] = useState(false);
  const [showNativeAction1, setShowNativeAction1] = useState(true);
  const [showNativeAction2, setShowNativeAction2] = useState(false);
  const [showNativeAction3, setShowNativeAction3] = useState(false);
  const [showNativeAction4, setShowNativeAction4] = useState(false);
  const [showNativeSearchBar, setShowNativeSearchBar] = useState(false);
  const [showNativeAvatarButton, setShowNativeAvatarButton] = useState(true);
  const [menuIconName, setMenuIconName] = useState('Menu');
  const [action1IconName, setAction1IconName] = useState('Chat');
  const [action2IconName, setAction2IconName] = useState('Placeholder');
  const [action3IconName, setAction3IconName] = useState('Placeholder');
  const [action4IconName, setAction4IconName] = useState('Placeholder');
  const [nativeOSPlatform, setNativeOSPlatform] = useState<'ios' | 'android'>('ios');

  // Auto-switch between native-mobile and native-tablet based on viewport width
  useEffect(() => {
    const pickPlatform = () => {
      setPlatform(prev => {
        return window.innerWidth > 900 ? 'native-tablet' : 'native';
      });
    };
    pickPlatform();
    window.addEventListener('resize', pickPlatform);
    return () => window.removeEventListener('resize', pickPlatform);
  }, []);

  const meta = PLATFORM_META[platform];

  // Shared properties panel content for native variants
  function renderNativeControls() {
    return (
      <div className={styles.nativeControls}>
        <div className={styles.nativeControlRow}>
          <select
            className={styles.iconSelect}
            value={menuIconName}
            onChange={(e) => setMenuIconName(e.target.value)}
          >
            {[['Menu', 'Menu'], ['ChevronLeft', 'ChevronLeft'], ['X', 'Close']].map(([val, label]) => (
              <option key={val} value={val}>{val === menuIconName ? `✓ ${label}` : label}</option>
            ))}
          </select>
        </div>
        <div className={styles.nativeControlRow}>
          <TextField
            label="Title"
            size="small"
            value={nativeTitle}
            onChange={(e) => setNativeTitle(e.target.value)}
          />
        </div>
        <div className={styles.nativeControlRow}>
          <span className={styles.nativeControlLabel}>Subtitle</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Chip size="small" selected={showNativeSubtitle} onClick={() => setShowNativeSubtitle(true)}>On</Chip>
            <Chip size="small" selected={!showNativeSubtitle} onClick={() => setShowNativeSubtitle(false)}>Off</Chip>
          </div>
          {showNativeSubtitle && (
            <TextField
              label="Subtitle text"
              size="small"
              value={nativeSubtitle}
              onChange={(e) => setNativeSubtitle(e.target.value)}
            />
          )}
        </div>
        <Divider />
        <div className={styles.nativeControlRow}>
          <span className={styles.nativeControlLabel}>Action button 1</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Chip size="small" selected={showNativeAction1} onClick={() => setShowNativeAction1(true)}>On</Chip>
            <Chip size="small" selected={!showNativeAction1} onClick={() => setShowNativeAction1(false)}>Off</Chip>
          </div>
          <select
            className={styles.iconSelect}
            value={action1IconName}
            onChange={(e) => setAction1IconName(e.target.value)}
          >
            {ICON_NAMES.map(n => (
              <option key={n} value={n}>{n === action1IconName ? `✓ ${n}` : n}</option>
            ))}
          </select>
        </div>
        <div className={styles.nativeControlRow}>
          <span className={styles.nativeControlLabel}>Action button 2</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Chip size="small" selected={showNativeAction2} onClick={() => setShowNativeAction2(true)}>On</Chip>
            <Chip size="small" selected={!showNativeAction2} onClick={() => setShowNativeAction2(false)}>Off</Chip>
          </div>
          <select
            className={styles.iconSelect}
            value={action2IconName}
            onChange={(e) => setAction2IconName(e.target.value)}
          >
            {ICON_NAMES.map(n => (
              <option key={n} value={n}>{n === action2IconName ? `✓ ${n}` : n}</option>
            ))}
          </select>
        </div>
        <div className={styles.nativeControlRow}>
          <span className={styles.nativeControlLabel}>Action button 3</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Chip size="small" selected={showNativeAction3} onClick={() => setShowNativeAction3(true)}>On</Chip>
            <Chip size="small" selected={!showNativeAction3} onClick={() => setShowNativeAction3(false)}>Off</Chip>
          </div>
          <select
            className={styles.iconSelect}
            value={action3IconName}
            onChange={(e) => setAction3IconName(e.target.value)}
          >
            {ICON_NAMES.map(n => (
              <option key={n} value={n}>{n === action3IconName ? `✓ ${n}` : n}</option>
            ))}
          </select>
        </div>
        <div className={styles.nativeControlRow}>
          <span className={styles.nativeControlLabel}>AX Avatar Button</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Chip size="small" selected={showNativeAvatarButton} onClick={() => setShowNativeAvatarButton(true)}>On</Chip>
            <Chip size="small" selected={!showNativeAvatarButton} onClick={() => setShowNativeAvatarButton(false)}>Off</Chip>
          </div>
        </div>
        <Divider />
        <div className={styles.nativeControlRow}>
          <span className={styles.nativeControlLabel}>AX Search Field</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Chip size="small" selected={showNativeSearchBar} onClick={() => setShowNativeSearchBar(true)}>On</Chip>
            <Chip size="small" selected={!showNativeSearchBar} onClick={() => setShowNativeSearchBar(false)}>Off</Chip>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ComponentPageLayout
      section="AX Patterns"
      title="App Header"
      description="Native app header patterns for iOS and Android — phone and tablet variants. Supports blue (home) and white (search/inner) color variants."
    >

      {/* ── Platform Component Preview ── */}
      <div className={styles.previewSection}>
        <div className={styles.previewHeader}>
          <h2 className={styles.previewTitle}>Component preview</h2>
          <ButtonGroup>
            <Button
              variant={platform === 'native' ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setPlatform('native')}
            >
              Native Mobile
            </Button>
            <Button
              variant={platform === 'native-tablet' ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setPlatform('native-tablet')}
            >
              Native Tablet
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
          {platform === 'native' && (
            <div className={styles.nativeFrame}>
              <div className={styles.nativePhone}>
                <div className={styles.nativeScreen}>
                  <MobileTopNav
                    variant={nativeVariant}
                    showHomeExtras={nativeVariant === 'blue'}
                    forceVisible
                    forceNative
                    nativeTitle={nativeTitle}
                    nativeSubtitle={nativeSubtitle}
                    showNativeSubtitle={showNativeSubtitle}
                    showNativeAction1={showNativeAction1}
                    showNativeAction2={showNativeAction2}
                    showNativeAction3={showNativeAction3}
                    showNativeSearchBar={showNativeSearchBar}
                    showNativeAvatarButton={showNativeAvatarButton}
                    action1Icon={renderIcon(action1IconName)}
                    action2Icon={renderIcon(action2IconName)}
                    action3Icon={renderIcon(action3IconName)}
                    menuIcon={renderIcon(menuIconName)}
                  />
                  <div className={styles.nativePageContent}>
                    <p className={styles.nativePageHint}>
                      {nativeVariant === 'blue' ? 'Home page content' : 'Search results / inner page content'}
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.nativePropertiesPanel}>
                <div className={styles.nativeVariantSwitcher}>
                  <p className={styles.nativeVariantLabel}>Color variant:</p>
                  <ButtonGroup>
                    <Button
                      variant={nativeVariant === 'blue' ? 'primary' : 'secondary'}
                      size="small"
                      onClick={() => setNativeVariant('blue')}
                    >
                      Blue (Home)
                    </Button>
                    <Button
                      variant={nativeVariant === 'white' ? 'primary' : 'secondary'}
                      size="small"
                      onClick={() => setNativeVariant('white')}
                    >
                      White (Search)
                    </Button>
                  </ButtonGroup>
                </div>

                {nativeVariant === 'blue' && renderNativeControls()}
              </div>
            </div>
          )}
          {platform === 'native-tablet' && (
            <div className={styles.nativeTabletFrame}>
              <div className={styles.nativeTablet}>
                <div className={styles.nativeTabletScreen}>
                  <MobileTopNav
                    variant={nativeVariant}
                    showHomeExtras={nativeVariant === 'blue'}
                    forceVisible
                    forceNative
                    isTabletLayout
                    nativeTitle={nativeTitle}
                    nativeSubtitle={nativeSubtitle}
                    showNativeSubtitle={showNativeSubtitle}
                    showNativeAction1={showNativeAction1}
                    showNativeAction2={showNativeAction2}
                    showNativeAction3={showNativeAction3}
                    showNativeAction4={showNativeAction4}
                    showNativeSearchBar={showNativeSearchBar}
                    showNativeAvatarButton={showNativeAvatarButton}
                    nativeOSPlatform={nativeOSPlatform}
                    action1Icon={renderIcon(action1IconName)}
                    action2Icon={renderIcon(action2IconName)}
                    action3Icon={renderIcon(action3IconName)}
                    action4Icon={renderIcon(action4IconName)}
                    menuIcon={renderIcon(menuIconName)}
                  />
                  <div className={styles.nativePageContent}>
                    <p className={styles.nativePageHint}>
                      {nativeVariant === 'blue' ? 'Home page content' : 'Search results / inner page content'}
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.nativePropertiesPanel}>
                <div className={styles.nativeVariantSwitcher}>
                  <p className={styles.nativeVariantLabel}>Color variant:</p>
                  <ButtonGroup>
                    <Button
                      variant={nativeVariant === 'blue' ? 'primary' : 'secondary'}
                      size="small"
                      onClick={() => setNativeVariant('blue')}
                    >
                      Blue (Home)
                    </Button>
                    <Button
                      variant={nativeVariant === 'white' ? 'primary' : 'secondary'}
                      size="small"
                      onClick={() => setNativeVariant('white')}
                    >
                      White (Search)
                    </Button>
                  </ButtonGroup>
                </div>

                {nativeVariant === 'blue' && (
                  <>
                    {/* OS Platform switcher — tablet only */}
                    <div className={styles.nativeControls}>
                      <div className={styles.nativeControlRow}>
                        <span className={styles.nativeControlLabel}>OS Platform</span>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <Chip size="small" selected={nativeOSPlatform === 'ios'} onClick={() => setNativeOSPlatform('ios')}>iOS</Chip>
                          <Chip size="small" selected={nativeOSPlatform === 'android'} onClick={() => setNativeOSPlatform('android')}>Android</Chip>
                        </div>
                      </div>
                    </div>

                    {renderNativeControls()}

                    {/* Action button 4 — tablet only */}
                    <div className={styles.nativeControls}>
                      <div className={styles.nativeControlRow}>
                        <span className={styles.nativeControlLabel}>Action button 4</span>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <Chip size="small" selected={showNativeAction4} onClick={() => setShowNativeAction4(true)}>On</Chip>
                          <Chip size="small" selected={!showNativeAction4} onClick={() => setShowNativeAction4(false)}>Off</Chip>
                        </div>
                        <select
                          className={styles.iconSelect}
                          value={action4IconName}
                          onChange={(e) => setAction4IconName(e.target.value)}
                        >
                          {ICON_NAMES.map(n => (
                            <option key={n} value={n}>{n === action4IconName ? `✓ ${n}` : n}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </>
                )}
              </div>
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
              <span className={styles.usagePlatform}>Native Mobile</span>
              <Tag variant="neutral">Phone</Tag>
            </div>
            <div className={styles.usageCell}>
              <code className={styles.usageCode}>{'<MobileTopNav variant="blue" />'}</code>
            </div>
            <div className={styles.usageCell}>
              <span className={styles.usageImport}>@/components/walmart/MobileTopNav</span>
            </div>
          </div>
          <div className={styles.usageRow}>
            <div className={styles.usageCell}>
              <span className={styles.usagePlatform}>Native Tablet</span>
              <Tag variant="neutral">iPad / Android Tablet</Tag>
            </div>
            <div className={styles.usageCell}>
              <code className={styles.usageCode}>{'<MobileTopNav nativeOSPlatform="ios" showNativeAction4 />'}</code>
            </div>
            <div className={styles.usageCell}>
              <span className={styles.usageImport}>@/components/walmart/MobileTopNav</span>
            </div>
          </div>
        </div>

        <div className={styles.noteBox}>
          <strong>Usage:</strong> <code>MobileTopNav</code> is used in native app contexts and supports <code>variant=&quot;blue&quot;</code> (home) and <code>variant=&quot;white&quot;</code> (search/inner pages). For tablet, pass <code>nativeOSPlatform=&quot;ios&quot;</code> to center the title (iOS) or <code>nativeOSPlatform=&quot;android&quot;</code> to keep it left-aligned. Enable the optional 4th action button with <code>showNativeAction4</code>.
        </div>
      </div>
    </ComponentPageLayout>
  );
}
