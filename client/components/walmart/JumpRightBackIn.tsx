import { Heart } from '@/components/icons';
import styles from './JumpRightBackIn.module.css';

interface ProductCard {
  image: string;
  name: string;
  price: string;
  cents: string;
  originalPrice?: string;
  pricePrefix?: string;
  priceSuffix?: string;
  badge?: { label: string; type: 'bestseller' | 'deal' | 'popular' | 'rollback' };
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
        image: 'https://i5.walmartimages.com/seo/Apple-AirPods-Pro-2nd-generation-with-MagSafe-Case-USB-C_e37f5527-c8c3-47a3-a4bf-00e5da7aaf46.fc6db58c09b9e55e8264ceaa5d574a06.jpeg?odnWidth=292&odnHeight=292&odnBg=ffffff',
        name: 'Apple AirPods Pro (2nd gen...',
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
      {
        image: 'https://i5.walmartimages.com/seo/Roku-50-Select-Series-4K-Smart-RokuTV_e1cd40c3-3e04-498f-97f2-7085c34e3599.20f5e55790efc8eb52caed9e0d58a41b.jpeg?odnWidth=292&odnHeight=292&odnBg=ffffff',
        name: 'Roku 50" LED TV',
        price: '98',
        cents: '00',
        priceSuffix: '/month',
      },
      {
        image: 'https://i5.walmartimages.com/seo/Huffy-26-In-Rock-Creek-Mens-Mountain-Bike-Metallic-Cyan_c1fbc0c6-e0ed-4a3d-87c7-5ad1fc21e1cc.17d84dd4f8dcdcd84e16bb1c7a63e2eb.jpeg?odnWidth=292&odnHeight=292&odnBg=ffffff',
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
        image: 'https://i5.walmartimages.com/seo/Athletic-Works-Women-s-Wide-Width-Running-Shoe_88867f1c-dc0a-4c08-871c-38a8ec4f4a39.0db00e3cb99bb4b1d1c2023cd7ee78ed.jpeg?odnWidth=292&odnHeight=292&odnBg=ffffff',
        name: 'Athletic Works Wome...',
        price: '169',
        cents: '98',
        originalPrice: '$200.00',
        pricePrefix: 'Now',
        priceSuffix: '/mo',
        badge: { label: 'Best seller', type: 'bestseller' },
      },
      {
        image: 'https://i5.walmartimages.com/seo/Cate-Chloe-Bianca-18k-White-Gold-Plated-Silver-Hoop-Earrings-with-Swarovski-Crystals_77dc4e44-14fd-4679-91fa-1c8e09b5e498.8d93ca1133ffdf9d993eab5f81ff0c51.jpeg?odnWidth=292&odnHeight=292&odnBg=ffffff',
        name: 'Cate & Chloe Bianca...',
        price: '98',
        cents: '00',
        badge: { label: 'Best seller', type: 'bestseller' },
      },
      {
        image: 'https://i5.walmartimages.com/seo/GAEKEAO-Hobo-Bags-for-Women-Crossbody-Shoulder-Tote-Handbag-Soft-PU-Leather-Large-Purse-Brown_8553d1de-ca71-49f4-8b04-ca32bd8c3e28.f1c5afcab3fa6d92f7ae26b4058bf0b4.jpeg?odnWidth=292&odnHeight=292&odnBg=ffffff',
        name: 'GAEKEAO Hobo Ba...',
        price: '98',
        cents: '00',
        badge: { label: 'Popular pick', type: 'popular' },
      },
      {
        image: 'https://i5.walmartimages.com/seo/Marc-Jacobs-Daisy-Eau-So-Fresh-Eau-de-Toilette-Perfume-for-Women-4-25-oz_80fcb79a-c9a3-4dce-9b5e-e79d9b9c41e6.3d35c5f289e2ca4b14f7b02a80a9e4f8.jpeg?odnWidth=292&odnHeight=292&odnBg=ffffff',
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
        image: 'https://i5.walmartimages.com/seo/Meta-Quest-3S-128GB-Mixed-Reality-Headset-Asgard-s-Wrath-2_3d56e6e5-5b2a-4278-9e33-e7c66e57e71b.e1d08bed2db84e84f9e52b23cb4bc843.jpeg?odnWidth=292&odnHeight=292&odnBg=ffffff',
        name: 'Meta Quest 3S 128GB...',
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
      {
        image: 'https://i5.walmartimages.com/seo/Apple-iPad-Pro-11-inch-M4-chip-Wi-Fi-256GB_a2ced9a1-87e3-4f4e-9835-82f89f3b5cd4.d01d49e6bd36d0d83a5e6e34a04fc8c0.jpeg?odnWidth=292&odnHeight=292&odnBg=ffffff',
        name: 'Apple iPad Pro Seri...',
        price: '98',
        cents: '00',
      },
      {
        image: 'https://i5.walmartimages.com/seo/Vivitar-PopNap-Digital-Camera-Retro-Blue_03c6a97c-a4c1-45ad-83c8-ef01babb48a9.d6ec0e10ffedf33be01df9f7eb44b45f.jpeg?odnWidth=292&odnHeight=292&odnBg=ffffff',
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
        image: 'https://i5.walmartimages.com/seo/Beautiful-12-Piece-Dinnerware-Set-White-by-Drew-Barrymore_3c55a8ec-e87f-4be6-a0f6-df5c0ac1bc37.fc3e0ddbfaf4c3024e52bc24e5bb57f7.jpeg?odnWidth=292&odnHeight=292&odnBg=ffffff',
        name: 'Beautiful 12 Piece Dinner...',
        price: '169',
        cents: '98',
        originalPrice: '$200.00',
        pricePrefix: 'Now',
        badge: { label: 'Rollback', type: 'rollback' },
      },
      {
        image: 'https://i5.walmartimages.com/seo/Better-Homes-Gardens-Modern-Farmhouse-Wood-Frame_a74f6cfc-cf9c-407b-ab6e-85e09b4a1f89.5cf6c3c0ba51f39508af5d7c0af97cb9.jpeg?odnWidth=292&odnHeight=292&odnBg=ffffff',
        name: 'Active Noise...',
        price: '98',
        cents: '00',
      },
      {
        image: 'https://i5.walmartimages.com/seo/Mainstays-Adjustable-Height-Table-Lamp-with-Drum-Shade-Beige-and-Natural_5b8dbe81-c1a7-4b4a-bc60-8c4c2e4d8d05.8b5a8bd1cb5a37f0d2f5fc7db7e0c6f8.jpeg?odnWidth=292&odnHeight=292&odnBg=ffffff',
        name: 'Marc Jacobs Daisy E...',
        price: '98',
        cents: '00',
        badge: { label: 'Best seller', type: 'bestseller' },
      },
      {
        image: 'https://i5.walmartimages.com/seo/iRobot-Roomba-Combo-Essential-Robot-Vacuum-and-Mop-Y0140_2d99ddb7-e285-4a23-a1e7-2d63b3e74b27.57efd22fff04fd22e3db22dc0a5c4a16.jpeg?odnWidth=292&odnHeight=292&odnBg=ffffff',
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
