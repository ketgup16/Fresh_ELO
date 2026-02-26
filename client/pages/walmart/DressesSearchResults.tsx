import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Filter, SortingArrows, Grid, ChevronDown, Heart, HeartFill, StarFill, Star, StarHalf } from "@/components/icons";
import { SparklesIcon } from "@/components/icons-custom";
import { BottomNav } from "@/components/walmart/BottomNav";
import { Button } from "@/components/ui/Button";

const FILTER_CHIPS = ['In-store', 'Size', 'Color', 'Brand', 'Price', 'Customer rating'] as const;

interface DressProduct {
  name: string;
  price: string;
  cents: string;
  wasPrice?: string;
  flag?: string;
  flagColor?: string;
  rating: number;
  ratingCount: string;
  image: string;
  pickup?: string;
}

const DRESS_PRODUCTS: DressProduct[] = [
  {
    name: "Time and Tru Women's Sleeveless Tiered Maxi Dress",
    price: "18",
    cents: "98",
    rating: 4.4,
    ratingCount: "1,247",
    image: "https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F4b7f2d27b5e7432fa6f5c9c16e80e3b2?format=webp&width=400",
    pickup: "Tomorrow",
  },
  {
    name: "Sofia Jeans Women's Knit Midi Dress with Flutter Sleeves",
    price: "24",
    cents: "98",
    flag: "Best seller",
    flagColor: "#0E002E",
    rating: 4.6,
    ratingCount: "3,892",
    image: "https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F4b7f2d27b5e7432fa6f5c9c16e80e3b2?format=webp&width=400",
    pickup: "2 pm",
  },
  {
    name: "Scoop Women's Printed Mesh Maxi Dress",
    price: "34",
    cents: "00",
    wasPrice: "$48.00",
    flag: "Rollback",
    flagColor: "#EA1100",
    rating: 4.2,
    ratingCount: "856",
    image: "https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F4b7f2d27b5e7432fa6f5c9c16e80e3b2?format=webp&width=400",
  },
  {
    name: "Free Assembly Women's Square Neck Mini Dress",
    price: "22",
    cents: "00",
    rating: 4.1,
    ratingCount: "421",
    image: "https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F4b7f2d27b5e7432fa6f5c9c16e80e3b2?format=webp&width=400",
    pickup: "2 pm",
  },
  {
    name: "The Pioneer Woman Smocked Bodice Dress",
    price: "28",
    cents: "50",
    rating: 4.7,
    ratingCount: "2,103",
    image: "https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F4b7f2d27b5e7432fa6f5c9c16e80e3b2?format=webp&width=400",
    pickup: "Tomorrow",
  },
  {
    name: "No Boundaries Juniors Ribbed Bodycon Dress",
    price: "12",
    cents: "98",
    flag: "Best seller",
    flagColor: "#0E002E",
    rating: 4.3,
    ratingCount: "5,612",
    image: "https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F4b7f2d27b5e7432fa6f5c9c16e80e3b2?format=webp&width=400",
    pickup: "2 pm",
  },
];

function RatingStars({ rating, count }: { rating: number; count: string }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<StarFill key={i} className="w-3 h-3 text-[#FFC220]" />);
    } else if (i - rating < 1 && i - rating > 0) {
      stars.push(<StarHalf key={i} className="w-3 h-3 text-[#FFC220]" />);
    } else {
      stars.push(<Star key={i} className="w-3 h-3 text-[#E0E0E0]" />);
    }
  }
  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-[1px]">{stars}</div>
      <span className="text-[12px] text-muted-foreground">{count}</span>
    </div>
  );
}

function DressGridCard({ product }: { product: DressProduct }) {
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <div className="border border-border rounded-2xl shadow-sm overflow-hidden">
      <div className="h-[220px] relative bg-gray-50 flex items-center justify-center">
        {product.flag && (
          <div className="absolute top-2 left-2 z-10">
            <div style={{ backgroundColor: product.flagColor || '#0E002E' }} className="px-2 py-0.5 rounded text-[11px] font-bold text-white">
              {product.flag}
            </div>
          </div>
        )}
        <button
          className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-white shadow flex items-center justify-center"
          onClick={() => setIsFavorited(!isFavorited)}
          aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorited ? <HeartFill className="w-4 h-4 text-[#E11900]" /> : <Heart className="w-4 h-4 text-muted-foreground" />}
        </button>
        <img src={product.image} alt={product.name} className="w-[160px] h-[200px] object-contain" />
      </div>
      <div className="p-2">
        <div className="text-[20px] font-bold leading-5 mb-1">
          {product.wasPrice ? (
            <>
              <span className="text-[14px] align-top text-[var(--ld-semantic-color-text-accent-green,#2A8703)]">Now $</span>
              <span className="text-[var(--ld-semantic-color-text-accent-green,#2A8703)]">{product.price}</span>
              <span className="text-[14px] align-top text-[var(--ld-semantic-color-text-accent-green,#2A8703)]">{product.cents}</span>
              {' '}<span className="text-[14px] text-muted-foreground line-through">{product.wasPrice}</span>
            </>
          ) : (
            <>
              <span className="text-[14px] align-top">$</span>{product.price}
              <span className="text-[14px] align-top">{product.cents}</span>
            </>
          )}
        </div>
        <p className="text-[14px] text-foreground line-clamp-2 mb-1">{product.name}</p>
        <RatingStars rating={product.rating} count={product.ratingCount} />
        {product.pickup && (
          <p className="text-[12px] text-foreground mt-1">
            Pickup <span className="font-bold">{product.pickup}</span>
          </p>
        )}
        <Button variant="primary" size="small" className="w-full mt-2">Add to cart</Button>
      </div>
    </div>
  );
}

export default function DressesSearchResults() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'shop' | 'heart' | 'user'>('shop');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev =>
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  return (
    <div className="min-h-screen bg-white font-sans max-w-[430px] mx-auto relative pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white">
        <div className="flex items-center gap-1 px-4 pb-3 pt-2">
          <Button
            variant="tertiary"
            size="small"
            onClick={() => navigate('/')}
            className="flex-shrink-0 !p-0 !h-auto"
            aria-label="Go back"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <div className="flex-1">
            <div className="border-2 border-[var(--ld-semantic-color-action-fill-primary,#0071DC)] rounded-full">
              <div className="bg-white rounded-full px-3 py-2 flex items-center gap-2 h-[42px]">
                <div className="w-6 h-6 flex-shrink-0">
                  <SparklesIcon />
                </div>
                <span className="flex-1 text-foreground text-[16px] truncate">dresses for women</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-border overflow-x-auto scrollbar-hide">
        <button className="flex-shrink-0 w-8 h-8 rounded-full border border-border flex items-center justify-center" aria-label="All filters">
          <Filter className="w-4 h-4" />
        </button>
        <button className="flex-shrink-0 h-8 px-3 rounded-full border border-border flex items-center gap-1" aria-label="Sort">
          <SortingArrows className="w-4 h-4" />
          <span className="text-[14px]">Sort</span>
        </button>
        <button className="flex-shrink-0 w-8 h-8 rounded-full border border-border flex items-center justify-center" aria-label="Grid view">
          <Grid className="w-4 h-4" />
        </button>
        {FILTER_CHIPS.map((chip) => {
          const isActive = activeFilters.includes(chip);
          return (
            <button
              key={chip}
              onClick={() => toggleFilter(chip)}
              className={`flex-shrink-0 h-8 px-3 rounded-full flex items-center gap-1 ${isActive ? 'bg-foreground text-white border border-foreground' : 'border border-border'}`}
            >
              <span className="text-[14px]">{chip}</span>
              <ChevronDown className="w-3 h-3" />
            </button>
          );
        })}
      </div>

      {/* Results count */}
      <div className="px-3 py-2 border-b border-border">
        <p className="text-[14px] text-muted-foreground">1,000+ results for "dresses for women"</p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-3 p-3">
        {DRESS_PRODUCTS.map((product, i) => (
          <DressGridCard key={i} product={product} />
        ))}
      </div>

      {/* Load more */}
      <div className="px-3 pb-6">
        <Button variant="secondary" size="medium" className="w-full">Load more results</Button>
      </div>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
