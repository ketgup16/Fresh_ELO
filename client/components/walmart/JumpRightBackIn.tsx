import { Heart } from '@/components/icons';
import styles from './JumpRightBackIn.module.css';

interface ProductCard {
  image: string;
  name: string;
  price: string;
  cents?: string;
  originalPrice?: string;
  pricePrefix?: string;
  priceSuffix?: string;
  badge?: { label: string; type: 'bestseller' | 'deal' | 'popular' | 'rollback' };
}

interface Category {
  title: string;
  products: [ProductCard, ProductCard];
}

const CATEGORIES: Category[] = [
  {
    title: 'Trending',
    products: [
      {
        image: 'https://i5.walmartimages.com/seo/Apple-AirPods-Pro-2nd-generation-with-MagSafe-Case-USB-C_e37f5527-c8c3-47a3-a4bf-00e5da7aaf46.fc6db58c09b9e55e8264ceaa5d574a06.jpeg?odnWidth=292&odnHeight=292&odnBg=ffffff',
        name: 'Apple AirPods Pro (2nd generation)',
        price: '169',
        cents: '98',
        originalPrice: '$200.00',
        pricePrefix: 'Now',
        priceSuffix: '/mo',
        badge: { label: 'Best seller', type: 'bestseller' },
      },
      {
        image: 'https://i5.walmartimages.com/seo/Ninja-4-Quart-Air-Fryer-AF100WM_b3a70ccd-e79f-43e6-8e63-97d38ab49264.fc40cf64b5e0ce3c756e4e04d38c6b53.jpeg?odnWidth=292&odnHeight=292&odnBg=ffffff',
        name: 'Ninja 4 Qt Air Fryer,...',
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
        image: 'https://i5.walmartimages.com/seo/Athletic-Works-Women-s-Athletic-Sneakers_27c2df17-dd37-497d-8f55-2cf80a714e48.0fe7d02ccf42b80f62d09d73abb0dc87.jpeg?odnWidth=292&odnHeight=292&odnBg=ffffff',
        name: 'Athletic Works Women\'s Athletic Sneakers',
        price: '169',
        cents: '98',
        originalPrice: '$200.00',
        pricePrefix: 'Now',
        priceSuffix: '/mo',
        badge: { label: 'Best seller', type: 'bestseller' },
      },
      {
        image: 'https://i5.walmartimages.com/seo/Cate-Chloe-Bianca-18k-White-Gold-Plated-Silver-Crystal-Hoop-Earrings-Jewelry_d8cbf0f1-0b1b-4f02-b3c6-f3a76aa2a88e.8a7d3cdf9c6c0e3c0b5aa49c6de6b1d8.jpeg?odnWidth=292&odnHeight=292&odnBg=ffffff',
        name: 'Cate & Chloe Bianca...',
        price: '98',
        cents: '00',
        badge: { label: 'Best seller', type: 'bestseller' },
      },
    ],
  },
  {
    title: 'Electronics',
    products: [
      {
        image: 'https://i5.walmartimages.com/seo/Meta-Quest-3S-128GB-Mixed-Reality-Headset-Asgard-s-Wrath-2_3d56e6e5-5b2a-4278-9e33-e7c66e57e71b.e1d08bed2db84e84f9e52b23cb4bc843.jpeg?odnWidth=292&odnHeight=292&odnBg=ffffff',
        name: 'Meta Quest 3S 128GB Mixed Reality Headset',
        price: '169',
        cents: '98',
        originalPrice: '$200.00',
        pricePrefix: 'Now',
        badge: { label: 'Deal', type: 'deal' },
      },
      {
        image: 'https://i5.walmartimages.com/seo/Apple-AirPods-Max-Wireless-Over-Ear-Headphones-Active-Noise-Cancelling_8c56a9e9-a39c-4b93-9fc2-ec2d7640dfb1.e50a34f3d1f0e4a4c31be86f44f2b0de.jpeg?odnWidth=292&odnHeight=292&odnBg=ffffff',
        name: 'Apple Pro headpho...',
        price: '98',
        cents: '00',
        badge: { label: 'Best seller', type: 'bestseller' },
      },
    ],
  },
  {
    title: 'Up to 40% off home',
    products: [
      {
        image: 'https://i5.walmartimages.com/seo/Beautiful-12-Piece-Dinnerware-Set-White-by-Drew-Barrymore_3c55a8ec-e87f-4be6-a0f6-df5c0ac1bc37.fc3e0ddbfaf4c3024e52bc24e5bb57f7.jpeg?odnWidth=292&odnHeight=292&odnBg=ffffff',
        name: 'Beautiful 12 Piece Dinnerware Set White',
        price: '169',
        cents: '98',
        originalPrice: '$200.00',
        pricePrefix: 'Now',
        badge: { label: 'Rollback', type: 'rollback' },
      },
      {
        image: 'https://i5.walmartimages.com/seo/Better-Homes-Gardens-Springwood-Storage-Cabinet_81b8dfca-fc28-4a30-9bdf-4dd1e7f06dc2.cbac7cd07a67e22c12d1fccb01c50c18.jpeg?odnWidth=292&odnHeight=292&odnBg=ffffff',
        name: 'Active Noise...',
        price: '98',
        cents: '00',
      },
    ],
  },
];

function ProductTile({ product }: { product: ProductCard }) {
  return (
    <div className={styles.productTile}>
      <div className={styles.imageWrapper}>
        {product.badge && (
          <span className={`${styles.badge} ${styles[`badge--${product.badge.type}`]}`}>
            {product.badge.label}
          </span>
        )}
        <img src={product.image} alt={product.name} className={styles.productImage} />
        <button className={styles.heartBtn} aria-label="Save to list">
          <Heart width={16} height={16} />
        </button>
      </div>
      <div className={styles.productBody}>
        <div className={styles.priceRow}>
          {product.pricePrefix && (
            <span className={styles.pricePrefix}>{product.pricePrefix} </span>
          )}
          <span className={styles.price}>
            <sup className={styles.priceDollar}>$</sup>
            {product.price}
            <sup className={styles.priceCents}>{product.cents ?? '00'}</sup>
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
          <div key={category.title} className={styles.categoryColumn}>
            <div className={styles.categoryHeader}>
              <span className={styles.categoryTitle}>{category.title}</span>
              <a href="#" className={styles.shopAll}>Shop all</a>
            </div>
            <div className={styles.productStack}>
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
