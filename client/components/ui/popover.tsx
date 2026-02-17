import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "@/lib/utils";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverArrow = PopoverPrimitive.Arrow;

interface PopoverContentProps extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
  showArrow?: boolean;
}

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(({ className, align = "center", sideOffset = 8, showArrow = true, children, style, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-lg border-0 p-4 outline-none",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      style={{
        backgroundColor: 'var(--ld-semantic-color-surface-overlay, #FFFFFF)',
        color: 'var(--ld-semantic-color-text, #2E2F32)',
        boxShadow: 'var(--ld-semantic-elevation-200, 0 3px 5px 2px #00000026, 0 -1px 3px 0 #0000001a)',
        fontFamily: 'var(--ld-semantic-font-family-sans)',
        border: 'none',
        ...style,
      }}
      {...props}
    >
      {children}
      {showArrow && (
        <PopoverPrimitive.Arrow
          style={{ fill: 'var(--ld-semantic-color-surface-overlay, #FFFFFF)' }}
          width={12}
          height={6}
        />
      )}
    </PopoverPrimitive.Content>
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent, PopoverArrow };
