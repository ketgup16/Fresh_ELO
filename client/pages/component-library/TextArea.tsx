import React from 'react';
import TextareaExample from '@/components/examples/TextareaExample';

export default function TextAreaPage() {
  return (
    <div style={{
      padding: '48px',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text, #2E2F32)',
          marginBottom: '12px'
        }}>
          Text Area
        </h1>
        <p style={{
          fontSize: '16px',
          lineHeight: '1.6',
          color: 'var(--ld-semantic-color-text-subtle, #74767C)',
          maxWidth: '800px'
        }}>
          Multi-line text input component with support for labels, error states, helper text,
          character counting, and AI-generated content indicators. Built with Living Design 3.5
          semantic tokens for consistent styling across all states and sizes.
        </p>
      </div>

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <TextareaExample />
        </React.Suspense>
      </div>
    </div>
  );
}
