import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronRight, InfoCircle, Store, CreditCard, Printer } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import { Scrim } from '@/components/ui/Scrim';
import { Link } from '@/components/ui/Link';
import type { ServiceDetails } from './OrderCard';
import styles from './AutoCareOrderDetailModal.module.css';

interface AutoCareOrderDetailModalProps {
  open: boolean;
  onClose: () => void;
  onCheckIn: () => void;
  onReschedule: () => void;
  serviceDetails?: ServiceDetails;
  location?: string;
  statusHeading: string;
  orderTotal?: string;
}

export function AutoCareOrderDetailModal({
  open,
  onClose,
  onCheckIn,
  onReschedule,
  serviceDetails,
  location,
  statusHeading,
  orderTotal,
}: AutoCareOrderDetailModalProps) {
  // Scroll lock + Escape key
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  // ── Data derived from props ──────────────────────────────────────────────
  const vehicle    = serviceDetails?.vehicle   ?? '2019 Toyota Camry';
  const services   = serviceDetails?.services  ?? ['Oil change'];
  const total      = orderTotal ?? '$89.88';
  const storeName  = location
    ? location.replace(/ at .*/, '')          // "Carrollton Supercenter"
    : 'Carrollton Supercenter';
  const storeAddr  = location
    ? location.replace(/^.* at /, '')         // "1213 Trinity Mills Rd"
    : '1213 E Trinity Mills Rd, Carrollton, TX 75006';
  // Build full address for sidebar display
  const sidebarAddr = location
    ? storeAddr.includes('TX') ? storeAddr : `${storeAddr}, Carrollton, TX 75006`
    : '1213 E Trinity Mills Rd, Carrollton, TX 75006';

  // Breakdown amounts (static demo data matching the card total)
  const servicePrice = '$54.99';
  const tirPrice     = '$31.99';
  const taxAmt       = '$2.90';
  const totalAmt     = total;

  // Order date from statusHeading (e.g. "Sat, Mar 7, 10:00am–11:00am")
  const orderDateLabel = statusHeading.replace(/,\s*\d{1,2}:\d{2}.*$/, '').trim();
  const orderNum       = '2000143-50929015';

  return createPortal(
    <>
      <Scrim onClick={onClose} style={{ zIndex: 200 }} />

      {/* Full-screen page-style container */}
      <div
        className={styles.detailOverlay}
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-detail-title"
      >
        {/* ── Sticky top bar ────────────────────────────────────────────── */}
        <div className={styles.topBar}>
          <div className={styles.topBarInner}>
            {/* Breadcrumb */}
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <button className={styles.breadcrumbLink} onClick={onClose}>
                Purchase history
              </button>
              <ChevronRight style={{ width: 14, height: 14, color: 'var(--ld-semantic-color-text-subtle, #74767C)' }} />
              <span className={styles.breadcrumbCurrent}>Order details</span>
            </nav>
            <IconButton aria-label="Close order details" variant="ghost" size="medium" onClick={onClose}>
              <X style={{ width: 20, height: 20 }} />
            </IconButton>
          </div>
        </div>

        {/* ── Scrollable body ───────────────────────────────────────────── */}
        <div className={styles.pageBody}>
          <div className={styles.pageInner}>

            {/* ── Order header ──────────────────────────────────────────── */}
            <div className={styles.orderHeader}>
              <div className={styles.orderHeaderLeft}>
                <h1 id="order-detail-title" className={styles.orderDate}>
                  {orderDateLabel} order
                </h1>
                <span className={styles.orderNumHeader}>| Order# {orderNum}</span>
              </div>
              <button className={styles.printBtn} aria-label="Print order">
                <Printer style={{ width: 16, height: 16 }} />
                <span>Print</span>
              </button>
            </div>

            {/* ── Two-column layout ─────────────────────────────────────── */}
            <div className={styles.columns}>

              {/* ── LEFT: Main content ────────────────────────────────────── */}
              <main className={styles.mainCol}>

                {/* Appointment status card */}
                <section className={styles.card}>
                  <div className={styles.appointmentCard}>
                    <div className={styles.appointmentCardLeft}>
                      {/* Fulfillment label */}
                      <div className={styles.fulfillmentRow}>
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F26a934c359774221bf674b2fb62d93da"
                          alt=""
                          aria-hidden="true"
                          width={36}
                          height={36}
                          className={styles.autoIcon}
                        />
                        <div className={styles.fulfillmentText}>
                          <span className={styles.fulfillmentLabel}>Auto Care Center</span>
                          <span className={styles.fulfillmentSub}>{storeName}</span>
                        </div>
                      </div>

                      {/* Appointment time — large heading */}
                      <h2 className={styles.apptHeading}>{statusHeading}</h2>

                      {/* Action buttons */}
                      <div className={styles.apptActions}>
                        <Button variant="primary" size="small" onClick={onCheckIn}>
                          Check in
                        </Button>
                        <Button variant="secondary" size="small" onClick={onReschedule}>
                          Reschedule
                        </Button>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Services card */}
                <section className={styles.card}>
                  <h3 className={styles.sectionTitle}>Services</h3>
                  <div className={styles.serviceBlock}>
                    <p className={styles.vehicleName}>{vehicle}</p>
                    <ul className={styles.serviceList}>
                      {services.map((s) => (
                        <li key={s} className={styles.serviceItem}>{s}</li>
                      ))}
                    </ul>
                  </div>
                </section>

                {/* Help section */}
                <section className={styles.card}>
                  <h3 className={styles.sectionTitle}>How can we help?</h3>
                  <div className={styles.helpList}>
                    <button className={styles.helpRow}>
                      <span>Cancel appointment</span>
                      <ChevronRight style={{ width: 18, height: 18, flexShrink: 0, color: 'var(--ld-semantic-color-text-subtle)' }} />
                    </button>
                    <button className={styles.helpRow}>
                      <span>Contact store</span>
                      <ChevronRight style={{ width: 18, height: 18, flexShrink: 0, color: 'var(--ld-semantic-color-text-subtle)' }} />
                    </button>
                    <button className={styles.helpRow}>
                      <span>Need more help? <Link href="#" underline>Visit our help center.</Link></span>
                      <ChevronRight style={{ width: 18, height: 18, flexShrink: 0, color: 'var(--ld-semantic-color-text-subtle)' }} />
                    </button>
                  </div>
                </section>

              </main>

              {/* ── RIGHT: Sidebar ──────────────────────────────────────── */}
              <aside className={styles.sidebar}>

                {/* Store + Appointment type chip */}
                <div className={styles.sideCard}>
                  <div className={styles.sideChip}>Auto Care</div>

                  {/* Store address */}
                  <div className={styles.sideSection}>
                    <h4 className={styles.sideSectionTitle}>Store location</h4>
                    <div className={styles.sideSectionContent}>
                      <Store style={{ width: 16, height: 16, flexShrink: 0, marginTop: 2 }} />
                      <div>
                        <p className={styles.sideText}>{storeName}</p>
                        <p className={styles.sideTextSub}>{sidebarAddr}</p>
                      </div>
                    </div>
                  </div>

                  {/* Vehicle */}
                  <div className={styles.sideSection}>
                    <h4 className={styles.sideSectionTitle}>Vehicle</h4>
                    <p className={styles.sideText}>{vehicle}</p>
                  </div>

                  {/* Payment method */}
                  <div className={styles.sideSection}>
                    <h4 className={styles.sideSectionTitle}>Payment method</h4>
                    <div className={styles.sideSectionContent}>
                      <CreditCard style={{ width: 16, height: 16, flexShrink: 0 }} />
                      <p className={styles.sideText}>ending in 7725</p>
                    </div>
                  </div>
                </div>

                {/* Pricing breakdown */}
                <div className={styles.sideCard}>
                  {/* Line items */}
                  <div className={styles.pricingLines}>
                    {services[0] && (
                      <div className={styles.priceLine}>
                        <span className={styles.priceLineLabel}>{services[0]}</span>
                        <span className={styles.priceLineValue}>{servicePrice}</span>
                      </div>
                    )}
                    {services[1] && (
                      <div className={styles.priceLine}>
                        <span className={styles.priceLineLabel}>{services[1]}</span>
                        <span className={styles.priceLineValue}>{tirPrice}</span>
                      </div>
                    )}
                    <div className={styles.priceLine}>
                      <span className={styles.priceLineLabel}>Tax</span>
                      <span className={styles.priceLineValue}>{taxAmt}</span>
                    </div>
                  </div>

                  {/* Total */}
                  <div className={styles.priceTotal}>
                    <span className={styles.priceTotalLabel}>Total</span>
                    <span className={styles.priceTotalValue}>{totalAmt}</span>
                  </div>

                  {/* Temporary adjusted total info */}
                  <div className={styles.priceAdjusted}>
                    <div className={styles.priceAdjustedRow}>
                      <span className={styles.priceAdjustedLabel}>
                        Temporary adjusted total
                        <InfoCircle style={{ width: 14, height: 14, marginLeft: 4, verticalAlign: 'middle', color: 'var(--ld-semantic-color-text-subtle, #74767C)' }} />
                      </span>
                      <span className={styles.priceAdjustedValue}>{totalAmt}</span>
                    </div>
                    <p className={styles.priceAdjustedNote}>
                      This covers adjustments to your final order total for items that are priced by weight or potentially substituted, and state bag fees where applicable. After your final order total is confirmed, <strong>we'll refund any amount that's left over.</strong>
                    </p>
                  </div>

                  {/* Charge history */}
                  <button className={styles.chargeHistoryRow}>
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F26a934c359774221bf674b2fb62d93da"
                      alt=""
                      aria-hidden="true"
                      width={28}
                      height={28}
                    />
                    <div className={styles.chargeHistoryText}>
                      <span className={styles.chargeHistoryTitle}>Charge history</span>
                      <span className={styles.chargeHistorySub}>Your transaction activity for this order</span>
                    </div>
                    <ChevronRight style={{ width: 18, height: 18, flexShrink: 0, color: 'var(--ld-semantic-color-text-subtle, #74767C)' }} />
                  </button>
                </div>

                {/* Order number + barcode */}
                <div className={styles.sideCard}>
                  <p className={styles.orderNumSide}>Order# {orderNum}</p>
                  <div className={styles.barcode} aria-hidden="true" />
                </div>

              </aside>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}
