import React, { useState } from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { WCPQueueLanding } from '@/components/walmart/WCPQueueLanding';
import { WCPQueueBanner } from '@/components/walmart/WCPQueueBanner';
import { WCPQueueCard } from '@/components/walmart/WCPQueueCard';
import { WCPRichMediaSheet } from '@/components/walmart/WCPRichMediaSheet';
import {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalTitle,
} from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { LinkButton } from '@/components/ui/LinkButton';
import styles from './WCPQueue.module.css';

// ── Helpers ────────────────────────────────────────────────────────────────

function secondsFromNow(s: number): number {
  return Date.now() + s * 1000;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className={styles.sectionTitle}>{children}</h2>;
}

function SectionDesc({ children }: { children: React.ReactNode }) {
  return <p className={styles.sectionDesc}>{children}</p>;
}

const DEMO_IMAGE =
  'https://i5.walmartimages.com/seo/Apple-AirPods-Pro-2nd-Generation-with-Lightning-Charging-Case_c3e28b66-aa34-45fa-9d5c-82ef81b8d0b0.0c8e6c0d6e34cf3e11da0965e8d6a21a.jpeg?odnWidth=180&odnHeight=180&odnBg=ffffff';

// ── Main page ──────────────────────────────────────────────────────────────

export default function WCPQueuePage() {
  // Timer state
  const [landingEnd] = useState(() => secondsFromNow(59 * 60));
  const [bannerEnd] = useState(() => secondsFromNow(57 * 60));

  // Modal state
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [unauthModalOpen, setUnauthModalOpen] = useState(false);

  // Sheet state
  const [authSheetOpen, setAuthSheetOpen] = useState(false);
  const [unauthSheetOpen, setUnauthSheetOpen] = useState(false);

  return (
    <ComponentPageLayout
      section="WCP Patterns"
      title="Queue"
      description="Combined queue pattern page bringing together Queue Landing, Queue Banner, and Queue Card components for the waiting-room experience."
    >
      <div className={styles.page}>

        {/* ═══════════════════════════════════════════════════════════
            Section A — Queue Landing
            ═══════════════════════════════════════════════════════════ */}
        <div className={styles.section}>
          <SectionTitle>Queue Landing</SectionTitle>
          <SectionDesc>
            The Queue Landing is the main content body for the queue waiting-room screen.
            It comes in two variants: authenticated (user is in line with an estimated wait timer)
            and unauthenticated (prompts the user to sign in). This component renders only the
            content body — header and footer chrome are provided by the Modal or Bottom Sheet shell.
          </SectionDesc>

          <div className={styles.demoRow}>
            {/* Authenticated standalone */}
            <div className={styles.demoCard}>
              <span className={styles.demoLabel}>Authenticated</span>
              <div className={styles.blueContentArea}>
                <WCPQueueLanding
                  variant="authenticated"
                  endTime={landingEnd}
                  productImage={DEMO_IMAGE}
                  productAlt="Apple AirPods Pro"
                  showInlineActions
                />
              </div>
            </div>

            {/* Unauthenticated standalone */}
            <div className={styles.demoCard}>
              <span className={styles.demoLabel}>Unauthenticated</span>
              <div className={styles.blueContentArea}>
                <WCPQueueLanding
                  variant="unauthenticated"
                  productImage={DEMO_IMAGE}
                  productAlt="Apple AirPods Pro"
                  showInlineActions
                />
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            Section B — Queue Landing in LD Modal
            ═══════════════════════════════════════════════════════════ */}
        <div className={styles.section}>
          <SectionTitle>Queue Landing in LD Modal</SectionTitle>
          <SectionDesc>
            The Queue Landing content placed inside an LD 3.5 Modal (800px large size).
            The modal header shows "Black Friday Deals" with a close button, the content area
            has a brand-blue background, and the footer contains the primary action button
            and a leave link.
          </SectionDesc>

          <div className={styles.triggerRow}>
            <Button variant="primary" onClick={() => setAuthModalOpen(true)}>
              Open Authenticated Modal
            </Button>
            <Button variant="secondary" onClick={() => setUnauthModalOpen(true)}>
              Open Unauthenticated Modal
            </Button>
          </div>

          {/* Authenticated Modal */}
          <AuthenticatedModal
            open={authModalOpen}
            onClose={() => setAuthModalOpen(false)}
            endTime={landingEnd}
          />

          {/* Unauthenticated Modal */}
          <UnauthenticatedModal
            open={unauthModalOpen}
            onClose={() => setUnauthModalOpen(false)}
          />
        </div>

        {/* ═══════════════════════════════════════════════════════════
            Section C — Queue Landing in Bottom Sheet
            ═══════════════════════════════════════════════════════════ */}
        <div className={styles.section}>
          <SectionTitle>Queue Landing in Bottom Sheet</SectionTitle>
          <SectionDesc>
            The Queue Landing content inside a WCP Rich Media Sheet with the inverse header
            variant (brand-blue header with white title) and brand-bold surface. The footer
            contains a secondary button and a "Leave the line" link.
          </SectionDesc>

          <div className={styles.triggerRow}>
            <Button variant="primary" onClick={() => setAuthSheetOpen(true)}>
              Open Authenticated Sheet
            </Button>
            <Button variant="secondary" onClick={() => setUnauthSheetOpen(true)}>
              Open Unauthenticated Sheet
            </Button>
          </div>

          {/* Authenticated Sheet */}
          <WCPRichMediaSheet
            isOpen={authSheetOpen}
            onClose={() => setAuthSheetOpen(false)}
            headerVariant="inverse"
            title="Black Friday Deals"
            surfaceVariant="brand-bold"
            actions={
              <div className={styles.sheetFooterActions}>
                <Button variant="primary" isFullWidth onClick={() => setAuthSheetOpen(false)}>
                  Hold my spot and keep shopping
                </Button>
                <LinkButton color="white" isFullWidth onClick={() => setAuthSheetOpen(false)}>
                  Leave the line
                </LinkButton>
              </div>
            }
          >
            <div className={styles.sheetContent}>
              <WCPQueueLanding
                variant="authenticated"
                endTime={landingEnd}
                productImage={DEMO_IMAGE}
                productAlt="Apple AirPods Pro"
              />
            </div>
          </WCPRichMediaSheet>

          {/* Unauthenticated Sheet */}
          <WCPRichMediaSheet
            isOpen={unauthSheetOpen}
            onClose={() => setUnauthSheetOpen(false)}
            headerVariant="inverse"
            title="Black Friday Deals"
            surfaceVariant="brand-bold"
            actions={
              <div className={styles.sheetFooterActions}>
                <Button variant="secondary" isFullWidth onClick={() => setUnauthSheetOpen(false)}>
                  Sign in to join the line
                </Button>
                <LinkButton color="white" isFullWidth onClick={() => setUnauthSheetOpen(false)}>
                  Leave the line
                </LinkButton>
              </div>
            }
          >
            <div className={styles.sheetContent}>
              <WCPQueueLanding
                variant="unauthenticated"
                productImage={DEMO_IMAGE}
                productAlt="Apple AirPods Pro"
              />
            </div>
          </WCPRichMediaSheet>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            Section D — Queue Banner
            ═══════════════════════════════════════════════════════════ */}
        <div className={styles.section}>
          <SectionTitle>Queue Banner</SectionTitle>
          <SectionDesc>
            The Queue Banner sits on a dark navy background and contains a white card with a
            product image, timer badge, reservation text, and View/Leave action links. Three
            variants: line-joined, checkout, and error.
          </SectionDesc>

          <div className={styles.variantGrid}>
            <div className={styles.variantCol}>
              <span className={styles.variantLabel}>Line Joined</span>
              <div className={styles.bannerFrame}>
                <WCPQueueBanner
                  endTime={bannerEnd}
                  variant="lineJoined"
                  productImage={DEMO_IMAGE}
                  reservationText="reservation text"
                />
              </div>
            </div>

            <div className={styles.variantCol}>
              <span className={styles.variantLabel}>Checkout</span>
              <div className={styles.bannerFrame}>
                <WCPQueueBanner
                  endTime={bannerEnd}
                  variant="checkout"
                  queueMessage="Complete your purchase before time runs out"
                />
              </div>
            </div>

            <div className={styles.variantCol}>
              <span className={styles.variantLabel}>Error</span>
              <div className={styles.bannerFrame}>
                <WCPQueueBanner
                  endTime={bannerEnd}
                  variant="error"
                  errorMessage="Your reservation has expired. The item is no longer available at this price."
                />
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            Section E — Queue Card
            ═══════════════════════════════════════════════════════════ */}
        <div className={styles.section}>
          <SectionTitle>Queue Card</SectionTitle>
          <SectionDesc>
            A compact card displaying a reservation timer, product thumbnail, pricing, and queue
            actions. Three urgency variants: waiting (blue), warning (yellow), and expiring (red).
          </SectionDesc>

          <div className={styles.variantGrid}>
            <div className={styles.variantCol}>
              <span className={styles.variantLabel}>Waiting (Light Blue)</span>
              <WCPQueueCard
                variant="waiting"
                displayTime="57mins"
                productImage={DEMO_IMAGE}
                productImageAlt="Apple AirPods Pro"
                productName="Product description text name that wraps"
                price="$499.90"
                wasPrice="$600.00"
              />
            </div>

            <div className={styles.variantCol}>
              <span className={styles.variantLabel}>Warning (Yellow)</span>
              <WCPQueueCard
                variant="warning"
                displayTime="57mins"
                productImage={DEMO_IMAGE}
                productImageAlt="Apple AirPods Pro"
                productName="Product description text name that wraps"
                price="$499.90"
                wasPrice="$600.00"
              />
            </div>

            <div className={styles.variantCol}>
              <span className={styles.variantLabel}>Expiring (Red)</span>
              <WCPQueueCard
                variant="expiring"
                displayTime="57mins"
                productImage={DEMO_IMAGE}
                productImageAlt="Apple AirPods Pro"
                productName="Product description text name that wraps"
                price="$499.90"
                wasPrice="$600.00"
              />
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            Usage
            ═══════════════════════════════════════════════════════════ */}
        <div className={styles.section}>
          <SectionTitle>Usage</SectionTitle>
          <pre className={styles.codeBlock}>{`import { WCPQueueLanding } from '@/components/walmart/WCPQueueLanding';

// Authenticated — standalone with inline actions
<WCPQueueLanding
  variant="authenticated"
  endTime={reservationEndTime}
  productImage={imageUrl}
  showInlineActions
/>

// Unauthenticated — inside a Modal
<Modal open={isOpen} onOpenChange={setIsOpen}>
  <ModalContent size="large" hideClose>
    <ModalHeader><ModalTitle>Black Friday Deals</ModalTitle></ModalHeader>
    <div style={{ background: '#002E99', padding: '32px 24px' }}>
      <WCPQueueLanding variant="unauthenticated" />
    </div>
    <ModalFooter>
      <Button variant="primary" isFullWidth>Sign in</Button>
    </ModalFooter>
  </ModalContent>
</Modal>`}</pre>
        </div>

      </div>
    </ComponentPageLayout>
  );
}

// ── Authenticated Modal sub-component ──────────────────────────────────────

function AuthenticatedModal({
  open,
  onClose,
  endTime,
}: {
  open: boolean;
  onClose: () => void;
  endTime: Date | number | string;
}) {
  return (
    <Modal open={open} onOpenChange={(v) => !v && onClose()}>
      <ModalContent size="large">
        <ModalHeader>
          <ModalTitle>Black Friday Deals</ModalTitle>
        </ModalHeader>
        <div className={styles.modalBlueContent}>
          <WCPQueueLanding
            variant="authenticated"
            endTime={endTime}
            productImage={DEMO_IMAGE}
            productAlt="Apple AirPods Pro"
          />
        </div>
        <div className={styles.modalFooter}>
          <Button variant="primary" isFullWidth onClick={onClose}>
            Hold my spot and keep shopping
          </Button>
          <button type="button" className={styles.modalLeaveLink} onClick={onClose}>
            Leave the line
          </button>
        </div>
      </ModalContent>
    </Modal>
  );
}

// ── Unauthenticated Modal sub-component ────────────────────────────────────

function UnauthenticatedModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Modal open={open} onOpenChange={(v) => !v && onClose()}>
      <ModalContent size="large">
        <ModalHeader>
          <ModalTitle>Black Friday Deals</ModalTitle>
        </ModalHeader>
        <div className={styles.modalBlueContent}>
          <WCPQueueLanding
            variant="unauthenticated"
            productImage={DEMO_IMAGE}
            productAlt="Apple AirPods Pro"
          />
        </div>
        <div className={styles.modalFooter}>
          <Button variant="primary" isFullWidth onClick={onClose}>
            Sign in to join the line
          </Button>
          <button type="button" className={styles.modalLeaveLink} onClick={onClose}>
            Leave the line
          </button>
        </div>
      </ModalContent>
    </Modal>
  );
}
