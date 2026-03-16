import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building,
  Car,
  FileText,
  Globe,
  MapPin,
  Plane,
} from "lucide-react";
import { useEffect } from "react";

const services = [
  {
    icon: Plane,
    title: "Flight Booking",
    badge: "B2B Only",
    badgeColor: "bg-blue-100 text-blue-700",
    desc: "Access all domestic and international airlines with exclusive B2B fares. Real-time availability, instant e-tickets, group bookings, and corporate fare negotiation.",
    features: [
      "All major airlines",
      "Group booking support",
      "Instant e-ticket",
      "Best fare guarantee",
    ],
    iconBg: "bg-blue-50",
    iconColor: "text-[#1E40AF]",
    hoverBg: "group-hover:bg-[#1E40AF]",
    hoverIcon: "group-hover:text-white",
    href: "/flight-booking",
  },
  {
    icon: Building,
    title: "Hotel Booking",
    badge: "Wholesale",
    badgeColor: "bg-purple-100 text-purple-700",
    desc: "Over 5,000 hotels worldwide with pre-negotiated rates unavailable to the public. Budget to 5-star luxury resorts for every traveler.",
    features: [
      "5000+ properties",
      "Instant confirmation",
      "Free cancellation options",
      "Exclusive B2B rates",
    ],
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    hoverBg: "group-hover:bg-purple-600",
    hoverIcon: "group-hover:text-white",
    href: "/hotel-booking",
  },
  {
    icon: MapPin,
    title: "Domestic Packages",
    badge: "B2B Only",
    badgeColor: "bg-orange-100 text-orange-700",
    desc: "Comprehensive India tour packages covering 100+ destinations — Rajasthan, Kerala, Himachal Pradesh, and the Northeast. Fully customizable itineraries.",
    features: [
      "100+ destinations",
      "Customizable itineraries",
      "Guide included",
      "All-inclusive options",
    ],
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
    hoverBg: "group-hover:bg-orange-600",
    hoverIcon: "group-hover:text-white",
    href: "/domestic-packages",
  },
  {
    icon: Globe,
    title: "International Packages",
    badge: "Wholesale",
    badgeColor: "bg-teal-100 text-teal-700",
    desc: "Ready-to-sell international packages for 50+ countries. Fully escorted group tours and FIT packages with complete documentation and on-ground support.",
    features: [
      "50+ countries",
      "Group & FIT options",
      "Visa support included",
      "24/7 on-ground help",
    ],
    iconBg: "bg-teal-50",
    iconColor: "text-teal-600",
    hoverBg: "group-hover:bg-teal-600",
    hoverIcon: "group-hover:text-white",
    href: "/international-packages",
  },
  {
    icon: FileText,
    title: "Visa Assistance",
    badge: "B2B Only",
    badgeColor: "bg-red-100 text-red-700",
    desc: "Expert visa processing for 40+ countries with high approval rates. Complete documentation guidance, application tracking, and priority appointment booking.",
    features: [
      "40+ countries",
      "Fast processing",
      "Document guidance",
      "High approval rate",
    ],
    iconBg: "bg-red-50",
    iconColor: "text-[#E53935]",
    hoverBg: "group-hover:bg-[#E53935]",
    hoverIcon: "group-hover:text-white",
    href: "/visa-assistance",
  },
  {
    icon: Car,
    title: "Transport Services",
    badge: "Wholesale",
    badgeColor: "bg-green-100 text-green-700",
    desc: "Complete ground transportation — airport transfers, city tours, intercity travel, and luxury vehicle rentals. All vehicles GPS-tracked and drivers verified.",
    features: [
      "Airport transfers",
      "City & outstation",
      "Luxury vehicles",
      "GPS-tracked fleet",
    ],
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    hoverBg: "group-hover:bg-green-600",
    hoverIcon: "group-hover:text-white",
    href: "/transport-services",
  },
];

const steps = [
  {
    num: "01",
    title: "Register",
    desc: "Sign up as a partner in minutes with basic business details",
  },
  {
    num: "02",
    title: "Get Access",
    desc: "Instant access to our B2B portal, rates, and inventory",
  },
  {
    num: "03",
    title: "Book",
    desc: "Search, compare and book flights, hotels, and packages",
  },
  {
    num: "04",
    title: "Earn",
    desc: "Earn competitive commissions on every successful booking",
  },
];

export default function Services() {
  useEffect(() => {
    document.title = "Services — Travel N World";
  }, []);
  useScrollReveal();

  return (
    <div>
      <PageHero
        title="Our Services"
        subtitle="Everything a travel agent needs to run a successful business — under one roof"
        breadcrumb="Services"
      />

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-10 sm:mb-12 reveal">
            <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-3">
              B2B Travel Services
            </h2>
            <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">
              Exclusive wholesale pricing and B2B-only access for registered
              travel agents
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7 items-stretch">
            {services.map((service, i) => (
              <div
                key={service.title}
                data-ocid={`services.card.${i + 1}`}
                className="reveal bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-2xl hover:shadow-blue-50 transition-all duration-300 hover:-translate-y-2 cursor-pointer p-5 sm:p-7 group flex flex-col h-full"
              >
                {/* Icon + Badge row */}
                <div className="flex items-start justify-between mb-5">
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 ${service.iconBg} rounded-2xl flex items-center justify-center ${service.hoverBg} transition-colors duration-300 flex-shrink-0`}
                  >
                    <service.icon
                      className={`h-5 w-5 sm:h-6 sm:w-6 ${service.iconColor} ${service.hoverIcon} transition-colors duration-300`}
                    />
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-bold rounded-full ${service.badgeColor} border border-current/20 ml-2`}
                  >
                    {service.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-2">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-1">
                  {service.desc}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-5">
                  {service.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-xs text-gray-600"
                    >
                      <span className="w-1.5 h-1.5 bg-[#1E40AF] rounded-full flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Learn more link */}
                <Link
                  to={service.href}
                  data-ocid={`services.card.learnmore.${i + 1}`}
                  className="inline-flex items-center gap-1.5 text-[#1E40AF] text-sm font-semibold hover:gap-2.5 transition-all mt-auto"
                >
                  Learn More <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-10 sm:mb-14 reveal">
            <span className="inline-block px-4 py-1.5 bg-blue-100 text-[#1E40AF] rounded-full text-sm font-semibold mb-4">
              Simple Process
            </span>
            <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl text-gray-900">
              How It Works
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 relative">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className={`reveal reveal-delay-${i + 1} relative`}
              >
                <div className="bg-gray-50 rounded-2xl p-6 sm:p-7 border border-gray-100 shadow-sm text-center hover:shadow-md transition-shadow h-full">
                  <div className="font-bold text-4xl sm:text-5xl text-blue-100 mb-3">
                    {step.num}
                  </div>
                  <h3 className="font-semibold text-base sm:text-lg text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-4 z-10 items-center justify-center">
                    <ArrowRight className="h-6 w-6 text-[#1E40AF]" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-10 sm:mt-12 reveal">
            <Button
              asChild
              size="lg"
              className="bg-[#1E40AF] hover:bg-blue-800 active:bg-blue-900 text-white font-semibold h-12 sm:h-14 px-8 sm:px-10 rounded-2xl transition-all duration-300 hover:shadow-lg w-full sm:w-auto"
            >
              <Link to="/partner">Get Started Today</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
