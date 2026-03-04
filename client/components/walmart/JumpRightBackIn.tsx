import { WCPFlag, WCPFlagVariant } from '@/components/walmart/WCPFlag';
import { WCPHeartView } from '@/components/walmart/WCPHeartView';
import { PRODUCT_IMAGES } from '@/components/walmart/productImages';
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
        image: PRODUCT_IMAGES.headphones,
        name: 'Apple AirPods Pro (2nd gen...',
        price: '169',
        cents: '98',
        originalPrice: '$200.00',
        pricePrefix: 'Now',
        priceSuffix: '/mo',
        badge: { label: 'Best seller', type: 'bestseller' },
      },
      {
        image: PRODUCT_IMAGES.airFryer,
        name: 'Ninja 4 Qt Air Fryer,...',
        price: '98',
        cents: '00',
        badge: { label: 'Best seller', type: 'bestseller' },
      },
      {
        image: PRODUCT_IMAGES.tablet,
        name: 'Roku 50" Select Series TV',
        price: '228',
        cents: '00',
        badge: { label: 'Rollback', type: 'rollback' },
      },
      {
        image: PRODUCT_IMAGES.digitalCamera,
        name: 'Vivitar Popnap Digital Ca...',
        price: '24',
        cents: '88',
        badge: { label: 'Best seller', type: 'bestseller' },
      },
    ],
  },
  {
    title: "Fashion you'll love",
    products: [
      {
        image: PRODUCT_IMAGES.blackCardigan,
        name: 'Athletic Works Women\'s...',
        price: '12',
        cents: '98',
        badge: { label: 'Best seller', type: 'bestseller' },
      },
      {
        image: PRODUCT_IMAGES.leatherHandbag,
        name: 'Women\'s Leather Satchel...',
        price: '59',
        cents: '99',
        badge: { label: 'Best seller', type: 'bestseller' },
      },
      {
        image: PRODUCT_IMAGES.rattanCabinet,
        name: 'Rattan Storage Cabinet,...',
        price: '89',
        cents: '00',
        originalPrice: '$129.00',
        pricePrefix: 'Now',
        badge: { label: 'Rollback', type: 'rollback' },
      },
      {
        image: PRODUCT_IMAGES.headphones,
        name: 'Beats Solo3 Wireless On-...',
        price: '99',
        cents: '95',
        badge: { label: 'Popular pick', type: 'popular' },
      },
    ],
  },
  {
    title: 'Electronics',
    products: [
      {
        image: PRODUCT_IMAGES.tablet,
        name: 'Apple iPad Pro 11" M4 Chi...',
        price: '999',
        cents: '00',
        originalPrice: '$1,099.00',
        pricePrefix: 'Now',
        badge: { label: 'Deal', type: 'deal' },
      },
      {
        image: PRODUCT_IMAGES.digitalCamera,
        name: 'Canon EOS Rebel T7 DSL...',
        price: '479',
        cents: '00',
        badge: { label: 'Best seller', type: 'bestseller' },
      },
      {
        image: PRODUCT_IMAGES.airFryer,
        name: 'Ninja Foodi 6-in-1 Smart...',
        price: '149',
        cents: '99',
      },
      {
        image: PRODUCT_IMAGES.headphones,
        name: 'Sony WH-1000XM5 Noise...',
        price: '278',
        cents: '00',
      },
    ],
  },
  {
    title: 'Up to 40% off home',
    products: [
      {
        image: PRODUCT_IMAGES.rattanCabinet,
        name: 'Beautiful 12 Piece Dinner...',
        price: '49',
        cents: '98',
        originalPrice: '$79.99',
        pricePrefix: 'Now',
        badge: { label: 'Rollback', type: 'rollback' },
      },
      {
        image: PRODUCT_IMAGES.leatherHandbag,
        name: 'Decorative Throw Pillow...',
        price: '19',
        cents: '98',
      },
      {
        image: PRODUCT_IMAGES.blackCardigan,
        name: 'Better Homes & Gardens...',
        price: '34',
        cents: '97',
        badge: { label: 'Best seller', type: 'bestseller' },
      },
      {
        image: PRODUCT_IMAGES.airFryer,
        name: 'Keurig K-Express Coffee...',
        price: '59',
        cents: '00',
        originalPrice: '$79.00',
        pricePrefix: 'Now',
        badge: { label: 'Best seller', type: 'bestseller' },
      },
    ],
  },
];

function ProductTile({ product }: { product: ProductCard }) {
  return (
    <div className={styles.productTile}>
      {product.badge && (
        <div className={styles.flagWrap}>
          <WCPFlag
            label={product.badge.label}
            variant={BADGE_VARIANT_MAP[product.badge.type]}
          />
        </div>
      )}
      <div className={styles.heartWrap}>
        <WCPHeartView size="small" calloutPosition="left" />
      </div>
      <div className={styles.imageWrapper}>
        <img src={product.image} alt={product.name} className={styles.productImage} />
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
