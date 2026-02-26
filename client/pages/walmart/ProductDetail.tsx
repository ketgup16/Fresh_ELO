import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SearchBar } from "@/components/walmart/SearchBar";
import { ChevronLeft, Share, ZoomIn, Play } from "@/components/icons";
import { LocationIcon } from "@/components/icons-custom";
import { ResponsiveLayout } from "@/components/walmart/ResponsiveLayout";
import { Button } from "@/components/ui/Button";

export default function ProductDetail() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState<'shipping' | 'pickup' | 'delivery'>('shipping');
  const [purchaseType, setPurchaseType] = useState<'one-time' | 'subscribe'>('one-time');
  const [count, setCount] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);

  const product = {
    id: productId || '1',
    name: "Kellogg's Frosted Flakes, Breakfast Cereal, Original, Family Size, 13.5 oz",
    brand: "Kellogg's",
    price: 3.68,
    subscribePrice: 3.50,
    images: [
      "https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F783f38e6d773461b95706408b1a14434?format=webp&width=800",
      "https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F8bc0f7dc642445539d23bdc006c6d5cf?format=webp&width=800",
      "https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fb2d031ba9c84489b89975b0dc4953d25?format=webp&width=800",
      "https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fc429f3723e394376af97dec1fb657c6d?format=webp&width=800",
      "https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fcddca7ae59c148588f0d6e520e3f2604?format=webp&width=800"
    ],
    rating: 4.7,
    reviewCount: 12234,
    inStock: true
  };

  const quantities = [
    { count: 1, price: 3.68 },
    { count: 4, price: 14.72 },
    { count: 6, price: 22.08 }
  ];

  const currentQuantity = quantities.find(q => q.count === count) || quantities[0];
  const currentPrice = currentQuantity.price;
  const currentSubscribePrice = currentPrice * 0.95;

  return (
    <ResponsiveLayout maxWidth="full">
      <div className="bg-white font-sans">
      {/* Search Bar - mobile only */}
      <div className="lg:hidden">
        <SearchBar query={product.name} showBackButton={true} cartCount={0} />
      </div>

      {/* Main Content */}
      <div className="pb-24 overflow-y-auto" style={{ height: 'calc(100vh - 64px)' }}>
        {/* Product Images */}
        <div className="relative">
          <img
            src={product.images[selectedImage]}
            alt={product.name}
            className="w-full aspect-square object-contain bg-white p-4"
          />
          <div className="absolute top-4 right-4 flex flex-col gap-3">
            <Button variant="secondary" size="medium" UNSAFE_className="w-12 h-12 !p-0 shadow-md" aria-label="Share">
              <Share className="w-5 h-5" />
            </Button>
            <Button
              variant="secondary" size="medium"
              UNSAFE_className="w-12 h-12 !p-0 shadow-md"
              onClick={() => setIsFavorited(!isFavorited)}
              aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
            >
              <img
                src={isFavorited
                  ? "https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Feee85397b72744b58d1e2d93e0b3347a"
                  : "https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F5a5c1d37a124458d9d01df5d831c9d65"
                }
                alt="" className="w-5 h-5"
              />
            </Button>
            <Button variant="secondary" size="medium" UNSAFE_className="w-12 h-12 !p-0 shadow-md" aria-label="Zoom in">
              <ZoomIn className="w-5 h-5" />
            </Button>
            <Button variant="secondary" size="medium" UNSAFE_className="w-12 h-12 !p-0 shadow-md" aria-label="Play video">
              <Play className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-hide">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg border-2 overflow-hidden ${selectedImage === index ? 'border-primary' : 'border-border'}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Count Selector */}
        <div className="px-4 py-3">
          <div className="text-foreground text-[14px] font-semibold mb-2">Count: {count}</div>
          <div className="flex gap-3">
            {quantities.map((q) => (
              <button
                key={q.count}
                onClick={() => setCount(q.count)}
                className="flex-1 py-4 px-4 transition-colors"
                style={{
                  border: count === q.count ? '3px solid rgba(0, 0, 0, 1)' : '1px solid rgba(186, 187, 190, 1)',
                  borderRadius: '12px',
                }}
              >
                <div className="text-foreground text-[18px] font-bold">{q.count}</div>
                <div className="text-foreground text-[14px] font-semibold">${q.price.toFixed(2)}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="px-4 py-4 space-y-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-foreground text-[28px] font-bold">${currentPrice.toFixed(2)}</span>
              <span className="text-muted-foreground text-[14px]">Price when purchased online</span>
            </div>
            <div className="text-[18px] mt-1" style={{ color: 'var(--ld-semantic-color-text-accent-green)', fontWeight: '500' }}>
              ${currentSubscribePrice.toFixed(2)} when subscribed
            </div>
          </div>

          {/* Subscribe Option */}
          <div className="p-4 space-y-3" style={{ border: '1px solid rgba(186, 187, 190, 1)', borderRadius: '20px' }}>
            <button onClick={() => setPurchaseType('subscribe')} className="w-full flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ border: purchaseType === 'subscribe' ? '8px solid rgb(2, 8, 23)' : '1px solid rgba(0, 0, 0, 1)' }}
                />
                <span className="text-foreground text-[16px] font-semibold">Subscribe to save 5%</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-[16px] font-bold" style={{ color: 'var(--ld-semantic-color-text-accent-green)' }}>${currentSubscribePrice.toFixed(2)}</span>
                <span className="text-muted-foreground text-[14px] line-through">${currentPrice.toFixed(2)}</span>
              </div>
            </button>
          </div>

          {/* One-time Purchase */}
          <button
            onClick={() => setPurchaseType('one-time')}
            className="w-full flex items-center justify-between p-4 transition-colors"
            style={{
              borderRadius: '20px',
              border: purchaseType === 'one-time' ? '2px solid rgb(2, 8, 23)' : '1px solid rgba(186, 187, 190, 1)',
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ border: purchaseType === 'one-time' ? '8px solid rgb(2, 8, 23)' : '1px solid rgba(186, 187, 190, 1)' }}
              />
              <span className="text-foreground text-[16px] font-semibold">One-time purchase</span>
            </div>
            <span className="text-foreground text-[16px] font-bold">${currentPrice.toFixed(2)}</span>
          </button>

          {/* Delivery Options */}
          <div>
            <h3 className="text-foreground text-[16px] font-bold mb-3">How do you want your item?</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { method: 'shipping' as const, label: 'Shipping', desc: 'Arrives Dec 27' },
                { method: 'pickup' as const, label: 'Pickup', desc: 'as soon as 8 pm' },
                { method: 'delivery' as const, label: 'Delivery', desc: 'Today' },
              ].map(({ method, label, desc }) => (
                <button
                  key={method}
                  onClick={() => setSelectedDeliveryMethod(method)}
                  className="p-4 transition-colors"
                  style={{
                    border: selectedDeliveryMethod === method ? '2px solid rgba(0, 0, 0, 1)' : '2px solid rgba(186, 187, 190, 1)',
                    borderRadius: '16px',
                  }}
                >
                  <div className="text-foreground text-[14px] font-semibold mb-1">{label}</div>
                  <div className="text-muted-foreground text-[12px]">{desc}</div>
                  <div className="text-[14px] font-bold mt-1" style={{ color: 'var(--ld-semantic-color-text-accent-green)' }}>Free</div>
                </button>
              ))}
            </div>
          </div>

          {/* Location Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-foreground text-[14px]">
              <LocationIcon width={16} height={16} />
              <span className="font-semibold">Pickup from Bentonville Supercenter</span>
              <span className="text-primary underline cursor-pointer">Aisle E24</span>
            </div>
            <div className="text-muted-foreground text-[14px]">Delivery to Bentonville, 72712</div>
          </div>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-input px-4 py-3 flex gap-3 z-40">
        <Button variant="secondary" size="large" UNSAFE_className="flex-1">Buy now</Button>
        <Button variant="primary" size="large" UNSAFE_className="flex-1">Add to cart</Button>
      </div>
      </div>
    </ResponsiveLayout>
  );
}
