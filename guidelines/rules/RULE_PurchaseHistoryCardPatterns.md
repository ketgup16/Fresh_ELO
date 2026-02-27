---
title: Purchase History — Card Pattern Visibility Toggles
scope: rule
status: stable
owner: design-system
last_updated: 2025-02-27
---

## Purpose

The Purchase History page (`client/pages/walmart/PurchaseHistory.tsx`) contains several card pattern variants that are hidden by default using boolean flags. When a user asks to see or work with one of these patterns, the agent MUST immediately set the corresponding flag to `true` — no questions, no confirmation, no planning step.

---

## The Flags

All flags live at the top of `client/pages/walmart/PurchaseHistory.tsx`:

```ts
const SHOW_COMBINED_CARD        = false; // Auto Care + Curbside bundled card
const SHOW_AUTO_CARE_ORDER      = false; // Standalone Auto Care appointment card
const SHOW_CURBSIDE_GET_IT_NOW  = false; // Curbside "Get it now" active order
const SHOW_DELAYED_DELIVERY     = false; // Delayed delivery warning card
```

---

## Trigger → Flag Mapping

When a user's prompt matches any of the keywords below (case-insensitive), immediately set the corresponding flag to `true`.

| User says anything like… | Set this flag to `true` |
|---|---|
| "combined card", "auto care + curbside", "bundled card", "combined order" | `SHOW_COMBINED_CARD` |
| "auto care order", "auto care appointment", "oil change card", "auto care card" | `SHOW_AUTO_CARE_ORDER` |
| "curbside get it now", "get it now", "curbside active", "curbside card" | `SHOW_CURBSIDE_GET_IT_NOW` |
| "delayed delivery", "delayed order", "delay card", "delayed card" | `SHOW_DELAYED_DELIVERY` |

---

## How to Apply

1. Identify which flag(s) map to the user's prompt.
2. Open `client/pages/walmart/PurchaseHistory.tsx`.
3. Change the matching flag(s) from `false` to `true`.
4. Do nothing else — no layout changes, no data changes, no questions.

```ts
// Before
const SHOW_DELAYED_DELIVERY = false;

// After — single line change, nothing else
const SHOW_DELAYED_DELIVERY = true;
```

---

## Hiding a Pattern

If the user asks to hide a pattern ("hide the delayed delivery", "turn off combined card", "remove auto care"), set the flag back to `false`.

---

## Rules

- ✅ ALWAYS apply the flag change immediately when the prompt matches
- ✅ ONLY change the flag — do not touch surrounding code
- ✅ Multiple flags can be set in the same edit if the prompt references multiple patterns
- ❌ NEVER ask for confirmation before setting a flag
- ❌ NEVER refactor or reorganize the flags block
- ❌ NEVER add new flags without a corresponding card pattern already implemented in the file
