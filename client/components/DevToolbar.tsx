/**
 * DevToolbar — opens on double-Esc keypress.
 * Lets you switch Theme, AI Agent, and Platform without leaving the page.
 */
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useAgent } from '@/contexts/AgentContext';
import { useLayoutSettings } from '@/contexts/LayoutSettingsContext';
import { SquigglyAgent } from '@/components/agents/SquigglyAgent';
import { MartyAgent } from '@/components/agents/MartyAgent';
import { SidekickAgent } from '@/components/agents/SidekickAgent';
import styles from './DevToolbar.module.css';

// Only expose visible themes (not hidden platform/base ones)
const THEME_COLORS: Record<string, string> = {
  walmart:        '#0053e2',
  'walmart-b2b':  '#002e99',
  customer:       '#0071ce',
  ax:             '#1a73e8',
  'ax-sams-club': '#c8102e',
  'ax-walmart':   '#0053e2',
  px:             '#6200ea',
  'px-walmart':   '#0053e2',
  'sams-club':    '#c8102e',
  'cashi-mx':     '#00a651',
  bodega:         '#f26522',
  sparky:         '#ff6d00',
  'members-mark': '#1c4587',
  'walmart-plus': '#ffc220',
};

export function DevToolbar() {
  const [open, setOpen] = useState(false);
  const lastEscRef = useRef<number>(0);
  const openRef = useRef(false);
  const { availableThemes, currentTheme, switchTheme } = useTheme();
  const { activeAgent, setActiveAgent } = useAgent();
  const { platform, setPlatform } = useLayoutSettings();

  // Keep openRef in sync so the stable handler always sees current state
  useEffect(() => { openRef.current = open; }, [open]);

  // Stable listener — registered once, reads state via ref
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Escape') return;
      const now = Date.now();
      const diff = now - lastEscRef.current;
      if (diff < 500 && diff > 0) {
        // Double-Esc detected — toggle
        lastEscRef.current = 0;
        setOpen(prev => !prev);
      } else {
        // First Esc — record time; also close if already open
        lastEscRef.current = now;
        if (openRef.current) setOpen(false);
      }
    }

    window.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => window.removeEventListener('keydown', handleKeyDown, { capture: true });
  }, []); // stable — never re-registers

  // Click outside backdrop to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) setOpen(false);
  };

  const visibleThemes = availableThemes.filter(t => !t.hidden);

  if (!open) return null;

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick} role="dialog" aria-modal="true" aria-label="Dev Toolbar">
      <div className={styles.panel}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.pill}>DEV</span>
            <h2 className={styles.title}>Project Settings</h2>
          </div>
          <button className={styles.closeBtn} onClick={() => setOpen(false)} aria-label="Close dev toolbar">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
            </svg>
          </button>
        </div>

        <div className={styles.hint}>Press <kbd>Esc Esc</kbd> to toggle</div>

        <div className={styles.sections}>
          {/* ── Theme ── */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Theme</h3>
            <div className={styles.themeGrid}>
              {visibleThemes.map(theme => (
                <button
                  key={theme.id}
                  className={[styles.themeChip, currentTheme === theme.id ? styles.themeChipActive : ''].join(' ')}
                  onClick={() => switchTheme(theme.id)}
                  title={theme.description}
                >
                  <span
                    className={styles.themeSwatchDot}
                    style={{ background: THEME_COLORS[theme.id] ?? theme.previewColor ?? '#ccc' }}
                  />
                  {theme.name}
                </button>
              ))}
            </div>
          </section>

          <div className={styles.divider} />

          {/* ── AI Agent ── */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>AI Agent</h3>
            <div className={styles.agentRow}>
              <button
                className={[styles.agentCard, activeAgent === 'squiggly' ? styles.agentCardActive : ''].join(' ')}
                onClick={() => setActiveAgent('squiggly')}
              >
                <div className={styles.agentPreviewSquiggly}>
                  <SquigglyAgent animation="emotes" size={48} loop autoplay />
                </div>
                <span className={styles.agentLabel}>Squiggly</span>
                {activeAgent === 'squiggly' && <span className={styles.activeBadge}>Active</span>}
              </button>

              <button
                className={[styles.agentCard, activeAgent === 'marty' ? styles.agentCardActive : ''].join(' ')}
                onClick={() => setActiveAgent('marty')}
              >
                <div className={styles.agentPreviewMarty}>
                  <MartyAgent animation="emotes" size={48} loop autoplay />
                </div>
                <span className={styles.agentLabel}>Marty</span>
                {activeAgent === 'marty' && <span className={styles.activeBadge}>Active</span>}
              </button>

              <button
                className={[styles.agentCard, activeAgent === 'sidekick' ? styles.agentCardActive : ''].join(' ')}
                onClick={() => setActiveAgent('sidekick')}
              >
                <div className={styles.agentPreviewSidekick}>
                  <SidekickAgent size={48} />
                </div>
                <span className={styles.agentLabel}>Sidekick</span>
                {activeAgent === 'sidekick' && <span className={styles.activeBadge}>Active</span>}
              </button>
            </div>
          </section>

          <div className={styles.divider} />

          {/* ── Platform ── */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Platform</h3>
            <div className={styles.platformRow}>
              <button
                className={[styles.platformChip, platform === 'ios' ? styles.platformChipActive : ''].join(' ')}
                onClick={() => setPlatform('ios')}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <rect x="3" y="1" width="10" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="8" cy="12.5" r="0.75" fill="currentColor"/>
                </svg>
                iOS
              </button>
              <button
                className={[styles.platformChip, platform === 'android' ? styles.platformChipActive : ''].join(' ')}
                onClick={() => setPlatform('android')}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M2 11V7a6 6 0 0 1 12 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <rect x="1" y="7" width="2" height="4" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                  <rect x="13" y="7" width="2" height="4" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M5 13h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M8 13v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Android
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
