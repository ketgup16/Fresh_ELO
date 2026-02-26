import { InfoIcon } from '@/components/icons-custom';
import { Button } from '@/components/ui/Button';
import styles from './InlineAdBanner.module.css';

interface InlineAdBannerProps {
  logoSrc: string;
  logoAlt: string;
  headline: string;
  subtext?: string;
  ctaLabel?: string;
  imageSrc: string;
  imageAlt: string;
}

export function InlineAdBanner({
  logoSrc,
  logoAlt,
  headline,
  subtext,
  ctaLabel = 'Shop now',
  imageSrc,
  imageAlt,
}: InlineAdBannerProps) {
  return (
    <div className={styles.banner}>
      {/* Left content */}
      <div className={styles.left}>
        <img src={logoSrc} alt={logoAlt} className={styles.logo} />
        <p className={styles.headline}>{headline}</p>
        {subtext && <p className={styles.subtext}>{subtext}</p>}
        <Button variant="secondary" size="small">{ctaLabel}</Button>
      </div>

      {/* Right image */}
      <div className={styles.right}>
        <img src={imageSrc} alt={imageAlt} className={styles.image} />
        <div className={styles.sponsored}>
          <span>Sponsored</span>
          <InfoIcon width={14} height={14} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
