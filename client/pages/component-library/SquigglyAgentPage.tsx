import React from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { Tag } from '@/components/ui/Tag';
import { SquigglyAgent, type SquigglyAnimation } from '@/components/agents/SquigglyAgent';
import styles from './SquigglyAgentPage.module.css';

const ANIMATIONS: { id: SquigglyAnimation; label: string; description: string }[] = [
  { id: 'emotes', label: 'Emotes', description: 'Default cycling expressions with shadow.' },
  { id: 'emotes-no-shadow', label: 'Emotes (no shadow)', description: 'Cycling expressions without ground shadow.' },
  { id: 'laugh', label: 'Laugh', description: 'Joyful laughing reaction with shadow.' },
  { id: 'laugh-no-shadow', label: 'Laugh (no shadow)', description: 'Laughing reaction without shadow.' },
  { id: 'look-lr', label: 'Look L/R', description: 'Looks left and right, scanning attention.' },
  { id: 'look-lr-no-shadow', label: 'Look L/R (no shadow)', description: 'Scanning loop without shadow.' },
  { id: 'nod', label: 'Nod', description: 'Affirmative nodding gesture.' },
  { id: 'nod-no-shadow', label: 'Nod (no shadow)', description: 'Nodding without shadow.' },
  { id: 'shimmy', label: 'Shimmy', description: 'Energetic side-to-side dance.' },
  { id: 'shimmy-no-shadow', label: 'Shimmy (no shadow)', description: 'Shimmy without shadow.' },
  { id: 'thinking', label: 'Thinking', description: 'Pondering loop used while loading or processing.' },
];

export default function SquigglyAgentPage() {
  return (
    <ComponentPageLayout
      section="Agents"
      title="Squiggly AI Agent"
      description="The Squiggly AI agent is the visual personality for AI assistance throughout the app. Use the variant that best matches the moment — celebrate with Laugh, focus with Look, acknowledge with Nod, or signal work-in-progress with Thinking."
    >
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>All animations</h2>
          <Tag variant="neutral">{ANIMATIONS.length} variants</Tag>
        </div>
        <p className={styles.sectionDesc}>
          Each tile previews a Lottie animation playing on loop at the default size (96px).
          Use the <code className={styles.code}>animation</code> prop on{' '}
          <code className={styles.code}>{'<SquigglyAgent />'}</code> to select a variant.
        </p>

        <div className={styles.grid}>
          {ANIMATIONS.map(({ id, label, description }) => (
            <div key={id} className={styles.card}>
              <div className={styles.canvas}>
                <SquigglyAgent animation={id} size={96} loop autoplay />
              </div>
              <div className={styles.cardMeta}>
                <div className={styles.cardTitleRow}>
                  <span className={styles.cardTitle}>{label}</span>
                  <code className={styles.cardId}>{id}</code>
                </div>
                <p className={styles.cardDesc}>{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Sizes</h2>
          <Tag variant="neutral">px</Tag>
        </div>
        <p className={styles.sectionDesc}>
          The agent scales uniformly via the <code className={styles.code}>size</code> prop.
          Recommended sizes: 40 (compact inline), 56 (floating action), 96 (hero or onboarding).
        </p>
        <div className={styles.sizeRow}>
          {[40, 56, 96, 128].map((size) => (
            <div key={size} className={styles.sizeItem}>
              <div className={styles.sizeCanvas} style={{ width: size + 32, height: size + 32 }}>
                <SquigglyAgent animation="emotes" size={size} loop autoplay />
              </div>
              <span className={styles.sizeLabel}>{size}px</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Usage</h2>
        <pre className={styles.codeBlock}>{`import { SquigglyAgent } from '@/components/agents/SquigglyAgent';

<SquigglyAgent
  animation="emotes"   // 'emotes' | 'laugh' | 'nod' | 'shimmy' | 'thinking' | 'look-lr' | ...
  size={56}
  loop
  autoplay
  onClick={() => openAssistant()}
/>`}</pre>
      </div>
    </ComponentPageLayout>
  );
}
