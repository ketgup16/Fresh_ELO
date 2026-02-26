import { X, ChevronDown, ChevronUp, Plus, Pause, Menu, Search } from "@/components/icons";
import { CartIcon, FulfillmentShippingIcon, LocationIcon, StoreIcon, CloseIcon } from "@/components/icons-custom";
import { CameraModal } from "@/components/walmart/CameraModal";
import { useState, useEffect } from "react";
import { AddToCart } from "@/components/walmart/AddToCart";
import { Button } from "@/components/ui/Button";
import { Link } from "@/components/ui/Link";
import { IconButton } from "@/components/ui/IconButton";
import { NewArrivalsCarousel } from "@/components/walmart/NewArrivalsCarousel";
import { SearchTypeaheadModal } from "./index/SearchTypeaheadModal";

export default function Index() {
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [hasOpenedSearch, setHasOpenedSearch] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [showDeliveryOptions, setShowDeliveryOptions] = useState(false);
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState<'none' | 'shipping' | 'pickup' | 'delivery'>('none');
  const [cartItems, setCartItems] = useState<Record<number, number>>({});

  const handleQuantityChange = (productIndex: number, quantity: number) => {
    setCartItems(prev => {
      if (quantity === 0) {
        const newItems = { ...prev };
        delete newItems[productIndex];
        return newItems;
      }
      return { ...prev, [productIndex]: quantity };
    });
  };

  const handleCameraClick = () => {
    setShowCameraModal(true);
  };

  const handleCameraCapture = (imageData: string) => {
    console.log('Photo captured:', imageData);
  };

  return (
    <div className="min-h-screen bg-white font-sans lg:max-w-none mx-auto relative">
      <div className="sticky top-0 z-50">
        {/* Mobile/Tablet Header */}
        <div className="lg:hidden px-4 md:px-6 pt-4 pb-3 md:py-4" style={{ backgroundColor: 'var(--ld-semantic-color-top-nav-fill)' }}>
          <div className="flex items-center gap-3 md:gap-6">
            <button className="text-white flex-shrink-0" aria-label="Menu">
              <Menu className="w-6 h-6" />
            </button>
            <a href="/walmart" className="flex-shrink-0" aria-label="Walmart Homepage">
              <img
                src="https://i5.walmartimages.com/dfw/63fd9f59-14e2/9d304ce6-96de-4331-b8ec-c5191226d378/v1/spark-icon.svg"
                alt="Walmart"
                className="h-8 w-8 md:h-9 md:w-9"
              />
            </a>
            <div
              className="flex-1 bg-white rounded-full h-[52px] flex items-center px-4 md:px-6 cursor-pointer"
              onClick={() => {
                setShowSearchModal(true);
                setHasOpenedSearch(true);
              }}
            >
              <span className="text-muted-foreground text-[14px] md:text-[16px] flex-1 truncate">Search Walmart</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSearchModal(true);
                  setHasOpenedSearch(true);
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center -mr-1"
                style={{ backgroundColor: 'var(--ld-semantic-color-top-nav-fill-hovered)' }}
                aria-label="Search"
              >
                <Search className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </button>
            </div>
            <CartIcon count={0} price="$0.00" textColor="white" />
          </div>
        </div>

        {/* Pickup or Delivery Banner - Mobile/Tablet */}
        <div className="lg:hidden bg-primary px-4 pt-2 pb-2">
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
                {(['shipping', 'pickup', 'delivery'] as const).map((method) => (
                  <button
                    key={method}
                    className="flex flex-col items-center gap-2"
                    onClick={() => { setSelectedDeliveryOption(method); setShowDeliveryOptions(false); }}
                  >
                    <div className={`w-[60px] h-[60px] rounded-full flex items-center justify-center ${selectedDeliveryOption === method ? 'bg-white/30' : 'bg-white/10'}`}>
                      <FulfillmentShippingIcon className="w-10 h-10" />
                    </div>
                    <span className="text-white text-[14px] font-extrabold leading-[17px] text-center capitalize">{method}</span>
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
        </div>

        {/* Visual Navigation - Mobile/Tablet */}
        <div
          className={`px-4 py-2 flex items-center gap-2 overflow-x-auto scrollbar-hide lg:hidden ${showDeliveryOptions ? 'hidden' : ''}`}
          style={{ backgroundColor: 'var(--ld-semantic-color-fill-accent-blue-subtle)' }}
        >
          <button className="flex-shrink-0 h-8 w-8 flex items-center justify-center bg-white rounded-full transition-all duration-100 hover:opacity-80">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fca32f8144d3e414bafe0be8b4870d869"
              alt="Grid"
              width="20"
              height="20"
            />
          </button>
          {['Get it Fast', 'Rollbacks & More', 'Easter', 'Pharmacy', 'New Arrivals', 'The Baby Event', 'Dinner Made Easy', 'My Items'].map((label) => (
            <button
              key={label}
              className="flex-shrink-0 h-8 px-3 py-1.5 bg-white rounded-full whitespace-nowrap transition-all duration-100 hover:opacity-80"
              style={{
                color: 'var(--ld-semantic-color-top-nav-fill)',
                fontSize: '14px',
                fontWeight: 400
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 pt-6 pb-32 space-y-4">
        {/* Order Status Card — mobile */}
        <div
          className="lg:hidden flex items-center gap-3 p-3 rounded-lg"
          style={{
            background: 'var(--ld-semantic-color-surface, #fff)',
            boxShadow: '0 -1px 2px 0 rgba(0,0,0,0.10), 0 1px 2px 1px rgba(0,0,0,0.15)',
          }}
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F5f02b529221349099118d275e7e1d748"
            alt="Order status"
            className="w-10 h-10 flex-shrink-0"
          />
          <div className="flex-1 flex flex-col gap-0.5">
            <span style={{ fontFamily: 'var(--ld-semantic-font-family-sans, sans-serif)', fontSize: '14px', color: 'var(--ld-semantic-color-text, #2E2F32)' }}>
              Your order is on the way
            </span>
            <span style={{ fontFamily: 'var(--ld-semantic-font-family-sans, sans-serif)', fontSize: '14px', fontWeight: 700, color: 'var(--ld-semantic-color-text, #2E2F32)' }}>
              Arrives tomorrow by 8pm
            </span>
            <Link href="/walmart/purchase-history" variant="default" underline>
              Track
            </Link>
          </div>
          <IconButton aria-label="Dismiss order status" variant="ghost" size="small" UNSAFE_style={{ flexShrink: 0 }}>
            <CloseIcon />
          </IconButton>
        </div>

        {/* New Arrivals Carousel */}
        <NewArrivalsCarousel />

        {/* Carousel Container */}
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide -mx-4 px-4 touch-pan-x">
          {/* Grocery Bag Carousel */}
          <div className="relative rounded-lg overflow-hidden h-[543px] min-w-[320px] w-[320px] snap-center flex-shrink-0">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/c97966cd0f7092344bbece70c4c8a937bf2a51b3?width=638"
              alt="Grocery carousel background"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 w-10 h-6 bg-white/70 backdrop-blur rounded-full flex items-center justify-center z-10">
              <Pause className="w-4 h-4" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2 z-10">
              <div className="grid grid-cols-2 gap-2">
                {[
                  { img: 'https://api.builder.io/api/v1/image/assets/TEMP/bd837058fbddc5901e149fc30b9d42df64f5c469?width=800', price: '9', cents: '00', idx: 0 },
                  { img: 'https://api.builder.io/api/v1/image/assets/TEMP/8a7143f8102e1b6f6b1b897bb77a6eca35110d9e?width=800', price: '7', cents: '00', idx: 1 },
                ].map((item) => (
                  <div key={item.idx} className="bg-white rounded-lg p-2 flex flex-col items-end">
                    <img src={item.img} alt="Product" className="w-full h-[124px] object-cover rounded self-stretch" />
                    <div className="mt-2 flex items-baseline self-start">
                      <span className="text-[12px] font-bold">$</span>
                      <span className="text-[18px] font-bold">{item.price}</span>
                      <span className="text-[12px] font-bold">{item.cents}</span>
                    </div>
                    <div className="mt-2">
                      <AddToCart onQuantityChange={(qty) => handleQuantityChange(item.idx, qty)} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { img: 'https://api.builder.io/api/v1/image/assets/TEMP/323dc30082ef5d7041780a725ebbf4e9d310e7ba?width=800', price: '11', cents: '00', idx: 2 },
                  { img: 'https://api.builder.io/api/v1/image/assets/TEMP/443bdf4d7c71e01c3032f1295a2ffcb0b4edd57d?width=800', price: '9', cents: '49', idx: 3 },
                ].map((item) => (
                  <div key={item.idx} className="bg-white rounded-lg p-2 flex flex-col items-end">
                    <img src={item.img} alt="Product" className="w-full h-[124px] object-cover rounded self-stretch" />
                    <div className="mt-2 flex items-baseline self-start">
                      <span className="text-[12px] font-bold">$</span>
                      <span className="text-[18px] font-bold">{item.price}</span>
                      <span className="text-[12px] font-bold">{item.cents}</span>
                    </div>
                    <div className="mt-2">
                      <AddToCart onQuantityChange={(qty) => handleQuantityChange(item.idx, qty)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bold Animal Prints Carousel */}
          <div className="relative rounded-lg overflow-hidden h-[543px] min-w-[320px] w-[320px] snap-center flex-shrink-0">
            <img src="https://api.builder.io/api/v1/image/assets/TEMP/bd1ca1d98d504c1728ea0b896f93c81704c50bd1?width=640" alt="Bold animal prints background" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute top-4 right-4 w-10 h-6 bg-white/70 backdrop-blur rounded-full flex items-center justify-center z-10">
              <Pause className="w-4 h-4" />
            </div>
            <div className="absolute top-8 left-4 right-4 z-10">
              <h2 className="text-white text-[48px] leading-[40px] max-w-[230px]">Bold animal prints</h2>
            </div>
            <div className="absolute bottom-4 left-4 right-4 space-y-2 z-10">
              <div className="grid grid-cols-2 gap-2">
                {[
                  { img: 'https://api.builder.io/api/v1/image/assets/TEMP/22eb4ceff29b46284693bbf8e8fa100f9d85a82e?width=800', price: '199', cents: '00' },
                  { img: 'https://api.builder.io/api/v1/image/assets/TEMP/d9ee7b238140973cda377ee6e3f49c9037dfcc6d?width=800', price: '79', cents: '00' },
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-lg p-2 flex flex-col items-end">
                    <img src={item.img} alt="Animal print item" className="w-full h-[124px] object-cover rounded self-stretch" />
                    <div className="mt-2 flex items-baseline self-start">
                      <span className="text-[12px] font-bold">$</span><span className="text-[18px] font-bold">{item.price}</span><span className="text-[12px] font-bold">{item.cents}</span>
                    </div>
                    <button className="w-6 h-6 rounded-full border border-black bg-white flex items-center justify-center mt-2"><Plus className="w-3 h-3" /></button>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { img: 'https://api.builder.io/api/v1/image/assets/TEMP/475d5bef94fd5d4f97597ae2c5c56bccddc46514?width=800', price: '178', cents: '00' },
                  { img: 'https://api.builder.io/api/v1/image/assets/TEMP/fd1e2f2ead763dc721242c668c98d4ee72e664a1?width=800', price: '99', cents: '00' },
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-lg p-2 flex flex-col items-end">
                    <img src={item.img} alt="Animal print item" className="w-full h-[124px] object-cover rounded self-stretch" />
                    <div className="mt-2 flex items-baseline self-start">
                      <span className="text-[12px] font-bold">$</span><span className="text-[18px] font-bold">{item.price}</span><span className="text-[12px] font-bold">{item.cents}</span>
                    </div>
                    <button className="w-6 h-6 rounded-full border border-black bg-white flex items-center justify-center mt-2"><Plus className="w-3 h-3" /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSearchModal && (
        <SearchTypeaheadModal
          onClose={() => setShowSearchModal(false)}
          onCameraClick={handleCameraClick}
        />
      )}

      <CameraModal
        isOpen={showCameraModal}
        onClose={() => setShowCameraModal(false)}
        onCapture={handleCameraCapture}
      />
    </div>
  );
}
