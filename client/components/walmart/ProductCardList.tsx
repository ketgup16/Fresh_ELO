import { useState } from "react";
import { Heart, HeartFill } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { Rating } from "@/components/ui/Rating";

export interface ProductCardListProps {
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
  stock?: string;
  cue?: string;
  brand?: string;
  unitPrice?: string;
  ebt?: boolean;
  onAddToCart?: () => void;
}

export function ProductCardList({
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
  stock,
  cue,
  brand,
  unitPrice,
  ebt,
  onAddToCart,
}: ProductCardListProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <div className="flex gap-3 px-2 py-3 border-b border-border">
      {/* Image column */}
      <div className="w-[148px] h-[190px] flex-shrink-0 relative">
        {flag && (
          <div className="absolute top-1 left-1 z-10">
            <div
              style={{ backgroundColor: flagColor || "#0E002E" }}
              className="px-2 py-0.5 rounded text-[11px] font-bold text-white"
            >
              {flag}
            </div>
          </div>
        )}
        <button
          className="absolute top-1 right-1 z-10 w-7 h-7 rounded-full bg-white shadow flex items-center justify-center"
          onClick={() => setIsFavorited(!isFavorited)}
          aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorited ? (
            <HeartFill className="w-4 h-4 text-[#E11900]" />
          ) : (
            <Heart className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
        <img src={image} alt={name} className="w-full h-full object-contain" />
      </div>

      {/* Content column */}
      <div className="flex-1 flex flex-col gap-1">
        {/* Price */}
        <div className="text-[20px] font-bold leading-5">
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

        {unitPrice && (
          <p className="text-[12px] text-muted-foreground">{unitPrice}</p>
        )}

        <p className="text-[14px] text-foreground line-clamp-2">{name}</p>

        {cue && (
          <p className="text-[12px] text-foreground">{cue}</p>
        )}

        <div className="flex items-center gap-1">
          <Rating value={rating} size="small" />
          <span className="text-[12px] text-muted-foreground">{ratingCount}</span>
        </div>

        {ebt && (
          <span className="text-[12px] text-[var(--ld-semantic-color-text-accent-green,#2A8703)] font-bold">
            EBT eligible
          </span>
        )}

        {pickup && (
          <p className="text-[12px] text-foreground">
            Pickup <span className="font-bold">{pickup}</span>
          </p>
        )}

        {stock && (
          <p className="text-[12px] font-bold text-[#A20C00]">{stock}</p>
        )}

        <Button
          variant="primary"
          size="small"
          UNSAFE_className="w-[164px] mt-1"
          onClick={onAddToCart}
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
}
