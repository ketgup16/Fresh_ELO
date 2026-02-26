import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ChevronLeft, Filter, SortingArrows, Grid, ChevronDown, Heart, HeartFill, Star, StarFill, StarHalf } from "@/components/icons";
import { SparklesIcon } from "@/components/icons-custom";
import { ResponsiveLayout } from "@/components/walmart/ResponsiveLayout";
import { Button } from "@/components/ui/Button";
import { FeatureGuideSection } from "./search-results/FeatureGuideSection";
import { KnowTypesSection } from "./search-results/KnowTypesSection";
import { TrendingBrandsSection } from "./search-results/TrendingBrandsSection";
import { PopularByPriceSection } from "./search-results/PopularByPriceSection";
import { MoreProductListings } from "./search-results/MoreProductListings";

const FILTER_CHIPS = ['In-store', 'Top rated', 'Brand', 'Screen size', 'Price', 'Special offers'] as const;

function SearchResultsHeader({ query, onBack }: { query: string; onBack: () => void }) {
  return (
    <div className="sticky top-0 z-50 bg-white">
      <div className="flex items-center gap-1 px-4 pb-3 pt-2">
        <Button
          variant="tertiary"
          size="small"
          onClick={onBack}
          UNSAFE_className="flex-shrink-0 !p-0 !h-auto"
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
              <span className="flex-1 text-foreground text-[16px] truncate">{query || 'TVs'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterBar() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev =>
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  return (
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
  );
}

function AIResultsBanner() {
  return (
    <div className="px-3 py-2 border-b border-border">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 flex-shrink-0">
          <SparklesIcon />
        </div>
        <p className="text-[14px] text-foreground">
          <span className="font-bold">AI-powered results</span> — Showing the best TVs based on your search
        </p>
      </div>
    </div>
  );
}

interface ProductCardProps {
  flag?: string;
  flagColor?: string;
  price: string;
  cents: string;
  wasPrice?: string;
  name: string;
  rating: number;
  ratingCount: string;
  pickup?: string;
  stock?: string;
  image: string;
  cue?: string;
}

function ProductListItem({ flag, flagColor, price, cents, wasPrice, name, rating, ratingCount, pickup, stock, image, cue }: ProductCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <div className="flex gap-3 px-2 py-3 border-b border-border">
      <div className="w-[161px] h-[200px] flex-shrink-0 relative">
        {flag && (
          <div className="absolute top-1 left-1 z-10">
            <div style={{ backgroundColor: flagColor || '#0E002E' }} className="px-2 py-0.5 rounded text-[12px] font-bold text-white">
              {flag}
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
        <img src={image} alt={name} className="w-full h-full object-contain" />
      </div>
      <div className="flex-1 flex flex-col gap-1">
        <div className="text-[20px] font-bold leading-5">
          {wasPrice ? (
            <>
              <span className="text-[14px] align-top text-[var(--ld-semantic-color-text-accent-green,#2A8703)]">Now $</span>
              <span className="text-[var(--ld-semantic-color-text-accent-green,#2A8703)]">{price}</span>
              <span className="text-[14px] align-top text-[var(--ld-semantic-color-text-accent-green,#2A8703)]">{cents}</span>
              {' '}<span className="text-[14px] text-muted-foreground line-through">{wasPrice}</span>
            </>
          ) : (
            <>
              <span className="text-[14px] align-top">$</span>{price}
              <span className="text-[14px] align-top">{cents}</span>
            </>
          )}
        </div>
        <p className="text-[14px] text-foreground line-clamp-2">{name}</p>
        {cue && (
          <div className="flex items-center gap-1">
            <StarFill className="w-4 h-4 text-[#FFC220]" />
            <span className="text-[12px] text-foreground">{cue}</span>
          </div>
        )}
        <RatingStars rating={rating} count={ratingCount} />
        {pickup && (
          <p className="text-[12px] text-foreground">
            Free pickup as soon as <span className="font-bold">{pickup}</span>
          </p>
        )}
        {stock && (
          <p className="text-[12px] font-bold text-[#A20C00]">{stock}</p>
        )}
        <Button variant="primary" size="small" UNSAFE_className="w-[164px] mt-1">Add to cart</Button>
      </div>
    </div>
  );
}

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

const TOP_PRODUCTS: ProductCardProps[] = [
  {
    flag: 'Best seller',
    flagColor: '#0E002E',
    price: '228',
    cents: '00',
    name: 'VIZIO 50" Class V-Series 4K UHD LED Smart TV V4K50M-08',
    rating: 4.5,
    ratingCount: '2,204',
    pickup: '2 pm',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/25805b85ee9b7ab1a9bb9121e0ef8891b372b99b?width=320',
    cue: 'TV with bright screen',
  },
  {
    flag: 'Rollback',
    flagColor: '#EA1100',
    price: '1,396',
    cents: '99',
    wasPrice: '$2,499.00',
    name: 'LG 65" C5 Series 4K UHD OLED evo AI Smart webOS 25 TV',
    rating: 4.3,
    ratingCount: '1,121',
    pickup: '2 pm',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/25805b85ee9b7ab1a9bb9121e0ef8891b372b99b?width=320',
  },
  {
    price: '328',
    cents: '00',
    name: 'Philips 55" Class 144Hz QLED+ 4K UltraHD Google Smart TV',
    rating: 4.6,
    ratingCount: '3,567',
    pickup: '2 pm',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/25805b85ee9b7ab1a9bb9121e0ef8891b372b99b?width=320',
  },
];

export default function SearchResults() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || 'TVs';
  const [activeTab, setActiveTab] = useState<'shop' | 'heart' | 'user'>('shop');

  return (
    <ResponsiveLayout maxWidth="full">
      <div className="bg-white font-sans">
        <SearchResultsHeader query={query} onBack={() => navigate('/walmart')} />
        <FilterBar />
        <AIResultsBanner />

        {/* Top product results */}
        <div className="flex flex-col">
          {TOP_PRODUCTS.map((product, i) => (
            <ProductListItem key={i} {...product} />
          ))}
        </div>

        {/* AI-powered sections */}
        <FeatureGuideSection />
        <KnowTypesSection />
        <TrendingBrandsSection />
        <PopularByPriceSection />

        {/* More products */}
        <MoreProductListings />
      </div>
    </ResponsiveLayout>
  );
}
