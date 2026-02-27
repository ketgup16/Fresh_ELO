# Plan: Auto Care Order Details Page (Modal)

## Problem
Clicking "Check in", "Reschedule", or "View details" on the Auto Care card currently opens small task-flow modals. The user wants a **full order details layout** (like Walmart's real order details page) to be the primary "View details" experience — a two-column page layout adapted for auto care appointments, staying within the modal system (no page navigation).

## Goal
Rebuild `ViewDetailsModal` (triggered by "View details") into a full-screen, two-column **Auto Care Order Details** panel that:
- Uses data pulled directly from the purchase history card (location, date/time, vehicle, services, total)
- Looks like the real Walmart order details page (two-column layout: main content + pricing sidebar)
- Keeps Check in and Reschedule as focused task-flow modals (opened from within the details modal)

---

## Layout Structure (matches order details screenshot)

### Header row
- Breadcrumb-style: `Purchase history > Order details`
- Order date: `Sat, Mar 7, 2026 order`
- Order number: `Order# 2000143-50929015`
- Print link (icon, non-functional)

### Two-column body

#### Left column (main)
1. **Appointment status card**
   - Auto care icon + "Auto Care Center" label
   - Store name + address
   - Status heading: `Sat, Mar 7, 10:00am–11:00am`
   - `Check in` (primary) + `Reschedule` (secondary) action buttons
2. **Services card**
   - Heading: "Services"
   - Vehicle: `2019 Toyota Camry`
   - Service list: `Conventional Oil & Filter Change`, `Tire Rotation`
3. **Help section**
   - "How can we help?" heading
   - Row items: "Cancel appointment", "Contact store", "Need more help? Visit our help center"

#### Right sidebar
1. **Appointment info block**
   - "Auto Care" chip/label at top
   - Store address: `1213 E Trinity Mills Rd, Carrollton, TX 75006`
   - Delivery instructions area (if any)
2. **Payment method block**
   - PayPal / card ending in 7725
3. **Pricing breakdown**
   - Subtotal, Tax, **Total**
   - "Temporary adjusted total" info callout
   - Charge history row
4. **Order number + barcode**
   - `Order# 2000143-50929015`
   - CSS barcode

---

## Implementation Steps

### 1. Create `AutoCareOrderDetailModal.tsx`
A new file at `client/components/walmart/purchase-history/AutoCareOrderDetailModal.tsx`:
- Full-screen modal using `createPortal` + `Scrim`
- Two-column layout: left `main` + right `aside` (sidebar)
- Accepts all existing props: `serviceDetails`, `location`, `statusHeading`, `orderTotal`
- Internal state: none needed (read-only detail view)
- Two action buttons: "Check in" → calls `onCheckIn()`, "Reschedule" → calls `onReschedule()`

### 2. Create `AutoCareOrderDetailModal.module.css`
- `.modalOverlay` — full-screen fixed positioned wrapper
- `.detailPage` — white page container, max-width ~1080px, centered, scrollable
- `.detailHeader` — order number + date row
- `.detailBody` — two-column grid layout (left `2fr` / right `1fr`)
- `.detailCard` — bordered card sections (appointment status, services, help)
- `.sidebar` — sticky right column with pricing breakdown
- Responsive: stack to single column on mobile

### 3. Update `AutoCareModals.tsx`
- Import the new `AutoCareOrderDetailModal`
- Add `openModal === 'viewDetails'` → renders `AutoCareOrderDetailModal`
- `onCheckIn` and `onReschedule` callbacks remain the same (switch modal state)
- Existing `ViewDetailsModal` becomes the **Reschedule** flow only (rename or keep inline-expand as reschedule UX)

### 4. Update `AutoCareOrderCard.tsx`
- No changes needed — wiring already exists via `setOpenModal('viewDetails')`

### 5. Data consistency
All data pulled from card props; no hardcoded data:
- `location` → store address (strip "Carrollton Supercenter at " prefix for sidebar display)
- `statusHeading` → appointment date/time
- `serviceDetails.vehicle` → vehicle label
- `serviceDetails.services` → service list
- `orderTotal` → total in sidebar pricing breakdown

---

## What stays the same
- `CheckInModal` — unchanged (focused check-in confirmation flow)
- Inline date/time reschedule in `ViewDetailsModal` — becomes the Reschedule flow
- CSS barcode in sidebar
- Semantic design tokens throughout
