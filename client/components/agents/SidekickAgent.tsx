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
      <img
        src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F0dc192fa177e40ea807e84afd991d00a?format=webp&width=800&height=1200"
        alt=""
        aria-hidden="true"
        className={styles.logo}
      />
    </button>
  );
}
