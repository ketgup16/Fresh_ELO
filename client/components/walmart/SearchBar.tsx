import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Microphone, ChevronLeft } from '@/components/icons';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  query?: string;
  showBackButton?: boolean;
  onClick?: (e?: React.MouseEvent) => void;
}

export function SearchBar({
  query = 'What are you looking for?',
  showBackButton = false,
  onClick,
}: SearchBarProps) {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={styles.wrapper}>
      {showBackButton && (
        <button
          className={styles.backButton}
          onClick={() => navigate('/walmart')}
          aria-label="Go back"
        >
          <ChevronLeft width={24} height={24} />
        </button>
      )}
      <div className={styles.searchArea}>
        <div className={isActive ? styles.activeBorder : styles.rainbowBorder}>
          <div
            className={styles.inputContainer}
            onClick={(e) => {
              setIsActive(true);
              onClick?.(e);
            }}
            onBlur={() => setIsActive(false)}
          >
            <div className={styles.queryText}>{query}</div>
            <div className={styles.actionButtons}>
              <button className={styles.circleButton} aria-label="Search by camera">
                <Camera width={16} height={16} />
              </button>
              <button className={styles.circleButton} aria-label="Search by voice">
                <Microphone width={16} height={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
