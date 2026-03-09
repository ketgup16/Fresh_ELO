import { useState, useEffect } from 'react';
import { MagicFill, Check } from '@/components/icons';
import { PRODUCT_IMAGES } from '@/components/walmart/productImages';
import styles from './ReplenishLoading.module.css';
import pageStyles from './ReplenishOnboarding.module.css';

const LOADING_ITEMS = [
  { image: PRODUCT_IMAGES.redApple, qty: 3 },
  { image: PRODUCT_IMAGES.oatlyOatMilk, qty: 2 },
  { image: PRODUCT_IMAGES.eggs6Count, qty: 1 },
  { image: PRODUCT_IMAGES.starbucksDoubleshot, qty: 2 },
  { image: PRODUCT_IMAGES.bettergooodsFruitSnacks, qty: 1 },
  { image: PRODUCT_IMAGES.skinnyPopPopcorn, qty: 3 },
  { image: PRODUCT_IMAGES.kikkomanSoySauce, qty: 1 },
  { image: PRODUCT_IMAGES.freshStrawberries, qty: 2 },
  { image: PRODUCT_IMAGES.bettergoodsSalsa, qty: 1 },
];

const VALUE_PROPS = ['pantry items', 'easy dinners', 'kid-friendly snacks'];

interface ReplenishLoadingProps {
  deliveryDay: string;
  deliveryTime: string;
  onLoadingComplete: () => void;
}

export function ReplenishLoading({
  deliveryDay,
  deliveryTime,
  onLoadingComplete,
}: ReplenishLoadingProps) {
  const [visibleProps, setVisibleProps] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    VALUE_PROPS.forEach((_, idx) => {
      timers.push(
        setTimeout(() => setVisibleProps(idx + 1), 800 * (idx + 1))
      );
    });
    timers.push(
      setTimeout(onLoadingComplete, 800 * VALUE_PROPS.length + 1200)
    );
    return () => timers.forEach(clearTimeout);
  }, [onLoadingComplete]);

  // Build 3-column rows
  const rows: typeof LOADING_ITEMS[] = [];
  for (let i = 0; i < LOADING_ITEMS.length; i += 3) {
    rows.push(LOADING_ITEMS.slice(i, i + 3));
  }

  return (
    <div className={pageStyles.section}>
      {/* Header */}
      <div className={pageStyles.header}>
        <div className={pageStyles.headerText}>
          <div className={pageStyles.headerTitle}>
            Shop easily with items you buy often
          </div>
          <span className={pageStyles.headerSubtext}>
            Get it by{' '}
            <span className={pageStyles.headerSubtextLink}>
              {deliveryDay}, {deliveryTime}
            </span>
          </span>
        </div>
      </div>

      {/* Product card with loading overlay */}
      <div className={styles.productCard}>
        {rows.map((row, rowIdx) => (
          <div key={rowIdx} className={styles.productRow}>
            {row.map((item, itemIdx) => (
              <div key={`${rowIdx}-${itemIdx}`} className={styles.tileLoading}>
                <div className={styles.tileImageArea}>
                  <img src={item.image} alt="" className={styles.tileImage} />
                  <div className={styles.quantityBadge}>
                    <span className={styles.quantityText}>{item.qty}</span>
                    <span className={styles.quantityText} style={{ width: 6 }}>x</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}

        {/* Step Animation overlay */}
        <div className={styles.stepAnimation}>
          <MagicFill className={styles.magicIconLarge} />
          <div className={styles.animatedTitle}>
            Adding what you usually buy
          </div>
          <div className={styles.valueProps}>
            {VALUE_PROPS.map((prop, idx) => (
              idx < visibleProps && (
                <div
                  key={prop}
                  className={`${styles.valueProp} ${styles.fadeIn}`}
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <Check className={styles.checkIcon} />
                  <span className={styles.valuePropText}>{prop}</span>
                </div>
              )
            ))}
          </div>
        </div>
      </div>

      {/* Skeleton footer */}
      <div className={pageStyles.footerSection}>
        <div className={styles.skeletonFooter}>
          <div className={styles.skeleton}>
            <div className={styles.skeletonGradient} />
          </div>
        </div>
      </div>
    </div>
  );
}
