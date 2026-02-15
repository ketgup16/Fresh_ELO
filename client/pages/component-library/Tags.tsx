import React from 'react';
import { TagExample } from '@/components/examples/TagExample';

export default function TagsPage() {
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
          color: 'var(--ld-semantic-color-text)',
          marginBottom: '12px'
        }}>
          Tags
        </h1>
        <p style={{
          fontSize: '16px',
          lineHeight: '1.6',
          color: 'var(--ld-semantic-color-text-subtlest)',
          maxWidth: '800px'
        }}>
          Tags are compact labels for categorizing and organizing content. They support multiple variants (primary, secondary, tertiary), 
          semantic colors, and optional leading icons. Tags are non-interactive display elements.
        </p>
      </div>

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-surface)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <TagExample />
        </React.Suspense>
      </div>
    </div>
  );
}
