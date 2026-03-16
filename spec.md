# Travel N World

## Current State
The Pricing page has three B2B membership plans (Starter ₹3000, Professional ₹6000, Premium ₹12000). Clicking "Get Started", "Choose Professional", or "Go Premium" opens an in-page `PurchasePlanModal` that collects agent info and immediately saves the plan to localStorage without any real payment verification. The Admin Dashboard has no Payment Requests section.

## Requested Changes (Diff)

### Add
- New `/payment` route and `PaymentPage.tsx` component
  - Shows selected plan name and amount
  - Displays UPI ID `travelnworld@upi` with copy button and step-by-step instructions
  - Step 1: UPI instructions
  - Step 2: Screenshot upload
  - Step 3: Name, Phone, Transaction ID form fields
  - Step 4: Submit button that saves payment request to localStorage key `tnw_payment_requests`
  - Shows success confirmation after submission
- New "Payment Requests" tab in AdminDashboard sidebar
  - Lists all payment requests (Name, Phone, Plan, Amount, Transaction ID, Screenshot preview)
  - Approve button: activates plan in localStorage, marks request approved
  - Reject button: marks request rejected

### Modify
- `Pricing.tsx`: Change plan CTA buttons to navigate to `/payment?plan=<planId>` instead of opening the modal
- `App.tsx`: Add `/payment` route
- `AdminDashboard.tsx`: Add `payment-requests` to NAV_ITEMS and render the new tab

### Remove
- Nothing removed; existing modal can remain as fallback

## Implementation Plan
1. Create `PaymentPage.tsx` with UPI instructions, screenshot upload, form, and localStorage submit
2. Update `Pricing.tsx` plan buttons to use `useNavigate` to `/payment?plan=<id>`
3. Register `/payment` route in `App.tsx`
4. Add Payment Requests tab to `AdminDashboard.tsx` with approve/reject actions
