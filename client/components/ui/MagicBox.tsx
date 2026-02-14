import * as React from 'react';
import styles from './MagicBox.module.css';

export type MagicBoxState = 'idle' | 'loading' | 'active';

export interface MagicBoxProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> {
  /**
   * Whether the magic effect is active.
   * When false, the component renders children without the glow effect.
   * @default false
   */
  active?: boolean;
  
  /**
   * The content to wrap with the magic effect.
   */
  children?: React.ReactNode;
  
  /**
   * The animation state of the magic effect.
   * - 'idle': Static subtle glow
   * - 'loading': Pulsing animation (AI processing)
   * - 'active': Subtle shimmer (AI enhancement active)
   * @default 'loading'
   */
  state?: MagicBoxState;
  
  /**
   * Escape hatch for custom CSS class names.
   * @deprecated Use sparingly. Prefer component props for styling.
   */
  UNSAFE_className?: string;
  
  /**
   * Escape hatch for inline styles.
   * @deprecated Use sparingly. Prefer component props for styling.
   */
  UNSAFE_style?: React.CSSProperties;
}

/**
 * Magic Box component for Living Design 3.5
 * 
 * Highlights AI-generated content being actively processed. Wrapper component with animated 
 * glow effect that responds to theme. The magic glow uses semantic tokens that automatically
 * adapt between default theme (blue gradient) and developer theme (blue-green gradient).
 * 
 * @example
 * ```tsx
 * <MagicBox active={isProcessing} state="loading">
 *   <Card>AI-generated content here</Card>
 * </MagicBox>
 * ```
 */
export const MagicBox = React.forwardRef<HTMLDivElement, MagicBoxProps>(
  (props, ref) => {
    const {
      active = false,
      children,
      state = 'loading',
      UNSAFE_className,
      UNSAFE_style,
      ...restProps
    } = props;

    // If not active, just render children without magic effect
    if (!active) {
      return <>{children}</>;
    }

    const wrapperClassName = [
      styles['magic-box'],
      styles[`magic-box--${state}`],
      UNSAFE_className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        className={wrapperClassName}
        style={UNSAFE_style}
        data-magic-active={active}
        {...restProps}
      >
        {/* Layered blur effects for the magic glow */}
        <div className={styles['magic-box__glow-container']} aria-hidden="true">
          <div className={`${styles['magic-box__blur']} ${styles['magic-box__blur--s']}`} />
          <div className={`${styles['magic-box__blur']} ${styles['magic-box__blur--m']}`} />
          <div className={`${styles['magic-box__blur']} ${styles['magic-box__blur--l']}`} />
          <div className={`${styles['magic-box__blur']} ${styles['magic-box__blur--xl']}`} />
        </div>
        
        {/* Content wrapper */}
        <div className={styles['magic-box__content']}>
          {children}
        </div>
      </div>
    );
  }
);

MagicBox.displayName = 'MagicBox';
