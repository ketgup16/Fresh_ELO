import React from 'react';
import { DatePickerExample } from '@/components/examples/DatePickerExample';
import {
  DeliverySchedulerExample,
  DaySelectorStates,
  TimeSelectorStates,
} from '@/components/examples/DeliverySchedulerExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { useTranslation } from 'react-i18next';
import styles from './DatePickers.module.css';
import pageStyles from '@/components/examples/ExamplePage.module.css';

export default function DatePickersPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout
      section={t('componentLibrary.components')}
      title={t('componentLibrary.navDatePickers')}
      description={t('componentLibrary.descDatePickers')}
    >

      <div className={pageStyles.pageGap}>
      {/* ── DatePicker (existing) ── */}
      <div className={pageStyles.section}>
        <h2 className={pageStyles.sectionTitle}>Component Demo</h2>
      <div className={pageStyles.demoFrame}>
        <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
          <DatePickerExample />
        </React.Suspense>
      </div>
      </div>

      {/* ── DaySelector ── */}
      <div className={pageStyles.section}>
        <h2 className={pageStyles.sectionTitle}>DaySelector</h2>
        <p className={pageStyles.desc}>
          Horizontal row of circular day buttons. Supports single-select (radio behaviour) and multi-select (checkbox behaviour). Use it alongside <code>TimeSelector</code> for scheduling flows like delivery window or appointment booking.
        </p>

        <div className={pageStyles.demoFrame}>
          <DaySelectorStates />
        </div>

        <div className={styles.propTable}>
          <div className={styles.propRowHeader}>
            <span>Prop</span>
            <span>Required?</span>
            <span>Description</span>
          </div>
          {[
            { name: 'days', required: true, desc: 'Array of day label strings, e.g. ["Sun", "Mon", …, "Sat"]' },
            { name: 'selectedDays', required: true, desc: 'Selected day string, or array of strings when multiSelect is true' },
            { name: 'onChange', required: true, desc: 'Callback (day: string) => void — fired on tap/click' },
            { name: 'multiSelect', required: false, desc: 'Allows multiple days to be selected simultaneously. Defaults to false.' },
            { name: 'disabled', required: false, desc: 'Disables all day buttons when true' },
          ].map((row) => (
            <div key={row.name} className={styles.propRow}>
              <span className={styles.propName}>{row.name}</span>
              <span className={row.required ? styles.propRequired : styles.propOptional}>
                {row.required ? 'Required' : 'Optional'}
              </span>
              <p className={styles.propDesc}>{row.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── TimeSelector ── */}
      <div className={pageStyles.section}>
        <h2 className={pageStyles.sectionTitle}>TimeSelector</h2>
        <p className={pageStyles.desc}>
          A vertically-stacked list of radio-style time slot options. The unselected state uses a subtle brand-tinted background; the selected state highlights the row with a branded border and bold label. Pair with <code>DaySelector</code> to build a delivery or appointment scheduling UI.
        </p>

        <div className={pageStyles.demoFrame} style={{ maxWidth: 480 }}>
          <TimeSelectorStates />
        </div>

        <div className={styles.propTable}>
          <div className={styles.propRowHeader}>
            <span>Prop</span>
            <span>Required?</span>
            <span>Description</span>
          </div>
          {[
            { name: 'timeSlots', required: true, desc: 'Array of time-slot strings, e.g. ["1pm–2pm", "2pm–3pm"]' },
            { name: 'selectedSlot', required: true, desc: 'Currently selected slot string, or null when nothing is selected' },
            { name: 'onChange', required: true, desc: 'Callback (slot: string) => void — fired when a slot is tapped' },
            { name: 'disabled', required: false, desc: 'Disables all rows when true' },
          ].map((row) => (
            <div key={row.name} className={styles.propRow}>
              <span className={styles.propName}>{row.name}</span>
              <span className={row.required ? styles.propRequired : styles.propOptional}>
                {row.required ? 'Required' : 'Optional'}
              </span>
              <p className={styles.propDesc}>{row.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Combined scheduler ── */}
      <div className={pageStyles.section}>
        <h2 className={pageStyles.sectionTitle}>Delivery Scheduler — Combined example</h2>
        <p className={pageStyles.desc}>
          Full scheduling flow combining <code>DaySelector</code> and <code>TimeSelector</code>. The available time slots update based on the selected day, and a confirmation strip appears once both day and time are chosen.
        </p>

        <div className={pageStyles.demoFrame}>
          <DeliverySchedulerExample />
        </div>

        <div className={styles.importBox}>
          <code>
            import {'{'} DaySelector {'}'} from '@/components/walmart/DaySelector';<br />
            import {'{'} TimeSelector {'}'} from '@/components/walmart/TimeSelector';
          </code>
        </div>
      </div>

      </div>
    </ComponentPageLayout>
  );
}
