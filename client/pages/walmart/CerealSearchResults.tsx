import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Filter, SortingArrows, Grid, ChevronDown, Heart, HeartFill, StarFill, Star, StarHalf } from "@/components/icons";
import { SparklesIcon } from "@/components/icons-custom";
import { BottomNav } from "@/components/walmart/BottomNav";
import { Button } from "@/components/ui/Button";

const FILTER_CHIPS = ['In-store', 'EBT eligible', 'Brand', 'Flavor', 'Price', 'Special offers'] as const;

interface CerealProduct {
  name: string;
  brand: string;
  price: string;
  cents: string;
  unitPrice: string;
  wasPrice?: string;
  flag?: string;
  flagColor?: string;
  rating: number;
  ratingCount: string;
  image: string;
  pickup?: string;
  ebt?: boolean;
}

const CEREAL_PRODUCTS: CerealProduct[] = [
  {
    name: "Kellogg's Frosted Flakes, Breakfast Cereal, Original, Family Size, 13.5 oz",
    brand: "Kellogg's",
    price: "3",
    cents: "68",
    unitPrice: "$4.36/lb",
    flag: "Best seller",
    flagColor: "#0E002E",
    rating: 4.7,
    ratingCount: "12,234",
    image: "https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F783f38e6d773461b95706408b1a14434?format=webp&width=400",
    pickup: "2 pm",
    ebt: true,
  },
  {
    name: "General Mills Cheerios Heart Healthy Cereal, Gluten Free, 8.9 oz",
    brand: "General Mills",
    price: "3",
    cents: "98",
    unitPrice: "$7.15/lb",
    rating: 4.6,
    ratingCount: "8,901",
    image: "https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F783f38e6d773461b95706408b1a14434?format=webp&width=400",
    pickup: "2 pm",
    ebt: true,
  },
  {
    name: "Post Honey Bunches of Oats with Almonds Cereal, 18 oz",
    brand: "Post",
    price: "3",
    cents: "48",
    unitPrice: "$3.09/lb",
    flag: "Rollback",
    flagColor: "#EA1100",
    wasPrice: "$4.28",
    rating: 4.5,
    ratingCount: "6,442",
    image: "https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F783f38e6d773461b95706408b1a14434?format=webp&width=400",
    pickup: "Tomorrow",
    ebt: true,
  },
  {
    name: "Kellogg's Froot Loops Breakfast Cereal, Original, 10.1 oz",
    brand: "Kellogg's",
    price: "3",
    cents: "68",
    unitPrice: "$5.83/lb",
    rating: 4.6,
    ratingCount: "9,312",
    image: "https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F783f38e6d773461b95706408b1a14434?format=webp&width=400",
    pickup: "2 pm",
    ebt: true,
  },
  {
    name: "Quaker Oats Cap'n Crunch Cereal, 14 oz",
    brand: "Quaker",
    price: "3",
    cents: "78",
    unitPrice: "$4.32/lb",
    rating: 4.4,
    ratingCount: "4,567",
    image: "https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F783f38e6d773461b95706408b1a14434?format=webp&width=400",
    pickup: "2 pm",
    ebt: true,
  },
  {
    name: "General Mills Cinnamon Toast Crunch Cereal, 12 oz",
    brand: "General Mills",
    price: "3",
    cents: "98",
    unitPrice: "$5.31/lb",
    flag: "Best seller",
    flagColor: "#0E002E",
    rating: 4.8,
    ratingCount: "15,221",
    image: "https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F783f38e6d773461b95706408b1a14434?format=webp&width=400",
    pickup: "2 pm",
    ebt: true,
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

function CerealListItem({ product }: { product: CerealProduct }) {
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <div className="flex gap-3 px-2 py-3 border-b border-border">
      <div className="w-[140px] h-[180px] flex-shrink-0 relative">
        {product.flag && (
          <div className="absolute top-1 left-1 z-10">
            <div style={{ backgroundColor: product.flagColor || '#0E002E' }} className="px-2 py-0.5 rounded text-[11px] font-bold text-white">
              {product.flag}
            </div>
          </div>
        )}
        <button
          className="absolute top-1 right-1 z-10 w-7 h-7 rounded-full bg-white shadow flex items-center justify-center"
          onClick={() => setIsFavorited(!isFavorited)}
          aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorited ? <HeartFill className="w-4 h-4 text-[#E11900]" /> : <Heart className="w-4 h-4 text-muted-foreground" />}
        </button>
        <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
      </div>
      <div className="flex-1 flex flex-col gap-1">
        <div className="text-[20px] font-bold leading-5">
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
        <p className="text-[12px] text-muted-foreground">{product.unitPrice}</p>
        <p className="text-[14px] text-foreground line-clamp-2">{product.name}</p>
        <RatingStars rating={product.rating} count={product.ratingCount} />
        {product.ebt && (
          <span className="text-[12px] text-[var(--ld-semantic-color-text-accent-green,#2A8703)] font-bold">EBT eligible</span>
        )}
        {product.pickup && (
          <p className="text-[12px] text-foreground">
            Pickup <span className="font-bold">{product.pickup}</span>
          </p>
        )}
        <Button variant="primary" size="small" className="w-[164px] mt-1">Add to cart</Button>
      </div>
    </div>
  );
}

export default function CerealSearchResults() {
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
                <span className="flex-1 text-foreground text-[16px] truncate">cereal</span>
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
        <p className="text-[14px] text-muted-foreground">1,000+ results for "cereal"</p>
      </div>

      {/* Product List */}
      <div className="flex flex-col">
        {CEREAL_PRODUCTS.map((product, i) => (
          <CerealListItem key={i} product={product} />
        ))}
      </div>

      {/* Load more */}
      <div className="px-3 py-4">
        <Button variant="secondary" size="medium" className="w-full">Load more results</Button>
      </div>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
