import { AddToCart } from "@/components/walmart/AddToCart";

export interface CarouselProductCardProps {
  image: string;
  price: string;
  cents: string;
  idx: number;
  onQuantityChange: (idx: number, qty: number) => void;
}

export function CarouselProductCard({
  image,
  price,
  cents,
  idx,
  onQuantityChange,
}: CarouselProductCardProps) {
  return (
    <div className="bg-white rounded-lg p-2 flex flex-col items-end">
      <img
        src={image}
        alt="Product"
        className="w-full h-[124px] object-cover rounded self-stretch"
      />
      <div className="mt-2 flex items-baseline self-start">
        <span className="text-[12px] font-bold">$</span>
        <span className="text-[18px] font-bold">{price}</span>
        <span className="text-[12px] font-bold">{cents}</span>
      </div>
      <div className="mt-2">
        <AddToCart onQuantityChange={(qty) => onQuantityChange(idx, qty)} />
      </div>
    </div>
  );
}
