import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  BarChart2,
  CheckCircle,
  Download,
  Mail,
  MessageCircle,
  Plus,
  Search,
  Send,
  TrendingUp,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// ─── Types ───────────────────────────────────────────────────────────────────

type DMLeadStatus =
  | "New Lead"
  | "Contacted"
  | "Interested"
  | "Negotiation"
  | "Converted"
  | "Closed";

type LeadSource =
  | "Book Now Form"
  | "Website Inquiry"
  | "Contact Form"
  | "Partner Registration"
  | "Manual";

interface DMLead {
  id: number;
  name: string;
  phone: string;
  email: string;
  destination: string;
  budget: string;
  travelDate: string;
  travelers?: number;
  message?: string;
  source: LeadSource;
  status: DMLeadStatus;
  createdAt: string;
}

interface EmailCampaign {
  id: number;
  name: string;
  subject: string;
  body: string;
  segment: string;
  sentDate: string;
  recipients: number;
  status: "Sent" | "Draft";
}

interface WACompign {
  id: number;
  name: string;
  message: string;
  segment: string;
  sentDate: string;
  recipients: number;
  status: "Sent" | "Draft";
}

interface ContactRecord {
  name: string;
  phone: string;
  email: string;
  type: string;
  city: string;
  source: string;
  dateAdded: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const STATUS_COLORS: Record<DMLeadStatus, { bg: string; color: string }> = {
  "New Lead": { bg: "#dbeafe", color: "#1d4ed8" },
  Contacted: { bg: "#fef3c7", color: "#b45309" },
  Interested: { bg: "#ede9fe", color: "#7c3aed" },
  Negotiation: { bg: "#fed7aa", color: "#c2410c" },
  Converted: { bg: "#d1fae5", color: "#065f46" },
  Closed: { bg: "#fee2e2", color: "#991b1b" },
};

const ALL_STATUSES: DMLeadStatus[] = [
  "New Lead",
  "Contacted",
  "Interested",
  "Negotiation",
  "Converted",
  "Closed",
];

const ALL_SOURCES: LeadSource[] = [
  "Book Now Form",
  "Website Inquiry",
  "Contact Form",
  "Partner Registration",
  "Manual",
];

const EMAIL_TEMPLATES = [
  {
    name: "Dubai Package Offer",
    subject: "Exclusive Dubai Package – 5N/6D from ₹45,000",
    body: "Dear Traveller,\n\nWe are pleased to offer you an exclusive Dubai Holiday Package:\n\n🏙️ 5 Nights / 6 Days\n✈️ Flights Included\n🏨 4-Star Hotel Stay\n🚗 Airport Transfers\n🎡 Burj Khalifa Entry\n\nStarting from just ₹45,000 per person (twin sharing).\n\nBook now and save up to 20%!\n\nCall us: +91 7290087054\nEmail: info@travelnworld.com\n\nBest regards,\nTravel N World Team",
  },
  {
    name: "Thailand Holiday Deal",
    subject: "Thailand Holiday Deal – 4N/5D from ₹35,000",
    body: "Dear Traveller,\n\nExplore the Land of Smiles with our Thailand Holiday Package:\n\n🌴 4 Nights / 5 Days\n✈️ Flights + Visa\n🏨 Resort Stay\n🤿 Island Tours\n🍜 Thai Cuisine Experience\n\nStarting from ₹35,000 per person.\nLimited seats available!\n\nCall us: +91 7290087054\nEmail: info@travelnworld.com\n\nBest regards,\nTravel N World Team",
  },
  {
    name: "Kashmir Summer Offer",
    subject: "Kashmir Summer Offer – 6N/7D from ₹28,000",
    body: "Dear Traveller,\n\nDiscover Paradise on Earth this Summer with our Kashmir Package:\n\n🏔️ 6 Nights / 7 Days\n🚗 Cab Transfers\n🏨 Houseboat + Hotel Stay\n⛵ Dal Lake Shikara Ride\n🌸 Tulip Garden Visit\n\nStarting from ₹28,000 per person.\nBook before 30 June and save 15%!\n\nCall us: +91 7290087054\n\nBest regards,\nTravel N World Team",
  },
];

const WA_TEMPLATES = [
  {
    name: "Dubai Package Promo",
    message:
      "🏙️ *Dubai Package Special!*\n\n5N/6D from ₹45,000 only!\n✈️ Flights + Hotel + Tours included\n\nBook NOW! Reply YES to confirm or call +91 7290087054\n\n- Travel N World",
  },
  {
    name: "Thailand Holiday Deal",
    message:
      "🌴 *Thailand Deal – Limited Seats!*\n\n4N/5D from ₹35,000\n✈️ Flights + Visa + Resort Stay\n\nCall +91 7290087054 to book.\n\n- Travel N World",
  },
  {
    name: "Kashmir Summer Offer",
    message:
      "🏔️ *Kashmir Summer Special!*\n\n6N/7D from ₹28,000\n🏨 Houseboat + Hotel + Sightseeing\n\nBook before 30 June! Call +91 7290087054\n\n- Travel N World",
  },
];

const SEGMENTS = [
  "All Customers",
  "Travel Agents",
  "Hotel Partners",
  "DMC Partners",
  "Previous Inquiries",
];

const MONTHLY_DATA = [
  { month: "Jan", leads: 148, emails: 320, wa: 480, converted: 22 },
  { month: "Feb", leads: 165, emails: 410, wa: 560, converted: 28 },
  { month: "Mar", leads: 210, emails: 520, wa: 720, converted: 35 },
  { month: "Apr", leads: 195, emails: 480, wa: 650, converted: 31 },
  { month: "May", leads: 230, emails: 580, wa: 800, converted: 42 },
  { month: "Jun", leads: 292, emails: 690, wa: 390, converted: 51 },
];

const TOP_DESTINATIONS = [
  { name: "Dubai", leads: 340, color: "#1e40af" },
  { name: "Thailand", leads: 210, color: "#e53935" },
  { name: "Kashmir", leads: 180, color: "#7c3aed" },
  { name: "Bali", leads: 150, color: "#059669" },
  { name: "Singapore", leads: 120, color: "#d97706" },
];

const INITIAL_LEADS: DMLead[] = [
  {
    id: 1,
    name: "Rahul Sharma",
    phone: "+91 9810123456",
    email: "rahul@email.com",
    destination: "Dubai",
    budget: "₹50,000",
    travelDate: "2026-04-15",
    source: "Book Now Form",
    status: "New Lead",
    createdAt: "2026-03-01",
  },
  {
    id: 2,
    name: "Priya Patel",
    phone: "+91 9820234567",
    email: "priya@email.com",
    destination: "Thailand",
    budget: "₹35,000",
    travelDate: "2026-05-01",
    source: "Website Inquiry",
    status: "Contacted",
    createdAt: "2026-03-02",
  },
  {
    id: 3,
    name: "Ankit Gupta",
    phone: "+91 9830345678",
    email: "ankit@email.com",
    destination: "Kashmir",
    budget: "₹28,000",
    travelDate: "2026-06-10",
    source: "Contact Form",
    status: "Interested",
    createdAt: "2026-03-03",
  },
  {
    id: 4,
    name: "Sunita Verma",
    phone: "+91 9840456789",
    email: "sunita@email.com",
    destination: "Maldives",
    budget: "₹1,20,000",
    travelDate: "2026-04-20",
    source: "Book Now Form",
    status: "Negotiation",
    createdAt: "2026-03-04",
  },
  {
    id: 5,
    name: "Vikram Singh",
    phone: "+91 9850567890",
    email: "vikram@email.com",
    destination: "Bali",
    budget: "₹65,000",
    travelDate: "2026-07-01",
    source: "Website Inquiry",
    status: "Converted",
    createdAt: "2026-03-05",
  },
  {
    id: 6,
    name: "Meena Joshi",
    phone: "+91 9860678901",
    email: "meena@email.com",
    destination: "Singapore",
    budget: "₹80,000",
    travelDate: "2026-08-15",
    source: "Manual",
    status: "Closed",
    createdAt: "2026-03-06",
  },
];

const INITIAL_EMAIL_CAMPAIGNS: EmailCampaign[] = [
  {
    id: 1,
    name: "Dubai Package Offer",
    subject: "Exclusive Dubai Package – 5N/6D from ₹45,000",
    body: "",
    segment: "All Customers",
    sentDate: "2026-02-15",
    recipients: 1240,
    status: "Sent",
  },
  {
    id: 2,
    name: "Thailand Holiday Deal",
    subject: "Thailand Holiday Deal – 4N/5D from ₹35,000",
    body: "",
    segment: "Previous Inquiries",
    sentDate: "2026-02-28",
    recipients: 680,
    status: "Sent",
  },
  {
    id: 3,
    name: "Kashmir Summer Offer",
    subject: "Kashmir Summer Offer – 6N/7D from ₹28,000",
    body: "",
    segment: "Travel Agents",
    sentDate: "2026-03-05",
    recipients: 420,
    status: "Sent",
  },
];

const INITIAL_WA_CAMPAIGNS: WACompign[] = [
  {
    id: 1,
    name: "Dubai Package Promo",
    message: "",
    segment: "All Customers",
    sentDate: "2026-02-16",
    recipients: 850,
    status: "Sent",
  },
  {
    id: 2,
    name: "Thailand Deal Alert",
    message: "",
    segment: "Previous Inquiries",
    sentDate: "2026-03-01",
    recipients: 510,
    status: "Sent",
  },
];

// ─── Storage helpers ──────────────────────────────────────────────────────────

function loadLeads(): DMLead[] {
  try {
    const stored = JSON.parse(localStorage.getItem("tnw_dm_leads") || "[]");
    if (stored.length === 0) return INITIAL_LEADS;
    return stored;
  } catch {
    return INITIAL_LEADS;
  }
}

function saveLeads(leads: DMLead[]) {
  try {
    localStorage.setItem("tnw_dm_leads", JSON.stringify(leads));
  } catch {
    // ignore
  }
}

function loadEmailCampaigns(): EmailCampaign[] {
  try {
    const stored = JSON.parse(
      localStorage.getItem("tnw_email_campaigns") || "[]",
    );
    if (stored.length === 0) return INITIAL_EMAIL_CAMPAIGNS;
    return stored;
  } catch {
    return INITIAL_EMAIL_CAMPAIGNS;
  }
}

function saveEmailCampaigns(campaigns: EmailCampaign[]) {
  try {
    localStorage.setItem("tnw_email_campaigns", JSON.stringify(campaigns));
  } catch {
    // ignore
  }
}

function loadWACampaigns(): WACompign[] {
  try {
    const stored = JSON.parse(localStorage.getItem("tnw_wa_campaigns") || "[]");
    if (stored.length === 0) return INITIAL_WA_CAMPAIGNS;
    return stored;
  } catch {
    return INITIAL_WA_CAMPAIGNS;
  }
}

function saveWACampaigns(campaigns: WACompign[]) {
  try {
    localStorage.setItem("tnw_wa_campaigns", JSON.stringify(campaigns));
  } catch {
    // ignore
  }
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({
  icon,
  label,
  value,
  color,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
  sub?: string;
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 14,
        padding: "20px 22px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
        display: "flex",
        alignItems: "center",
        gap: 16,
        flex: 1,
        minWidth: 0,
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          background: `${color}18`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <span style={{ color }}>{icon}</span>
      </div>
      <div>
        <div
          style={{
            fontSize: 24,
            fontWeight: 800,
            color: "#0f172a",
            lineHeight: 1.1,
          }}
        >
          {value}
        </div>
        <div style={{ fontSize: 13, color: "#64748b", marginTop: 2 }}>
          {label}
        </div>
        {sub && (
          <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 1 }}>
            {sub}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Overview Tab ─────────────────────────────────────────────────────────────

function OverviewTab({ leads }: { leads: DMLead[] }) {
  const total = leads.length;
  const converted = leads.filter((l) => l.status === "Converted").length;
  const convRate = total ? Math.round((converted / total) * 100 * 10) / 10 : 0;
  const maxLeads = Math.max(...TOP_DESTINATIONS.map((d) => d.leads));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Stat Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
        }}
      >
        <StatCard
          icon={<Users size={22} />}
          label="Total Leads"
          value={total.toLocaleString()}
          color="#1e40af"
          sub="All time"
        />
        <StatCard
          icon={<TrendingUp size={22} />}
          label="Conversion Rate"
          value={`${convRate}%`}
          color="#059669"
          sub="Leads → Converted"
        />
        <StatCard
          icon={<Mail size={22} />}
          label="Email Campaigns Sent"
          value="24"
          color="#7c3aed"
          sub="This year"
        />
        <StatCard
          icon={<MessageCircle size={22} />}
          label="WhatsApp Messages"
          value="3,600"
          color="#25d366"
          sub="Sent this year"
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 20,
        }}
      >
        {/* Lead Status Funnel */}
        <div
          style={{
            background: "#fff",
            borderRadius: 14,
            padding: 20,
            boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
          }}
        >
          <h3
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 700,
              fontSize: 15,
              color: "#0f172a",
              marginBottom: 16,
            }}
          >
            Lead Status Funnel
          </h3>
          {ALL_STATUSES.map((st) => {
            const count = leads.filter((l) => l.status === st).length;
            const pct = total ? Math.round((count / total) * 100) : 0;
            const c = STATUS_COLORS[st];
            return (
              <div key={st} style={{ marginBottom: 12 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 4,
                    fontSize: 13,
                  }}
                >
                  <span style={{ fontWeight: 600, color: "#334155" }}>
                    {st}
                  </span>
                  <span style={{ color: "#64748b" }}>
                    {count} ({pct}%)
                  </span>
                </div>
                <div
                  style={{
                    height: 8,
                    background: "#f1f5f9",
                    borderRadius: 99,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${pct}%`,
                      height: "100%",
                      background: c.color,
                      borderRadius: 99,
                      transition: "width 0.6s ease",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Top Destinations */}
        <div
          style={{
            background: "#fff",
            borderRadius: 14,
            padding: 20,
            boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
          }}
        >
          <h3
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 700,
              fontSize: 15,
              color: "#0f172a",
              marginBottom: 16,
            }}
          >
            Top Destination Leads
          </h3>
          {TOP_DESTINATIONS.map((dest) => {
            const pct = Math.round((dest.leads / maxLeads) * 100);
            return (
              <div key={dest.name} style={{ marginBottom: 12 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 4,
                    fontSize: 13,
                  }}
                >
                  <span style={{ fontWeight: 600, color: "#334155" }}>
                    {dest.name}
                  </span>
                  <span style={{ color: "#64748b" }}>{dest.leads} leads</span>
                </div>
                <div
                  style={{
                    height: 8,
                    background: "#f1f5f9",
                    borderRadius: 99,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${pct}%`,
                      height: "100%",
                      background: dest.color,
                      borderRadius: 99,
                      transition: "width 0.6s ease",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Monthly Performance Table */}
      <div
        style={{
          background: "#fff",
          borderRadius: 14,
          padding: 20,
          boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
        }}
      >
        <h3
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 700,
            fontSize: 15,
            color: "#0f172a",
            marginBottom: 16,
          }}
        >
          Monthly Campaign Performance
        </h3>
        <div style={{ overflowX: "auto" }}>
          <table
            style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}
          >
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                {[
                  "Month",
                  "Leads",
                  "Emails Sent",
                  "WhatsApp Sent",
                  "Converted",
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "10px 14px",
                      textAlign: "left",
                      fontWeight: 700,
                      color: "#475569",
                      borderBottom: "1px solid #e2e8f0",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MONTHLY_DATA.map((row, i) => (
                <tr
                  key={row.month}
                  style={{
                    background: i % 2 === 0 ? "#fff" : "#f8fafc",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "#eff6ff";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      i % 2 === 0 ? "#fff" : "#f8fafc";
                  }}
                >
                  <td
                    style={{
                      padding: "10px 14px",
                      fontWeight: 700,
                      color: "#1e40af",
                    }}
                  >
                    {row.month}
                  </td>
                  <td style={{ padding: "10px 14px", color: "#334155" }}>
                    {row.leads}
                  </td>
                  <td style={{ padding: "10px 14px", color: "#334155" }}>
                    {row.emails}
                  </td>
                  <td style={{ padding: "10px 14px", color: "#334155" }}>
                    {row.wa}
                  </td>
                  <td style={{ padding: "10px 14px" }}>
                    <span
                      style={{
                        background: "#d1fae5",
                        color: "#065f46",
                        borderRadius: 99,
                        padding: "2px 10px",
                        fontWeight: 700,
                        fontSize: 12,
                      }}
                    >
                      {row.converted}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Add Lead Modal ───────────────────────────────────────────────────────────

function AddLeadModal({
  open,
  onClose,
  onAdd,
}: {
  open: boolean;
  onClose: () => void;
  onAdd: (lead: DMLead) => void;
}) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    destination: "",
    budget: "",
    travelDate: "",
    source: "Manual" as LeadSource,
    status: "New Lead" as DMLeadStatus,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      id: Date.now(),
      ...form,
      travelers: 1,
      message: "",
      createdAt: new Date().toISOString().split("T")[0],
    });
    setForm({
      name: "",
      phone: "",
      email: "",
      destination: "",
      budget: "",
      travelDate: "",
      source: "Manual",
      status: "New Lead",
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        data-ocid="dm.add_lead.dialog"
        className="max-w-[500px] w-[calc(100vw-2rem)] max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle style={{ fontFamily: "Poppins, sans-serif" }}>
            Add New Lead
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="al-name">Full Name *</Label>
              <Input
                id="al-name"
                data-ocid="dm.add_lead.name_input"
                required
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
                placeholder="Rahul Sharma"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="al-phone">Phone *</Label>
              <Input
                id="al-phone"
                data-ocid="dm.add_lead.phone_input"
                required
                value={form.phone}
                onChange={(e) =>
                  setForm((p) => ({ ...p, phone: e.target.value }))
                }
                placeholder="+91 98XXXXXXXX"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="al-email">Email *</Label>
            <Input
              id="al-email"
              data-ocid="dm.add_lead.email_input"
              type="email"
              required
              value={form.email}
              onChange={(e) =>
                setForm((p) => ({ ...p, email: e.target.value }))
              }
              placeholder="rahul@email.com"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="al-dest">Destination *</Label>
              <Input
                id="al-dest"
                data-ocid="dm.add_lead.destination_input"
                required
                value={form.destination}
                onChange={(e) =>
                  setForm((p) => ({ ...p, destination: e.target.value }))
                }
                placeholder="Dubai"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="al-budget">Budget</Label>
              <Input
                id="al-budget"
                data-ocid="dm.add_lead.budget_input"
                value={form.budget}
                onChange={(e) =>
                  setForm((p) => ({ ...p, budget: e.target.value }))
                }
                placeholder="₹50,000"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="al-date">Travel Date</Label>
              <Input
                id="al-date"
                data-ocid="dm.add_lead.date_input"
                type="date"
                value={form.travelDate}
                onChange={(e) =>
                  setForm((p) => ({ ...p, travelDate: e.target.value }))
                }
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="al-source">Lead Source</Label>
              <select
                id="al-source"
                data-ocid="dm.add_lead.source_select"
                value={form.source}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    source: e.target.value as LeadSource,
                  }))
                }
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  borderRadius: 8,
                  border: "1px solid #e2e8f0",
                  fontSize: 14,
                  background: "#fff",
                }}
              >
                {ALL_SOURCES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="al-status">Initial Status</Label>
            <select
              id="al-status"
              data-ocid="dm.add_lead.status_select"
              value={form.status}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  status: e.target.value as DMLeadStatus,
                }))
              }
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: 8,
                border: "1px solid #e2e8f0",
                fontSize: 14,
                background: "#fff",
              }}
            >
              {ALL_STATUSES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <Button
              data-ocid="dm.add_lead.submit_button"
              type="submit"
              className="flex-1"
              style={{ background: "#1e40af", color: "#fff" }}
            >
              Add Lead
            </Button>
            <Button
              data-ocid="dm.add_lead.cancel_button"
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── Leads Pipeline Tab ───────────────────────────────────────────────────────

function LeadsPipelineTab({
  leads,
  setLeads,
}: {
  leads: DMLead[];
  setLeads: (l: DMLead[]) => void;
}) {
  const [filterStatus, setFilterStatus] = useState<DMLeadStatus | "All">("All");
  const [filterSource, setFilterSource] = useState<LeadSource | "All">("All");
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = leads.filter((l) => {
    if (filterStatus !== "All" && l.status !== filterStatus) return false;
    if (filterSource !== "All" && l.source !== filterSource) return false;
    if (
      search &&
      !l.name.toLowerCase().includes(search.toLowerCase()) &&
      !l.email.toLowerCase().includes(search.toLowerCase()) &&
      !l.destination.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    return true;
  });

  const updateStatus = (id: number, status: DMLeadStatus) => {
    const updated = leads.map((l) => (l.id === id ? { ...l, status } : l));
    setLeads(updated);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Stage count pills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {ALL_STATUSES.map((st) => {
          const count = leads.filter((l) => l.status === st).length;
          const c = STATUS_COLORS[st];
          return (
            <button
              key={st}
              data-ocid="dm.leads.stage-filter.tab"
              type="button"
              onClick={() => setFilterStatus(filterStatus === st ? "All" : st)}
              style={{
                background: filterStatus === st ? c.color : c.bg,
                color: filterStatus === st ? "#fff" : c.color,
                border: `1.5px solid ${c.color}`,
                borderRadius: 99,
                padding: "4px 14px",
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {st} ({count})
            </button>
          );
        })}
      </div>

      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <Search
            size={15}
            style={{
              position: "absolute",
              left: 10,
              top: "50%",
              transform: "translateY(-50%)",
              color: "#94a3b8",
            }}
          />
          <input
            data-ocid="dm.leads.search_input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, destination…"
            style={{
              width: "100%",
              paddingLeft: 32,
              paddingRight: 12,
              paddingTop: 8,
              paddingBottom: 8,
              borderRadius: 8,
              border: "1.5px solid #e2e8f0",
              fontSize: 13,
              background: "#fff",
              outline: "none",
            }}
          />
        </div>
        <select
          data-ocid="dm.leads.source_select"
          value={filterSource}
          onChange={(e) =>
            setFilterSource(e.target.value as LeadSource | "All")
          }
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            border: "1.5px solid #e2e8f0",
            fontSize: 13,
            background: "#fff",
          }}
        >
          <option value="All">All Sources</option>
          {ALL_SOURCES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <Button
          data-ocid="dm.leads.add_button"
          onClick={() => setShowAddModal(true)}
          style={{ background: "#1e40af", color: "#fff", gap: 6 }}
          className="flex items-center gap-1.5"
        >
          <Plus size={15} /> Add Lead
        </Button>
      </div>

      {/* Table */}
      <div
        style={{
          background: "#fff",
          borderRadius: 14,
          boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
          overflow: "hidden",
        }}
      >
        <div style={{ overflowX: "auto" }}>
          <table
            data-ocid="dm.leads.table"
            style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}
          >
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                {[
                  "Name",
                  "Phone",
                  "Email",
                  "Destination",
                  "Budget",
                  "Travel Date",
                  "Source",
                  "Status",
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "10px 14px",
                      textAlign: "left",
                      fontWeight: 700,
                      color: "#475569",
                      borderBottom: "1px solid #e2e8f0",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    data-ocid="dm.leads.empty_state"
                    style={{
                      padding: 40,
                      textAlign: "center",
                      color: "#94a3b8",
                    }}
                  >
                    No leads found.
                  </td>
                </tr>
              )}
              {filtered.map((lead, i) => {
                const c = STATUS_COLORS[lead.status];
                return (
                  <tr
                    key={lead.id}
                    data-ocid={`dm.leads.item.${i + 1}`}
                    style={{
                      background: i % 2 === 0 ? "#fff" : "#f8fafc",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        "#eff6ff";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        i % 2 === 0 ? "#fff" : "#f8fafc";
                    }}
                  >
                    <td
                      style={{
                        padding: "10px 14px",
                        fontWeight: 600,
                        color: "#1e293b",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {lead.name}
                    </td>
                    <td
                      style={{
                        padding: "10px 14px",
                        color: "#475569",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {lead.phone}
                    </td>
                    <td
                      style={{
                        padding: "10px 14px",
                        color: "#475569",
                        maxWidth: 180,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {lead.email}
                    </td>
                    <td
                      style={{
                        padding: "10px 14px",
                        color: "#334155",
                        fontWeight: 600,
                      }}
                    >
                      {lead.destination}
                    </td>
                    <td style={{ padding: "10px 14px", color: "#475569" }}>
                      {lead.budget || "—"}
                    </td>
                    <td
                      style={{
                        padding: "10px 14px",
                        color: "#475569",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {lead.travelDate || "—"}
                    </td>
                    <td style={{ padding: "10px 14px" }}>
                      <span
                        style={{
                          background: "#f1f5f9",
                          color: "#475569",
                          borderRadius: 99,
                          padding: "2px 8px",
                          fontSize: 11,
                          fontWeight: 600,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {lead.source}
                      </span>
                    </td>
                    <td style={{ padding: "10px 14px" }}>
                      <select
                        data-ocid={`dm.leads.status_select.${i + 1}`}
                        value={lead.status}
                        onChange={(e) =>
                          updateStatus(lead.id, e.target.value as DMLeadStatus)
                        }
                        style={{
                          padding: "4px 8px",
                          borderRadius: 6,
                          border: `1.5px solid ${c.color}`,
                          fontSize: 11,
                          fontWeight: 700,
                          background: c.bg,
                          color: c.color,
                          cursor: "pointer",
                        }}
                      >
                        {ALL_STATUSES.map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <AddLeadModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={(lead) => {
          const updated = [lead, ...leads];
          setLeads(updated);
          toast.success("Lead added successfully!");
        }}
      />
    </div>
  );
}

// ─── Email Campaigns Tab ──────────────────────────────────────────────────────

function EmailCampaignsTab() {
  const [campaigns, setCampaigns] =
    useState<EmailCampaign[]>(loadEmailCampaigns);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [segment, setSegment] = useState("All Customers");
  const [sending, setSending] = useState(false);

  const applyTemplate = (tpl: (typeof EMAIL_TEMPLATES)[0]) => {
    setSubject(tpl.subject);
    setBody(tpl.body);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !body.trim()) {
      toast.error("Please fill in subject and body.");
      return;
    }
    setSending(true);
    await new Promise((r) => setTimeout(r, 1200));
    const recipientMap: Record<string, number> = {
      "All Customers": 1240,
      "Travel Agents": 420,
      "Hotel Partners": 310,
      "DMC Partners": 180,
      "Previous Inquiries": 680,
    };
    const newCampaign: EmailCampaign = {
      id: Date.now(),
      name: subject.slice(0, 40) + (subject.length > 40 ? "..." : ""),
      subject,
      body,
      segment,
      sentDate: new Date().toISOString().split("T")[0],
      recipients: recipientMap[segment] ?? 500,
      status: "Sent",
    };
    const updated = [newCampaign, ...campaigns];
    setCampaigns(updated);
    saveEmailCampaigns(updated);
    setSending(false);
    setSubject("");
    setBody("");
    toast.success(
      `Email campaign sent to ${newCampaign.recipients} ${segment}!`,
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Composer */}
      <div
        style={{
          background: "#fff",
          borderRadius: 14,
          padding: 24,
          boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
        }}
      >
        <h3
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 700,
            fontSize: 16,
            color: "#0f172a",
            marginBottom: 16,
          }}
        >
          ✉️ Compose Email Campaign
        </h3>

        {/* Templates */}
        <div style={{ marginBottom: 16 }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#64748b",
              marginBottom: 8,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            Quick Templates
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {EMAIL_TEMPLATES.map((tpl) => (
              <button
                key={tpl.name}
                data-ocid="dm.email.template_button"
                type="button"
                onClick={() => applyTemplate(tpl)}
                style={{
                  background: "#eff6ff",
                  color: "#1e40af",
                  border: "1px solid #bfdbfe",
                  borderRadius: 8,
                  padding: "6px 14px",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#dbeafe";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#eff6ff";
                }}
              >
                {tpl.name}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSend} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="ec-subject">Subject Line *</Label>
            <Input
              id="ec-subject"
              data-ocid="dm.email.subject_input"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Dubai Package Offer – Book Now!"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ec-segment">Target Segment</Label>
            <select
              id="ec-segment"
              data-ocid="dm.email.segment_select"
              value={segment}
              onChange={(e) => setSegment(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: 8,
                border: "1px solid #e2e8f0",
                fontSize: 14,
                background: "#fff",
              }}
            >
              {SEGMENTS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ec-body">Email Body *</Label>
            <Textarea
              id="ec-body"
              data-ocid="dm.email.body_textarea"
              required
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={8}
              placeholder="Write your email content here…"
              className="resize-none font-mono text-sm"
            />
          </div>
          <Button
            data-ocid="dm.email.send_button"
            type="submit"
            disabled={sending}
            className="flex items-center gap-2"
            style={{ background: "#1e40af", color: "#fff" }}
          >
            {sending ? (
              <>
                <span
                  style={{
                    width: 14,
                    height: 14,
                    border: "2px solid #fff",
                    borderTopColor: "transparent",
                    borderRadius: "50%",
                    display: "inline-block",
                    animation: "spin 0.7s linear infinite",
                  }}
                />
                Sending…
              </>
            ) : (
              <>
                <Send size={15} /> Send Campaign
              </>
            )}
          </Button>
        </form>
      </div>

      {/* Campaign History */}
      <div
        style={{
          background: "#fff",
          borderRadius: 14,
          padding: 20,
          boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
        }}
      >
        <h3
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 700,
            fontSize: 15,
            color: "#0f172a",
            marginBottom: 16,
          }}
        >
          Campaign History
        </h3>
        <div style={{ overflowX: "auto" }}>
          <table
            data-ocid="dm.email.campaigns.table"
            style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}
          >
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                {[
                  "Campaign Name",
                  "Segment",
                  "Sent Date",
                  "Recipients",
                  "Status",
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "10px 14px",
                      textAlign: "left",
                      fontWeight: 700,
                      color: "#475569",
                      borderBottom: "1px solid #e2e8f0",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {campaigns.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    data-ocid="dm.email.campaigns.empty_state"
                    style={{
                      padding: 32,
                      textAlign: "center",
                      color: "#94a3b8",
                    }}
                  >
                    No campaigns yet.
                  </td>
                </tr>
              )}
              {campaigns.map((c, i) => (
                <tr
                  key={c.id}
                  data-ocid={`dm.email.campaigns.item.${i + 1}`}
                  style={{
                    background: i % 2 === 0 ? "#fff" : "#f8fafc",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "#eff6ff";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      i % 2 === 0 ? "#fff" : "#f8fafc";
                  }}
                >
                  <td
                    style={{
                      padding: "10px 14px",
                      fontWeight: 600,
                      color: "#1e293b",
                    }}
                  >
                    {c.name}
                  </td>
                  <td style={{ padding: "10px 14px", color: "#475569" }}>
                    {c.segment}
                  </td>
                  <td style={{ padding: "10px 14px", color: "#475569" }}>
                    {c.sentDate}
                  </td>
                  <td
                    style={{
                      padding: "10px 14px",
                      color: "#1e40af",
                      fontWeight: 700,
                    }}
                  >
                    {c.recipients.toLocaleString()}
                  </td>
                  <td style={{ padding: "10px 14px" }}>
                    <span
                      style={{
                        background: c.status === "Sent" ? "#d1fae5" : "#fef9c3",
                        color: c.status === "Sent" ? "#065f46" : "#854d0e",
                        borderRadius: 99,
                        padding: "3px 10px",
                        fontSize: 11,
                        fontWeight: 700,
                      }}
                    >
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── WhatsApp Marketing Tab ───────────────────────────────────────────────────

function WhatsAppMarketingTab() {
  const [campaigns, setCampaigns] = useState<WACompign[]>(loadWACampaigns);
  const [message, setMessage] = useState("");
  const [segment, setSegment] = useState("All Customers");
  const [sending, setSending] = useState(false);

  const applyTemplate = (tpl: (typeof WA_TEMPLATES)[0]) => {
    setMessage(tpl.message);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error("Please enter a message.");
      return;
    }
    setSending(true);
    await new Promise((r) => setTimeout(r, 800));

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/917290087054?text=${encoded}`, "_blank");

    const recipientMap: Record<string, number> = {
      "All Customers": 1240,
      "Travel Agents": 420,
      "Hotel Partners": 310,
      "DMC Partners": 180,
      "Previous Inquiries": 680,
    };
    const newCampaign: WACompign = {
      id: Date.now(),
      name: message.slice(0, 40) + (message.length > 40 ? "..." : ""),
      message,
      segment,
      sentDate: new Date().toISOString().split("T")[0],
      recipients: recipientMap[segment] ?? 500,
      status: "Sent",
    };
    const updated = [newCampaign, ...campaigns];
    setCampaigns(updated);
    saveWACampaigns(updated);
    setSending(false);
    toast.success("WhatsApp campaign launched!");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Composer */}
      <div
        style={{
          background: "#fff",
          borderRadius: 14,
          padding: 24,
          boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
        }}
      >
        <h3
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 700,
            fontSize: 16,
            color: "#0f172a",
            marginBottom: 16,
          }}
        >
          💬 Compose WhatsApp Campaign
        </h3>

        {/* Templates */}
        <div style={{ marginBottom: 16 }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#64748b",
              marginBottom: 8,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            Quick Templates
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {WA_TEMPLATES.map((tpl) => (
              <button
                key={tpl.name}
                data-ocid="dm.whatsapp.template_button"
                type="button"
                onClick={() => applyTemplate(tpl)}
                style={{
                  background: "#f0fdf4",
                  color: "#15803d",
                  border: "1px solid #bbf7d0",
                  borderRadius: 8,
                  padding: "6px 14px",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#dcfce7";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#f0fdf4";
                }}
              >
                {tpl.name}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSend} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="wa-segment">Target Segment</Label>
            <select
              id="wa-segment"
              data-ocid="dm.whatsapp.segment_select"
              value={segment}
              onChange={(e) => setSegment(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: 8,
                border: "1px solid #e2e8f0",
                fontSize: 14,
                background: "#fff",
              }}
            >
              {SEGMENTS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="wa-message">Message *</Label>
            <Textarea
              id="wa-message"
              data-ocid="dm.whatsapp.message_textarea"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              placeholder="Write your WhatsApp message here…"
              className="resize-none font-mono text-sm"
            />
            <p style={{ fontSize: 11, color: "#94a3b8" }}>
              {message.length} characters · Use *bold* for emphasis
            </p>
          </div>
          <Button
            data-ocid="dm.whatsapp.send_button"
            type="submit"
            disabled={sending}
            className="flex items-center gap-2"
            style={{ background: "#25d366", color: "#fff" }}
          >
            {sending ? (
              "Opening WhatsApp…"
            ) : (
              <>
                <MessageCircle size={15} /> Send via WhatsApp
              </>
            )}
          </Button>
        </form>
      </div>

      {/* Campaign History */}
      <div
        style={{
          background: "#fff",
          borderRadius: 14,
          padding: 20,
          boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
        }}
      >
        <h3
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 700,
            fontSize: 15,
            color: "#0f172a",
            marginBottom: 16,
          }}
        >
          Campaign History
        </h3>
        <div style={{ overflowX: "auto" }}>
          <table
            data-ocid="dm.whatsapp.campaigns.table"
            style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}
          >
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                {[
                  "Campaign",
                  "Segment",
                  "Sent Date",
                  "Recipients",
                  "Status",
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "10px 14px",
                      textAlign: "left",
                      fontWeight: 700,
                      color: "#475569",
                      borderBottom: "1px solid #e2e8f0",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {campaigns.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    data-ocid="dm.whatsapp.campaigns.empty_state"
                    style={{
                      padding: 32,
                      textAlign: "center",
                      color: "#94a3b8",
                    }}
                  >
                    No campaigns yet.
                  </td>
                </tr>
              )}
              {campaigns.map((c, i) => (
                <tr
                  key={c.id}
                  data-ocid={`dm.whatsapp.campaigns.item.${i + 1}`}
                  style={{
                    background: i % 2 === 0 ? "#fff" : "#f8fafc",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "#f0fdf4";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      i % 2 === 0 ? "#fff" : "#f8fafc";
                  }}
                >
                  <td
                    style={{
                      padding: "10px 14px",
                      fontWeight: 600,
                      color: "#1e293b",
                      maxWidth: 220,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {c.name}
                  </td>
                  <td style={{ padding: "10px 14px", color: "#475569" }}>
                    {c.segment}
                  </td>
                  <td style={{ padding: "10px 14px", color: "#475569" }}>
                    {c.sentDate}
                  </td>
                  <td
                    style={{
                      padding: "10px 14px",
                      color: "#15803d",
                      fontWeight: 700,
                    }}
                  >
                    {c.recipients.toLocaleString()}
                  </td>
                  <td style={{ padding: "10px 14px" }}>
                    <span
                      style={{
                        background: "#dcfce7",
                        color: "#15803d",
                        borderRadius: 99,
                        padding: "3px 10px",
                        fontSize: 11,
                        fontWeight: 700,
                      }}
                    >
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Contact Database Tab ─────────────────────────────────────────────────────

function ContactDatabaseTab() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");

  const contacts = useContactDatabase();

  const filtered = contacts.filter((c) => {
    if (
      filterType !== "All" &&
      !c.type.toLowerCase().includes(filterType.toLowerCase())
    )
      return false;
    if (
      search &&
      !c.name.toLowerCase().includes(search.toLowerCase()) &&
      !c.email.toLowerCase().includes(search.toLowerCase()) &&
      !c.phone.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    return true;
  });

  const handleExport = () => {
    const headers = [
      "Name",
      "Phone",
      "Email",
      "Type",
      "City",
      "Source",
      "Date Added",
    ];
    const rows = filtered.map((c) => [
      c.name,
      c.phone,
      c.email,
      c.type,
      c.city,
      c.source,
      c.dateAdded,
    ]);
    const csv = [
      headers.join(","),
      ...rows.map((r) =>
        r.map((v) => `"${String(v || "").replace(/"/g, '""')}"`).join(","),
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "travelnworld-contacts.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Exported ${filtered.length} contacts!`);
  };

  const types = [
    "All",
    "Customer",
    "Travel Agent",
    "Hotel Partner",
    "DMC Partner",
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Header row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div style={{ fontSize: 14, color: "#64748b", fontWeight: 600 }}>
          Total: {filtered.length} contacts
        </div>
        <Button
          data-ocid="dm.contacts.export_button"
          onClick={handleExport}
          className="flex items-center gap-2"
          style={{ background: "#059669", color: "#fff" }}
        >
          <Download size={15} /> Export to Excel
        </Button>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <Search
            size={15}
            style={{
              position: "absolute",
              left: 10,
              top: "50%",
              transform: "translateY(-50%)",
              color: "#94a3b8",
            }}
          />
          <input
            data-ocid="dm.contacts.search_input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, phone…"
            style={{
              width: "100%",
              paddingLeft: 32,
              paddingRight: 12,
              paddingTop: 8,
              paddingBottom: 8,
              borderRadius: 8,
              border: "1.5px solid #e2e8f0",
              fontSize: 13,
              background: "#fff",
              outline: "none",
            }}
          />
        </div>
        <select
          data-ocid="dm.contacts.type_select"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            border: "1.5px solid #e2e8f0",
            fontSize: 13,
            background: "#fff",
          }}
        >
          {types.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div
        style={{
          background: "#fff",
          borderRadius: 14,
          boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
          overflow: "hidden",
        }}
      >
        <div style={{ overflowX: "auto" }}>
          <table
            data-ocid="dm.contacts.table"
            style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}
          >
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                {[
                  "Name",
                  "Phone",
                  "Email",
                  "Type",
                  "City",
                  "Source",
                  "Date Added",
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "10px 14px",
                      textAlign: "left",
                      fontWeight: 700,
                      color: "#475569",
                      borderBottom: "1px solid #e2e8f0",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    data-ocid="dm.contacts.empty_state"
                    style={{
                      padding: 40,
                      textAlign: "center",
                      color: "#94a3b8",
                    }}
                  >
                    No contacts found.
                  </td>
                </tr>
              )}
              {filtered.slice(0, 200).map((c, i) => (
                <tr
                  key={`contact-${c.name}-${i}`}
                  data-ocid={`dm.contacts.item.${i + 1}`}
                  style={{
                    background: i % 2 === 0 ? "#fff" : "#f8fafc",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "#eff6ff";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      i % 2 === 0 ? "#fff" : "#f8fafc";
                  }}
                >
                  <td
                    style={{
                      padding: "10px 14px",
                      fontWeight: 600,
                      color: "#1e293b",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {c.name}
                  </td>
                  <td
                    style={{
                      padding: "10px 14px",
                      color: "#475569",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {c.phone}
                  </td>
                  <td
                    style={{
                      padding: "10px 14px",
                      color: "#475569",
                      maxWidth: 200,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {c.email}
                  </td>
                  <td style={{ padding: "10px 14px" }}>
                    <span
                      style={{
                        background: typeColor(c.type).bg,
                        color: typeColor(c.type).color,
                        borderRadius: 99,
                        padding: "2px 10px",
                        fontSize: 11,
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {c.type}
                    </span>
                  </td>
                  <td style={{ padding: "10px 14px", color: "#475569" }}>
                    {c.city || "—"}
                  </td>
                  <td style={{ padding: "10px 14px", color: "#475569" }}>
                    {c.source}
                  </td>
                  <td
                    style={{
                      padding: "10px 14px",
                      color: "#94a3b8",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {c.dateAdded}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length > 200 && (
          <div
            style={{
              padding: "12px 16px",
              textAlign: "center",
              fontSize: 12,
              color: "#64748b",
              borderTop: "1px solid #e2e8f0",
            }}
          >
            Showing first 200 of {filtered.length} contacts. Use Export to Excel
            for the full list.
          </div>
        )}
      </div>
    </div>
  );
}

function typeColor(type: string): { bg: string; color: string } {
  if (type === "Customer") return { bg: "#dbeafe", color: "#1d4ed8" };
  if (type === "Travel Agent") return { bg: "#d1fae5", color: "#065f46" };
  if (type === "Hotel Partner") return { bg: "#ede9fe", color: "#7c3aed" };
  if (type === "DMC Partner") return { bg: "#fce7f3", color: "#9d174d" };
  return { bg: "#f1f5f9", color: "#475569" };
}

function useContactDatabase(): ContactRecord[] {
  const leads: DMLead[] = (() => {
    try {
      return JSON.parse(localStorage.getItem("tnw_dm_leads") || "[]");
    } catch {
      return [];
    }
  })();

  const partners = (() => {
    try {
      return JSON.parse(
        localStorage.getItem("tnw_partner_registrations") || "[]",
      );
    } catch {
      return [];
    }
  })();

  const customerContacts: ContactRecord[] = leads.map((l) => ({
    name: l.name,
    phone: l.phone,
    email: l.email,
    type: "Customer",
    city: "",
    source: l.source,
    dateAdded: l.createdAt,
  }));

  const partnerContacts: ContactRecord[] = partners.map(
    (p: {
      name: string;
      phone: string;
      email: string;
      company: string;
      city: string;
      partnerType?: string;
      date: string;
    }) => ({
      name: p.name,
      phone: p.phone,
      email: p.email,
      type: p.partnerType || "Travel Agent",
      city: p.city || "",
      source: "Partner Registration",
      dateAdded: p.date || "",
    }),
  );

  // Seed default contacts if both empty
  if (customerContacts.length === 0 && partnerContacts.length === 0) {
    return [
      ...INITIAL_LEADS.map((l) => ({
        name: l.name,
        phone: l.phone,
        email: l.email,
        type: "Customer" as const,
        city: "",
        source: l.source,
        dateAdded: l.createdAt,
      })),
      {
        name: "Rajesh Kumar",
        phone: "+91 9801234567",
        email: "rajesh@horizontravels.in",
        type: "Travel Agent",
        city: "Delhi",
        source: "Partner Registration",
        dateAdded: "2026-01-10",
      },
      {
        name: "Sunita Mehta",
        phone: "+91 9811234567",
        email: "sunita@leelaretreat.com",
        type: "Hotel Partner",
        city: "Mumbai",
        source: "Partner Registration",
        dateAdded: "2026-01-15",
      },
      {
        name: "Arjun Reddy",
        phone: "+91 9821234567",
        email: "arjun@goldenroutes.com",
        type: "DMC Partner",
        city: "Hyderabad",
        source: "Partner Registration",
        dateAdded: "2026-02-01",
      },
    ];
  }

  return [...customerContacts, ...partnerContacts];
}

// ─── Main Component ───────────────────────────────────────────────────────────

const TABS = [
  { id: "overview", label: "📊 Overview", icon: <BarChart2 size={15} /> },
  { id: "leads", label: "👥 Leads Pipeline", icon: <Users size={15} /> },
  { id: "email", label: "✉️ Email Campaigns", icon: <Mail size={15} /> },
  {
    id: "whatsapp",
    label: "💬 WhatsApp Marketing",
    icon: <MessageCircle size={15} />,
  },
  {
    id: "contacts",
    label: "📋 Contact Database",
    icon: <CheckCircle size={15} />,
  },
];

export default function DigitalMarketing() {
  const [activeTab, setActiveTab] = useState("overview");
  const [leads, setLeads] = useState<DMLead[]>(loadLeads);

  // Sync leads with localStorage on change
  useEffect(() => {
    saveLeads(leads);
  }, [leads]);

  return (
    <div
      style={{
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: 24,
        maxWidth: 1200,
      }}
    >
      {/* Header */}
      <div>
        <h1
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 800,
            fontSize: 22,
            color: "#0f172a",
            marginBottom: 4,
          }}
        >
          Digital Marketing & CRM
        </h1>
        <p style={{ fontSize: 14, color: "#64748b" }}>
          Manage leads, campaigns, email & WhatsApp marketing from one place.
        </p>
      </div>

      {/* Tabs */}
      <div
        style={{
          borderBottom: "2px solid #e2e8f0",
          display: "flex",
          gap: 0,
          overflowX: "auto",
        }}
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            data-ocid={`dm.${tab.id}.tab`}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "10px 20px",
              fontSize: 13,
              fontWeight: activeTab === tab.id ? 700 : 500,
              color: activeTab === tab.id ? "#1e40af" : "#64748b",
              background: "none",
              border: "none",
              borderBottom:
                activeTab === tab.id
                  ? "2.5px solid #1e40af"
                  : "2.5px solid transparent",
              cursor: "pointer",
              whiteSpace: "nowrap",
              marginBottom: -2,
              transition: "all 0.2s",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div>
        {activeTab === "overview" && <OverviewTab leads={leads} />}
        {activeTab === "leads" && (
          <LeadsPipelineTab leads={leads} setLeads={setLeads} />
        )}
        {activeTab === "email" && <EmailCampaignsTab />}
        {activeTab === "whatsapp" && <WhatsAppMarketingTab />}
        {activeTab === "contacts" && <ContactDatabaseTab />}
      </div>
    </div>
  );
}
