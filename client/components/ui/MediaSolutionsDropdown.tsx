import { useNavigate } from 'react-router-dom';
import { ChevronUp, ChevronDown } from '@/components/icons';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { useState } from 'react';

export type MediaSolution =
  | 'Page Templates'
  | 'Dashboard Template'
  | 'Catalog Template';

interface MediaSolutionsDropdownProps {
  currentSolution?: MediaSolution;
  onSolutionChange?: (solution: MediaSolution) => void;
}

const solutions: { id: MediaSolution; label: string; route: string }[] = [
  { id: 'Page Templates',      label: 'Page Templates',      route: '/component-library' },
  { id: 'Dashboard Template',  label: 'Dashboard Template',  route: '/' },
  { id: 'Catalog Template',    label: 'Catalog Template',    route: '/catalog' },
];

export function MediaSolutionsDropdown({
  currentSolution = 'Dashboard Template',
  onSolutionChange,
}: MediaSolutionsDropdownProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSolutionClick = (solution: MediaSolution, route: string) => {
    navigate(route);
    onSolutionChange?.(solution);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className="flex items-center gap-1 text-xs px-2 py-1 rounded transition-colors"
          style={{
            color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
            fontFamily: 'var(--ld-semantic-font-family-sans)',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--ld-semantic-color-fill-surface-secondary, #F2F3F3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <span>Navigate site</span>
          {open ? (
            <ChevronUp style={{ width: 16, height: 16 }} />
          ) : (
            <ChevronDown style={{ width: 16, height: 16 }} />
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={8}
        showArrow={false}
        className="w-80 p-0"
      >
        <div style={{ padding: 'var(--ld-semantic-spacing-4, 16px)' }}>
          <h3
            style={{
              fontSize: '14px',
              fontWeight: 800,
              marginBottom: 'var(--ld-semantic-spacing-2, 8px)',
              color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
              fontFamily: 'var(--ld-semantic-font-family-sans)',
            }}
          >
            Page templates
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {solutions.map((s) => {
              const isActive = currentSolution === s.id;
              const isLastOdd = s.id === solutions[solutions.length - 1]?.id && solutions.length % 2 !== 0;
              return (
                <SolutionCard
                  key={s.id}
                  label={s.label}
                  isActive={isActive}
                  fullWidth={isLastOdd}
                  onClick={() => handleSolutionClick(s.id, s.route)}
                />
              );
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

/* ─── Solution Card ─── */

function SolutionCard({
  label,
  isActive,
  fullWidth,
  onClick,
}: {
  label: string;
  isActive: boolean;
  fullWidth?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--ld-semantic-spacing-3, 12px)',
        minHeight: '100px',
        borderRadius: 'var(--ld-semantic-border-radius-small, 4px)',
        border: `1px solid ${isActive ? 'var(--ld-semantic-color-action-border-primary, #0053E2)' : 'var(--ld-semantic-color-separator, #E3E4E5)'}`,
        backgroundColor: isActive ? 'var(--ld-semantic-color-action-fill-primary-subtle, #E9F1FE)' : 'transparent',
        cursor: 'pointer',
        fontFamily: 'var(--ld-semantic-font-family-sans)',
        transition: 'border-color 150ms, background-color 150ms',
        gridColumn: fullWidth ? 'span 2' : undefined,
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.borderColor = 'var(--ld-semantic-color-action-border-primary, #0053E2)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.borderColor = 'var(--ld-semantic-color-separator, #E3E4E5)';
        }
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 'var(--ld-semantic-border-radius-small, 4px)',
          backgroundColor: 'var(--ld-semantic-color-fill-surface-secondary, #F2F3F3)',
          marginBottom: 'var(--ld-semantic-spacing-2, 8px)',
        }}
      />
      <span
        style={{
          fontSize: '12px',
          textAlign: 'center',
          color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
        }}
      >
        {label}
      </span>
    </button>
  );
}
