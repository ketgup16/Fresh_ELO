import styles from './BasicBanner.module.css';

export type BasicBannerVariant = 'default' | 'brand' | 'inverse';

export interface BasicBannerProps {
  /** Icon element to display on the left. Defaults to the Walmart placeholder icon. */
  icon?: React.ReactNode;
  /** Main text content */
  text?: string;
  /** Visual variant: default (blue-subtle), brand (Walmart blue), inverse (dark) */
  variant?: BasicBannerVariant;
  /** Optional click handler — renders as <button> when provided */
  onClick?: () => void;
  className?: string;
}

/** Walmart "pick icon" placeholder — from Figma design */
function WalmartPlaceholderIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M21 21V3H1.5V1.5H22.5V22.5H1.5V3H3V21H21Z" fill="currentColor" />
      <path d="M16.5178 4.497V8.13536L18.3268 6.243H19.0918L17.175 8.24818L19.1728 10.5H18.3628L16.5178 8.44629V10.5H15.8248V4.497H16.5178Z" fill="currentColor" />
      <path d="M14.88 6.513V7.224C14.73 7.074 14.55 6.957 14.34 6.873C14.136 6.789 13.914 6.747 13.674 6.747C13.398 6.747 13.143 6.81 12.909 6.936C12.675 7.062 12.489 7.245 12.351 7.485C12.213 7.725 12.144 8.022 12.144 8.376C12.144 8.73 12.213 9.027 12.351 9.267C12.489 9.501 12.675 9.681 12.909 9.807C13.143 9.927 13.398 9.987 13.674 9.987C13.944 9.987 14.178 9.948 14.376 9.87C14.574 9.792 14.742 9.693 14.88 9.573V10.203C14.796 10.281 14.652 10.365 14.448 10.455C14.244 10.545 13.974 10.59 13.638 10.59C13.248 10.59 12.885 10.503 12.549 10.329C12.213 10.155 11.946 9.903 11.748 9.573C11.55 9.243 11.451 8.844 11.451 8.376C11.451 7.902 11.55 7.5 11.748 7.17C11.946 6.84 12.213 6.588 12.549 6.414C12.885 6.24 13.248 6.153 13.638 6.153C13.956 6.153 14.214 6.192 14.412 6.27C14.616 6.348 14.772 6.429 14.88 6.513Z" fill="currentColor" />
      <path d="M10.5592 10.5V6.243H9.86625V10.5H10.5592Z" fill="currentColor" />
      <path d="M9.88425 5.397C9.96825 5.475 10.0763 5.514 10.2083 5.514C10.3403 5.514 10.4482 5.475 10.5322 5.397C10.6222 5.313 10.6672 5.208 10.6672 5.082C10.6672 4.962 10.6222 4.863 10.5322 4.785C10.4482 4.707 10.3403 4.668 10.2083 4.668C10.0763 4.668 9.96825 4.707 9.88425 4.785C9.80025 4.863 9.75825 4.962 9.75825 5.082C9.75825 5.208 9.80025 5.313 9.88425 5.397Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M5.157 10.5V4.758H6.84C7.494 4.758 8.004 4.905 8.37 5.199C8.742 5.493 8.928 5.931 8.928 6.513C8.928 7.077 8.742 7.515 8.37 7.827C8.004 8.139 7.494 8.295 6.84 8.295H5.886V10.5H5.157ZM6.777 5.37H5.886V7.692H6.777C7.293 7.692 7.659 7.59 7.875 7.386C8.091 7.176 8.199 6.891 8.199 6.531C8.199 6.159 8.091 5.874 7.875 5.676C7.659 5.472 7.293 5.37 6.777 5.37Z" fill="currentColor" />
    </svg>
  );
}

export function BasicBanner({
  icon,
  text = 'Declarative title or body',
  variant = 'default',
  onClick,
  className,
}: BasicBannerProps) {
  const Tag = onClick ? 'button' : 'div';

  return (
    <Tag
      className={[styles.banner, styles[variant], onClick ? styles.clickable : '', className ?? ''].filter(Boolean).join(' ')}
      onClick={onClick}
      {...(Tag === 'button' ? { type: 'button' as const } : {})}
    >
      <span className={styles.iconSlot} aria-hidden="true">
        {icon ?? <WalmartPlaceholderIcon className={styles.icon} />}
      </span>
      <span className={styles.text}>{text}</span>
    </Tag>
  );
}
