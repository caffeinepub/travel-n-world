# Travel N World – 8-Page Multi-Page Website

## Current State
The site already has 7 separate pages with routing:
- Home (`/`), About (`/about`), Services (`/services`), Destinations (`/destinations`), Partners (`/partners`), Partner (`/partner` – registration), Contact (`/contact`)
- Navigation currently shows: Home, About, Services, Destinations, Partners, Partner Registration, Contact (7 items)
- No dedicated Pricing page exists

## Requested Changes (Diff)

### Add
- New `/pricing` page with 3 membership plans: Starter (₹3000/3mo), Professional (₹6000/6mo), Premium (₹12000/1yr – highlighted as recommended)
- Pricing route in App.tsx
- "Pricing" nav link in Navbar between Partners and Partner Registration

### Modify
- Navbar `navLinks` array: update to include all 8 pages in order: Home, About, Services, Destinations, Partners, Pricing, Partner Registration, Contact
- App.tsx: add pricingRoute pointing to new Pricing page
- Ensure nav labels match: "Home", "About", "Services", "Destinations", "Partners", "Pricing", "Partner Registration", "Contact"

### Remove
- Nothing removed

## Implementation Plan
1. Create `src/frontend/src/pages/Pricing.tsx` with 3 plan cards (Starter, Professional, Premium) – Premium highlighted with blue border and "Recommended" badge
2. Update `src/frontend/src/App.tsx` to add pricingRoute at `/pricing`
3. Update `src/frontend/src/components/Navbar.tsx` navLinks to include Pricing at correct position
