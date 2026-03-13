import { useNavigate } from "@tanstack/react-router";
import {
  BookOpen,
  CreditCard,
  LogOut,
  MessageSquare,
  TrendingUp,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

const ALL_LEADS = [
  {
    id: 1,
    customer: "Ankit Joshi",
    destination: "Dubai",
    travelDate: "2026-04-15",
    travelers: 2,
    budget: "₹1,20,000",
    phone: "+91 98111 22333",
    assignedTo: "Horizon Travels",
    status: "Active",
  },
  {
    id: 2,
    customer: "Suresh Nair",
    destination: "Thailand",
    travelDate: "2026-06-10",
    travelers: 3,
    budget: "₹90,000",
    phone: "+91 96333 44555",
    assignedTo: "SkyWing Tours",
    status: "Converted",
  },
  {
    id: 3,
    customer: "Ravi Kumar",
    destination: "Kerala",
    travelDate: "2026-07-20",
    travelers: 2,
    budget: "₹70,000",
    phone: "+91 94555 66777",
    assignedTo: "BlueSky Holidays",
    status: "Active",
  },
  {
    id: 4,
    customer: "Priya Jain",
    destination: "Goa",
    travelDate: "2026-04-01",
    travelers: 4,
    budget: "₹60,000",
    phone: "+91 93111 22333",
    assignedTo: "TravelEase India",
    status: "Active",
  },
  {
    id: 5,
    customer: "Deepak Sharma",
    destination: "Manali",
    travelDate: "2026-05-20",
    travelers: 5,
    budget: "₹55,000",
    phone: "+91 92222 33444",
    assignedTo: "Horizon Travels",
    status: "Active",
  },
];

const ALL_INQUIRIES = [
  {
    id: 1,
    customerName: "Rohit Agarwal",
    destination: "Dubai",
    travelDate: "2026-04-20",
    budget: "₹1,30,000",
    status: "New",
    assignedTo: "Horizon Travels",
  },
  {
    id: 2,
    customerName: "Sneha Jain",
    destination: "Maldives",
    travelDate: "2026-05-15",
    budget: "₹2,00,000",
    status: "Contacted",
    assignedTo: "SkyWing Tours",
  },
  {
    id: 3,
    customerName: "Deepak Verma",
    destination: "Thailand",
    travelDate: "2026-06-01",
    budget: "₹1,20,000",
    status: "New",
    assignedTo: "Horizon Travels",
  },
];

const ALL_BOOKINGS = [
  {
    id: 1,
    customer: "Rohit Agarwal",
    destination: "Dubai",
    value: "₹1,30,000",
    date: "2026-03-10",
    status: "Confirmed",
    partner: "Horizon Travels",
  },
  {
    id: 2,
    customer: "Priya Singh",
    destination: "Goa",
    value: "₹80,000",
    date: "2026-03-07",
    status: "Confirmed",
    partner: "SkyWing Tours",
  },
  {
    id: 3,
    customer: "Suresh Nair",
    destination: "Thailand",
    value: "₹90,000",
    date: "2026-03-05",
    status: "Pending",
    partner: "Horizon Travels",
  },
];

const PARTNER_PLANS: Record<
  string,
  { plan: string; expiry: string; status: string }
> = {
  "Horizon Travels": {
    plan: "Professional",
    expiry: "2026-09-15",
    status: "Active",
  },
  "SkyWing Tours": { plan: "Premium", expiry: "2027-01-15", status: "Active" },
  "TravelEase India": {
    plan: "Premium",
    expiry: "2027-02-01",
    status: "Active",
  },
  "BlueSky Holidays": {
    plan: "Starter",
    expiry: "2026-04-01",
    status: "Active",
  },
};

type Tab = "overview" | "leads" | "inquiries" | "bookings";

function Badge({
  text,
  bg,
  color,
}: { text: string; bg: string; color: string }) {
  return (
    <span
      style={{
        background: bg,
        color,
        padding: "3px 10px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: 600,
      }}
    >
      {text}
    </span>
  );
}

export default function PartnerDashboard() {
  const navigate = useNavigate();
  const [partnerInfo, setPartnerInfo] = useState<{
    name: string;
    company: string;
    email: string;
  } | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  useEffect(() => {
    const stored = localStorage.getItem("partner_logged_in");
    if (!stored) {
      navigate({ to: "/partner-login" });
      return;
    }
    setPartnerInfo(JSON.parse(stored));
  }, [navigate]);

  if (!partnerInfo) return null;

  const myLeads = ALL_LEADS.filter((l) => l.assignedTo === partnerInfo.company);
  const myInquiries = ALL_INQUIRIES.filter(
    (i) => i.assignedTo === partnerInfo.company,
  );
  const myBookings = ALL_BOOKINGS.filter(
    (b) => b.partner === partnerInfo.company,
  );
  const planInfo = PARTNER_PLANS[partnerInfo.company];

  const logout = () => {
    localStorage.removeItem("partner_logged_in");
    navigate({ to: "/partner-login" });
  };

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "overview", label: "Overview", icon: Users },
    { id: "leads", label: "Assigned Leads", icon: TrendingUp },
    { id: "inquiries", label: "Customer Inquiries", icon: MessageSquare },
    { id: "bookings", label: "Booking History", icon: BookOpen },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Header */}
      <header
        style={{
          background: "#1e40af",
          color: "#fff",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 800,
              fontSize: "18px",
            }}
          >
            Travel N World
          </div>
          <div style={{ fontSize: "13px", opacity: 0.8 }}>
            Partner Portal – {partnerInfo.company}
          </div>
        </div>
        <button
          type="button"
          data-ocid="partner.logout.button"
          onClick={logout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: "rgba(255,255,255,0.15)",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: "8px",
            padding: "8px 14px",
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          <LogOut size={15} />
          Logout
        </button>
      </header>

      {/* Tabs */}
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid #e5e7eb",
          padding: "0 24px",
          display: "flex",
          gap: "4px",
        }}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              type="button"
              key={tab.id}
              data-ocid={`partner.${tab.id}.tab`}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "14px 16px",
                border: "none",
                borderBottom: isActive
                  ? "3px solid #1e40af"
                  : "3px solid transparent",
                background: "none",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: isActive ? 600 : 400,
                color: isActive ? "#1e40af" : "#6b7280",
                whiteSpace: "nowrap",
                transition: "all 0.2s",
              }}
            >
              <Icon size={15} />
              {tab.label}
            </button>
          );
        })}
      </div>

      <main
        style={{ padding: "28px 24px", maxWidth: "1100px", margin: "0 auto" }}
      >
        {/* Overview */}
        {activeTab === "overview" && (
          <div data-ocid="partner.overview.section">
            <h2
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 700,
                fontSize: "20px",
                color: "#111827",
                marginBottom: "20px",
              }}
            >
              Welcome, {partnerInfo.name}
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "16px",
                marginBottom: "28px",
              }}
            >
              {[
                {
                  label: "Assigned Leads",
                  value: myLeads.length,
                  color: "#1e40af",
                  bg: "#dbeafe",
                  icon: TrendingUp,
                },
                {
                  label: "Customer Inquiries",
                  value: myInquiries.length,
                  color: "#059669",
                  bg: "#d1fae5",
                  icon: MessageSquare,
                },
                {
                  label: "Total Bookings",
                  value: myBookings.length,
                  color: "#7c3aed",
                  bg: "#ede9fe",
                  icon: BookOpen,
                },
                {
                  label: "Plan Status",
                  value: planInfo?.status || "None",
                  color: "#dc2626",
                  bg: "#fee2e2",
                  icon: CreditCard,
                },
              ].map((s) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.label}
                    style={{
                      background: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "12px",
                      padding: "20px",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "14px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    }}
                  >
                    <div
                      style={{
                        background: s.bg,
                        borderRadius: "10px",
                        padding: "10px",
                      }}
                    >
                      <Icon size={20} color={s.color} />
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 800,
                          fontSize: "24px",
                          color: s.color,
                          lineHeight: 1,
                        }}
                      >
                        {s.value}
                      </div>
                      <div
                        style={{
                          fontSize: "13px",
                          color: "#6b7280",
                          marginTop: "4px",
                        }}
                      >
                        {s.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {planInfo && (
              <div
                style={{
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  padding: "20px",
                  marginBottom: "20px",
                }}
              >
                <h3
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 700,
                    fontSize: "16px",
                    color: "#111827",
                    marginBottom: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <CreditCard size={18} color="#1e40af" />
                  Your Membership Plan
                </h3>
                <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
                  <div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#9ca3af",
                        fontWeight: 600,
                      }}
                    >
                      PLAN
                    </div>
                    <div
                      style={{
                        fontWeight: 700,
                        color: "#1e40af",
                        fontSize: "18px",
                      }}
                    >
                      {planInfo.plan}
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#9ca3af",
                        fontWeight: 600,
                      }}
                    >
                      EXPIRY
                    </div>
                    <div
                      style={{
                        fontWeight: 600,
                        color: "#374151",
                        fontSize: "15px",
                      }}
                    >
                      {planInfo.expiry}
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#9ca3af",
                        fontWeight: 600,
                      }}
                    >
                      STATUS
                    </div>
                    <Badge
                      text={planInfo.status}
                      bg="#dcfce7"
                      color="#166534"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Leads */}
        {activeTab === "leads" && (
          <div data-ocid="partner.leads.section">
            <h2
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 700,
                fontSize: "20px",
                color: "#111827",
                marginBottom: "20px",
              }}
            >
              Assigned Leads
            </h2>
            {myLeads.length === 0 ? (
              <div
                data-ocid="partner.leads.empty_state"
                style={{
                  textAlign: "center",
                  padding: "60px 20px",
                  color: "#9ca3af",
                  background: "#fff",
                  borderRadius: "12px",
                }}
              >
                No leads assigned yet.
              </div>
            ) : (
              <div
                style={{
                  background: "#fff",
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb",
                  overflow: "auto",
                }}
              >
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "14px",
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        background: "#f8fafc",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      {[
                        "Customer",
                        "Destination",
                        "Travel Date",
                        "Travelers",
                        "Budget",
                        "Status",
                      ].map((h) => (
                        <th
                          key={h}
                          style={{
                            padding: "12px 16px",
                            textAlign: "left",
                            fontWeight: 600,
                            color: "#374151",
                            fontSize: "12px",
                            textTransform: "uppercase",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {myLeads.map((l, idx) => (
                      <tr
                        key={l.id}
                        data-ocid={`partner.leads.row.${idx + 1}`}
                        style={{ borderBottom: "1px solid #f3f4f6" }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#f9fafb";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                        }}
                      >
                        <td
                          style={{
                            padding: "12px 16px",
                            fontWeight: 600,
                            color: "#111827",
                          }}
                        >
                          {l.customer}
                        </td>
                        <td style={{ padding: "12px 16px", color: "#374151" }}>
                          {l.destination}
                        </td>
                        <td style={{ padding: "12px 16px", color: "#374151" }}>
                          {l.travelDate}
                        </td>
                        <td
                          style={{
                            padding: "12px 16px",
                            color: "#374151",
                            textAlign: "center",
                          }}
                        >
                          {l.travelers}
                        </td>
                        <td
                          style={{
                            padding: "12px 16px",
                            fontWeight: 600,
                            color: "#111827",
                          }}
                        >
                          {l.budget}
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <Badge
                            text={l.status}
                            bg={l.status === "Active" ? "#dcfce7" : "#dbeafe"}
                            color={
                              l.status === "Active" ? "#166534" : "#1e3a8a"
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Inquiries */}
        {activeTab === "inquiries" && (
          <div data-ocid="partner.inquiries.section">
            <h2
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 700,
                fontSize: "20px",
                color: "#111827",
                marginBottom: "20px",
              }}
            >
              Customer Inquiries
            </h2>
            {myInquiries.length === 0 ? (
              <div
                data-ocid="partner.inquiries.empty_state"
                style={{
                  textAlign: "center",
                  padding: "60px 20px",
                  color: "#9ca3af",
                  background: "#fff",
                  borderRadius: "12px",
                }}
              >
                No inquiries assigned yet.
              </div>
            ) : (
              <div
                style={{
                  background: "#fff",
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb",
                  overflow: "auto",
                }}
              >
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "14px",
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        background: "#f8fafc",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      {[
                        "Customer",
                        "Destination",
                        "Travel Date",
                        "Budget",
                        "Status",
                      ].map((h) => (
                        <th
                          key={h}
                          style={{
                            padding: "12px 16px",
                            textAlign: "left",
                            fontWeight: 600,
                            color: "#374151",
                            fontSize: "12px",
                            textTransform: "uppercase",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {myInquiries.map((i, idx) => (
                      <tr
                        key={i.id}
                        data-ocid={`partner.inquiries.row.${idx + 1}`}
                        style={{ borderBottom: "1px solid #f3f4f6" }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#f9fafb";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                        }}
                      >
                        <td
                          style={{
                            padding: "12px 16px",
                            fontWeight: 600,
                            color: "#111827",
                          }}
                        >
                          {i.customerName}
                        </td>
                        <td style={{ padding: "12px 16px", color: "#374151" }}>
                          {i.destination}
                        </td>
                        <td style={{ padding: "12px 16px", color: "#374151" }}>
                          {i.travelDate}
                        </td>
                        <td
                          style={{
                            padding: "12px 16px",
                            fontWeight: 600,
                            color: "#111827",
                          }}
                        >
                          {i.budget}
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <Badge
                            text={i.status}
                            bg={i.status === "New" ? "#dbeafe" : "#fef9c3"}
                            color={i.status === "New" ? "#1e3a8a" : "#854d0e"}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Bookings */}
        {activeTab === "bookings" && (
          <div data-ocid="partner.bookings.section">
            <h2
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 700,
                fontSize: "20px",
                color: "#111827",
                marginBottom: "20px",
              }}
            >
              Booking History
            </h2>
            {myBookings.length === 0 ? (
              <div
                data-ocid="partner.bookings.empty_state"
                style={{
                  textAlign: "center",
                  padding: "60px 20px",
                  color: "#9ca3af",
                  background: "#fff",
                  borderRadius: "12px",
                }}
              >
                No bookings yet.
              </div>
            ) : (
              <div
                style={{
                  background: "#fff",
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb",
                  overflow: "auto",
                }}
              >
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "14px",
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        background: "#f8fafc",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      {[
                        "Customer",
                        "Destination",
                        "Booking Value",
                        "Booking Date",
                        "Status",
                      ].map((h) => (
                        <th
                          key={h}
                          style={{
                            padding: "12px 16px",
                            textAlign: "left",
                            fontWeight: 600,
                            color: "#374151",
                            fontSize: "12px",
                            textTransform: "uppercase",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {myBookings.map((b, idx) => (
                      <tr
                        key={b.id}
                        data-ocid={`partner.bookings.row.${idx + 1}`}
                        style={{ borderBottom: "1px solid #f3f4f6" }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#f9fafb";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                        }}
                      >
                        <td
                          style={{
                            padding: "12px 16px",
                            fontWeight: 600,
                            color: "#111827",
                          }}
                        >
                          {b.customer}
                        </td>
                        <td style={{ padding: "12px 16px", color: "#374151" }}>
                          {b.destination}
                        </td>
                        <td
                          style={{
                            padding: "12px 16px",
                            fontWeight: 600,
                            color: "#111827",
                          }}
                        >
                          {b.value}
                        </td>
                        <td style={{ padding: "12px 16px", color: "#374151" }}>
                          {b.date}
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <Badge
                            text={b.status}
                            bg={
                              b.status === "Confirmed"
                                ? "#dcfce7"
                                : b.status === "Pending"
                                  ? "#fef9c3"
                                  : "#fee2e2"
                            }
                            color={
                              b.status === "Confirmed"
                                ? "#166534"
                                : b.status === "Pending"
                                  ? "#854d0e"
                                  : "#991b1b"
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
