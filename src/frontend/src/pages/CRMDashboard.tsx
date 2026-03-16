import {
  Bell,
  Briefcase,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Download,
  Edit,
  Mail,
  MessageSquare,
  Phone,
  Plus,
  Send,
  Star,
  TrendingUp,
  User,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type CRMStatus =
  | "New Lead"
  | "Contacted"
  | "Interested"
  | "Negotiation"
  | "Converted"
  | "Closed";
type LeadSource =
  | "Website Inquiry"
  | "Book Now"
  | "Partner Registration"
  | "Contact Form";

interface CRMLead {
  id: number;
  name: string;
  phone: string;
  email: string;
  source: LeadSource;
  status: CRMStatus;
  destination?: string;
  assignedTo?: string;
  notes?: string;
  date: string;
}

interface CRMClient {
  id: number;
  name: string;
  phone: string;
  email: string;
  city: string;
  joinDate: string;
  bookingHistory: string[];
  communications: { date: string; note: string }[];
}

interface EmailCampaign {
  id: number;
  subject: string;
  message: string;
  targetSegment: string;
  status: "Draft" | "Sent" | "Scheduled";
  date: string;
  recipients: number;
}

interface Reminder {
  id: number;
  leadName: string;
  phone: string;
  dueDate: string;
  note: string;
  done: boolean;
}

// ─── Initial Data ─────────────────────────────────────────────────────────────

const INITIAL_LEADS: CRMLead[] = [
  {
    id: 1,
    name: "Arjun Kapoor",
    phone: "+91 98200 11234",
    email: "arjun@gmail.com",
    source: "Book Now",
    status: "New Lead",
    destination: "Dubai",
    date: "2026-03-10",
    assignedTo: "",
    notes: "",
  },
  {
    id: 2,
    name: "Meera Singh",
    phone: "+91 97300 22345",
    email: "meera@gmail.com",
    source: "Website Inquiry",
    status: "Contacted",
    destination: "Thailand",
    date: "2026-03-09",
    assignedTo: "Rajesh Sharma",
    notes: "Called on 10 Mar",
  },
  {
    id: 3,
    name: "Rohit Verma",
    phone: "+91 96400 33456",
    email: "rohit@gmail.com",
    source: "Contact Form",
    status: "Interested",
    destination: "Maldives",
    date: "2026-03-08",
    assignedTo: "",
    notes: "",
  },
  {
    id: 4,
    name: "Kavita Joshi",
    phone: "+91 95500 44567",
    email: "kavita@gmail.com",
    source: "Book Now",
    status: "Converted",
    destination: "Kashmir",
    date: "2026-03-07",
    assignedTo: "Priya Mehta",
    notes: "Booking confirmed",
  },
  {
    id: 5,
    name: "Suresh Nair",
    phone: "+91 94600 55678",
    email: "suresh@gmail.com",
    source: "Partner Registration",
    status: "New Lead",
    destination: "Goa",
    date: "2026-03-06",
    assignedTo: "",
    notes: "",
  },
  {
    id: 6,
    name: "Anjali Desai",
    phone: "+91 93700 66789",
    email: "anjali@gmail.com",
    source: "Website Inquiry",
    status: "Closed",
    destination: "Singapore",
    date: "2026-03-05",
    assignedTo: "Aman Gupta",
    notes: "Not interested",
  },
  {
    id: 7,
    name: "Vikram Reddy",
    phone: "+91 92800 77890",
    email: "vikram@gmail.com",
    source: "Book Now",
    status: "Interested",
    destination: "Bali",
    date: "2026-03-04",
    assignedTo: "",
    notes: "Wants group package",
  },
  {
    id: 8,
    name: "Pooja Sharma",
    phone: "+91 91900 88901",
    email: "pooja@gmail.com",
    source: "Contact Form",
    status: "Contacted",
    destination: "Europe",
    date: "2026-03-03",
    assignedTo: "Rajesh Sharma",
    notes: "",
  },
];

const INITIAL_CLIENTS: CRMClient[] = [
  {
    id: 1,
    name: "Rahul Mehta",
    phone: "+91 98001 12345",
    email: "rahul@gmail.com",
    city: "Delhi",
    joinDate: "2025-12-10",
    bookingHistory: [
      "Dubai Tour – Dec 2025 – ₹85,000",
      "Goa Trip – Jan 2026 – ₹32,000",
    ],
    communications: [
      { date: "2025-12-10", note: "First booking confirmed" },
      { date: "2026-01-05", note: "Follow-up call – happy with service" },
    ],
  },
  {
    id: 2,
    name: "Sunita Agarwal",
    phone: "+91 97002 23456",
    email: "sunita@gmail.com",
    city: "Mumbai",
    joinDate: "2025-11-15",
    bookingHistory: ["Thailand Honeymoon – Nov 2025 – ₹1,20,000"],
    communications: [
      { date: "2025-11-15", note: "Booking made for honeymoon trip" },
      { date: "2025-12-01", note: "Post-trip feedback: excellent" },
    ],
  },
  {
    id: 3,
    name: "Deepak Kumar",
    phone: "+91 96003 34567",
    email: "deepak@gmail.com",
    city: "Bangalore",
    joinDate: "2026-01-20",
    bookingHistory: ["Kashmir Winter – Feb 2026 – ₹65,000"],
    communications: [
      { date: "2026-01-20", note: "Inquiry converted to booking" },
    ],
  },
];

const INITIAL_CAMPAIGNS: EmailCampaign[] = [
  {
    id: 1,
    subject: "Exclusive Summer Deals – Up to 30% Off!",
    message:
      "Dear Traveller, explore our summer specials for Dubai, Thailand, and Bali at exclusive B2B rates.",
    targetSegment: "All Partners",
    status: "Sent",
    date: "2026-03-01",
    recipients: 1250,
  },
  {
    id: 2,
    subject: "New Char Dham Yatra Packages 2026",
    message:
      "Premium Char Dham Yatra packages now available. Group discounts applicable.",
    targetSegment: "Domestic Specialists",
    status: "Sent",
    date: "2026-02-15",
    recipients: 800,
  },
  {
    id: 3,
    subject: "March Promotions – Maldives & Europe",
    message: "Special March pricing on Maldives and Europe packages.",
    targetSegment: "Premium Partners",
    status: "Draft",
    date: "2026-03-12",
    recipients: 500,
  },
];

const INITIAL_REMINDERS: Reminder[] = [
  {
    id: 1,
    leadName: "Arjun Kapoor",
    phone: "+91 98200 11234",
    dueDate: "2026-03-17",
    note: "Follow up on Dubai inquiry",
    done: false,
  },
  {
    id: 2,
    leadName: "Vikram Reddy",
    phone: "+91 92800 77890",
    dueDate: "2026-03-18",
    note: "Send Bali group package details",
    done: false,
  },
  {
    id: 3,
    leadName: "Rohit Verma",
    phone: "+91 96400 33456",
    dueDate: "2026-03-16",
    note: "Confirm Maldives availability",
    done: true,
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const STATUS_COLORS: Record<CRMStatus, { bg: string; color: string }> = {
  "New Lead": { bg: "#dbeafe", color: "#1d4ed8" },
  Contacted: { bg: "#fef3c7", color: "#b45309" },
  Interested: { bg: "#ede9fe", color: "#7c3aed" },
  Negotiation: { bg: "#fed7aa", color: "#c2410c" },
  Converted: { bg: "#d1fae5", color: "#065f46" },
  Closed: { bg: "#fee2e2", color: "#991b1b" },
};

const SOURCE_COLORS: Record<LeadSource, { bg: string; color: string }> = {
  "Website Inquiry": { bg: "#e0f2fe", color: "#0369a1" },
  "Book Now": { bg: "#fce7f3", color: "#9d174d" },
  "Partner Registration": { bg: "#ecfdf5", color: "#065f46" },
  "Contact Form": { bg: "#fef9c3", color: "#854d0e" },
};

const CARD_STYLE: React.CSSProperties = {
  background: "#fff",
  borderRadius: 12,
  padding: "20px 24px",
  boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
  marginBottom: 20,
};

const TAB_BTN = (active: boolean): React.CSSProperties => ({
  padding: "8px 18px",
  borderRadius: 8,
  border: "none",
  cursor: "pointer",
  fontWeight: 600,
  fontSize: 14,
  background: active ? "#1e40af" : "#f1f5f9",
  color: active ? "#fff" : "#64748b",
  transition: "all 0.2s",
});

const PARTNERS = [
  "Rajesh Sharma",
  "Priya Mehta",
  "Aman Gupta",
  "Sunita Verma",
  "Vikash Tiwari",
];

// ─── CRM Overview ─────────────────────────────────────────────────────────────

function CRMOverview({
  leads,
  clients,
}: { leads: CRMLead[]; clients: CRMClient[] }) {
  const totalLeads = leads.length;
  const activeClients = clients.length;
  const converted = leads.filter((l) => l.status === "Converted").length;
  const newLeads = leads.filter((l) => l.status === "New Lead").length;
  const interested = leads.filter((l) => l.status === "Interested").length;

  const stats = [
    {
      label: "Total CRM Leads",
      value: totalLeads,
      icon: TrendingUp,
      color: "#1e40af",
      bg: "#dbeafe",
    },
    {
      label: "Active Clients",
      value: activeClients,
      icon: Users,
      color: "#059669",
      bg: "#d1fae5",
    },
    {
      label: "Converted Bookings",
      value: converted,
      icon: CheckCircle,
      color: "#7c3aed",
      bg: "#ede9fe",
    },
    {
      label: "Monthly Revenue",
      value: "₹4,85,000",
      icon: Star,
      color: "#b45309",
      bg: "#fef3c7",
    },
  ];

  const sourceBreakdown = [
    {
      label: "Website Inquiry",
      count: leads.filter((l) => l.source === "Website Inquiry").length,
      color: "#0369a1",
    },
    {
      label: "Book Now",
      count: leads.filter((l) => l.source === "Book Now").length,
      color: "#9d174d",
    },
    {
      label: "Partner Registration",
      count: leads.filter((l) => l.source === "Partner Registration").length,
      color: "#065f46",
    },
    {
      label: "Contact Form",
      count: leads.filter((l) => l.source === "Contact Form").length,
      color: "#854d0e",
    },
  ];

  return (
    <div data-ocid="crm.overview.section">
      <h2
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: "#1e293b",
          marginBottom: 20,
        }}
      >
        CRM Overview
      </h2>

      {/* Stat Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
          marginBottom: 28,
        }}
      >
        {stats.map((s) => (
          <div
            key={s.label}
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: "18px 20px",
              boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: s.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <s.icon size={20} color={s.color} />
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>
                {s.value}
              </div>
              <div style={{ fontSize: 12, color: "#64748b", fontWeight: 500 }}>
                {s.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Status funnel + source breakdown */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={CARD_STYLE}>
          <h3
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "#1e293b",
              marginBottom: 14,
            }}
          >
            Lead Status Funnel
          </h3>
          {(
            [
              "New Lead",
              "Contacted",
              "Interested",
              "Negotiation",
              "Converted",
              "Closed",
            ] as CRMStatus[]
          ).map((st) => {
            const count = leads.filter((l) => l.status === st).length;
            const pct = totalLeads ? Math.round((count / totalLeads) * 100) : 0;
            const c = STATUS_COLORS[st];
            return (
              <div key={st} style={{ marginBottom: 10 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#374151",
                    marginBottom: 4,
                  }}
                >
                  <span>{st}</span>
                  <span style={{ color: c.color }}>{count}</span>
                </div>
                <div
                  style={{
                    height: 8,
                    background: "#f1f5f9",
                    borderRadius: 999,
                  }}
                >
                  <div
                    style={{
                      height: 8,
                      background: c.bg,
                      border: `1px solid ${c.color}`,
                      borderRadius: 999,
                      width: `${pct}%`,
                      minWidth: pct > 0 ? 8 : 0,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div style={CARD_STYLE}>
          <h3
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "#1e293b",
              marginBottom: 14,
            }}
          >
            Lead Sources
          </h3>
          {sourceBreakdown.map((s) => (
            <div
              key={s.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 12px",
                borderRadius: 8,
                background: "#f8fafc",
                marginBottom: 8,
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>
                {s.label}
              </span>
              <span style={{ fontSize: 14, fontWeight: 800, color: s.color }}>
                {s.count}
              </span>
            </div>
          ))}
          <div
            style={{
              marginTop: 12,
              padding: "10px 12px",
              borderRadius: 8,
              background: "#f0fdf4",
              fontSize: 13,
              color: "#065f46",
              fontWeight: 600,
            }}
          >
            Total Leads: {totalLeads} &nbsp;|&nbsp; New: {newLeads}{" "}
            &nbsp;|&nbsp; Interested: {interested}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CRM Leads ────────────────────────────────────────────────────────────────

function CRMLeadsTab({
  leads,
  setLeads,
}: {
  leads: CRMLead[];
  setLeads: React.Dispatch<React.SetStateAction<CRMLead[]>>;
}) {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<CRMStatus | "All">("All");
  const [filterSource, setFilterSource] = useState<LeadSource | "All">("All");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<CRMLead>>({});
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const filtered = leads.filter((l) => {
    const q = search.toLowerCase();
    const matchSearch =
      l.name.toLowerCase().includes(q) ||
      l.email.toLowerCase().includes(q) ||
      (l.destination || "").toLowerCase().includes(q);
    const matchStatus = filterStatus === "All" || l.status === filterStatus;
    const matchSource = filterSource === "All" || l.source === filterSource;
    return matchSearch && matchStatus && matchSource;
  });

  const saveEdit = (id: number) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, ...editData } : l)),
    );
    setEditId(null);
    showToast("Lead updated successfully");
  };

  const openWhatsApp = (lead: CRMLead) => {
    const msg = encodeURIComponent(
      `Hi ${lead.name}, this is Travel N World. We received your inquiry for ${lead.destination || "travel"}. Our expert will contact you shortly.`,
    );
    window.open(
      `https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}?text=${msg}`,
      "_blank",
    );
  };

  return (
    <div data-ocid="crm.leads.section">
      {toast && (
        <div
          style={{
            position: "fixed",
            top: 20,
            right: 20,
            background: "#065f46",
            color: "#fff",
            padding: "12px 20px",
            borderRadius: 10,
            zIndex: 9999,
            fontWeight: 600,
          }}
        >
          {toast}
        </div>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#1e293b" }}>
          CRM Lead Management
        </h2>
        <div style={{ fontSize: 13, color: "#64748b" }}>
          {filtered.length} leads found
        </div>
      </div>

      {/* Filters */}
      <div
        style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}
      >
        <input
          data-ocid="crm.leads.search_input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email, destination..."
          style={{
            flex: 1,
            minWidth: 200,
            padding: "8px 14px",
            borderRadius: 8,
            border: "1.5px solid #e2e8f0",
            fontSize: 13,
          }}
        />
        <select
          data-ocid="crm.leads.status.select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as CRMStatus | "All")}
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            border: "1.5px solid #e2e8f0",
            fontSize: 13,
            background: "#fff",
          }}
        >
          <option value="All">All Statuses</option>
          {(
            [
              "New Lead",
              "Contacted",
              "Interested",
              "Negotiation",
              "Converted",
              "Closed",
            ] as CRMStatus[]
          ).map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <select
          data-ocid="crm.leads.source.select"
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
          {(
            [
              "Website Inquiry",
              "Book Now",
              "Partner Registration",
              "Contact Form",
            ] as LeadSource[]
          ).map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Leads Table */}
      <div style={CARD_STYLE}>
        <div style={{ overflowX: "auto" }}>
          <table
            style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}
          >
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                {[
                  "Name",
                  "Phone",
                  "Email",
                  "Source",
                  "Destination",
                  "Status",
                  "Assigned To",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "10px 12px",
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
              {filtered.map((lead, idx) => (
                <>
                  <tr
                    key={lead.id}
                    data-ocid={`crm.leads.row.${idx + 1}`}
                    style={{
                      borderBottom: "1px solid #f1f5f9",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#f8fafc";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "";
                    }}
                  >
                    <td
                      style={{
                        padding: "10px 12px",
                        fontWeight: 600,
                        color: "#1e293b",
                      }}
                    >
                      {lead.name}
                    </td>
                    <td style={{ padding: "10px 12px", color: "#475569" }}>
                      {lead.phone}
                    </td>
                    <td style={{ padding: "10px 12px", color: "#475569" }}>
                      {lead.email}
                    </td>
                    <td style={{ padding: "10px 12px" }}>
                      <span
                        style={{
                          ...SOURCE_COLORS[lead.source],
                          padding: "2px 8px",
                          borderRadius: 999,
                          fontSize: 11,
                          fontWeight: 600,
                          background: SOURCE_COLORS[lead.source].bg,
                          color: SOURCE_COLORS[lead.source].color,
                        }}
                      >
                        {lead.source}
                      </span>
                    </td>
                    <td style={{ padding: "10px 12px", color: "#475569" }}>
                      {lead.destination || "—"}
                    </td>
                    <td style={{ padding: "10px 12px" }}>
                      {editId === lead.id ? (
                        <select
                          value={editData.status || lead.status}
                          onChange={(e) =>
                            setEditData((p) => ({
                              ...p,
                              status: e.target.value as CRMStatus,
                            }))
                          }
                          style={{
                            padding: "4px 8px",
                            borderRadius: 6,
                            border: "1px solid #e2e8f0",
                            fontSize: 12,
                          }}
                        >
                          {(
                            [
                              "New Lead",
                              "Contacted",
                              "Interested",
                              "Negotiation",
                              "Converted",
                              "Closed",
                            ] as CRMStatus[]
                          ).map((s) => (
                            <option key={s}>{s}</option>
                          ))}
                        </select>
                      ) : (
                        <span
                          style={{
                            padding: "3px 10px",
                            borderRadius: 999,
                            fontSize: 11,
                            fontWeight: 700,
                            background: STATUS_COLORS[lead.status].bg,
                            color: STATUS_COLORS[lead.status].color,
                          }}
                        >
                          {lead.status}
                        </span>
                      )}
                    </td>
                    <td style={{ padding: "10px 12px" }}>
                      {editId === lead.id ? (
                        <select
                          value={editData.assignedTo || lead.assignedTo || ""}
                          onChange={(e) =>
                            setEditData((p) => ({
                              ...p,
                              assignedTo: e.target.value,
                            }))
                          }
                          style={{
                            padding: "4px 8px",
                            borderRadius: 6,
                            border: "1px solid #e2e8f0",
                            fontSize: 12,
                          }}
                        >
                          <option value="">Unassigned</option>
                          {PARTNERS.map((p) => (
                            <option key={p}>{p}</option>
                          ))}
                        </select>
                      ) : (
                        <span
                          style={{
                            color: lead.assignedTo ? "#1e40af" : "#94a3b8",
                            fontSize: 12,
                          }}
                        >
                          {lead.assignedTo || "Unassigned"}
                        </span>
                      )}
                    </td>
                    <td style={{ padding: "10px 12px" }}>
                      <div style={{ display: "flex", gap: 6 }}>
                        {editId === lead.id ? (
                          <>
                            <button
                              type="button"
                              data-ocid={`crm.leads.save_button.${idx + 1}`}
                              onClick={() => saveEdit(lead.id)}
                              style={{
                                padding: "4px 10px",
                                background: "#1e40af",
                                color: "#fff",
                                border: "none",
                                borderRadius: 6,
                                cursor: "pointer",
                                fontSize: 12,
                                fontWeight: 600,
                              }}
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              data-ocid={`crm.leads.cancel_button.${idx + 1}`}
                              onClick={() => setEditId(null)}
                              style={{
                                padding: "4px 10px",
                                background: "#f1f5f9",
                                color: "#475569",
                                border: "none",
                                borderRadius: 6,
                                cursor: "pointer",
                                fontSize: 12,
                              }}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              data-ocid={`crm.leads.edit_button.${idx + 1}`}
                              onClick={() => {
                                setEditId(lead.id);
                                setEditData({
                                  status: lead.status,
                                  assignedTo: lead.assignedTo,
                                });
                              }}
                              style={{
                                padding: "4px 8px",
                                background: "#eff6ff",
                                color: "#1e40af",
                                border: "none",
                                borderRadius: 6,
                                cursor: "pointer",
                              }}
                              title="Edit"
                            >
                              <Edit size={13} />
                            </button>
                            <a
                              href={`tel:${lead.phone.replace(/[^0-9+]/g, "")}`}
                              data-ocid={`crm.leads.call_button.${idx + 1}`}
                              style={{
                                padding: "4px 8px",
                                background: "#fef3c7",
                                color: "#92400e",
                                border: "none",
                                borderRadius: 6,
                                cursor: "pointer",
                                display: "inline-flex",
                                alignItems: "center",
                                textDecoration: "none",
                                fontSize: 12,
                              }}
                              title="Call"
                            >
                              <Phone size={13} />
                            </a>
                            <button
                              type="button"
                              data-ocid={`crm.leads.whatsapp_button.${idx + 1}`}
                              onClick={() => openWhatsApp(lead)}
                              style={{
                                padding: "4px 8px",
                                background: "#d1fae5",
                                color: "#065f46",
                                border: "none",
                                borderRadius: 6,
                                cursor: "pointer",
                              }}
                              title="WhatsApp"
                            >
                              <MessageSquare size={13} />
                            </button>
                            <button
                              type="button"
                              data-ocid={`crm.leads.expand_button.${idx + 1}`}
                              onClick={() =>
                                setExpandedId(
                                  expandedId === lead.id ? null : lead.id,
                                )
                              }
                              style={{
                                padding: "4px 8px",
                                background: "#f1f5f9",
                                color: "#475569",
                                border: "none",
                                borderRadius: 6,
                                cursor: "pointer",
                              }}
                              title="Notes"
                            >
                              {expandedId === lead.id ? (
                                <ChevronUp size={13} />
                              ) : (
                                <ChevronDown size={13} />
                              )}
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                  {expandedId === lead.id && (
                    <tr key={`notes-${lead.id}`}>
                      <td
                        colSpan={8}
                        style={{
                          padding: "8px 16px 14px",
                          background: "#f8fafc",
                        }}
                      >
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#475569",
                            marginBottom: 6,
                          }}
                        >
                          Notes / Communication Log
                        </div>
                        <textarea
                          data-ocid={`crm.leads.notes.${idx + 1}`}
                          defaultValue={lead.notes || ""}
                          onBlur={(e) =>
                            setLeads((prev) =>
                              prev.map((l) =>
                                l.id === lead.id
                                  ? { ...l, notes: e.target.value }
                                  : l,
                              ),
                            )
                          }
                          placeholder="Add notes here..."
                          rows={2}
                          style={{
                            width: "100%",
                            padding: "8px 12px",
                            borderRadius: 8,
                            border: "1px solid #e2e8f0",
                            fontSize: 13,
                            resize: "vertical",
                          }}
                        />
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div
              data-ocid="crm.leads.empty_state"
              style={{ textAlign: "center", padding: "40px", color: "#94a3b8" }}
            >
              No leads found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Client Management ────────────────────────────────────────────────────────

function ClientsTab({
  clients,
  setClients,
}: {
  clients: CRMClient[];
  setClients: React.Dispatch<React.SetStateAction<CRMClient[]>>;
}) {
  const [showAdd, setShowAdd] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [newNote, setNewNote] = useState<Record<number, string>>({});
  const [newClient, setNewClient] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
  });
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const addClient = () => {
    if (!newClient.name || !newClient.phone) return;
    const client: CRMClient = {
      id: Date.now(),
      ...newClient,
      joinDate: new Date().toISOString().split("T")[0],
      bookingHistory: [],
      communications: [
        {
          date: new Date().toISOString().split("T")[0],
          note: "Client added to CRM",
        },
      ],
    };
    setClients((prev) => [client, ...prev]);
    setNewClient({ name: "", phone: "", email: "", city: "" });
    setShowAdd(false);
    showToast("Client added successfully");
  };

  const addNote = (id: number) => {
    const note = newNote[id];
    if (!note?.trim()) return;
    setClients((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              communications: [
                ...c.communications,
                { date: new Date().toISOString().split("T")[0], note },
              ],
            }
          : c,
      ),
    );
    setNewNote((p) => ({ ...p, [id]: "" }));
    showToast("Note added");
  };

  return (
    <div data-ocid="crm.clients.section">
      {toast && (
        <div
          style={{
            position: "fixed",
            top: 20,
            right: 20,
            background: "#065f46",
            color: "#fff",
            padding: "12px 20px",
            borderRadius: 10,
            zIndex: 9999,
            fontWeight: 600,
          }}
        >
          {toast}
        </div>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#1e293b" }}>
          Client Management
        </h2>
        <button
          type="button"
          data-ocid="crm.clients.open_modal_button"
          onClick={() => setShowAdd(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "9px 18px",
            background: "#1e40af",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          <Plus size={15} /> Add Client
        </button>
      </div>

      {/* Add Client Modal */}
      {showAdd && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            data-ocid="crm.clients.modal"
            style={{
              background: "#fff",
              borderRadius: 14,
              padding: 28,
              width: 420,
              maxWidth: "90vw",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <h3 style={{ fontWeight: 700, fontSize: 18, color: "#1e293b" }}>
                Add New Client
              </h3>
              <button
                type="button"
                data-ocid="crm.clients.close_button"
                onClick={() => setShowAdd(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <X size={18} />
              </button>
            </div>
            {["name", "phone", "email", "city"].map((field) => (
              <div key={field} style={{ marginBottom: 14 }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#475569",
                    display: "block",
                    marginBottom: 4,
                    textTransform: "capitalize",
                  }}
                >
                  {field}
                </div>
                <input
                  data-ocid={`crm.clients.${field}.input`}
                  value={(newClient as Record<string, string>)[field]}
                  onChange={(e) =>
                    setNewClient((p) => ({ ...p, [field]: e.target.value }))
                  }
                  placeholder={`Enter ${field}`}
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    border: "1.5px solid #e2e8f0",
                    borderRadius: 8,
                    fontSize: 14,
                    boxSizing: "border-box",
                  }}
                />
              </div>
            ))}
            <button
              type="button"
              data-ocid="crm.clients.submit_button"
              onClick={addClient}
              style={{
                width: "100%",
                padding: 11,
                background: "#1e40af",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 15,
                cursor: "pointer",
                marginTop: 4,
              }}
            >
              Add Client
            </button>
          </div>
        </div>
      )}

      {/* Client Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 16,
        }}
      >
        {clients.map((client, idx) => (
          <div
            key={client.id}
            data-ocid={`crm.clients.card.${idx + 1}`}
            style={{
              background: "#fff",
              borderRadius: 12,
              boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "16px 18px",
                borderBottom: "1px solid #f1f5f9",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: "50%",
                      background: "#dbeafe",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 16,
                      fontWeight: 800,
                      color: "#1e40af",
                    }}
                  >
                    {client.name[0]}
                  </div>
                  <div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 15,
                        color: "#1e293b",
                      }}
                    >
                      {client.name}
                    </div>
                    <div style={{ fontSize: 12, color: "#64748b" }}>
                      {client.city} &middot; Joined {client.joinDate}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  data-ocid={`crm.clients.expand_button.${idx + 1}`}
                  onClick={() =>
                    setExpandedId(expandedId === client.id ? null : client.id)
                  }
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#94a3b8",
                  }}
                >
                  {expandedId === client.id ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </button>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  marginTop: 10,
                  fontSize: 12,
                  color: "#475569",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <Phone size={11} /> {client.phone}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <Mail size={11} /> {client.email}
                </span>
              </div>
            </div>

            {/* Expanded */}
            {expandedId === client.id && (
              <div style={{ padding: "14px 18px" }}>
                {/* Booking History */}
                <div style={{ marginBottom: 14 }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#1e293b",
                      marginBottom: 6,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <Briefcase size={13} /> Booking History
                  </div>
                  {client.bookingHistory.length > 0 ? (
                    client.bookingHistory.map((b) => (
                      <div
                        key={b}
                        style={{
                          fontSize: 12,
                          color: "#475569",
                          padding: "5px 10px",
                          background: "#f8fafc",
                          borderRadius: 6,
                          marginBottom: 4,
                        }}
                      >
                        {b}
                      </div>
                    ))
                  ) : (
                    <div style={{ fontSize: 12, color: "#94a3b8" }}>
                      No bookings yet
                    </div>
                  )}
                </div>

                {/* Communication History */}
                <div style={{ marginBottom: 12 }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#1e293b",
                      marginBottom: 6,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <MessageSquare size={13} /> Communication History
                  </div>
                  {client.communications.map((c) => (
                    <div
                      key={`${c.date}-${c.note}`}
                      style={{
                        fontSize: 12,
                        color: "#475569",
                        padding: "5px 10px",
                        background: "#f0fdf4",
                        borderRadius: 6,
                        marginBottom: 4,
                      }}
                    >
                      <span style={{ fontWeight: 600, color: "#065f46" }}>
                        {c.date}
                      </span>{" "}
                      &mdash; {c.note}
                    </div>
                  ))}
                </div>

                {/* Add Note */}
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    data-ocid={`crm.clients.note.${idx + 1}`}
                    value={newNote[client.id] || ""}
                    onChange={(e) =>
                      setNewNote((p) => ({ ...p, [client.id]: e.target.value }))
                    }
                    placeholder="Add a communication note..."
                    style={{
                      flex: 1,
                      padding: "7px 10px",
                      border: "1px solid #e2e8f0",
                      borderRadius: 7,
                      fontSize: 12,
                    }}
                  />
                  <button
                    type="button"
                    data-ocid={`crm.clients.save_button.${idx + 1}`}
                    onClick={() => addNote(client.id)}
                    style={{
                      padding: "7px 12px",
                      background: "#1e40af",
                      color: "#fff",
                      border: "none",
                      borderRadius: 7,
                      cursor: "pointer",
                    }}
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {clients.length === 0 && (
        <div
          data-ocid="crm.clients.empty_state"
          style={{
            textAlign: "center",
            padding: "60px",
            color: "#94a3b8",
            background: "#fff",
            borderRadius: 12,
          }}
        >
          No clients yet. Add your first client above.
        </div>
      )}
    </div>
  );
}

// ─── Marketing Tools ──────────────────────────────────────────────────────────

function MarketingTab({ leads }: { leads: CRMLead[] }) {
  const [activeMarketTab, setActiveMarketTab] = useState<
    "campaigns" | "reminders" | "export"
  >("campaigns");
  const [campaigns, setCampaigns] =
    useState<EmailCampaign[]>(INITIAL_CAMPAIGNS);
  const [reminders, setReminders] = useState<Reminder[]>(INITIAL_REMINDERS);
  const [showCampaign, setShowCampaign] = useState(false);
  const [showReminder, setShowReminder] = useState(false);
  const [toast, setToast] = useState("");
  const [newCampaign, setNewCampaign] = useState({
    subject: "",
    message: "",
    targetSegment: "All Partners",
  });
  const [newReminder, setNewReminder] = useState({
    leadName: "",
    phone: "",
    dueDate: "",
    note: "",
  });

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3500);
  };

  const exportCSV = () => {
    const headers = "Name,Phone,Email,Source,Destination,Status,Assigned To\n";
    const rows = leads
      .map(
        (l) =>
          `"${l.name}","${l.phone}","${l.email}","${l.source}","${l.destination || ""}","${l.status}","${l.assignedTo || ""}"`,
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "travelnworld-crm-leads.csv";
    a.click();
    URL.revokeObjectURL(url);
    showToast("Contact list exported as CSV");
  };

  const sendCampaign = () => {
    if (!newCampaign.subject || !newCampaign.message) return;
    const c: EmailCampaign = {
      id: Date.now(),
      ...newCampaign,
      status: "Sent",
      date: new Date().toISOString().split("T")[0],
      recipients: Math.floor(Math.random() * 500) + 300,
    };
    setCampaigns((prev) => [c, ...prev]);
    setNewCampaign({ subject: "", message: "", targetSegment: "All Partners" });
    setShowCampaign(false);
    showToast(`Campaign "${c.subject}" sent to ${c.recipients} contacts!`);
  };

  const addReminder = () => {
    if (!newReminder.leadName || !newReminder.dueDate) return;
    setReminders((prev) => [
      { id: Date.now(), ...newReminder, done: false },
      ...prev,
    ]);
    setNewReminder({ leadName: "", phone: "", dueDate: "", note: "" });
    setShowReminder(false);
    showToast("Reminder set successfully");
  };

  const toggleReminder = (id: number) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, done: !r.done } : r)),
    );
  };

  return (
    <div data-ocid="crm.marketing.section">
      {toast && (
        <div
          style={{
            position: "fixed",
            top: 20,
            right: 20,
            background: "#1e40af",
            color: "#fff",
            padding: "12px 20px",
            borderRadius: 10,
            zIndex: 9999,
            fontWeight: 600,
            maxWidth: 360,
          }}
        >
          {toast}
        </div>
      )}
      <h2
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: "#1e293b",
          marginBottom: 20,
        }}
      >
        Digital Marketing Tools
      </h2>

      {/* Sub-tabs */}
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 24,
          background: "#f1f5f9",
          padding: 6,
          borderRadius: 10,
          width: "fit-content",
        }}
      >
        {(["campaigns", "reminders", "export"] as const).map((t) => (
          <button
            type="button"
            key={t}
            data-ocid={`crm.marketing.${t}.tab`}
            onClick={() => setActiveMarketTab(t)}
            style={TAB_BTN(activeMarketTab === t)}
          >
            {t === "campaigns"
              ? "Email Campaigns"
              : t === "reminders"
                ? "Follow-up Reminders"
                : "Export Contacts"}
          </button>
        ))}
      </div>

      {/* Email Campaigns */}
      {activeMarketTab === "campaigns" && (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <div style={{ fontSize: 15, fontWeight: 600, color: "#1e293b" }}>
              Email Campaigns
            </div>
            <button
              type="button"
              data-ocid="crm.marketing.campaign.open_modal_button"
              onClick={() => setShowCampaign(true)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 16px",
                background: "#1e40af",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
                fontWeight: 600,
                fontSize: 13,
              }}
            >
              <Plus size={14} /> New Campaign
            </button>
          </div>

          {showCampaign && (
            <div
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.5)",
                zIndex: 1000,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                data-ocid="crm.marketing.campaign.modal"
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  padding: 28,
                  width: 480,
                  maxWidth: "90vw",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 18,
                  }}
                >
                  <h3
                    style={{ fontWeight: 700, fontSize: 18, color: "#1e293b" }}
                  >
                    Compose Email Campaign
                  </h3>
                  <button
                    type="button"
                    data-ocid="crm.marketing.campaign.close_button"
                    onClick={() => setShowCampaign(false)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <X size={18} />
                  </button>
                </div>
                <div style={{ marginBottom: 14 }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#475569",
                      display: "block",
                      marginBottom: 4,
                    }}
                  >
                    Subject
                  </div>
                  <input
                    data-ocid="crm.marketing.campaign.subject.input"
                    value={newCampaign.subject}
                    onChange={(e) =>
                      setNewCampaign((p) => ({ ...p, subject: e.target.value }))
                    }
                    placeholder="Email subject..."
                    style={{
                      width: "100%",
                      padding: "9px 12px",
                      border: "1.5px solid #e2e8f0",
                      borderRadius: 8,
                      fontSize: 14,
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div style={{ marginBottom: 14 }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#475569",
                      display: "block",
                      marginBottom: 4,
                    }}
                  >
                    Target Segment
                  </div>
                  <select
                    data-ocid="crm.marketing.campaign.segment.select"
                    value={newCampaign.targetSegment}
                    onChange={(e) =>
                      setNewCampaign((p) => ({
                        ...p,
                        targetSegment: e.target.value,
                      }))
                    }
                    style={{
                      width: "100%",
                      padding: "9px 12px",
                      border: "1.5px solid #e2e8f0",
                      borderRadius: 8,
                      fontSize: 14,
                      background: "#fff",
                    }}
                  >
                    {[
                      "All Partners",
                      "Domestic Specialists",
                      "International Specialists",
                      "Premium Partners",
                      "New Leads",
                    ].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div style={{ marginBottom: 18 }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#475569",
                      display: "block",
                      marginBottom: 4,
                    }}
                  >
                    Message
                  </div>
                  <textarea
                    data-ocid="crm.marketing.campaign.message.textarea"
                    value={newCampaign.message}
                    onChange={(e) =>
                      setNewCampaign((p) => ({ ...p, message: e.target.value }))
                    }
                    placeholder="Write your email campaign message..."
                    rows={5}
                    style={{
                      width: "100%",
                      padding: "9px 12px",
                      border: "1.5px solid #e2e8f0",
                      borderRadius: 8,
                      fontSize: 14,
                      resize: "vertical",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div
                  style={{
                    padding: "10px 14px",
                    background: "#fffbeb",
                    borderRadius: 8,
                    marginBottom: 14,
                    fontSize: 12,
                    color: "#92400e",
                  }}
                >
                  <strong>Note:</strong> Auto email will be sent to all contacts
                  in the selected segment. A copy will be delivered to
                  admin@travelnworld.com.
                </div>
                <button
                  type="button"
                  data-ocid="crm.marketing.campaign.submit_button"
                  onClick={sendCampaign}
                  style={{
                    width: "100%",
                    padding: 11,
                    background: "#1e40af",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    fontWeight: 700,
                    fontSize: 15,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                  }}
                >
                  <Send size={15} /> Send Campaign
                </button>
              </div>
            </div>
          )}

          <div style={CARD_STYLE}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 13,
              }}
            >
              <thead>
                <tr style={{ background: "#f8fafc" }}>
                  {[
                    "Subject",
                    "Target Segment",
                    "Recipients",
                    "Date",
                    "Status",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "10px 12px",
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
                {campaigns.map((c, idx) => (
                  <tr
                    key={c.id}
                    data-ocid={`crm.marketing.campaign.row.${idx + 1}`}
                    style={{ borderBottom: "1px solid #f1f5f9" }}
                  >
                    <td
                      style={{
                        padding: "10px 12px",
                        fontWeight: 600,
                        color: "#1e293b",
                      }}
                    >
                      {c.subject}
                    </td>
                    <td style={{ padding: "10px 12px", color: "#475569" }}>
                      {c.targetSegment}
                    </td>
                    <td
                      style={{
                        padding: "10px 12px",
                        color: "#1e40af",
                        fontWeight: 700,
                      }}
                    >
                      {c.recipients.toLocaleString()}
                    </td>
                    <td style={{ padding: "10px 12px", color: "#475569" }}>
                      {c.date}
                    </td>
                    <td style={{ padding: "10px 12px" }}>
                      <span
                        style={{
                          padding: "3px 10px",
                          borderRadius: 999,
                          fontSize: 11,
                          fontWeight: 700,
                          background:
                            c.status === "Sent"
                              ? "#d1fae5"
                              : c.status === "Draft"
                                ? "#fef3c7"
                                : "#dbeafe",
                          color:
                            c.status === "Sent"
                              ? "#065f46"
                              : c.status === "Draft"
                                ? "#b45309"
                                : "#1e40af",
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
      )}

      {/* Reminders */}
      {activeMarketTab === "reminders" && (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <div style={{ fontSize: 15, fontWeight: 600, color: "#1e293b" }}>
              Lead Follow-up Reminders
            </div>
            <button
              type="button"
              data-ocid="crm.marketing.reminder.open_modal_button"
              onClick={() => setShowReminder(true)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 16px",
                background: "#1e40af",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
                fontWeight: 600,
                fontSize: 13,
              }}
            >
              <Bell size={14} /> Add Reminder
            </button>
          </div>

          {showReminder && (
            <div
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.5)",
                zIndex: 1000,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                data-ocid="crm.marketing.reminder.modal"
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  padding: 28,
                  width: 420,
                  maxWidth: "90vw",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 18,
                  }}
                >
                  <h3
                    style={{ fontWeight: 700, fontSize: 18, color: "#1e293b" }}
                  >
                    Set Follow-up Reminder
                  </h3>
                  <button
                    type="button"
                    data-ocid="crm.marketing.reminder.close_button"
                    onClick={() => setShowReminder(false)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <X size={18} />
                  </button>
                </div>
                {[
                  { field: "leadName", label: "Lead Name", type: "text" },
                  { field: "phone", label: "Phone", type: "text" },
                  { field: "dueDate", label: "Follow-up Date", type: "date" },
                  { field: "note", label: "Note", type: "text" },
                ].map(({ field, label, type }) => (
                  <div key={field} style={{ marginBottom: 14 }}>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#475569",
                        display: "block",
                        marginBottom: 4,
                      }}
                    >
                      {label}
                    </div>
                    <input
                      data-ocid={`crm.marketing.reminder.${field}.input`}
                      type={type}
                      value={(newReminder as Record<string, string>)[field]}
                      onChange={(e) =>
                        setNewReminder((p) => ({
                          ...p,
                          [field]: e.target.value,
                        }))
                      }
                      placeholder={`Enter ${label.toLowerCase()}`}
                      style={{
                        width: "100%",
                        padding: "9px 12px",
                        border: "1.5px solid #e2e8f0",
                        borderRadius: 8,
                        fontSize: 14,
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  data-ocid="crm.marketing.reminder.submit_button"
                  onClick={addReminder}
                  style={{
                    width: "100%",
                    padding: 11,
                    background: "#1e40af",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    fontWeight: 700,
                    fontSize: 15,
                    cursor: "pointer",
                  }}
                >
                  Set Reminder
                </button>
              </div>
            </div>
          )}

          <div style={CARD_STYLE}>
            {reminders.length === 0 ? (
              <div
                data-ocid="crm.marketing.reminders.empty_state"
                style={{ textAlign: "center", padding: 40, color: "#94a3b8" }}
              >
                No reminders set.
              </div>
            ) : (
              reminders.map((r, idx) => (
                <div
                  key={r.id}
                  data-ocid={`crm.marketing.reminder.item.${idx + 1}`}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px 16px",
                    borderRadius: 10,
                    background: r.done ? "#f0fdf4" : "#fffbeb",
                    marginBottom: 10,
                    border: `1px solid ${r.done ? "#bbf7d0" : "#fde68a"}`,
                  }}
                >
                  <div
                    style={{ display: "flex", gap: 12, alignItems: "center" }}
                  >
                    <input
                      data-ocid={`crm.marketing.reminder.checkbox.${idx + 1}`}
                      type="checkbox"
                      checked={r.done}
                      onChange={() => toggleReminder(r.id)}
                      style={{ width: 16, height: 16, cursor: "pointer" }}
                    />
                    <div>
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: 14,
                          color: "#1e293b",
                          textDecoration: r.done ? "line-through" : "none",
                        }}
                      >
                        {r.leadName}
                      </div>
                      <div style={{ fontSize: 12, color: "#475569" }}>
                        {r.phone} &middot; Due: <strong>{r.dueDate}</strong>
                      </div>
                      <div style={{ fontSize: 12, color: "#64748b" }}>
                        {r.note}
                      </div>
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: r.done ? "#065f46" : "#b45309",
                      background: r.done ? "#d1fae5" : "#fef3c7",
                      padding: "3px 10px",
                      borderRadius: 999,
                    }}
                  >
                    {r.done ? "Done" : "Pending"}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Export Contacts */}
      {activeMarketTab === "export" && (
        <div>
          <div style={CARD_STYLE}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  background: "#dbeafe",
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Download size={22} color="#1e40af" />
              </div>
              <div>
                <div
                  style={{ fontWeight: 700, fontSize: 16, color: "#1e293b" }}
                >
                  Export Customer Contact List
                </div>
                <div style={{ fontSize: 13, color: "#64748b" }}>
                  Download all CRM leads as a CSV file for external use.
                </div>
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: 12,
                marginBottom: 20,
              }}
            >
              {[
                {
                  label: "Total Leads",
                  value: leads.length,
                  color: "#1e40af",
                  bg: "#dbeafe",
                },
                {
                  label: "Converted",
                  value: leads.filter((l) => l.status === "Converted").length,
                  color: "#065f46",
                  bg: "#d1fae5",
                },
                {
                  label: "With Email",
                  value: leads.filter((l) => l.email).length,
                  color: "#7c3aed",
                  bg: "#ede9fe",
                },
                {
                  label: "With Phone",
                  value: leads.filter((l) => l.phone).length,
                  color: "#b45309",
                  bg: "#fef3c7",
                },
              ].map((s) => (
                <div
                  key={s.label}
                  style={{
                    padding: "14px 16px",
                    borderRadius: 10,
                    background: s.bg,
                  }}
                >
                  <div
                    style={{ fontSize: 22, fontWeight: 800, color: s.color }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{ fontSize: 12, color: "#64748b", fontWeight: 500 }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              data-ocid="crm.marketing.export.primary_button"
              onClick={exportCSV}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "11px 24px",
                background: "#1e40af",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                cursor: "pointer",
                fontWeight: 700,
                fontSize: 15,
              }}
            >
              <Download size={16} /> Download CRM Leads (CSV)
            </button>
            <div style={{ marginTop: 12, fontSize: 12, color: "#94a3b8" }}>
              File: travelnworld-crm-leads.csv &bull; Includes Name, Phone,
              Email, Source, Status, Destination
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main CRM Dashboard ───────────────────────────────────────────────────────

export default function CRMDashboard() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "leads" | "clients" | "marketing"
  >("overview");

  // Seed leads from localStorage (travel_leads + tnw_dm_leads)
  const [leads, setLeads] = useState<CRMLead[]>(() => {
    try {
      const stored1 = JSON.parse(localStorage.getItem("travel_leads") || "[]");
      const stored2 = JSON.parse(localStorage.getItem("tnw_dm_leads") || "[]");
      const mapped1: CRMLead[] = stored1.map(
        (
          l: {
            customer?: string;
            name?: string;
            phone?: string;
            email?: string;
            destination?: string;
            travelDate?: string;
            leadSource?: string;
          },
          idx: number,
        ) => ({
          id: idx + 5000,
          name: l.customer || l.name || "Unknown",
          phone: l.phone || "",
          email: l.email || "",
          source: (l.leadSource === "Website"
            ? "Website Inquiry"
            : l.leadSource === "Form"
              ? "Book Now"
              : "Website Inquiry") as LeadSource,
          status: "New Lead" as CRMStatus,
          destination: l.destination || "",
          assignedTo: "",
          notes: "",
          date: l.travelDate || new Date().toISOString().split("T")[0],
        }),
      );
      const mapped2: CRMLead[] = stored2.map(
        (
          l: {
            id?: number;
            name?: string;
            phone?: string;
            email?: string;
            destination?: string;
            budget?: string;
            source?: string;
            status?: string;
            createdAt?: string;
          },
          idx: number,
        ) => ({
          id: (l.id ?? 0) + 8000 + idx,
          name: l.name || "Unknown",
          phone: l.phone || "",
          email: l.email || "",
          source: (l.source || "Website Inquiry") as LeadSource,
          status: (l.status || "New Lead") as CRMStatus,
          destination: l.destination || "",
          assignedTo: "",
          notes: l.budget ? `Budget: ${l.budget}` : "",
          date: l.createdAt
            ? l.createdAt.split("T")[0]
            : new Date().toISOString().split("T")[0],
        }),
      );
      // Merge and deduplicate by id
      const idSet = new Set<number>();
      const merged: CRMLead[] = [];
      for (const lead of [...mapped1, ...mapped2]) {
        if (!idSet.has(lead.id)) {
          idSet.add(lead.id);
          merged.push(lead);
        }
      }
      return merged.length > 0 ? [...merged, ...INITIAL_LEADS] : INITIAL_LEADS;
    } catch {
      return INITIAL_LEADS;
    }
  });

  const [clients, setClients] = useState<CRMClient[]>(() => {
    try {
      const stored = localStorage.getItem("tnw_crm_clients");
      return stored ? JSON.parse(stored) : INITIAL_CLIENTS;
    } catch {
      return INITIAL_CLIENTS;
    }
  });

  // Persist clients
  useEffect(() => {
    localStorage.setItem("tnw_crm_clients", JSON.stringify(clients));
  }, [clients]);

  const tabs = [
    { id: "overview" as const, label: "CRM Overview", icon: TrendingUp },
    { id: "leads" as const, label: "Lead Management", icon: User },
    { id: "clients" as const, label: "Client Management", icon: Users },
    { id: "marketing" as const, label: "Marketing Tools", icon: Send },
  ];

  return (
    <div data-ocid="crm.dashboard.section">
      {/* CRM Header */}
      <div style={{ marginBottom: 24 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 8,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              background: "#dbeafe",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Briefcase size={20} color="#1e40af" />
          </div>
          <div>
            <h1
              style={{
                fontSize: 24,
                fontWeight: 800,
                color: "#1e293b",
                margin: 0,
              }}
            >
              CRM & Digital Marketing
            </h1>
            <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>
              Manage leads, clients, campaigns and marketing automation
            </p>
          </div>
        </div>

        {/* CRM sub-navigation */}
        <div
          style={{
            display: "flex",
            gap: 8,
            marginTop: 16,
            borderBottom: "2px solid #e2e8f0",
            paddingBottom: 0,
          }}
        >
          {tabs.map((tab) => (
            <button
              type="button"
              key={tab.id}
              data-ocid={`crm.${tab.id}.tab`}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                padding: "10px 18px",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: 14,
                color: activeTab === tab.id ? "#1e40af" : "#64748b",
                borderBottom:
                  activeTab === tab.id
                    ? "2px solid #1e40af"
                    : "2px solid transparent",
                marginBottom: -2,
                transition: "all 0.2s",
              }}
            >
              <tab.icon size={15} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      {activeTab === "overview" && (
        <CRMOverview leads={leads} clients={clients} />
      )}
      {activeTab === "leads" && (
        <CRMLeadsTab leads={leads} setLeads={setLeads} />
      )}
      {activeTab === "clients" && (
        <ClientsTab clients={clients} setClients={setClients} />
      )}
      {activeTab === "marketing" && <MarketingTab leads={leads} />}
    </div>
  );
}
