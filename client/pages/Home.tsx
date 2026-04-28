import { useState, useEffect, useRef, useCallback } from 'react';
import { Tabs, TabList, Tab, TabPanel } from '@/components/ui/Tab';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Metric } from '@/components/ui/Metric';
import { Menu, Chat, Truck, Receipt, ArrowUp, ArrowDown } from '@/components/icons';
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

// ─── Data ─────────────────────────────────────────────────────────────────────

const expressOrders: StoreOrder[] = [
  {
    osn: 'OSN 7284',
    isExpress: true,
    initialSeconds: 480,
    items: [
      {
        name: 'Buffalo Chicken Wings, 6 Count',
        plu: '6870',
        image: 'https://api.builder.io/api/v1/image/assets/TEMP/0fb38ded214e7747a9e4040154af5afa019ad2fa?width=128',
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

const productionItems: ProductionItem[] = [
  {
    name: 'Ready to eat potato',
    upc: '1234567890',
    pluOrItemNumber: '62886',
    pluOrItemNumberLabel: 'PLU',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/0fb38ded214e7747a9e4040154af5afa019ad2fa?width=128',
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
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/37f55abb4162c27ee5fec83f02105569a3b30715?width=128',
    plan: 8,
    onHand: 0,
    makeNow: 8,
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
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/37f55abb4162c27ee5fec83f02105569a3b30715?width=128',
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
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/4e964bed0619d2365b794f27970d38864cef87e9?width=128',
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
    formatted;

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
  return (
    <header className={styles.appHeader}>
      <div className={styles.appHeader__left}>
        <button className={styles.iconBtn} aria-label="Open menu">
          <Menu />
        </button>
        <h1 className={styles.appHeader__title}>Today's Plan</h1>
      </div>
      <div className={styles.appHeader__right}>
        <button className={styles.iconBtn} aria-label="Open chat">
          <Chat />
        </button>
        <div className={styles.avatar}>
          <div className={styles.avatar__initials}>AC</div>
          <div className={styles.avatar__clock}>
            <ClockStatusDot />
          </div>
        </div>
      </div>
    </header>
  );
}

function MetricsSummary() {
  return (
    <div className={styles.metrics}>
      <div className={styles.metric}>
        <div className={styles.metric__value}>52.3<span className={styles.metric__unit}>k</span></div>
        <div className={styles.metric__label}>Store sales</div>
        <div className={styles.metric__trend + ' ' + styles['metric__trend--positive']}>
          <ArrowUp />
          <span>4.5%</span>
        </div>
      </div>
      <div className={styles.metric__divider} aria-hidden="true" />
      <div className={styles.metric}>
        <div className={styles.metric__value}>97.3<span className={styles.metric__unit}>%</span></div>
        <div className={styles.metric__label}>FTPR</div>
        <div className={styles.metric__trend + ' ' + styles['metric__trend--positive']}>
          <ArrowUp />
          <span>2.2%</span>
        </div>
      </div>
      <div className={styles.metric__divider} aria-hidden="true" />
      <div className={styles.metric}>
        <div className={styles.metric__value}>17</div>
        <div className={styles.metric__label}>Nil picks</div>
        <div className={styles.metric__trend + ' ' + styles['metric__trend--positive']}>
          <ArrowDown />
          <span>28</span>
        </div>
      </div>
      <div className={styles.metric__divider} aria-hidden="true" />
      <div className={styles.metric}>
        <div className={styles.metric__value}>51</div>
        <div className={styles.metric__label}>Orders today</div>
        <div className={styles.metric__trend + ' ' + styles['metric__trend--neutral']}>
          <span>Spark + Walk-up</span>
        </div>
      </div>
      <div className={styles.metric__divider} aria-hidden="true" />
      <div className={styles.metric}>
        <div className={styles.metric__value}><span className={styles.metric__unit}>$</span>97.70</div>
        <div className={styles.metric__label}>Waste</div>
        <div className={styles.metric__trend + ' ' + styles['metric__trend--positive']}>
          <ArrowDown />
          <span>28</span>
        </div>
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
        <div className={styles.orderDetails__colDivider} />
        <div className={styles.orderDetails__col}>
          <div className={styles.attrLabel}>&nbsp;</div>
          <div className={styles.attrValue}>{item.thickness ?? '-'}</div>
        </div>
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
  const [orderLabelUnlocked, setOrderLabelUnlocked] = useState(false);
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
          {order.isExpress && <ExpressTag initialSeconds={order.initialSeconds} />}
        </div>
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
        {!orderLabelUnlocked && (
          <p className={styles.unlockText}>Weigh 1 item to unlock</p>
        )}
        <div className={styles.scanActions__btn}>
          <Button
            variant="secondary"
            size="small"
            isFullWidth
            disabled={!orderLabelUnlocked}
          >
            Print order label
          </Button>
        </div>
      </div>
    </div>
  );
}

function ProductionCard({ item }: { item: ProductionItem }) {
  return (
    <div className={styles.card}>
      <div className={styles.productionCard__top}>
        <img
          src={item.image}
          alt={item.name}
          className={styles.productionCard__image}
        />
        <div className={styles.productionCard__info}>
          <div className={styles.productionCard__name}>{item.name}</div>
          {item.price && <div className={styles.productionCard__price}>{item.price}</div>}
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
        <Button variant="secondary" size="small" isFullWidth>Get started</Button>
      </div>
    </div>
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

function OnlineOrderCard({ order }: { order: OnlineOrder }) {
  const { secondsLeft } = useCountdownTimer(order.initialSeconds, ONLINE_THRESHOLDS);
  const isSurfaced = secondsLeft <= ONLINE_THRESHOLDS.warning; // within 30 min

  return (
    <div className={[styles.card, isSurfaced && styles['card--surfaced']].filter(Boolean).join(' ')}>
      {isSurfaced && <PickupSoonBanner pickupTime={order.pickupTime} />}
      <div className={styles.card__header}>
        <div className={styles.orderHeader}>
          <span className={styles.orderHeader__osn}>{order.osn}</span>
          <CountdownTimer initialSeconds={order.initialSeconds} thresholds={ONLINE_THRESHOLDS} />
        </div>
        <div className={styles.orderHeader__pickup}>
          <span className={styles.attrLabel}>Pickup</span>
          <span className={styles.attrValue}>{order.pickupTime}</span>
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

interface StoreProduct {
  id: string;
  name: string;
  description: string;
  startingPrice: string;
  image: string;
  category: string;
  notice?: string;
}

interface CartItem {
  product: StoreProduct;
  qty: number;
}

const storeProducts: StoreProduct[] = [
  {
    id: 'fried-chicken',
    name: 'Fried chicken tray',
    description: 'Freshly fried chicken pieces. Breasts wings legs and thighs',
    startingPrice: '$58.00',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/0fb38ded214e7747a9e4040154af5afa019ad2fa?width=400',
    category: 'hot-foods',
    notice: '24 hour notice',
  },
  {
    id: 'sub-sandwich',
    name: 'Sub sandwich party tray',
    description: 'Includes Honey Ham, Oven Roasted Turkey, and Roast Beef.',
    startingPrice: '$126.00',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/37f55abb4162c27ee5fec83f02105569a3b30715?width=400',
    category: 'meat-cheese',
    notice: '24 hour notice',
  },
  {
    id: 'chicken-combo',
    name: 'Chicken combo tray',
    description: 'Chicken Tenders, Bone-In Wings, and Boneless Wings.',
    startingPrice: '$45.00',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/4e964bed0619d2365b794f27970d38864cef87e9?width=400',
    category: 'party-tray',
    notice: '24 hour notice',
  },
];

const storeCategories = [
  { id: 'hot-foods', label: 'Hot foods' },
  { id: 'meat-cheese', label: 'Meat and cheese' },
  { id: 'party-tray', label: 'Party tray' },
  { id: 'cakes-store', label: 'Cakes' },
];

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 4h12M5 4V2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5V4M6 7v5M10 7v5M3 4l1 9.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5L13 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StoreOrdersPanel() {
  const [activeCategory, setActiveCategory] = useState('party-tray');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [configuringId, setConfiguringId] = useState<string | null>(null);
  const [pendingQty, setPendingQty] = useState(1);

  const filtered = storeProducts.filter(p => p.category === activeCategory);

  const handleConfigureClick = (product: StoreProduct) => {
    setConfiguringId(product.id);
    setPendingQty(1);
  };

  const handleAddToCart = (product: StoreProduct) => {
    setCart(prev => {
      const existing = prev.find(c => c.product.id === product.id);
      if (existing) {
        return prev.map(c => c.product.id === product.id ? { ...c, qty: c.qty + pendingQty } : c);
      }
      return [...prev, { product, qty: pendingQty }];
    });
    setConfiguringId(null);
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(prev => prev.filter(c => c.product.id !== id));
  };

  const cartTotal = cart.reduce((sum, c) => {
    const price = parseFloat(c.product.startingPrice.replace('$', ''));
    return sum + price * c.qty;
  }, 0);

  return (
    <div className={styles.storeLayout}>
      {/* ── Left: Product Catalog ── */}
      <div className={styles.storeCatalog}>
        {/* Filter chips */}
        <div className={styles.filterBar}>
          {storeCategories.map(cat => (
            <button
              key={cat.id}
              type="button"
              className={[
                styles.filterChip,
                activeCategory === cat.id && styles['filterChip--active'],
              ].filter(Boolean).join(' ')}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product cards */}
        <div className={styles.productGrid}>
          {filtered.length > 0 ? filtered.map(product => (
            <div key={product.id} className={styles.productCard}>
              {product.notice && (
                <div className={styles.productCard__notice}>{product.notice}</div>
              )}
              <img
                src={product.image}
                alt={product.name}
                className={styles.productCard__image}
              />
              <div className={styles.productCard__body}>
                <h3 className={styles.productCard__name}>{product.name}</h3>
                <p className={styles.productCard__desc}>{product.description}</p>
                <p className={styles.productCard__price}>
                  Starting at <strong>{product.startingPrice} ea</strong>
                </p>

                {configuringId === product.id ? (
                  <div className={styles.productCard__configure}>
                    <div className={styles.qtyRow}>
                      <span className={styles.qtyLabel}>Qty</span>
                      <div className={styles.qtyStepper}>
                        <button
                          type="button"
                          className={styles.qtyBtn}
                          onClick={() => setPendingQty(q => Math.max(1, q - 1))}
                          aria-label="Decrease quantity"
                        >−</button>
                        <span className={styles.qtyValue}>{pendingQty}</span>
                        <button
                          type="button"
                          className={styles.qtyBtn}
                          onClick={() => setPendingQty(q => q + 1)}
                          aria-label="Increase quantity"
                        >+</button>
                      </div>
                    </div>
                    <div className={styles.configureActions}>
                      <Button variant="secondary" size="small" onClick={() => setConfiguringId(null)}>
                        Cancel
                      </Button>
                      <Button variant="primary" size="small" isFullWidth onClick={() => handleAddToCart(product)}>
                        Add to order
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    variant="secondary"
                    size="small"
                    isFullWidth
                    onClick={() => handleConfigureClick(product)}
                  >
                    Configure and add
                  </Button>
                )}
              </div>
            </div>
          )) : (
            <div className={styles.emptyState}>No items in this category</div>
          )}
        </div>
      </div>

      {/* ── Right: Cart / Order Summary ── */}
      <div className={styles.cartPanel}>
        <div className={styles.cartPanel__header}>
          <h2 className={styles.cartPanel__title}>Order summary</h2>
          {cart.length > 0 && (
            <span className={styles.cartPanel__count}>{cart.length} item{cart.length !== 1 ? 's' : ''}</span>
          )}
        </div>

        {cart.length === 0 ? (
          <div className={styles.cartPanel__empty}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
              <circle cx="24" cy="24" r="23" stroke="var(--ld-semantic-color-separator,#e3e4e5)" strokeWidth="2" />
              <path d="M14 18h20l-2.5 12H16.5L14 18Z" stroke="var(--ld-semantic-color-text-subtle,#515357)" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M19 18l1-4h8l1 4" stroke="var(--ld-semantic-color-text-subtle,#515357)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <p className={styles.cartPanel__emptyText}>No items added yet</p>
            <p className={styles.cartPanel__emptyHint}>Use "Configure and add" to build your order</p>
          </div>
        ) : (
          <>
            <div className={styles.cartItems}>
              {cart.map(item => (
                <div key={item.product.id} className={styles.cartItem}>
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className={styles.cartItem__image}
                  />
                  <div className={styles.cartItem__info}>
                    <div className={styles.cartItem__name}>{item.product.name}</div>
                    <div className={styles.cartItem__meta}>
                      Qty: {item.qty} · {item.product.startingPrice} ea
                    </div>
                  </div>
                  <button
                    type="button"
                    className={styles.cartItem__remove}
                    onClick={() => handleRemoveFromCart(item.product.id)}
                    aria-label={`Remove ${item.product.name}`}
                  >
                    <TrashIcon />
                  </button>
                </div>
              ))}
            </div>

            <div className={styles.cartPanel__footer}>
              <div className={styles.divider} />
              <div className={styles.cartTotal}>
                <span className={styles.cartTotal__label}>Estimated total</span>
                <span className={styles.cartTotal__value}>${cartTotal.toFixed(2)}</span>
              </div>
              <Button variant="primary" size="small" isFullWidth>
                Place order
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function Home() {
  const [activeTab, setActiveTab] = useState('deli-and-meat');

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
              trailing={<Badge value={4} size="small" />}
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

          {/* Metrics Summary */}
          <MetricsSummary />

          {/* Main content panel */}
          <TabPanel value="deli-and-meat" UNSAFE_className={styles.tabPanel}>
            <div className={styles.contentGrid}>
              {/* Column 1: Express and in store orders */}
              <section className={styles.column}>
                <div className={styles.column__header}>
                  <h2 className={styles.column__title}>
                    Express and in store orders
                    <span className={styles.column__count}>(6)</span>
                  </h2>
                </div>
                <div className={styles.column__body}>
                  {expressOrders.map((order, idx) => (
                    <ExpressOrderCard key={idx} order={order} />
                  ))}
                </div>
              </section>

              <div className={styles.column__divider} />

              {/* Column 2: Today's production plan */}
              <section className={styles.column}>
                <div className={styles.column__header}>
                  <h2 className={styles.column__title}>
                    Today's production plan
                    <span className={styles.column__count}>(4)</span>
                  </h2>
                </div>
                <div className={styles.column__body}>
                  {productionItems.map((item, idx) => (
                    <ProductionCard key={idx} item={item} />
                  ))}
                </div>
              </section>

              <div className={styles.column__divider} />

              {/* Column 3: Online orders */}
              <section className={styles.column}>
                <div className={styles.column__header}>
                  <h2 className={styles.column__title}>
                    Online orders
                    <span className={styles.column__count}>(2)</span>
                  </h2>
                </div>
                <div className={styles.column__body}>
                  {onlineOrders.map((order, idx) => (
                    <OnlineOrderCard key={idx} order={order} />
                  ))}
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
            <StoreOrdersPanel />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}
