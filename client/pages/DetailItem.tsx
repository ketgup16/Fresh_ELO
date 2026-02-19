import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MastHead } from '@/components/ui/MastHead';
import { AppSidebar } from '@/components/ui/AppSidebar';
import type { SidebarMenuItem } from '@/components/ui/AppSidebar';
import { Button } from '@/components/ui/Button';
import { LinkButton } from '@/components/ui/LinkButton';
import { Tag } from '@/components/ui/Tag';
import { Rating } from '@/components/ui/Rating';
import { Card } from '@/components/ui/Card';
import { CardContent } from '@/components/ui/CardContent';
import { Divider } from '@/components/ui/Divider';
import { Breadcrumb, BreadcrumbItem } from '@/components/ui/Breadcrumb';
import {
  Home,
  ListBox,
  Tag as TagIcon,
  Cart,
  BoxSpark,
  CreditCard,
  Speedometer,
  BarGraph,
  Rocket,
  TargetArrow,
  Services,
  ArrowLeft,
  ChevronRight,
  ChevronDown,
  CheckCircle,
  CheckCircleFill,
  Warning,
  WarningFill,
  ExclamationCircleFill,
  MoreHorizontal,
  ExternalLink,
  Clipboard,
} from '@/components/icons';
import styles from '@/styles/detailItem.module.css';

const menuItems: SidebarMenuItem[] = [
  { id: 'home', label: 'Home', Icon: Home, route: '/' },
  { id: 'catalog', label: 'Catalog', Icon: ListBox, route: '/catalog' },
  { id: 'pricing', label: 'Pricing', Icon: TagIcon },
  { id: 'orders', label: 'Orders', Icon: Cart },
  { id: 'wfs', label: 'WFS', Icon: BoxSpark },
  { id: 'payments', label: 'Payments', Icon: CreditCard },
  { id: 'performance', label: 'Performance', Icon: Speedometer },
  { id: 'analytics', label: 'Analytics', Icon: BarGraph },
  { id: 'growth', label: 'Growth & Experiments', Icon: Rocket },
  { id: 'advertising', label: 'Advertising', Icon: TargetArrow },
  { id: 'apps', label: 'Apps', Icon: Services },
];

type View = 'detail-item' | 'detail-form';

export default function DetailItem() {
  const [view, setView] = useState<View>('detail-item');
  const navigate = useNavigate();

  return (
    <div className={styles.root}>
      <MastHead currentSolution="Detail Item" />

      <div className={styles.appRow}>
        <AppSidebar menuItems={menuItems} />

        <main className={styles.main}>
          {view === 'detail-item' ? (
            <DetailItemView onNavigateToForm={() => setView('detail-form')} />
          ) : (
            <DetailFormView onBack={() => setView('detail-item')} />
          )}
        </main>
      </div>
    </div>
  );
}

/* ─── Detail Item View ─── */

type SectionStatus = 'complete' | 'warning' | 'error' | 'incomplete';

interface Section {
  id: string;
  title: string;
  status: SectionStatus;
  defaultOpen: boolean;
}

const sections: Section[] = [
  { id: '1', title: 'Primary section', status: 'complete', defaultOpen: false },
  { id: '2', title: 'Primary section', status: 'complete', defaultOpen: false },
  { id: '3', title: 'Primary section', status: 'warning', defaultOpen: true },
  { id: '4', title: 'Primary section', status: 'error', defaultOpen: true },
  { id: '5', title: 'Primary section', status: 'incomplete', defaultOpen: true },
  { id: '6', title: 'Primary section', status: 'incomplete', defaultOpen: true },
];

function DetailItemView({ onNavigateToForm }: { onNavigateToForm: () => void }) {
  const [openSections, setOpenSections] = useState<Set<string>>(
    new Set(sections.filter((s) => s.defaultOpen).map((s) => s.id))
  );

  const toggle = (id: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className={styles.pageInner}>
      {/* Page header */}
      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderContainer}>
          <Breadcrumb>
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            <BreadcrumbItem isCurrent>Detail form</BreadcrumbItem>
          </Breadcrumb>
          <div className={styles.titleRow}>
            <button className={styles.backBtn} onClick={onNavigateToForm} aria-label="Back">
              <ArrowLeft style={{ width: 20, height: 20 }} />
            </button>
            <h1 className={styles.pageTitle}>Detail item</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={styles.contentArea}>
        <div className={styles.contentContainer}>
          {/* Primary column */}
          <div className={styles.primaryColumn}>
            {sections.map((section) => (
              <CollapsibleSection
                key={section.id}
                section={section}
                isOpen={openSections.has(section.id)}
                onToggle={() => toggle(section.id)}
              />
            ))}
          </div>

          {/* Secondary column */}
          <div className={styles.secondaryColumn}>
            <ListingPreviewCard />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Collapsible Section ─── */

function CollapsibleSection({
  section,
  isOpen,
  onToggle,
}: {
  section: Section;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={styles.sectionCard}>
      <button className={styles.sectionHeader} onClick={onToggle} aria-expanded={isOpen}>
        <span className={styles.sectionChevron}>
          {isOpen ? (
            <ChevronDown style={{ width: 20, height: 20 }} />
          ) : (
            <ChevronRight style={{ width: 20, height: 20 }} />
          )}
        </span>
        <span className={styles.sectionTitle}>{section.title}</span>
        <StatusTag status={section.status} />
      </button>

      {isOpen && (
        <div className={styles.sectionBody}>
          <ContentPlaceholder />
        </div>
      )}
    </div>
  );
}

function StatusTag({ status }: { status: SectionStatus }) {
  if (status === 'complete') {
    return (
      <Tag variant="tertiary" color="positive" leading={<CheckCircleFill style={{ width: 16, height: 16 }} />}>
        Complete
      </Tag>
    );
  }
  if (status === 'warning') {
    return (
      <Tag variant="tertiary" color="warning" leading={<WarningFill style={{ width: 16, height: 16 }} />}>
        Warning
      </Tag>
    );
  }
  if (status === 'error') {
    return (
      <Tag variant="tertiary" color="negative" leading={<ExclamationCircleFill style={{ width: 16, height: 16 }} />}>
        Error
      </Tag>
    );
  }
  return (
    <Tag variant="tertiary" color="gray" leading={<CheckCircle style={{ width: 16, height: 16 }} />}>
      Incomplete
    </Tag>
  );
}

function ContentPlaceholder() {
  return (
    <div className={styles.contentPlaceholder}>
      <span className={styles.contentPlaceholderLabel}>Content</span>
    </div>
  );
}

/* ─── Listing Preview Card ─── */

function ListingPreviewCard() {
  return (
    <Card>
      <CardContent>
        <div className={styles.listingPreview}>
          <p className={styles.listingPreviewLabel}>Listing preview</p>
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/1e88dc1099f51ce6b50137341a6af4875348b4b5?width=544"
            alt="Product preview"
            className={styles.listingPreviewImg}
          />
          <div className={styles.listingDetails}>
            <p className={styles.listingBrand}>Brand</p>
            <Tag variant="tertiary" color="gray" style={{ alignSelf: 'flex-start' }}>Primary</Tag>
            <p className={styles.listingProductName}>Product Name</p>
            <div className={styles.listingRating}>
              <Rating value={4.4} size="small" />
              <span className={styles.listingRatingText}>(4.4) 248 reviews</span>
            </div>
            <p className={styles.listingPrice}>$4.96</p>
            <p className={styles.listingOffers}>4 offers from $00.00 - $00.00</p>
            <a
              href="#"
              className={styles.listingLink}
            >
              View on Walmart.com
              <ExternalLink style={{ width: 12, height: 12, marginLeft: 4 }} />
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* ─── Detail Form View ─── */

function DetailFormView({ onBack }: { onBack: () => void }) {
  return (
    <div className={styles.pageInner}>
      {/* Page header */}
      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderContainer}>
          <Breadcrumb>
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            <BreadcrumbItem isCurrent>Detail form</BreadcrumbItem>
          </Breadcrumb>
          <div className={styles.titleRow}>
            <div className={styles.titleLeading}>
              <button className={styles.backBtn} onClick={onBack} aria-label="Back">
                <ArrowLeft style={{ width: 20, height: 20 }} />
              </button>
              <h1 className={styles.pageTitle}>Detail form</h1>
            </div>
            <div className={styles.titleActions}>
              <LinkButton size="medium">Button label</LinkButton>
              <LinkButton size="medium">Button label</LinkButton>
              <Button variant="primary" size="medium">Button label</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={styles.contentArea}>
        <div className={styles.contentContainer}>
          {/* Primary column — forms */}
          <div className={styles.primaryColumn}>
            {/* Address form card */}
            <div className={styles.formCard}>
              <div className={styles.formCardHeader}>
                <h2 className={styles.formCardTitle}>Address</h2>
                <Button variant="secondary" size="small">Button label</Button>
              </div>
              <div className={styles.formBody}>
                <div className={styles.formRow}>
                  <FormField label="First name" value="Jane" />
                  <FormField label="Last name" value="Doe" />
                </div>
                <FormField label="Street address line 1" value="1234 Main Street" fullWidth />
                <FormField label="Street address line 2" value="Apt 123" fullWidth />
                <div className={styles.formRow}>
                  <FormSelect label="State" value="Arkansas" />
                  <FormField label="ZIP code" value="94066" />
                </div>
              </div>
            </div>

            {/* Credit card form card */}
            <div className={styles.formCard}>
              <div className={styles.formCardHeader}>
                <h2 className={styles.formCardTitle}>Credit card info</h2>
                <Button variant="secondary" size="small">Button label</Button>
              </div>
              <div className={styles.formBody}>
                <FormField label="Cardholder name" value="Jane Doe" fullWidth />
                <FormField label="Card number" value="1234 5678 9012 3456" fullWidth />
                <div className={styles.formRow}>
                  <FormField label="Expiry date" value="12/12" />
                  <FormField label="CVC/CVV" value="•••" />
                </div>
              </div>
            </div>
          </div>

          {/* Secondary column */}
          <div className={styles.secondaryColumn}>
            {/* Customer details */}
            <Card>
              <CardContent>
                <div className={styles.secondaryCardHeader}>
                  <h3 className={styles.secondaryCardTitle}>Customer details</h3>
                  <button className={styles.moreBtn} aria-label="More options">
                    <MoreHorizontal style={{ width: 16, height: 16 }} />
                  </button>
                </div>
                <div className={styles.customerDetails}>
                  <p className={styles.customerName}>Gordon Ramsey</p>
                  <p className={styles.customerPhone}>(444) 248-4840*</p>
                  <a href="#" className={styles.customerLink}>Email customer</a>
                </div>
                <Divider />
                <div className={styles.shippingSection}>
                  <h4 className={styles.shippingTitle}>Shipping address</h4>
                  <div className={styles.shippingRow}>
                    <p className={styles.shippingAddress}>
                      123 Pine Ave<br />Bentonville, AR 72712
                    </p>
                    <button className={styles.copyBtn} aria-label="Copy address">
                      <Clipboard style={{ width: 16, height: 16 }} />
                    </button>
                  </div>
                  <p className={styles.shippingCaption}>
                    *Phone number for carrier use only.{' '}
                    <a href="#" className={styles.shippingLink}>
                      Per Walmart Marketplace's Customer Care Policy
                    </a>
                    , unsolicited text messages, emails or telephone calls to customers are prohibited and may result in account suspension.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Secondary section */}
            <Card>
              <CardContent>
                <div className={styles.secondaryCardHeader}>
                  <h3 className={styles.secondaryCardTitle}>Secondary section</h3>
                  <button className={styles.moreBtn} aria-label="More options">
                    <MoreHorizontal style={{ width: 16, height: 16 }} />
                  </button>
                </div>
                <div className={styles.listSection}>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className={styles.listItem}>
                      <span className={styles.listItemText}>List item text</span>
                      <span className={styles.listItemTrailing}>Trailing</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Form field helpers ─── */

function FormField({
  label,
  value,
  fullWidth,
}: {
  label: string;
  value: string;
  fullWidth?: boolean;
}) {
  return (
    <div className={fullWidth ? styles.formFieldFull : styles.formField}>
      <label className={styles.fieldLabel}>{label}</label>
      <input className={styles.fieldInput} defaultValue={value} />
    </div>
  );
}

function FormSelect({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.formField}>
      <label className={styles.fieldLabel}>{label}</label>
      <div className={styles.selectWrapper}>
        <select className={styles.fieldSelect} defaultValue={value}>
          <option>Arkansas</option>
          <option>California</option>
          <option>Texas</option>
          <option>New York</option>
        </select>
        <ChevronDown style={{ width: 16, height: 16, flexShrink: 0, pointerEvents: 'none' }} />
      </div>
    </div>
  );
}
