import React from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { Tag } from '@/components/ui/Tag';
import { SquigglyAgent, type SquigglyAnimation } from '@/components/agents/SquigglyAgent';
import { MartyAgent, type MartyAnimation } from '@/components/agents/MartyAgent';
import { useAgent } from '@/contexts/AgentContext';
import styles from './SquigglyAgentPage.module.css';

// ── Squiggly animations ─────────────────────────────────────────────────────
const SQUIGGLY_ANIMATIONS: { id: SquigglyAnimation; label: string; description: string }[] = [
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

// ── Marty animations ────────────────────────────────────────────────────────
const MARTY_ANIMATIONS: { id: MartyAnimation; label: string; description: string }[] = [
  { id: 'emotes', label: 'Emotes', description: 'Default cycling expressions with shadow.' },
  { id: 'emotes-no-shadow', label: 'Emotes (no shadow)', description: 'Cycling expressions without ground shadow.' },
  { id: 'thinking-left', label: 'Thinking Left', description: 'Pondering left — use while loading or processing.' },
  { id: 'thinking-left-no-shadow', label: 'Thinking Left (no shadow)', description: 'Thinking left without shadow.' },
  { id: 'thinking-gradient', label: 'Thinking Gradient', description: 'Gradient thinking animation for AI processing states.' },
  { id: 'thinking-right', label: 'Thinking Right', description: 'Scanning right — use for directional attention.' },
  { id: 'thinking-right-no-shadow', label: 'Thinking Right (no shadow)', description: 'Scanning right without shadow.' },
  { id: 'glasses', label: 'Glasses', description: 'Marty wearing glasses — for analytical or insight moments.' },
  { id: 'glasses-no-shadow', label: 'Glasses (no shadow)', description: 'Glasses without shadow.' },
  { id: 'glasses-thinking', label: 'Glasses Thinking', description: 'Glasses + thinking — deep analytical processing.' },
  { id: 'glasses-thinking-no-shadow', label: 'Glasses Thinking (no shadow)', description: 'Glasses thinking without shadow.' },
];

// ── Emotion mapping ─────────────────────────────────────────────────────────
interface EmotionPair {
  emotion: string;
  squiggly: SquigglyAnimation;
  marty: MartyAnimation;
  note?: string;
}

const EMOTION_PAIRS: EmotionPair[] = [
  { emotion: 'Default / Emotes', squiggly: 'emotes', marty: 'emotes' },
  { emotion: 'Emotes (no shadow)', squiggly: 'emotes-no-shadow', marty: 'emotes-no-shadow' },
  { emotion: 'Thinking', squiggly: 'thinking', marty: 'thinking-left' },
  { emotion: 'Scanning / Look L/R', squiggly: 'look-lr', marty: 'thinking-right' },
  { emotion: 'Scanning (no shadow)', squiggly: 'look-lr-no-shadow', marty: 'thinking-right-no-shadow' },
  { emotion: 'Laugh / Celebrate', squiggly: 'laugh', marty: 'emotes', note: 'Closest Marty equivalent' },
  { emotion: 'Laugh (no shadow)', squiggly: 'laugh-no-shadow', marty: 'emotes-no-shadow', note: 'Closest Marty equivalent' },
  { emotion: 'Nod', squiggly: 'nod', marty: 'emotes', note: 'Closest Marty equivalent' },
  { emotion: 'Shimmy', squiggly: 'shimmy', marty: 'emotes', note: 'Closest Marty equivalent' },
];

export default function SquigglyAgentPage() {
  const { activeAgent } = useAgent();

  return (
    <ComponentPageLayout
      section="Agents"
      title="AI Agents"
      description="The AI agents are the visual personalities for AI assistance throughout the app. Squiggly and Marty mirror each other's emotions — choose the right animation for the moment and select your active agent in Project Settings."
    >
      {/* ── Active Agent Preview ──────────────────────────────────────────── */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Active Agent</h2>
          <Tag variant={activeAgent === 'marty' ? 'info' : 'neutral'}>
            {activeAgent === 'marty' ? 'Marty' : 'Squiggly'}
          </Tag>
        </div>
        <p className={styles.sectionDesc}>
          Your currently selected agent. Change it in{' '}
          <a href="/component-library/project-settings" className={styles.inlineLink}>Project Settings</a>.
        </p>
        <div className={styles.activeAgentFrame}>
          {activeAgent === 'marty' ? (
            <MartyAgent animation="emotes" size={96} loop autoplay />
          ) : (
            <SquigglyAgent animation="emotes" size={96} loop autoplay />
          )}
          <div className={styles.activeAgentMeta}>
            <span className={styles.activeAgentName}>
              {activeAgent === 'marty' ? 'Marty' : 'Squiggly'}
            </span>
            <span className={styles.activeAgentDesc}>
              {activeAgent === 'marty'
                ? 'Marty is the analytical AI agent — thoughtful, precise, and ready to dig deep.'
                : 'Squiggly is the expressive AI agent — energetic, friendly, and always animated.'}
            </span>
          </div>
        </div>
      </div>

      {/* ── Emotion Mapping ───────────────────────────────────────────────── */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Emotion Mapping</h2>
          <Tag variant="neutral">{EMOTION_PAIRS.length} pairs</Tag>
        </div>
        <p className={styles.sectionDesc}>
          Squiggly and Marty mirror each other's emotions. Use the same emotion key — the right animation is selected automatically based on the active agent. Pairs marked with a note use the closest available Marty animation.
        </p>
        <div className={styles.emotionTable}>
          <div className={styles.emotionTableHeader}>
            <span className={styles.emotionLabel}>Emotion</span>
            <span className={styles.emotionAgent}>Squiggly</span>
            <span className={styles.emotionAgent}>Marty</span>
          </div>
          {EMOTION_PAIRS.map(({ emotion, squiggly, marty, note }) => (
            <div key={emotion} className={styles.emotionRow}>
              <div className={styles.emotionLabelCell}>
                <span className={styles.emotionName}>{emotion}</span>
                {note && <span className={styles.emotionNote}>{note}</span>}
              </div>
              <div className={styles.emotionAgentCell}>
                <div className={styles.emotionCanvas}>
                  <SquigglyAgent animation={squiggly} size={64} loop autoplay />
                </div>
                <code className={styles.cardId}>{squiggly}</code>
              </div>
              <div className={styles.emotionAgentCell}>
                <div className={[styles.emotionCanvas, styles.emotionCanvasMarty].join(' ')}>
                  <MartyAgent animation={marty} size={64} loop autoplay />
                </div>
                <code className={styles.cardId}>{marty}</code>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Squiggly — All animations ─────────────────────────────────────── */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Squiggly — All animations</h2>
          <Tag variant="neutral">{SQUIGGLY_ANIMATIONS.length} variants</Tag>
        </div>
        <p className={styles.sectionDesc}>
          Each tile previews a Lottie animation playing on loop at 96px.
          Use the <code className={styles.code}>animation</code> prop on{' '}
          <code className={styles.code}>{'<SquigglyAgent />'}</code> to select a variant.
        </p>
        <div className={styles.grid}>
          {SQUIGGLY_ANIMATIONS.map(({ id, label, description }) => (
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

      {/* ── Marty — All animations ────────────────────────────────────────── */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Marty — All animations</h2>
          <Tag variant="neutral">{MARTY_ANIMATIONS.length} variants</Tag>
        </div>
        <p className={styles.sectionDesc}>
          Each tile previews a Lottie animation playing on loop at 96px.
          Use the <code className={styles.code}>animation</code> prop on{' '}
          <code className={styles.code}>{'<MartyAgent />'}</code> to select a variant.
          Glasses animations are Marty-only.
        </p>
        <div className={styles.grid}>
          {MARTY_ANIMATIONS.map(({ id, label, description }) => (
            <div key={id} className={styles.card}>
              <div className={[styles.canvas, styles.canvasMarty].join(' ')}>
                <MartyAgent animation={id} size={96} loop autoplay />
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

      {/* ── Sizes ────────────────────────────────────────────────────────── */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Sizes</h2>
          <Tag variant="neutral">px</Tag>
        </div>
        <p className={styles.sectionDesc}>
          Both agents scale uniformly via the <code className={styles.code}>size</code> prop.
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

      {/* ── Usage ─────────────────────────────────────────────────────────── */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Usage</h2>
        <pre className={styles.codeBlock}>{`import { SquigglyAgent } from '@/components/agents/SquigglyAgent';
import { MartyAgent } from '@/components/agents/MartyAgent';
import { useAgent } from '@/contexts/AgentContext';

// Render the active agent automatically
function ActiveAgentButton() {
  const { activeAgent } = useAgent();
  return activeAgent === 'marty'
    ? <MartyAgent animation="emotes" size={56} loop autoplay onClick={() => openAssistant()} />
    : <SquigglyAgent animation="emotes" size={56} loop autoplay onClick={() => openAssistant()} />;
}

// Or use directly
<SquigglyAgent animation="thinking" size={96} loop autoplay />
<MartyAgent animation="glasses-thinking" size={96} loop autoplay />`}</pre>
      </div>
    </ComponentPageLayout>
  );
}
