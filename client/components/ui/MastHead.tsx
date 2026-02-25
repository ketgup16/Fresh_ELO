import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Bell, HelpCircle, User, AppSwitcher } from '@/components/icons';
import { MartyAvatar } from '@/features/marty/MartyAvatar';
import { MediaSolutionsDropdown } from './MediaSolutionsDropdown';
import { useMarty } from '@/contexts/MartyContext';
import { Divider } from './Divider';
import { LanguageSelector } from './LanguageSelector';
import styles from './MastHead.module.css';

interface MastHeadProps {
  appName?: string;
}

export function MastHead({
  appName,
}: MastHeadProps) {
  const { t } = useTranslation();
  const displayAppName = appName ?? t('masthead.appName');
  const { isMinimized, isDocked, setIsMinimized, setIsDocked, setInitialPosition } = useMarty();
  const dragListenersRef = useRef<{ move: (e: MouseEvent) => void; up: () => void } | null>(null);

  // Cleanup window listeners on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (dragListenersRef.current) {
        window.removeEventListener('mousemove', dragListenersRef.current.move);
        window.removeEventListener('mouseup', dragListenersRef.current.up);
        dragListenersRef.current = null;
      }
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        {/* App Switcher */}
        <button className={styles.iconButton} aria-label={t('masthead.appSwitcher')}>
          <AppSwitcher style={{ width: 16, height: 16 }} />
        </button>
        
        {/* App Name */}
        <span className={styles.appName}>{displayAppName}</span>
      </div>

      <div className={styles.right}>
        <MediaSolutionsDropdown />
        <Divider orientation="vertical" UNSAFE_className={styles.divider} />
        <LanguageSelector />
        <div className={styles.actions}>
          <button className={styles.iconButton} aria-label={t('masthead.notifications')}>
            <Bell style={{ width: 16, height: 16 }} />
            <span className={styles.notifDot}></span>
          </button>
          <button className={styles.iconButton} aria-label={t('masthead.help')}>
            <HelpCircle style={{ width: 16, height: 16 }} />
          </button>
          <button className={styles.iconButton} aria-label={t('masthead.account')}>
            <User style={{ width: 16, height: 16 }} />
          </button>
          {isDocked && isMinimized && (
            <button
              onClick={(e) => {
                const wasDragged = (e.currentTarget as any).wasDragged;
                if (!wasDragged) {
                  setIsMinimized(false);
                }
                setTimeout(() => {
                  (e.currentTarget as any).wasDragged = false;
                }, 100);
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                const startX = e.clientX;
                const startY = e.clientY;
                const buttonEl = e.currentTarget;
                let hasMoved = false;

                const cleanup = () => {
                  if (dragListenersRef.current) {
                    window.removeEventListener('mousemove', dragListenersRef.current.move);
                    window.removeEventListener('mouseup', dragListenersRef.current.up);
                    dragListenersRef.current = null;
                  }
                };

                const handleMouseMove = (moveEvent: MouseEvent) => {
                  const deltaX = Math.abs(moveEvent.clientX - startX);
                  const deltaY = Math.abs(moveEvent.clientY - startY);
                  if (Math.sqrt(deltaX * deltaX + deltaY * deltaY) > 3) {
                    hasMoved = true;
                    setInitialPosition({ x: moveEvent.clientX - 25, y: moveEvent.clientY - 25 });
                    setIsDocked(false);
                    cleanup();
                  }
                };
                const handleMouseUp = () => {
                  cleanup();
                  if (hasMoved) {
                    (buttonEl as any).wasDragged = true;
                  }
                };

                // Clean up any existing listeners first
                cleanup();
                dragListenersRef.current = { move: handleMouseMove, up: handleMouseUp };
                window.addEventListener('mousemove', handleMouseMove);
                window.addEventListener('mouseup', handleMouseUp);
              }}
              className={styles.iconButton}
              aria-label={t('masthead.openMarty')}
            >
              <MartyAvatar size={20} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
