import * as React from "react";
import { cn } from "@/lib/utils";

export type TagVariant = 
  | "default" 
  | "primary" 
  | "secondary" 
  | "success" 
  | "warning" 
  | "destructive" 
  | "info"
  | "outline"
  | "outline-primary"
  | "outline-success"
  | "outline-warning"
  | "outline-destructive"
  | "outline-info";

export type TagSize = "sm" | "md" | "lg";

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: TagVariant;
  size?: TagSize;
  dismissible?: boolean;
  onDismiss?: () => void;
  clickable?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
}

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      dismissible = false,
      onDismiss,
      clickable = false,
      disabled = false,
      icon,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    const handleDismiss = (e: React.MouseEvent) => {
      e.stopPropagation();
      onDismiss?.();
    };

    const classes = cn(
      "tag",
      `tag-${variant}`,
      `tag-${size}`,
      dismissible && "tag-dismissible",
      clickable && "tag-clickable",
      disabled && "tag-disabled",
      className
    );

    return (
      <span
        ref={ref}
        className={classes}
        onClick={clickable && !disabled ? onClick : undefined}
        role={clickable ? "button" : undefined}
        tabIndex={clickable && !disabled ? 0 : undefined}
        {...props}
      >
        {icon && <span className="tag-icon">{icon}</span>}
        {children}
        {dismissible && (
          <button
            type="button"
            className="tag-dismiss-button"
            onClick={handleDismiss}
            aria-label="Dismiss"
            disabled={disabled}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 3L3 9M3 3L9 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </span>
    );
  }
);

Tag.displayName = "Tag";

export { Tag };
