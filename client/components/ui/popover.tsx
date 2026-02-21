import * as React from "react";
import * as ReactDOM from "react-dom";
import { cn } from "@/lib/utils";

/* ── Context ── */

interface PopoverContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
}

const PopoverCtx = React.createContext<PopoverContextValue | null>(null);

function usePopoverCtx() {
  const ctx = React.useContext(PopoverCtx);
  if (!ctx) throw new Error("Popover.* must be used within <Popover>");
  return ctx;
}

/* ── Root ── */

interface PopoverProps {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function Popover({ children, open: controlledOpen, defaultOpen = false, onOpenChange }: PopoverProps) {
  const isControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const isOpen = isControlled ? controlledOpen : internalOpen;
  const triggerRef = React.useRef<HTMLElement | null>(null);

  const setOpen = React.useCallback((next: boolean) => {
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  }, [isControlled, onOpenChange]);

  return (
    <PopoverCtx.Provider value={{ open: isOpen, setOpen, triggerRef }}>
      {children}
    </PopoverCtx.Provider>
  );
}

/* ── Trigger ── */

const PopoverTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }>(
  ({ children, onClick, asChild, ...props }, ref) => {
    const { open, setOpen, triggerRef } = usePopoverCtx();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      setOpen(!open);
      onClick?.(e);
    };

    const mergedRef = (node: HTMLButtonElement | null) => {
      (triggerRef as React.MutableRefObject<HTMLElement | null>).current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
    };

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<any>, {
        ref: mergedRef,
        onClick: handleClick,
        'aria-expanded': open,
        'aria-haspopup': 'dialog',
        'data-state': open ? 'open' : 'closed',
      });
    }

    return (
      <button
        ref={mergedRef}
        type="button"
        aria-expanded={open}
        aria-haspopup="dialog"
        data-state={open ? "open" : "closed"}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );
  },
);
PopoverTrigger.displayName = "PopoverTrigger";

/* ── Arrow ── */

const PopoverArrow = React.forwardRef<SVGSVGElement, React.SVGAttributes<SVGSVGElement>>(
  ({ className, ...props }, ref) => (
    <svg
      ref={ref}
      width={12}
      height={6}
      viewBox="0 0 12 6"
      className={className}
      style={{ fill: 'var(--ld-semantic-color-surface-overlay, #FFFFFF)' }}
      {...props}
    >
      <polygon points="0,6 6,0 12,6" />
    </svg>
  ),
);
PopoverArrow.displayName = "PopoverArrow";

/* ── Content ── */

interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  showArrow?: boolean;
}

const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ className, align = "center", side = "bottom", sideOffset = 8, showArrow = true, children, style, ...props }, ref) => {
    const { open, setOpen, triggerRef } = usePopoverCtx();
    const contentRef = React.useRef<HTMLDivElement | null>(null);
    const [pos, setPos] = React.useState({ top: 0, left: 0 });

    // Position calculation
    React.useEffect(() => {
      if (!open) return;
      const trigger = triggerRef.current;
      const content = contentRef.current;
      if (!trigger || !content) return;

      const tRect = trigger.getBoundingClientRect();
      const cRect = content.getBoundingClientRect();
      let top = 0, left = 0;

      switch (side) {
        case "bottom":
          top = tRect.bottom + sideOffset;
          break;
        case "top":
          top = tRect.top - cRect.height - sideOffset;
          break;
        case "left":
          top = tRect.top + tRect.height / 2 - cRect.height / 2;
          left = tRect.left - cRect.width - sideOffset;
          break;
        case "right":
          top = tRect.top + tRect.height / 2 - cRect.height / 2;
          left = tRect.right + sideOffset;
          break;
      }

      if (side === "top" || side === "bottom") {
        switch (align) {
          case "start":
            left = tRect.left;
            break;
          case "end":
            left = tRect.right - cRect.width;
            break;
          default:
            left = tRect.left + tRect.width / 2 - cRect.width / 2;
        }
      }

      setPos({ top, left });
    }, [open, side, align, sideOffset, triggerRef]);

    // Close on click outside
    React.useEffect(() => {
      if (!open) return;
      const handleClick = (e: MouseEvent) => {
        const content = contentRef.current;
        const trigger = triggerRef.current;
        if (content && !content.contains(e.target as Node) && trigger && !trigger.contains(e.target as Node)) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }, [open, setOpen, triggerRef]);

    // Close on Escape
    React.useEffect(() => {
      if (!open) return;
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setOpen(false);
          triggerRef.current?.focus();
        }
      };
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }, [open, setOpen, triggerRef]);

    if (!open) return null;

    return ReactDOM.createPortal(
      <div
        ref={(node) => {
          contentRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        role="dialog"
        data-state={open ? "open" : "closed"}
        data-side={side}
        data-align={align}
        className={cn(
          "z-50 w-72 rounded-lg border-0 p-4 outline-none",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className,
        )}
        style={{
          position: "fixed",
          top: pos.top,
          left: pos.left,
          backgroundColor: 'var(--ld-semantic-color-surface-overlay, #FFFFFF)',
          color: 'var(--ld-semantic-color-text, #2E2F32)',
          filter: 'drop-shadow(0 3px 5px rgba(0, 0, 0, 0.15)) drop-shadow(0 -1px 3px rgba(0, 0, 0, 0.1))',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          border: 'none',
          ...style,
        }}
        {...props}
      >
        {children}
        {showArrow && (
          <PopoverArrow
            style={{ fill: 'var(--ld-semantic-color-surface-overlay, #FFFFFF)' }}
          />
        )}
      </div>,
      document.body,
    );
  },
);
PopoverContent.displayName = "PopoverContent";

export { Popover, PopoverTrigger, PopoverContent, PopoverArrow };
