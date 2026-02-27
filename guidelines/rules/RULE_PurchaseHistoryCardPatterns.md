---
title: Purchase History — Card Pattern Visibility Toggles
scope: rule
status: stable
owner: design-system
last_updated: 2025-02-27
---

## Purpose

Every order card on the Purchase History page (`client/pages/walmart/PurchaseHistory.tsx`) has a boolean flag. When a user asks to show or hide a card, the agent MUST immediately flip the corresponding flag — no questions, no confirmation, no planning step.

---

## All Flags

All flags live near the top of `client/pages/walmart/PurchaseHistory.tsx`:

```ts
// Hidden by default (template/demo variants)
const SHOW_COMBINED_CARD        = false; // Auto Care + Curbside bundled card
const SHOW_AUTO_CARE_ORDER      = false; // Standalone Auto Care appointment card
const SHOW_CURBSIDE_GET_IT_NOW  = false; // Curbside "Get it now" active order
const SHOW_DELAYED_DELIVERY     = false; // Delayed delivery warning card

// Visible by default (standard order list)
const SHOW_DELIVERY_ON_THE_WAY  = true;  // Delivery in transit
const SHOW_COMPLETED_DELIVERY   = true;  // Completed grocery delivery (Feb 15, Start a return)
const SHOW_DELIVERY_WITH_RETURN = true;  // Completed delivery with return notice (Feb 10)
const SHOW_SHIPPING_ELECTRONICS = true;  // Shipped electronics order
const SHOW_SHIPPING_APPLIANCES  = true;  // Shipped appliances order
const SHOW_COMPLETED_CURBSIDE   = true;  // Completed curbside pickup
const SHOW_STORE_PURCHASE       = true;  // In-store purchase
```

---

## Trigger → Flag Mapping

Match on the **exact prompt** from `OrderCardPatterns.tsx` OR keyword aliases. Both trigger the same immediate flag change.

### Hidden-by-default patterns

| Exact prompt / keyword aliases | Flag |
|---|---|
| "Show a combined card pairing a same-day oil change with a curbside pickup, with a merged bundle total." / "combined card", "bundle total", "oil change + curbside" | `SHOW_COMBINED_CARD` |
| "Show a scheduled oil change appointment card with Check in, Reschedule, and View details actions." / "auto care order", "oil change card", "auto care appointment" | `SHOW_AUTO_CARE_ORDER` |
| "Show an active curbside order with a countdown to edit and a 'Get it now' button to upgrade to express delivery." / "get it now", "active curbside", "express upgrade" | `SHOW_CURBSIDE_GET_IT_NOW` |
| "Show a delayed delivery warning card with options to reschedule, switch to pickup, or cancel." / "delayed delivery", "late delivery", "delay card" | `SHOW_DELAYED_DELIVERY` |

### Visible-by-default patterns

| Keyword aliases | Flag |
|---|---|
| "delivery on the way", "in transit", "delivery in progress", "on its way" | `SHOW_DELIVERY_ON_THE_WAY` |
| "completed grocery delivery", "start a return", "delivered feb 15", "completed delivery" | `SHOW_COMPLETED_DELIVERY` |
| "return notice", "delivery with return", "delivered feb 10", "return deadline" | `SHOW_DELIVERY_WITH_RETURN` |
| "shipping electronics", "shipped electronics", "nintendo", "shipped order" | `SHOW_SHIPPING_ELECTRONICS` |
| "shipping appliances", "shipped appliances", "kitchenaid", "appliance order" | `SHOW_SHIPPING_APPLIANCES` |
| "completed curbside", "curbside pickup completed", "picked up", "garden order" | `SHOW_COMPLETED_CURBSIDE` |
| "store purchase", "in-store", "in store purchase" | `SHOW_STORE_PURCHASE` |

---

## How to Apply

**Showing a hidden card** → set flag to `true`
**Hiding a visible card** → set flag to `false`

```ts
// Single line change only — nothing else
const SHOW_COMPLETED_DELIVERY = false;
```

The user can trigger this by:
- Pasting a prompt from the [Order Card Patterns page](/component-library/order-card-patterns)
- Selecting a card in the preview and saying "hide"
- Typing any keyword alias

---

## Adding a New Card Pattern

When a new pattern is added to `client/pages/component-library/OrderCardPatterns.tsx`:

1. **Add a flag** to the flags block in `client/pages/walmart/PurchaseHistory.tsx` (default `false` for hidden, `true` for visible)
2. **Wire the flag** in the `visibleOrders` useMemo filter — follow the existing pattern
3. **Add a row** to the Trigger → Flag Mapping table in this file
4. **Update `RULES_INDEX.md`** rule #14 table

---

## Enforcement Rules

- ✅ ALWAYS flip the flag immediately — zero confirmation, zero delay
- ✅ ONLY change the flag line — do not touch any other code
- ✅ Multiple flags can be set in one edit
- ✅ ALWAYS add a flag + rule entry when a new pattern is added to `OrderCardPatterns.tsx`
- ❌ NEVER ask "are you sure?" before setting or unsetting a flag
- ❌ NEVER refactor or reorder the flags block
- ❌ NEVER add a flag without a corresponding card in the ORDERS array or render block
