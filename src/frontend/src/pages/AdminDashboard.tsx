import {
  type PartnerRegistration as StoredPartnerReg,
  getPartnerRegistrations,
  updatePartnerStatus,
} from "@/lib/partnerStore";
import { useNavigate } from "@tanstack/react-router";
import {
  BookOpen,
  Building2,
  CheckCircle,
  Edit,
  LogOut,
  Menu,
  Plus,
  Search,
  Shield,
  Trash2,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type PartnerStatus = "Pending" | "Approved" | "Verified" | "Rejected";

interface PartnerReg {
  id: number;
  name: string;
  company: string;
  phone: string;
  email: string;
  city: string;
  experience?: string;
  date: string;
  status: PartnerStatus;
  isNew?: boolean;
}

interface Lead {
  id: number;
  customer: string;
  destination: string;
  travelDate: string;
  travelers: number;
  budget: string;
  phone: string;
  assignedTo: string;
}

interface Booking {
  id: number;
  customer: string;
  destination: string;
  partner: string;
  value: string;
  date: string;
  status: "Confirmed" | "Pending" | "Cancelled";
}

interface DirectoryPartner {
  id: number;
  company: string;
  city: string;
  specialization: string;
  phone: string;
  email: string;
  verified: boolean;
}

// ─── Sample Data ─────────────────────────────────────────────────────────────

const INITIAL_REGISTRATIONS: PartnerReg[] = [
  {
    id: 1,
    name: "Rajesh Sharma",
    company: "Horizon Travels",
    phone: "+91 98765 43210",
    email: "rajesh@horizontravels.in",
    city: "Delhi",
    date: "2026-03-01",
    status: "Pending",
  },
  {
    id: 2,
    name: "Priya Mehta",
    company: "SkyWing Tours",
    phone: "+91 87654 32109",
    email: "priya@skywingtours.in",
    city: "Mumbai",
    date: "2026-03-03",
    status: "Approved",
  },
  {
    id: 3,
    name: "Aman Gupta",
    company: "Royal Journeys",
    phone: "+91 76543 21098",
    email: "aman@royaljourneys.in",
    city: "Jaipur",
    date: "2026-03-05",
    status: "Verified",
  },
  {
    id: 4,
    name: "Sunita Patel",
    company: "Voyager India",
    phone: "+91 65432 10987",
    email: "sunita@voyagerindia.in",
    city: "Ahmedabad",
    date: "2026-03-07",
    status: "Pending",
  },
  {
    id: 5,
    name: "Vikram Singh",
    company: "BlueSky Holidays",
    phone: "+91 54321 09876",
    email: "vikram@blueskyholidays.in",
    city: "Bangalore",
    date: "2026-03-08",
    status: "Rejected",
  },
  {
    id: 6,
    name: "Kavita Nair",
    company: "Dreamland Travels",
    phone: "+91 43210 98765",
    email: "kavita@dreamlandtravels.in",
    city: "Chennai",
    date: "2026-03-09",
    status: "Pending",
  },
  {
    id: 7,
    name: "Rohit Jain",
    company: "Globe Trotters",
    phone: "+91 32109 87654",
    email: "rohit@globetrotters.in",
    city: "Kolkata",
    date: "2026-03-10",
    status: "Approved",
  },
  {
    id: 8,
    name: "Meena Reddy",
    company: "Wanderlust Tours",
    phone: "+91 21098 76543",
    email: "meena@wanderlusttours.in",
    city: "Hyderabad",
    date: "2026-03-11",
    status: "Pending",
  },
];

const LEADS: Lead[] = [
  {
    id: 1,
    customer: "Amit Verma",
    destination: "Dubai Tour",
    travelDate: "2026-04-15",
    travelers: 4,
    budget: "₹1,20,000",
    phone: "+91 98XXX1234",
    assignedTo: "",
  },
  {
    id: 2,
    customer: "Neha Kapoor",
    destination: "Goa Holiday",
    travelDate: "2026-04-20",
    travelers: 2,
    budget: "₹45,000",
    phone: "+91 87XXX5678",
    assignedTo: "",
  },
  {
    id: 3,
    customer: "Suresh Kumar",
    destination: "Manali Trip",
    travelDate: "2026-05-01",
    travelers: 5,
    budget: "₹55,000",
    phone: "+91 76XXX9012",
    assignedTo: "Horizon Travels",
  },
  {
    id: 4,
    customer: "Pooja Sharma",
    destination: "Kerala Tour",
    travelDate: "2026-05-10",
    travelers: 3,
    budget: "₹65,000",
    phone: "+91 65XXX3456",
    assignedTo: "",
  },
  {
    id: 5,
    customer: "Ravi Agarwal",
    destination: "Maldives",
    travelDate: "2026-05-15",
    travelers: 2,
    budget: "₹2,50,000",
    phone: "+91 54XXX7890",
    assignedTo: "SkyWing Tours",
  },
  {
    id: 6,
    customer: "Anjali Singh",
    destination: "Thailand",
    travelDate: "2026-05-20",
    travelers: 6,
    budget: "₹1,80,000",
    phone: "+91 43XXX2345",
    assignedTo: "",
  },
  {
    id: 7,
    customer: "Deepak Gupta",
    destination: "Singapore",
    travelDate: "2026-06-01",
    travelers: 4,
    budget: "₹2,10,000",
    phone: "+91 32XXX6789",
    assignedTo: "Royal Journeys",
  },
  {
    id: 8,
    customer: "Shruti Patel",
    destination: "Bali Indonesia",
    travelDate: "2026-06-10",
    travelers: 2,
    budget: "₹1,40,000",
    phone: "+91 21XXX0123",
    assignedTo: "",
  },
  {
    id: 9,
    customer: "Manoj Tiwari",
    destination: "Kashmir",
    travelDate: "2026-06-15",
    travelers: 7,
    budget: "₹80,000",
    phone: "+91 11XXX4567",
    assignedTo: "",
  },
  {
    id: 10,
    customer: "Prerna Mishra",
    destination: "Europe Tour",
    travelDate: "2026-07-01",
    travelers: 3,
    budget: "₹4,50,000",
    phone: "+91 99XXX8901",
    assignedTo: "BlueSky Holidays",
  },
];

const BOOKINGS: Booking[] = [
  {
    id: 1,
    customer: "Amit Verma",
    destination: "Dubai Package",
    partner: "Horizon Travels",
    value: "₹1,15,000",
    date: "2026-03-05",
    status: "Confirmed",
  },
  {
    id: 2,
    customer: "Priya Shah",
    destination: "Goa Weekend",
    partner: "SkyWing Tours",
    value: "₹42,000",
    date: "2026-03-06",
    status: "Confirmed",
  },
  {
    id: 3,
    customer: "Kiran Joshi",
    destination: "Manali Snow",
    partner: "Royal Journeys",
    value: "₹58,000",
    date: "2026-03-07",
    status: "Pending",
  },
  {
    id: 4,
    customer: "Sunita Bose",
    destination: "Kerala Backwaters",
    partner: "Voyager India",
    value: "₹70,000",
    date: "2026-03-08",
    status: "Confirmed",
  },
  {
    id: 5,
    customer: "Rahul Verma",
    destination: "Maldives Luxury",
    partner: "Dreamland Travels",
    value: "₹2,40,000",
    date: "2026-03-09",
    status: "Confirmed",
  },
  {
    id: 6,
    customer: "Sonia Kapoor",
    destination: "Bangkok Tour",
    partner: "Globe Trotters",
    value: "₹85,000",
    date: "2026-03-10",
    status: "Cancelled",
  },
  {
    id: 7,
    customer: "Gaurav Singh",
    destination: "Singapore",
    partner: "BlueSky Holidays",
    value: "₹1,90,000",
    date: "2026-03-11",
    status: "Pending",
  },
  {
    id: 8,
    customer: "Ritu Sharma",
    destination: "Kashmir Valley",
    partner: "Wanderlust Tours",
    value: "₹72,000",
    date: "2026-03-12",
    status: "Confirmed",
  },
];

const INITIAL_DIRECTORY: DirectoryPartner[] = [
  {
    id: 1,
    company: "Horizon Travels",
    city: "Delhi",
    specialization: "International",
    phone: "+91 98765 43210",
    email: "info@horizontravels.in",
    verified: true,
  },
  {
    id: 2,
    company: "SkyWing Tours",
    city: "Mumbai",
    specialization: "Domestic",
    phone: "+91 87654 32109",
    email: "info@skywingtours.in",
    verified: true,
  },
  {
    id: 3,
    company: "Royal Journeys",
    city: "Jaipur",
    specialization: "Luxury",
    phone: "+91 76543 21098",
    email: "info@royaljourneys.in",
    verified: true,
  },
  {
    id: 4,
    company: "Voyager India",
    city: "Ahmedabad",
    specialization: "Domestic",
    phone: "+91 65432 10987",
    email: "info@voyagerindia.in",
    verified: false,
  },
  {
    id: 5,
    company: "BlueSky Holidays",
    city: "Bangalore",
    specialization: "International",
    phone: "+91 54321 09876",
    email: "info@blueskyholidays.in",
    verified: true,
  },
  {
    id: 6,
    company: "Dreamland Travels",
    city: "Chennai",
    specialization: "Adventure",
    phone: "+91 43210 98765",
    email: "info@dreamlandtravels.in",
    verified: false,
  },
];

const PARTNER_NAMES = [
  "Horizon Travels",
  "SkyWing Tours",
  "Royal Journeys",
  "Voyager India",
  "BlueSky Holidays",
  "Dreamland Travels",
  "Globe Trotters",
  "Wanderlust Tours",
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const statusColors: Record<PartnerStatus, { bg: string; color: string }> = {
  Pending: { bg: "#fef9c3", color: "#854d0e" },
  Approved: { bg: "#dcfce7", color: "#166534" },
  Verified: { bg: "#dbeafe", color: "#1e3a8a" },
  Rejected: { bg: "#fee2e2", color: "#991b1b" },
};

const bookingStatusColors: Record<string, { bg: string; color: string }> = {
  Confirmed: { bg: "#dcfce7", color: "#166534" },
  Pending: { bg: "#fef9c3", color: "#854d0e" },
  Cancelled: { bg: "#fee2e2", color: "#991b1b" },
};

function StatusBadge({
  status,
  colors,
}: { status: string; colors: { bg: string; color: string } }) {
  return (
    <span
      style={{
        background: colors.bg,
        color: colors.color,
        padding: "3px 10px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: 600,
        whiteSpace: "nowrap",
      }}
    >
      {status}
    </span>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // State for each section
  const [registrations, setRegistrations] = useState<PartnerReg[]>(() => {
    const realSubmissions = getPartnerRegistrations().map(
      (r: StoredPartnerReg): PartnerReg => ({
        id: r.id,
        name: r.name,
        company: r.company,
        phone: r.phone,
        email: r.email,
        city: r.city,
        experience: r.experience,
        date: r.date,
        status: r.status as PartnerStatus,
        isNew: true,
      }),
    );
    // Merge: real submissions first, then sample data (filtering out duplicates by id)
    const realIds = new Set(realSubmissions.map((r) => r.id));
    const sampleData = INITIAL_REGISTRATIONS.filter((r) => !realIds.has(r.id));
    return [...realSubmissions, ...sampleData];
  });
  const [leads, setLeads] = useState<Lead[]>(LEADS);
  const [leadSearch, setLeadSearch] = useState("");
  const [directory, setDirectory] =
    useState<DirectoryPartner[]>(INITIAL_DIRECTORY);
  const [showAddPartnerModal, setShowAddPartnerModal] = useState(false);
  const [editingPartner, setEditingPartner] = useState<DirectoryPartner | null>(
    null,
  );
  const [newPartner, setNewPartner] = useState({
    company: "",
    city: "",
    specialization: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    if (localStorage.getItem("tnw_admin_auth") !== "true") {
      navigate({ to: "/admin-login" });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("tnw_admin_auth");
    navigate({ to: "/admin-login" });
  };

  const handleRefreshRegistrations = () => {
    const realSubmissions = getPartnerRegistrations().map(
      (r: StoredPartnerReg): PartnerReg => ({
        id: r.id,
        name: r.name,
        company: r.company,
        phone: r.phone,
        email: r.email,
        city: r.city,
        experience: r.experience,
        date: r.date,
        status: r.status as PartnerStatus,
        isNew: true,
      }),
    );
    const realIds = new Set(realSubmissions.map((r) => r.id));
    const sampleData = INITIAL_REGISTRATIONS.filter((r) => !realIds.has(r.id));
    setRegistrations([...realSubmissions, ...sampleData]);
  };

  const handleStatusChange = (id: number, status: PartnerStatus) => {
    setRegistrations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r)),
    );
    // Persist status to localStorage for real submissions
    updatePartnerStatus(id, status);
  };

  const handleAssign = (id: number, assignedTo: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, assignedTo } : l)),
    );
  };

  const handleRemovePartner = (id: number) => {
    setDirectory((prev) => prev.filter((p) => p.id !== id));
  };

  const handleAddPartner = () => {
    if (!newPartner.company) return;
    const id = Math.max(...directory.map((p) => p.id), 0) + 1;
    setDirectory((prev) => [...prev, { ...newPartner, id, verified: false }]);
    setNewPartner({
      company: "",
      city: "",
      specialization: "",
      phone: "",
      email: "",
    });
    setShowAddPartnerModal(false);
  };

  const filteredLeads = leads.filter(
    (l) =>
      l.customer.toLowerCase().includes(leadSearch.toLowerCase()) ||
      l.destination.toLowerCase().includes(leadSearch.toLowerCase()),
  );

  const navItems = [
    { id: "overview", label: "Overview", icon: TrendingUp },
    { id: "registrations", label: "Partner Registrations", icon: Users },
    { id: "leads", label: "Travel Leads", icon: BookOpen },
    { id: "bookings", label: "Bookings", icon: CheckCircle },
    { id: "directory", label: "Partner Directory", icon: Building2 },
  ];

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif",
        background: "#f8fafc",
      }}
    >
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          onKeyDown={() => setSidebarOpen(false)}
          role="presentation"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 40,
          }}
        />
      )}

      {/* Sidebar */}
      <aside
        style={{
          width: "240px",
          background: "#0F172A",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 50,
          transform: sidebarOpen ? "translateX(0)" : undefined,
          transition: "transform 0.3s",
        }}
        className="hidden md:flex"
      >
        <SidebarContent
          navItems={navItems}
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setSidebarOpen(false);
          }}
          handleLogout={handleLogout}
        />
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <aside
          style={{
            width: "240px",
            background: "#0F172A",
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            top: 0,
            left: 0,
            bottom: 0,
            zIndex: 50,
          }}
        >
          <SidebarContent
            navItems={navItems}
            activeTab={activeTab}
            setActiveTab={(tab) => {
              setActiveTab(tab);
              setSidebarOpen(false);
            }}
            handleLogout={handleLogout}
          />
        </aside>
      )}

      {/* Main */}
      <div
        style={{
          flex: 1,
          marginLeft: 0,
          display: "flex",
          flexDirection: "column",
        }}
        className="md:ml-[240px]"
      >
        {/* Top bar */}
        <header
          style={{
            background: "#ffffff",
            borderBottom: "1px solid #e5e7eb",
            padding: "0 24px",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 30,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                padding: "4px",
              }}
              className="md:hidden"
              data-ocid="admin.toggle"
            >
              <Menu size={22} color="#374151" />
            </button>
            <div>
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#111827",
                  margin: 0,
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                {navItems.find((n) => n.id === activeTab)?.label}
              </h2>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "#1E40AF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 700,
                fontSize: "14px",
              }}
            >
              A
            </div>
            <span
              style={{ fontSize: "13px", color: "#374151", fontWeight: 500 }}
            >
              Admin
            </span>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, padding: "24px", overflowX: "hidden" }}>
          {activeTab === "overview" && <OverviewTab />}
          {activeTab === "registrations" && (
            <RegistrationsTab
              registrations={registrations}
              onStatusChange={handleStatusChange}
              onRefresh={handleRefreshRegistrations}
            />
          )}
          {activeTab === "leads" && (
            <LeadsTab
              leads={filteredLeads}
              search={leadSearch}
              setSearch={setLeadSearch}
              onAssign={handleAssign}
            />
          )}
          {activeTab === "bookings" && <BookingsTab />}
          {activeTab === "directory" && (
            <DirectoryTab
              directory={directory}
              onRemove={handleRemovePartner}
              onAdd={() => setShowAddPartnerModal(true)}
              editingPartner={editingPartner}
              setEditingPartner={setEditingPartner}
              onSaveEdit={(p) => {
                setDirectory((prev) =>
                  prev.map((d) => (d.id === p.id ? p : d)),
                );
                setEditingPartner(null);
              }}
            />
          )}
        </main>
      </div>

      {/* Add Partner Modal */}
      {showAddPartnerModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
          data-ocid="admin.dialog"
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "12px",
              padding: "32px",
              width: "100%",
              maxWidth: "480px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "24px",
              }}
            >
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#111827",
                  margin: 0,
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Add New Partner
              </h3>
              <button
                type="button"
                onClick={() => setShowAddPartnerModal(false)}
                data-ocid="admin.close_button"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#6B7280",
                }}
              >
                <X size={20} />
              </button>
            </div>
            {(
              ["company", "city", "specialization", "phone", "email"] as const
            ).map((field) => (
              <div key={field} style={{ marginBottom: "16px" }}>
                <div
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#374151",
                    marginBottom: "6px",
                    textTransform: "capitalize",
                  }}
                >
                  {field === "company"
                    ? "Company Name"
                    : field.charAt(0).toUpperCase() + field.slice(1)}
                </div>
                <input
                  value={newPartner[field]}
                  onChange={(e) =>
                    setNewPartner((p) => ({ ...p, [field]: e.target.value }))
                  }
                  data-ocid={`admin.${field === "company" ? "input" : "input"}`}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    border: "1.5px solid #E5E7EB",
                    borderRadius: "8px",
                    fontSize: "14px",
                    color: "#111827",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#1E40AF";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#E5E7EB";
                  }}
                />
              </div>
            ))}
            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "flex-end",
                marginTop: "24px",
              }}
            >
              <button
                type="button"
                onClick={() => setShowAddPartnerModal(false)}
                data-ocid="admin.cancel_button"
                style={{
                  padding: "10px 20px",
                  border: "1.5px solid #E5E7EB",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#374151",
                  background: "#fff",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddPartner}
                data-ocid="admin.confirm_button"
                style={{
                  padding: "10px 20px",
                  background: "#1E40AF",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Add Partner
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .md\\:flex { display: flex !important; }
          .md\\:hidden { display: none !important; }
          .md\\:ml-\\[240px\\] { margin-left: 240px !important; }
        }
      `}</style>
    </div>
  );
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────

function SidebarContent({
  navItems,
  activeTab,
  setActiveTab,
  handleLogout,
}: {
  navItems: { id: string; label: string; icon: React.ElementType }[];
  activeTab: string;
  setActiveTab: (id: string) => void;
  handleLogout: () => void;
}) {
  return (
    <>
      <div
        style={{
          padding: "20px 16px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <img
          src="/assets/uploads/Screenshot-2026-03-12-155625-1.png"
          alt="Travel N World"
          style={{ height: "40px", objectFit: "contain", marginBottom: "4px" }}
          onError={(e) => {
            const el = e.target as HTMLImageElement;
            el.style.display = "none";
          }}
        />
        <p style={{ fontSize: "11px", color: "#64748b", margin: 0 }}>
          Admin Panel
        </p>
      </div>
      <nav style={{ flex: 1, padding: "12px 8px", overflowY: "auto" }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              type="button"
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              data-ocid={`admin.${item.id}.tab`}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 12px",
                borderRadius: "8px",
                border: "none",
                background: isActive ? "#1E40AF" : "transparent",
                color: isActive ? "#ffffff" : "#94a3b8",
                fontSize: "13px",
                fontWeight: isActive ? 600 : 400,
                cursor: "pointer",
                textAlign: "left",
                marginBottom: "2px",
                transition: "all 0.15s",
              }}
            >
              <Icon size={16} />
              {item.label}
            </button>
          );
        })}
      </nav>
      <div
        style={{
          padding: "12px 8px",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <button
          type="button"
          onClick={handleLogout}
          data-ocid="admin.delete_button"
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px 12px",
            borderRadius: "8px",
            border: "none",
            background: "transparent",
            color: "#94a3b8",
            fontSize: "13px",
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </>
  );
}

// ─── Overview ────────────────────────────────────────────────────────────────

function OverviewTab() {
  const stats = [
    {
      label: "Total Partner Registrations",
      value: "247",
      icon: Users,
      color: "#1E40AF",
      bg: "#eff6ff",
    },
    {
      label: "Total Travel Leads",
      value: "12,847",
      icon: BookOpen,
      color: "#7C3AED",
      bg: "#f5f3ff",
    },
    {
      label: "Confirmed Bookings",
      value: "5,234",
      icon: CheckCircle,
      color: "#059669",
      bg: "#ecfdf5",
    },
    {
      label: "Active B2B Members",
      value: "150",
      icon: Shield,
      color: "#E53935",
      bg: "#fff5f5",
    },
  ];
  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h3
          style={{
            fontSize: "22px",
            fontWeight: 700,
            color: "#111827",
            margin: "0 0 4px",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Platform Overview
        </h3>
        <p style={{ fontSize: "14px", color: "#6B7280", margin: 0 }}>
          Key metrics for Travel N World platform
        </p>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "20px",
          marginBottom: "32px",
        }}
      >
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              data-ocid={`admin.overview.card.${i + 1}`}
              style={{
                background: "#ffffff",
                borderRadius: "12px",
                padding: "24px",
                boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
                border: "1px solid #f1f5f9",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "10px",
                  background: stat.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px",
                }}
              >
                <Icon size={20} color={stat.color} />
              </div>
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: 800,
                  color: "#111827",
                  fontFamily: "'Poppins', sans-serif",
                  lineHeight: 1.1,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{ fontSize: "13px", color: "#6B7280", marginTop: "6px" }}
              >
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent activity */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: "12px",
          padding: "24px",
          boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
          border: "1px solid #f1f5f9",
        }}
      >
        <h4
          style={{
            fontSize: "16px",
            fontWeight: 700,
            color: "#111827",
            margin: "0 0 16px",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Recent Activity
        </h4>
        {[
          {
            text: "New partner registration: Horizon Travels (Delhi)",
            time: "2 mins ago",
            color: "#1E40AF",
          },
          {
            text: "Lead assigned to SkyWing Tours – Dubai Package",
            time: "15 mins ago",
            color: "#059669",
          },
          {
            text: "Booking confirmed – Kerala Tour – ₹70,000",
            time: "1 hour ago",
            color: "#059669",
          },
          {
            text: "Partner registration rejected: BlueSky Holidays",
            time: "3 hours ago",
            color: "#dc2626",
          },
          {
            text: "New travel lead: Europe Tour – Budget ₹4,50,000",
            time: "5 hours ago",
            color: "#7C3AED",
          },
        ].map((item) => (
          <div
            key={item.text}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 0",
              borderBottom: "1px solid #f1f5f9",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: item.color,
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: "13px", color: "#374151" }}>
                {item.text}
              </span>
            </div>
            <span
              style={{
                fontSize: "12px",
                color: "#9CA3AF",
                flexShrink: 0,
                marginLeft: "12px",
              }}
            >
              {item.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Registrations ────────────────────────────────────────────────────────────

function RegistrationsTab({
  registrations,
  onStatusChange,
  onRefresh,
}: {
  registrations: PartnerReg[];
  onStatusChange: (id: number, status: PartnerStatus) => void;
  onRefresh: () => void;
}) {
  const newCount = registrations.filter((r) => r.isNew).length;
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "24px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <h3
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#111827",
              margin: "0 0 4px",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Partner Registrations
          </h3>
          <p style={{ fontSize: "13px", color: "#6B7280", margin: 0 }}>
            {registrations.length} total registrations
            {newCount > 0 && (
              <span
                style={{ color: "#059669", fontWeight: 600, marginLeft: "8px" }}
              >
                · {newCount} new from form
              </span>
            )}
          </p>
        </div>
        <button
          type="button"
          data-ocid="admin.registrations.secondary_button"
          onClick={onRefresh}
          style={{
            background: "#eff6ff",
            color: "#1E40AF",
            border: "1px solid #bfdbfe",
            borderRadius: "8px",
            padding: "8px 16px",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          ↻ Refresh
        </button>
      </div>
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
          border: "1px solid #f1f5f9",
          overflowX: "auto",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: "800px",
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
                "Name",
                "Company Name",
                "Phone",
                "Email",
                "City",
                "Experience",
                "Date",
                "Status",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "12px 16px",
                    textAlign: "left",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#6B7280",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    whiteSpace: "nowrap",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {registrations.map((r, i) => (
              <tr
                key={r.id}
                data-ocid={`admin.registrations.row.${i + 1}`}
                style={{
                  borderBottom: "1px solid #f1f5f9",
                  transition: "background 0.1s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f8fafc";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <td
                  style={{
                    padding: "14px 16px",
                    fontSize: "13px",
                    color: "#111827",
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                  }}
                >
                  {r.name}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    fontSize: "13px",
                    color: "#374151",
                    whiteSpace: "nowrap",
                  }}
                >
                  {r.company}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    fontSize: "13px",
                    color: "#374151",
                    whiteSpace: "nowrap",
                  }}
                >
                  {r.phone}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    fontSize: "13px",
                    color: "#374151",
                  }}
                >
                  {r.email}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    fontSize: "13px",
                    color: "#374151",
                    whiteSpace: "nowrap",
                  }}
                >
                  {r.city}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    fontSize: "13px",
                    color: "#374151",
                    whiteSpace: "nowrap",
                  }}
                >
                  {r.experience || "—"}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    fontSize: "13px",
                    color: "#374151",
                    whiteSpace: "nowrap",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    {r.date}
                    {r.isNew && (
                      <span
                        style={{
                          background: "#dcfce7",
                          color: "#166534",
                          fontSize: "10px",
                          fontWeight: 700,
                          padding: "1px 6px",
                          borderRadius: "10px",
                          letterSpacing: "0.04em",
                        }}
                      >
                        NEW
                      </span>
                    )}
                  </div>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <StatusBadge
                    status={r.status}
                    colors={statusColors[r.status]}
                  />
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <div
                    style={{ display: "flex", gap: "6px", flexWrap: "nowrap" }}
                  >
                    <ActionBtn
                      color="#059669"
                      bg="#ecfdf5"
                      onClick={() => onStatusChange(r.id, "Approved")}
                      ocid={`admin.registrations.secondary_button.${i + 1}`}
                    >
                      Approve
                    </ActionBtn>
                    <ActionBtn
                      color="#dc2626"
                      bg="#fef2f2"
                      onClick={() => onStatusChange(r.id, "Rejected")}
                      ocid={`admin.registrations.delete_button.${i + 1}`}
                    >
                      Reject
                    </ActionBtn>
                    <ActionBtn
                      color="#1E40AF"
                      bg="#eff6ff"
                      onClick={() => onStatusChange(r.id, "Verified")}
                      ocid={`admin.registrations.primary_button.${i + 1}`}
                    >
                      Verify
                    </ActionBtn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Leads ────────────────────────────────────────────────────────────────────

function LeadsTab({
  leads,
  search,
  setSearch,
  onAssign,
}: {
  leads: Lead[];
  search: string;
  setSearch: (s: string) => void;
  onAssign: (id: number, partner: string) => void;
}) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <h3
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#111827",
              margin: "0 0 4px",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Travel Leads
          </h3>
          <p style={{ fontSize: "13px", color: "#6B7280", margin: 0 }}>
            {leads.length} active leads
          </p>
        </div>
        <div style={{ position: "relative" }}>
          <Search
            size={15}
            color="#9CA3AF"
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads..."
            data-ocid="admin.leads.search_input"
            style={{
              padding: "9px 14px 9px 36px",
              border: "1.5px solid #E5E7EB",
              borderRadius: "8px",
              fontSize: "13px",
              outline: "none",
              color: "#374151",
              width: "220px",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#1E40AF";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#E5E7EB";
            }}
          />
        </div>
      </div>
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
          border: "1px solid #f1f5f9",
          overflowX: "auto",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: "900px",
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
                "Phone",
                "Assigned To",
                "Action",
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "12px 16px",
                    textAlign: "left",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#6B7280",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    whiteSpace: "nowrap",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leads.map((l, i) => (
              <tr
                key={l.id}
                data-ocid={`admin.leads.row.${i + 1}`}
                style={{ borderBottom: "1px solid #f1f5f9" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f8fafc";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <td
                  style={{
                    padding: "14px 16px",
                    fontSize: "13px",
                    color: "#111827",
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                  }}
                >
                  {l.customer}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    fontSize: "13px",
                    color: "#374151",
                    whiteSpace: "nowrap",
                  }}
                >
                  {l.destination}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    fontSize: "13px",
                    color: "#374151",
                    whiteSpace: "nowrap",
                  }}
                >
                  {l.travelDate}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    fontSize: "13px",
                    color: "#374151",
                    textAlign: "center",
                  }}
                >
                  {l.travelers}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    fontSize: "13px",
                    color: "#374151",
                    whiteSpace: "nowrap",
                  }}
                >
                  {l.budget}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    fontSize: "13px",
                    color: "#374151",
                    whiteSpace: "nowrap",
                  }}
                >
                  {l.phone}
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <select
                    value={l.assignedTo}
                    onChange={(e) => onAssign(l.id, e.target.value)}
                    data-ocid={`admin.leads.select.${i + 1}`}
                    style={{
                      padding: "6px 10px",
                      border: "1.5px solid #E5E7EB",
                      borderRadius: "6px",
                      fontSize: "12px",
                      color: "#374151",
                      outline: "none",
                      background: "#fff",
                      cursor: "pointer",
                      minWidth: "140px",
                    }}
                  >
                    <option value="">-- Assign Partner --</option>
                    {PARTNER_NAMES.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  {l.assignedTo && (
                    <span
                      style={{
                        fontSize: "11px",
                        background: "#dcfce7",
                        color: "#166534",
                        padding: "3px 8px",
                        borderRadius: "20px",
                        fontWeight: 600,
                      }}
                    >
                      Assigned
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Bookings ─────────────────────────────────────────────────────────────────

function BookingsTab() {
  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h3
          style={{
            fontSize: "20px",
            fontWeight: 700,
            color: "#111827",
            margin: "0 0 4px",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Booking Management
        </h3>
        <p style={{ fontSize: "13px", color: "#6B7280", margin: 0 }}>
          {BOOKINGS.length} total bookings
        </p>
      </div>
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
          border: "1px solid #f1f5f9",
          overflowX: "auto",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: "800px",
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
                "Travel Partner",
                "Booking Value",
                "Booking Date",
                "Status",
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "12px 16px",
                    textAlign: "left",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#6B7280",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    whiteSpace: "nowrap",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {BOOKINGS.map((b, i) => (
              <tr
                key={b.id}
                data-ocid={`admin.bookings.row.${i + 1}`}
                style={{ borderBottom: "1px solid #f1f5f9" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f8fafc";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <td
                  style={{
                    padding: "14px 16px",
                    fontSize: "13px",
                    color: "#111827",
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                  }}
                >
                  {b.customer}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    fontSize: "13px",
                    color: "#374151",
                    whiteSpace: "nowrap",
                  }}
                >
                  {b.destination}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    fontSize: "13px",
                    color: "#374151",
                    whiteSpace: "nowrap",
                  }}
                >
                  {b.partner}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    fontSize: "13px",
                    color: "#111827",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                  }}
                >
                  {b.value}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    fontSize: "13px",
                    color: "#374151",
                    whiteSpace: "nowrap",
                  }}
                >
                  {b.date}
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <StatusBadge
                    status={b.status}
                    colors={bookingStatusColors[b.status]}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Directory ────────────────────────────────────────────────────────────────

function DirectoryTab({
  directory,
  onRemove,
  onAdd,
  editingPartner,
  setEditingPartner,
  onSaveEdit,
}: {
  directory: DirectoryPartner[];
  onRemove: (id: number) => void;
  onAdd: () => void;
  editingPartner: DirectoryPartner | null;
  setEditingPartner: (p: DirectoryPartner | null) => void;
  onSaveEdit: (p: DirectoryPartner) => void;
}) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "24px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <h3
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#111827",
              margin: "0 0 4px",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Partner Directory
          </h3>
          <p style={{ fontSize: "13px", color: "#6B7280", margin: 0 }}>
            {directory.length} partners listed
          </p>
        </div>
        <button
          type="button"
          onClick={onAdd}
          data-ocid="admin.directory.primary_button"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "10px 18px",
            background: "#1E40AF",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          <Plus size={15} /> Add New Partner
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "16px",
        }}
      >
        {directory.map((p, i) => (
          <div
            key={p.id}
            data-ocid={`admin.directory.card.${i + 1}`}
            style={{
              background: "#ffffff",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
              border: "1px solid #f1f5f9",
            }}
          >
            {editingPartner?.id === p.id ? (
              <EditPartnerInline
                partner={editingPartner}
                onChange={setEditingPartner}
                onSave={() => onSaveEdit(editingPartner)}
                onCancel={() => setEditingPartner(null)}
              />
            ) : (
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    marginBottom: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #1E40AF, #3B82F6)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: "14px",
                      flexShrink: 0,
                    }}
                  >
                    {p.company.substring(0, 2).toUpperCase()}
                  </div>
                  {p.verified && (
                    <span
                      style={{
                        fontSize: "11px",
                        background: "#dbeafe",
                        color: "#1e3a8a",
                        padding: "3px 8px",
                        borderRadius: "20px",
                        fontWeight: 600,
                      }}
                    >
                      ✓ Verified
                    </span>
                  )}
                </div>
                <h4
                  style={{
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#111827",
                    margin: "0 0 4px",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  {p.company}
                </h4>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#6B7280",
                    margin: "0 0 4px",
                  }}
                >
                  📍 {p.city}
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#374151",
                    margin: "0 0 16px",
                  }}
                >
                  <span
                    style={{
                      background:
                        p.specialization === "International"
                          ? "#fee2e2"
                          : p.specialization === "Luxury"
                            ? "#fef9c3"
                            : p.specialization === "Adventure"
                              ? "#dcfce7"
                              : "#dbeafe",
                      color:
                        p.specialization === "International"
                          ? "#991b1b"
                          : p.specialization === "Luxury"
                            ? "#854d0e"
                            : p.specialization === "Adventure"
                              ? "#166534"
                              : "#1e3a8a",
                      padding: "2px 8px",
                      borderRadius: "20px",
                      fontSize: "11px",
                      fontWeight: 600,
                    }}
                  >
                    {p.specialization}
                  </span>
                </p>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    type="button"
                    onClick={() => setEditingPartner(p)}
                    data-ocid={`admin.directory.edit_button.${i + 1}`}
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "4px",
                      padding: "8px",
                      border: "1.5px solid #e5e7eb",
                      borderRadius: "6px",
                      background: "#fff",
                      color: "#374151",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    <Edit size={13} /> Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => onRemove(p.id)}
                    data-ocid={`admin.directory.delete_button.${i + 1}`}
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "4px",
                      padding: "8px",
                      border: "1.5px solid #fee2e2",
                      borderRadius: "6px",
                      background: "#fff5f5",
                      color: "#dc2626",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    <Trash2 size={13} /> Remove
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function EditPartnerInline({
  partner,
  onChange,
  onSave,
  onCancel,
}: {
  partner: DirectoryPartner;
  onChange: (p: DirectoryPartner) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  return (
    <div>
      {(["company", "city", "specialization", "phone", "email"] as const).map(
        (field) => (
          <div key={field} style={{ marginBottom: "10px" }}>
            <div
              style={{
                display: "block",
                fontSize: "11px",
                fontWeight: 600,
                color: "#6B7280",
                textTransform: "uppercase",
                marginBottom: "4px",
              }}
            >
              {field}
            </div>
            <input
              value={partner[field]}
              onChange={(e) =>
                onChange({ ...partner, [field]: e.target.value })
              }
              style={{
                width: "100%",
                padding: "8px 10px",
                border: "1.5px solid #E5E7EB",
                borderRadius: "6px",
                fontSize: "12px",
                outline: "none",
                boxSizing: "border-box",
                color: "#374151",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#1E40AF";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#E5E7EB";
              }}
            />
          </div>
        ),
      )}
      <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
        <button
          type="button"
          onClick={onSave}
          data-ocid="admin.directory.save_button"
          style={{
            flex: 1,
            padding: "8px",
            background: "#1E40AF",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontSize: "12px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          data-ocid="admin.directory.cancel_button"
          style={{
            flex: 1,
            padding: "8px",
            background: "#f1f5f9",
            color: "#374151",
            border: "none",
            borderRadius: "6px",
            fontSize: "12px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

// ─── Tiny action button helper ─────────────────────────────────────────────────

function ActionBtn({
  color,
  bg,
  onClick,
  children,
  ocid,
}: {
  color: string;
  bg: string;
  onClick: () => void;
  children: React.ReactNode;
  ocid: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-ocid={ocid}
      style={{
        padding: "5px 10px",
        background: bg,
        color,
        border: "none",
        borderRadius: "6px",
        fontSize: "11px",
        fontWeight: 600,
        cursor: "pointer",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </button>
  );
}
