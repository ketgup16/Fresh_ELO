import { useState } from 'react';
import { PRODUCT_IMAGES } from '@/components/walmart/productImages';
import { AddToCart } from '@/components/walmart/AddToCart';
import styles from './ContinueShopping.module.css';

interface ContinueShoppingItem {
  id: number;
  image: string;
  title: string;
  price: string;
  cents: string;
  originalPrice?: string;
  badge?: string;
}

const CONTINUE_SHOPPING_ITEMS: ContinueShoppingItem[] = [
  {
    id: 1,
    image: PRODUCT_IMAGES.hoboBagGreen,
    title: 'Gaekeao Hobo Shoulder Bag',
    price: '34',
    cents: '99',
    originalPrice: '$49.99',
    badge: 'Rollback',
  },
  {
    id: 2,
    image: PRODUCT_IMAGES.brownTote,
    title: 'Women\'s Leather Satchel Handbag',
    price: '59',
    cents: '99',
  },
  {
    id: 3,
    image: PRODUCT_IMAGES.ivoryToteSet,
    title: 'MKP Collection Tote Bag Set',
    price: '44',
    cents: '99',
    originalPrice: '$64.99',
    badge: 'Rollback',
  },
  {
    id: 4,
    image: PRODUCT_IMAGES.cordlessVacuum,
    title: 'Cordless Stick Vacuum Cleaner',
    price: '89',
    cents: '99',
    originalPrice: '$129.99',
    badge: 'Rollback',
  },
  {
    id: 5,
    image: PRODUCT_IMAGES.comforterSet,
    title: 'Ultra Soft Comforter Set, Full/Queen',
    price: '49',
    cents: '98',
  },
  {
    id: 6,
    image: PRODUCT_IMAGES.cookwareSet,
    title: 'Carote Nonstick Cookware Set, 14-Piece',
    price: '79',
    cents: '99',
    originalPrice: '$109.99',
    badge: 'Rollback',
  },
  {
    id: 7,
    image: PRODUCT_IMAGES.mugSet,
    title: 'Stoneware Mug Set of 4, 14oz',
    price: '28',
    cents: '00',
  },
  {
    id: 8,
    image: PRODUCT_IMAGES.boucleArmchair,
    title: 'Boucle Accent Armchair',
    price: '159',
    cents: '00',
    originalPrice: '$219.00',
    badge: 'Reduced Price',
  },
  {
    id: 9,
    image: PRODUCT_IMAGES.pinkSofaBed,
    title: 'Adjustable Folding Sofa Bed Chair',
    price: '249',
    cents: '99',
  },
  {
    id: 10,
    image: PRODUCT_IMAGES.leatherArmchair,
    title: 'Vintage Leather Accent Chair',
    price: '189',
    cents: '00',
  },
  {
    id: 11,
    image: PRODUCT_IMAGES.countertopBlender,
    title: 'VAVSEA Countertop Blender',
    price: '49',
    cents: '99',
    originalPrice: '$69.99',
    badge: 'Rollback',
  },
  {
    id: 12,
    image: PRODUCT_IMAGES.handBlenderSet,
    title: 'Immersion Hand Blender Set, 5-in-1',
    price: '29',
    cents: '99',
  },
  {
    id: 13,
    image: PRODUCT_IMAGES.blenderSystem,
    title: 'Ninja DUO Blender & Processor System',
    price: '129',
    cents: '99',
    originalPrice: '$169.99',
    badge: 'Rollback',
  },
  {
    id: 14,
    image: PRODUCT_IMAGES.personalBlender,
    title: 'NutriBullet Personal Blender',
    price: '59',
    cents: '99',
  },
  {
    id: 15,
    image: PRODUCT_IMAGES.roomba1,
    title: 'iRobot Roomba i3+ Self-Emptying Robot Vacuum',
    price: '299',
    cents: '99',
    originalPrice: '$449.99',
    badge: 'Rollback',
  },
  {
    id: 16,
    image: PRODUCT_IMAGES.roomba2,
    title: 'iRobot Roomba s9+ Robot Vacuum',
    price: '599',
    cents: '99',
  },
  {
    id: 17,
    image: PRODUCT_IMAGES.laptop1,
    title: 'Lenovo IdeaPad 15.6" Laptop, Intel Core i3',
    price: '329',
    cents: '00',
    originalPrice: '$399.00',
    badge: 'Rollback',
  },
  {
    id: 18,
    image: PRODUCT_IMAGES.laptop2,
    title: 'Acer Chromebook 15.6", 8GB RAM',
    price: '279',
    cents: '00',
  },
];

export function ContinueShopping() {
  const [cartItems, setCartItems] = useState<Record<number, number>>({});

  const handleQuantityChange = (id: number, qty: number) => {
    setCartItems((prev) => {
      if (qty === 0) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: qty };
    });
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Continue shopping</h2>
        <button className={styles.seeAll}>See all</button>
      </div>

      <div className={styles.carousel}>
        {CONTINUE_SHOPPING_ITEMS.map((item) => (
          <div key={item.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <img
                src={item.image}
                alt={item.title}
                className={styles.image}
              />
              {item.badge && (
                <span className={styles.badge}>{item.badge}</span>
              )}
            </div>
            <div className={styles.cardBody}>
              <p className={styles.productTitle}>{item.title}</p>
              <div className={styles.priceRow}>
                <span className={styles.priceNow}>Now</span>
                <span className={styles.priceDollar}>$</span>
                <span className={styles.priceWhole}>{item.price}</span>
                <span className={styles.priceCents}>{item.cents}</span>
              </div>
              {item.originalPrice && (
                <p className={styles.originalPrice}>Was {item.originalPrice}</p>
              )}
              <div className={styles.cartRow}>
                <AddToCart
                  onQuantityChange={(qty) => handleQuantityChange(item.id, qty)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
