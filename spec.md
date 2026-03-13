# Travel N World

## Current State
The admin dashboard has 6 tabs: Overview, Booking Inquiries, Travel Leads, Partners, B2B Plans, Bookings. Partners only have one implicit type (travel agents). The Overview has 6 stat cards (500k+ partners, 100k+ leads, 100k+ inquiries, 25k+ bookings, 50k+ members, 150k+ daily reach). There is a BookingsTab with travel package bookings only.

## Requested Changes (Diff)

### Add
- `PartnerType` type: `'Travel Agent' | 'Hotel Partner' | 'DMC Partner'`
- `partnerType` field on `PartnerReg` interface (and INITIAL_REGISTRATIONS sample data)
- `HotelBooking` interface: id, customerName, hotelName, city, roomType, checkIn, checkOut, bookingValue, status
- `DmcBooking` interface: id, customerName, destination, dmcPartner, serviceType, travelDate, bookingValue, status
- `HOTEL_BOOKINGS` sample data (20 records) featuring Taj Palace-Delhi, Leela Palace-Jaipur, Taj Lake Palace-Udaipur, The Oberoi-Mumbai, Radisson Blu-Goa etc.
- `DMC_BOOKINGS` sample data (20 records) covering Airport Transfers, Local Sightseeing, Adventure Tours, Pilgrimage Tours across Uttarakhand (Char Dham, Kedarnath, Badrinath), Kashmir, Goa, Kerala, Himachal etc.
- Two new NAV_ITEMS: `{ id: 'hotel-bookings', label: 'Hotel Bookings', icon: Building2 }` and `{ id: 'dmc-bookings', label: 'DMC Bookings', icon: Globe }`
- `HotelBookingsTab` component: table with Customer Name, Hotel Name, City, Room Type, Check-in, Check-out, Booking Value, Status; with search filter
- `DmcBookingsTab` component: table with Customer Name, Destination, DMC Partner, Service Type, Travel Date, Booking Value, Status; with search filter
- 3 new stat cards in OverviewTab: Total Hotel Bookings (40,000+), Total Travel Package Bookings (35,000+), Total DMC Service Bookings (25,000+)

### Modify
- `PartnerReg` interface: add `partnerType?: PartnerType`
- `INITIAL_REGISTRATIONS`: add `partnerType` to each record (Rajesh=Travel Agent, Priya=Hotel Partner, Aman=DMC Partner, Sunita=Travel Agent, Vikram=Hotel Partner)
- `PartnersTab`: add Partner Type column to the table; add a type filter dropdown (All / Travel Agent / Hotel Partner / DMC Partner); update search to also filter by partnerType
- `OverviewTab`: append 3 new booking category stat cards after the existing 6 cards
- Main `AdminDashboard`: add state for `hotelBookings` and `dmcBookings`; render `HotelBookingsTab` and `DmcBookingsTab` when activeTab is `'hotel-bookings'` or `'dmc-bookings'`

### Remove
- Nothing removed

## Implementation Plan
1. Add types and interfaces at top of AdminDashboard.tsx
2. Add HOTEL_BOOKINGS and DMC_BOOKINGS sample data arrays
3. Update INITIAL_REGISTRATIONS to include partnerType
4. Update OverviewTab to include 3 new booking stat cards
5. Update PartnersTab to add Partner Type column and filter
6. Add HotelBookingsTab component
7. Add DmcBookingsTab component
8. Update NAV_ITEMS to include the 2 new tabs
9. Update main AdminDashboard component state and rendering
