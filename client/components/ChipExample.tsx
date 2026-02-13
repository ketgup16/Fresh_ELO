import * as React from 'react';
import { Chip } from '@/components/ui/Chip';
import { Filter, Check, X, Star } from '@/components/icons';

export function ChipExample() {
  // Multi-select filter demo
  const [filters, setFilters] = React.useState<Record<string, boolean>>({
    all: true,
    open: false,
    closed: false,
    assigned: false,
  });

  const toggleFilter = (key: string) => {
    if (key === 'all') {
      setFilters({ all: true, open: false, closed: false, assigned: false });
    } else {
      setFilters(prev => {
        const next = { ...prev, [key]: !prev[key], all: false };
        // If nothing selected, reset to "all"
        if (!next.open && !next.closed && !next.assigned) {
          next.all = true;
        }
        return next;
      });
    }
  };

  // Single-select category demo
  const [selectedCategory, setSelectedCategory] = React.useState('featured');
  const categories = ['Featured', 'New', 'Sale', 'Clearance'];

  // Size demo
  const [sizeSelected, setSizeSelected] = React.useState<Record<string, boolean>>({
    small: false,
    medium: true,
    large: false,
  });

  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
      {/* Basic States */}
      <ExampleSection
        title="Basic States"
        description="Unselected, selected, and disabled chip states across both variants."
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <VariantLabel>Default variant</VariantLabel>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
              <StateDemo label="Unselected">
                <Chip>Label</Chip>
              </StateDemo>
              <StateDemo label="Selected">
                <Chip selected>Label</Chip>
              </StateDemo>
              <StateDemo label="Disabled">
                <Chip disabled>Label</Chip>
              </StateDemo>
              <StateDemo label="Selected + Disabled">
                <Chip selected disabled>Label</Chip>
              </StateDemo>
            </div>
          </div>
          <div>
            <VariantLabel>Primary variant</VariantLabel>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
              <StateDemo label="Unselected">
                <Chip variant="primary">Label</Chip>
              </StateDemo>
              <StateDemo label="Selected">
                <Chip variant="primary" selected>Label</Chip>
              </StateDemo>
              <StateDemo label="Disabled">
                <Chip variant="primary" disabled>Label</Chip>
              </StateDemo>
              <StateDemo label="Selected + Disabled">
                <Chip variant="primary" selected disabled>Label</Chip>
              </StateDemo>
            </div>
          </div>
        </div>
      </ExampleSection>

      {/* Size Variants */}
      <ExampleSection
        title="Size Variants"
        description="Small, medium, and large sizes. All sizes within a group should be consistent."
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {(['small', 'medium', 'large'] as const).map(size => (
            <div key={size} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{
                width: '70px',
                fontSize: '13px',
                fontFamily: 'var(--ld-semantic-font-family-sans)',
                color: 'var(--ld-semantic-color-text-subtle)',
                textTransform: 'capitalize',
              }}>
                {size}
              </span>
              <Chip
                size={size}
                selected={sizeSelected[size]}
                onSelectedChange={(v) => setSizeSelected(prev => ({ ...prev, [size]: v }))}
              >
                Toggle me
              </Chip>
              <Chip size={size} selected>Selected</Chip>
              <Chip size={size}>Unselected</Chip>
            </div>
          ))}
        </div>
      </ExampleSection>

      {/* With Icons */}
      <ExampleSection
        title="With Icons"
        description="Chips support leading and trailing icons to reinforce meaning."
      >
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          <Chip iconLeading={<Filter />} selected>
            Filtered
          </Chip>
          <Chip iconLeading={<Star />}>
            Favorites
          </Chip>
          <Chip iconTrailing={<X />} selected>
            Remove
          </Chip>
          <Chip iconLeading={<Check />} iconTrailing={<X />} selected variant="primary">
            Both Icons
          </Chip>
        </div>
      </ExampleSection>

      {/* Multi-Select Filter Pattern */}
      <ExampleSection
        title="Multi-Select Filter"
        description="Click chips to toggle filters. 'All' is mutually exclusive with other filters."
      >
        <div
          role="group"
          aria-label="Status filters"
          style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}
        >
          <Chip
            selected={filters.all}
            onSelectedChange={() => toggleFilter('all')}
          >
            All
          </Chip>
          <Chip
            selected={filters.open}
            onSelectedChange={() => toggleFilter('open')}
          >
            Open
          </Chip>
          <Chip
            selected={filters.closed}
            onSelectedChange={() => toggleFilter('closed')}
          >
            Closed
          </Chip>
          <Chip
            selected={filters.assigned}
            onSelectedChange={() => toggleFilter('assigned')}
          >
            Assigned to me
          </Chip>
        </div>
      </ExampleSection>

      {/* Single-Select Pattern */}
      <ExampleSection
        title="Single-Select Pattern"
        description="Only one chip can be selected at a time (radio-like behavior)."
      >
        <div
          role="group"
          aria-label="Category selection"
          style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}
        >
          {categories.map(cat => (
            <Chip
              key={cat}
              variant="primary"
              selected={selectedCategory === cat.toLowerCase()}
              onSelectedChange={() => setSelectedCategory(cat.toLowerCase())}
            >
              {cat}
            </Chip>
          ))}
        </div>
      </ExampleSection>

      {/* Usage Code */}
      <ExampleSection
        title="Usage"
        description="Import and use the Chip component."
      >
        <pre style={{
          fontFamily: 'var(--ld-semantic-font-family-mono)',
          fontSize: '13px',
          color: 'var(--ld-semantic-color-text)',
          lineHeight: '1.6',
          overflowX: 'auto',
          padding: '16px',
          backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
          borderRadius: 'var(--ld-primitive-scale-border-radius-100)',
          margin: 0,
        }}>
{`import { Chip } from '@/components/ui/Chip';

// Basic toggle chip
<Chip selected={isActive} onSelectedChange={setIsActive}>
  Filter
</Chip>

// With icon
<Chip iconLeading={<FilterIcon />} selected>
  Filtered
</Chip>

// Primary variant
<Chip variant="primary" selected={active} onSelectedChange={setActive}>
  Category
</Chip>

// Sizes: small | medium (default) | large
<Chip size="small">Compact</Chip>
<Chip size="large">Spacious</Chip>

// Disabled
<Chip disabled>Unavailable</Chip>`}
        </pre>
      </ExampleSection>
    </div>
  );
}

/* ─── Helper sub-components ─── */

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
    <div>
      <h3 style={{
        fontSize: '16px',
        fontWeight: 700,
        fontFamily: 'var(--ld-semantic-font-family-sans)',
        color: 'var(--ld-semantic-color-text)',
        marginBottom: '4px',
      }}>
        {title}
      </h3>
      <p style={{
        fontSize: '14px',
        color: 'var(--ld-semantic-color-text-subtle)',
        fontFamily: 'var(--ld-semantic-font-family-sans)',
        marginBottom: '16px',
        lineHeight: '1.5',
      }}>
        {description}
      </p>
      {children}
    </div>
  );
}

function StateDemo({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
    }}>
      {children}
      <span style={{
        fontSize: '12px',
        color: 'var(--ld-semantic-color-text-subtle)',
        fontFamily: 'var(--ld-semantic-font-family-sans)',
      }}>
        {label}
      </span>
    </div>
  );
}

function VariantLabel({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      display: 'block',
      fontSize: '13px',
      fontWeight: 600,
      fontFamily: 'var(--ld-semantic-font-family-sans)',
      color: 'var(--ld-semantic-color-text-subtle)',
      marginBottom: '12px',
      textTransform: 'uppercase',
      letterSpacing: '0.4px',
    }}>
      {children}
    </span>
  );
}
