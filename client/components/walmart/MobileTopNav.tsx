import { useState } from 'react';
import { ChevronDown, ChevronUp, Menu, Search } from '@/components/icons';
import { IconButton } from '@/components/ui/IconButton';
import { CartIcon, LocationIcon, StoreIcon } from '@/components/icons-custom';
import { CameraModal } from '@/components/walmart/CameraModal';
import { DepartmentsDropdown } from '@/components/walmart/DepartmentsDropdown';
import { ServicesDropdown } from '@/components/walmart/ServicesDropdown';
import { MoreLinksDropdown } from '@/components/walmart/MoreLinksDropdown';
import { SubNavButton } from '@/components/walmart/SubNavButton';
import { SearchTypeaheadModal } from '@/pages/walmart/index/SearchTypeaheadModal';
import { useNavigate } from 'react-router-dom';

const mobileSecondaryLinks = [
  { label: 'Get it Fast', path: '/get-it-fast' },
  { label: 'Rollbacks & More', path: '/rollbacks' },
  { label: 'Easter', path: '/easter' },
  { label: 'Pharmacy', path: '/pharmacy' },
  { label: 'New Arrivals', path: '/new-arrivals' },
  { label: 'Dinner Made Easy', path: '/dinner-made-easy' },
  { label: 'Walmart+', path: '/walmart-plus' },
];

interface MobileTopNavProps {
  showHomeExtras?: boolean;
}

export function MobileTopNav({ showHomeExtras = false }: MobileTopNavProps) {
  const navigate = useNavigate();
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [showDeliveryOptions, setShowDeliveryOptions] = useState(false);
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState<'none' | 'shipping' | 'pickup' | 'delivery'>('none');

  return (
    <>
      <div className="sticky top-0 z-50 lg:hidden">
        {/* Top bar: menu, logo, search, cart */}
        <div
          className="px-4 md:px-6 pt-4 pb-3 md:py-4"
          style={{ backgroundColor: 'var(--ld-semantic-color-top-nav-fill)' }}
        >
          <div className="flex items-center gap-3 md:gap-6">
            <IconButton aria-label="Menu" variant="white" size="large" UNSAFE_className="flex-shrink-0">
              <Menu className="w-6 h-6" />
            </IconButton>
            <a href="/walmart" className="flex-shrink-0" aria-label="Walmart Homepage">
              <img
                src="https://i5.walmartimages.com/dfw/63fd9f59-14e2/9d304ce6-96de-4331-b8ec-c5191226d378/v1/spark-icon.svg"
                alt="Walmart"
                className="h-8 w-8 md:h-9 md:w-9"
              />
            </a>
            <div
              className="flex-1 bg-white rounded-full h-[52px] flex items-center px-4 md:px-6 cursor-pointer"
              onClick={() => setShowSearchModal(true)}
            >
              <span className="text-muted-foreground text-[14px] md:text-[16px] flex-1 truncate">
                Search Walmart
              </span>
              <IconButton
                onClick={(e) => { e.stopPropagation(); setShowSearchModal(true); }}
                UNSAFE_className="rounded-full -mr-2"
                style={{ backgroundColor: 'var(--ld-semantic-color-text-brand-bold)' }}
                aria-label="Search"
                variant="ghost"
                size="medium"
              >
                <Search className="text-white" />
              </IconButton>
            </div>
            <CartIcon count={0} price="$0.00" textColor="white" />
          </div>
        </div>

        {/* Pickup or Delivery Banner — homepage only */}
        {showHomeExtras && <div
          className="lg:hidden px-4 pt-2 pb-2"
          style={{ backgroundColor: 'var(--ld-semantic-color-top-nav-fill)' }}
        >
          {!showDeliveryOptions && (
            <button
              onClick={() => setShowDeliveryOptions(true)}
              className="w-full flex items-center justify-between rounded-full px-0 py-2 transition-colors"
            >
              <div className="flex items-center gap-2">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fe96ba70bf20a4d59aede84cfd5b0636c"
                  alt="Global Intent"
                  className="w-[24px] h-[24px] flex-shrink-0 rounded-full"
                />
                <span className="text-white text-[14px] font-semibold">
                  {selectedDeliveryOption === 'none' && 'How do you want your items?'}
                  {selectedDeliveryOption === 'delivery' && 'Delivery | 1213 E Trinity Mills Rd'}
                  {selectedDeliveryOption === 'pickup' && 'Pickup | Carrollton Supercenter'}
                  {selectedDeliveryOption === 'shipping' && 'Shipping | 1213 E Trinity Mills Rd'}
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-white" />
            </button>
          )}

          {showDeliveryOptions && (
            <div className="py-2 space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="text-white text-[14px] font-semibold">How do you want your items?</span>
                <button
                  onClick={() => setShowDeliveryOptions(false)}
                  className="w-6 h-6 flex items-center justify-center"
                >
                  <ChevronUp className="w-4 h-4 text-white" />
                </button>
              </div>

              <div className="flex justify-center gap-6">
                {([
                  { key: 'shipping', label: 'Shipping', icon: '/illustrations/mono-small/fulfillment-shipping.svg' },
                  { key: 'pickup',   label: 'Pickup',   icon: '/illustrations/mono-small/fulfillment-pickup.svg' },
                  { key: 'delivery', label: 'Delivery', icon: '/illustrations/mono-small/fulfillment-delivery.svg' },
                ] as const).map((method) => (
                  <button
                    key={method.key}
                    className="flex flex-col items-center gap-2"
                    onClick={() => { setSelectedDeliveryOption(method.key); setShowDeliveryOptions(false); }}
                  >
                    <div className={`w-[60px] h-[60px] rounded-full bg-white flex items-center justify-center ${selectedDeliveryOption === method.key ? 'ring-2 ring-white/80' : ''}`}>
                      <img src={method.icon} alt={method.label} className="w-10 h-10 object-contain" />
                    </div>
                    <span className="text-white text-[14px] font-extrabold leading-[17px] text-center">{method.label}</span>
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-2 w-full">
                <button className="w-full flex items-center gap-2 p-4 bg-white rounded-lg shadow-[0_-1px_2px_0_rgba(0,0,0,0.1),0_1px_2px_1px_rgba(0,0,0,0.15)]">
                  <LocationIcon className="w-4 h-4 flex-shrink-0" />
                  <span className="flex-1 text-left text-foreground text-[12px] leading-[16px]">
                    1213 E Trinity Mills Rd, Dallas, TX 75220
                  </span>
                </button>
                <button className="w-full flex items-center gap-2 p-4 bg-white rounded-lg shadow-[0_-1px_2px_0_rgba(0,0,0,0.1),0_1px_2px_1px_rgba(0,0,0,0.15)]">
                  <StoreIcon className="w-4 h-4 flex-shrink-0 self-start mt-0.5" />
                  <div className="flex-1 text-left flex flex-col gap-1">
                    <span className="text-foreground text-[12px] font-semibold leading-[16px]">Carrollton Supercenter</span>
                    <span className="text-foreground text-[12px] leading-[16px]">1213 E Trinity Mills Rd, Dallas, TX 75220</span>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>}

        {/* Sub Nav — same components as desktop SubNav, homepage only */}
        {showHomeExtras && <div
          className={`px-4 py-2 flex items-center gap-2 overflow-x-auto scrollbar-hide${showDeliveryOptions ? ' hidden' : ''}`}
          style={{ backgroundColor: 'var(--ld-semantic-color-fill-accent-blue-subtle)' }}
        >
          <div className="flex-shrink-0">
            <DepartmentsDropdown />
          </div>
          <div className="flex-shrink-0">
            <ServicesDropdown />
          </div>
          {mobileSecondaryLinks.map((link) => (
            <SubNavButton
              key={link.label}
              label={link.label}
              href={link.path}
              onClick={(e) => { e.preventDefault(); navigate(link.path); }}
            />
          ))}
          <div className="flex-shrink-0">
            <MoreLinksDropdown />
          </div>
        </div>}
      </div>

      {showSearchModal && (
        <SearchTypeaheadModal
          onClose={() => setShowSearchModal(false)}
          onCameraClick={() => { setShowSearchModal(false); setShowCameraModal(true); }}
        />
      )}

      <CameraModal
        isOpen={showCameraModal}
        onClose={() => setShowCameraModal(false)}
      />
    </>
  );
}
