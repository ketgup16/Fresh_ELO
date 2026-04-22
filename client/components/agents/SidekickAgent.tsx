import styles from './SidekickAgent.module.css';

interface SidekickAgentProps {
  size?: number;
  onClick?: () => void;
  className?: string;
}

/** Static circular Sidekick agent button — no animation, Partner dark-navy theme. */
export function SidekickAgent({
  size = 64,
  onClick,
  className,
}: SidekickAgentProps) {
  return (
    <button
      type="button"
      className={[styles.button, className].filter(Boolean).join(' ')}
      onClick={onClick}
      aria-label="Sidekick AI Agent"
      style={{ width: size, height: size }}
    >
      {/* Spark / bolt icon representing Sidekick */}
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.icon}
        aria-hidden="true"
      >
        <path
          d="M18.5 4L8 18h9l-3.5 10L26 14h-9.5L18.5 4Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
