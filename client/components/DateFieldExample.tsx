import React from 'react';
import { DateField } from '@/components/ui/DateField';

export function DateFieldExample() {
  const [controlledValue, setControlledValue] = React.useState('');
  const [validationError, setValidationError] = React.useState('');

  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
      {/* Default */}
      <ExampleSection
        title="Default"
        description="A basic date field with label. Validates mm/dd/yyyy format on blur."
      >
        <div style={{ width: 296 }}>
          <DateField label="Start date" />
        </div>
      </ExampleSection>

      {/* With Calendar Icon */}
      <ExampleSection
        title="With Calendar Icon"
        description="Shows a decorative calendar icon inside the input. The icon is purely visual."
      >
        <div style={{ width: 296 }}>
          <DateField label="End date" showCalendarIcon />
        </div>
      </ExampleSection>

      {/* With Helper Text */}
      <ExampleSection
        title="With Helper Text"
        description="Helper text provides additional guidance below the input."
      >
        <div style={{ width: 296 }}>
          <DateField
            label="Campaign start"
            helperText="Date must be today or in the future"
            showCalendarIcon
          />
        </div>
      </ExampleSection>

      {/* Error State */}
      <ExampleSection
        title="Error State"
        description="Pass an error prop to show error styling and a message below the field."
      >
        <div style={{ width: 296 }}>
          <DateField
            label="Start date"
            error="Please enter a valid date (mm/dd/yyyy)"
            defaultValue="13/45/2024"
            showCalendarIcon
          />
        </div>
      </ExampleSection>

      {/* Disabled State */}
      <ExampleSection
        title="Disabled"
        description="A disabled date field prevents all interaction and appears with reduced contrast."
      >
        <div style={{ width: 296 }}>
          <DateField
            label="Start date"
            disabled
            defaultValue="01/15/2026"
            showCalendarIcon
          />
        </div>
      </ExampleSection>

      {/* Built-in Validation */}
      <ExampleSection
        title="Built-in Validation"
        description="Type an invalid date and blur the input to see automatic validation. Try '02/30/2024' or '99/01/2025'."
      >
        <div style={{ display: 'flex', gap: 24 }}>
          <div style={{ width: 296 }}>
            <DateField
              label="Validated field"
              showCalendarIcon
              onValidationError={(err) => setValidationError(err)}
            />
          </div>
          {validationError && (
            <div style={{
              alignSelf: 'flex-end',
              fontSize: 12,
              color: 'var(--ld-semantic-color-text-subtle)',
              fontFamily: 'var(--ld-semantic-font-family-mono)',
            }}>
              onValidationError: "{validationError}"
            </div>
          )}
        </div>
      </ExampleSection>

      {/* Validation Disabled */}
      <ExampleSection
        title="Validation Disabled"
        description="Set validateOnBlur={false} to skip built-in validation. Useful when the consumer handles validation externally."
      >
        <div style={{ width: 296 }}>
          <DateField
            label="External validation"
            validateOnBlur={false}
            showCalendarIcon
          />
        </div>
      </ExampleSection>

      {/* Controlled */}
      <ExampleSection
        title="Controlled"
        description="A controlled date field where the consumer manages value and onChange."
      >
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end' }}>
          <div style={{ width: 296 }}>
            <DateField
              label="Controlled date"
              value={controlledValue}
              onChange={(e) => setControlledValue(e.target.value)}
              showCalendarIcon
            />
          </div>
          <div style={{
            fontSize: 12,
            color: 'var(--ld-semantic-color-text-subtle)',
            fontFamily: 'var(--ld-semantic-font-family-mono)',
            paddingBottom: 4,
          }}>
            value: "{controlledValue}"
          </div>
        </div>
      </ExampleSection>

      {/* All States Side-by-Side */}
      <ExampleSection
        title="All States"
        description="Default, focused (click into it), error, and disabled states displayed side-by-side."
      >
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ width: 220 }}>
            <DateField label="Default" showCalendarIcon />
          </div>
          <div style={{ width: 220 }}>
            <DateField
              label="Error"
              error="Invalid date"
              defaultValue="13/01/2025"
              showCalendarIcon
            />
          </div>
          <div style={{ width: 220 }}>
            <DateField
              label="Disabled"
              disabled
              defaultValue="01/15/2026"
              showCalendarIcon
            />
          </div>
        </div>
      </ExampleSection>
    </div>
  );
}

function ExampleSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3 style={{
          fontSize: '16px',
          fontWeight: 700,
          color: 'var(--ld-semantic-color-text)',
          margin: 0,
          fontFamily: 'var(--ld-semantic-font-family-sans)',
        }}>
          {title}
        </h3>
        <p style={{
          fontSize: '14px',
          color: 'var(--ld-semantic-color-text-subtle)',
          margin: '4px 0 0',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
        }}>
          {description}
        </p>
      </div>
      <div style={{
        padding: '24px',
        borderRadius: 'var(--ld-primitive-scale-border-radius-100)',
        border: '1px solid var(--ld-semantic-color-border-subtlest, #E8E9EB)',
        backgroundColor: 'var(--ld-semantic-color-surface, #fff)',
        display: 'flex',
        alignItems: 'center',
      }}>
        {children}
      </div>
    </div>
  );
}
