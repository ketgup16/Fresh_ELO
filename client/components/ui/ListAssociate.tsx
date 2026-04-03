import * as React from 'react';
import styles from './ListAssociate.module.css';
import { AXAttribute } from '@/components/walmart/AXAttribute';
import { ProgressIndicator } from './ProgressIndicator';
import { Divider } from './Divider';
import { ChevronRight } from '@/components/icons/ChevronRight';
import { LinkButton } from './LinkButton';
import { Checkbox } from './Checkbox';
import { Tag, TagVariant, TagColor } from './Tag';

// ─── AssignedGoal (private) ─────────────────────────────────────────────────

interface AssignedGoalProps {
  title?: string;
  actions?: string;
}

function AssignedGoal({ title = 'Goal name', actions = '[Action], [Action], [Action]' }: AssignedGoalProps) {
  return (
    <div className={styles.assignedGoal}>
      <p className={styles.assignedGoalTitle}>{title}</p>
      <p className={styles.assignedGoalActions}>{actions}</p>
    </div>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

export type ListItemTagPreset = 'unassigned' | 'assigned' | 'complete';

export interface ListItemTagCustom {
  variant: TagVariant;
  color?: TagColor;
  label: string;
}

const TAG_PRESET_MAP: Record<ListItemTagPreset, { label: string; color: 'gray' | 'blue' | 'green' }> = {
  unassigned: { label: 'Unassigned', color: 'gray' },
  assigned:   { label: 'Assigned',   color: 'blue' },
  complete:   { label: 'Complete',   color: 'green' },
};

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

  /**
   * Optional action rendered below the description/attributes,
   * spanning the full width of the content column (does not overlap trailing).
   * Accepts any ReactNode — use a Button, or a button-group wrapper.
   */
  footerAction?: React.ReactNode;

  /**
   * Optional monitoring section rendered between the attributes and the alert.
   * Pass a ProgressIndicator element — the container adds a label above it.
   */
  monitoring?: React.ReactNode;

  /**
   * Label text displayed above the monitoring content.
   * @default 'Progress status'
   */
  monitoringLabel?: string;

  /**
   * Optional alert rendered above the footer action in the extras area.
   * Accepts any ReactNode — use an Alert component.
   */
  alert?: React.ReactNode;

  /**
   * Optional array of assigned goals rendered at the bottom of the monitoring container.
   * Each item shows a goal title (caption) and its actions (body-small).
   * Only renders when at least one goal is provided.
   */
  monitoringGoals?: AssignedGoalProps[];

  /**
   * Optional Tag rendered in the top-right corner of the content block.
   * Use a preset ('unassigned' | 'assigned' | 'complete') for standardised styling,
   * or a ListItemTagCustom object ({ variant, color?, label }) for a custom Tag.
   */
  tag?: ListItemTagPreset | ListItemTagCustom;

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
  const { trailing = 'empty', trailingIcon, trailingLink } = props;

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
    const { eyebrow, title, text, attributes, divider, footerAction, alert, monitoring, monitoringLabel = 'Progress status', monitoringGoals, tag, className } = props;
    const classNames = [styles.listItem, className].filter(Boolean).join(' ');
    const hasExtras = (attributes && attributes.length > 0) || !!monitoring || !!monitoringGoals?.length || !!alert || !!footerAction;

    return (
      <li ref={ref} className={classNames} role="listitem">
        <div className={styles.listItemRow}>
          {renderLeading(props)}

          <div className={styles.listItemContentWrapper}>
            <div className={styles.listItemContent}>
              {/* Text column — eyebrow, title, text */}
              <div className={styles.listItemContentText}>
                {eyebrow && (
                  <p className={styles.listItemEyebrow}>{eyebrow}</p>
                )}
                <p className={styles.listItemTitle}>{title}</p>
                {text && (
                  <p className={styles.listItemText}>{text}</p>
                )}
              </div>
              {/* Tag — top-right of content area */}
              {tag && (() => {
                if (typeof tag === 'string') {
                  const { label, color } = TAG_PRESET_MAP[tag];
                  return (
                    <div className={styles.listItemTag}>
                      <Tag variant="tertiary" color={color}>{label}</Tag>
                    </div>
                  );
                }
                return (
                  <div className={styles.listItemTag}>
                    <Tag variant={tag.variant} color={tag.color}>{tag.label}</Tag>
                  </div>
                );
              })()}
            </div>

            {hasExtras && (
              <div className={styles.listItemExtras}>
                {attributes && attributes.length > 0 && (
                  <div className={styles.listItemAttributes}>
                    {attributes.slice(0, 3).map((attr, i) => (
                      <AXAttribute key={i} size="small" label={attr.label} icon={attr.icon} />
                    ))}
                  </div>
                )}
                {(monitoring || (monitoringGoals && monitoringGoals.length > 0)) && (
                  <div className={styles.listItemMonitoring}>
                    <p className={styles.listItemMonitoringLabel}>{monitoringLabel}</p>
                    {monitoring}
                    {monitoringGoals && monitoringGoals.length > 0 && (
                      <div className={styles.assignedGoalList}>
                        {monitoringGoals.map((goal, i) => (
                          <AssignedGoal key={i} {...goal} />
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {alert && (
                  <div className={styles.listItemAlert}>
                    {alert}
                  </div>
                )}
                {footerAction && (
                  <div className={styles.listItemFooterAction}>
                    {footerAction}
                  </div>
                )}
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
