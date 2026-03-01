import { useState } from "react";
import { CloseIcon } from "@/components/icons-custom";
import { Link } from "@/components/ui/Link";
import { IconButton } from "@/components/ui/IconButton";

interface OrderStatusCardProps {
  image: string;
  statusLine: string;
  deliveryLine: string;
  trackHref: string;
}

export function OrderStatusCard({
  image,
  statusLine,
  deliveryLine,
  trackHref,
}: OrderStatusCardProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div
      className="lg:hidden flex items-center gap-3 p-3 rounded-lg"
      style={{
        background: "var(--ld-semantic-color-surface)",
        boxShadow:
          "0 -1px 2px 0 rgba(0,0,0,0.10), 0 1px 2px 1px rgba(0,0,0,0.15)",
      }}
    >
      <img
        src={image}
        alt="Order status"
        className="w-10 h-10 flex-shrink-0"
      />
      <div className="flex-1 flex flex-col gap-0.5">
        <span
          style={{
            fontFamily: "var(--ld-semantic-font-family-sans, sans-serif)",
            fontSize: "14px",
            color: "var(--ld-semantic-color-text)",
          }}
        >
          {statusLine}
        </span>
        <span
          style={{
            fontFamily: "var(--ld-semantic-font-family-sans, sans-serif)",
            fontSize: "14px",
            fontWeight: 700,
            color: "var(--ld-semantic-color-text)",
          }}
        >
          {deliveryLine}
        </span>
        <Link href={trackHref} variant="default" underline>
          Track
        </Link>
      </div>
      <IconButton
        aria-label="Dismiss order status"
        variant="ghost"
        size="small"
        UNSAFE_style={{ flexShrink: 0 }}
        onClick={() => setDismissed(true)}
      >
        <CloseIcon />
      </IconButton>
    </div>
  );
}
