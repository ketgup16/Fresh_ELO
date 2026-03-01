import { useRef, useState, useEffect } from "react";
import { InfoCircle as Info } from "@/components/icons";

const useDragScroll = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const handleMouseDown = (e: MouseEvent) => { setIsDragging(true); setStartX(e.pageX - element.offsetLeft); setScrollLeft(element.scrollLeft); element.style.cursor = 'grabbing'; element.style.userSelect = 'none'; };
    const handleMouseMove = (e: MouseEvent) => { if (!isDragging) return; e.preventDefault(); const x = e.pageX - element.offsetLeft; element.scrollLeft = scrollLeft - (x - startX) * 2; };
    const handleMouseUp = () => { setIsDragging(false); element.style.cursor = 'grab'; element.style.userSelect = 'auto'; };
    const handleMouseLeave = () => { if (isDragging) { setIsDragging(false); element.style.cursor = 'grab'; element.style.userSelect = 'auto'; } };
    element.addEventListener('mousedown', handleMouseDown); element.addEventListener('mousemove', handleMouseMove); element.addEventListener('mouseup', handleMouseUp); element.addEventListener('mouseleave', handleMouseLeave);
    element.style.cursor = 'grab';
    return () => { element.removeEventListener('mousedown', handleMouseDown); element.removeEventListener('mousemove', handleMouseMove); element.removeEventListener('mouseup', handleMouseUp); element.removeEventListener('mouseleave', handleMouseLeave); };
  }, [isDragging, startX, scrollLeft]);

  return ref;
};

const TYPE_FILTERS = ['All types', 'Movies', 'Gaming', 'Sports', 'Bright room', 'Outdoor'];

const PRODUCTS = [
  { price: '$1,396', cents: '99', wasPrice: '$2,499.00', name: 'LG 65" C5 Series 4K UHD OLED evo AI Smart webOS 25 TV', rating: '1,121' },
  { price: '$237', cents: '00', wasPrice: '$350.00', name: 'VIZIO 55" Class 4K UHD LED HDR Smart TV (V4K55M-08)', rating: '2,204' },
  { price: '$328', cents: '00', name: 'Philips 55" Class 144Hz QLED+ 4K UltraHD Google Smart TV', rating: '3,567' },
  { price: '$1,197', cents: '99', name: 'SAMSUNG 65" Class QN85D NEO QLED 4K Smart TV 2024', rating: '727' },
];

export function KnowTypesSection() {
  const [selectedType, setSelectedType] = useState('All types');
  const scrollRef = useDragScroll();

  return (
    <div className="px-3 py-4 border-t-8 border-[var(--ld-semantic-color-fill-subtle)]">
      <h2 className="text-[18px] font-bold text-foreground mb-3">Know what types to look for</h2>
      <div ref={scrollRef} className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-3">
        {TYPE_FILTERS.map((filter) => {
          const isActive = selectedType === filter;
          return (
            <button key={filter} onClick={() => setSelectedType(filter)}
              className={`h-[26px] px-4 rounded flex-shrink-0 bg-white ${isActive ? 'border-2 border-foreground' : 'border border-border'}`}>
              <span className={`text-[14px] ${isActive ? 'font-bold' : ''} text-foreground`}>{filter}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {PRODUCTS.map((product, i) => (
          <div key={i} className="border border-border rounded-2xl shadow-sm overflow-hidden">
            <div className="h-[169px] relative bg-gray-50 flex items-center justify-center">
              <img src="https://api.builder.io/api/v1/image/assets/TEMP/25805b85ee9b7ab1a9bb9121e0ef8891b372b99b?width=328" alt="Product" className="w-[164px] h-[164px] object-contain" />
            </div>
            <div className="p-2">
              <div className="text-[20px] font-bold leading-4 mb-1">
                {product.wasPrice ? (
                  <>
                    <span className="text-[14px] align-top text-[var(--ld-semantic-color-text-accent-green)]">Now $</span>
                    <span className="text-[var(--ld-semantic-color-text-accent-green)]">{product.price.replace('$', '')}</span>
                    <span className="text-[14px] align-top text-[var(--ld-semantic-color-text-accent-green)]">{product.cents}</span>
                    {' '}<span className="text-[14px] text-muted-foreground line-through">{product.wasPrice}</span>
                  </>
                ) : (
                  <>
                    <span className="text-[14px] align-top">$</span>{product.price.replace('$', '')}
                    <span className="text-[14px] align-top">{product.cents}</span>
                  </>
                )}
              </div>
              <p className="text-[14px] text-foreground line-clamp-2 mb-1">{product.name}</p>
              <div className="flex items-center gap-1">
                <div className="flex gap-[1px]">
                  {[1, 2, 3, 4].map((j) => (
                    <svg key={j} width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1L7.5 4.5L11 5L8.5 7.5L9 11L6 9L3 11L3.5 7.5L1 5L4.5 4.5L6 1Z" fill="var(--ld-semantic-color-rating-fill)"/></svg>
                  ))}
                </div>
                <span className="text-[12px] text-muted-foreground">{product.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end items-center gap-1 mt-2">
        <span className="text-[12px] text-muted-foreground">Generated by AI</span>
        <Info className="w-4 h-4 text-muted-foreground" />
      </div>
    </div>
  );
}
