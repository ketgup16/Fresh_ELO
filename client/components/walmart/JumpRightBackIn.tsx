import { WCPFlag, WCPFlagVariant } from '@/components/walmart/WCPFlag';
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
        image: PRODUCT_IMAGES.cordlessVacuum,
        name: 'Cordless Stick Vacuum, 25...',
        price: '89',
        cents: '99',
        originalPrice: '$129.99',
        pricePrefix: 'Now',
        badge: { label: 'Rollback', type: 'rollback' },
      },
      {
        image: PRODUCT_IMAGES.blenderSystem,
        name: 'Ninja DUO Blender & Pro...',
        price: '129',
        cents: '99',
        badge: { label: 'Best seller', type: 'bestseller' },
      },
    ],
  },
  {
    title: "Fashion you'll love",
    products: [
      {
        image: PRODUCT_IMAGES.hoboBagGreenAlt,
        name: 'GAEKEAO Hobo Shoulder...',
        price: '34',
        cents: '99',
        originalPrice: '$49.99',
        pricePrefix: 'Now',
        badge: { label: 'Rollback', type: 'rollback' },
      },
      {
        image: PRODUCT_IMAGES.brownTote,
        name: 'Women\'s Leather Satchel...',
        price: '59',
        cents: '99',
        badge: { label: 'Best seller', type: 'bestseller' },
      },
      {
        image: PRODUCT_IMAGES.ivoryToteSet,
        name: 'MKP Collection Tote Bag...',
        price: '44',
        cents: '99',
        badge: { label: 'Popular pick', type: 'popular' },
      },
      {
        image: PRODUCT_IMAGES.hoboBagBrown,
        name: 'Michael Kors Jet Set Tote...',
        price: '178',
        cents: '00',
        badge: { label: 'Popular pick', type: 'popular' },
      },
    ],
  },
  {
    title: 'Electronics',
    products: [
      {
        image: PRODUCT_IMAGES.roomba1,
        name: 'iRobot Roomba i3+ Self-Em...',
        price: '299',
        cents: '99',
        originalPrice: '$449.99',
        pricePrefix: 'Now',
        badge: { label: 'Deal', type: 'deal' },
      },
      {
        image: PRODUCT_IMAGES.countertopBlender,
        name: 'VAVSEA Countertop Blend...',
        price: '49',
        cents: '99',
        badge: { label: 'Best seller', type: 'bestseller' },
      },
      {
        image: PRODUCT_IMAGES.tablet,
        name: 'Apple iPad Pro 11" M4 Chi...',
        price: '999',
        cents: '00',
      },
      {
        image: PRODUCT_IMAGES.digitalCamera,
        name: 'Vivitar Popnap Digital Ca...',
        price: '24',
        cents: '88',
      },
    ],
  },
  {
    title: 'Up to 40% off home',
    products: [
      {
        image: PRODUCT_IMAGES.cookwareSet,
        name: 'Carote Nonstick Cookware...',
        price: '79',
        cents: '99',
        originalPrice: '$109.99',
        pricePrefix: 'Now',
        badge: { label: 'Rollback', type: 'rollback' },
      },
      {
        image: PRODUCT_IMAGES.comforterSet,
        name: 'Ultra Soft Comforter Set,...',
        price: '49',
        cents: '98',
      },
      {
        image: PRODUCT_IMAGES.boucleArmchair,
        name: 'Boucle Accent Armchair,...',
        price: '159',
        cents: '00',
        originalPrice: '$219.00',
        pricePrefix: 'Now',
        badge: { label: 'Best seller', type: 'bestseller' },
      },
      {
        image: PRODUCT_IMAGES.mugSet,
        name: 'Stoneware Mug Set of 4,...',
        price: '28',
        cents: '00',
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
