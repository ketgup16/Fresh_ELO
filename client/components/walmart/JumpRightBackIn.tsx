import { Heart } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import styles from './JumpRightBackIn.module.css';

interface ProductTile {
  image: string;
  name: string;
  price: string;
  originalPrice?: string;
  pricePrefix?: string;
  cta: 'options' | 'add';
}

const PRODUCTS: ProductTile[] = [
  {
    image: 'https://i5.walmartimages.com/seo/KitchenAid-Artisan-Series-5-Quart-Tilt-Head-Stand-Mixer-KSM150PSER_3d0fdf8a-b544-4c3e-b4d5-0a02ea55dc85.b9266d9f15d9e04f2e9a0bd56c4e5fc5.jpeg?odnWidth=180&odnHeight=180&odnBg=ffffff',
    name: 'KitchenAid Artisan Series Tilt Head 5 qt Stand Mixer, Passion...',
    price: '499.95',
    cta: 'options',
  },
  {
    image: 'https://i5.walmartimages.com/seo/Hyper-Tough-16-Ounce-Claw-Hammer-with-Fiberglass-Handle_a9c42b8a-7897-4e19-a905-5dc7c7c6c91d.fc32baeecf3d61ead6f7adca23b2f440.jpeg?odnWidth=180&odnHeight=180&odnBg=ffffff',
    name: 'Hyper Tough 16-Ounce Claw Hammer with Fiberglass...',
    price: '7.18',
    cta: 'add',
  },
  {
    image: 'https://i5.walmartimages.com/seo/Mainstays-2-2-Qt-14-Ounce-Air-Fryer-in-Arctic-Black-with-Non-Stick-Basket_5e91e4c3-c7ce-4b26-9c6d-3dab9f83b7b1.e3f1b18f82fa7c38de1abfe1a31a0c69.jpeg?odnWidth=180&odnHeight=180&odnBg=ffffff',
    name: 'Mainstays 2.2 Qt 14 Ounce Air Fryer in Arctic Black with Non-Stick...',
    price: '29.98',
    cta: 'options',
  },
  {
    image: 'https://i5.walmartimages.com/seo/Surge-Protector-Power-Strip-5-ft-Extension-Cord-with-8-Outlets-White_24fd1eed-2fdb-44f0-9c89-ca5f40d3bcfe.4e15c1e48f18b302a8ceac06e706a9b6.jpeg?odnWidth=180&odnHeight=180&odnBg=ffffff',
    name: 'JcBlaon QC860-CU 14 Gauge 5ft White 8 Outlets Surge...',
    price: '12.99',
    originalPrice: '21.99',
    pricePrefix: 'Now',
    cta: 'options',
  },
  {
    image: 'https://i5.walmartimages.com/seo/Yorepak-Extra-Large-Travel-Backpack-17-in-Laptop-Backpack-for-Men-Women-College-Backpack_b8c29c87-c10a-433b-8a7b-db15a2e3bbef.76f793e8dbf12c84af3be8c1a9fcf093.jpeg?odnWidth=180&odnHeight=180&odnBg=ffffff',
    name: 'Yorepak Extra Large Travel Backpack, 17 in Laptop...',
    price: '22.55',
    originalPrice: '27.99',
    pricePrefix: 'Now',
    cta: 'options',
  },
  {
    image: 'https://i5.walmartimages.com/seo/ThermoPro-TP358W-Digital-Hygrometer-Indoor-Thermometer-Humidity-Gauge-with-Comfort-Level_fc4e6a86-8e4a-4e0d-b0db-be8f10f26c64.78e4095e1c5c785ca3f7a1f1d04f9c7b.jpeg?odnWidth=180&odnHeight=180&odnBg=ffffff',
    name: 'ThermoPro TP358W Hygrometer Indoor...',
    price: '18.99',
    cta: 'options',
  },
];

export function JumpRightBackIn() {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Jump right back in</h2>
      <div className={styles.row}>
        {PRODUCTS.map((product, i) => (
          <div key={i} className={styles.tile}>
            <div className={styles.imageWrapper}>
              <img src={product.image} alt={product.name} className={styles.image} />
              <IconButton
                aria-label="Save to list"
                variant="secondary"
                size="small"
                UNSAFE_className={styles.heartBtn}
              >
                <Heart className={styles.heartIcon} />
              </IconButton>
            </div>
            <div className={styles.body}>
              <div className={styles.ctaRow}>
                {product.cta === 'add' ? (
                  <Button variant="secondary" size="small">+ Add</Button>
                ) : (
                  <Button variant="secondary" size="small">Options</Button>
                )}
              </div>
              <div className={styles.priceRow}>
                {product.pricePrefix && (
                  <span className={styles.pricePrefix}>{product.pricePrefix} </span>
                )}
                <span className={styles.price}>
                  <span className={styles.priceDollar}>$</span>
                  {product.price}
                </span>
                {product.originalPrice && (
                  <span className={styles.originalPrice}>${product.originalPrice}</span>
                )}
              </div>
              <p className={styles.name}>{product.name}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
