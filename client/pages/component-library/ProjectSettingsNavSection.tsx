import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import { useLayoutSettings } from '@/contexts/LayoutSettingsContext';
import { useAgent } from '@/contexts/AgentContext';
import { SquigglyAgent } from '@/components/agents/SquigglyAgent';
import { MartyAgent } from '@/components/agents/MartyAgent';
import { SidekickAgent } from '@/components/agents/SidekickAgent';
import styles from './ProjectSettings.module.css';

export function NavSettingsSection() {
  const navigate = useNavigate();
  const { platform, setPlatform } = useLayoutSettings();
  const { activeAgent, setActiveAgent } = useAgent();

  return (
    <div className={styles.navSection}>
      <div className={styles.navSectionHeader}>
        <div className={styles.navSectionLeft}>
          <h2 className={styles.navSectionTitle}>Navigation Settings</h2>
          <p className={styles.navSectionDesc}>
            Controls which navigation components render across all Walmart app pages.
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

      {/* AI Agent */}
      <div className={styles.navSubsection}>
        <h3 className={styles.navSubsectionTitle}>AI Agent</h3>
        <p className={styles.navSubsectionDesc}>
          Choose which AI agent personality appears throughout the app. Both agents mirror the same emotions — only the visual character changes.
        </p>
        <div className={styles.platformCards}>
          <AgentOption
            agent="squiggly"
            label="Squiggly"
            tag="Expressive"
            tagVariant="neutral"
            description="Energetic and friendly. Squiggly uses emotes, laughs, nods, and shimmies to express a full range of reactions."
            isActive={activeAgent === 'squiggly'}
            onClick={() => setActiveAgent('squiggly')}
          />
          <AgentOption
            agent="marty"
            label="Marty"
            tag="Analytical"
            tagVariant="info"
            description="Thoughtful and precise. Marty uses thinking and glasses animations to convey focus, analysis, and deep processing."
            isActive={activeAgent === 'marty'}
            onClick={() => setActiveAgent('marty')}
          />
          <AgentOption
            agent="sidekick"
            label="Sidekick"
            tag="Focused"
            tagVariant="neutral"
            description="Precise and purposeful. Sidekick uses a clean, iconic presence to indicate AI assistance without animation distraction."
            isActive={activeAgent === 'sidekick'}
            onClick={() => setActiveAgent('sidekick')}
          />
        </div>
      </div>

    </div>
  );
}

interface PlatformOptionProps {
  label: string;
  tag: string;
  tagVariant: 'neutral' | 'info';
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

interface AgentOptionProps {
  agent: 'squiggly' | 'marty' | 'sidekick';
  label: string;
  tag: string;
  tagVariant: 'neutral' | 'info';
  description: string;
  isActive: boolean;
  onClick: () => void;
}

function AgentOption({ agent, label, tag, tagVariant, description, isActive, onClick }: AgentOptionProps) {
  return (
    <button
      className={[styles.platformCard, styles.agentCard, isActive ? styles.platformCardActive : ''].join(' ')}
      onClick={onClick}
    >
      <div className={styles.agentCardTop}>
        <div className={[
          styles.agentCardPreview,
          agent === 'marty' ? styles.agentCardPreviewMarty : agent === 'sidekick' ? styles.agentCardPreviewSidekick : styles.agentCardPreviewSquiggly,
        ].join(' ')}>
          {agent === 'marty'
            ? <MartyAgent animation="emotes" size={48} loop autoplay />
            : agent === 'sidekick'
              ? <SidekickAgent size={48} />
              : <SquigglyAgent animation="emotes" size={48} loop autoplay />}
        </div>
        <div className={styles.agentCardInfo}>
          <div className={styles.platformCardTop}>
            <span className={styles.platformCardLabel}>{label}</span>
            <Tag variant={tagVariant}>{tag}</Tag>
            {isActive && <Tag variant="success">Active</Tag>}
          </div>
          <p className={styles.optionCardDesc}>{description}</p>
        </div>
      </div>
    </button>
  );
}
