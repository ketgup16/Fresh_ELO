import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './IOSHomeScreen.module.css';

interface IOSHomeScreenProps {
  isOpen: boolean;
  onClose: () => void;
  onNotificationTap: () => void;
}

export function IOSHomeScreen({ isOpen, onClose, onNotificationTap }: IOSHomeScreenProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      setIsExiting(false);
      onClose();
    }, 300);
  }, [onClose]);

  if (!isOpen) return null;

  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes().toString().padStart(2, '0');
  const displayHours = hours % 12 || 12;
  const timeStr = `${displayHours}:${minutes}`;

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dateStr = `${days[currentTime.getDay()]}, ${months[currentTime.getMonth()]} ${currentTime.getDate()}`;

  const screenClass = [styles.screen, isExiting ? styles.exiting : ''].filter(Boolean).join(' ');

  return createPortal(
    <div className={screenClass} role="dialog" aria-modal="true" aria-label="iOS Lock Screen">
      {/* Dynamic Island */}
      <div className={styles.dynamicIsland} />

      {/* Status Bar */}
      <IOSLockStatusBar />

      {/* Date & Time */}
      <div className={styles.dateTimeArea}>
        <div className={styles.date}>{dateStr}</div>
        <div className={styles.time}>{timeStr}</div>
      </div>

      {/* Widgets */}
      <div className={styles.widgets}>
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/6f7ad3a17656dea5248ba4d158887df53295a8db?width=112"
          alt="Weather widget"
          className={styles.widgetImg}
        />
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/6e78c11fed70d1d77be9a06470e9a45b90df5e95?width=112"
          alt="Activity widget"
          className={styles.widgetImg}
        />
      </div>

      <div className={styles.spacer} />

      {/* Walmart Notification */}
      <WalmartNotification onTap={onNotificationTap} />

      {/* Bottom Actions */}
      <div className={styles.bottomActions}>
        <FlashlightButton />
        <CameraButton />
      </div>

      {/* Home Indicator */}
      <div className={styles.homeIndicator} />
    </div>,
    document.body
  );
}

/* ---- Sub-components ---- */

function IOSLockStatusBar() {
  return (
    <div className={styles.statusBar}>
      <div className={styles.statusBarLeft}>T-Mobile Wifi</div>
      <div className={styles.statusBarCenter} />
      <div className={styles.statusBarRight}>
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none" aria-hidden="true">
          <rect x="0" y="9" width="3" height="3" rx="0.5" fill="currentColor" />
          <rect x="4.5" y="6" width="3" height="6" rx="0.5" fill="currentColor" />
          <rect x="9" y="3" width="3" height="9" rx="0.5" fill="currentColor" />
          <rect x="13.5" y="0" width="3" height="12" rx="0.5" fill="currentColor" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
          <path d="M8 3.6C9.98 3.6 11.78 4.36 13.12 5.62L14.4 4.2C12.72 2.62 10.48 1.6 8 1.6C5.52 1.6 3.28 2.62 1.6 4.2L2.88 5.62C4.22 4.36 6.02 3.6 8 3.6Z" fill="currentColor" />
          <path d="M4.64 7.38L5.92 8.8C6.48 8.28 7.2 7.96 8 7.96C8.8 7.96 9.52 8.28 10.08 8.8L11.36 7.38C10.48 6.54 9.3 6 8 6C6.7 6 5.52 6.54 4.64 7.38Z" fill="currentColor" />
          <circle cx="8" cy="11" r="1.2" fill="currentColor" />
        </svg>
        <svg width="27" height="13" viewBox="0 0 27 13" fill="none" aria-hidden="true">
          <rect opacity="0.35" x="0.527" y="0.527" width="21.946" height="11.946" rx="2.473" stroke="white" strokeWidth="1.055" />
          <path opacity="0.4" d="M24 5v4.22c.849-.357 1.401-1.189 1.401-2.11C25.401 6.189 24.849 5.357 24 5Z" fill="white" />
          <rect x="2" y="2" width="19" height="9" rx="1" fill="white" />
        </svg>
      </div>
    </div>
  );
}

interface WalmartNotificationProps {
  onTap: () => void;
}

function WalmartNotification({ onTap }: WalmartNotificationProps) {
  const [hasBeenTapped, setHasBeenTapped] = useState(false);

  const handleTap = () => {
    setHasBeenTapped(true);
    onTap();
  };

  return (
    <div
      className={styles.notification}
      onClick={handleTap}
      role="button"
      tabIndex={0}
      aria-label="Walmart delivery notification - tap to view tracking"
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleTap(); }}
    >
      <div className={styles.notifContent}>
        <WalmartGroceryIcon />
        <div className={styles.notifBody}>
          <div className={styles.notifTitleRow}>
            <div className={styles.notifLogo}>
              <WalmartWordmark />
            </div>
            <span className={styles.notifTime}>now</span>
          </div>
          <div className={styles.notifTextBlock}>
            <div className={styles.notifHeadline}>Your delivery is 8 min away</div>
            <div className={styles.notifSubtitle}>Arrives by 4:12pm</div>
          </div>
          <DeliveryProgressTracker animate={!hasBeenTapped} />
        </div>
      </div>
    </div>
  );
}

function DeliveryProgressTracker({ animate }: { animate: boolean }) {
  const [animating, setAnimating] = useState(false);
  const [truckArrived, setTruckArrived] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!animate) {
      setAnimating(false);
      return;
    }
    timerRef.current = setTimeout(() => setAnimating(true), 2000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [animate]);

  const handleTruckAnimationEnd = useCallback(() => {
    setTruckArrived(true);
  }, []);

  return (
    <div className={styles.progressTracker}>
      {/* Track background */}
      <div className={styles.progressTrackBg} />
      {/* Active fill — animates with the truck */}
      <div className={[styles.progressTrackFill, animating ? styles.trackFillAnimating : ''].filter(Boolean).join(' ')} />

      {/* Stops */}
      <div className={styles.progressStops}>
        <div className={styles.progressStop}>
          <div className={`${styles.progressStopDot} ${styles.progressStopDotActive}`} />
        </div>
        <div className={styles.progressStop}>
          <div className={`${styles.progressStopDot} ${truckArrived ? styles.progressStopDotActive : styles.progressStopDotInactive}`} />
        </div>
        <div className={styles.progressStop}>
          <div className={`${styles.progressStopDot} ${styles.progressStopDotInactive}`} />
        </div>
      </div>

      {/* Animated truck */}
      <div
        className={[styles.truckWrap, animating ? styles.truckAnimating : ''].filter(Boolean).join(' ')}
        onAnimationEnd={handleTruckAnimationEnd}
      >
        <DeliveryTruckSvg />
      </div>
    </div>
  );
}

function FlashlightButton() {
  return (
    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" aria-label="Flashlight">
      <rect width="50" height="50" rx="25" fill="#151515" fillOpacity="0.35" />
      <path d="M20.3086 16.3994H30.6855V15.9072C30.6855 14.6152 30.0498 14 28.8193 14H22.1748C20.9443 14 20.3086 14.6152 20.3086 15.9072V16.3994ZM24.2666 36.9585H26.7275C27.958 36.9585 28.5835 36.3433 28.5835 35.0513V24.1616C28.5835 23.085 28.8398 22.3057 29.2295 21.7109L29.896 20.7266C30.3677 19.9985 30.6855 19.3115 30.6855 18.4399V17.5991H20.3086V18.4399C20.3086 19.3115 20.6265 19.9985 21.0981 20.7266L21.7544 21.7109C22.1543 22.3057 22.4004 23.085 22.4004 24.1616V35.0513C22.4004 36.3433 23.0361 36.9585 24.2666 36.9585ZM25.4971 29.0732C24.6562 29.0732 24.1128 28.458 24.1128 27.5967V24.7871C24.1128 23.9155 24.6562 23.3311 25.4971 23.3516C26.3276 23.3618 26.8813 23.9463 26.8813 24.7871V27.5967C26.8813 28.458 26.3276 29.0732 25.4971 29.0732ZM25.4971 28.3452C25.9482 28.3452 26.3379 27.9658 26.3379 27.5044C26.3379 27.043 25.9482 26.6533 25.4971 26.6533C25.0356 26.6533 24.646 27.043 24.646 27.5044C24.646 27.9658 25.0356 28.3452 25.4971 28.3452Z" fill="white" />
    </svg>
  );
}

function CameraButton() {
  return (
    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" aria-label="Camera">
      <rect width="50" height="50" rx="25" fill="#151515" fillOpacity="0.35" />
      <path d="M15.4142 35H34.5857C36.7671 35 37.8788 33.9093 37.8788 31.7488V20.7682C37.8788 18.6078 36.7671 17.5275 34.5857 17.5275H31.5862C30.7577 17.5275 30.506 17.3597 30.034 16.8353L29.195 15.8915C28.6706 15.3146 28.1358 15 27.0555 15H22.871C21.7907 15 21.2559 15.3146 20.7315 15.8915L19.8925 16.8353C19.4205 17.3492 19.1583 17.5275 18.3403 17.5275H15.4142C13.2223 17.5275 12.1211 18.6078 12.1211 20.7682V31.7488C12.1211 33.9093 13.2223 35 15.4142 35ZM25 31.9061C21.8222 31.9061 19.2737 29.3681 19.2737 26.1694C19.2737 22.9811 21.8222 20.4431 25 20.4431C28.1777 20.4431 30.7157 22.9811 30.7157 26.1694C30.7157 29.3681 28.1672 31.9061 25 31.9061ZM31.4184 22.3099C31.4184 21.5967 32.0477 20.9675 32.7818 20.9675C33.5055 20.9675 34.1242 21.5967 34.1242 22.3099C34.1242 23.0545 33.5055 23.6523 32.7818 23.6628C32.0477 23.6628 31.4184 23.065 31.4184 22.3099ZM25 30.312C27.2863 30.312 29.1321 28.4767 29.1321 26.1694C29.1321 23.8726 27.2863 22.0267 25 22.0267C22.7136 22.0267 20.8573 23.8726 20.8573 26.1694C20.8573 28.4767 22.7241 30.312 25 30.312Z" fill="white" />
    </svg>
  );
}

/* ---- Inline SVG icons (replacing raster PNGs) ---- */

function WalmartGroceryIcon() {
  return (
    <svg className={styles.notifIcon} width="36" height="36" viewBox="0 0 36 36" fill="none" aria-label="Walmart Groceries">
      <rect width="36" height="36" rx="8" fill="#0071DC" />
      <g transform="translate(8, 8)">
        <path fill="#FFC220" d="M10.887.645A2.2 2.2 0 0 1 14.643 2.2c0 .532-.534 6.187-.72 6.752a1.553 1.553 0 0 1-2.96 0c-.187-.565-.72-6.22-.72-6.752a2.2 2.2 0 0 1 .644-1.555Z" />
        <path fill="#FFC220" d="M3.323 6.196a2.2 2.2 0 1 0-2.2 3.81c.46.266 5.624 2.632 6.207 2.753a1.552 1.552 0 0 0 1.48-2.562c-.396-.447-5.026-3.735-5.487-4.001Z" />
        <path fill="#FFC220" d="M20.437 9.807c-.459.267-5.622 2.633-6.206 2.753a1.556 1.556 0 0 1-1.876-1.684c.035-.328.174-.636.396-.88.396-.444 5.026-3.733 5.487-3.999a2.2 2.2 0 0 1 2.2 3.81Z" />
        <path fill="#FFC220" d="M14.231 15.047c.583.121 5.746 2.487 6.207 2.754a2.2 2.2 0 1 1-2.2 3.81c-.461-.266-5.092-3.554-5.487-4a1.552 1.552 0 0 1 1.478-2.563Z" />
        <path fill="#FFC220" d="M9.12 17.769a1.561 1.561 0 0 0-1.48 1.081c-.186.565-.72 6.22-.72 6.752a2.2 2.2 0 1 0 4.4 0c0-.532-.533-6.187-.72-6.752a1.56 1.56 0 0 0-1.48-1.081Z" />
        <path fill="#FFC220" d="M.802 17.799c.46-.268 5.623-2.634 6.207-2.754a1.556 1.556 0 0 1 1.876 1.685 1.553 1.553 0 0 1-.396.879c-.396.445-5.026 3.734-5.487 4a2.2 2.2 0 1 1-2.2-3.81Z" />
      </g>
    </svg>
  );
}

function WalmartWordmark() {
  return (
    <svg className={styles.notifLogoImg} width="62" height="15" viewBox="0 0 62 15" fill="none" aria-label="Walmart">
      <path d="M0 3.62h1.31l.58 2.95.27 1.56.1-.48.34-1.53.59-2.5h1.3l.55 2.56c.1.47.18.88.25 1.29l.1.63.12-.64.27-1.32.52-2.52h1.25L5.99 9.43c-.98.21-1.36-.18-1.5-.8l-.4-1.82c-.09-.43-.17-.78-.23-1.17l-.08.62c-.08.44-.16.8-.25 1.17L2.74 9.43c-.9.18-1.28-.04-1.48-.67L0 3.62Z" fill="white" />
      <path d="M9.39 6.56c0-.32.23-.55.56-.55.32 0 .55.23.55.55v.47c.33-.64.91-1.1 1.62-1.1.28 0 .47.04.62.12l-.23 1.08c-.15-.06-.32-.1-.52-.1-.88 0-1.49.7-1.49 1.76v2.64H9.39V6.56Z" fill="white" />
      <path d="M7.87 3.62h1.11v2.52c.39-.4.92-.66 1.56-.66 1.24 0 1.87.77 1.87 2v3.94h-1.11V7.65c0-.8-.36-1.2-1.04-1.2-.68 0-1.28.55-1.28 1.4v3.58H7.87V3.62Z" fill="white" />
      <path fillRule="evenodd" clipRule="evenodd" d="M15.73 5.48c1.56 0 2.52 1.1 2.52 2.65v.35h-3.94c.08.88.7 1.52 1.6 1.52.6 0 1.04-.24 1.36-.62l.66.6c-.46.56-1.14.92-2.08.92-1.62 0-2.68-1.12-2.68-2.72 0-1.56 1.06-2.7 2.56-2.7Zm-1.42 2.18h2.84c-.1-.76-.6-1.3-1.4-1.3-.76 0-1.3.52-1.44 1.3Z" fill="white" />
      <path d="M19.5 5.56h1.11v.66c.36-.44.9-.74 1.56-.74 1.24 0 1.87.77 1.87 2v3.94h-1.11V7.65c0-.8-.36-1.2-1.04-1.2-.68 0-1.28.55-1.28 1.4v3.58H19.5V5.56Z" fill="white" />
      <path d="M26.86 3.62h1.11v3.12l2.52-3.12h1.36L29.5 6.5l2.52 4.93h-1.28l-1.96-3.86-1.03 1.22v2.64h-1.11V3.62h.22Z" fill="white" />
      <g transform="translate(33, 1.5)">
        <path fill="#FFC220" d="M5.44.32A1.1 1.1 0 0 1 7.32 1.1c0 .27-.27 3.09-.36 3.38a.78.78 0 0 1-1.48 0C5.35 4.19 5.08 1.37 5.08 1.1a1.1 1.1 0 0 1 .36-.78Z" />
        <path fill="#FFC220" d="M1.66 3.1a1.1 1.1 0 1 0-1.1 1.9c.23.14 2.81 1.32 3.1 1.38a.78.78 0 0 0 .74-1.28c-.2-.22-2.51-1.87-2.74-2Z" />
        <path fill="#FFC220" d="M10.22 4.9c-.23.14-2.81 1.32-3.1 1.38a.78.78 0 0 1-.94-.84c.02-.16.09-.32.2-.44.2-.22 2.51-1.87 2.74-2a1.1 1.1 0 0 1 1.1 1.9Z" />
        <path fill="#FFC220" d="M7.12 7.52c.29.06 2.87 1.24 3.1 1.38a1.1 1.1 0 1 1-1.1 1.9c-.23-.13-2.55-1.78-2.74-2a.78.78 0 0 1 .74-1.28Z" />
        <path fill="#FFC220" d="M4.56 8.88a.78.78 0 0 0-.74.54c-.09.28-.36 3.11-.36 3.38a1.1 1.1 0 1 0 2.2 0c0-.27-.27-3.1-.36-3.38a.78.78 0 0 0-.74-.54Z" />
        <path fill="#FFC220" d="M.4 8.9c.23-.13 2.81-1.32 3.1-1.38a.78.78 0 0 1 .94.84.78.78 0 0 1-.2.44c-.2.22-2.51 1.87-2.74 2A1.1 1.1 0 1 1 .4 8.9Z" />
      </g>
    </svg>
  );
}

function DeliveryTruckSvg() {
  return (
    <svg className={styles.truckImg} width="54" height="23" viewBox="0 0 54 23" fill="none" aria-label="Delivery truck">
      <rect x="0" y="2" width="36" height="16" rx="3" fill="#0071DC" />
      <rect x="30" y="5" width="20" height="13" rx="2" fill="#004CBD" />
      <path d="M42 5h5l5 7v4a2 2 0 0 1-2 2h-8V5Z" fill="#003A99" />
      <rect x="44" y="7" width="6" height="5" rx="1" fill="#B3D4FC" />
      <circle cx="14" cy="19" r="4" fill="#2E2F32" />
      <circle cx="14" cy="19" r="2" fill="#888" />
      <circle cx="43" cy="19" r="4" fill="#2E2F32" />
      <circle cx="43" cy="19" r="2" fill="#888" />
      <rect x="3" y="5" width="10" height="2" rx="1" fill="#fff" opacity="0.3" />
    </svg>
  );
}
