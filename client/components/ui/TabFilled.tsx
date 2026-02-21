import * as React from 'react';
import styles from './TabFilled.module.css';

/**
 * TabFilled — a wrapper that gives the TabList a filled/elevated appearance.
 *
 * Wrap a `<TabList>` with `<TabFilled>` to get a white background with rounded
 * top corners and subtle styling. Useful when tabs sit on a gray/subtle background.
 *
 * @example
 * ```tsx
 * <Tabs value={tab} onValueChange={setTab}>
 *   <TabFilled>
 *     <TabList>
 *       <Tab value="one">Tab One</Tab>
 *       <Tab value="two">Tab Two</Tab>
 *     </TabList>
 *   </TabFilled>
 *   <TabPanel value="one">Content one</TabPanel>
 *   <TabPanel value="two">Content two</TabPanel>
 * </Tabs>
 * ```
 */
export interface TabFilledProps {
  children: React.ReactNode;
  UNSAFE_className?: string;
  UNSAFE_style?: React.CSSProperties;
}

export const TabFilled = React.forwardRef<HTMLDivElement, TabFilledProps>(
  ({ children, UNSAFE_className, UNSAFE_style }, ref) => {
    const className = [styles.tabFilled, UNSAFE_className]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={className} style={UNSAFE_style}>
        {children}
      </div>
    );
  },
);

TabFilled.displayName = 'TabFilled';
