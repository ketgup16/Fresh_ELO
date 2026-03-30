import * as React from 'react';
import { List, ListItem } from '@/components/ui/List';
import { SpotIcon } from '@/components/ui/SpotIcon';
import { Article, Star, Settings, Bell } from '@/components/icons';

/**
 * Example component demonstrating all 16 List / ListItem variants
 * from the LD 3.5 Figma design.
 *
 * Variants are organized as a 4×4 grid:
 *   Leading: Empty | Icon | Spot Icon | Custom
 *   Trailing: Empty | Icon | Link | Custom
 */
export function ListExample() {
  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
      {/* ── Row 1 : Leading = Empty ────────────────────────────────── */}
      <ExampleSection
        title="Leading: Empty"
        description="No leading content — text-only list items with all four trailing variants."
      >
        <List aria-label="Empty leading demo" style={{ gap: '16px', width: '100%' }}>
          <ListItem title="ListItem title" text="List item text" />

          <ListItem
            title="ListItem title"
            text="List item text"
            trailing="icon"
          />

          <ListItem
            title="ListItem title"
            text="List item text"
            trailing="link"
            trailingLink={{ text: 'Trailing link', href: '#' }}
          />

          <ListItem
            title="ListItem title"
            text="List item text"
            trailing="custom"
            trailingContent={<CustomSlotPlaceholder />}
          />
        </List>
      </ExampleSection>

      {/* ── Row 4 : Leading = Custom ───────────────────────────────── */}
      <ExampleSection
        title="Leading: Custom"
        description="Arbitrary custom content in the leading slot (e.g. images, avatars, charts)."
      >
        <List aria-label="Custom leading demo" style={{ gap: '16px', width: '100%' }}>
          <ListItem
            title="ListItem title"
            text="List item text"
            leading="custom"
            leadingContent={<CustomSlotPlaceholder />}
          />

          <ListItem
            title="ListItem title"
            text="List item text"
            leading="custom"
            leadingContent={<CustomSlotPlaceholder />}
            trailing="icon"
          />

          <ListItem
            title="ListItem title"
            text="List item text"
            leading="custom"
            leadingContent={<CustomSlotPlaceholder />}
            trailing="link"
            trailingLink={{ text: 'Trailing link', href: '#' }}
          />

          <ListItem
            title="ListItem title"
            text="List item text"
            leading="custom"
            leadingContent={<CustomSlotPlaceholder />}
            trailing="custom"
            trailingContent={<CustomSlotPlaceholder />}
          />
        </List>
      </ExampleSection>

    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function CustomSlotPlaceholder() {
  return (
    <div
      style={{
        display: 'flex',
        width: 80,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px dashed var(--ld-semantic-color-border-subtle, #ccc)',
        borderRadius: 'var(--ld-primitive-scale-border-radius-50, 4px)',
        backgroundColor: 'var(--ld-semantic-color-fill-subtle, #f5f5f5)',
        fontSize: '11px',
        color: 'var(--ld-semantic-color-text-subtle)',
        fontFamily: 'var(--ld-semantic-font-family-sans)',
        textAlign: 'center',
        padding: '4px',
      }}
    >
      Custom
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
        <h3
          style={{
            fontSize: '16px',
            fontWeight: 700,
            color: 'var(--ld-semantic-color-text)',
            margin: 0,
            fontFamily: 'var(--ld-semantic-font-family-sans)',
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: '14px',
            color: 'var(--ld-semantic-color-text-subtle)',
            margin: '4px 0 0',
            fontFamily: 'var(--ld-semantic-font-family-sans)',
          }}
        >
          {description}
        </p>
      </div>
      <div
        style={{
          padding: '24px',
          borderRadius: 'var(--ld-primitive-scale-border-radius-100)',
          border: '1px solid var(--ld-semantic-color-border-subtlest, #E8E9EB)',
          backgroundColor: 'var(--ld-semantic-color-surface, #fff)',
        }}
      >
        {children}
      </div>
    </div>
  );
}
