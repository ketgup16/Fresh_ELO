import styles from './MegaNavActionButton.module.css';

interface MegaNavActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  UNSAFE_className?: string;
}

export function MegaNavActionButton({
  icon,
  label,
  onClick,
  UNSAFE_className,
}: MegaNavActionButtonProps) {
  return (
    <button
      type="button"
      className={[styles.btn, UNSAFE_className].filter(Boolean).join(' ')}
      onClick={onClick}
    >
      <span className={styles.btnIcon} aria-hidden="true">
        {icon}
      </span>
      <span className={styles.btnLabel}>{label}</span>
    </button>
  );
}
