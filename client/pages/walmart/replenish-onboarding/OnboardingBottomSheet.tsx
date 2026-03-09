import { MagicFill } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import styles from './OnboardingBottomSheet.module.css';
import sheetStyles from './ReplenishOnboarding.module.css';

interface OnboardingBottomSheetProps {
  selectedDay: string;
  selectedTime: string;
  onChangeDayTime: () => void;
  onViewUsuals: () => void;
}

export function OnboardingBottomSheet({
  selectedDay,
  selectedTime,
  onChangeDayTime,
  onViewUsuals,
}: OnboardingBottomSheetProps) {
  return (
    <div className={sheetStyles.scrim}>
      <div className={sheetStyles.bottomSheet} style={{ maxHeight: '65vh' }}>
        {/* Background image */}
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/9b6d8a55f90c242ac141216aed48aeaabde06936?width=750"
          alt=""
          className={styles.backgroundImage}
          aria-hidden="true"
        />

        <div className={sheetStyles.bottomSheetContent} style={{ paddingBottom: 62 }}>
          <div className={sheetStyles.grabber} />

          <div className={styles.sheetContent}>
            {/* Title + Link */}
            <div className={styles.titleSection}>
              <h2 className={styles.title}>
                Rest easy—get your groceries delivered every{' '}
                <span className={styles.titleUnderline}>{selectedDay}</span> at{' '}
                <span className={styles.titleUnderline}>{selectedTime}</span>
              </h2>
              <button
                className={styles.changeDayTime}
                onClick={onChangeDayTime}
                type="button"
              >
                Change day &amp; time
              </button>
            </div>

            {/* Visual */}
            <div className={styles.visual}>
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/171cfbc3f0fc02a2d28dfad5a6afbac8b5eb2c57?width=1038"
                alt="Groceries"
                className={styles.groceriesImage}
              />
              <div className={styles.curatedLabel}>
                <MagicFill
                  className={styles.magicIcon}
                  style={{ color: 'var(--ld-semantic-color-text, #2E2F32)' }}
                />
                <span className={styles.curatedText}>
                  Curated for you, based on your history
                </span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className={styles.ctaSection}>
            <p className={styles.ctaSubtext}>Add, edit, or pause anytime.</p>
            <div className={styles.ctaButtonWrap}>
              <Button
                variant="primary"
                size="medium"
                isFullWidth
                onClick={onViewUsuals}
              >
                View your usuals
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
