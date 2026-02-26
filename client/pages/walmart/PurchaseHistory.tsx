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
            imageSrc="https://images.pexels.com/photos/4113291/pexels-photo-4113291.jpeg?auto=compress&cs=tinysrgb&w=400&h=128&fit=crop"
            imageAlt="TANYÉ chocolate bar"
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
