import { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  Barcode,
  Box,
  Building,
  Note,
  Receipt,
  SignOut,
  User,
} from '@/components/icons';
import { SidekickLogoIcon } from '@/components/icons-custom/SidekickLogoIcon';
import { MegaNavActionButton } from './MegaNavActionButton';
import styles from './MobileMenuPanel.module.css';

// ─── Section data ─────────────────────────────────────────────────────────────

type SectionId = 'me' | 'inventory' | 'checkout' | 'facility';

interface NavSection {
  id: SectionId;
  label: string;
  icon: React.ReactNode;
  title: string;
  links: Array<{ label: string; external?: boolean }>;
}

const NAV_SECTIONS: NavSection[] = [
  {
    id: 'me',
    label: 'Me',
    icon: <User width={24} height={24} />,
    title: 'Me',
    links: [
      { label: 'For you' },
      { label: 'Calls' },
      { label: 'Full schedule' },
      { label: 'Inbox' },
      { label: 'Your team' },
      { label: 'Time off requests' },
      { label: 'Translator' },
      { label: 'My performance tracker', external: true },
    ],
  },
  {
    id: 'inventory',
    label: 'Inventory',
    icon: <Box width={24} height={24} />,
    title: 'Availability',
    links: [
      { label: 'Aisle locations' },
      { label: 'Features' },
      { label: 'Item information' },
      { label: 'Manager approvals' },
      { label: 'Modulars' },
      { label: 'Pinpoint' },
      { label: 'Price changes' },
      { label: 'Receiving' },
      { label: 'RFID scanning' },
      { label: 'Shelf availability' },
      { label: 'Topstock' },
      { label: 'VizPick' },
    ],
  },
  {
    id: 'checkout',
    label: 'Checkout\n& returns',
    icon: <Receipt width={24} height={24} />,
    title: 'Checkouts & returns',
    links: [
      { label: 'Checkout' },
      { label: 'Receipt check' },
      { label: 'Returns' },
    ],
  },
  {
    id: 'facility',
    label: 'Facility\nmanagement',
    icon: <Building width={24} height={24} />,
    title: 'Facility management',
    links: [
      { label: 'Overview' },
      { label: 'Report an issue' },
      { label: 'Needs attention' },
      { label: 'Refrigeration alarms' },
      { label: 'Issues' },
      { label: 'Global issues' },
      { label: 'Schedule services' },
      { label: 'Shop GNRF' },
      { label: 'Digital key' },
    ],
  },
];

const FOOTER_LINKS = [
  { label: 'Give app feedback', external: false },
  { label: 'Share an idea or concern', external: true },
  { label: 'Settings', external: false },
  { label: "What's new", external: false },
];

// ─── Component ────────────────────────────────────────────────────────────────

interface MobileMenuPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenuPanel({ isOpen, onClose }: MobileMenuPanelProps) {
  const [activeSection, setActiveSection] = useState<SectionId>('me');
  const panelRef = useRef<HTMLElement>(null);

  const currentSection = NAV_SECTIONS.find((s) => s.id === activeSection)!;

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Escape to close
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) onClose();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropOpen : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        ref={panelRef}
        className={`${styles.panel} ${isOpen ? styles.panelOpen : ''}`}
        aria-label="Main menu"
        aria-hidden={!isOpen}
      >
        {/* ── Top action bar ── */}
        <div className={styles.topBar}>
          <button type="button" className={styles.timeClock} onClick={onClose}>
            <span className={styles.timeClockDot} aria-hidden="true" />
            <span className={styles.timeClockLabel}>Time clock</span>
          </button>
          <div className={styles.actionTiles}>
            <MegaNavActionButton
              icon={<SidekickLogoIcon width={24} height={24} />}
              label="Sidekick"
              onClick={onClose}
            />
            <MegaNavActionButton
              icon={<Barcode width={24} height={24} />}
              label="Scan item"
              onClick={onClose}
            />
            <MegaNavActionButton
              icon={<Note width={24} height={24} />}
              label="Notes"
              onClick={onClose}
            />
          </div>
        </div>

        {/* ── Body: left column + right column ── */}
        <div className={styles.body}>
          {/* Left column: section icon tabs */}
          <nav className={styles.leftCol} aria-label="Menu sections">
            <div className={styles.navTiles}>
              {NAV_SECTIONS.map((section) => {
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    type="button"
                    className={`${styles.navTile} ${isActive ? styles.navTileActive : ''}`}
                    onClick={() => setActiveSection(section.id)}
                    aria-pressed={isActive}
                    aria-label={section.title}
                  >
                    <span
                      className={`${styles.navTileIconBox} ${isActive ? styles.navTileIconBoxActive : ''}`}
                      aria-hidden="true"
                    >
                      {section.icon}
                    </span>
                    <span className={styles.navTileLabel}>
                      {section.label.split('\n').map((line, i) => (
                        <span key={i} style={{ display: 'block' }}>
                          {line}
                        </span>
                      ))}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Bottom: GIF + Sign out */}
            <div className={styles.leftColFooter}>
              <button type="button" className={styles.navTile}>
                <span className={styles.navTileIconBox} aria-hidden="true">
                  <ArrowUpRight width={20} height={20} />
                </span>
                <span className={styles.navTileLabel}>GIF</span>
              </button>
              <button type="button" className={styles.navTile} onClick={onClose}>
                <span className={styles.navTileIconBox} aria-hidden="true">
                  <SignOut width={20} height={20} />
                </span>
                <span className={styles.navTileLabel}>Sign out</span>
              </button>
            </div>
          </nav>

          {/* Right column: section content */}
          <div className={styles.rightCol}>
            <div className={styles.rightScroll}>
              <h2 className={styles.sectionTitle}>{currentSection.title}</h2>
              <nav aria-label={currentSection.title}>
                {currentSection.links.map((link) => (
                  <button
                    key={link.label}
                    type="button"
                    className={styles.linkRow}
                    onClick={onClose}
                  >
                    <span className={styles.linkRowLabel}>{link.label}</span>
                    {link.external && (
                      <ArrowUpRight
                        width={16}
                        height={16}
                        className={styles.linkRowExternal}
                        aria-label="Opens externally"
                      />
                    )}
                  </button>
                ))}
              </nav>
            </div>

            {/* Persistent footer links */}
            <div className={styles.persistentFooter}>
              {FOOTER_LINKS.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  className={styles.linkRow}
                  onClick={onClose}
                >
                  <span className={styles.linkRowLabel}>{link.label}</span>
                  {link.external && (
                    <ArrowUpRight
                      width={16}
                      height={16}
                      className={styles.linkRowExternal}
                      aria-label="Opens externally"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
