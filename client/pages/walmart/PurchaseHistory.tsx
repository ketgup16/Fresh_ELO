import { Breadcrumb, BreadcrumbItem } from '@/components/ui/Breadcrumb';

export default function PurchaseHistory() {
  return (
    <div style={{ fontFamily: 'var(--ld-semantic-font-family-sans, sans-serif)' }}>
      <div style={{ padding: '16px 24px' }}>
        <Breadcrumb aria-label="Purchase history navigation">
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/account">Account</BreadcrumbItem>
          <BreadcrumbItem isCurrent>Purchase History</BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '64px 24px', textAlign: 'center' }}>
        <p style={{ fontSize: '20px', fontWeight: 700, color: 'var(--ld-semantic-color-text, #2E2F32)', marginBottom: '8px' }}>
          No purchases yet
        </p>
        <p style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text-subtle, #74767C)', maxWidth: '320px' }}>
          When you place an order on Walmart.com, it will show up here so you can track, return, or buy it again.
        </p>
      </div>
    </div>
  );
}
