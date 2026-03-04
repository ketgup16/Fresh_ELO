import { useNavigate } from "react-router-dom";
import { ResponsiveLayout } from "@/components/walmart/ResponsiveLayout";
import { Button } from "@/components/ui/Button";
import { SearchResultsHeader } from "@/components/walmart/SearchResultsHeader";
import { SearchFilterBar } from "@/components/walmart/SearchFilterBar";
import { ProductCardGrid, ProductCardGridProps } from "@/components/walmart/ProductCardGrid";

const FILTER_CHIPS = ['In-store', 'Size', 'Color', 'Brand', 'Price', 'Customer rating'] as const;

const DRESS_PRODUCTS: ProductCardGridProps[] = [
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
    flagVariant: 'default',
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
    flagVariant: 'red',
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
    flagVariant: 'default',
    rating: 4.3,
    ratingCount: "5,612",
    image: "https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F4b7f2d27b5e7432fa6f5c9c16e80e3b2?format=webp&width=400",
    pickup: "2 pm",
  },
];

export default function DressesSearchResults() {
  const navigate = useNavigate();

  return (
    <ResponsiveLayout maxWidth="full" showMobileTopNav={false}>
      <div className="bg-white font-sans">
        <SearchResultsHeader query="dresses for women" onBack={() => navigate('/walmart')} />
        <SearchFilterBar chips={FILTER_CHIPS} />

        {/* Results count */}
        <div className="px-3 py-2 border-b border-border">
          <p className="text-[14px] text-muted-foreground">1,000+ results for "dresses for women"</p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-3 p-3">
          {DRESS_PRODUCTS.map((product, i) => (
            <ProductCardGrid key={i} {...product} />
          ))}
        </div>

        {/* Load more */}
        <div className="px-3 pb-6">
          <Button variant="secondary" size="medium" isFullWidth>Load more results</Button>
        </div>
      </div>
    </ResponsiveLayout>
  );
}
