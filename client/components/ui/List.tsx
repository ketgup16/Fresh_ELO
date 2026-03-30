import * as React from 'react';
import styles from './List.module.css';
import { AXAttribute } from '@/components/walmart/AXAttribute';
import { Divider } from './Divider';
import { ChevronRight } from '@/components/icons/ChevronRight';
import { LinkButton } from './LinkButton';
import { Checkbox } from './Checkbox';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ListItemLeading = 'empty' | 'custom';
export type ListItemTrailing = 'empty' | 'icon' | 'link' | 'select';

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
  /** Controlled checked state for trailing="select" checkbox. */
  trailingChecked?: boolean;
  /** Callback for trailing="select" checkbox state changes. */
  onTrailingCheckedChange?: (checked: boolean | 'indeterminate') => void;

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
            {trailingIcon ?? <ChevronRight width={24} height={24} aria-hidden="true" />}
          </span>
        </div>
      );

    case 'link':
      if (!trailingLink) return null;
      return (
        <LinkButton
          size="small"
          onClick={trailingLink.onClick}
          UNSAFE_className={styles.listItemTrailingLink}
        >
          {trailingLink.text}
        </LinkButton>
      );

    case 'select':
      return (
        <div className={styles.listItemTrailingSelect}>
          <Checkbox
            checked={props.trailingChecked}
            onCheckedChange={props.onTrailingCheckedChange}
            aria-label="Select item"
          />
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
                {attributes.slice(0, 3).map((attr, i) => (
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
