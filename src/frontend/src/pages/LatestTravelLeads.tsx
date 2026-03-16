import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import {
  Calendar,
  CheckCircle,
  Lock,
  MapPin,
  Phone,
  Search,
  Users,
  Wallet,
} from "lucide-react";
import { useMemo, useState } from "react";

const DESTINATIONS = [
  "Dubai",
  "Thailand",
  "Bali",
  "Singapore",
  "Maldives",
  "Kashmir",
  "Goa",
  "Kerala",
  "Rajasthan",
  "Manali",
  "Shimla",
  "Ooty",
  "Coorg",
  "Andaman",
  "Europe",
  "USA",
  "Australia",
  "New Zealand",
  "Canada",
  "Sri Lanka",
];

const CITIES = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Chennai",
  "Hyderabad",
  "Pune",
  "Kolkata",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
  "Chandigarh",
  "Surat",
  "Kochi",
  "Indore",
  "Nagpur",
  "Bhopal",
  "Agra",
  "Varanasi",
  "Amritsar",
  "Coimbatore",
];

const BUDGETS = [
  25000, 35000, 45000, 60000, 75000, 90000, 110000, 150000, 200000, 250000,
  300000, 350000, 400000, 500000,
];

const FIRST_NAMES = [
  "Rahul",
  "Priya",
  "Amit",
  "Sunita",
  "Vikram",
  "Neha",
  "Ravi",
  "Pooja",
  "Suresh",
  "Meena",
  "Arjun",
  "Kavya",
  "Rohit",
  "Divya",
  "Kiran",
  "Sanjay",
  "Anjali",
  "Deepak",
  "Shruti",
  "Manish",
];

const LAST_NAMES = [
  "Sharma",
  "Verma",
  "Singh",
  "Patel",
  "Gupta",
  "Kumar",
  "Joshi",
  "Mehta",
  "Nair",
  "Reddy",
  "Iyer",
  "Rao",
  "Mishra",
  "Dubey",
  "Tiwari",
  "Agarwal",
  "Jain",
  "Shah",
  "Chaudhary",
  "Pandey",
];

const PHONE_PREFIXES = [
  "98",
  "97",
  "96",
  "95",
  "94",
  "93",
  "92",
  "91",
  "90",
  "89",
  "88",
  "87",
  "86",
  "85",
];

function maskPhone(phone: string): string {
  return `${phone.slice(0, 2)}XXXXXX${phone.slice(-2)}`;
}

function hasActivePlan(): boolean {
  try {
    const raw = localStorage.getItem("tnw_partner_plan");
    if (!raw) return false;
    const plan = JSON.parse(raw);
    return (
      plan && plan.status === "active" && new Date(plan.expiryDate) > new Date()
    );
  } catch {
    return false;
  }
}

interface Lead {
  id: number;
  name: string;
  destination: string;
  city: string;
  budget: number;
  travelers: number;
  inquiryDate: string;
  phone: string;
  maskedPhone: string;
}

function generateLeads(): Lead[] {
  const leads: Lead[] = [];
  const now = new Date("2026-03-16");

  for (let i = 0; i < 1000; i++) {
    const destIdx = i % DESTINATIONS.length;
    const cityIdx = (i * 3 + 7) % CITIES.length;
    const budgetIdx = (i * 5 + 3) % BUDGETS.length;
    const travelersVal = (i % 9) + 1;
    const firstNameIdx = (i * 7 + 2) % FIRST_NAMES.length;
    const lastNameIdx = (i * 11 + 5) % LAST_NAMES.length;
    const phonePrefixIdx = (i * 13 + 1) % PHONE_PREFIXES.length;
    const phoneMid = String((i * 37 + 1234) % 100000).padStart(5, "0");
    const phoneSuffix = String((i * 17 + 99) % 100).padStart(2, "0");
    const phone = PHONE_PREFIXES[phonePrefixIdx] + phoneMid + phoneSuffix;

    const daysAgo = i % 90;
    const dateObj = new Date(now);
    dateObj.setDate(dateObj.getDate() - daysAgo);
    const inquiryDate = dateObj.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    leads.push({
      id: i + 1,
      name: `${FIRST_NAMES[firstNameIdx]} ${LAST_NAMES[lastNameIdx]}`,
      destination: DESTINATIONS[destIdx],
      city: CITIES[cityIdx],
      budget: BUDGETS[budgetIdx],
      travelers: travelersVal,
      inquiryDate,
      phone,
      maskedPhone: maskPhone(phone),
    });
  }
  return leads;
}

const ALL_LEADS = generateLeads();
const PAGE_SIZE = 20;

export default function LatestTravelLeads() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [noPlanModalOpen, setNoPlanModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const filtered = useMemo(() => {
    if (!search.trim()) return ALL_LEADS;
    const q = search.trim().toLowerCase();
    return ALL_LEADS.filter(
      (l) =>
        l.destination.toLowerCase().includes(q) ||
        l.city.toLowerCase().includes(q),
    );
  }, [search]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleSearch(val: string) {
    setSearch(val);
    setPage(1);
  }

  function handleViewContact(lead: Lead) {
    setSelectedLead(lead);
    if (hasActivePlan()) {
      setContactModalOpen(true);
    } else {
      setNoPlanModalOpen(true);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <section className="bg-white border-b border-gray-100 py-8 px-4">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-block w-1.5 h-6 rounded-full bg-red-600" />
                <span className="text-sm font-semibold text-red-600 uppercase tracking-wider">
                  Live Marketplace
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-display">
                Latest Travel Leads
              </h1>
              <p className="text-gray-500 mt-1 text-sm sm:text-base">
                Real-time travel inquiries from customers across India — unlock
                contact details with a B2B plan
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="bg-blue-50 rounded-xl px-4 py-2 text-center">
                <div className="text-xl font-bold text-blue-700">
                  {ALL_LEADS.length.toLocaleString()}+
                </div>
                <div className="text-xs text-blue-500">Active Leads</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="bg-white border-b border-gray-100 py-4 px-4 sticky top-14 sm:top-16 md:top-[72px] z-30">
        <div className="container-custom">
          <div className="relative max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              data-ocid="leads.search_input"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search by destination or city..."
              className="pl-9 h-10 rounded-xl border-gray-200 text-sm"
            />
          </div>
          {search && (
            <p className="text-xs text-gray-500 mt-2">
              Showing {filtered.length} results for &quot;{search}&quot;
            </p>
          )}
        </div>
      </section>

      {/* Leads Grid */}
      <section className="py-8 px-4">
        <div className="container-custom">
          {paginated.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <Search className="h-10 w-10 mx-auto mb-3 opacity-30" />
              <p className="text-lg font-medium">No leads found</p>
              <p className="text-sm">Try a different search term</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {paginated.map((lead, idx) => {
                const displayIdx = idx + 1;
                return (
                  <article
                    key={lead.id}
                    data-ocid={`leads.item.${displayIdx}`}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
                  >
                    {/* Card Top */}
                    <div className="p-4 flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div className="bg-blue-50 rounded-lg px-2.5 py-1">
                          <span className="text-xs font-semibold text-blue-700">
                            #{lead.id}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400">
                          {lead.inquiryDate}
                        </span>
                      </div>

                      <h3 className="font-bold text-gray-900 text-base mb-3 font-display">
                        {lead.destination}
                      </h3>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="h-3.5 w-3.5 text-blue-500 flex-shrink-0" />
                          <span>{lead.city}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Wallet className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />
                          <span className="font-semibold text-green-700">
                            ₹{lead.budget.toLocaleString("en-IN")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Users className="h-3.5 w-3.5 text-purple-500 flex-shrink-0" />
                          <span>
                            {lead.travelers}{" "}
                            {lead.travelers === 1 ? "Traveler" : "Travelers"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="h-3.5 w-3.5 text-orange-400 flex-shrink-0" />
                          <span>{lead.inquiryDate}</span>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2">
                        <Phone className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                        <span className="text-sm font-mono text-gray-500 tracking-wider">
                          {lead.maskedPhone}
                        </span>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="px-4 pb-4">
                      <button
                        type="button"
                        data-ocid={`leads.view_contact_button.${displayIdx}`}
                        onClick={() => handleViewContact(lead)}
                        className="w-full bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold rounded-lg py-2.5 transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Phone className="h-3.5 w-3.5" />
                        View Full Contact
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-10">
              <Button
                data-ocid="leads.pagination_prev"
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="rounded-lg border-gray-200 text-gray-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 disabled:opacity-40"
              >
                ← Previous
              </Button>
              <span className="text-sm text-gray-500">
                Page <span className="font-semibold text-gray-900">{page}</span>{" "}
                of{" "}
                <span className="font-semibold text-gray-900">
                  {totalPages}
                </span>
              </span>
              <Button
                data-ocid="leads.pagination_next"
                variant="outline"
                size="sm"
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="rounded-lg border-gray-200 text-gray-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 disabled:opacity-40"
              >
                Next →
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* No Plan Modal */}
      <Dialog open={noPlanModalOpen} onOpenChange={setNoPlanModalOpen}>
        <DialogContent
          data-ocid="leads.no_plan_modal"
          className="max-w-sm rounded-2xl text-center"
        >
          <DialogHeader>
            <div className="flex justify-center mb-3">
              <div className="bg-blue-50 rounded-full p-4">
                <Lock className="h-8 w-8 text-blue-700" />
              </div>
            </div>
            <DialogTitle className="text-lg font-bold text-gray-900">
              B2B Membership Required
            </DialogTitle>
          </DialogHeader>
          <p className="text-gray-600 text-sm mt-1 mb-6">
            Purchase a B2B membership plan to unlock customer contact details.
          </p>
          <div className="flex flex-col gap-3">
            <Link to="/pricing" onClick={() => setNoPlanModalOpen(false)}>
              <Button
                data-ocid="leads.no_plan_modal.view_plans_button"
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl h-11"
              >
                View Plans
              </Button>
            </Link>
            <Button
              data-ocid="leads.no_plan_modal.close_button"
              variant="outline"
              className="w-full rounded-xl h-11"
              onClick={() => setNoPlanModalOpen(false)}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Full Contact Modal (active plan) */}
      <Dialog open={contactModalOpen} onOpenChange={setContactModalOpen}>
        <DialogContent
          data-ocid="leads.contact_modal"
          className="max-w-md rounded-2xl p-0 overflow-hidden"
        >
          <DialogHeader className="bg-gradient-to-r from-green-600 to-green-800 px-6 py-5 text-white">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-5 w-5 text-green-200" />
              <span className="bg-green-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                ✓ Unlocked
              </span>
            </div>
            <DialogTitle className="text-lg font-bold text-white">
              Full Contact Details
            </DialogTitle>
            <p className="text-green-200 text-sm mt-0.5">
              Lead #{selectedLead?.id}
            </p>
          </DialogHeader>

          {selectedLead && (
            <div className="px-6 py-5 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="text-xs text-gray-400 mb-0.5">Name</div>
                  <div className="font-semibold text-gray-900 text-sm">
                    {selectedLead.name}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="text-xs text-gray-400 mb-0.5">Phone</div>
                  <div className="font-semibold text-gray-900 text-sm font-mono">
                    {selectedLead.phone}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="text-xs text-gray-400 mb-0.5">
                    Destination
                  </div>
                  <div className="font-semibold text-gray-900 text-sm">
                    {selectedLead.destination}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="text-xs text-gray-400 mb-0.5">City</div>
                  <div className="font-semibold text-gray-900 text-sm">
                    {selectedLead.city}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="text-xs text-gray-400 mb-0.5">Budget</div>
                  <div className="font-semibold text-green-700 text-sm">
                    ₹{selectedLead.budget.toLocaleString("en-IN")}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="text-xs text-gray-400 mb-0.5">Travelers</div>
                  <div className="font-semibold text-gray-900 text-sm">
                    {selectedLead.travelers}{" "}
                    {selectedLead.travelers === 1 ? "Person" : "People"}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <div className="text-xs text-gray-400 mb-0.5">Inquiry Date</div>
                <div className="font-semibold text-gray-900 text-sm">
                  {selectedLead.inquiryDate}
                </div>
              </div>

              <div className="flex gap-3 pt-1">
                <a
                  href={`tel:${selectedLead.phone}`}
                  className="flex-1 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold rounded-xl py-2.5 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Phone className="h-4 w-4" />
                  Call Now
                </a>
                <a
                  href={`https://wa.me/91${selectedLead.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-xl py-2.5 transition-colors flex items-center justify-center gap-1.5"
                >
                  Chat on WhatsApp
                </a>
              </div>

              <Button
                data-ocid="leads.contact_modal.close_button"
                variant="outline"
                className="w-full rounded-xl"
                onClick={() => setContactModalOpen(false)}
              >
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}
