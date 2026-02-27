---
title: Purchase History — Card Pattern Visibility Toggles
scope: rule
status: stable
owner: design-system
last_updated: 2025-02-27
---

## Purpose

The Purchase History page (`client/pages/walmart/PurchaseHistory.tsx`) contains card pattern variants that are hidden by default using boolean flags. When a user pastes or types a prompt matching a card pattern, the agent MUST immediately set the corresponding flag to `true` — no questions, no confirmation, no planning step.

---

## The Flags

All flags live near the top of `client/pages/walmart/PurchaseHistory.tsx`:

```ts
const SHOW_COMBINED_CARD        = false; // Auto Care + Curbside bundled card
const SHOW_AUTO_CARE_ORDER      = false; // Standalone Auto Care appointment card
const SHOW_CURBSIDE_GET_IT_NOW  = false; // Curbside "Get it now" active order
const SHOW_DELAYED_DELIVERY     = false; // Delayed delivery warning card
```

---

## Trigger → Flag Mapping

Match on the **exact prompt text** from `OrderCardPatterns.tsx` OR any of the keyword aliases below. Both trigger the same immediate flag change.

### Combined card
**Exact prompt**: `"Show a combined card pairing a same-day oil change with a curbside pickup, with a merged bundle total."`
**Keyword aliases**: "combined card", "auto care + curbside", "bundled card", "combined order", "bundle total"
**Flag**: `SHOW_COMBINED_CARD = true`

---

### Auto Care appointment
**Exact prompt**: `"Show a scheduled oil change appointment card with Check in, Reschedule, and View details actions."`
**Keyword aliases**: "auto care order", "auto care appointment", "oil change card", "auto care card", "scheduled oil change"
**Flag**: `SHOW_AUTO_CARE_ORDER = true`

---

### Active curbside / Get it now
**Exact prompt**: `"Show an active curbside order with a countdown to edit and a \"Get it now\" button to upgrade to express delivery."`
**Keyword aliases**: "curbside get it now", "get it now", "curbside active", "active curbside", "express upgrade"
**Flag**: `SHOW_CURBSIDE_GET_IT_NOW = true`

---

### Delayed delivery warning
**Exact prompt**: `"Show a delayed delivery warning card with options to reschedule, switch to pickup, or cancel."`
**Keyword aliases**: "delayed delivery", "delayed order", "delay card", "late delivery warning"
**Flag**: `SHOW_DELAYED_DELIVERY = true`

---

## How to Apply

1. Identify which flag(s) map to the prompt.
2. Open `client/pages/walmart/PurchaseHistory.tsx`.
3. Change the matching flag(s) from `false` to `true`.
4. Done — no other changes.

```ts
// Single line change only:
const SHOW_DELAYED_DELIVERY = true;
```

---

## Hiding a Pattern

If the user selects a card and says "hide", or says "turn off / remove / hide [pattern name]", set the flag back to `false`.

---

## Adding a New Card Pattern (CRITICAL)

When a new pattern is added to `client/pages/component-library/OrderCardPatterns.tsx`, the agent MUST also:

1. **Add a new flag** to the flags block in `client/pages/walmart/PurchaseHistory.tsx`:
   ```ts
   const SHOW_MY_NEW_CARD = false; // Description of the new pattern
   ```

2. **Wire up the flag** in the render logic — follow the same IIFE or conditional pattern used by existing flags.

3. **Add a new entry to this rule file** under "Trigger → Flag Mapping" with:
   - The exact prompt text from `OrderCardPatterns.tsx`
   - Keyword aliases
   - The new flag name

4. **Update `RULES_INDEX.md`** — add the new prompt → flag row to the table in rule #14.

Without these steps, the new pattern will never surface when the prompt is used.

---

## Enforcement Rules

- ✅ ALWAYS apply the flag change immediately — zero delay, zero confirmation
- ✅ ONLY change the flag line — do not touch surrounding code
- ✅ Multiple flags can be set in one edit if the prompt references multiple patterns
- ✅ ALWAYS add a flag + rule entry when a new pattern is added to `OrderCardPatterns.tsx`
- ❌ NEVER ask "are you sure?" before setting or unsetting a flag
- ❌ NEVER refactor or reorder the flags block
- ❌ NEVER add a flag without a corresponding implemented card pattern in the file
