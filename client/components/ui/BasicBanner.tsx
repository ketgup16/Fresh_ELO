import styles from './BasicBanner.module.css';

export type BasicBannerVariant = 'light' | 'dark' | 'blue';

export interface BasicBannerProps {
  /** Icon or image to display on the left */
  icon?: React.ReactNode;
  /** Main text content */
  text: string;
  /** Visual style variant */
  variant?: BasicBannerVariant;
  /** Optional click handler */
  onClick?: () => void;
}

export function BasicBanner({
  icon,
  text,
  variant = 'light',
  onClick,
}: BasicBannerProps) {
  const Tag = onClick ? 'button' : 'div';

  return (
    <Tag
      className={`${styles.banner} ${styles[variant]} ${onClick ? styles.clickable : ''}`}
      onClick={onClick}
      {...(Tag === 'button' ? { type: 'button' } : {})}
    >
      <span className={styles.iconSlot} aria-hidden="true">
        {icon ?? <DefaultIconPlaceholder />}
      </span>
      <span className={styles.text}>{text}</span>
    </Tag>
  );
}

/** Placeholder icon that mirrors the "pick icon" box in the Figma spec */
function DefaultIconPlaceholder() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="1" y="1" width="22" height="22" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 17L10 13L12.5 15.5L15 11L17 17H7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" />
      <circle cx="9" cy="9" r="1.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
