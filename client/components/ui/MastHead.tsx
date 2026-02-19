import { Bell, HelpCircle, User, AppSwitcher, Spark } from '@/components/icons';
import { MediaSolutionsDropdown, MediaSolution } from './MediaSolutionsDropdown';
import { useMarty } from '@/contexts/MartyContext';
import { Divider } from './Divider';
import { LanguageSelector } from './LanguageSelector';
import styles from './MastHead.module.css';

interface MastHeadProps {
  appName?: string;
  currentSolution?: MediaSolution;
  onSolutionChange?: (solution: MediaSolution) => void;
}

export function MastHead({
  appName = 'PX Template',
  currentSolution = 'Dashboard Template',
  onSolutionChange
}: MastHeadProps) {
  const { isMinimized, isDocked, setIsMinimized, setIsDocked, setInitialPosition } = useMarty();

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        {/* App Switcher */}
        <button className={styles.iconButton} aria-label="App switcher">
          <AppSwitcher style={{ width: 16, height: 16 }} />
        </button>
        
        {/* App Name */}
        <span className={styles.appName}>{appName}</span>
      </div>

      <div className={styles.right}>
        <MediaSolutionsDropdown
          currentSolution={currentSolution}
          onSolutionChange={onSolutionChange}
        />
        <Divider orientation="vertical" UNSAFE_className={styles.divider} />
        <LanguageSelector />
        <div className={styles.actions}>
          <button className={styles.iconButton} aria-label="Notifications">
            <Bell style={{ width: 16, height: 16 }} />
            <span className={styles.notifDot}></span>
          </button>
          <button className={styles.iconButton} aria-label="Help">
            <HelpCircle style={{ width: 16, height: 16 }} />
          </button>
          <button className={styles.iconButton} aria-label="Account">
            <User style={{ width: 16, height: 16 }} />
          </button>
          {isDocked && isMinimized && (
            <button
              onClick={(e) => {
                const wasDragged = (e.currentTarget as any).wasDragged;
                if (!wasDragged) {
                  setIsMinimized(false);
                }
                setTimeout(() => {
                  (e.currentTarget as any).wasDragged = false;
                }, 100);
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                const startX = e.clientX;
                const startY = e.clientY;
                let hasMoved = false;
                const handleMouseMove = (moveEvent: MouseEvent) => {
                  const deltaX = Math.abs(moveEvent.clientX - startX);
                  const deltaY = Math.abs(moveEvent.clientY - startY);
                  if (Math.sqrt(deltaX * deltaX + deltaY * deltaY) > 3) {
                    hasMoved = true;
                    setInitialPosition({ x: moveEvent.clientX - 25, y: moveEvent.clientY - 25 });
                    setIsDocked(false);
                    window.removeEventListener('mousemove', handleMouseMove);
                    window.removeEventListener('mouseup', handleMouseUp);
                  }
                };
                const handleMouseUp = () => {
                  window.removeEventListener('mousemove', handleMouseMove);
                  window.removeEventListener('mouseup', handleMouseUp);
                  if (hasMoved) {
                    (e.currentTarget as any).wasDragged = true;
                  }
                };
                window.addEventListener('mousemove', handleMouseMove);
                window.addEventListener('mouseup', handleMouseUp);
              }}
              className={styles.iconButton}
              aria-label="Open Marty"
            >
              <Spark style={{ width: 20, height: 20 }} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
