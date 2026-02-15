import React from 'react';
import { Calendar } from '@/components/ui/calendar';

export default function CalendarExample() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [multipleDate, setMultipleDate] = React.useState<Date[] | undefined>([]);

  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary)',
          marginBottom: '16px'
        }}>
          Single Date Selection
        </h3>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
        {date && (
          <p style={{ marginTop: '16px', color: 'var(--ld-semantic-color-text-secondary)' }}>
            Selected: {date.toLocaleDateString()}
          </p>
        )}
      </section>

      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary)',
          marginBottom: '16px'
        }}>
          Multiple Date Selection
        </h3>
        <Calendar
          mode="multiple"
          selected={multipleDate}
          onSelect={setMultipleDate}
          className="rounded-md border"
        />
        {multipleDate && multipleDate.length > 0 && (
          <p style={{ marginTop: '16px', color: 'var(--ld-semantic-color-text-secondary)' }}>
            Selected {multipleDate.length} date(s)
          </p>
        )}
      </section>
    </div>
  );
}
