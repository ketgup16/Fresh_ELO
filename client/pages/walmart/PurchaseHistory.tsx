import { Breadcrumb, BreadcrumbItem } from '@/components/ui/Breadcrumb';
import { ResponsiveLayout } from '@/components/walmart/ResponsiveLayout';
import { SkylineBanner } from '@/components/walmart/SkylineBanner';

export default function PurchaseHistory() {
  return (
    <ResponsiveLayout maxWidth="full">
      <div style={{ fontFamily: 'var(--ld-semantic-font-family-sans, sans-serif)', backgroundColor: '#fff' }}>
        {/* Breadcrumbs */}
        <div style={{ padding: '16px 16px 0' }}>
          <Breadcrumb aria-label="Purchase history navigation">
            <BreadcrumbItem href="/account">Account</BreadcrumbItem>
            <BreadcrumbItem isCurrent>Purchase History</BreadcrumbItem>
          </Breadcrumb>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'var(--ld-semantic-color-separator, #E3E4E5)', margin: '8px 0' }} />

        {/* Skyline Banner */}
        <div style={{ padding: '0 16px 16px' }}>
          <SkylineBanner
            logoSrc="https://api.builder.io/api/v1/image/assets/TEMP/b1a26e66a9f2b9c467e29b2c6bb339ed58cbcd54?width=154"
            logoAlt="TANYÉ"
            headline="Enhance your kitchen with top tools"
            subtext="Cook like a pro with the best equipment."
            imageSrc="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F06acd4ee07b146a0b6fdb58c4fa4ed30?format=webp&width=800&height=1200"
            imageAlt="TANYÉ kitchen tools"
          />
        </div>

        {/* Empty state */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '64px 24px', textAlign: 'center' }}>
          <p style={{ fontSize: '20px', fontWeight: 700, color: 'var(--ld-semantic-color-text, #2E2F32)', marginBottom: '8px' }}>
            No purchases yet
          </p>
          <p style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text-subtle, #74767C)', maxWidth: '320px' }}>
            When you place an order on Walmart.com, it will show up here so you can track, return, or buy it again.
          </p>
        </div>
      </div>
    </ResponsiveLayout>
  );
}
