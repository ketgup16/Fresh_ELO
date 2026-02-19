import React from 'react';
import { MastHead } from '@/components/ui/MastHead';
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import { Divider } from '@/components/ui/Divider';
import { AppSidebar } from '@/components/ui/AppSidebar';
import { CatalogHero } from '@/features/catalog/CatalogHero';
import { CatalogTodoList } from '@/features/catalog/CatalogTodoList';

export default function Catalog() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <MastHead />

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <AppSidebar />

        <main
          style={{
            flex: 1,
            overflowY: 'auto',
            backgroundColor: 'var(--ld-semantic-color-background-subtle, #F5F6F6)',
          }}
        >
          {/* Branded background bar */}
          <div
            style={{
              height: 200,
              borderBottom: '1px solid var(--ld-semantic-color-separator, #E3E4E5)',
              background: 'var(--ld-semantic-color-surface-brand, #E9F1FE)',
            }}
          />

          {/* Page content overlapping the branded bar */}
          <div
            style={{
              maxWidth: 1280,
              margin: '0 auto',
              padding: '0 24px 24px',
              marginTop: -176,
              position: 'relative',
            }}
          >
            {/* Page header */}
            <div style={{ marginBottom: 24 }}>
              <h1
                style={{
                  fontFamily: "var(--ld-semantic-font-heading-large-family, 'Everyday Sans UI', -apple-system, Roboto, sans-serif)",
                  fontSize: 'var(--ld-semantic-font-heading-large-size, 32px)',
                  fontWeight: 'var(--ld-semantic-font-heading-large-weight-default, 700)',
                  lineHeight: 'var(--ld-semantic-font-heading-large-lineheight, 1.25)',
                  color: 'var(--ld-semantic-color-text, #2E2F32)',
                }}
              >
                Catalog
              </h1>
            </div>

            {/* Hero + Todo content card */}
            <div
              style={{
                borderRadius: 'var(--ld-primitive-scale-borderRadius-100, 8px)',
                background: 'var(--ld-semantic-color-surface, #FFFFFF)',
                boxShadow: '0 -1px 2px 0 rgba(0, 0, 0, 0.10), 0 1px 2px 1px rgba(0, 0, 0, 0.15)',
                overflow: 'hidden',
              }}
            >
              <CatalogHero />
              <CatalogTodoList />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
