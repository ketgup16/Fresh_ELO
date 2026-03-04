import { WCPFlag, WCPFlagVariant } from '@/components/walmart/WCPFlag';
import { WCPHeartView } from '@/components/walmart/WCPHeartView';
import styles from './JumpRightBackIn.module.css';

type BadgeType = 'bestseller' | 'deal' | 'popular' | 'rollback';

const BADGE_VARIANT_MAP: Record<BadgeType, WCPFlagVariant> = {
  bestseller: 'savings-bold',
  deal:       'savings-subtle',
  popular:    'confidence-subtle',
  rollback:   'holiday-restricted',
};

interface ProductCard {
  image: string;
  name: string;
  price: string;
  cents: string;
  originalPrice?: string;
  pricePrefix?: string;
  priceSuffix?: string;
  badge?: { label: string; type: BadgeType };
}

interface Category {
  title: string;
  products: ProductCard[];
}

const CATEGORIES: Category[] = [
  {
    title: 'Trending',
    products: [
      {
        image: 'https://images.pexels.com/photos/4526407/pexels-photo-4526407.jpeg?auto=compress&cs=tinysrgb&w=400',
        name: 'Apple AirPods Pro (2nd gen...',
        price: '169',
        cents: '98',
        originalPrice: '$200.00',
        pricePrefix: 'Now',
        priceSuffix: '/mo',
        badge: { label: 'Best seller', type: 'bestseller' },
      },
      {
        image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F76799b694af64d83b9b3b50899122d31?format=webp&width=400',
        name: 'Ninja 4 Qt Air Fryer,...',
        price: '98',
        cents: '00',
        badge: { label: 'Best seller', type: 'bestseller' },
      },
      {
        image: 'https://images.pexels.com/photos/5552789/pexels-photo-5552789.jpeg?auto=compress&cs=tinysrgb&w=400',
        name: 'Roku 50" LED TV',
        price: '98',
        cents: '00',
        priceSuffix: '/month',
      },
      {
        image: 'https://images.pexels.com/photos/15378702/pexels-photo-15378702.jpeg?auto=compress&cs=tinysrgb&w=400',
        name: 'Huffy 26" Rock Cree...',
        price: '98',
        cents: '00',
        badge: { label: 'Best seller', type: 'bestseller' },
      },
    ],
  },
  {
    title: "Fashion you'll love",
    products: [
      {
        image: 'https://images.pexels.com/photos/29342144/pexels-photo-29342144.jpeg?auto=compress&cs=tinysrgb&w=400',
        name: 'Athletic Works Wome...',
        price: '169',
        cents: '98',
        originalPrice: '$200.00',
        pricePrefix: 'Now',
        priceSuffix: '/mo',
        badge: { label: 'Best seller', type: 'bestseller' },
      },
      {
        image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F41dc697ee50b4098a4ac8ba96724ac9f?format=webp&width=400',
        name: 'Cate & Chloe Bianca...',
        price: '98',
        cents: '00',
        badge: { label: 'Best seller', type: 'bestseller' },
      },
      {
        image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F02fc08bef9c64656a4919c63856d18d3?format=webp&width=400',
        name: 'GAEKEAO Hobo Ba...',
        price: '98',
        cents: '00',
        badge: { label: 'Popular pick', type: 'popular' },
      },
      {
        image: 'https://images.pexels.com/photos/12456275/pexels-photo-12456275.jpeg?auto=compress&cs=tinysrgb&w=400',
        name: 'Marc Jacobs Daisy E...',
        price: '98',
        cents: '00',
        badge: { label: 'Popular pick', type: 'popular' },
      },
    ],
  },
  {
    title: 'Electronics',
    products: [
      {
        image: 'https://images.pexels.com/photos/17722438/pexels-photo-17722438.jpeg?auto=compress&cs=tinysrgb&w=400',
        name: 'Meta Quest 3S 128GB...',
        price: '169',
        cents: '98',
        originalPrice: '$200.00',
        pricePrefix: 'Now',
        badge: { label: 'Deal', type: 'deal' },
      },
      {
        image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F2d34c91ece114a9d8e01874fe760a211?format=webp&width=400',
        name: 'Apple Pro headpho...',
        price: '98',
        cents: '00',
        badge: { label: 'Best seller', type: 'bestseller' },
      },
      {
        image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F053216ef029147acabcd42fa64d1d7a9?format=webp&width=400',
        name: 'Apple iPad Pro Seri...',
        price: '98',
        cents: '00',
      },
      {
        image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F5b4e2ea15067468ebd127ed5466ee538?format=webp&width=400',
        name: 'Vivitar Popnap Digi...',
        price: '98',
        cents: '00',
      },
    ],
  },
  {
    title: 'Up to 40% off home',
    products: [
      {
        image: 'https://images.pexels.com/photos/2611817/pexels-photo-2611817.jpeg?auto=compress&cs=tinysrgb&w=400',
        name: 'Beautiful 12 Piece Dinner...',
        price: '169',
        cents: '98',
        originalPrice: '$200.00',
        pricePrefix: 'Now',
        badge: { label: 'Rollback', type: 'rollback' },
      },
      {
        image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F07e944dd2447417fae9c7d6959ad062c?format=webp&width=400',
        name: 'Active Noise...',
        price: '98',
        cents: '00',
      },
      {
        image: 'https://images.pexels.com/photos/27378849/pexels-photo-27378849.jpeg?auto=compress&cs=tinysrgb&w=400',
        name: 'Marc Jacobs Daisy E...',
        price: '98',
        cents: '00',
        badge: { label: 'Best seller', type: 'bestseller' },
      },
      {
        image: 'https://images.pexels.com/photos/31410610/pexels-photo-31410610.jpeg?auto=compress&cs=tinysrgb&w=400',
        name: 'Ecetana Slipp...',
        price: '98',
        cents: '00',
        badge: { label: 'Best seller', type: 'bestseller' },
      },
    ],
  },
];

function ProductTile({ product }: { product: ProductCard }) {
  return (
    <div className={styles.productTile}>
      <div className={styles.imageWrapper}>
        {product.badge && (
          <div className={styles.flagWrap}>
            <WCPFlag
              label={product.badge.label}
              variant={BADGE_VARIANT_MAP[product.badge.type]}
            />
          </div>
        )}
        <img src={product.image} alt={product.name} className={styles.productImage} />
        <div className={styles.heartWrap}>
          <WCPHeartView size="small" calloutPosition="left" />
        </div>
      </div>
      <div className={styles.productBody}>
        <div className={[styles.priceRow, product.pricePrefix ? styles.priceRowSavings : ''].filter(Boolean).join(' ')}>
          {product.pricePrefix && (
            <span className={styles.pricePrefix}>{product.pricePrefix} </span>
          )}
          <span className={styles.price}>
            <sup className={styles.priceDollar}>$</sup>
            {product.price}
            <sup className={styles.priceCents}>{product.cents}</sup>
          </span>
          {product.priceSuffix && (
            <span className={styles.priceSuffix}>{product.priceSuffix}</span>
          )}
        </div>
        {product.originalPrice && (
          <div className={styles.originalPrice}>{product.originalPrice}</div>
        )}
        <p className={styles.productName}>{product.name}</p>
      </div>
    </div>
  );
}

export function JumpRightBackIn() {
  return (
    <section className={styles.section}>
      <div className={styles.headerRow}>
        <h2 className={styles.heading}>Jump right back in</h2>
        <a href="#" className={styles.viewAll}>View all</a>
      </div>
      <div className={styles.scrollRow}>
        {CATEGORIES.map((category) => (
          <div key={category.title} className={styles.categoryCard}>
            <div className={styles.categoryHeader}>
              <span className={styles.categoryTitle}>{category.title}</span>
              <a href="#" className={styles.shopAll}>Shop all</a>
            </div>
            <div className={styles.productGrid}>
              {category.products.map((product, i) => (
                <ProductTile key={i} product={product} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
