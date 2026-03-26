// ─── Admin persistent storage helpers ───────────────────────────────────────

export const ADMIN_STORAGE_KEYS = {
  AUTH: "tnw_admin_auth",
  LEADS: "travel_leads",
  DM_LEADS: "tnw_dm_leads",
  PARTNER_REGISTRATIONS: "tnw_partner_registrations",
  PAYMENT_REQUESTS: "tnw_payment_requests",
  BOOKING_INQUIRIES: "tnw_booking_inquiries",
  BOOKINGS: "tnw_bookings",
  HOTEL_BOOKINGS: "tnw_hotel_bookings",
  DMC_BOOKINGS: "tnw_dmc_bookings",
  B2B_PLANS: "tnw_b2b_plans",
  PARTNER_PLANS: "tnw_partner_plans",
};

export function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

export function hasStorageKey(key: string): boolean {
  try {
    return localStorage.getItem(key) !== null;
  } catch {
    return false;
  }
}
