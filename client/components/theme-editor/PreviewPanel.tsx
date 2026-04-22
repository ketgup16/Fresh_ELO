import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import { AXFlag, AX_FLAG_VARIANTS } from '@/components/walmart/AXFlag';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { useTheme } from '@/contexts/ThemeContext';
import { BottomNav } from '@/components/walmart/BottomNav';
import { AndroidBottomNav } from '@/components/walmart/AndroidBottomNav';
import {
  Gift,
  Star,
  Hourglass,
  Dollar,
  Tag,
  ShieldCheck,
  CheckCircle,
  Check,
  Lock,
  UsersFill,
  Flash,
} from '@/components/icons';
import type { AXFlagVariant } from '@/components/walmart/AXFlag';
import styles from './PreviewPanel.module.css';

const ICON_SIZE = { width: 16, height: 16 } as const;

const FLAG_ICONS: Record<AXFlagVariant, React.ReactNode> = {
  'holiday-restricted': <Lock        {...ICON_SIZE} />,
  'brand-subtle':       <Star        {...ICON_SIZE} />,
  'scarcity':           <Hourglass   {...ICON_SIZE} />,
  'savings-bold':       <Dollar      {...ICON_SIZE} />,
  'savings-subtle':     <Tag         {...ICON_SIZE} />,
  'confidence-subtle':  <ShieldCheck {...ICON_SIZE} />,
  'confidence-bold':    <ShieldCheck {...ICON_SIZE} />,
  'confidence-alt':     <Check       {...ICON_SIZE} />,
  'confidence':         <CheckCircle {...ICON_SIZE} />,
  'holiday-member':     <Gift        {...ICON_SIZE} />,
  'social':             <UsersFill   {...ICON_SIZE} />,
  'urgent':             <Flash       {...ICON_SIZE} />,
};

type Platform = 'ios' | 'android';

interface PreviewPanelProps {
  /** Number of overrides applied — used to force re-render when tokens change */
  overrideCount: number;
}

/**
 * Live component preview that reacts to token overrides in real time.
 * Because overrides are applied directly to :root via style.setProperty,
 * React renders immediately pick up the new CSS cascade values.
 */
export function PreviewPanel({ overrideCount: _ }: PreviewPanelProps) {
  const { currentThemeData } = useTheme();
  const [platform, setPlatform] = useState<Platform>('ios');

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h2 className={styles.headerTitle}>Live Preview</h2>
        <p className={styles.headerSub}>Changes apply instantly via CSS cascade</p>
      </div>

      {/* Theme switcher */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Active theme</h3>
        <div className={styles.themeSwitcherWrap}>
          <ThemeSwitcher />
        </div>
        <p className={styles.themeNote}>
          Switch themes to see how your overrides stack on top of different base themes.
          Token overrides remain active across theme switches.
        </p>
      </section>

      {/* Platform / device chooser */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Platform</h3>
        <div className={styles.platformRow}>
          <ButtonGroup>
            <Button
              variant={platform === 'ios' ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setPlatform('ios')}
            >
              iOS
            </Button>
            <Button
              variant={platform === 'android' ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setPlatform('android')}
            >
              Android
            </Button>
          </ButtonGroup>
        </div>
        <p className={styles.themeNote}>
          {platform === 'ios' && 'Previewing iOS glassmorphic bottom navigation bar.'}
          {platform === 'android' && 'Previewing Android Material-style bottom navigation bar.'}
        </p>
      </section>

      {/* Buttons */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Buttons</h3>
        <div className={styles.buttonRows}>
          <div className={styles.buttonRow}>
            <Button variant="primary" size="medium">Primary</Button>
            <Button variant="secondary" size="medium">Secondary</Button>
            <Button variant="tertiary" size="medium">Tertiary</Button>
            <Button variant="destructive" size="medium">Destructive</Button>
          </div>
          <div className={styles.buttonRow}>
            <Button variant="primary" size="small">Primary sm</Button>
            <Button variant="secondary" size="small">Secondary sm</Button>
          </div>
        </div>
      </section>

      {/* Text field (field token preview) */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Text field</h3>
        <div className={styles.fieldWrap}>
          <input
            type="text"
            className={styles.previewInput}
            placeholder="Field border tokens preview"
            readOnly
          />
        </div>
      </section>

      {/* Bottom nav pattern preview */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Bottom nav</h3>
        <div className={styles.nativePreviewWrap}>
          {platform === 'ios' && (
            <div className={styles.nativeFrame}>
              <BottomNav activeTab="shop" />
            </div>
          )}
          {platform === 'android' && (
            <div className={styles.nativeFrame}>
              <AndroidBottomNav activeTab="shop" />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
