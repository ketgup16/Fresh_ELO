import { useState, useEffect, useRef, useCallback } from 'react';

// PWA install prompt (non-standard Chrome API)
interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}
import { Tabs, TabList, Tab, TabPanel } from '@/components/ui/Tab';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Metric } from '@/components/ui/Metric';
import { Modal, ModalContent, ModalTitle, ModalClose, ModalFooter } from '@/components/ui/Modal';
import { Select, SelectItem } from '@/components/ui/Select';
import { TextArea } from '@/components/ui/TextArea';
import { FilterChip } from '@/components/ui/FilterChip';
import { TextField } from '@/components/ui/TextField';
import { Alert } from '@/components/ui/Alert';
import { IconButton } from '@/components/ui/IconButton';
import { Heading } from '@/components/ui/Heading';
import { Menu, Chat, Truck, Receipt, ArrowUp, ArrowDown, Check, CheckCircleFill, Pencil, Trash, Plus, Minus, X } from '@/components/icons';
import styles from './Home.module.css';

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const LightningIcon = () => (
  <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M8.04507 1.3125H5.31821C5.1959 1.3125 5.08295 1.37686 5.02227 1.48116L2.29541 6.16736L2.27058 6.21967C2.19139 6.43158 2.34977 6.66816 2.59136 6.66816H5.82882L4.32186 10.2214C4.17105 10.5769 4.65035 10.8602 4.89962 10.563L9.67161 4.87257L9.70375 4.82755C9.83307 4.61178 9.67736 4.32506 9.4085 4.32506H6.91956L8.34303 1.80978C8.46925 1.58668 8.30497 1.3125 8.04507 1.3125Z" fill="#FFC220" />
  </svg>
);

const ScaleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M0 1.41176C0 0.470588 2.66667 0 8 0C13.3333 0 16 0.470588 16 1.41176C16 2.35294 13.3333 2.82353 8 2.82353C2.66667 2.82353 0 2.35294 0 1.41176Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4.5 2.82324L3.5 5.17618" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11.5 2.82324L12.5 5.17618" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13 5.17676H3C1.61929 5.17676 0.5 6.23021 0.5 7.5297V13.6473C0.5 14.9468 1.61929 16.0003 3 16.0003H13C14.3807 16.0003 15.5 14.9468 15.5 13.6473V7.5297C15.5 6.23021 14.3807 5.17676 13 5.17676Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 14.8231C10.4853 14.8231 12.5 12.9269 12.5 10.5878C12.5 8.24874 10.4853 6.35254 8 6.35254C5.51472 6.35254 3.5 8.24874 3.5 10.5878C3.5 12.9269 5.51472 14.8231 8 14.8231Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 10.5882L5.5 7.76465" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="8" cy="7.059" r="0.375" fill="currentColor" />
    <circle cx="11.75" cy="9.17618" r="0.375" fill="currentColor" />
    <circle cx="8" cy="14.1176" r="0.375" fill="currentColor" />
    <circle cx="4.25" cy="9.17618" r="0.375" fill="currentColor" />
  </svg>
);

const ClockStatusDot = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6C12 9.31371 9.31371 12 6 12C2.68629 12 0 9.31371 0 6Z" fill="#F8F8F8" />
    <circle cx="6" cy="6" r="3.5" fill="#6DD400" stroke="#1D5F02" />
  </svg>
);

// ─── Types ─────────────────────────────────────────────────────────────────────

interface OrderItem {
  name: string;
  plu: string;
  image: string;
  qty: string;
  type?: string;
  thickness?: string;
}

interface ScaleReading {
  weight: string;
  price: string;
}

interface StoreOrder {
  osn: string;
  isExpress: boolean;
  initialSeconds: number;
  customerName?: string;
  items: OrderItem[];
  isWeightItem?: boolean;
  scaleReading?: ScaleReading;
}

interface ProductionItem {
  name: string;
  price?: string;
  upc: string;
  pluOrItemNumber: string;
  pluOrItemNumberLabel: string;
  image: string;
  plan: number;
  onHand: number;
  makeNow: number;
}

interface TimerThresholds {
  /** Seconds at which to show warning state */
  warning: number;
  /** Seconds at which to show critical state */
  critical: number;
}

const EXPRESS_THRESHOLDS: TimerThresholds = { warning: 180, critical: 60 };
const ONLINE_THRESHOLDS: TimerThresholds  = { warning: 1800, critical: 900 };

interface OnlineOrder {
  osn: string;
  initialSeconds: number;
  pickupTime: string;
  item: OrderItem;
}

interface InStoreKitchenOrder {
  osn: string;
  customerName: string;
  placedTime?: string;
  instructions?: string;
  pickupDate?: string;   // e.g. 'Tomorrow' or '06/12'
  pickupTime?: string;   // e.g. '2:00 PM'
  isScheduled?: boolean; // true = future order → shows in production plan
  items: { name: string; qty: string; image?: string; plu?: string; isMain?: boolean }[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const INITIAL_EXPRESS_ORDERS: StoreOrder[] = [
  {
    osn: 'OSN 7284',
    isExpress: true,
    initialSeconds: 480,
    customerName: 'Maria Garcia',
    items: [
      {
        name: 'Buffalo Chicken Wings, 6 Count',
        plu: '6870',
        image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F3589d6e20734497d821d672918f19e70',
        qty: '1',
        type: 'Buffalo sauce',
      },
      {
        name: 'Prima Della Hickory Smoked Turkey Breast',
        plu: '6379',
        image: 'https://api.builder.io/api/v1/image/assets/TEMP/37f55abb4162c27ee5fec83f02105569a3b30715?width=128',
        qty: '0.25 lb',
        type: 'Sliced',
        thickness: '4mm',
      },
    ],
    isWeightItem: true,
    scaleReading: { weight: '0.25 LB', price: '$2.75' },
  },
];

// Pool of realistic incoming express orders used for the auto-arrival simulation
const INCOMING_ORDER_POOL: StoreOrder[] = [
  {
    osn: 'OSN 7291',
    isExpress: true,
    initialSeconds: 300,
    items: [
      {
        name: 'Rotisserie Chicken',
        plu: '6286',
        image: 'https://api.builder.io/api/v1/image/assets/TEMP/4e964bed0619d2365b794f27970d38864cef87e9?width=128',
        qty: '1',
        type: 'Whole',
      },
    ],
  },
  {
    osn: 'OSN 7305',
    isExpress: true,
    initialSeconds: 300,
    items: [
      {
        name: 'Macaroni and Cheese',
        plu: '62810',
        image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fc0d3fddf261c4a17a4424da05e0ecacc',
        qty: '2',
        type: '16 oz',
      },
      {
        name: 'Popcorn Chicken',
        plu: '62807',
        image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F292c8c14239245c9a9cdef7c9f7a41b6',
        qty: '1',
        type: 'Regular',
      },
    ],
  },
  {
    osn: 'OSN 7318',
    isExpress: true,
    initialSeconds: 300,
    items: [
      {
        name: 'Prima Della Honey Turkey',
        plu: '6382',
        image: 'https://api.builder.io/api/v1/image/assets/TEMP/37f55abb4162c27ee5fec83f02105569a3b30715?width=128',
        qty: '0.5 lb',
        type: 'Sliced',
        thickness: '2mm',
      },
    ],
    isWeightItem: true,
    scaleReading: { weight: '0.50 LB', price: '$4.99' },
  },
  {
    osn: 'OSN 7334',
    isExpress: true,
    initialSeconds: 300,
    items: [
      {
        name: 'Buffalo Chicken Wings, 6 Count',
        plu: '6870',
        image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F3589d6e20734497d821d672918f19e70',
        qty: '2',
        type: 'Hot sauce',
      },
    ],
  },
];

const productionItems: ProductionItem[] = [
  {
    name: 'Ready to eat potato',
    upc: '1234567890',
    pluOrItemNumber: '62886',
    pluOrItemNumberLabel: 'PLU',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fc0d3fddf261c4a17a4424da05e0ecacc',
    plan: 20,
    onHand: 8,
    makeNow: 12,
  },
  {
    name: 'FG Chicken egg roll',
    price: '$1.00',
    upc: '7874222373',
    pluOrItemNumber: '575655104',
    pluOrItemNumberLabel: 'Item number',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F4b04ec86bb404f9c8987fd2c25937ea0',
    plan: 8,
    onHand: 0,
    makeNow: 8,
  },
  {
    name: 'Rotisserie Chicken',
    price: '$9.97',
    upc: '6870000000',
    pluOrItemNumber: '6870',
    pluOrItemNumberLabel: 'PLU',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F9a15a767c1824b3287e550eb428e9d02',
    plan: 15,
    onHand: 6,
    makeNow: 9,
  },
  {
    name: 'Mac & Cheese 16oz',
    price: '$3.84',
    upc: '4920011230',
    pluOrItemNumber: '49200',
    pluOrItemNumberLabel: 'PLU',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fc0d3fddf261c4a17a4424da05e0ecacc',
    plan: 12,
    onHand: 5,
    makeNow: 7,
  },
  {
    name: 'Popcorn Chicken Cup',
    price: '$4.98',
    upc: '8820045610',
    pluOrItemNumber: '88200',
    pluOrItemNumberLabel: 'PLU',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F292c8c14239245c9a9cdef7c9f7a41b6',
    plan: 10,
    onHand: 10,
    makeNow: 0,
  },
  {
    name: 'Mashed Potatoes 16oz',
    price: '$2.98',
    upc: '3310088740',
    pluOrItemNumber: '33100',
    pluOrItemNumberLabel: 'PLU',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fc0d3fddf261c4a17a4424da05e0ecacc',
    plan: 18,
    onHand: 3,
    makeNow: 15,
  },
];

const DEMO_SCHEDULED_ORDERS: InStoreKitchenOrder[] = [
  {
    osn: 'OSN 7201',
    customerName: 'James Rivera',
    placedTime: '8:15 AM',
    pickupDate: 'Tomorrow',
    pickupTime: '11:00 AM',
    isScheduled: true,
    instructions: 'No onions please',
    items: [
      {
        name: 'Rotisserie Meal Bundle — BBQ',
        qty: '2',
        isMain: true,
        image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F48c83a76bcc649d2979873a70f877dc6',
        plu: '9548',
      },
      { name: 'Mac & Cheese (16oz)', qty: '2' },
      { name: 'Coleslaw (16oz)', qty: '2' },
    ],
  },
  {
    osn: 'OSN 7198',
    customerName: 'Linda Park',
    placedTime: '7:55 AM',
    pickupDate: 'Jun 12',
    pickupTime: '3:30 PM',
    isScheduled: true,
    items: [
      {
        name: 'All Meat Tray — Assorted',
        qty: '1',
        isMain: true,
        image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F92cef5a618f9492d8031deac535bbb44',
        plu: '6379',
      },
      { name: 'Prima Della Honey Turkey', qty: '0.5 lb' },
      { name: 'Hickory Smoked Turkey Breast', qty: '0.5 lb' },
    ],
  },
];

const DEMO_INSTORE_ORDERS: InStoreKitchenOrder[] = [
  {
    osn: 'OSN 7286',
    customerName: 'Maria Garcia',
    placedTime: '9:41 AM',
    instructions: 'Extra crispy please, no skin on the wings',
    items: [
      {
        name: 'Rotisserie Meal Bundle — Traditional',
        qty: '1',
        isMain: true,
        image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F48c83a76bcc649d2979873a70f877dc6',
        plu: '9548',
      },
      { name: 'Mac & Cheese (16oz)', qty: '1' },
      { name: 'Mashed Potatoes (16oz)', qty: '1' },
    ],
  },
];

const onlineOrders: OnlineOrder[] = [
  {
    osn: 'OSN 7284',
    initialSeconds: 1680,   // 28 min — surfaces because < 30 min threshold
    pickupTime: '2:30 PM',
    item: {
      name: 'Rotisserie Chicken, 29 oz',
      plu: '6870',
      image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F101c242f144e4139b92d8454ffb0aab7',
      qty: '1',
      type: 'Traditional',
    },
  },
  {
    osn: 'OSN 7285',
    initialSeconds: 6300,   // 1h 45m — waiting, not yet surfaced
    pickupTime: '4:15 PM',
    item: {
      name: 'Popcorn Chicken Cup',
      plu: '6870',
      image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F292c8c14239245c9a9cdef7c9f7a41b6',
      qty: '1',
      type: 'Regular',
    },
  },
];

// ─── Countdown Timer Hook ────────────────────────────────────────────────────

type TimerState = 'running' | 'paused' | 'expired';

function useCountdownTimer(initialSeconds: number, thresholds: TimerThresholds) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [timerState, setTimerState] = useState<TimerState>('running');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const tick = useCallback(() => {
    setSecondsLeft(s => {
      if (s <= 1) {
        setTimerState('expired');
        return 0;
      }
      return s - 1;
    });
  }, []);

  useEffect(() => {
    if (timerState === 'running') {
      intervalRef.current = setInterval(tick, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [timerState, tick]);

  const toggle = useCallback(() => {
    setTimerState(s => {
      if (s === 'expired') return s;
      return s === 'running' ? 'paused' : 'running';
    });
  }, []);

  const reset = useCallback(() => {
    setSecondsLeft(initialSeconds);
    setTimerState('running');
  }, [initialSeconds]);

  // Smart formatting: show hours when >= 60 min
  const formatted = (() => {
    if (secondsLeft >= 3600) {
      const h = Math.floor(secondsLeft / 3600);
      const m = Math.floor((secondsLeft % 3600) / 60);
      return `${h}h ${m}m`;
    }
    const m = Math.floor(secondsLeft / 60);
    const s = secondsLeft % 60;
    return `${m}:${String(s).padStart(2, '0')} mins`;
  })();

  const urgency: 'normal' | 'warning' | 'critical' | 'expired' =
    timerState === 'expired' ? 'expired'
    : secondsLeft <= thresholds.critical ? 'critical'
    : secondsLeft <= thresholds.warning  ? 'warning'
    : 'normal';

  return { secondsLeft, formatted, timerState, urgency, toggle, reset };
}

// ─── CountdownTimer Component ─────────────────────────────────────────────────

function CountdownTimer({
  initialSeconds,
  thresholds = EXPRESS_THRESHOLDS,
}: {
  initialSeconds: number;
  thresholds?: TimerThresholds;
}) {
  const { formatted, timerState, urgency, toggle, reset } = useCountdownTimer(initialSeconds, thresholds);

  const tagClass = [
    styles.timerTag,
    styles[`timerTag--${urgency}`],
    timerState === 'paused' && styles['timerTag--paused'],
  ].filter(Boolean).join(' ');

  const label =
    timerState === 'paused' ? `${formatted} (paused)` :
    urgency === 'expired' ? 'Overdue' :
    `Due in ${formatted}`;

  return (
    <button
      type="button"
      className={tagClass}
      onClick={toggle}
      onDoubleClick={reset}
      aria-label={`Timer: ${label}. Click to ${timerState === 'running' ? 'pause' : 'resume'}, double-click to reset`}
      title={timerState === 'paused' ? 'Click to resume · Double-click to reset' : 'Click to pause · Double-click to reset'}
    >
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true" className={styles.timerIcon}>
        <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1.2" />
        <path d="M5 2.5V5L6.5 6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
      <span>{label}</span>
      {timerState === 'paused' && (
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
          <path d="M2 1.5L6.5 4L2 6.5V1.5Z" fill="currentColor" />
        </svg>
      )}
    </button>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function AppHeader() {
  const [installPrompt, setInstallPrompt] = useState<Event | null>(null);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches
    || (window.navigator as any).standalone === true;

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (installPrompt) {
      const prompt = installPrompt as BeforeInstallPromptEvent;
      await prompt.prompt();
      setInstallPrompt(null);
    }
  };

  const showBanner = !!installPrompt && !bannerDismissed && !isStandalone;
  const showHeaderInstallBtn = !isStandalone;

  return (
    <>
      <header className={styles.appHeader}>
        <div className={styles.appHeader__left}>
          <button className={styles.iconBtn} aria-label="Open menu">
            <Menu />
          </button>
          <h1 className={styles.appHeader__title}>MyWalmart</h1>
        </div>
        <div className={styles.appHeader__right}>
          {showHeaderInstallBtn && (
            <button
              className={styles.installBtn}
              onClick={handleInstall}
              aria-label="Install app"
              title="Install as app"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 16L7 11l1.4-1.45 2.6 2.6V4h2v8.15l2.6-2.6L17 11l-5 5zm-6 4q-.825 0-1.412-.587A1.927 1.927 0 0 1 4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413A1.927 1.927 0 0 1 18 20H6z" fill="currentColor"/>
              </svg>
              <span>Install</span>
            </button>
          )}
          <div className={styles.avatar}>
            <div className={styles.avatar__initials}>AC</div>
            <div className={styles.avatar__clock}>
              <ClockStatusDot />
            </div>
          </div>
        </div>
      </header>

      {showBanner && (
        <div className={styles.installBanner} role="banner" aria-label="Install app">
          <div className={styles.installBanner__icon}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 16L7 11l1.4-1.45 2.6 2.6V4h2v8.15l2.6-2.6L17 11l-5 5zm-6 4q-.825 0-1.412-.587A1.927 1.927 0 0 1 4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413A1.927 1.927 0 0 1 18 20H6z" fill="currentColor"/>
            </svg>
          </div>
          <div className={styles.installBanner__text}>
            <p className={styles.installBanner__title}>Install MyWalmart</p>
            <p className={styles.installBanner__subtitle}>Add to home screen for the best experience</p>
          </div>
          <div className={styles.installBanner__actions}>
            <button className={styles.installBanner__installBtn} onClick={handleInstall}>
              Install
            </button>
            <button className={styles.installBanner__dismissBtn} onClick={() => setBannerDismissed(true)}>
              Not now
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function MetricsSummary() {
  return (
    <div className={styles.metrics}>
      <div className={styles.metric}>
        <div className={styles.metric__valueRow}>
          <div className={styles.metric__value}>52.3<span className={styles.metric__unit}>k</span></div>
          <div className={styles.metric__trend + ' ' + styles['metric__trend--positive']}>
            <ArrowUp width={14} height={14} />
            <span>4.5%</span>
          </div>
        </div>
        <div className={styles.metric__label}>Store sales</div>
      </div>
      <div className={styles.metric__divider} aria-hidden="true" />
      <div className={styles.metric}>
        <div className={styles.metric__valueRow}>
          <div className={styles.metric__value}>97.3<span className={styles.metric__unit}>%</span></div>
          <div className={styles.metric__trend + ' ' + styles['metric__trend--positive']}>
            <ArrowUp width={14} height={14} />
            <span>2.2%</span>
          </div>
        </div>
        <div className={styles.metric__label}>FTPR</div>
      </div>
      <div className={styles.metric__divider} aria-hidden="true" />
      <div className={styles.metric}>
        <div className={styles.metric__valueRow}>
          <div className={styles.metric__value}>17</div>
          <div className={styles.metric__trend + ' ' + styles['metric__trend--positive']}>
            <ArrowDown width={14} height={14} />
            <span>28</span>
          </div>
        </div>
        <div className={styles.metric__label}>Nil picks</div>
      </div>
      <div className={styles.metric__divider} aria-hidden="true" />
      <div className={styles.metric}>
        <div className={styles.metric__value}>51</div>
        <div className={styles.metric__label}>Orders today</div>
        <div className={styles.metric__trend + ' ' + styles['metric__trend--neutral']}>
          <span></span>
        </div>
      </div>
      <div className={styles.metric__divider} aria-hidden="true" />
      <div className={styles.metric}>
        <div className={styles.metric__valueRow}>
          <div className={styles.metric__value}><span className={styles.metric__unit}>$</span>97.70</div>
          <div className={styles.metric__trend + ' ' + styles['metric__trend--positive']}>
            <ArrowDown width={14} height={14} />
            <span>28</span>
          </div>
        </div>
        <div className={styles.metric__label}>Waste</div>
      </div>
    </div>
  );
}

function ExpressTag({ initialSeconds }: { initialSeconds: number }) {
  return (
    <div className={styles.orderHeader__tags}>
      <span className={styles.expressTag}>
        <LightningIcon />
        <span>Express Delivery</span>
      </span>
      <CountdownTimer initialSeconds={initialSeconds} />
    </div>
  );
}


function ItemRow({ item, showDivider = true }: { item: OrderItem; showDivider?: boolean }) {
  return (
    <>
      {showDivider && <div className={styles.divider} />}
      <div className={styles.itemRow}>
        <img
          src={item.image}
          alt={item.name}
          className={styles.itemRow__image}
        />
        <div className={styles.itemRow__content}>
          <div className={styles.itemRow__name}>{item.name}</div>
          <div className={styles.itemRow__attrs}>
            <span className={styles.attrLabel}>PLU</span>
            <span className={styles.attrValue}>{item.plu}</span>
          </div>
        </div>
        <span className={styles.itemRow__qtyBadge}>
          <span className={styles.itemRow__qtyX}>×</span>
          <span className={styles.itemRow__qtyNum}>{item.qty}</span>
        </span>
      </div>
    </>
  );
}

function OrderDetails({ item }: { item: OrderItem }) {
  return (
    <div className={styles.orderDetails}>
      <div className={styles.divider} />
      <div className={styles.orderDetails__row}>
        <div className={styles.orderDetails__col}>
          <div className={styles.attrLabel}>Qty</div>
          <div className={styles.attrValue}>{item.qty}</div>
        </div>
        <div className={styles.orderDetails__colDivider} />
        <div className={styles.orderDetails__col}>
          <div className={styles.attrLabel}>Type</div>
          <div className={styles.attrValue}>{item.type ?? '-'}</div>
        </div>
        {item.thickness && (
          <>
            <div className={styles.orderDetails__colDivider} />
            <div className={styles.orderDetails__col}>
              <div className={styles.attrLabel}>Thickness</div>
              <div className={styles.attrValue}>{item.thickness}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const ReweighIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M13.5 8A5.5 5.5 0 1 1 8 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M8 1v3.5L10.5 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

type ScaleState = 'idle' | 'reading' | 'read';

function ExpressOrderCard({ order }: { order: StoreOrder }) {
  const [scaleState, setScaleState] = useState<ScaleState>('idle');
  // Non-weight orders are always unlocked — no scale needed
  const [orderLabelUnlocked, setOrderLabelUnlocked] = useState(!order.isWeightItem);
  const readingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handlePlaceOnScale = () => {
    setScaleState('reading');
    // Simulate scale reading — resolves after ~2 s
    readingTimerRef.current = setTimeout(() => {
      setScaleState('read');
    }, 2000);
  };

  const handleReweigh = () => {
    if (readingTimerRef.current) clearTimeout(readingTimerRef.current);
    setScaleState('idle');
    setOrderLabelUnlocked(false);
  };

  const handlePrintItemLabel = () => {
    setOrderLabelUnlocked(true);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => { if (readingTimerRef.current) clearTimeout(readingTimerRef.current); };
  }, []);

  return (
    <div className={styles.card}>
      {/* Card header */}
      <div className={styles.card__header}>
        <div className={styles.orderHeader}>
          <span className={styles.orderHeader__osn}>{order.osn}</span>
          {order.isExpress
            ? <ExpressTag initialSeconds={order.initialSeconds} />
            : <div className={styles.orderHeader__tags}>
                <span className={styles.inStoreTag}>In-Store</span>
              </div>
          }
        </div>
        {order.customerName && (
          <div className={styles.orderHeader__customer}>{order.customerName}</div>
        )}
      </div>

      {/* Items */}
      {order.items.map((item, idx) => (
        <div key={idx}>
          <ItemRow item={item} showDivider={true} />
          <OrderDetails item={item} />
        </div>
      ))}

      {/* Weight item */}
      {order.isWeightItem && (
        <div className={styles.weightItem}>
          <div className={styles.divider} />
          <div className={styles.weightItem__row}>
            <span className={styles.weightItem__label}>Weight item</span>
            <div className={styles.weightItem__scaleLink}>
              <span className={styles.scaleOnlineDot} aria-hidden="true" />
              <span className={styles.scaleOnlineText}>Scale online</span>
            </div>
          </div>

          {/* ── idle: place on scale ── */}
          {scaleState === 'idle' && (
            <Button
              variant="secondary"
              size="small"
              isFullWidth
              leading={<ScaleIcon />}
              onClick={handlePlaceOnScale}
            >
              Place items on scale
            </Button>
          )}

          {/* ── reading: animated scanning state ── */}
          {scaleState === 'reading' && (
            <div className={styles.scaleReading} role="status" aria-live="polite">
              <div className={styles.scaleReading__iconWrap} aria-hidden="true">
                <ScaleIcon />
                <span className={styles.scaleReading__pulse} />
              </div>
              <div className={styles.scaleReading__text}>
                <span className={styles.scaleReading__title}>Reading scale</span>
                <span className={styles.scaleReading__dots} aria-hidden="true">
                  <span /><span /><span />
                </span>
              </div>
              <div className={styles.scaleReading__bar} aria-hidden="true">
                <span className={styles.scaleReading__fill} />
              </div>
            </div>
          )}

          {/* ── read: scale result ── */}
          {scaleState === 'read' && order.scaleReading && (
            <div className={styles.scaleResult}>
              <div className={styles.scaleResult__info}>
                <span className={styles.scaleResult__label}>Scale reading</span>
                <span className={styles.scaleResult__value}>
                  {order.scaleReading.weight}
                  <span className={styles.scaleResult__price}>{order.scaleReading.price}</span>
                </span>
              </div>
              <button
                type="button"
                className={styles.reweighBtn}
                onClick={handleReweigh}
                aria-label="Re-weigh item"
              >
                <ReweighIcon />
                Re-weigh
              </button>
            </div>
          )}
        </div>
      )}

      {/* Print item label — active once scale reading is done */}
      {scaleState === 'read' && (
        <div className={styles.scanActions__btn}>
          <Button
            variant="primary"
            size="small"
            isFullWidth
            onClick={handlePrintItemLabel}
          >
            Print item label
          </Button>
        </div>
      )}

      {/* Scan actions — unlock hint + print order label */}
      <div className={styles.scanActions}>
        <div className={styles.divider} />
        {order.isWeightItem && !orderLabelUnlocked && (
          <p className={styles.unlockText}>Weigh 1 item to unlock</p>
        )}
        <div className={styles.scanActions__btn}>
          <Button
            variant="secondary"
            size="small"
            isFullWidth
            disabled={order.isWeightItem && !orderLabelUnlocked}
          >
            Print order label
          </Button>
        </div>
      </div>
    </div>
  );
}

const UNDER_REASONS = ['Burnt', 'Dropped', 'Quality issues'] as const;

function ProductionCard({ item }: { item: ProductionItem }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(item.makeNow);
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [overReason, setOverReason] = useState('');

  const isMadeLess = quantity < item.makeNow;
  const isMadeMore = quantity > item.makeNow;
  const canConfirm = isMadeLess ? selectedReason !== null : isMadeMore ? overReason.trim().length > 0 : true;

  const handleOpen = () => {
    setQuantity(item.makeNow);
    setSelectedReason(null);
    setOverReason('');
    setModalOpen(true);
  };

  const handleConfirm = () => {
    // In production this would POST to an API
    setModalOpen(false);
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.productionCard__top}>
          <img src={item.image} alt={item.name} className={styles.productionCard__image} />
          <div className={styles.productionCard__info}>
            <div className={styles.productionCard__name}>{item.name}</div>
            <div className={styles.productionCard__attrs}>
              <div className={styles.productionCard__attrRow}>
                <span className={styles.attrLabel}>UPC</span>
                <span className={styles.attrValue}>{item.upc}</span>
              </div>
              <div className={styles.productionCard__attrRow}>
                <span className={styles.attrLabel}>{item.pluOrItemNumberLabel}</span>
                <span className={styles.attrValue}>{item.pluOrItemNumber}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.divider} />
        <div className={styles.productionMetrics}>
          <div className={styles.productionMetric}>
            <div className={styles.productionMetric__value}>{item.plan}</div>
            <div className={styles.productionMetric__label}>Plan</div>
          </div>
          <div className={styles.productionMetric__divider} />
          <div className={styles.productionMetric}>
            <div className={styles.productionMetric__value}>{item.onHand}</div>
            <div className={styles.productionMetric__label}>On-hand</div>
          </div>
          <div className={styles.productionMetric__divider} />
          <div className={styles.productionMetric}>
            <div className={styles.productionMetric__value}>{item.makeNow}</div>
            <div className={styles.productionMetric__label}>Make now</div>
          </div>
        </div>
        <div className={styles.divider} />
        <div className={styles.productionActions}>
          <button className={styles.buildSheetLink}>Build sheet</button>
          <Button variant="secondary" size="small" isFullWidth onClick={handleOpen}>
            Get started
          </Button>
        </div>
      </div>

      {/* ── Production Completion Modal ── */}
      <Modal open={modalOpen} onOpenChange={open => !open && setModalOpen(false)}>
        <ModalContent size="small" hideClose>
          <div className={styles.prodModal__header}>
            <div className={styles.prodModal__product}>
              <img src={item.image} alt={item.name} className={styles.prodModal__productImg} />
              <div>
                <div className={styles.prodModal__productName}>{item.name}</div>
                <div className={styles.prodModal__productPlu}>
                  {item.pluOrItemNumberLabel}: {item.pluOrItemNumber}
                </div>
              </div>
            </div>
            <ModalClose asChild>
              <button type="button" className={styles.modalCloseBtn} aria-label="Close">
                <X width={20} height={20} />
              </button>
            </ModalClose>
          </div>

          <div className={styles.prodModal__body}>
            <h3 className={styles.prodModal__question}>How many did you make?</h3>

            {/* Custom stepper — always visible, full-width pill */}
            <div className={styles.prodModal__stepper}>
              <button
                type="button"
                className={styles.prodModal__stepperBtn}
                onClick={() => { setQuantity(q => Math.max(0, q - 1)); setSelectedReason(null); }}
                aria-label="Decrease quantity"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M19.5 12.7495H4.5V11.2495H19.5V12.7495Z" fill="currentColor"/>
                </svg>
              </button>
              <span className={styles.prodModal__stepperValue}>
                {quantity} <span className={styles.prodModal__stepperUnit}>ea</span>
              </span>
              <button
                type="button"
                className={styles.prodModal__stepperBtn}
                onClick={() => { setQuantity(q => q + 1); setSelectedReason(null); }}
                aria-label="Increase quantity"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M11.25 12.75V19.5H12.75V12.75H19.5V11.25H12.75V4.5H11.25V11.25H4.5V12.75H11.25Z" fill="currentColor"/>
                </svg>
              </button>
            </div>

            {isMadeLess && (
              <>
                <p className={styles.prodModal__reasonLabel}>What happened?</p>
                <div className={styles.prodModal__reasons}>
                  {UNDER_REASONS.map(reason => (
                    <button
                      key={reason}
                      type="button"
                      className={[
                        styles.prodModal__reasonChip,
                        selectedReason === reason ? styles['prodModal__reasonChip--active'] : '',
                      ].filter(Boolean).join(' ')}
                      onClick={() => setSelectedReason(prev => prev === reason ? null : reason)}
                    >
                      {reason}
                    </button>
                  ))}
                </div>
              </>
            )}

            {isMadeMore && (
              <div className={styles.prodModal__overReason}>
                <TextArea
                  label="Why did you make more?"
                  placeholder="Enter reason..."
                  value={overReason}
                  onChange={e => setOverReason(e.target.value)}
                  size="medium"
                />
              </div>
            )}
          </div>

          <div className={styles.prodModal__footer}>
            <Button
              variant="primary"
              size="large"
              isFullWidth
              disabled={!canConfirm}
              onClick={handleConfirm}
            >
              Confirm and print label
            </Button>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}

function PickupSoonBanner({ pickupTime }: { pickupTime: string }) {
  return (
    <div className={styles.pickupBanner} role="alert">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.4" />
        <path d="M7 4v3.5l2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
      <span>Pickup at <strong>{pickupTime}</strong> — prepare now</span>
    </div>
  );
}

function InStoreOrderCard({ order }: { order: InStoreKitchenOrder }) {
  const mainItem = order.items.find(i => i.isMain) ?? order.items[0];
  const subItems = order.items.filter(i => !i.isMain);

  return (
    <div className={styles.card}>
      {/* Header row: OSN + badge + placed time */}
      <div className={styles.inStoreCard__header}>
        <span className={styles.orderHeader__osn}>{order.osn}</span>
        <span className={styles.inStoreTag}>In store order</span>
      </div>
      <div className={styles.inStoreCard__subheader}>
        <span className={styles.inStoreCard__customer}>{order.customerName}</span>
        {order.placedTime && (
          <span className={styles.inStoreCard__placed}>Placed {order.placedTime}</span>
        )}
      </div>
      {order.instructions && (
        <div className={styles.inStoreCard__instructions}>{order.instructions}</div>
      )}

      <div className={styles.divider} />

      {/* Main item row with image */}
      <div className={styles.inStoreCard__mainItem}>
        {mainItem.image && (
          <img
            src={mainItem.image}
            alt={mainItem.name}
            className={styles.inStoreCard__mainImg}
          />
        )}
        <div className={styles.inStoreCard__mainInfo}>
          <div className={styles.inStoreCard__mainName}>
            <span className={styles.inStoreCard__mainNameText}>{mainItem.name}</span>
            <span className={styles.itemRow__qtyBadge}>
              <span className={styles.itemRow__qtyX}>×</span>
              <span className={styles.itemRow__qtyNum}>{mainItem.qty}</span>
            </span>
          </div>
          {/* Sub-items */}
          {subItems.map((item, idx) => (
            <div key={idx} className={styles.inStoreCard__subItem}>{item.name}</div>
          ))}
          {mainItem.plu && (
            <div className={styles.inStoreCard__plu}>
              <span className={styles.attrLabel}>PLU</span>
              <span className={styles.attrValue}>{mainItem.plu}</span>
            </div>
          )}
        </div>
      </div>

      <div className={styles.card__action}>
        <div className={styles.divider} />
        <div className={styles.card__actionPad}>
          <Button variant="secondary" size="small" isFullWidth>Print order label</Button>
        </div>
      </div>
    </div>
  );
}

function ScheduledOrderCard({ order }: { order: InStoreKitchenOrder }) {
  const mainItem = order.items.find(i => i.isMain) ?? order.items[0];
  const subItems = order.items.filter(i => !i.isMain);

  return (
    <div className={styles.scheduledCard}>
      <div className={styles.scheduledCard__header}>
        <div className={styles.scheduledCard__osn}>{order.osn}</div>
        <div className={styles.scheduledCard__pickup}>
          <span className={styles.scheduledCard__pickupDate}>{order.pickupDate}</span>
          {order.pickupTime && (
            <span className={styles.scheduledCard__pickupTime}>{order.pickupTime}</span>
          )}
        </div>
      </div>
      <div className={styles.scheduledCard__customer}>{order.customerName}</div>
      {order.instructions && (
        <div className={styles.inStoreCard__instructions}>{order.instructions}</div>
      )}
      <div className={styles.divider} />
      <div className={styles.inStoreCard__mainItem}>
        {mainItem.image && (
          <img src={mainItem.image} alt={mainItem.name} className={styles.inStoreCard__mainImg} />
        )}
        <div className={styles.inStoreCard__mainInfo}>
          <div className={styles.inStoreCard__mainName}>
            <span className={styles.inStoreCard__mainNameText}>{mainItem.name}</span>
            <span className={styles.itemRow__qtyBadge}>
              <span className={styles.itemRow__qtyX}>×</span>
              <span className={styles.itemRow__qtyNum}>{mainItem.qty}</span>
            </span>
          </div>
          {subItems.map((item, idx) => (
            <div key={idx} className={styles.inStoreCard__subItem}>{item.name} × {item.qty}</div>
          ))}
        </div>
      </div>
      <div className={styles.card__action}>
        <div className={styles.divider} />
        <div className={styles.card__actionPad}>
          <Button variant="secondary" size="small" isFullWidth>Print order label</Button>
        </div>
      </div>
    </div>
  );
}

function OnlineOrderCard({ order }: { order: OnlineOrder }) {
  const { secondsLeft } = useCountdownTimer(order.initialSeconds, ONLINE_THRESHOLDS);
  const isSurfaced = secondsLeft <= ONLINE_THRESHOLDS.warning; // within 30 min

  return (
    <div className={styles.card}>
      <div className={styles.card__header}>
        <div className={styles.orderHeader}>
          <span className={styles.orderHeader__osn}>{order.osn}</span>
          <div className={styles.orderHeader__tags}>
            <span className={styles.onlineTag}>Online Order</span>
            <CountdownTimer initialSeconds={order.initialSeconds} thresholds={ONLINE_THRESHOLDS} />
          </div>
        </div>
        <div className={styles.orderHeader__pickup}>
          <span className={styles.attrLabel}>Pickup</span>
          <span className={[styles.attrValue, isSurfaced ? styles['attrValue--urgent'] : ''].filter(Boolean).join(' ')}>{order.pickupTime}</span>
        </div>
      </div>
      <ItemRow item={order.item} showDivider={true} />
      <OrderDetails item={order.item} />
      <div className={styles.card__action}>
        <div className={styles.divider} />
        <div className={styles.card__actionPad}>
          <Button variant="secondary" size="small" isFullWidth>Print order label</Button>
        </div>
      </div>
    </div>
  );
}

// ─── Store Orders ──────────────────────────────────────────────────────────────

type ItemType = 'grab_go' | 'portioned' | 'bundle' | 'party_tray' | 'deli_meat';

interface CustomizationOption {
  label: string;
  description?: string;
}

interface CustomizationGroup {
  id: string;
  title: string;
  type: 'single' | 'multi';
  max?: number;
  options: (string | CustomizationOption)[];
}

const getOptionLabel = (opt: string | CustomizationOption): string =>
  typeof opt === 'string' ? opt : opt.label;

interface ProductVariant {
  id: string;
  label: string;
  price: number;
  plu: string;
  feeds?: string;
  includes?: string;
}

interface StoreProduct {
  id: string;
  name: string;
  itemType: ItemType;
  basePrice: number;
  image: string;
  category: string;
  tag?: string;
  description?: string;
  plu?: string;
  notice?: string;
  variants?: ProductVariant[];
  customizations?: CustomizationGroup[];
  thicknessOptions?: string[];
  priceDisplay?: string;
}

interface StoreCartItem {
  cartId: string;
  product: StoreProduct;
  selectedVariant: ProductVariant | null;
  qty: number;
  selections: Record<string, string[]>;
  targetWeight?: number;
  selectedThickness?: string;
  price: number;
}

interface StoreCustomerInfo {
  name: string;
  phone: string;
  pickupDate: string;
  pickupTime: string;
  pickupDay: string;
  orderDate: string;
  orderTakenBy: string;
  instructions: string;
}

const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const DELI_ASSOCIATES = ['Sarah Jenkins', 'Marcus Johnson', 'Elena Rodriguez', 'David Chen'];

const WING_CUSTOMIZATIONS: CustomizationGroup[] = [
  { id: 'boneless_flavor', title: 'Boneless Wing Flavor', type: 'single', options: ['General Tso', 'Orange', 'BBQ'] },
  { id: 'bone_in_flavor', title: 'Bone-In Wing Flavor', type: 'single', options: ['Ranch', 'Buffalo', 'Breaded'] },
];

const HOT_MEALS_DATA: StoreProduct[] = [
  {
    id: 'hot_bundle_roti',
    name: 'Rotisserie Meal Bundle',
    itemType: 'bundle',
    basePrice: 9.97,
    plu: '2601234762',
    tag: 'Meal Deal',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F48c83a76bcc649d2979873a70f877dc6',
    category: 'hot-meals',
    description: 'Includes 1 Whole Traditional Rotisserie Chicken and choice of 2 family-size sides (16oz). Serves 3–4.',
    customizations: [
      { id: 'main', title: 'Select Main Entree', type: 'single', options: [
        { label: 'Traditional Rotisserie Chicken', description: '1 Whole Chicken + 2 family sides (16oz). Serves 3–4.' },
        { label: 'Lemon Pepper Chicken', description: '1 Whole Chicken + 2 family sides (16oz). Serves 3–4.' },
      ]},
      { id: 'side1', title: 'Select First Side (16oz)', type: 'single', options: ['Mac & Cheese', 'Mashed Potatoes', 'Potato Wedges', 'Baked Beans (+$1.50)'] },
      { id: 'side2', title: 'Select Second Side (16oz)', type: 'single', options: ['Mac & Cheese', 'Mashed Potatoes', 'Potato Wedges', 'Baked Beans (+$1.50)'] },
    ],
  },
  {
    id: 'hot_wings',
    name: 'Buffalo Chicken Wings, 6 Count',
    itemType: 'grab_go',
    basePrice: 6.48,
    plu: '62807',
    tag: 'Grab & Go',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F3589d6e20734497d821d672918f19e70',
    category: 'hot-meals',
    description: 'Crispy buffalo-style chicken wings. Ready to grab and go — no wait needed.',
  },
  {
    id: 'hot_mac',
    name: 'Macaroni and Cheese',
    itemType: 'portioned',
    basePrice: 0.97,
    priceDisplay: 'From $0.97',
    tag: 'Portioned',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fc0d3fddf261c4a17a4424da05e0ecacc',
    category: 'hot-meals',
    description: 'Creamy, rich mac & cheese made fresh daily. Available in 4 oz or 16 oz portions.',
    variants: [
      { id: 'sm', label: '4 oz', price: 0.97, plu: '62811' },
      { id: 'md', label: '16 oz', price: 3.84, plu: '62810' },
    ],
  },
  {
    id: 'hot_popcorn',
    name: 'Popcorn Chicken',
    itemType: 'portioned',
    basePrice: 4.98,
    tag: 'Portioned',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F292c8c14239245c9a9cdef7c9f7a41b6',
    category: 'hot-meals',
    description: 'Bite-sized crispy chicken pieces seasoned to perfection. Available in Small Cup, Medium Cup, or Large Box.',
    variants: [
      { id: 'sm', label: 'Small Cup', price: 4.98, plu: '62821' },
      { id: 'md', label: 'Medium Cup', price: 7.98, plu: '62820' },
      { id: 'lg', label: 'Large Box', price: 12.98, plu: '62822' },
    ],
  },
];

const ROAST_BEEF_CUSTOMIZATION: CustomizationGroup[] = [
  { id: 'roast_beef_temp', title: 'Roast Beef Temperature', type: 'single', options: ['Medium', 'Rare'] },
];

const PARTY_TRAY_DATA: StoreProduct[] = [
  // ── Chicken trays ──
  {
    id: 'tray_fried_chicken',
    name: 'Fried Chicken Tray',
    itemType: 'party_tray',
    basePrice: 15.00,
    tag: '24 Hour Notice',
    notice: '24 hour notice',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fd1a75c492ffa449ea97dab8fbcc944bc',
    category: 'party-tray',
    description: 'Freshly fried chicken pieces. Breasts, Wings, Legs & Thighs.',
    variants: [
      { id: '16pc', label: '16 Pc Chicken', price: 15.00, plu: '9548', includes: '4 Breasts, 4 Wings, 4 Legs & 4 Thighs' },
      { id: '48pc', label: '48 Pc Chicken', price: 42.00, plu: '62888', includes: '12 Breasts, 12 Wings, 12 Legs & 12 Thighs' },
    ],
    customizations: [],
  },
  {
    id: 'tray_chicken_combo',
    name: 'Chicken Combo Trays',
    itemType: 'party_tray',
    basePrice: 45.00,
    tag: '24 Hour Notice',
    notice: '24 hour notice',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F292cf888ca2b46c5b3bd75a9a969fc6e',
    category: 'party-tray',
    description: 'Chicken Tenders, 1 flavor Boneless wing and 1 flavor Bone in wings. Served with ranch. No substitutions.',
    variants: [
      { id: 'med', label: 'Med (Feeds 7–9)', price: 45.00, plu: '27203', includes: '12 Tenders, 18 Bone In Wings, 24 Boneless Wings' },
      { id: 'lg', label: 'Lg (Feeds 10–14)', price: 65.00, plu: '27204', includes: '15 Tenders, 24 Bone In Wings, 30 Boneless Wings' },
    ],
    customizations: WING_CUSTOMIZATIONS,
  },
  {
    id: 'tray_wing_trays',
    name: 'Wing Trays',
    itemType: 'party_tray',
    basePrice: 35.00,
    tag: '24 Hour Notice',
    notice: '24 hour notice',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fd88f496f795a4220925ce35add8ed1b5',
    category: 'party-tray',
    description: 'Combo of boneless and bone in wings. Served with carrots, celery sticks and ranch for dipping.',
    variants: [
      { id: 'sm', label: 'Small (Feeds 5–7)', price: 35.00, plu: '8113', includes: '10 Bone in Wings, 20 Boneless' },
      { id: 'md', label: 'Medium (Feeds 7–9)', price: 55.00, plu: '8114', includes: '18 Bone In Wings, 24 Boneless Wings' },
      { id: 'lg', label: 'Large (Feeds 10–12)', price: 75.00, plu: '8115', includes: '24 Bone In Wings, 30 Boneless Wings' },
    ],
    customizations: WING_CUSTOMIZATIONS,
  },
  // ── Subs & Party Trays ──
  {
    id: 'tray_sub_sandwich',
    name: 'Sub Sandwich Party Tray',
    itemType: 'party_tray',
    basePrice: 48.00,
    tag: '24 Hour Notice',
    notice: '24 hour notice',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Ff7fe9b169160471da33a07f1c0d5e4c6',
    category: 'party-tray',
    description: 'Honey Ham, Oven Roasted Turkey & Roast Beef (Med or Rare). Pick 2 cheeses: Cheddar, Colby Jack, Swiss.',
    variants: [
      { id: '2ft', label: '2 ft. (Feeds 10–20)', price: 48.00, plu: '5847' },
      { id: '4ft', label: '4 ft. (Feeds 10–20)', price: 88.00, plu: '5848' },
      { id: '6ft', label: '6 ft. (Feeds 20–25)', price: 126.00, plu: '63739' },
    ],
    customizations: [
      ...ROAST_BEEF_CUSTOMIZATION,
      { id: 'cheese', title: 'Pick 2 Cheeses', type: 'multi', max: 2, options: ['Cheddar', 'Colby Jack', 'Swiss'] },
    ],
  },
  {
    id: 'tray_wedge',
    name: 'Wedge Tray (Sandwich Tray)',
    itemType: 'party_tray',
    basePrice: 42.00,
    tag: '24 Hour Notice',
    notice: '24 hour notice',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F5719b8fa882a4cb19d6f7bfe60aede8e',
    category: 'party-tray',
    description: 'Honey Ham, Oven Roasted Turkey & Roast Beef (Med or Rare). Includes Colby Jack & Swiss cheese.',
    variants: [
      { id: 'med', label: 'Med Tray (Feeds 10–20)', price: 42.00, plu: '5798' },
      { id: 'lg', label: 'Lrg Tray (Feeds 20–25)', price: 52.00, plu: '5801' },
    ],
    customizations: ROAST_BEEF_CUSTOMIZATION,
  },
  {
    id: 'tray_meat_cheese',
    name: 'Meat & Cheese Tray',
    itemType: 'party_tray',
    basePrice: 55.00,
    tag: '24 Hour Notice',
    notice: '24 hour notice',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F198c430d72864b6388d9a22f6f58525f',
    category: 'party-tray',
    description: 'Honey Ham, Oven Roasted Turkey & Roast Beef (Med or Rare). Includes Colby Jack, Swiss & Cheddar.',
    variants: [
      { id: 'sm', label: 'Sm Tray (8–10)', price: 55.00, plu: '7126' },
      { id: 'med', label: 'Med Tray (10–20)', price: 100.00, plu: '63737' },
      { id: 'lg', label: 'Lrg Tray (20–25)', price: 140.00, plu: '63738' },
    ],
    customizations: ROAST_BEEF_CUSTOMIZATION,
  },
  {
    id: 'tray_all_meat',
    name: 'All Meat Tray',
    itemType: 'party_tray',
    basePrice: 96.00,
    tag: '24 Hour Notice',
    notice: '24 hour notice',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F92cef5a618f9492d8031deac535bbb44',
    category: 'party-tray',
    description: 'Black Forest Ham, Honey Ham, Oven Roasted Turkey, Hard Salami & Roast Beef (Med or Rare).',
    variants: [
      { id: 'med', label: 'Med Tray (10–20)', price: 96.00, plu: '5832' },
      { id: 'lg', label: 'Lrg Tray (20–25)', price: 136.00, plu: '63742' },
    ],
    customizations: ROAST_BEEF_CUSTOMIZATION,
  },
  {
    id: 'tray_all_cheese',
    name: 'All Cheese Tray',
    itemType: 'party_tray',
    basePrice: 78.00,
    tag: '24 Hour Notice',
    notice: '24 hour notice',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fb3aacd015f7f4fc0a53e17ea392259ed',
    category: 'party-tray',
    description: 'Cheddar, Colby Jack, Pepper Jack, Muenster, Swiss & Provolone. No customizable options.',
    variants: [
      { id: 'med', label: 'Med Tray (1–20)', price: 78.00, plu: '5811' },
      { id: 'lg', label: 'Lrg Tray (20–25)', price: 102.00, plu: '63744' },
    ],
    customizations: [],
  },
  {
    id: 'tray_slider',
    name: 'Slider Tray on Hawaiian Rolls',
    itemType: 'party_tray',
    basePrice: 26.00,
    tag: '24 Hour Notice',
    notice: '24 hour notice',
    image: 'https://images.pexels.com/photos/35247169/pexels-photo-35247169.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'party-tray',
    description: 'Honey Ham, Oven Roasted Turkey & Roast Beef (Med or Rare). Includes Cheddar, Colby Jack & Swiss.',
    variants: [
      { id: 'sm', label: 'Sm Tray (6–10)', price: 26.00, plu: '27206' },
      { id: 'med', label: 'Med Tray (10–15)', price: 34.00, plu: '27207' },
      { id: 'lg', label: 'Lrg Tray (15–20)', price: 38.00, plu: '27208' },
    ],
    customizations: ROAST_BEEF_CUSTOMIZATION,
  },
];

const MEAT_CHEESE_DATA: StoreProduct[] = [
  {
    id: 'meat_turkey',
    name: 'Prima Della Hickory Smoked Turkey',
    itemType: 'deli_meat',
    basePrice: 10.98,
    plu: '6379',
    tag: 'Deli',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F85b686ebbd0347389df291e214c5cd88',
    category: 'meat-cheese',
    thicknessOptions: ['Shaved', 'Thin (1mm)', 'Sandwich (2mm)', 'Thick (4mm)'],
  },
  {
    id: 'meat_ham',
    name: 'Black Forest Ham',
    itemType: 'deli_meat',
    basePrice: 8.98,
    plu: '5832',
    tag: 'Deli',
    image: 'https://images.pexels.com/photos/5491290/pexels-photo-5491290.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'meat-cheese',
    thicknessOptions: ['Shaved', 'Thin (1mm)', 'Sandwich (2mm)', 'Thick (4mm)'],
  },
  {
    id: 'cheese_provolone',
    name: 'Provolone Cheese',
    itemType: 'deli_meat',
    basePrice: 7.98,
    plu: '8119',
    tag: 'Cheese',
    image: 'https://images.pexels.com/photos/28992220/pexels-photo-28992220.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'meat-cheese',
    thicknessOptions: ['Thin', 'Sandwich', 'Thick'],
  },
];

const STORE_PRODUCTS: StoreProduct[] = [...HOT_MEALS_DATA, ...PARTY_TRAY_DATA, ...MEAT_CHEESE_DATA];

const storeCategories = [
  { id: 'hot-meals', label: 'Hot meals' },
  { id: 'party-tray', label: 'Party tray' },
  { id: 'meat-cheese', label: 'Meat and cheese' },
  { id: 'cakes', label: 'Cakes' },
];

// ─── Date Picker ──────────────────────────────────────────────────────────────

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function DatePickerCalendar({
  value,
  onChange,
  label = 'Pickup date *',
}: {
  value: string;
  onChange: (date: string) => void;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const today = new Date();

  // Close when clicking outside the calendar
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const parseDate = (v: string) => {
    const d = new Date(v + 'T00:00:00');
    return isNaN(d.getTime()) ? null : d;
  };

  const selected = parseDate(value);
  const [viewYear, setViewYear] = useState(selected?.getFullYear() ?? today.getFullYear());
  const [viewMonth, setViewMonth] = useState(selected?.getMonth() ?? today.getMonth());

  // Build calendar grid
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  // Pad to complete last row
  while (cells.length % 7 !== 0) cells.push(null);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const selectDay = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    const iso = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    onChange(iso);
    setOpen(false);
  };

  const isSelected = (day: number) =>
    selected?.getFullYear() === viewYear &&
    selected?.getMonth() === viewMonth &&
    selected?.getDate() === day;

  const isToday = (day: number) =>
    today.getFullYear() === viewYear &&
    today.getMonth() === viewMonth &&
    today.getDate() === day;

  const displayValue = selected
    ? selected.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : '';

  return (
    <div className={styles.datePicker} ref={containerRef}>
      <label className={styles.datePicker__label}>{label}</label>
      <button
        type="button"
        className={styles.datePicker__trigger}
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <rect x="1" y="2.5" width="14" height="12.5" rx="2" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M1 6.5h14" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M5 1v3M11 1v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
        <span>{displayValue || 'Select date'}</span>
      </button>

      {open && (
        <div className={styles.datePicker__popover} role="dialog" aria-label="Date picker">
          {/* Header */}
          <div className={styles.datePicker__header}>
            <button type="button" className={styles.datePicker__navBtn} onClick={prevMonth} aria-label="Previous month">
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none"><path d="M7 1L1 7l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <span className={styles.datePicker__monthYear}>{MONTHS[viewMonth]} {viewYear}</span>
            <button type="button" className={styles.datePicker__navBtn} onClick={nextMonth} aria-label="Next month">
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none"><path d="M1 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>

          {/* Day headers */}
          <div className={styles.datePicker__dayHeaders}>
            {DAYS.map(d => <span key={d} className={styles.datePicker__dayName}>{d}</span>)}
          </div>

          {/* Date grid */}
          <div className={styles.datePicker__grid}>
            {cells.map((day, i) => (
              <button
                key={i}
                type="button"
                className={[
                  styles.datePicker__cell,
                  day === null ? styles['datePicker__cell--empty'] : '',
                  day && isSelected(day) ? styles['datePicker__cell--selected'] : '',
                  day && isToday(day) && !isSelected(day) ? styles['datePicker__cell--today'] : '',
                ].join(' ')}
                onClick={() => day && selectDay(day)}
                disabled={!day}
                aria-label={day ? `${MONTHS[viewMonth]} ${day} ${viewYear}` : undefined}
                aria-pressed={day ? isSelected(day) : undefined}
              >
                {day ?? ''}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StoreOrdersPanel({ onSendToKitchen, onGoToStoreOrders }: { onSendToKitchen?: (order: InStoreKitchenOrder) => void; onGoToStoreOrders?: () => void }) {
  const [activeCategory, setActiveCategory] = useState('hot-meals');
  const [cart, setCart] = useState<StoreCartItem[]>([]);
  const [modalProduct, setModalProduct] = useState<StoreProduct | null>(null);
  const [editingCartId, setEditingCartId] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [selections, setSelections] = useState<Record<string, string[]>>({});
  const [targetWeight, setTargetWeight] = useState(0.5);
  const [selectedThickness, setSelectedThickness] = useState<string | null>(null);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);
  const [customerInfo, setCustomerInfo] = useState<StoreCustomerInfo>({
    name: '', phone: '', pickupDate: '', pickupTime: '',
    pickupDay: '', orderDate: '', orderTakenBy: '', instructions: '',
  });

  const todayDate = new Date().toISOString().split('T')[0];
  const filtered = STORE_PRODUCTS.filter(p => p.category === activeCategory);

  // ── Soft keyboard scroll fix (Android Chrome / Elo kiosk) ──
  // When the virtual keyboard appears the visual viewport shrinks.
  // Scroll the currently focused element so it stays above the keyboard.
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const onResize = () => {
      const focused = document.activeElement as HTMLElement | null;
      if (!focused) return;
      const tag = focused.tagName;
      if (tag !== 'TEXTAREA' && tag !== 'INPUT') return;
      // Give the browser a frame to repaint, then scroll into view
      requestAnimationFrame(() => {
        focused.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    };
    vv.addEventListener('resize', onResize);
    return () => vv.removeEventListener('resize', onResize);
  }, []);

  // ── Modal open / pre-fill ──
  const openModal = (product: StoreProduct, cartItem?: StoreCartItem) => {
    setModalProduct(product);
    setEditingCartId(cartItem?.cartId ?? null);
    if (cartItem) {
      setSelectedVariant(cartItem.selectedVariant);
      setSelections(cartItem.selections);
      setTargetWeight(cartItem.targetWeight ?? 0.5);
      setSelectedThickness(cartItem.selectedThickness ?? null);
    } else {
      setSelectedVariant(product.variants?.[0] ?? null);
      setSelections({});
      setTargetWeight(0.5);
      setSelectedThickness(product.thicknessOptions?.[2] ?? null);
    }
  };

  const closeModal = () => {
    setModalProduct(null);
    setEditingCartId(null);
  };

  // ── Selection toggle (single / multi) ──
  const handleSelection = (groupId: string, option: string, type: 'single' | 'multi', max?: number) => {
    setSelections(prev => {
      const current = prev[groupId] ?? [];
      if (type === 'single') return { ...prev, [groupId]: [option] };
      if (current.includes(option)) return { ...prev, [groupId]: current.filter(o => o !== option) };
      if (current.length < (max ?? Infinity)) return { ...prev, [groupId]: [...current, option] };
      return prev;
    });
  };

  // ── Price computation ──
  const computePrice = (): number => {
    if (!modalProduct) return 0;
    if (modalProduct.itemType === 'grab_go') return modalProduct.basePrice;
    if (modalProduct.itemType === 'deli_meat') return modalProduct.basePrice * targetWeight;
    if (modalProduct.itemType === 'bundle') {
      let total = modalProduct.basePrice;
      Object.values(selections).flat().forEach(opt => {
        const m = opt.match(/\(\+\$([\d.]+)\)/);
        if (m) total += parseFloat(m[1]);
      });
      return total;
    }
    return selectedVariant?.price ?? modalProduct.basePrice;
  };

  // ── Config validation ──
  const isConfigValid = (): boolean => {
    if (!modalProduct) return false;
    if (modalProduct.itemType === 'grab_go') return true;
    if (modalProduct.itemType === 'deli_meat') return selectedThickness !== null;
    if (modalProduct.itemType === 'bundle') {
      return (modalProduct.customizations ?? []).every(c => {
        const sel = selections[c.id] ?? [];
        return c.type === 'single' ? sel.length === 1 : sel.length === (c.max ?? 0);
      });
    }
    if (modalProduct.itemType === 'portioned' || modalProduct.itemType === 'party_tray') {
      if (!selectedVariant) return false;
      return (modalProduct.customizations ?? []).every(c => {
        const sel = selections[c.id] ?? [];
        return c.type === 'single' ? sel.length === 1 : sel.length === (c.max ?? 0);
      });
    }
    return false;
  };

  // ── Add / update cart ──
  const confirmAddToCart = () => {
    if (!modalProduct) return;
    const price = computePrice();
    const cartItem: StoreCartItem = {
      cartId: editingCartId ?? `${modalProduct.id}-${Date.now()}`,
      product: modalProduct,
      selectedVariant: selectedVariant,
      qty: editingCartId ? (cart.find(i => i.cartId === editingCartId)?.qty ?? 1) : 1,
      selections,
      targetWeight: modalProduct.itemType === 'deli_meat' ? targetWeight : undefined,
      selectedThickness: modalProduct.itemType === 'deli_meat' ? (selectedThickness ?? undefined) : undefined,
      price,
    };
    if (editingCartId) {
      setCart(prev => prev.map(i => i.cartId === editingCartId ? cartItem : i));
    } else {
      setCart(prev => [...prev, cartItem]);
    }
    closeModal();
  };

  // ── Instant add for Grab & Go ──
  const addGrabGoToCart = (product: StoreProduct) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, {
        cartId: `${product.id}-${Date.now()}`,
        product,
        selectedVariant: null,
        qty: 1,
        selections: {},
        price: product.basePrice,
      }];
    });
  };

  // ── Cart management ──
  const updateQty = (cartId: string, count: number) => {
    if (count === 0) {
      setCart(prev => prev.filter(i => i.cartId !== cartId));
    } else {
      setCart(prev => prev.map(i => i.cartId === cartId ? { ...i, qty: count } : i));
    }
  };

  const removeFromCart = (cartId: string) => setCart(prev => prev.filter(i => i.cartId !== cartId));

  const editCartItem = (cartItem: StoreCartItem) => openModal(cartItem.product, cartItem);

  // ── Category mode ──
  const isPartyTray = activeCategory === 'party-tray';

  // ── Form validation ──
  const isFormValid = (): boolean => {
    if (cart.length === 0) return false;
    if (isPartyTray) {
      return (
        customerInfo.name.trim() !== '' &&
        customerInfo.phone.trim() !== '' &&
        customerInfo.pickupDate !== '' &&
        customerInfo.orderTakenBy !== ''
      );
    }
    // Hot meals / Meat & Cheese / Cakes — only name required
    return customerInfo.name.trim() !== '';
  };

  // ── Submit + reset ──
  const submitOrder = () => setOrderSuccess(`OSN ${Math.floor(1000 + Math.random() * 9000)}`);
  const sendToKitchen = () => {
    const osn = `OSN ${Math.floor(1000 + Math.random() * 9000)}`;
    const isScheduled = !!customerInfo.pickupDate;
    onSendToKitchen?.({
      osn,
      customerName: customerInfo.name.trim() || 'Walk-up Customer',
      instructions: customerInfo.instructions.trim() || undefined,
      pickupDate: customerInfo.pickupDate || undefined,
      pickupTime: customerInfo.pickupTime || undefined,
      isScheduled,
      placedTime: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      items: cart.map(item => ({
        name: `${item.product.name}${item.selectedVariant ? ` — ${item.selectedVariant.label}` : ''}`,
        qty: item.qty.toString(),
        image: item.product.image,
        isMain: item === cart[0],
      })),
    });
    setOrderSuccess(osn);
  };
  const printLabel = () => setOrderSuccess(`OSN ${Math.floor(1000 + Math.random() * 9000)}`);
  const resetFlow = () => {
    setCart([]);
    setCustomerInfo({ name: '', phone: '', pickupDate: '', pickupTime: '', pickupDay: '', orderDate: '', orderTakenBy: '', instructions: '' });
    setOrderSuccess(null);
    onGoToStoreOrders?.();
  };

  // ── Cart label helpers ──
  const getCartItemLabel = (item: StoreCartItem): string => {
    if (item.product.itemType === 'deli_meat') {
      return `${item.targetWeight?.toFixed(2)} lb — ${item.selectedThickness}`;
    }
    if (item.selectedVariant) return item.selectedVariant.label;
    return 'Each';
  };

  const getCartItemPlu = (item: StoreCartItem): string => {
    if (item.product.itemType === 'deli_meat') return item.product.plu ?? '';
    return item.selectedVariant?.plu ?? item.product.plu ?? '';
  };

  return (
    <div className={styles.storeLayout}>

      {/* ── Left: Product Catalog ── */}
      <div className={styles.storeCatalog}>
        <div className={styles.filterBar}>
          {storeCategories.map(cat => (
            <FilterChip
              key={cat.id}
              selected={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </FilterChip>
          ))}
        </div>

        <div className={styles.productList}>
          {filtered.length === 0 && (
            <div className={styles.catalogEmpty}>
              <p className={styles.catalogEmpty__text}>No items available in this category</p>
            </div>
          )}

          {filtered.map(product => (
            <div
              key={product.id}
              className={styles.productCard}
              onClick={() => product.itemType === 'grab_go' ? addGrabGoToCart(product) : openModal(product)}
              role="button"
              tabIndex={0}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); product.itemType === 'grab_go' ? addGrabGoToCart(product) : openModal(product); } }}
            >
              {/* Notice badge centered above image */}
              {product.notice && (
                <div className={styles.productCard__noticeBanner}>{product.notice}</div>
              )}
              <div className={styles.productCard__imageWrap}>
                <img src={product.image} alt={product.name} className={styles.productCard__image} />
              </div>
              <div className={styles.productCard__body}>
                <h3 className={styles.productCard__name}>{product.name}</h3>
                {product.description && (
                  <p className={styles.productCard__desc}>{product.description}</p>
                )}
                <p className={styles.productCard__price}>
                  {product.priceDisplay ? (
                    <strong>{product.priceDisplay}</strong>
                  ) : product.itemType === 'deli_meat' ? (
                    <>Starting at <strong>${product.basePrice.toFixed(2)} / lb</strong></>
                  ) : product.itemType === 'grab_go' ? (
                    <strong>${product.basePrice.toFixed(2)}/ea</strong>
                  ) : (
                    <>Starting at <strong>${product.basePrice.toFixed(2)}/ea</strong></>
                  )}
                </p>
              </div>
              <div className={styles.productCard__footer}>
                <div className={styles.productCard__divider} />
                {product.itemType === 'grab_go' ? (
                  <Button variant="secondary" size="small" isFullWidth onClick={e => { e.stopPropagation(); addGrabGoToCart(product); }}>
                    Add to order
                  </Button>
                ) : (
                  <Button variant="secondary" size="small" isFullWidth onClick={e => { e.stopPropagation(); openModal(product); }}>
                    Configure and add
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right: Order Form ── */}
      <div className={styles.cartPanel}>
        <div className={styles.cartPanel__header}>
          <h2 className={styles.cartPanel__title}>Order summary</h2>
          {cart.length > 0 && (
            <span className={styles.cartPanel__count}>{cart.length} item{cart.length !== 1 ? 's' : ''}</span>
          )}
        </div>

        <div className={styles.orderFormScroll}>
          {/* Show prompt when cart is empty, form when items added */}
          {cart.length === 0 ? (
            <div className={styles.cartPanel__empty}>
              <div className={styles.cartPanel__emptyIcon}>
                <img src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F1638723c5c8a4080b5bcac1c73c2c038" alt="" aria-hidden="true" width="48" height="48" />
              </div>
              <p className={styles.cartPanel__emptyText}>No items added yet</p>
              <p className={styles.cartPanel__emptyHint}>Add items from the catalog to start an order</p>
            </div>
          ) : (
          <>
          {/* Items ordered — top of form */}
          <div className={styles.cartPanel__subHeader}>
            <Heading as="span" size="small" color="subtle">Items ordered</Heading>
          </div>

            <div className={styles.cartItems}>
              {cart.map(item => (
                <div key={item.cartId} className={styles.cartItem}>
                  <div className={styles.cartItem__main}>
                    <img src={item.product.image} alt={item.product.name} className={styles.cartItem__image} />
                    <div className={styles.cartItem__content}>
                      <div className={styles.cartItem__name}>{item.product.name}</div>
                      <div className={styles.cartItem__priceEach}>${item.price.toFixed(2)}/each</div>
                      {getCartItemLabel(item) && (
                        <div className={styles.cartItem__variant}>{getCartItemLabel(item)}</div>
                      )}
                      {getCartItemPlu(item) && (
                        <div className={styles.cartItem__pluRow}>PLU {getCartItemPlu(item)}</div>
                      )}
                    </div>
                    <div className={styles.cartItem__actions}>
                      <IconButton
                        size="small"
                        variant="ghost"
                        aria-label={`Edit ${item.product.name}`}
                        onClick={() => editCartItem(item)}
                      >
                        <Pencil width={16} height={16} />
                      </IconButton>
                      <IconButton
                        size="small"
                        variant="ghost"
                        aria-label={`Remove ${item.product.name}`}
                        onClick={() => removeFromCart(item.cartId)}
                      >
                        <Trash width={16} height={16} />
                      </IconButton>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          <div className={styles.divider} />

          {/* Customer info */}
          <div className={styles.customerInfo}>
            <Heading as="p" size="small" color="default">Customer details</Heading>

            {isPartyTray ? (
              // ── Party Tray: full form ──
              <>
                <div className={styles.customerInfo__grid}>
                  <TextField
                    label="Customer name *"
                    placeholder="Full name"
                    value={customerInfo.name}
                    onChange={e => setCustomerInfo(i => ({ ...i, name: e.target.value }))}
                    size="large"
                    inputProps={{
                      inputMode: 'text',
                      autoCapitalize: 'words',
                      autoComplete: 'name',
                      onFocus: e => e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest' }),
                    }}
                  />
                  <TextField
                    label="Phone *"
                    placeholder="000-000-0000"
                    type="tel"
                    value={customerInfo.phone}
                    onChange={e => setCustomerInfo(i => ({ ...i, phone: e.target.value }))}
                    size="large"
                    inputProps={{
                      inputMode: 'tel',
                      autoComplete: 'tel',
                      onFocus: e => e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest' }),
                    }}
                  />
                </div>

                <div className={styles.customerInfo__grid}>
                  <DatePickerCalendar
                    label="Pickup date *"
                    value={customerInfo.pickupDate}
                    onChange={date => setCustomerInfo(i => ({ ...i, pickupDate: date }))}
                  />
                  <div className={styles.formField}>
                    <Select
                      label="Order taken by *"
                      value={customerInfo.orderTakenBy}
                      onValueChange={v => setCustomerInfo(i => ({ ...i, orderTakenBy: v }))}
                      placeholder="Select associate..."
                      size="large"
                    >
                      {DELI_ASSOCIATES.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                    </Select>
                  </div>
                </div>

                <div className={styles.formField}>
                  <TextArea
                    label="Special instructions"
                    placeholder="Enter special instructions here"
                    value={customerInfo.instructions}
                    onChange={e => setCustomerInfo(i => ({ ...i, instructions: e.target.value }))}
                    size="large"
                    textAreaProps={{
                      onFocus: e => {
                        const el = e.currentTarget;
                        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 350);
                      },
                    }}
                  />
                </div>
              </>
            ) : (
              // ── Hot Meals / Meat & Cheese / Cakes: simplified form ──
              <>
                <TextField
                  label="Customer name *"
                  placeholder="Full name"
                  value={customerInfo.name}
                  onChange={e => setCustomerInfo(i => ({ ...i, name: e.target.value }))}
                  size="large"
                  inputProps={{
                    inputMode: 'text',
                    autoCapitalize: 'words',
                    autoComplete: 'name',
                    onFocus: e => e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest' }),
                  }}
                />

                <div className={styles.formField}>
                  <TextArea
                    label="Special instructions"
                    placeholder="Any special instructions for the kitchen?"
                    value={customerInfo.instructions}
                    onChange={e => setCustomerInfo(i => ({ ...i, instructions: e.target.value }))}
                    size="large"
                    textAreaProps={{
                      onFocus: e => {
                        const el = e.currentTarget;
                        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 350);
                      },
                    }}
                  />
                </div>

                <Alert variant="info">
                  Customer pays at the checkout near the exit
                </Alert>
              </>
            )}
          </div>
          </>
          )}
        </div>

        {cart.length > 0 && (
          <div className={styles.cartPanel__footer}>
            <div className={styles.divider} />
            {isPartyTray ? (
              <Button variant="primary" size="small" isFullWidth disabled={!isFormValid()} onClick={submitOrder}>
                Place order
              </Button>
            ) : (
              <div className={styles.quickOrderActions}>
                <Button variant="secondary" size="small" isFullWidth disabled={!isFormValid()} onClick={sendToKitchen}>
                  Send to kitchen
                </Button>
                <Button variant="primary" size="small" isFullWidth disabled={!isFormValid()} onClick={printLabel}>
                  Print label
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Configurator Modal ── */}
      <Modal open={modalProduct !== null} onOpenChange={open => !open && closeModal()}>
        <ModalContent size="large" hideClose>
          <div className={styles.modalHeaderRow}>
            <ModalTitle>
              {modalProduct?.name}
            </ModalTitle>
            <ModalClose asChild>
              <button type="button" className={styles.modalCloseBtn} aria-label="Close">
                <X width={20} height={20} />
              </button>
            </ModalClose>
          </div>

          <div className={styles.modalBody}>
            {/* ── Deli Meat: Thickness + Weight ── */}
            {modalProduct?.itemType === 'deli_meat' && (
              <>
                <div className={styles.modalStep}>
                  <div className={styles.modalStep__header}>
                    <span className={styles.modalStep__label}>Select Thickness</span>
                  </div>
                  <div className={styles.sizeGrid}>
                    {modalProduct.thicknessOptions?.map(opt => (
                      <button
                        key={opt}
                        type="button"
                        className={[styles.sizeCard, selectedThickness === opt && styles['sizeCard--active']].filter(Boolean).join(' ')}
                        onClick={() => setSelectedThickness(opt)}
                      >
                        <span className={styles.sizeCard__label}>{opt}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.modalStep}>
                  <div className={styles.modalStep__header}>
                    <span className={styles.modalStep__label}>Target Weight</span>
                  </div>
                  <div className={styles.weightRow}>
                    <div className={styles.weightStepper}>
                      <button
                        type="button"
                        className={styles.weightBtn}
                        onClick={() => setTargetWeight(w => Math.max(0.25, parseFloat((w - 0.25).toFixed(2))))}
                        aria-label="Decrease weight"
                      >
                        <Minus width={16} height={16} />
                      </button>
                      <span className={styles.weightValue}>{targetWeight.toFixed(2)} <span className={styles.weightUnit}>lb</span></span>
                      <button
                        type="button"
                        className={styles.weightBtn}
                        onClick={() => setTargetWeight(w => parseFloat((w + 0.25).toFixed(2)))}
                        aria-label="Increase weight"
                      >
                        <Plus width={16} height={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* ── Portioned: Size selection ── */}
            {modalProduct?.itemType === 'portioned' && (
              <div className={styles.modalStep}>
                <div className={styles.modalStep__header}>
                  <span className={styles.modalStep__label}>Select size</span>
                </div>
                <div className={styles.sizeGrid}>
                  {modalProduct.variants?.map(v => (
                    <button
                      key={v.id}
                      type="button"
                      className={[styles.sizeCard, selectedVariant?.id === v.id && styles['sizeCard--active']].filter(Boolean).join(' ')}
                      onClick={() => setSelectedVariant(v)}
                    >
                      <span className={styles.sizeCard__label}>{v.label}</span>
                      <span className={styles.sizeCard__sub}>${v.price.toFixed(2)}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── Party Tray: Size + Customizations ── */}
            {modalProduct?.itemType === 'party_tray' && (
              <>
                {modalProduct.variants && modalProduct.variants.length > 0 && (
                  <div className={styles.modalStep}>
                    <div className={styles.modalStep__header}>
                      <span className={styles.modalStep__label}>Select size</span>
                    </div>
                    <div className={styles.sizeGrid}>
                      {modalProduct.variants.map(v => (
                        <button
                          key={v.id}
                          type="button"
                          className={[styles.sizeCard, selectedVariant?.id === v.id && styles['sizeCard--active']].filter(Boolean).join(' ')}
                          onClick={() => setSelectedVariant(v)}
                        >
                          <span className={styles.sizeCard__label}>{v.label}</span>
                          {v.includes && <span className={styles.sizeCard__includes}>{v.includes}</span>}
                          <span className={styles.sizeCard__sub}>${v.price.toFixed(2)} each</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {(modalProduct.customizations ?? []).map((customization) => {
                  const selectedOpts = selections[customization.id] ?? [];
                  const isSatisfied = customization.type === 'single'
                    ? selectedOpts.length === 1
                    : selectedOpts.length === (customization.max ?? 0);
                  return (
                    <div key={customization.id} className={styles.modalStep}>
                      <div className={styles.modalStep__header}>
                        <span className={styles.modalStep__label}>{customization.title}</span>
                      </div>
                      <div className={styles.optionsWrap}>
                        {customization.options.map(option => {
                          const label = getOptionLabel(option);
                          const isSelected = selectedOpts.includes(label);
                          const isDisabled = !isSelected && customization.type === 'multi' && selectedOpts.length >= (customization.max ?? 0);
                          return (
                            <button
                              key={label}
                              type="button"
                              disabled={isDisabled}
                              className={[
                                styles.optionChip,
                                isSelected && styles['optionChip--active'],
                                isDisabled && styles['optionChip--disabled'],
                              ].filter(Boolean).join(' ')}
                              onClick={() => handleSelection(customization.id, label, customization.type, customization.max)}
                            >
                              {label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </>
            )}

            {/* ── Bundle: Entree as cards, sides as chips ── */}
            {modalProduct?.itemType === 'bundle' && (
              <>
                {(modalProduct.customizations ?? []).map((customization, custIdx) => {
                  const selectedOpts = selections[customization.id] ?? [];
                  const isSatisfied = customization.type === 'single'
                    ? selectedOpts.length === 1
                    : selectedOpts.length === (customization.max ?? 0);
                  const isEntreeStep = custIdx === 0;
                  return (
                    <div key={customization.id} className={styles.modalStep}>
                      <div className={styles.modalStep__header}>
                        <span className={styles.modalStep__label}>{customization.title}</span>
                      </div>
                      {isEntreeStep ? (
                        <div className={styles.sizeGrid}>
                          {customization.options.map(option => {
                            const label = getOptionLabel(option);
                            const description = typeof option === 'object' ? option.description : undefined;
                            const isSelected = selectedOpts.includes(label);
                            return (
                              <button
                                key={label}
                                type="button"
                                className={[styles.sizeCard, isSelected && styles['sizeCard--active']].filter(Boolean).join(' ')}
                                onClick={() => handleSelection(customization.id, label, customization.type, customization.max)}
                              >
                                <span className={styles.sizeCard__label}>{label}</span>
                                {description && <span className={styles.sizeCard__description}>{description}</span>}
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <div className={styles.optionsWrap}>
                          {customization.options.map(option => {
                            const label = getOptionLabel(option);
                            const isSelected = selectedOpts.includes(label);
                            const isDisabled = !isSelected && customization.type === 'multi' && selectedOpts.length >= (customization.max ?? 0);
                            return (
                              <button
                                key={label}
                                type="button"
                                disabled={isDisabled}
                                className={[
                                  styles.optionChip,
                                  isSelected && styles['optionChip--active'],
                                  isDisabled && styles['optionChip--disabled'],
                                ].filter(Boolean).join(' ')}
                                onClick={() => handleSelection(customization.id, label, customization.type, customization.max)}
                              >
                                {label}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </>
            )}
          </div>

          <ModalFooter className={styles.modalFooterRow}>
            <div className={styles.modalFooter__price}>
              ${computePrice().toFixed(2)} <span className={styles.modalFooter__priceUnit}>each</span>
            </div>
            <Button
              variant="primary"
              size="medium"
              disabled={!isConfigValid()}
              onClick={confirmAddToCart}
            >
              {editingCartId ? 'Update item' : 'Add to cart'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* ── Success Overlay ── */}
      <Modal open={orderSuccess !== null} onOpenChange={open => !open && resetFlow()}>
        <ModalContent size="small" hideClose>
          <div className={styles.successCard}>
            <div className={styles.successIcon}>
              <CheckCircleFill width={40} height={40} />
            </div>
            <h2 className={styles.successCard__title}>Order Saved!</h2>
            <p className={styles.successCard__subtitle}>The order has been added to the Production Plan.</p>
            <div className={styles.successOSN}>
              <span className={styles.successOSN__label}>Order Number</span>
              <span className={styles.successOSN__value}>{orderSuccess}</span>
            </div>
            <Button variant="primary" size="medium" isFullWidth onClick={resetFlow}>
              Got it
            </Button>
          </div>
        </ModalContent>
      </Modal>

    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function Home() {
  const [activeTab, setActiveTab] = useState('deli-and-meat');
  const [inStoreKitchenOrders, setInStoreKitchenOrders] = useState<InStoreKitchenOrder[]>(DEMO_INSTORE_ORDERS);
  const [scheduledOrders, setScheduledOrders] = useState<InStoreKitchenOrder[]>(DEMO_SCHEDULED_ORDERS);
  const [expressOrders, setExpressOrders] = useState<StoreOrder[]>(INITIAL_EXPRESS_ORDERS);
  const [newOrderOsn, setNewOrderOsn] = useState<string | null>(null);
  const incomingPoolIndexRef = useRef(0);

  // Simulate incoming express orders — ~2 per 5 min = 1 every 150 seconds.
  // For demo visibility the first one arrives after 30 s, then every 150 s.
  useEffect(() => {
    const scheduleNext = (delay: number) => {
      return setTimeout(() => {
        const pool = INCOMING_ORDER_POOL;
        const next = pool[incomingPoolIndexRef.current % pool.length];
        incomingPoolIndexRef.current += 1;
        // Stamp a fresh timer so it counts down from "now"
        const incoming: StoreOrder = { ...next, initialSeconds: 300 };
        setExpressOrders(prev => [incoming, ...prev]);
        setNewOrderOsn(incoming.osn);
        // Clear the "new" highlight after 8 seconds
        setTimeout(() => setNewOrderOsn(null), 8000);
        // Schedule the next one
        timerRef.current = scheduleNext(150_000);
      }, delay);
    };

    const timerRef = { current: scheduleNext(30_000) };
    return () => clearTimeout(timerRef.current);
  }, []);

  // Scroll focused input/textarea into view when the soft keyboard opens.
  // Uses visualViewport resize (most reliable on Android Chrome kiosk devices).
  useEffect(() => {
    const scrollFocusedIntoView = () => {
      const el = document.activeElement as HTMLElement | null;
      if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT')) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    };

    // visualViewport fires when the keyboard resizes the visual area
    const vv = window.visualViewport;
    if (vv) {
      vv.addEventListener('resize', scrollFocusedIntoView);
    }

    // Also handle focus directly for devices where visualViewport doesn't fire
    const handleFocus = (e: FocusEvent) => {
      const el = e.target as HTMLElement;
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT') {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 400);
      }
    };
    document.addEventListener('focusin', handleFocus);

    return () => {
      if (vv) vv.removeEventListener('resize', scrollFocusedIntoView);
      document.removeEventListener('focusin', handleFocus);
    };
  }, []);

  const handleSendToKitchen = (order: InStoreKitchenOrder) => {
    if (order.isScheduled) {
      setScheduledOrders(prev => [order, ...prev]);
    } else {
      setInStoreKitchenOrders(prev => [order, ...prev]);
    }
  };

  return (
    <div className={styles.page}>
      <AppHeader />

      <div className={styles.stickyNav}>
        {/* Tab Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} UNSAFE_className={styles.tabsWrapper}>
          <TabList>
            <Tab
              value="deli-and-meat"
              leading={<Truck />}
              trailing={<Badge value={expressOrders.length + onlineOrders.length + inStoreKitchenOrders.length + productionItems.length} size="small" />}
            >
              Deli and meat
            </Tab>
            <Tab
              value="bakery"
              leading={<Receipt />}
              trailing={<Badge value={2} size="small" />}
            >
              Bakery
            </Tab>
            <Tab value="cakes" trailing={<Badge value={0} size="small" />}>
              Cakes
            </Tab>
            <Tab value="produce" trailing={<Badge value={0} size="small" />}>
              Produce
            </Tab>
            <Tab value="store-orders">Store orders</Tab>
          </TabList>

          {/* Metrics Summary — hidden on Store orders tab */}
          {activeTab !== 'store-orders' && <MetricsSummary />}

          {/* Main content panel */}
          <TabPanel value="deli-and-meat" UNSAFE_className={styles.tabPanel}>
            <div className={styles.contentGrid}>
              {/* Column 1: All orders (Express + Online) */}
              <section className={styles.column}>
                <div className={styles.column__header}>
                  <h2 className={styles.column__title}>
                    Express and online orders
                    <span className={styles.column__count}>({expressOrders.length + onlineOrders.length + inStoreKitchenOrders.length})</span>
                  </h2>
                </div>
                <div className={styles.column__body}>
                  {inStoreKitchenOrders.map((order, idx) => (
                    <InStoreOrderCard key={`instore-${idx}`} order={order} />
                  ))}
                  {expressOrders.map((order, idx) => (
                    <div
                      key={`express-${order.osn}-${idx}`}
                      className={newOrderOsn === order.osn ? styles.orderCard__new : undefined}
                    >
                      <ExpressOrderCard order={order} />
                    </div>
                  ))}
                  {onlineOrders.map((order, idx) => (
                    <OnlineOrderCard key={`online-${idx}`} order={order} />
                  ))}
                </div>
              </section>

              <div className={styles.column__divider} />

              {/* Column 2: Today's production plan + scheduled orders */}
              <section className={styles.column}>
                <div className={styles.column__header}>
                  <h2 className={styles.column__title}>
                    Today's production plan
                    <span className={styles.column__count}>({productionItems.length})</span>
                  </h2>
                </div>
                <div className={styles.column__body}>
                  {productionItems.map((item, idx) => (
                    <ProductionCard key={idx} item={item} />
                  ))}

                  {scheduledOrders.length > 0 && (
                    <>
                      <div className={styles.scheduledSection__header}>
                        <span className={styles.scheduledSection__icon}>📅</span>
                        <h3 className={styles.scheduledSection__title}>Scheduled orders</h3>
                        <span className={styles.column__count}>({scheduledOrders.length})</span>
                      </div>
                      {scheduledOrders.map((order, idx) => (
                        <ScheduledOrderCard key={`sched-${idx}`} order={order} />
                      ))}
                    </>
                  )}
                </div>
              </section>
            </div>
          </TabPanel>

          <TabPanel value="bakery">
            <div className={styles.emptyState}>No items for Bakery</div>
          </TabPanel>
          <TabPanel value="cakes">
            <div className={styles.emptyState}>No items for Cakes</div>
          </TabPanel>
          <TabPanel value="produce">
            <div className={styles.emptyState}>No items for Produce</div>
          </TabPanel>
          <TabPanel value="store-orders" UNSAFE_className={styles.storeOrdersPanel}>
            <StoreOrdersPanel onSendToKitchen={handleSendToKitchen} onGoToStoreOrders={() => setActiveTab('store-orders')} />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}
