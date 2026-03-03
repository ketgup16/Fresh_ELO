import React, { useState } from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { WCPQueueLanding } from '@/components/walmart/WCPQueueLanding';
import { WCPQueueBanner } from '@/components/walmart/WCPQueueBanner';
import { WCPQueueCard } from '@/components/walmart/WCPQueueCard';
import { WCPQueuePanel } from '@/components/walmart/WCPQueuePanel';
import type { QueueItem } from '@/components/walmart/WCPQueueItemCard';
import { WCPRichMediaSheet } from '@/components/walmart/WCPRichMediaSheet';
import { WCPRichSnackbar } from '@/components/walmart/WCPRichSnackbar';
import { LeaveQueueModal } from '@/components/walmart/LeaveQueueModal';
import { Warning } from '@/components/icons/Warning';
import { BottomNav } from '@/components/walmart/BottomNav';
import {
  Modal,
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

// ── Demo queue items ───────────────────────────────────────────────────────

function buildDemoItems(): QueueItem[] {
  return [
    {
      id: '1',
      productImage: DEMO_IMAGE,
      productImageAlt: 'Champion Men\u2019s Classic Graphic Tee',
      description: 'Champion Men\u2019s Classic Graphic Tee',
      price: '$199.99',
      originalPrice: '$299.99',
      endTime: secondsFromNow(19 * 60),
    },
    {
      id: '2',
      productImage: DEMO_IMAGE,
      productImageAlt: 'Champion-Test1',
      description: 'Champion-Test1',
      price: '$5.00',
      endTime: secondsFromNow(34 * 60),
    },
    {
      id: '3',
      productImage: DEMO_IMAGE,
      productImageAlt: 'Champion Men\u2019s Sportstyle Colorblock Tee',
      description: 'Champion Men\u2019s Sportstyle Colorblock Tee',
      price: '$6.00',
      endTime: secondsFromNow(54 * 60),
    },
  ];
}

// ── Main page ──────────────────────────────────────────────────────────────

export default function WCPQueuePage() {
  // Timer state
  const [landingEnd] = useState(() => secondsFromNow(59 * 60));
  const [bannerEnd, setBannerEnd] = useState(() => secondsFromNow(59 * 60));
  const [warningEnd] = useState(() => secondsFromNow(10 * 60 + 23));
  const [expiringEnd] = useState(() => secondsFromNow(45));
  const [liveCardEnd, setLiveCardEnd] = useState(() => secondsFromNow(12 * 60));

  // Modal state
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [unauthModalOpen, setUnauthModalOpen] = useState(false);

  // Sheet state
  const [authSheetOpen, setAuthSheetOpen] = useState(false);
  const [unauthSheetOpen, setUnauthSheetOpen] = useState(false);

  // Leave queue confirmation modal
  const [leaveModalOpen, setLeaveModalOpen] = useState(false);

  // Panel state
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [demoItems] = useState<QueueItem[]>(buildDemoItems);

  return (
    <ComponentPageLayout
      section="WCP Patterns"
      title="Queue"
      description="Queue pattern page bringing together Queue Landing, Queue Banner, and Queue Card components for the waiting-room experience."
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

          <AuthenticatedModal
            open={authModalOpen}
            onClose={() => setAuthModalOpen(false)}
            endTime={landingEnd}
          />

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
            A banner with a live countdown timer for reserved carts, flash sales, and limited-time
            queue flows. Sits on a dark navy background with a white card containing a product
            image, timer badge, reservation text, and View/Leave action links. Supports three
            variants: line-joined, checkout, and error.
          </SectionDesc>

          {/* Line Joined — Waiting Room */}
          <div className={styles.useCaseBlock}>
            <span className={styles.useCaseTitle}>Line Joined — Waiting Room (Light Blue Timer)</span>
            <div className={styles.controlRow}>
              <span className={styles.controlLabel}>Set timer:</span>
              <Button variant="secondary" size="small" onClick={() => setBannerEnd(secondsFromNow(59 * 60))}>
                59 min (normal)
              </Button>
              <Button variant="secondary" size="small" onClick={() => setBannerEnd(secondsFromNow(5 * 60))}>
                5 min (warning)
              </Button>
              <Button variant="secondary" size="small" onClick={() => setBannerEnd(secondsFromNow(30))}>
                30 s (critical)
              </Button>
            </div>
            <div className={styles.bannerFrame}>
              <WCPQueueBanner
                endTime={bannerEnd}
                variant="lineJoined"
                productImage={DEMO_IMAGE}
                reservationText="reservation text"
                onView={() => {}}
                onLeave={() => setLeaveModalOpen(true)}
                linkText="Placeholder link text"
                onLink={() => setIsPanelOpen(true)}
                inline
              />
            </div>
          </div>

          {/* Line Joined — Warning (Yellow Timer) */}
          <div className={styles.useCaseBlock}>
            <span className={styles.useCaseTitle}>Line Joined — Item Warning (Yellow Timer)</span>
            <div className={styles.bannerFrame}>
              <WCPQueueBanner
                endTime={warningEnd}
                variant="lineJoined"
                productImage={DEMO_IMAGE}
                reservationText="reservation text"
                onView={() => {}}
                onLeave={() => setLeaveModalOpen(true)}
                linkText="Placeholder link text"
                onLink={() => {}}
                inline
              />
            </div>
          </div>

          {/* Line Joined — Expiring (Red Timer) */}
          <div className={styles.useCaseBlock}>
            <span className={styles.useCaseTitle}>Line Joined — Expiring (Red Timer)</span>
            <div className={styles.bannerFrame}>
              <WCPQueueBanner
                endTime={expiringEnd}
                variant="lineJoined"
                productImage={DEMO_IMAGE}
                reservationText="reservation text"
                onView={() => {}}
                onLeave={() => setLeaveModalOpen(true)}
                linkText="Placeholder link text"
                onLink={() => {}}
                inline
              />
            </div>
          </div>

          {/* Checkout Variant */}
          <div className={styles.useCaseBlock}>
            <span className={styles.useCaseTitle}>Checkout</span>
            <SectionDesc>
              Simplified navy bar used during checkout. Shows timer + message + dismiss button.
            </SectionDesc>
            <div className={styles.variantRow}>
              <div className={styles.variantCard}>
                <div className={styles.demoLabel}>Desktop (900+px)</div>
                <div className={styles.bannerFrame}>
                  <WCPQueueBanner
                    endTime={secondsFromNow(63)}
                    variant="checkout"
                    queueMessage="queue messaging"
                    onDismiss={() => {}}
                    inline
                  />
                </div>
              </div>
              <div className={styles.variantCard}>
                <div className={styles.demoLabel}>Mobile (&lt;900px)</div>
                <div className={styles.bannerFrameNarrow}>
                  <WCPQueueBanner
                    endTime={secondsFromNow(63)}
                    variant="checkout"
                    queueMessage="queue messaging"
                    onDismiss={() => {}}
                    inline
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Error Variant */}
          <div className={styles.useCaseBlock}>
            <span className={styles.useCaseTitle}>Error</span>
            <SectionDesc>
              Shown when the queue encounters an error or the user is being placed in line.
            </SectionDesc>
            <div className={styles.variantRow}>
              <div className={styles.variantCard}>
                <div className={styles.demoLabel}>Desktop (900+px)</div>
                <div className={styles.bannerFrame}>
                  <WCPQueueBanner
                    endTime={secondsFromNow(600)}
                    variant="error"
                    errorMessage="Hang on, we're getting you in line. Please don't refresh or leave the line."
                    inline
                  />
                </div>
              </div>
              <div className={styles.variantCard}>
                <div className={styles.demoLabel}>Mobile (&lt;900px)</div>
                <div className={styles.bannerFrameNarrow}>
                  <WCPQueueBanner
                    endTime={secondsFromNow(600)}
                    variant="error"
                    errorMessage="Hang on, we're getting you in line. Please don't refresh or leave the line."
                    inline
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Queue items side panel */}
        <WCPQueuePanel
          isOpen={isPanelOpen}
          onClose={() => setIsPanelOpen(false)}
          items={demoItems}
        />

        {/* ═══════════════════════════════════════════════════════════
            Section E — Queue Card
            ═══════════════════════════════════════════════════════════ */}
        <div className={styles.section}>
          <SectionTitle>Queue Card</SectionTitle>
          <SectionDesc>
            A compact card displaying a reservation timer, product thumbnail, pricing, and queue
            actions. Three urgency variants: waiting (blue), warning (yellow), and expiring (red).
            Clicking "Leave the line" opens a confirmation modal.
          </SectionDesc>

          <div className={styles.cardVariantGrid}>
            <div className={styles.cardVariantCol}>
              <span className={styles.variantLabel}>Waiting (Light Blue)</span>
              <WCPQueueCard
                variant="waiting"
                displayTime="57mins"
                productImage={DEMO_IMAGE}
                productImageAlt="Apple AirPods Pro"
                productName="Product description text name that wraps"
                price="$499.90"
                wasPrice="$600.00"
                onLeaveQueue={() => setLeaveModalOpen(true)}
              />
            </div>

            <div className={styles.cardVariantCol}>
              <span className={styles.variantLabel}>Warning (Yellow)</span>
              <WCPQueueCard
                variant="warning"
                displayTime="57mins"
                productImage={DEMO_IMAGE}
                productImageAlt="Apple AirPods Pro"
                productName="Product description text name that wraps"
                price="$499.90"
                wasPrice="$600.00"
                onLeaveQueue={() => setLeaveModalOpen(true)}
              />
            </div>

            <div className={styles.cardVariantCol}>
              <span className={styles.variantLabel}>Expiring (Red)</span>
              <WCPQueueCard
                variant="expiring"
                displayTime="57mins"
                productImage={DEMO_IMAGE}
                productImageAlt="Apple AirPods Pro"
                productName="Product description text name that wraps"
                price="$499.90"
                wasPrice="$600.00"
                onLeaveQueue={() => setLeaveModalOpen(true)}
              />
            </div>
          </div>

          {/* Live Countdown */}
          <div className={styles.useCaseBlock}>
            <span className={styles.useCaseTitle}>Live Countdown</span>
            <SectionDesc>
              When <code>endTime</code> is provided the timer counts down in real time.
            </SectionDesc>
            <div className={styles.controlRow}>
              <span className={styles.controlLabel}>Set timer:</span>
              <Button variant="secondary" size="small" onClick={() => setLiveCardEnd(secondsFromNow(12 * 60))}>
                12 min (waiting)
              </Button>
              <Button variant="secondary" size="small" onClick={() => setLiveCardEnd(secondsFromNow(4 * 60))}>
                4 min (warning)
              </Button>
              <Button variant="secondary" size="small" onClick={() => setLiveCardEnd(secondsFromNow(30))}>
                30 s (expiring)
              </Button>
            </div>
            <div className={styles.liveDemo}>
              <WCPQueueCard
                variant="waiting"
                endTime={liveCardEnd}
                productImage={DEMO_IMAGE}
                productImageAlt="Apple AirPods Pro"
                productName="Apple AirPods Pro (2nd Generation)"
                price="$189.00"
                wasPrice="$249.00"
                onLeaveQueue={() => setLeaveModalOpen(true)}
              />
            </div>
          </div>
        </div>

        {/* Leave Queue Confirmation Modal */}
        <LeaveQueueModal
          open={leaveModalOpen}
          onOpenChange={setLeaveModalOpen}
        />

        {/* ═══════════════════════════════════════════════════════════
            Section F — Banner Use Case Examples
            ═══════════════════════════════════════════════════════════ */}
        <div className={styles.section}>
          <SectionTitle>Banner Variants</SectionTitle>
          <SectionDesc>
            Multiple variants of the Queue Banner manipulated with props and child components.
          </SectionDesc>

          <div className={styles.useCaseBlock}>
            <span className={styles.useCaseTitle}>Basic Queue</span>
            <div className={styles.bannerFrame}>
              <WCPQueueBanner
                endTime={secondsFromNow(20 * 60)}
                variant="lineJoined"
                productImage={DEMO_IMAGE}
                reservationText="estimated wait"
                viewLabel="View"
                onView={() => {}}
                showLinkRow={false}
                inline
              />
            </div>
          </div>

          <div className={styles.useCaseBlock}>
            <span className={styles.useCaseTitle}>Reservation Ready Queue</span>
            <div className={styles.bannerFrame}>
              <WCPQueueBanner
                endTime={secondsFromNow(1)}
                variant="lineJoined"
                productImage={DEMO_IMAGE}
                reservationText="left to buy"
                viewLabel="View"
                onView={() => {}}
                leaveLabel="Leave"
                onLeave={() => setLeaveModalOpen(true)}
                linkText="You're in line for 1 other item"
                onLink={() => {}}
                inline
              />
            </div>
          </div>

          <div className={styles.useCaseBlock}>
            <span className={styles.useCaseTitle}>Time Expired Queue</span>
            <div className={styles.bannerFrame}>
              <WCPQueueBanner
                endTime={secondsFromNow(0)}
                variant="lineJoined"
                productImage={DEMO_IMAGE}
                reservationText="left to buy"
                viewLabel="View"
                onView={() => {}}
                leaveLabel="Remove"
                onLeave={() => {}}
                linkText="You're in line for 1 other item"
                onLink={() => {}}
                inline
              />
            </div>
          </div>

          <div className={styles.useCaseBlock}>
            <span className={styles.useCaseTitle}>Banner Fetch Error</span>
            <div className={styles.bannerFrame}>
              <WCPQueueBanner
                endTime={secondsFromNow(600)}
                variant="error"
                errorMessage="Hang on, we're getting you in line. Please don't refresh or leave the line."
                inline
              />
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            Section G — Mobile + Bottom Nav Demo
            ═══════════════════════════════════════════════════════════ */}
        <div className={styles.section}>
          <SectionTitle>Mobile — Above Bottom Nav</SectionTitle>
          <SectionDesc>
            On mobile, the queue banner sits directly above the bottom navigation bar. The snackbar
            (inverse) appears above the banner.
          </SectionDesc>

          <div className={styles.mobileStatesRow}>
            <MobileStateFrame
              label="Line Joined + Snackbar"
              sublabel="Waiting room state"
            >
              <div className={styles.phoneSnackbarWrap}>
                <WCPRichSnackbar
                  open
                  color="inverse"
                  leadingSlot={<Warning width={20} height={20} />}
                  message="Declarative title or body"
                  actionLabel="Action Button"
                  onAction={() => {}}
                  duration={Infinity}
                  inline
                />
              </div>
              <WCPQueueBanner
                endTime={secondsFromNow(59 * 60)}
                variant="lineJoined"
                productImage={DEMO_IMAGE}
                reservationText="reservation text"
                onView={() => {}}
                onLeave={() => setLeaveModalOpen(true)}
                linkText="Placeholder link text"
                onLink={() => {}}
                inline
              />
            </MobileStateFrame>

            <MobileStateFrame
              label="Item Warning + Snackbar"
              sublabel="Yellow timer badge"
            >
              <div className={styles.phoneSnackbarWrap}>
                <WCPRichSnackbar
                  open
                  color="inverse"
                  leadingSlot={<Warning width={20} height={20} />}
                  message="Declarative title or body"
                  actionLabel="Action Button"
                  onAction={() => {}}
                  duration={Infinity}
                  inline
                />
              </div>
              <WCPQueueBanner
                endTime={warningEnd}
                variant="lineJoined"
                productImage={DEMO_IMAGE}
                reservationText="reservation text"
                onView={() => {}}
                onLeave={() => setLeaveModalOpen(true)}
                linkText="Placeholder link text"
                onLink={() => {}}
                inline
              />
            </MobileStateFrame>

            <MobileStateFrame
              label="Checkout (Compact)"
              sublabel="Compact 40px bar on mobile"
            >
              <WCPQueueBanner
                endTime={secondsFromNow(63)}
                variant="checkout"
                queueMessage="queue messaging"
                onDismiss={() => {}}
                inline
              />
            </MobileStateFrame>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            Section H — Snackbar Integration
            ═══════════════════════════════════════════════════════════ */}
        <div className={styles.section}>
          <SectionTitle>Snackbar Integration</SectionTitle>
          <SectionDesc>
            Pair the queue banner with a WCPRichSnackbar (Inverse variant) above
            it to communicate queue status.
          </SectionDesc>

          <div className={styles.snackbarDemo}>
            <WCPRichSnackbar
              open
              color="inverse"
              leadingSlot={<Warning width={20} height={20} />}
              message="Hang on, we're getting you in line. Please don't refresh or leave the line."
              duration={Infinity}
              inline
            />
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            Section I — Usage
            ═══════════════════════════════════════════════════════════ */}
        <div className={styles.section}>
          <SectionTitle>Usage</SectionTitle>
          <pre className={styles.codeBlock}>{`// ── Queue Landing ──────────────────────────────────────────────
import { WCPQueueLanding } from '@/components/walmart/WCPQueueLanding';

<WCPQueueLanding
  variant="authenticated"
  endTime={reservationEndTime}
  productImage={imageUrl}
  showInlineActions
/>

// ── Queue Banner ───────────────────────────────────────────────
import { WCPQueueBanner } from '@/components/walmart/WCPQueueBanner';

// Line Joined (default)
<WCPQueueBanner
  endTime={reservationEndTime}
  reservationText="Your item is reserved"
  onView={handleView}
  onLeave={handleLeave}
  linkText="View all reserved items"
  onLink={handleLink}
/>

// Checkout — compact navy bar
<WCPQueueBanner
  endTime={checkoutEndTime}
  variant="checkout"
  queueMessage="Complete checkout before time runs out"
  onDismiss={handleDismiss}
/>

// ── Queue Card ─────────────────────────────────────────────────
import { WCPQueueCard } from '@/components/walmart/WCPQueueCard';

<WCPQueueCard
  variant="waiting"
  displayTime="57mins"
  productName="Product name"
  price="$499.90"
  wasPrice="$600.00"
  onLeaveQueue={() => {}}
  onView={() => {}}
/>`}</pre>
        </div>

      </div>
    </ComponentPageLayout>
  );
}

// ── Mobile State Frame helper ──────────────────────────────────────────────

function MobileStateFrame({
  label,
  sublabel,
  children,
}: {
  label: string;
  sublabel: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.mobileStateCard}>
      <div className={styles.mobileStateLabel}>{label}</div>
      <div className={styles.mobileStateSublabel}>{sublabel}</div>
      <div className={styles.phoneFrame}>
        <div className={styles.phonePage}>
          <div className={styles.phoneNavBar} />
          <div className={styles.phonePageContent} />
        </div>
        <div className={styles.phoneBannerSlot}>
          {children}
        </div>
        <div className={styles.phoneBottomNavSlot}>
          <BottomNav contained />
        </div>
      </div>
    </div>
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
