import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building,
  Car,
  CheckCircle2,
  FileText,
  Globe,
  Loader2,
  MapPin,
  Phone,
  Plane,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export interface ServiceConfig {
  id: string;
  icon: typeof Plane;
  title: string;
  subtitle: string;
  badge: string;
  badgeColor: string;
  heroGradient: string;
  description: string;
  longDescription: string;
  benefits: string[];
  features: { title: string; desc: string }[];
  stats: { value: string; label: string }[];
  iconBg: string;
  iconColor: string;
}

const SOCIAL = {
  linkedin: "https://linkedin.com/company/travelnworld",
  instagram: "https://instagram.com/travelnworld_official",
  facebook: "https://facebook.com/profile.php?id=10009174104398",
};

export const serviceConfigs: Record<string, ServiceConfig> = {
  "flight-booking": {
    id: "flight-booking",
    icon: Plane,
    title: "Flight Booking",
    subtitle: "Exclusive B2B airfares for travel agents",
    badge: "B2B Only",
    badgeColor: "bg-blue-100 text-blue-700",
    heroGradient: "from-blue-600 to-blue-900",
    description:
      "Access all domestic and international airlines with exclusive B2B fares unavailable to the public. Book with confidence — real-time seat availability, instant e-tickets, and dedicated support.",
    longDescription:
      "As a registered Travel N World partner, you get direct access to our consolidated airline inventory at net fares. Whether booking economy seats for budget travelers or business class for corporate clients, our portal gives you the tools to search, compare, and confirm bookings instantly.",
    benefits: [
      "Exclusive wholesale fares not available on retail portals",
      "Real-time seat availability across 200+ airlines",
      "Instant e-ticket delivery to your inbox",
      "Group booking support for 10+ passengers",
      "Corporate fare negotiation and bulk deals",
      "Dedicated agent helpline for ticket issues",
      "Flexible cancellation and rescheduling support",
      "Commission earnings on every confirmed booking",
    ],
    features: [
      {
        title: "All Major Airlines",
        desc: "IndiGo, Air India, SpiceJet, Emirates, Qatar, Singapore Airlines and 200+ more",
      },
      {
        title: "Group Bookings",
        desc: "Special group rates and blocked seats for travel agencies handling large groups",
      },
      {
        title: "Instant E-Ticket",
        desc: "Booking confirmed and ticket delivered in under 2 minutes",
      },
      {
        title: "Best Fare Guarantee",
        desc: "We match or beat any comparable B2B fare in the market",
      },
    ],
    stats: [
      { value: "200+", label: "Airlines" },
      { value: "5000+", label: "Routes" },
      { value: "₹500 Cr+", label: "Tickets Issued" },
      { value: "98%", label: "On-Time Confirmation" },
    ],
    iconBg: "bg-blue-50",
    iconColor: "text-[#1E40AF]",
  },
  "hotel-booking": {
    id: "hotel-booking",
    icon: Building,
    title: "Hotel Booking",
    subtitle: "Pre-negotiated wholesale rates at 5,000+ properties",
    badge: "Wholesale",
    badgeColor: "bg-purple-100 text-purple-700",
    heroGradient: "from-purple-600 to-purple-900",
    description:
      "Access over 5,000 hotels across India and the world at pre-negotiated rates that are simply not available to the public. From budget homestays to 5-star luxury resorts.",
    longDescription:
      "Our hotel inventory covers every category — budget, mid-range, boutique, and luxury — with instant confirmation and free cancellation options on most properties. Travel agents can book on behalf of clients in seconds using our streamlined portal.",
    benefits: [
      "Pre-negotiated rates up to 40% below public pricing",
      "5,000+ properties across India and 50+ countries",
      "Instant confirmation with room blocking facility",
      "Free cancellation on majority of properties",
      "Special honeymoon, corporate, and group rates",
      "Direct hotel contact for special client requests",
      "Earn commission on every hotel stay",
      "Dedicated account manager for high-volume agents",
    ],
    features: [
      {
        title: "5000+ Properties",
        desc: "Budget guesthouses to 5-star palaces across India and internationally",
      },
      {
        title: "Instant Confirmation",
        desc: "Booking voucher issued in real-time for your clients",
      },
      {
        title: "Free Cancellation",
        desc: "Flexible booking policies on 80% of our hotel inventory",
      },
      {
        title: "Exclusive B2B Rates",
        desc: "Wholesale pricing unavailable on OTA portals like MakeMyTrip or Booking.com",
      },
    ],
    stats: [
      { value: "5000+", label: "Properties" },
      { value: "50+", label: "Countries" },
      { value: "40%", label: "Avg. Savings" },
      { value: "99%", label: "Instant Confirmation" },
    ],
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  "domestic-packages": {
    id: "domestic-packages",
    icon: MapPin,
    title: "Domestic Packages",
    subtitle: "India tour packages for every traveler type",
    badge: "B2B Only",
    badgeColor: "bg-orange-100 text-orange-700",
    heroGradient: "from-orange-500 to-orange-800",
    description:
      "Comprehensive India tour packages covering 100+ destinations — Rajasthan, Kerala, Himachal Pradesh, the Northeast, and beyond. Fully customizable itineraries tailored for your clients.",
    longDescription:
      "From the snow-capped peaks of Kashmir to the backwaters of Kerala, our domestic package portfolio covers every corner of India. Each package includes hotels, transport, guides, and sightseeing. Agents can customize any package to suit client preferences and budget.",
    benefits: [
      "100+ handcrafted India destination packages",
      "Customizable itineraries for each client's needs",
      "Experienced local guides included in most packages",
      "All-inclusive options with meals and activities",
      "Best B2B pricing with high agent commission",
      "Dedicated operations team for smooth execution",
      "Last-minute availability during off-season",
      "Group departure calendars for easy booking",
    ],
    features: [
      {
        title: "100+ Destinations",
        desc: "Rajasthan, Kerala, Himachal, Goa, Kashmir, Northeast, and more",
      },
      {
        title: "Customizable Itineraries",
        desc: "Every package can be tailored to client preferences and budget",
      },
      {
        title: "Guide Included",
        desc: "Professional guides with destination expertise included",
      },
      {
        title: "All-Inclusive Options",
        desc: "Hotel + transport + meals + sightseeing bundled for convenience",
      },
    ],
    stats: [
      { value: "100+", label: "Destinations" },
      { value: "500+", label: "Package Options" },
      { value: "10,000+", label: "Tours Executed" },
      { value: "4.8★", label: "Avg. Rating" },
    ],
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
  },
  "international-packages": {
    id: "international-packages",
    icon: Globe,
    title: "International Packages",
    subtitle: "Ready-to-sell packages for 50+ countries",
    badge: "Wholesale",
    badgeColor: "bg-teal-100 text-teal-700",
    heroGradient: "from-teal-500 to-teal-800",
    description:
      "Ready-to-sell international packages for 50+ countries. Fully escorted group tours and FIT packages with complete documentation, visa support, and on-ground assistance.",
    longDescription:
      "Our international portfolio covers Asia, Europe, the Middle East, Africa, and the Americas. Each package includes flights, hotels, visa guidance, travel insurance options, and 24/7 on-ground support — everything your clients need for a worry-free international trip.",
    benefits: [
      "Packages for 50+ countries including Dubai, Thailand, Europe, USA",
      "Complete itinerary with flights + hotels + visa guidance",
      "Group departure dates and FIT (independent) options",
      "24/7 on-ground emergency support",
      "High commission rates for international packages",
      "Multilingual guides available",
      "Travel insurance bundle options",
      "Pre-departure briefing for your clients",
    ],
    features: [
      {
        title: "50+ Countries",
        desc: "Dubai, Thailand, Singapore, Maldives, Europe, USA and more",
      },
      {
        title: "Group & FIT Options",
        desc: "Group departures every week and tailor-made individual packages",
      },
      {
        title: "Visa Support Included",
        desc: "Document checklist, appointment booking, and application support",
      },
      {
        title: "24/7 On-Ground Help",
        desc: "Emergency support line active throughout your client's trip",
      },
    ],
    stats: [
      { value: "50+", label: "Countries" },
      { value: "300+", label: "Tour Options" },
      { value: "8000+", label: "International Trips" },
      { value: "4.9★", label: "Client Satisfaction" },
    ],
    iconBg: "bg-teal-50",
    iconColor: "text-teal-600",
  },
  "visa-assistance": {
    id: "visa-assistance",
    icon: FileText,
    title: "Visa Assistance",
    subtitle: "Expert visa processing with high approval rates",
    badge: "B2B Only",
    badgeColor: "bg-red-100 text-red-700",
    heroGradient: "from-red-500 to-red-800",
    description:
      "Expert visa processing for 40+ countries with consistently high approval rates. Complete documentation guidance, real-time application tracking, and priority appointment scheduling.",
    longDescription:
      "Visa rejections cost your clients money and trust. Our visa specialists have successfully processed thousands of applications and know exactly what each embassy requires. We handle tourist, business, student, and medical visas — taking the stress off you and your clients.",
    benefits: [
      "Processing for 40+ countries including Schengen, USA, UK, Dubai",
      "98%+ visa approval rate on complete applications",
      "Step-by-step documentation checklist for each country",
      "Priority appointment booking at embassies",
      "Application status tracking in real-time",
      "Dedicated visa specialist assigned to each case",
      "Emergency visa processing available",
      "Earn per-visa commission on every successful case",
    ],
    features: [
      {
        title: "40+ Countries",
        desc: "Schengen, USA, UK, UAE, Australia, Canada, and many more",
      },
      {
        title: "Fast Processing",
        desc: "Standard 7-10 days; express processing available for urgent travel",
      },
      {
        title: "Document Guidance",
        desc: "Country-specific checklist and review before submission",
      },
      {
        title: "High Approval Rate",
        desc: "98%+ approval on properly documented applications",
      },
    ],
    stats: [
      { value: "40+", label: "Countries" },
      { value: "98%", label: "Approval Rate" },
      { value: "25,000+", label: "Visas Processed" },
      { value: "7 Days", label: "Avg. Processing" },
    ],
    iconBg: "bg-red-50",
    iconColor: "text-[#E53935]",
  },
  "transport-services": {
    id: "transport-services",
    icon: Car,
    title: "Transport Services",
    subtitle: "GPS-tracked, verified vehicles for every journey",
    badge: "Wholesale",
    badgeColor: "bg-green-100 text-green-700",
    heroGradient: "from-green-600 to-green-900",
    description:
      "Complete ground transportation solutions — airport transfers, city tours, intercity travel, and luxury vehicle rentals. All vehicles GPS-tracked and all drivers thoroughly verified.",
    longDescription:
      "From a simple airport pickup to a 15-day Rajasthan road trip, our transport network covers it all. We operate across 50+ cities with a fleet of hatchbacks, sedans, SUVs, tempo travellers, and luxury coaches — all maintained, GPS-equipped, and driven by verified professional drivers.",
    benefits: [
      "Fleet available across 50+ Indian cities",
      "Economy to luxury vehicles — sedans, SUVs, Tempo Travellers, coaches",
      "GPS tracking on every vehicle for safety",
      "Background-verified professional drivers",
      "Multi-day outstation packages with overnight stays",
      "Airport and hotel pickup/drop available round the clock",
      "Competitive wholesale rates with agent commission",
      "Last-minute bookings accommodated where available",
    ],
    features: [
      {
        title: "Airport Transfers",
        desc: "Punctual pickup and drop-off at all major Indian airports",
      },
      {
        title: "City & Outstation",
        desc: "Half-day city tours, full-day excursions, and multi-day road trips",
      },
      {
        title: "Luxury Vehicles",
        desc: "Premium sedans, SUVs, and VIP coaches for high-end clients",
      },
      {
        title: "GPS-Tracked Fleet",
        desc: "Real-time tracking so you always know where your client is",
      },
    ],
    stats: [
      { value: "50+", label: "Cities Covered" },
      { value: "2000+", label: "Vehicles" },
      { value: "100,000+", label: "Trips Completed" },
      { value: "4.7★", label: "Driver Rating" },
    ],
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
  },
};

export default function ServiceDetail({ serviceId }: { serviceId: string }) {
  const config = serviceConfigs[serviceId];
  useScrollReveal();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (config) document.title = `${config.title} — Travel N World`;
  }, [config]);

  if (!config) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          Service Not Found
        </h1>
        <p className="text-gray-500 mb-6">
          The service you are looking for does not exist.
        </p>
        <Button
          asChild
          className="bg-[#1E40AF] hover:bg-blue-800 text-white rounded-xl"
        >
          <Link to="/services">View All Services</Link>
        </Button>
      </div>
    );
  }

  const Icon = config.icon;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    // Save inquiry to localStorage for admin dashboard
    const inquiries = JSON.parse(
      localStorage.getItem("tnw_booking_inquiries") || "[]",
    );
    inquiries.unshift({
      id: Date.now(),
      customerName: form.name,
      phone: form.phone,
      email: form.email,
      destination: config.title,
      travelDate: "",
      travelers: "",
      budget: "",
      message: form.message,
      date: new Date().toLocaleDateString("en-IN"),
      status: "new",
      source: "Service Page",
    });
    localStorage.setItem("tnw_booking_inquiries", JSON.stringify(inquiries));
    setLoading(false);
    setSubmitted(true);
    toast.success(
      "Inquiry submitted! We'll contact you with the best B2B rates.",
    );
  };

  return (
    <div>
      {/* Hero */}
      <div
        className={`bg-gradient-to-br ${config.heroGradient} py-16 md:py-20`}
      >
        <div className="container-custom">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-6">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/services" className="hover:text-white transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-white">{config.title}</span>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div
              className={`w-16 h-16 ${config.iconBg} rounded-2xl flex items-center justify-center flex-shrink-0`}
            >
              <Icon className={`h-8 w-8 ${config.iconColor}`} />
            </div>
            <div>
              <span
                className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${config.badgeColor} mb-3`}
              >
                {config.badge}
              </span>
              <h1 className="font-bold text-3xl md:text-5xl text-white mb-2">
                {config.title}
              </h1>
              <p className="text-white/80 text-lg">{config.subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="container-custom py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {config.stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-bold text-2xl text-[#1E40AF]">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left: Description + Benefits + Features */}
            <div className="lg:col-span-2 space-y-10">
              {/* Description */}
              <div className="reveal bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                <h2 className="font-bold text-2xl text-gray-900 mb-4">
                  {config.title} — Overview
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {config.description}
                </p>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {config.longDescription}
                </p>
              </div>

              {/* Benefits */}
              <div className="reveal bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                <h2 className="font-bold text-xl text-gray-900 mb-6">
                  Benefits for Travel Agents
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {config.benefits.map((b) => (
                    <div key={b} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-[#1E40AF] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 text-sm">{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="reveal">
                <h2 className="font-bold text-xl text-gray-900 mb-6">
                  Key Features
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {config.features.map((f) => (
                    <div
                      key={f.title}
                      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="font-semibold text-gray-900 text-sm">
                          {f.title}
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {f.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Banner */}
              <div
                className={`reveal bg-gradient-to-r ${config.heroGradient} rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-4`}
              >
                <div>
                  <div className="font-bold text-white text-xl mb-1">
                    Ready to get started?
                  </div>
                  <div className="text-white/80 text-sm">
                    Join 5,000+ travel agents already using our platform
                  </div>
                </div>
                <Button
                  asChild
                  className="bg-white text-gray-900 hover:bg-gray-100 font-bold px-6 py-2.5 rounded-xl flex-shrink-0 transition-colors"
                >
                  <Link to="/partner">
                    Get Best B2B Rates <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right: Inquiry Form */}
            <div className="lg:col-span-1">
              <div className="reveal bg-white rounded-2xl border border-gray-100 shadow-md p-7 sticky top-24">
                {!submitted ? (
                  <>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">
                      Get Best B2B Rates
                    </h3>
                    <p className="text-gray-500 text-sm mb-6">
                      Fill in your details and our team will contact you with
                      exclusive partner pricing.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label
                          htmlFor="sd-name"
                          className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5 block"
                        >
                          Your Name *
                        </label>
                        <Input
                          id="sd-name"
                          required
                          data-ocid={`service.${serviceId}.name.input`}
                          placeholder="Full name"
                          value={form.name}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, name: e.target.value }))
                          }
                          className="rounded-xl h-11"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="sd-phone"
                          className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5 block"
                        >
                          Phone Number *
                        </label>
                        <Input
                          id="sd-phone"
                          required
                          type="tel"
                          data-ocid={`service.${serviceId}.phone.input`}
                          placeholder="+91 XXXXX XXXXX"
                          value={form.phone}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, phone: e.target.value }))
                          }
                          className="rounded-xl h-11"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="sd-email"
                          className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5 block"
                        >
                          Email Address *
                        </label>
                        <Input
                          id="sd-email"
                          required
                          type="email"
                          data-ocid={`service.${serviceId}.email.input`}
                          placeholder="your@email.com"
                          value={form.email}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, email: e.target.value }))
                          }
                          className="rounded-xl h-11"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="sd-message"
                          className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5 block"
                        >
                          Message / Requirements
                        </label>
                        <Textarea
                          id="sd-message"
                          data-ocid={`service.${serviceId}.message.textarea`}
                          placeholder={`Tell us about your ${config.title.toLowerCase()} requirements...`}
                          value={form.message}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, message: e.target.value }))
                          }
                          className="rounded-xl resize-none min-h-24"
                        />
                      </div>
                      <Button
                        type="submit"
                        data-ocid={`service.${serviceId}.submit_button`}
                        disabled={loading}
                        className="w-full bg-[#1E40AF] hover:bg-blue-800 text-white font-bold h-12 rounded-xl transition-all"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />{" "}
                            Submitting...
                          </>
                        ) : (
                          "Get Best B2B Rates"
                        )}
                      </Button>
                    </form>
                  </>
                ) : (
                  <div
                    data-ocid={`service.${serviceId}.success_state`}
                    className="text-center py-8"
                  >
                    <CheckCircle2 className="h-14 w-14 text-green-500 mx-auto mb-4" />
                    <h3 className="font-bold text-lg text-gray-900 mb-2">
                      Inquiry Submitted!
                    </h3>
                    <p className="text-gray-500 text-sm mb-6">
                      Our travel expert will contact you within 24 hours with
                      the best B2B rates.
                    </p>
                    <a
                      href="https://wa.me/917290087054"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
                    >
                      <Phone className="h-4 w-4" /> Chat on WhatsApp
                    </a>
                  </div>
                )}

                {/* Contact info */}
                <div className="mt-6 pt-6 border-t border-gray-100 space-y-2">
                  <a
                    href="tel:+917290087054"
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#1E40AF] transition-colors"
                  >
                    <Phone className="h-4 w-4" /> +91 7290087054
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-10 reveal">
            <h2 className="font-bold text-2xl md:text-3xl text-gray-900">
              Explore Other Services
            </h2>
          </div>
          <div className="flex flex-wrap gap-3 justify-center reveal">
            {Object.values(serviceConfigs)
              .filter((s) => s.id !== serviceId)
              .map((s) => (
                <Link
                  key={s.id}
                  to={`/${s.id}` as never}
                  data-ocid={`service.other.${s.id}.link`}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-blue-50 hover:border-blue-200 hover:text-[#1E40AF] transition-all duration-200"
                >
                  <s.icon className="h-4 w-4" /> {s.title}
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-10 bg-gray-50 border-t border-gray-100">
        <div className="container-custom text-center">
          <p className="text-gray-500 text-sm mb-4">
            Follow Travel N World on social media
          </p>
          <div className="flex items-center justify-center gap-4">
            <a
              href={SOCIAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#0077B5] text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity"
            >
              LinkedIn
            </a>
            <a
              href={SOCIAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity"
            >
              Instagram
            </a>
            <a
              href={SOCIAL.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#1877F2] text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity"
            >
              Facebook
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
