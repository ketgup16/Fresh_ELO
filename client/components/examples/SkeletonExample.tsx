import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function SkeletonExample() {
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
          Loading Skeleton
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
          <Skeleton className="h-12 w-12 rounded-full" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </section>

      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary)',
          marginBottom: '16px'
        }}>
          Card Skeleton
        </h3>
        <div style={{
          maxWidth: '400px',
          padding: '24px',
          border: '1px solid var(--ld-semantic-color-border-moderate)',
          borderRadius: '8px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <Skeleton className="h-12 w-12 rounded-full" />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-4 w-[100px]" />
            </div>
          </div>
          <Skeleton className="h-[200px] w-full" />
        </div>
      </section>
    </div>
  );
}
