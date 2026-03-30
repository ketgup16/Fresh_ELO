import * as React from 'react';
import styles from './List.module.css';
import { AXAttribute } from '@/components/walmart/AXAttribute';
import { Divider } from './Divider';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ListItemLeading = 'empty' | 'custom';
export type ListItemTrailing = 'empty' | 'icon' | 'link' | 'custom';

export interface ListProps extends Omit<React.HTMLAttributes<HTMLUListElement>, 'role'> {
  children: React.ReactNode;
}

export interface ListItemProps {
  /** Optional eyebrow text displayed above the title */
  eyebrow?: string;
  /** Title text for the list item */
  title: string;
  /** Secondary text below the title */
  text?: string;
  // ── Leading variants ──────────────────────────────────────────────────────

  /** The leading content type */
  leading?: ListItemLeading;
  /** Custom content for leading="custom" */
  leadingContent?: React.ReactNode;

  // ── Trailing variants ─────────────────────────────────────────────────────

  /** The trailing content type */
  trailing?: ListItemTrailing;
  /** Custom icon for trailing="icon". Falls back to ChevronRight. */
  trailingIcon?: React.ReactNode;
  /** Link config for trailing="link" */
  trailingLink?: { text: string; href?: string; onClick?: () => void };
  /** Custom content for trailing="custom" */
  trailingContent?: React.ReactNode;

  /**
   * Up to 2 optional AXAttribute Small items shown below the description text.
   * Each entry requires at minimum a `label` string.
   */
  attributes?: Array<{ label: string; icon?: React.ReactNode }>;

  /**
   * When true, renders a Divider at the bottom of the list item
   * with a 16px top margin.
   */
  divider?: boolean;

  className?: string;
}

// ─── Default ChevronRight SVG ─────────────────────────────────────────────────

const ChevronRightIcon: React.FC = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M11.834 8.37659L5.69175 13.9998L5 13.2461L10.7307 7.99976L5 2.75342L5.69175 1.99976L11.834 7.62292C11.9398 7.71975 12 7.85646 12 7.99975C12 8.14305 11.9398 8.27976 11.834 8.37659Z"
      fill="currentColor"
    />
  </svg>
);

// ─── List Component ───────────────────────────────────────────────────────────

export const List = React.forwardRef<HTMLUListElement, ListProps>(
  ({ children, className, ...props }, ref) => {
    const classNames = [styles.list, className].filter(Boolean).join(' ');

    return (
      <ul
        ref={ref}
        {...props}
        className={classNames}
        role="list"
      >
        {children}
      </ul>
    );
  }
);

List.displayName = 'List';

// ─── Leading Renderer ─────────────────────────────────────────────────────────

function renderLeading(props: ListItemProps): React.ReactNode {
  const { leading = 'empty', leadingContent } = props;

  switch (leading) {
    case 'custom':
      return (
        <div className={styles.listItemLeadingCustom}>
          {leadingContent}
        </div>
      );

    default:
      return null;
  }
}

// ─── Trailing Renderer ────────────────────────────────────────────────────────

function renderTrailing(props: ListItemProps): React.ReactNode {
  const { trailing = 'empty', trailingIcon, trailingLink, trailingContent } = props;

  switch (trailing) {
    case 'icon':
      return (
        <div className={styles.listItemTrailingIcon}>
          <span className={styles.listItemTrailingIconInner}>
            {trailingIcon ?? <ChevronRightIcon />}
          </span>
        </div>
      );

    case 'link':
      if (!trailingLink) return null;
      return trailingLink.href ? (
        <a
          href={trailingLink.href}
          className={styles.listItemTrailingLink}
          onClick={trailingLink.onClick}
        >
          {trailingLink.text}
        </a>
      ) : (
        <button
          type="button"
          className={styles.listItemTrailingLink}
          onClick={trailingLink.onClick}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
        >
          {trailingLink.text}
        </button>
      );

    case 'custom':
      return (
        <div className={styles.listItemTrailingCustom}>
          {trailingContent}
        </div>
      );

    default:
      return null;
  }
}

// ─── ListItem Component ───────────────────────────────────────────────────────

export const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  (props, ref) => {
    const { eyebrow, title, text, attributes, divider, className } = props;
    const classNames = [styles.listItem, className].filter(Boolean).join(' ');

    return (
      <li ref={ref} className={classNames} role="listitem">
        <div className={styles.listItemRow}>
          {renderLeading(props)}

          <div className={styles.listItemContent}>
            {eyebrow && (
              <p className={styles.listItemEyebrow}>{eyebrow}</p>
            )}
            <p className={styles.listItemTitle}>{title}</p>
            {text && (
              <p className={styles.listItemText}>{text}</p>
            )}
            {attributes && attributes.length > 0 && (
              <div className={styles.listItemAttributes}>
                {attributes.slice(0, 2).map((attr, i) => (
                  <AXAttribute key={i} size="small" label={attr.label} icon={attr.icon} />
                ))}
              </div>
            )}
          </div>

          {renderTrailing(props)}
        </div>
        {divider && (
          <Divider UNSAFE_style={{ marginTop: 'var(--ld-primitive-scale-space-200, 16px)' }} />
        )}
      </li>
    );
  }
);

ListItem.displayName = 'ListItem';
