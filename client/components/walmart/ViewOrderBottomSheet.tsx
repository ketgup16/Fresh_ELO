import { useState } from 'react';
import { WCPRichMediaSheet } from './WCPRichMediaSheet';
import { DaySelector } from './DaySelector';
import { TimeSelector } from './TimeSelector';
import { Button } from '@/components/ui/Button';
import { LinkButton } from '@/components/ui/LinkButton';
import { MagicFill } from '@/components/icons';
import styles from './ViewOrderBottomSheet.module.css';

interface ViewOrderBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  deliveryDay?: string;
  deliveryTime?: string;
  onViewUsuals?: () => void;
}

const DAYS = ['Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

const TIME_SLOTS = ['1pm\u20132pm', '3pm\u20134pm', '2pm\u20133pm', '3pm\u20134pm', '4pm\u20135pm'];

const DAY_TO_FULL: Record<string, string> = {
  Tue: 'Tuesday',
  Wed: 'Wednesday',
  Thur: 'Thursday',
  Fri: 'Friday',
  Sat: 'Saturday',
};

const FULL_TO_SHORT: Record<string, string> = {
  Tuesday: 'Tue',
  Wednesday: 'Wed',
  Thursday: 'Thur',
  Friday: 'Fri',
  Saturday: 'Sat',
};

function timeSlotToLabel(slot: string): string {
  // "4pm–5pm" → "4pm"
  const match = slot.match(/^(\d+[ap]m)/);
  return match ? match[1] : slot;
}

/* ── Overview View ── */
function OverviewView({
  day,
  time,
  onChangeSchedule,
  onViewUsuals,
}: {
  day: string;
  time: string;
  onChangeSchedule: () => void;
  onViewUsuals?: () => void;
}) {
  return (
    <div className={styles.overviewWrapper}>
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/9b6d8a55f90c242ac141216aed48aeaabde06936?width=750"
        alt=""
        className={styles.overviewBg}
        aria-hidden="true"
      />
      <div className={styles.overviewContentLayer}>
        {/* Title + change link */}
        <div className={styles.titleSection}>
          <h2 className={styles.title}>
            Rest easy&mdash;get your groceries delivered every{' '}
            <span className={styles.titleUnderline}>{day}</span> at{' '}
            <span className={styles.titleUnderline}>{time}</span>
          </h2>
          <div className={styles.changeLinkWrap}>
            <LinkButton
              size="small"
              color="default"
              onClick={onChangeSchedule}
            >
              Change day &amp; time
            </LinkButton>
          </div>
        </div>

        {/* Grocery images strip */}
        <div className={styles.visualSection}>
          <div className={styles.imagesStrip}>
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/171cfbc3f0fc02a2d28dfad5a6afbac8b5eb2c57?width=1038"
              alt="Curated grocery items"
              className={styles.imagesStripImg}
            />
          </div>
          <div className={styles.sparkleRow}>
            <MagicFill
              width={16}
              height={16}
              className={styles.sparkleIcon}
            />
            <span className={styles.sparkleText}>
              Curated for you, based on your history
            </span>
          </div>
        </div>

        {/* Dark CTA strip */}
        <div className={styles.ctaStrip}>
          <span className={styles.ctaHeading}>
            Add, edit, or pause anytime.
          </span>
          <div className={styles.ctaButtonWrap}>
            <Button
              variant="primary"
              size="medium"
              isFullWidth
              strokeOn
              onClick={onViewUsuals}
            >
              View your usuals
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Schedule View ── */
function ScheduleView({
  selectedDay,
  selectedTime,
  onDayChange,
  onTimeChange,
  onSave,
}: {
  selectedDay: string;
  selectedTime: string;
  onDayChange: (day: string) => void;
  onTimeChange: (slot: string) => void;
  onSave: () => void;
}) {
  return (
    <div className={styles.scheduleWrapper}>
      <div className={styles.scheduleContentLayer}>
        <div className={styles.scheduleHeader}>
          <h2 className={styles.scheduleTitle}>
            Select your delivery day and time
          </h2>
          <span className={styles.scheduleSubtitle}>
            This will be your preferred day and time for future orders.
          </span>
        </div>

        <div className={styles.scheduleBody}>
          <div className={styles.dayCarouselWrap}>
            <DaySelector
              days={DAYS}
              selectedDays={selectedDay}
              onChange={onDayChange}
            />
          </div>

          <TimeSelector
            timeSlots={TIME_SLOTS}
            selectedSlot={selectedTime}
            onChange={onTimeChange}
          />
        </div>

        <div className={styles.scheduleCta}>
          <Button
            variant="primary"
            size="medium"
            isFullWidth
            strokeOn
            onClick={onSave}
          >
            Save changes
          </Button>
          <div className={styles.scheduleLinkWrap}>
            <LinkButton size="small" color="default">
              View all preferences
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main Component ── */
export function ViewOrderBottomSheet({
  isOpen,
  onClose,
  deliveryDay = 'Friday',
  deliveryTime = '4pm',
  onViewUsuals,
}: ViewOrderBottomSheetProps) {
  const [view, setView] = useState<'overview' | 'schedule'>('overview');
  const [savedDay, setSavedDay] = useState(deliveryDay);
  const [savedTime, setSavedTime] = useState(deliveryTime);

  // Schedule editing state
  const shortDay = FULL_TO_SHORT[savedDay] ?? 'Fri';
  const [editDay, setEditDay] = useState(shortDay);
  const [editTime, setEditTime] = useState(
    TIME_SLOTS.find((s) => s.startsWith(savedTime.replace('pm', 'pm'))) ??
      TIME_SLOTS[TIME_SLOTS.length - 1]
  );

  const handleChangeSchedule = () => {
    // Reset editing state to current saved values
    setEditDay(FULL_TO_SHORT[savedDay] ?? 'Fri');
    setEditTime(
      TIME_SLOTS.find((s) => s.startsWith(savedTime)) ??
        TIME_SLOTS[TIME_SLOTS.length - 1]
    );
    setView('schedule');
  };

  const handleSave = () => {
    const fullDay = DAY_TO_FULL[editDay] ?? editDay;
    const timeLabel = timeSlotToLabel(editTime);
    setSavedDay(fullDay);
    setSavedTime(timeLabel);
    setView('overview');
  };

  const handleClose = () => {
    setView('overview');
    onClose();
  };

  const handleViewUsuals = () => {
    onViewUsuals?.();
    handleClose();
  };

  return (
    <WCPRichMediaSheet
      isOpen={isOpen}
      onClose={handleClose}
      headerVariant="none"
      surfaceVariant={view === 'schedule' ? 'brand-gradient' : 'default'}
      adjustHeight="content"
      ariaLabel="View your upcoming delivery"
    >
      {view === 'overview' ? (
        <OverviewView
          day={savedDay}
          time={savedTime}
          onChangeSchedule={handleChangeSchedule}
          onViewUsuals={handleViewUsuals}
        />
      ) : (
        <ScheduleView
          selectedDay={editDay}
          selectedTime={editTime}
          onDayChange={setEditDay}
          onTimeChange={setEditTime}
          onSave={handleSave}
        />
      )}
    </WCPRichMediaSheet>
  );
}
