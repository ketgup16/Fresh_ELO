import { useState } from "react";
import { Heart, HeartFill } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { Rating } from "@/components/ui/Rating";

export interface ProductCardGridProps {
  image: string;
  name: string;
  price: string;
  cents: string;
  wasPrice?: string;
  flag?: string;
  flagColor?: string;
  rating: number;
  ratingCount: string;
  pickup?: string;
  onAddToCart?: () => void;
}

export function ProductCardGrid({
  image,
  name,
  price,
  cents,
  wasPrice,
  flag,
  flagColor,
  rating,
  ratingCount,
  pickup,
  onAddToCart,
}: ProductCardGridProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <div className="border border-border rounded-2xl shadow-sm overflow-hidden">
      {/* Image area */}
      <div className="h-[220px] relative bg-gray-50 flex items-center justify-center">
        {flag && (
          <div className="absolute top-2 left-2 z-10">
            <div
              style={{ backgroundColor: flagColor || "#0E002E" }}
              className="px-2 py-0.5 rounded text-[11px] font-bold text-white"
            >
              {flag}
            </div>
          </div>
        )}
        <button
          className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-white shadow flex items-center justify-center"
          onClick={() => setIsFavorited(!isFavorited)}
          aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorited ? (
            <HeartFill className="w-4 h-4 text-[#E11900]" />
          ) : (
            <Heart className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
        <img
          src={image}
          alt={name}
          className="w-[160px] h-[200px] object-contain"
        />
      </div>

      {/* Content */}
      <div className="p-2">
        {/* Price */}
        <div className="text-[20px] font-bold leading-5 mb-1">
          {wasPrice ? (
            <>
              <span className="text-[14px] align-top text-[var(--ld-semantic-color-text-accent-green,#2A8703)]">
                Now $
              </span>
              <span className="text-[var(--ld-semantic-color-text-accent-green,#2A8703)]">{price}</span>
              <span className="text-[14px] align-top text-[var(--ld-semantic-color-text-accent-green,#2A8703)]">
                {cents}
              </span>{" "}
              <span className="text-[14px] text-muted-foreground line-through">{wasPrice}</span>
            </>
          ) : (
            <>
              <span className="text-[14px] align-top">$</span>
              {price}
              <span className="text-[14px] align-top">{cents}</span>
            </>
          )}
        </div>

        <p className="text-[14px] text-foreground line-clamp-2 mb-1">{name}</p>

        <div className="flex items-center gap-1">
          <Rating value={rating} size="small" />
          <span className="text-[12px] text-muted-foreground">{ratingCount}</span>
        </div>

        {pickup && (
          <p className="text-[12px] text-foreground mt-1">
            Pickup <span className="font-bold">{pickup}</span>
          </p>
        )}

        <Button
          variant="primary"
          size="small"
          isFullWidth
          UNSAFE_className="mt-2"
          onClick={onAddToCart}
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
}
