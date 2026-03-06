import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Check, X } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import { Scrim } from '@/components/ui/Scrim';
import { PharmacyOrderDetailModal } from './PharmacyOrderDetailModal';
import styles from './AutoCareModals.module.css';

export type PharmacyModalType = 'pickup' | 'transferRx' | 'viewDetails' | null;

function useModalEffects(open: boolean, onClose: () => void) {
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
}

// ── Pickup Confirmation Modal ─────────────────────────────────────────────────
function PickupModal({
  open, onClose, rxName, rxNumber, location, pickupWindow,
}: {
  open: boolean; onClose: () => void;
  rxName?: string; rxNumber?: string; location?: string; pickupWindow?: string;
}) {
  const [confirmed, setConfirmed] = useState(false);
  useModalEffects(open, onClose);
  if (!open) return null;

  const handleDone = () => { setConfirmed(false); onClose(); };

  return createPortal(
    <>
      <Scrim onClick={onClose} style={{ zIndex: 100 }} />
      <div className={styles.modalWrap} role="dialog" aria-modal="true" aria-labelledby="pharmacy-pickup-title">
        {confirmed ? (
          <div className={styles.confirmedBody}>
            <div className={styles.closeBtnWrap}>
              <IconButton aria-label="Close" variant="ghost" size="small" onClick={handleDone}>
                <X style={{ width: 20, height: 20 }} />
              </IconButton>
            </div>
            <div className={styles.successIcon}>
              <Check style={{ width: 32, height: 32, color: 'var(--ld-semantic-color-text-inverse)' }} />
            </div>
            <h2 className={styles.confirmedTitle}>Prescription picked up!</h2>
            <p className={styles.confirmedText}>
              Your prescription for <strong>{rxName || 'your medication'}</strong> has been marked as picked up.
            </p>
            <Button variant="primary" onClick={handleDone} UNSAFE_className={styles.fullWidthBtn}>
              Done
            </Button>
          </div>
        ) : (
          <>
            <div className={styles.modalHeader}>
              <h2 id="pharmacy-pickup-title" className={styles.modalTitle}>Pick up prescription</h2>
              <IconButton aria-label="Close" variant="ghost" size="small" onClick={onClose}>
                <X style={{ width: 20, height: 20 }} />
              </IconButton>
            </div>
            <div className={styles.checkInBody}>
              <div className={styles.detailCard}>
                <img
                  src="/illustrations/spot-illustration/Pharmacy.svg"
                  alt="" aria-hidden="true" width={56} height={56}
                />
                <div className={styles.detailInfo}>
                  <p className={styles.detailHeading}>{rxName || 'Prescription'}</p>
                  {rxNumber && <p className={styles.detailSub}>{rxNumber}</p>}
                  {location && <p className={styles.detailSub}>{location}</p>}
                  {pickupWindow && <p className={styles.detailSub}>Pickup window: {pickupWindow}</p>}
                </div>
              </div>
              <p className={styles.checkInNote}>
                Please bring a valid photo ID. If picking up for someone else, you may need their date of birth.
              </p>
            </div>
            <div className={styles.modalFooter}>
              <Button variant="secondary" onClick={onClose} UNSAFE_className={styles.halfWidthBtn}>
                Not yet
              </Button>
              <Button variant="primary" onClick={() => setConfirmed(true)} UNSAFE_className={styles.halfWidthBtn}>
                Confirm pickup
              </Button>
            </div>
          </>
        )}
      </div>
    </>,
    document.body
  );
}

// ── Transfer Rx Modal ─────────────────────────────────────────────────────────
function TransferRxModal({
  open, onClose, rxName, currentLocation,
}: {
  open: boolean; onClose: () => void;
  rxName?: string; currentLocation?: string;
}) {
  const [transferred, setTransferred] = useState(false);
  useModalEffects(open, onClose);
  if (!open) return null;

  const handleDone = () => { setTransferred(false); onClose(); };

  return createPortal(
    <>
      <Scrim onClick={onClose} style={{ zIndex: 100 }} />
      <div className={styles.modalWrap} role="dialog" aria-modal="true" aria-labelledby="transfer-rx-title">
        {transferred ? (
          <div className={styles.confirmedBody}>
            <div className={styles.closeBtnWrap}>
              <IconButton aria-label="Close" variant="ghost" size="small" onClick={handleDone}>
                <X style={{ width: 20, height: 20 }} />
              </IconButton>
            </div>
            <div className={styles.successIcon}>
              <Check style={{ width: 32, height: 32, color: 'var(--ld-semantic-color-text-inverse)' }} />
            </div>
            <h2 className={styles.confirmedTitle}>Transfer requested!</h2>
            <p className={styles.confirmedText}>
              Your pharmacist will process the transfer. You'll receive a notification when it's ready at the new location.
            </p>
            <Button variant="primary" onClick={handleDone} UNSAFE_className={styles.fullWidthBtn}>
              Done
            </Button>
          </div>
        ) : (
          <>
            <div className={styles.modalHeader}>
              <h2 id="transfer-rx-title" className={styles.modalTitle}>Transfer prescription</h2>
              <IconButton aria-label="Close" variant="ghost" size="small" onClick={onClose}>
                <X style={{ width: 20, height: 20 }} />
              </IconButton>
            </div>
            <div className={styles.checkInBody}>
              <div className={styles.detailCard}>
                <img
                  src="/illustrations/spot-illustration/Pharmacy.svg"
                  alt="" aria-hidden="true" width={56} height={56}
                />
                <div className={styles.detailInfo}>
                  <p className={styles.detailHeading}>{rxName || 'Prescription'}</p>
                  {currentLocation && <p className={styles.detailSub}>Current: {currentLocation}</p>}
                </div>
              </div>
              <div className={styles.apptFieldGroup}>
                <span className={styles.apptFieldLabel}>Transfer to</span>
                <div className={styles.apptFieldValueStatic}>
                  Search for a Walmart Pharmacy near you
                </div>
              </div>
              <p className={styles.checkInNote}>
                Transfers typically take 24–48 hours. Your pharmacist may contact you if additional information is needed.
              </p>
            </div>
            <div className={styles.modalFooter}>
              <Button variant="secondary" onClick={onClose} UNSAFE_className={styles.halfWidthBtn}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setTransferred(true)} UNSAFE_className={styles.halfWidthBtn}>
                Transfer prescription
              </Button>
            </div>
          </>
        )}
      </div>
    </>,
    document.body
  );
}

// ── Exported orchestrator ─────────────────────────────────────────────────────
export interface PharmacyModalsProps {
  openModal: PharmacyModalType;
  onClose: () => void;
  rxName?: string;
  rxNumber?: string;
  location?: string;
  pickupWindow?: string;
  provider?: string;
  plan?: string;
}

export function PharmacyModals({
  openModal, onClose, rxName, rxNumber, location, pickupWindow, provider, plan,
}: PharmacyModalsProps) {
  return (
    <>
      <PharmacyOrderDetailModal
        open={openModal === 'viewDetails'}
        onClose={onClose}
        rxName={rxName}
        rxNumber={rxNumber}
        location={location}
        pickupWindow={pickupWindow}
        provider={provider}
        plan={plan}
      />
      <PickupModal
        open={openModal === 'pickup'}
        onClose={onClose}
        rxName={rxName}
        rxNumber={rxNumber}
        location={location}
        pickupWindow={pickupWindow}
      />
      <TransferRxModal
        open={openModal === 'transferRx'}
        onClose={onClose}
        rxName={rxName}
        currentLocation={location}
      />
    </>
  );
}
