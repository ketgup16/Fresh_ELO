import { SidekickLogoIcon } from '@/components/icons-custom/SidekickLogoIcon';
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
      <SidekickLogoIcon className={styles.icon} width={size * 0.6} height={size * 0.6} />
    </button>
  );
}
