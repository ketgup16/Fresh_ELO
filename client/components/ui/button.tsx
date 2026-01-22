/**
 * @deprecated This file re-exports the Living Design 3.5 Button component.
 * 
 * IMPORTANT: Always import from './Button' (uppercase) going forward.
 * This file exists only for backward compatibility with existing imports.
 * 
 * Migration path:
 * - Change: import { Button } from '@/components/ui/button'
 * - To:     import { Button } from '@/components/ui/Button'
 * 
 * DO NOT create new CVA button variants here. Use the LD 3.5 Button component variants instead.
 */

export { Button, type ButtonProps } from './Button';
export { ButtonGroup, type ButtonGroupProps } from './ButtonGroup';

// Re-export buttonVariants for backward compatibility with existing code
// that uses it for className composition (alert-dialog, pagination, etc.)
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * @deprecated Use Button component variants directly instead of composing with buttonVariants
 */
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 rounded-full text-sm",
        primary: "text-white rounded-full text-sm [background:var(--ld-semantic-color-action-fill-primary)] hover:[background:var(--ld-semantic-color-action-fill-primary-hovered)] active:[background:var(--ld-semantic-color-action-fill-primary-pressed)]",
        secondary: "border rounded-full text-sm [border-color:var(--ld-semantic-color-border-strong)] bg-white [color:var(--ld-semantic-color-text-primary)] hover:[background:var(--ld-semantic-color-action-fill-transparent-hovered)] active:[background:var(--ld-semantic-color-action-fill-transparent-pressed)]",
        destructive: "bg-[var(--ld-semantic-color-action-fill-destructive)] text-white hover:bg-[var(--ld-semantic-color-action-fill-destructive-hovered)] rounded-full text-sm",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md text-sm",
        ghost: "hover:bg-accent hover:text-accent-foreground rounded-md text-sm",
        link: "text-primary underline-offset-4 hover:underline text-sm",
      },
      size: {
        default: "h-10 px-6",
        sm: "h-9 px-4 text-sm",
        lg: "h-11 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);
