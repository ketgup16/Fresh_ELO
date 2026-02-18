import React from 'react';
import { Bell, HelpCircle, User, AppSwitcher } from '@/components/icons';
import { useMarty } from '@/contexts/MartyContext';
import { Divider } from './Divider';
import styles from './MastHead.module.css';

interface MastHeadProps {
  companyName?: string;
  appName?: string;
  dropdownLabel?: string;
  onDropdownClick?: () => void;
}

export function MastHead({
  companyName = 'Company Name',
  appName = 'Ad Center',
  dropdownLabel = 'Display',
  onDropdownClick,
}: MastHeadProps) {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        {/* App Switcher */}
        <button className={styles.iconButton} aria-label="App switcher">
          <AppSwitcher style={{ width: 16, height: 16 }} />
        </button>

        {/* Logo / App Name */}
        <div className={styles.logoArea}>
          <span className={styles.logoText}>
            <span className={styles.logoBold}>Walmart</span>
            {' '}
            <span className={styles.logoLight}>Connect</span>
          </span>
          <Divider orientation="vertical" UNSAFE_style={{ height: 20, margin: '0 12px' }} />
          <span className={styles.appName}>{appName}</span>
        </div>
      </div>

      <div className={styles.right}>
        {/* Dropdown */}
        <button className={styles.dropdownButton} onClick={onDropdownClick}>
          <span>{dropdownLabel}</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
          </svg>
        </button>

        <Divider orientation="vertical" UNSAFE_style={{ height: 20, margin: '0 8px' }} />

        {/* Company Name */}
        <button className={styles.dropdownButton}>
          <span>{companyName}</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
          </svg>
        </button>

        <Divider orientation="vertical" UNSAFE_style={{ height: 20, margin: '0 8px' }} />

        {/* Action Icons */}
        <div className={styles.actions}>
          <button className={styles.iconButton} aria-label="Notifications">
            <Bell style={{ width: 16, height: 16 }} />
          </button>
          <button className={styles.iconButton} aria-label="Settings">
            <HelpCircle style={{ width: 16, height: 16 }} />
          </button>
          <button className={styles.iconButton} aria-label="Account">
            <User style={{ width: 16, height: 16 }} />
          </button>
        </div>

        {/* Avatar */}
        <div className={styles.avatar}>
          <span className={styles.avatarText}>G</span>
        </div>
      </div>
    </header>
  );
}
