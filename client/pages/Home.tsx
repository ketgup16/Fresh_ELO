import { MobileTopNav } from '@/components/walmart/MobileTopNav';
import { BottomNav } from '@/components/walmart/BottomNav';
import { NativeStatusBar } from '@/components/walmart/NativeStatusBar';
import { Chat } from '@/components/icons';
import styles from './Home.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      {/* Status bar + Top nav */}
      <div className={styles.topNavWrapper}>
        <NativeStatusBar platform="ios" />
        <MobileTopNav
          forceVisible
          forceNative
          nativeTitle="Title"
          nativeSubtitle="Subtitle"
          showNativeSubtitle
          showNativeAction1
          showNativeAction2={false}
          showNativeAction3={false}
          action1Icon={<Chat />}
          showNativeAvatarButton
          avatarInitials="SC"
          avatarIndicator="clock"
          avatarClockState="active"
          nativeOSPlatform="ios"
        />
      </div>

      {/* Main content */}
      <div className={styles.content}>
        <div className={styles.greeting}>
          <h1 className={styles.greetingText}>Good morning, Sarah</h1>
          <p className={styles.greetingSubtext}>Here is what is happening today</p>
        </div>

        {/* Quick Actions */}
        <div className={styles.quickActions}>
          <button className={styles.actionCard} type="button">
            <div className={styles.actionIcon}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z" stroke="currentColor" strokeWidth="1.5"/><path d="M8 5V8L10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </div>
            <span className={styles.actionLabel}>Clock In</span>
          </button>
          <button className={styles.actionCard} type="button">
            <div className={styles.actionIcon}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4H14M2 8H14M2 12H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </div>
            <span className={styles.actionLabel}>Tasks</span>
          </button>
          <button className={styles.actionCard} type="button">
            <div className={styles.actionIcon}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13 2H3C2.44772 2 2 2.44772 2 3V13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13V3C14 2.44772 13.5523 2 13 2Z" stroke="currentColor" strokeWidth="1.5"/><path d="M2 6H14" stroke="currentColor" strokeWidth="1.5"/></svg>
            </div>
            <span className={styles.actionLabel}>Schedule</span>
          </button>
          <button className={styles.actionCard} type="button">
            <div className={styles.actionIcon}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2L10 6H14L11 9L12 14L8 11L4 14L5 9L2 6H6L8 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
            </div>
            <span className={styles.actionLabel}>Goals</span>
          </button>
          <button className={styles.actionCard} type="button">
            <div className={styles.actionIcon}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M14 11V13C14 13.5523 13.5523 14 13 14H3C2.44772 14 2 13.5523 2 13V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M8 2V10M8 10L5 7M8 10L11 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <span className={styles.actionLabel}>Reports</span>
          </button>
        </div>

        {/* My Tasks Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>My Tasks</h2>
          </div>
          <div className={styles.taskCard}>
            <div className={styles.taskCardContent}>
              <p className={styles.taskCardTitle}>Shelf stocking - Aisle 4</p>
              <p className={styles.taskCardDesc}>12 cases remaining</p>
            </div>
          </div>
          <div className={styles.taskCard}>
            <div className={styles.taskCardContent}>
              <p className={styles.taskCardTitle}>Price changes review</p>
              <p className={styles.taskCardDesc}>8 items need attention</p>
            </div>
          </div>
          <div className={styles.taskCard}>
            <div className={styles.taskCardContent}>
              <p className={styles.taskCardTitle}>Returns processing</p>
              <p className={styles.taskCardDesc}>3 items pending</p>
            </div>
          </div>
        </div>

        {/* Metrics Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Today at a Glance</h2>
          </div>
          <div className={styles.metricsRow}>
            <div className={styles.metricCard}>
              <span className={styles.metricValue}>12</span>
              <span className={styles.metricLabel}>Tasks to do</span>
            </div>
            <div className={styles.metricCard}>
              <span className={styles.metricValue}>2</span>
              <span className={styles.metricLabel}>Late</span>
            </div>
            <div className={styles.metricCard}>
              <span className={styles.metricValue}>85%</span>
              <span className={styles.metricLabel}>On track</span>
            </div>
          </div>
        </div>

        <div className={styles.bottomSpacer} />
      </div>

      {/* Bottom nav */}
      <BottomNav activeTab="shop" contained={false} />
    </div>
  );
}
