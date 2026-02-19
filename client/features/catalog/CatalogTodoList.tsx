import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import { Divider } from '@/components/ui/Divider';

const todoItems = [
  {
    id: '1',
    title: 'Title',
    description: 'A short description of the action that a user needs to complete, character count 120.',
    label: 'Label',
    cta: 'Button label',
  },
  {
    id: '2',
    title: 'Title',
    description: 'A short description of the action that a user needs to complete, character count 120.',
    label: 'Label',
    cta: 'Button label',
  },
  {
    id: '3',
    title: 'Title',
    description: 'A short description of the action that a user needs to complete, character count 120.',
    label: 'Label',
    cta: 'Button label',
  },
  {
    id: '4',
    title: 'Title',
    description: 'A short description of the action that a user needs to complete, character count 120.',
    label: 'Label',
    cta: 'Button label',
  },
];

export function CatalogTodoList() {
  return (
    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 0 }}>
      {todoItems.map((item, index) => (
        <div key={item.id}>
          <TodoItem
            title={item.title}
            description={item.description}
            label={item.label}
            cta={item.cta}
          />
          {index < todoItems.length - 1 && (
            <div style={{ padding: '12px 0' }}>
              <Divider />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function TodoItem({
  title,
  description,
  label,
  cta,
}: {
  title: string;
  description: string;
  label: string;
  cta: string;
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        alignSelf: 'stretch',
      }}
    >
      {/* Spot icon */}
      <SpotIcon />

      {/* Text content */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <span
          style={{
            fontFamily: "var(--ld-semantic-font-body-medium-family, 'Everyday Sans UI', -apple-system, Roboto, sans-serif)",
            fontSize: 'var(--ld-semantic-font-body-medium-size, 16px)',
            fontWeight: 'var(--ld-semantic-font-body-medium-weight-alt, 700)',
            lineHeight: 'var(--ld-semantic-font-body-medium-lineheight, 1.5)',
            color: 'var(--ld-semantic-color-text, #2E2F32)',
          }}
        >
          {title}
        </span>
        <span
          style={{
            fontFamily: "var(--ld-semantic-font-body-small-family, 'Everyday Sans UI', -apple-system, Roboto, sans-serif)",
            fontSize: 'var(--ld-semantic-font-body-small-size, 14px)',
            fontWeight: 'var(--ld-semantic-font-body-small-weight-default, 400)',
            lineHeight: 'var(--ld-semantic-font-body-small-lineheight, 1.43)',
            color: 'var(--ld-semantic-color-text, #2E2F32)',
          }}
        >
          {description}
        </span>
      </div>

      {/* Trailing: tag + button */}
      <div
        style={{
          display: 'flex',
          padding: '8px 0',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: 12,
          flexShrink: 0,
        }}
      >
        <Tag color="blue" variant="tertiary">
          {label}
        </Tag>
        <Button variant="secondary" size="small">
          {cta}
        </Button>
      </div>
    </div>
  );
}

function SpotIcon() {
  return (
    <div
      style={{
        display: 'flex',
        width: 48,
        height: 48,
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        background: 'var(--ld-semantic-color-fill-brand-subtle, #E9F1FE)',
        flexShrink: 0,
      }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 21V3H1.5V1.5H22.5V22.5H1.5V3H3V21H21Z" fill="var(--ld-semantic-color-text-onfill-brand-subtle, #002E99)" />
      </svg>
    </div>
  );
}
