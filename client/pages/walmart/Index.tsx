import { Plus, Pause } from "@/components/icons";
import { CloseIcon } from "@/components/icons-custom";
import { useState } from "react";
import { AddToCart } from "@/components/walmart/AddToCart";
import { Button } from "@/components/ui/Button";
import { Link } from "@/components/ui/Link";
import { IconButton } from "@/components/ui/IconButton";
import { NewArrivalsCarousel } from "@/components/walmart/NewArrivalsCarousel";
import { JumpRightBackIn } from "@/components/walmart/JumpRightBackIn";
import { ResponsiveLayout } from "@/components/walmart/ResponsiveLayout";

export default function Index() {
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

  return (
    <ResponsiveLayout maxWidth="full" showHomeExtras>
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

        {/* Jump right back in — recently viewed products */}
        <JumpRightBackIn />

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

    </ResponsiveLayout>
  );
}
