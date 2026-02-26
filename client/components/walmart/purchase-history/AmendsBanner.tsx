import { Link } from '@/components/ui/Link';
import styles from './AmendsBanner.module.css';

interface AmendsBannerProps {
  /** Countdown text e.g. "2hr 35min left to add to your order" */
  message: string;
  /** Optional CTA link label, defaults to "Add items" */
  ctaLabel?: string;
  onCtaClick?: () => void;
}

/** Cart + timer icon — matches Figma "Amend banner" icon */
function CartTimerIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Shopping cart base */}
      <path
        fill="currentColor"
        d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2ZM7.16 14h9.68l1.44-6H5.21L4.27 4H1v2h2l3.6 7.59L5.25 16c-.16.28-.25.61-.25.94C5 18.1 5.9 19 7 19h13v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.96-1.63Z"
      />
      {/* Small clock overlay — top right of cart */}
      <circle cx="19" cy="5" r="4" fill="#2E2F32" />
      <path
        stroke="#FFF3C4"
        strokeWidth="1.2"
        strokeLinecap="round"
        d="M19 3.2V5l1.2 1.2"
      />
    </svg>
  );
}

export function AmendsBanner({ message, ctaLabel = 'Add items', onCtaClick }: AmendsBannerProps) {
  return (
    <div className={styles.banner}>
      <div className={styles.inner}>
        <CartTimerIcon />
        <span className={styles.message}>{message}</span>
      </div>
      <Link
        href="#"
        underline
        className={styles.cta}
        onClick={(e) => { e.preventDefault(); onCtaClick?.(); }}
      >
        {ctaLabel}
      </Link>
    </div>
  );
}
