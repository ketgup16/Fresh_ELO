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
        image: '/images/products/airpods-pro.jpeg',
        name: 'Apple AirPods Pro (2nd gen...',
        price: '169',
        cents: '98',
        originalPrice: '$200.00',
        pricePrefix: 'Now',
        priceSuffix: '/mo',
        badge: { label: 'Best seller', type: 'bestseller' },
      },
      {
        image: '/images/products/ninja-air-fryer.jpeg',
        name: 'Ninja 4 Qt Air Fryer,...',
        price: '98',
        cents: '00',
        badge: { label: 'Best seller', type: 'bestseller' },
      },
      {
        image: '/images/products/roku-tv.jpeg',
        name: 'Roku 50" LED TV',
        price: '98',
        cents: '00',
        priceSuffix: '/month',
      },
      {
        image: '/images/products/huffy-bike.jpeg',
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
        image: '/images/products/athletic-sneakers.jpeg',
        name: 'Athletic Works Wome...',
        price: '169',
        cents: '98',
        originalPrice: '$200.00',
        pricePrefix: 'Now',
        priceSuffix: '/mo',
        badge: { label: 'Best seller', type: 'bestseller' },
      },
      {
        image: '/images/products/cate-chloe.jpeg',
        name: 'Cate & Chloe Bianca...',
        price: '98',
        cents: '00',
        badge: { label: 'Best seller', type: 'bestseller' },
      },
      {
        image: '/images/products/gaekeao-hobo.jpeg',
        name: 'GAEKEAO Hobo Ba...',
        price: '98',
        cents: '00',
        badge: { label: 'Popular pick', type: 'popular' },
      },
      {
        image: '/images/products/marc-jacobs-daisy.jpeg',
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
        image: '/images/products/meta-quest.jpeg',
        name: 'Meta Quest 3S 128GB...',
        price: '169',
        cents: '98',
        originalPrice: '$200.00',
        pricePrefix: 'Now',
        badge: { label: 'Deal', type: 'deal' },
      },
      {
        image: '/images/products/airpods-max.jpeg',
        name: 'Apple Pro headpho...',
        price: '98',
        cents: '00',
        badge: { label: 'Best seller', type: 'bestseller' },
      },
      {
        image: '/images/products/ipad-pro.jpeg',
        name: 'Apple iPad Pro Seri...',
        price: '98',
        cents: '00',
      },
      {
        image: '/images/products/vivitar-camera.jpeg',
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
        image: '/images/products/dinnerware-set.jpeg',
        name: 'Beautiful 12 Piece Dinner...',
        price: '169',
        cents: '98',
        originalPrice: '$200.00',
        pricePrefix: 'Now',
        badge: { label: 'Rollback', type: 'rollback' },
      },
      {
        image: '/images/products/wood-frame.jpeg',
        name: 'Active Noise...',
        price: '98',
        cents: '00',
      },
      {
        image: '/images/products/table-lamp.jpeg',
        name: 'Marc Jacobs Daisy E...',
        price: '98',
        cents: '00',
        badge: { label: 'Best seller', type: 'bestseller' },
      },
      {
        image: '/images/products/roomba.jpeg',
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
        <div className={styles.priceRow}>
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
