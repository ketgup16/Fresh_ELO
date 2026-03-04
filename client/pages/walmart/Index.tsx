import { Pause } from "@/components/icons";
import { useState } from "react";
import { NewArrivalsCarousel } from "@/components/walmart/NewArrivalsCarousel";
import { JumpRightBackIn } from "@/components/walmart/JumpRightBackIn";
import { ResponsiveLayout } from "@/components/walmart/ResponsiveLayout";
import { OrderStatusCard } from "@/components/walmart/OrderStatusCard";
import { ActiveCurbsideCard } from "@/components/walmart/ActiveCurbsideCard";
import { CarouselProductCard } from "@/components/walmart/CarouselProductCard";
import { PRODUCT_IMAGES } from "@/components/walmart/productImages";

interface CarouselItem {
  img: string;
  price: string;
  cents: string;
  idx: number;
}

const GROCERY_ITEMS: CarouselItem[] = [
  { img: PRODUCT_IMAGES.airFryer, price: '9', cents: '00', idx: 0 },
  { img: PRODUCT_IMAGES.rattanCabinet, price: '7', cents: '00', idx: 1 },
  { img: PRODUCT_IMAGES.digitalCamera, price: '11', cents: '00', idx: 2 },
  { img: PRODUCT_IMAGES.tablet, price: '9', cents: '49', idx: 3 },
];

const ANIMAL_PRINT_ITEMS: CarouselItem[] = [
  { img: PRODUCT_IMAGES.leatherHandbag, price: '199', cents: '00', idx: 4 },
  { img: PRODUCT_IMAGES.blackCardigan, price: '79', cents: '00', idx: 5 },
  { img: PRODUCT_IMAGES.headphones, price: '178', cents: '00', idx: 6 },
  { img: PRODUCT_IMAGES.airFryer, price: '99', cents: '00', idx: 7 },
];

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
      <div className="px-4 pt-6 pb-32 space-y-4">

        {/* Active Curbside Order — countdown + express upgrade */}
        <ActiveCurbsideCard />

        {/* Order Status Card — mobile only, dismissible */}
        <OrderStatusCard
          image="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F5f02b529221349099118d275e7e1d748"
          statusLine="Your order is on the way"
          deliveryLine="Arrives tomorrow by 8pm"
          trackHref="/walmart/purchase-history"
        />

        {/* New Arrivals Carousel */}
        <NewArrivalsCarousel />

        {/* Jump right back in — recently viewed products */}
        <JumpRightBackIn />

        {/* Promo Carousel Container */}
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
                {GROCERY_ITEMS.slice(0, 2).map((item) => (
                  <CarouselProductCard
                    key={item.idx}
                    image={item.img}
                    price={item.price}
                    cents={item.cents}
                    idx={item.idx}
                    onQuantityChange={handleQuantityChange}
                  />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {GROCERY_ITEMS.slice(2).map((item) => (
                  <CarouselProductCard
                    key={item.idx}
                    image={item.img}
                    price={item.price}
                    cents={item.cents}
                    idx={item.idx}
                    onQuantityChange={handleQuantityChange}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Bold Animal Prints Carousel */}
          <div className="relative rounded-lg overflow-hidden h-[543px] min-w-[320px] w-[320px] snap-center flex-shrink-0">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/bd1ca1d98d504c1728ea0b896f93c81704c50bd1?width=640"
              alt="Bold animal prints background"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 w-10 h-6 bg-white/70 backdrop-blur rounded-full flex items-center justify-center z-10">
              <Pause className="w-4 h-4" />
            </div>
            <div className="absolute top-8 left-4 right-4 z-10">
              <h2 className="text-white text-[48px] leading-[40px] max-w-[230px]">Bold animal prints</h2>
            </div>
            <div className="absolute bottom-4 left-4 right-4 space-y-2 z-10">
              <div className="grid grid-cols-2 gap-2">
                {ANIMAL_PRINT_ITEMS.slice(0, 2).map((item) => (
                  <CarouselProductCard
                    key={item.idx}
                    image={item.img}
                    price={item.price}
                    cents={item.cents}
                    idx={item.idx}
                    onQuantityChange={handleQuantityChange}
                  />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {ANIMAL_PRINT_ITEMS.slice(2).map((item) => (
                  <CarouselProductCard
                    key={item.idx}
                    image={item.img}
                    price={item.price}
                    cents={item.cents}
                    idx={item.idx}
                    onQuantityChange={handleQuantityChange}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </ResponsiveLayout>
  );
}
