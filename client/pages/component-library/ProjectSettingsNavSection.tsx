import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import { useLayoutSettings, type MobileFooterMode, type MobileTopNavMode } from '@/contexts/LayoutSettingsContext';
import styles from './ProjectSettings.module.css';

export function NavSettingsSection() {
  const navigate = useNavigate();
  const { mobileFooter, setMobileFooter, mobileTopNav, setMobileTopNav } = useLayoutSettings();

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

      <div className={styles.navSubsections}>
        {/* Mobile Top Nav */}
        <div className={styles.navSubsection}>
          <h3 className={styles.navSubsectionTitle}>Mobile Top Nav</h3>
          <div className={styles.optionCards}>
            <TopNavOption
              label="Native Top Nav"
              tag="iOS / Android"
              tagVariant="neutral"
              description="Native app-style top nav with menu icon, Walmart spark, search pill, and cart. Blue background with white icons."
              isActive={mobileTopNav === 'native'}
              onClick={() => setMobileTopNav('native')}
            />
            <TopNavOption
              label="Mweb Top Nav"
              tag="< 1024px"
              tagVariant="success"
              description="Compact mobile web header with logo, search input, and cart. Designed for mobile browser experiences."
              isActive={mobileTopNav === 'mweb'}
              onClick={() => setMobileTopNav('mweb')}
            />
          </div>
        </div>

        {/* Mobile Footer / Bottom Nav */}
        <div className={styles.navSubsection}>
          <h3 className={styles.navSubsectionTitle}>Mobile Footer / Bottom Nav</h3>
          <div className={styles.optionCards}>
            <TopNavOption
              label="WCP Bottom Nav"
              tag="iOS / Android"
              tagVariant="neutral"
              description="Native-style floating glass nav bar with animated spring indicator. Best for app-like experiences."
              isActive={mobileFooter === 'native'}
              onClick={() => setMobileFooter('native')}
            />
            <TopNavOption
              label="WCP Footer (Mweb)"
              tag="< 1024px"
              tagVariant="success"
              description="Stacked mobile web footer with full link list. Best for web-first or SEO-focused experiences."
              isActive={mobileFooter === 'mweb'}
              onClick={() => setMobileFooter('mweb')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface TopNavOptionProps {
  label: string;
  tag: string;
  tagVariant: 'neutral' | 'success' | 'info';
  description: string;
  isActive: boolean;
  onClick: () => void;
}

function TopNavOption({ label, tag, tagVariant, description, isActive, onClick }: TopNavOptionProps) {
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
