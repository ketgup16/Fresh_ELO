import React, { useEffect, useRef, useState } from 'react';
import styles from './Spinner.module.css';

export type SpinnerColor = 'neutral' | 'white';
export type SpinnerSize = 'large' | 'small';
export type SpinnerAnimation = 'rotate' | 'petal-build' | 'woof';

export interface SpinnerProps
  extends Omit<React.ComponentPropsWithoutRef<'span'>, 'className' | 'style'> {
  /**
   * Accessible label for screen readers
   * @default "Loading…"
   */
  a11yLabel?: string;

  /**
   * Color variant of the spinner
   * @default "neutral"
   */
  color?: SpinnerColor;

  /**
   * Size variant of the spinner
   * @default "large"
   */
  size?: SpinnerSize;

  /**
   * Animation style of the spinner
   * - 'rotate': full spinner rotates (default)
   * - 'petal-build': petals appear one by one then disappear, cycling from 1 → all → 1
   * - 'woof': single dot orbiting the center
   * @default "rotate"
   */
  animation?: SpinnerAnimation;

  /**
   * Additional props to pass to the SVG element
   */
  spinnerProps?: React.ComponentPropsWithoutRef<'svg'>;

  /**
   * Unsafe prop to override component styles (use sparingly)
   */
  UNSAFE_className?: string;

  /**
   * Unsafe prop to override component styles (use sparingly)
   */
  UNSAFE_style?: React.CSSProperties;
}

// SVG paths for each of the 6 petals of the Walmart spark
// Ordered clockwise from top-left: top-left, bottom-left, bottom, bottom-right, top-right, top
const PETAL_PATHS = [
  // Petal 0 – top-left arm
  'M11.7007 14.9457C10.7614 16.5726 11.3177 18.6522 12.9432 19.5907C13.6551 20.0017 21.6322 23.6559 22.5338 23.8413C23.5673 24.0538 24.6049 23.5942 25.1237 22.6955C25.6426 21.7968 25.5219 20.6684 24.8211 19.8797C24.2097 19.1915 17.0566 14.1103 16.3446 13.6992C14.7191 12.7608 12.64 13.3188 11.7007 14.9457Z',
  // Petal 1 – bottom-left arm
  'M11.7007 32.6955C12.64 34.3224 14.7191 34.8804 16.3446 33.942C17.0566 33.5309 24.2097 28.4497 24.8211 27.7615C25.5218 26.9728 25.6426 25.8444 25.1237 24.9457C24.6049 24.047 23.5673 23.5874 22.5338 23.7999C21.6322 23.9853 13.6551 27.6395 12.9432 28.0505C11.3177 28.989 10.7614 31.0686 11.7007 32.6955Z',
  // Petal 2 – bottom arm
  'M23.4014 39.4996C25.28 39.4996 26.8028 37.978 26.8028 36.1011C26.8028 35.279 25.9789 26.5436 25.6886 25.67C25.3559 24.6688 24.4391 24 23.4014 24C22.3637 24 21.4468 24.6688 21.1142 25.67C20.8239 26.5436 20 35.279 20 36.1011C20 37.978 21.5229 39.4996 23.4014 39.4996Z',
  // Petal 3 – bottom-right arm
  'M35.1237 32.6955C36.063 31.0686 35.5067 28.989 33.8813 28.0505C33.1693 27.6395 25.1923 23.9853 24.2906 23.7999C23.2571 23.5874 22.2196 24.047 21.7007 24.9457C21.1819 25.8444 21.3026 26.9728 22.0034 27.7615C22.6148 28.4497 29.7679 33.5309 30.4798 33.942C32.1053 34.8804 34.1845 34.3224 35.1237 32.6955Z',
  // Petal 4 – top-right arm
  'M35.1237 14.9457C34.1844 13.3188 32.1053 12.7608 30.4798 13.6992C29.7679 14.1103 22.6148 19.1915 22.0034 19.8797C21.3026 20.6684 21.1819 21.7968 21.7007 22.6955C22.2196 23.5942 23.2572 24.0538 24.2906 23.8413C25.1923 23.6559 33.1693 20.0017 33.8813 19.5907C35.5067 18.6522 36.063 16.5726 35.1237 14.9457Z',
  // Petal 5 – top arm
  'M23.4014 8C21.5228 8 20 9.52157 20 11.3985C20 12.2206 20.8239 20.956 21.1142 21.8296C21.4469 22.8308 22.3637 23.4996 23.4014 23.4996C24.4391 23.4996 25.356 22.8308 25.6886 21.8296C25.9789 20.956 26.8028 12.2206 26.8028 11.3985C26.8028 9.52157 25.28 8 23.4014 8Z',
];

// Petal build-up animation order (clockwise from top)
// Determines which petal appears in which step
const PETAL_ORDER = [5, 4, 3, 2, 1, 0]; // top → top-right → bottom-right → bottom → bottom-left → top-left

// Total animation frames: 0-9
// Frames 0-4: build up (1 → 5 petals), frame 5: all 6 petals
// Frames 6-9: tear down (5 → 2 petals), frame 0 again: 1 petal
const TOTAL_FRAMES = 10;
const FRAME_INTERVAL_MS = 140;

function getVisibleCount(frame: number): number {
  if (frame <= 5) return frame + 1; // 1, 2, 3, 4, 5, 6
  return 11 - frame;               // 5, 4, 3, 2 (frames 6-9)
}

/**
 * Spinner component for loading states.
 *
 * Supports two animation styles:
 * - `rotate` (default): the classic rotating spark
 * - `petal-build`: petals appear one-by-one to form the full spark, then disappear
 *
 * @example
 * ```tsx
 * <Spinner />
 * <Spinner animation="petal-build" />
 * <Spinner animation="petal-build" color="white" size="small" />
 * ```
 */
export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  (
    {
      a11yLabel = 'Loading…',
      color = 'neutral',
      size = 'large',
      animation = 'rotate',
      spinnerProps,
      UNSAFE_className,
      UNSAFE_style,
      ...props
    },
    ref
  ) => {
    const frameRef = useRef(0);
    const [frame, setFrame] = useState(0);

    useEffect(() => {
      if (animation !== 'petal-build') {
        frameRef.current = 0;
        setFrame(0);
        return;
      }
      const interval = setInterval(() => {
        frameRef.current = (frameRef.current + 1) % TOTAL_FRAMES;
        setFrame(frameRef.current);
      }, FRAME_INTERVAL_MS);
      return () => clearInterval(interval);
    }, [animation]);

    const isPetalBuild = animation === 'petal-build';
    const isWoof = animation === 'woof';
    const visibleCount = isPetalBuild ? getVisibleCount(frame) : 6;

    const className = [
      styles.spinner,
      styles[`spinner--color-${color}`],
      styles[`spinner--size-${size}`],
      isPetalBuild ? styles['spinner--petal-build'] : '',
      isWoof ? styles['spinner--woof'] : '',
      UNSAFE_className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <span
        ref={ref}
        role="status"
        aria-label={a11yLabel}
        className={className}
        style={UNSAFE_style}
        {...props}
      >
        <svg
          className={styles['spinner__svg']}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...spinnerProps}
        >
          {isWoof ? (
            <circle
              className={styles['spinner__dot']}
              cx="24"
              cy="9"
              r="4.5"
            />
          ) : (
            PETAL_PATHS.map((d, pathIndex) => {
              let petalOpacity: number | undefined = undefined;
              if (isPetalBuild) {
                const buildPosition = PETAL_ORDER.indexOf(pathIndex);
                petalOpacity = buildPosition < visibleCount ? 1 : 0;
              }

              return (
                <path
                  key={pathIndex}
                  className={styles['spinner__path']}
                  style={
                    isPetalBuild
                      ? ({ opacity: petalOpacity } as React.CSSProperties)
                      : ({ '--path-index': pathIndex } as React.CSSProperties)
                  }
                  d={d}
                />
              );
            })
          )}
        </svg>
      </span>
    );
  }
);

Spinner.displayName = 'Spinner';
