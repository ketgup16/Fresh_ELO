import { Button } from "@/components/ui/Button";

const PRODUCTS = [
  { flag: 'Deal', flagVariant: 'default', price: '1,179', cents: '00', wasPrice: '$2,499.00', name: 'SAMSUNG 55" Class S90C OLED 4K Smart TV QN55S90CAFXZA 2023', cue: 'TV with bright screen', rating: '500', pickup: '2 pm', stock: 'Only 6 left' },
  { flag: 'Rollback', flagVariant: 'red', price: '498', cents: '00', wasPrice: '$699.99', name: 'LG 55" Class QNED 4K LED QNED85T series TV with webOS 24', cue: 'TV with bright screen', rating: '151', pickup: '2 pm', stock: '' },
];

export function MoreProductListings() {
  return (
    <div className="flex flex-col border-t-8 border-[var(--ld-semantic-color-fill-subtle)]">
      {PRODUCTS.map((product, i) => (
        <div key={i} className="flex gap-3 px-2 py-3 border-b border-border">
          <div className="w-[173px] h-[233px] flex-shrink-0 relative rounded-l-lg">
            {product.flag && (
              <div className="absolute top-1 left-2 z-10">
                <div style={{ backgroundColor: product.flagVariant === 'red' ? 'var(--ld-semantic-color-text-negative)' : 'var(--ld-semantic-color-fill-inverse)' }} className="px-2 py-1 rounded text-[12px] font-bold" style={{ color: 'var(--ld-semantic-color-text-inverse)' }}>
                  {product.flag}
                </div>
              </div>
            )}
            <div className="relative">
              <img src="https://api.builder.io/api/v1/image/assets/TEMP/25805b85ee9b7ab1a9bb9121e0ef8891b372b99b?width=320" alt="TV" className="w-[160px] h-[160px] object-contain mx-auto" />
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <div className="text-[20px] font-bold leading-4">
              <span className="text-[14px] align-top text-[var(--ld-semantic-color-text-accent-green,#2A8703)]">Now $</span>
              <span className="text-[var(--ld-semantic-color-text-accent-green,#2A8703)]">{product.price}</span>
              <span className="text-[14px] align-top text-[var(--ld-semantic-color-text-accent-green,#2A8703)]">{product.cents}</span>
              {' '}<span className="text-[14px] text-muted-foreground line-through">{product.wasPrice}</span>
            </div>
            <div className="text-[14px] text-foreground line-clamp-2">
              <span className="font-extrabold">{product.name.split(' ')[0]}</span> {product.name.split(' ').slice(1).join(' ')}
            </div>
            {product.cue && (
              <div className="flex items-center gap-1">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2L6 6H2L5.5 9L4 13L8 10.5L12 13L10.5 9L14 6H10L8 2Z" fill="var(--ld-semantic-color-rating-fill)"/></svg>
                <span className="text-[12px] text-foreground">{product.cue}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <div className="flex gap-[2px]">
                {[1, 2, 3, 4].map((j) => (
                  <svg key={j} width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1L7.5 4.5L11 5L8.5 7.5L9 11L6 9L3 11L3.5 7.5L1 5L4.5 4.5L6 1Z" fill="var(--ld-semantic-color-rating-fill)"/></svg>
                ))}
              </div>
              <span className="text-[12px] text-muted-foreground">{product.rating}</span>
            </div>
            <div className="text-[12px] text-foreground">
              Free pickup as soon as <span className="font-bold">{product.pickup}</span>
            </div>
            {product.stock && (
              <div className="text-[12px] font-bold" style={{ color: 'var(--ld-semantic-color-text-negative)' }}>{product.stock}</div>
            )}
            <Button variant="primary" size="small" UNSAFE_className="w-[164px]">Add to cart</Button>
          </div>
        </div>
      ))}
    </div>
  );
}
