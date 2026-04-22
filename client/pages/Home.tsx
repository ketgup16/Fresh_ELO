import { MobileTopNav } from '@/components/walmart/MobileTopNav';
import { BottomNav } from '@/components/walmart/BottomNav';
import { Chat } from '@/components/icons';
import { ClockingWidget } from '@/components/walmart/ClockingWidget';
import { ScheduleWidget, type Shift } from '@/components/walmart/ScheduleWidget';
import styles from './Home.module.css';

const SHIFTS: Shift[] = [
  {
    id: '1',
    dateLabel: 'Today, 7:30 - 4:00pm',
    role: 'Food & Consumables TL',
    lunchTime: '12:00pm - 12:30pm',
    store: 'Store #972',
    isOffsite: true,
    showReportAbsence: true,
  },
  {
    id: '2',
    dateLabel: 'Thu, Mar 20, 7:30 - 4:00pm',
    role: 'Food & Consumables TL',
    lunchTime: '12:00pm - 12:30pm',
    store: 'Store #972',
  },
  {
    id: '3',
    dateLabel: 'Sat, Mar 22, 7:30 - 4:00pm',
    role: 'Food & Consumables TL',
    lunchTime: '12:00pm - 12:30pm',
    store: 'Store #972',
  },
];

export default function Home() {
  return (
    <div className={styles.page}>
      {/* Status bar + Top nav */}
      <div className={styles.topNavWrapper}>
        <MobileTopNav
          forceVisible
          forceNative
          showHomeExtras
          nativeTitle="For You"
          showNativeSubtitle={false}
          showNativeAction1
          showNativeAction2={false}
          showNativeAction3={false}
          action1Icon={<Chat />}
          showNativeAvatarButton
          avatarInitials="AC"
          avatarIndicator="clock"
          avatarClockState="active"
          nativeOSPlatform="ios"
        />
      </div>

      {/* Clocking widget */}
      <ClockingWidget
        clockState="clocked-out"
        role="Food & Consumables TL"
        shiftTime="Today, 7:30am – 4:00pm"
        lunchTime="12:00pm – 12:30pm"
        storeNumber="Store #972"
        walmartWeek="WM WK 9"
      />

      {/* Schedule widget */}
      <div className={styles.content}>
        <ScheduleWidget shifts={SHIFTS} />
        <div className={styles.bottomSpacer} />
      </div>

      {/* Bottom nav */}
      <BottomNav activeTab="for-you" contained={false} showSquiggly />
    </div>
  );
}
