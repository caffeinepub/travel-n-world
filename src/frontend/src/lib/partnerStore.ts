// Shared localStorage store for partner registrations
// Used by Partner Registration form (write) and Admin Dashboard (read/write)

export type PartnerStatus = "Pending" | "Approved" | "Verified" | "Rejected";

export interface PartnerRegistration {
  id: number;
  name: string;
  company: string;
  phone: string;
  email: string;
  city: string;
  experience: string;
  date: string;
  status: PartnerStatus;
  isReal?: boolean; // true = submitted via form
}

const STORAGE_KEY = "tnw_partner_registrations";

export function getPartnerRegistrations(): PartnerRegistration[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as PartnerRegistration[];
  } catch {
    return [];
  }
}

export function savePartnerRegistration(
  data: Omit<PartnerRegistration, "id" | "date" | "status" | "isReal">,
): PartnerRegistration {
  const existing = getPartnerRegistrations();
  const newEntry: PartnerRegistration = {
    ...data,
    id: Date.now(),
    date: new Date().toISOString().split("T")[0],
    status: "Pending",
    isReal: true,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify([newEntry, ...existing]));
  return newEntry;
}

export function updatePartnerStatus(id: number, status: PartnerStatus): void {
  const existing = getPartnerRegistrations();
  const updated = existing.map((r) => (r.id === id ? { ...r, status } : r));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}
