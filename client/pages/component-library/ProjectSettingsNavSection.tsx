import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import { useLayoutSettings } from '@/contexts/LayoutSettingsContext';
import styles from './ProjectSettings.module.css';

export function NavSettingsSection() {
  const navigate = useNavigate();
  const { mobileTopNav, setMobileTopNav, platform, setPlatform } = useLayoutSettings();

  return (
    <div className={styles.navSection}>
      <div className={styles.navSectionHeader}>
        <div className={styles.navSectionLeft}>
          <h2 className={styles.navSectionTitle}>Navigation Settings</h2>
          <p className={styles.navSectionDesc}>
            Controls which navigation components render at mobile breakpoints (&lt;1024px) across all Walmart app pages.
            Persisted to <code>localStorage</code> — changes update the live app immediately.
          </p>
        </div>
        <Button
          variant="tertiary"
          size="small"
          onClick={() => navigate('/walmart')}
        >
          Preview in app
        </Button>
      </div>

      {/* Platform Mode */}
      <div className={styles.navSubsection}>
        <h3 className={styles.navSubsectionTitle}>Platform</h3>
        <p className={styles.navSubsectionDesc}>
          Choose the target platform experience. Native modes add OS-specific status bars and navigation chrome.
        </p>
        <div className={styles.platformCards}>
          <PlatformOption
            label="Web"
            tag="Responsive"
            tagVariant="success"
            description="Standard responsive web layout. No native OS chrome. Uses browser viewport breakpoints for tablet and mobile views."
            isActive={platform === 'web'}
            onClick={() => setPlatform('web')}
          />
          <PlatformOption
            label="iOS Native"
            tag="iPhone / iPad"
            tagVariant="info"
            description="iOS native app experience with Dynamic Island, SF-style status bar, and home indicator. Tablet breakpoints simulate iPad views."
            isActive={platform === 'ios'}
            onClick={() => setPlatform('ios')}
          />
          <PlatformOption
            label="Android Native"
            tag="Phone / Tablet"
            tagVariant="neutral"
            description="Android native app experience with Material-style status bar and navigation bar. Tablet breakpoints simulate Android tablet views."
            isActive={platform === 'android'}
            onClick={() => setPlatform('android')}
          />
        </div>
      </div>

      <div className={styles.navSubsections}>
        {/* Mobile Top Nav */}
        <div className={styles.navSubsection}>
          <h3 className={styles.navSubsectionTitle}>Mobile Top Nav</h3>
          <div className={styles.optionCards}>
            <SettingOption
              label="Native Top Nav"
              tag="iOS / Android"
              tagVariant="neutral"
              description="Native app-style top nav with menu icon, Walmart spark, search pill, and cart. Blue background with white icons."
              isActive={mobileTopNav === 'native'}
              onClick={() => setMobileTopNav('native')}
            />
            <SettingOption
              label="Mweb Top Nav"
              tag="< 1024px"
              tagVariant="success"
              description="Compact mobile web header with logo, search input, and cart. Designed for mobile browser experiences."
              isActive={mobileTopNav === 'mweb'}
              onClick={() => setMobileTopNav('mweb')}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

interface PlatformOptionProps {
  label: string;
  tag: string;
  tagVariant: 'neutral' | 'success' | 'info';
  description: string;
  isActive: boolean;
  onClick: () => void;
}

function PlatformOption({ label, tag, tagVariant, description, isActive, onClick }: PlatformOptionProps) {
  return (
    <button
      className={[styles.platformCard, isActive ? styles.platformCardActive : ''].join(' ')}
      onClick={onClick}
    >
      <div className={styles.platformCardTop}>
        <span className={styles.platformCardLabel}>{label}</span>
        <Tag variant={tagVariant}>{tag}</Tag>
        {isActive && <Tag variant="success">Active</Tag>}
      </div>
      <p className={styles.optionCardDesc}>{description}</p>
    </button>
  );
}

interface SettingOptionProps {
  label: string;
  tag: string;
  tagVariant: 'neutral' | 'success' | 'info';
  description: string;
  isActive: boolean;
  onClick: () => void;
}

function SettingOption({ label, tag, tagVariant, description, isActive, onClick }: SettingOptionProps) {
  return (
    <button
      className={[styles.optionCard, isActive ? styles.optionCardActive : ''].join(' ')}
      onClick={onClick}
    >
      <div className={styles.optionCardTop}>
        <span className={styles.optionCardLabel}>{label}</span>
        <Tag variant={tagVariant}>{tag}</Tag>
        {isActive && <Tag variant="success">Active</Tag>}
      </div>
      <p className={styles.optionCardDesc}>{description}</p>
    </button>
  );
}
