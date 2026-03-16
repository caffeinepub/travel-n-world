import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Link } from "@tanstack/react-router";
import {
  BadgeCheck,
  CheckCircle2,
  Globe,
  Lock,
  Mail,
  MapPin,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { TravelInquiryForm } from "./TravelInquiryForm";

// ─── Data ────────────────────────────────────────────────────────────────────

const travelLeads = [
  {
    id: 1,
    destination: "Goa Trip",
    travelers: 4,
    budget: "₹40,000",
    date: "December",
    tag: "Domestic",
  },
  {
    id: 2,
    destination: "Dubai Tour",
    travelers: 2,
    budget: "₹1,20,000",
    date: "January",
    tag: "International",
  },
  {
    id: 3,
    destination: "Manali Package",
    travelers: 5,
    budget: "₹55,000",
    date: "February",
    tag: "Domestic",
  },
  {
    id: 4,
    destination: "Kerala Tour",
    travelers: 3,
    budget: "₹65,000",
    date: "March",
    tag: "Domestic",
  },
  {
    id: 5,
    destination: "Thailand Trip",
    travelers: 4,
    budget: "₹1,80,000",
    date: "April",
    tag: "International",
  },
  {
    id: 6,
    destination: "Rajasthan Tour",
    travelers: 6,
    budget: "₹72,000",
    date: "November",
    tag: "Domestic",
  },
  {
    id: 7,
    destination: "Maldives Package",
    travelers: 2,
    budget: "₹2,40,000",
    date: "May",
    tag: "International",
  },
  {
    id: 8,
    destination: "Shimla Trip",
    travelers: 4,
    budget: "₹38,000",
    date: "December",
    tag: "Domestic",
  },
  {
    id: 9,
    destination: "Singapore Tour",
    travelers: 3,
    budget: "₹1,50,000",
    date: "June",
    tag: "International",
  },
  {
    id: 10,
    destination: "Bali Holiday",
    travelers: 2,
    budget: "₹1,60,000",
    date: "July",
    tag: "International",
  },
  {
    id: 11,
    destination: "Kashmir Package",
    travelers: 5,
    budget: "₹85,000",
    date: "October",
    tag: "Domestic",
  },
  {
    id: 12,
    destination: "Ladakh Trip",
    travelers: 4,
    budget: "₹92,000",
    date: "September",
    tag: "Domestic",
  },
  {
    id: 13,
    destination: "Europe Tour",
    travelers: 2,
    budget: "₹3,20,000",
    date: "June",
    tag: "International",
  },
  {
    id: 14,
    destination: "Andaman Package",
    travelers: 4,
    budget: "₹78,000",
    date: "January",
    tag: "Domestic",
  },
  {
    id: 15,
    destination: "Ooty Trip",
    travelers: 3,
    budget: "₹32,000",
    date: "December",
    tag: "Domestic",
  },
  {
    id: 16,
    destination: "Coorg Weekend",
    travelers: 2,
    budget: "₹28,000",
    date: "November",
    tag: "Domestic",
  },
  {
    id: 17,
    destination: "Jaipur Tour",
    travelers: 5,
    budget: "₹45,000",
    date: "February",
    tag: "Domestic",
  },
  {
    id: 18,
    destination: "Sri Lanka Trip",
    travelers: 3,
    budget: "₹1,10,000",
    date: "March",
    tag: "International",
  },
];

const confirmedBookings = [
  {
    id: 1,
    tour: "Kerala Tour",
    bookedBy: "Delhi Partner",
    category: "Domestic",
  },
  {
    id: 2,
    tour: "Dubai Package",
    bookedBy: "Mumbai Partner",
    category: "International",
  },
  {
    id: 3,
    tour: "Manali Trip",
    bookedBy: "Jaipur Partner",
    category: "Domestic",
  },
  {
    id: 4,
    tour: "Thailand Holiday",
    bookedBy: "Bangalore Partner",
    category: "International",
  },
  {
    id: 5,
    tour: "Goa Package",
    bookedBy: "Hyderabad Partner",
    category: "Domestic",
  },
  {
    id: 6,
    tour: "Singapore Tour",
    bookedBy: "Chennai Partner",
    category: "International",
  },
  {
    id: 7,
    tour: "Rajasthan Tour",
    bookedBy: "Ahmedabad Partner",
    category: "Domestic",
  },
  {
    id: 8,
    tour: "Maldives Trip",
    bookedBy: "Pune Partner",
    category: "International",
  },
  {
    id: 9,
    tour: "Kashmir Package",
    bookedBy: "Kolkata Partner",
    category: "Domestic",
  },
  {
    id: 10,
    tour: "Bali Holiday",
    bookedBy: "Lucknow Partner",
    category: "International",
  },
];

const trustStats = [
  {
    icon: Mail,
    value: "12,000+",
    label: "Travel Leads Generated",
    color: "#1E40AF",
    bg: "rgba(30,64,175,0.08)",
  },
  {
    icon: CheckCircle2,
    value: "5,000+",
    label: "Confirmed Bookings",
    color: "#16a34a",
    bg: "rgba(22,163,74,0.08)",
  },
  {
    icon: BadgeCheck,
    value: "150+",
    label: "Verified Travel Partners",
    color: "#1E40AF",
    bg: "rgba(30,64,175,0.08)",
  },
  {
    icon: Globe,
    value: "50+",
    label: "Travel Destinations",
    color: "#E53935",
    bg: "rgba(229,57,53,0.08)",
  },
];

type DisplayLead = {
  id: number;
  destination: string;
  travelers: number;
  budget: string;
  date: string;
  tag: string;
};

// ─── Lead Access Modal ────────────────────────────────────────────────────────
function LeadAccessModal({
  open,
  onClose,
}: { open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent data-ocid="lead.dialog" className="max-w-md rounded-2xl">
        <DialogHeader>
          <div className="flex items-center justify-center mb-3">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ background: "rgba(30,64,175,0.1)" }}
            >
              <Lock className="h-7 w-7" style={{ color: "#1E40AF" }} />
            </div>
          </div>
          <DialogTitle
            className="text-center text-xl font-bold"
            style={{ color: "#111827" }}
          >
            Contact Details Locked
          </DialogTitle>
          <DialogDescription
            className="text-center"
            style={{ color: "#374151" }}
          >
            Buy a B2B membership plan to unlock customer contact details and
            convert leads into bookings.
          </DialogDescription>
        </DialogHeader>
        <div
          className="my-3 rounded-xl p-4"
          style={{ background: "#F5F7FA", border: "1px solid #e5e7eb" }}
        >
          <ul className="space-y-2">
            {[
              "Access customer name & phone number",
              "View email and travel requirements",
              "Get daily fresh leads directly",
              "Convert inquiries into confirmed bookings",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-sm"
                style={{ color: "#374151" }}
              >
                <CheckCircle2
                  className="h-4 w-4 flex-shrink-0"
                  style={{ color: "#16a34a" }}
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <DialogFooter className="flex flex-col gap-2 sm:flex-col">
          <Button
            asChild
            data-ocid="lead.view_plans.button"
            className="w-full font-semibold rounded-xl h-11"
            style={{ background: "#1E40AF" }}
          >
            <Link to="/pricing" onClick={onClose}>
              View Membership Plans →
            </Link>
          </Button>
          <Button
            variant="ghost"
            data-ocid="lead.dialog.close_button"
            onClick={onClose}
            className="w-full text-gray-500 hover:text-gray-700 rounded-xl"
          >
            Maybe Later
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Lead Card ────────────────────────────────────────────────────────────────
function LeadCard({
  lead,
  index,
  onViewContact,
}: { lead: DisplayLead; index: number; onViewContact: () => void }) {
  const isInt = lead.tag === "International";
  return (
    <div
      data-ocid={`leads.item.${index}`}
      className="bg-white rounded-xl p-5 flex flex-col gap-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
      style={{
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        border: "1px solid #f0f0f0",
        borderTop: `3px solid ${isInt ? "#E53935" : "#1E40AF"}`,
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3
            className="font-bold text-base leading-tight"
            style={{ color: "#1E40AF" }}
          >
            {lead.destination}
          </h3>
          <span
            className="inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full mt-1"
            style={{
              background: isInt ? "rgba(229,57,53,0.1)" : "rgba(30,64,175,0.1)",
              color: isInt ? "#E53935" : "#1E40AF",
            }}
          >
            {lead.tag}
          </span>
        </div>
        <MapPin
          className="h-4 w-4 flex-shrink-0 mt-0.5"
          style={{ color: "#9ca3af" }}
        />
      </div>

      <div className="grid grid-cols-2 gap-y-1.5 text-sm">
        <div className="flex items-center gap-1.5" style={{ color: "#374151" }}>
          <Users className="h-3.5 w-3.5" style={{ color: "#6B7280" }} />
          <span>{lead.travelers} Travelers</span>
        </div>
        <div className="flex items-center gap-1.5" style={{ color: "#374151" }}>
          <span className="text-xs font-semibold" style={{ color: "#16a34a" }}>
            Budget
          </span>
          <span className="font-semibold text-xs" style={{ color: "#111827" }}>
            {lead.budget}
          </span>
        </div>
        {lead.date && (
          <div className="col-span-2 text-xs" style={{ color: "#6B7280" }}>
            Travel Date:{" "}
            <span className="font-medium" style={{ color: "#374151" }}>
              {lead.date}
            </span>
          </div>
        )}
      </div>

      <button
        type="button"
        data-ocid={`leads.view_contact.${index}`}
        onClick={onViewContact}
        className="mt-auto flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95"
        style={{ background: "#1E40AF" }}
      >
        <Lock className="h-3.5 w-3.5" />
        View Contact Details
      </button>
    </div>
  );
}

// ─── Main Export ─────────────────────────────────────────────────────────────
export function TravelLeadsSections() {
  const [modalOpen, setModalOpen] = useState(false);
  const [allLeads, setAllLeads] = useState<DisplayLead[]>(travelLeads);

  useEffect(() => {
    try {
      const stored: Array<{
        id: number;
        destination: string;
        travelers: number;
        budget: string;
        date: string;
      }> = JSON.parse(localStorage.getItem("travel_leads") || "[]");
      const mapped: DisplayLead[] = stored.map((l) => ({
        id: l.id,
        destination: l.destination,
        travelers: l.travelers,
        budget: l.budget,
        date: new Date(l.date).toLocaleDateString("en-IN", { month: "long" }),
        tag: "Website",
      }));
      const merged = [...mapped, ...travelLeads].slice(0, 18);
      setAllLeads(merged);
    } catch {
      // ignore parse errors
    }
  }, []);

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* SUBMIT TRAVEL INQUIRY */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section
        data-ocid="inquiry.section"
        className="py-16"
        style={{
          background: "#F5F7FA",
          borderTop: "1px solid #e5e7eb",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <div className="container-custom">
          <div className="text-center mb-10">
            <span
              className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3"
              style={{ background: "rgba(30,64,175,0.1)", color: "#1E40AF" }}
            >
              Travel Inquiry
            </span>
            <h2
              className="font-bold text-3xl md:text-4xl mb-3"
              style={{ color: "#111827", fontFamily: "Poppins, sans-serif" }}
            >
              Planning Your Next Trip?
            </h2>
            <div
              className="w-16 h-1 rounded-full mx-auto mb-4"
              style={{ background: "#E53935" }}
            />
            <p
              className="max-w-xl mx-auto text-base"
              style={{ color: "#6B7280" }}
            >
              Submit your travel requirement and our expert travel agents will
              contact you with the best packages.
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <TravelInquiryForm />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* PLATFORM TRUST STATS */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section
        data-ocid="trust_stats.section"
        className="py-14"
        style={{ background: "#fff", borderBottom: "1px solid #e5e7eb" }}
      >
        <div className="container-custom">
          <div className="text-center mb-10">
            <span
              className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3"
              style={{ background: "rgba(229,57,53,0.1)", color: "#E53935" }}
            >
              Platform Activity
            </span>
            <h2
              className="font-bold text-2xl md:text-3xl"
              style={{ color: "#111827" }}
            >
              Trusted by Thousands of Travel Agents Across India
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {trustStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  data-ocid="trust_stats.card"
                  className="bg-white rounded-2xl p-6 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                  style={{
                    boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
                    border: "1px solid #f0f0f0",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: stat.bg }}
                  >
                    <Icon className="h-6 w-6" style={{ color: stat.color }} />
                  </div>
                  <div
                    className="font-bold text-3xl md:text-4xl mb-1"
                    style={{ color: "#1E40AF" }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-sm font-medium"
                    style={{ color: "#374151" }}
                  >
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* LATEST TRAVEL INQUIRIES */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section
        data-ocid="leads.section"
        className="py-16"
        style={{ background: "#F5F7FA" }}
      >
        <div className="container-custom">
          <div className="text-center mb-12">
            <span
              className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3"
              style={{ background: "rgba(229,57,53,0.1)", color: "#E53935" }}
            >
              Live Leads
            </span>
            <h2
              className="font-bold text-3xl md:text-4xl mb-4"
              style={{ color: "#111827" }}
            >
              Latest Travel Inquiries
            </h2>
            <div
              className="w-16 h-1 rounded-full mx-auto mb-4"
              style={{ background: "#E53935" }}
            />
            <p
              className="max-w-xl mx-auto text-base"
              style={{ color: "#6B7280" }}
            >
              Live travel leads from customers across India — join as a partner
              to access contact details.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {allLeads.map((lead, i) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                index={i + 1}
                onViewContact={() => setModalOpen(true)}
              />
            ))}
          </div>

          <div className="text-center mt-10">
            <div
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold"
              style={{ background: "rgba(30,64,175,0.07)", color: "#1E40AF" }}
            >
              <Mail className="h-4 w-4" />
              12,000+ leads generated — new inquiries arrive daily
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* RECENTLY CONFIRMED BOOKINGS */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section
        data-ocid="bookings.section"
        className="py-16"
        style={{ background: "#fff" }}
      >
        <div className="container-custom">
          <div className="text-center mb-12">
            <span
              className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3"
              style={{ background: "rgba(22,163,74,0.1)", color: "#16a34a" }}
            >
              Booking Activity
            </span>
            <h2
              className="font-bold text-3xl md:text-4xl mb-4"
              style={{ color: "#111827" }}
            >
              Recently Confirmed Bookings
            </h2>
            <div
              className="w-16 h-1 rounded-full mx-auto mb-4"
              style={{ background: "#E53935" }}
            />
            <p
              className="max-w-xl mx-auto text-base"
              style={{ color: "#6B7280" }}
            >
              Our verified travel partners are converting leads into confirmed
              bookings daily.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {confirmedBookings.map((booking, i) => (
              <div
                key={booking.id}
                data-ocid={`bookings.item.${i + 1}`}
                className="bg-white rounded-xl p-5 flex flex-col gap-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
                  border: "1px solid #f0f0f0",
                  borderLeft: `4px solid ${booking.category === "International" ? "#E53935" : "#1E40AF"}`,
                }}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3
                    className="font-bold text-base"
                    style={{ color: "#111827" }}
                  >
                    {booking.tour}
                  </h3>
                  <span
                    className="flex-shrink-0 inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full"
                    style={{
                      background: "rgba(22,163,74,0.12)",
                      color: "#16a34a",
                    }}
                  >
                    <CheckCircle2 className="h-3 w-3" />
                    Confirmed
                  </span>
                </div>
                <div
                  className="flex items-center gap-1.5 text-sm"
                  style={{ color: "#374151" }}
                >
                  <BadgeCheck
                    className="h-4 w-4 flex-shrink-0"
                    style={{ color: "#1E40AF" }}
                  />
                  Booked by{" "}
                  <span className="font-semibold ml-0.5">
                    {booking.bookedBy}
                  </span>
                </div>
                <div
                  className="text-[11px] font-medium px-2.5 py-1 rounded-lg w-fit"
                  style={{
                    background:
                      booking.category === "International"
                        ? "rgba(229,57,53,0.08)"
                        : "rgba(30,64,175,0.08)",
                    color:
                      booking.category === "International"
                        ? "#E53935"
                        : "#1E40AF",
                  }}
                >
                  {booking.category}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-sm mb-4" style={{ color: "#6B7280" }}>
              Want to be the next partner converting leads into bookings?
            </p>
            <Button
              asChild
              data-ocid="bookings.join_cta.button"
              className="font-semibold h-11 px-8 rounded-xl"
              style={{ background: "#E53935" }}
            >
              <Link to="/pricing">View Membership Plans →</Link>
            </Button>
          </div>
        </div>
      </section>

      <LeadAccessModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
