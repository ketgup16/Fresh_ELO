import React from 'react';
import SkeletonExample from '@/components/examples/SkeletonExample';

export default function SkeletonPage() {
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
          color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
          marginBottom: '12px'
        }}>
          Skeleton
        </h1>
        <p style={{
          fontSize: '16px',
          lineHeight: '1.6',
          color: 'var(--ld-semantic-color-text-secondary, #74767C)',
          maxWidth: '800px',
          marginBottom: '12px'
        }}>
          A Skeleton is a low-fidelity shape that approximates a user interface element and indicates 
          loading of content. A group of Skeletons roughly matching a loaded screen can improve perceived 
          responsiveness when loading data is slow.
        </p>
        <p style={{
          fontSize: '16px',
          lineHeight: '1.6',
          color: 'var(--ld-semantic-color-text-secondary, #74767C)',
          maxWidth: '800px'
        }}>
          The <strong>isMagic</strong> variant indicates AI-generated content with a special shimmer 
          animation. Use this when loading AI-powered features or content generation.
        </p>
      </div>

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <SkeletonExample />
        </React.Suspense>
      </div>
    </div>
  );
}
