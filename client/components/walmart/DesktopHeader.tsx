import { useState, useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Menu, Placeholder } from '@/components/icons';
import { IconButton } from '@/components/ui/IconButton';
import { AXSearchField } from './AXSearchField';
import { AXAvatarButton } from './AXAvatarButton';
import { AvatarFallback } from '@/components/ui/avatar';
import { LinkButton } from '@/components/ui/LinkButton';
import { MobileMenuPanel } from './MobileMenuPanel';
import styles from './DesktopHeader.module.css';

export function DesktopHeader() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showMenuPanel, setShowMenuPanel] = useState(false);
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);
  const [menuPos, setMenuPos] = useState<{ top: number; right: number } | null>(null);
  const buttonWrapperRef = useRef<HTMLDivElement>(null);
  const menuPortalRef = useRef<HTMLDivElement>(null);

  // Close avatar menu on outside click
  useEffect(() => {
    if (!showAvatarMenu) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      const inButton = buttonWrapperRef.current?.contains(target);
      const inMenu = menuPortalRef.current?.contains(target);
      if (!inButton && !inMenu) {
        setShowAvatarMenu(false);
        setMenuPos(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showAvatarMenu]);

  // Keep menu anchored while scrolling/resizing
  useEffect(() => {
    if (!showAvatarMenu) return;
    const updatePos = () => {
      const rect = buttonWrapperRef.current?.getBoundingClientRect();
      if (rect) {
        setMenuPos({ top: rect.bottom + 4, right: window.innerWidth - rect.right });
      }
    };
    window.addEventListener('scroll', updatePos, true);
    window.addEventListener('resize', updatePos);
    return () => {
      window.removeEventListener('scroll', updatePos, true);
      window.removeEventListener('resize', updatePos);
    };
  }, [showAvatarMenu]);

  const handleAvatarClick = useCallback(() => {
    if (showAvatarMenu) {
      setShowAvatarMenu(false);
      setMenuPos(null);
    } else {
      const rect = buttonWrapperRef.current?.getBoundingClientRect();
      if (rect) {
        setMenuPos({ top: rect.bottom + 4, right: window.innerWidth - rect.right });
      }
      setShowAvatarMenu(true);
    }
  }, [showAvatarMenu]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          {/* Row 1: Menu | Title | Action buttons + Avatar */}
          <div className={styles.headerRow}>
            <IconButton
              variant="white"
              size="medium"
              aria-label="Menu"
              onClick={() => setShowMenuPanel(true)}
            >
              <Menu />
            </IconButton>

            <div className={styles.titleArea}>
              <span className={styles.titleText}>Page Title</span>
              <span className={styles.subtitleText}>Subtitle</span>
            </div>

            <div className={styles.actions}>
              <IconButton variant="white" size="medium" aria-label="Action 1">
                <Placeholder />
              </IconButton>
              <IconButton variant="white" size="medium" aria-label="Action 2">
                <Placeholder />
              </IconButton>
              <IconButton variant="white" size="medium" aria-label="Action 3">
                <Placeholder />
              </IconButton>

              <div ref={buttonWrapperRef} className={styles.avatarWrapper}>
                <AXAvatarButton
                  size="small"
                  aria-label="Account"
                  onClick={handleAvatarClick}
                >
                  <AvatarFallback style={{
                    fontFamily: 'var(--ld-semantic-font-body-small-family)',
                    fontSize: 'var(--ld-semantic-font-body-small-size, 0.875rem)',
                    fontWeight: 'var(--ld-semantic-font-body-small-weight-default, 400)',
                    lineHeight: 'var(--ld-semantic-font-body-small-line-height, 1.25rem)',
                  }}>
                    WM
                  </AvatarFallback>
                </AXAvatarButton>
              </div>
            </div>
          </div>

          {/* Row 2: Search bar */}
          <div className={styles.searchRow}>
            <AXSearchField
              value={searchQuery}
              onChange={setSearchQuery}
              showMic={false}
              showBarcode={false}
              size="small"
              cornerStyle="rounded"
            />
          </div>
        </div>
      </header>

      {/* Avatar dropdown menu */}
      {showAvatarMenu && menuPos && ReactDOM.createPortal(
        <div
          ref={menuPortalRef}
          className={styles.avatarMenu}
          style={{
            top: menuPos.top,
            right: menuPos.right,
          }}
        >
          {/* Header: avatar + name + sign out */}
          <div className={styles.avatarMenuHeader}>
            <div className={styles.avatarMenuCircle}>
              <span className={styles.avatarMenuInitials}>WM</span>
            </div>
            <span className={styles.avatarMenuName}>Walmart Associate</span>
            <LinkButton size="small" onClick={() => { setShowAvatarMenu(false); setMenuPos(null); }}>Sign out</LinkButton>
          </div>

          {/* Club Info row */}
          <div className={styles.avatarMenuSeparator} />
          <div className={styles.avatarMenuRow}>
            <div className={styles.avatarMenuRowContent}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.avatarMenuIcon}>
                <path fillRule="evenodd" clipRule="evenodd" d="M3 6.83C3.024 5.527 3.563 4.287 4.501 3.381C5.438 2.476 6.697 1.979 8 2.001C9.303 1.979 10.562 2.476 11.499 3.381C12.437 4.287 12.976 5.527 13 6.831C12.843 8.372 12.162 9.812 11.07 10.911C10.145 11.959 9.143 12.935 8.07 13.831L8 13.891L7.93 13.831C6.857 12.935 5.855 11.959 4.93 10.911C3.838 9.812 3.157 8.372 3 6.831ZM8 1.001C6.432.979 4.919 1.581 3.794 2.674C2.669 3.767 2.024 5.262 2 6.831C2 10.011 5.5 13.041 7.27 14.581L7.56 14.841C7.684 14.943 7.839 14.999 8 15.001C8.161 14.999 8.316 14.943 8.44 14.841L8.73 14.581C10.5 13.001 14 10.001 14 6.831C13.976 5.262 13.331 3.767 12.206 2.674C11.081 1.581 9.568.979 8 1.001ZM6.5 7.001C6.5 6.603 6.658 6.221 6.939 5.940C7.221 5.659 7.602 5.501 8 5.501V4.501C7.337 4.501 6.701 4.764 6.232 5.233C5.763 5.702 5.5 6.338 5.5 7.001C5.5 7.664 5.763 8.299 6.232 8.768C6.701 9.237 7.337 9.501 8 9.501C8.663 9.501 9.299 9.237 9.768 8.768C10.237 8.299 10.5 7.664 10.5 7.001H9.5C9.5 7.398 9.342 7.780 9.061 8.061C8.779 8.343 8.398 8.501 8 8.501C7.602 8.501 7.221 8.343 6.939 8.061C6.658 7.780 6.5 7.398 6.5 7.001Z" fill="var(--ld-semantic-color-text-subtlest, #74767C)"/>
              </svg>
              <div className={styles.avatarMenuRowLabels}>
                <span className={styles.avatarMenuRowSubtle}>Club #0001</span>
                <span className={styles.avatarMenuRowText}>Member Services</span>
              </div>
            </div>
            <LinkButton size="small" onClick={() => { setShowAvatarMenu(false); setMenuPos(null); }}>Change</LinkButton>
          </div>

          {/* Report Issues row */}
          <div className={styles.avatarMenuSeparator} />
          <div className={styles.avatarMenuRow}>
            <div className={styles.avatarMenuRowContent}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.avatarMenuIcon}>
                <path d="M14 14V2H1V1H15V15H1V2H2V14H14Z" fill="var(--ld-semantic-color-text-subtlest, #74767C)"/>
              </svg>
              <span className={styles.avatarMenuRowText}>Report issues or leave feedback</span>
            </div>
          </div>

          {/* See What's New row */}
          <div className={styles.avatarMenuSeparator} />
          <div className={styles.avatarMenuRow}>
            <div className={styles.avatarMenuRowContent}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.avatarMenuIcon}>
                <path d="M8.248 2.292C7.37 3.275 7.064 4.623 7.399 5.869L7.427 5.962L1.147 12.241C0.951 12.436 0.951 12.753 1.147 12.948L3.052 14.853L3.122 14.911C3.316 15.046 3.586 15.027 3.759 14.853L10.042 8.572L10.136 8.600C11.449 8.950 12.876 8.589 13.867 7.598C14.942 6.524 15.277 4.937 14.764 3.535L14.726 3.454C14.566 3.178 14.178 3.116 13.941 3.353L12.438 4.852L11.380 4.620L11.148 3.563L12.653 2.061C12.911 1.804 12.815 1.365 12.473 1.239C11.068 0.721 9.477 1.055 8.400 2.132L8.248 2.292Z" fill="var(--ld-semantic-color-text-subtlest, #74767C)"/>
              </svg>
              <span className={styles.avatarMenuRowText}>See what's new</span>
            </div>
            <span className={styles.avatarMenuRowSubtle}>v 3.5.1</span>
          </div>

          {/* Supervisor Sign In row */}
          <div className={styles.avatarMenuSeparator} />
          <div className={styles.avatarMenuRow}>
            <div className={styles.avatarMenuRowContent}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.avatarMenuIcon}>
                <path d="M8 9.333C8.368 9.333 8.666 9.035 8.666 8.667C8.666 8.299 8.368 8 8 8C7.632 8 7.333 8.299 7.333 8.667C7.333 9.035 7.632 9.333 8 9.333Z" fill="var(--ld-semantic-color-text-subtlest, #74767C)"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M10.949 6.113L8 0.583L5.05 6.113L1.232 4.204L2.002 13.049C2.018 13.263 2.136 13.465 2.336 13.579C2.391 13.611 2.449 13.642 2.508 13.672C3.438 14.258 5.547 14.667 8 14.667C10.453 14.667 12.563 14.258 13.493 13.672C13.551 13.642 13.608 13.611 13.664 13.579C13.864 13.464 13.983 13.262 13.998 13.048L14.767 4.204L10.949 6.113ZM12.752 11.983L13.232 6.462L10.384 7.887L8 3.417L5.616 7.887L2.767 6.462L3.247 11.983C4.344 11.588 6.065 11.333 8 11.333C9.934 11.333 11.655 11.588 12.752 11.983ZM12.577 12.628C11.500 13.078 9.794 13.333 8 13.333C6.205 13.333 4.499 13.078 3.423 12.628C3.573 12.572 3.744 12.517 3.936 12.464C4.948 12.183 6.386 12 8 12C9.614 12 11.051 12.183 12.064 12.464C12.255 12.517 12.426 12.572 12.577 12.628Z" fill="var(--ld-semantic-color-text-subtlest, #74767C)"/>
              </svg>
              <span className={styles.avatarMenuRowText}>Supervisor sign in</span>
            </div>
          </div>
        </div>,
        document.body
      )}

      <MobileMenuPanel
        isOpen={showMenuPanel}
        onClose={() => setShowMenuPanel(false)}
      />
    </>
  );
}
